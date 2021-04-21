import express from "express";
import exphbs from "express-handlebars";
import "express-async-errors";
import logger from "loglevel";
import path from "path";
import { getRoutes } from "./controller";
import config from "../server/config";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import expressRequestId from "express-request-id";
import cors from "cors";
import errorMiddleware from "./middleware/error";

process.env.DEFAULT_PORT = "4000";

const STATIC_CONTEXT = "../public/static";
const VIEWS_PATH = path.join(__dirname, "./views");

const startServer = (port = process.env.PORT || process.env.DEFAULT_PORT) => {
  const app = express();

  app.use(cors());

  app.use(
    config["static-context"],
    express.static(path.join(__dirname, STATIC_CONTEXT))
  );

  app.set("views", VIEWS_PATH);

  /* HANDLEBARS */
  app.engine(
    ".html",
    exphbs({
      extname: ".html",
      partialsDir: VIEWS_PATH,
      layoutsDir: path.join(__dirname, "./views/layouts"),
      helpers: {
        "static-context": () => config["static-context"],
        toJSON: (object) => JSON.stringify(object),
      },
    })
  );
  app.set("view engine", ".html");
  /* HANDLEBARS */

  app.use(expressRequestId());

  /* BODY PARSER */
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "10mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(bodyParser.text());
  app.use(bodyParser.raw());
  /* BODY PARSER */

  app.use(compression());

  app.use(cookieParser());

  app.use(errorMiddleware);

  app.use("/", getRoutes());

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`);
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };
      setupCloseOnExit(server);
      resolve(server);
    });
  });
}

const setupCloseOnExit = server => {
  const exitHandler = async (options = {}) => {
    await server
      .close()
      .then(() => {
        logger.info("Server successfully closed");
      })
      .catch((e) => {
        logger.warn("Something went wrong closing the server", e.stack);
      });
    if (options.exit) {
      process.exit();
    }
  };

  // do something when app is closing
  process.on("exit", exitHandler);

  // catches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

  // catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
}

export { startServer };
