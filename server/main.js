import logger from "loglevel";
import cluster from "cluster";
import os from "os";
import { startServer } from "./start";

const numCPUs = os.cpus().length;
const isProduction = process.env.NODE_ENV === "production";
const logLevel = process.env.LOG_LEVEL || (isProduction ? "info" : "debug");

logger.setLevel(logLevel);

if (cluster.isMaster) {
  logger.debug(`Master ${process.pid} is running`);
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.debug(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  startServer();
}
