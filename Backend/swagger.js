const swaggerUi = require("swagger-ui-express");
const paths = require("./swagger.json");
const options = {
  openapi: "3.0.0",
  info: {
    title: "Digital signature documentation for api",
    description:
      "API endpoints for digital signature app documented on swagger",
    contact: {
      name: "Bách Bùi",
      email: "bachnd2215@gmail.com",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8080/",
      description: "Local server",
    },
  ],
  paths: paths,
};
function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(options));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(options);
  });
}
module.exports = swaggerDocs;
