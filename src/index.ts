import express from "express";
import { pdf } from "./pdf";
import { barChart1 } from "./barChart1";
import { upload, uploadParams } from "./uploadHandler";
import { filePath, fileUploadDirectory, port } from "./config";

const app = express();
app.use(express.json());

app.use(filePath, express.static(fileUploadDirectory));

app.get("/pdf", pdf);

app.post("/bar-chart-1", barChart1);
app.post(`/upload`, uploadParams, upload);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
