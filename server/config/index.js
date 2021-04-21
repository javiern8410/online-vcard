let config = {};

switch (process.env.NODE_ENV) {
  case "prod":
    config = require("./environment/prod.json");
    break;
  default:
    config = require("./environment/dev.json");
    break;
}

export default config;
