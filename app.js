const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const stoneRoutes = require("./routes/stone.routes");
const sskuRoutes = require("./routes/ssku.routes");
const searchRoutes = require("./routes/search.routes");


const app = express();
app.use(express.json());

app.use("/api/stones", stoneRoutes);
app.use("/api/sskus", sskuRoutes);
app.use("/api/search", searchRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📘 Swagger at http://localhost:${PORT}/api-docs`);
});
