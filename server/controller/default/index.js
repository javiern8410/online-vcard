import express from "express";

const getDefaultController = () => {
  const router = express.Router();
  router.get(["/", "/*"], defaultView);

  return router;
};

const defaultView = async (req, res) => {
  const model = {
    base: "/",
    title: "GECI - Employee Catalog",
  };
  res.render("index", model);
}

export { getDefaultController };
