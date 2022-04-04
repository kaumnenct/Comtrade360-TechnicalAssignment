import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/hello-rest", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));