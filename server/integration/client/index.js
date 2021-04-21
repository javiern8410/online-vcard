import request from "request";
import config from "../../config";

const baseClient = request.defaults({
  headers: {
    "x-client": config.rest["x-client"],
    Accept: "application/json",
  },
  timeout: config.rest.timeout,
});

export default baseClient;
