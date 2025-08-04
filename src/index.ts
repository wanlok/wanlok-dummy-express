import express from "express";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send({ name: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
