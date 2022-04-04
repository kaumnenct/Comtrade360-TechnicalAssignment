import express from "express";
import "dotenv/config";
import returnLanguage from "./loki.js";
import { auth } from "express-openid-connect";

//auth config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(auth(config));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let loggedInText = req.oidc.isAuthenticated()
    ? "You are logged in!"
    : "You are not logged in!";
  res.render("index", { loggedInText: loggedInText });
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

app.get("/add", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.render("add");
  } else {
    res.status(401).send("Unauthorized. Please log in.");
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
