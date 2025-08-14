import express from "express";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { ChartConfiguration } from "chart.js";
import { pdf } from "./PDF";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send({ name: "Hello World" });
});

app.post("/generate-chart", async (req, res) => {
  const canvasRenderer = new ChartJSNodeCanvas({ width: 800, height: 600 });

  const { values } = req.body;
  const chartConfig: ChartConfiguration = {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "Votes",
          data: values,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Simple Bar Chart"
        }
      }
    }
  };

  const image = await canvasRenderer.renderToBuffer(chartConfig);
  res.set("Content-Type", "image/png");
  res.send(image);
});

app.get("/pdf", pdf);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
