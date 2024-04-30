require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Back-end listening on port ${PORT}`);
});
