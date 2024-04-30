const mongoose = require("mongoose");
const config = require("../configs/mongo.config");
const isLocalHost = config.host === "127.0.0.1";
const connectionString = `mongodb${isLocalHost ? "" : "+srv"}://${
  isLocalHost ? config.host + config.port : config.host
}/${config.dbName}?retryWrites=true&w=majority&appName=Back2215`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
