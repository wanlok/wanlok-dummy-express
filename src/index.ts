import express from "express";
import { pdf } from "./pdf";
import { barChart1 } from "./barChart1";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/pdf", pdf);

app.post("/bar-chart-1", barChart1);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
