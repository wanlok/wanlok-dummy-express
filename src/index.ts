import express from "express";
import cors from "cors";
import fs from "fs";
import https from "https";
import { pdf } from "./pdf";
import { barChart1 } from "./barChart1";
import { upload, uploadParams } from "./uploadHandler";
import { filePath, fileUploadDirectory, port } from "./config";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001", "https://wanlok.github.io"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt")
};

app.use(express.json());

app.use(filePath, express.static(fileUploadDirectory));

app.get("/pdf", pdf);

app.post("/bar-chart-1", barChart1);
app.post(`/upload`, uploadParams, upload);

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
