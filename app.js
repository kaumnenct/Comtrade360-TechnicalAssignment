import express from "express";
import returnLanguage from "./loki.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/hello-rest", (req, res) => {
  const language = req.query.language;
  const helloWorldMessage = returnLanguage(language);
  res.status(200).json({ message: helloWorldMessage });
});

app.get("/hello", (req, res) => {
  const language = req.query.language;
  const helloWorldMessage = returnLanguage(language);
  res.render("helloEndpoint", { message: helloWorldMessage });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
