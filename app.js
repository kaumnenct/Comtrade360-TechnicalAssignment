import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
//import returnLanguage from "./loki.js";
import getLanguage from "./database/mongodb/getGreeting.js";
import { auth } from "express-openid-connect";
import addLanguage from "./database/mongodb/addNewLanguage.js";

//#region app config

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
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// #endregion

// #region Home Page
app.get("/", (req, res) => {
  let loggedInText = req.oidc.isAuthenticated()
    ? "You are logged in!"
    : "You are not logged in!";
  res.render("index", { loggedInText: loggedInText });
});
// #endregion

// #region see all languages
app.get("/hello-rest", (req, res) => {
  let language = req.query.language;
  if (language == "" || language == undefined) {
    language = "en";
  }
  getLanguage(language)
    .then((result) => {
      res.status(200).json({ message: result.greeting });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Query error. Please check and try again!" });
    });
});

app.get("/hello", (req, res) => {
  let language = req.query.language;
  if (language == "" || language == undefined) {
    language = "en";
  }
  getLanguage(language)
    .then((result) => {
      res.render("helloEndpoint", { message: result.greeting });
    })
    .catch((error) => {
      res.render("helloEndpoint", {
        message: "Query error. Please check and try again!",
      });
    });
});
// #endregion

// #region login
app.get("/secure/hello", (req, res) => {
  res.redirect("/login");
});
// #endregion

// #region add new language
app.get("/add", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.render("add");
  } else {
    res.status(401).send("Unauthorized. Please log in.");
  }
});
app.post("/add", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const language = req.body.language;
    const greeting = req.body.greeting;
    addLanguage(language, greeting).then(() => {
      res.redirect("/");
    });
  } else {
    res.status(401).send("Unauthorized. Please log in.");
  }
});
// #endregion

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// LOCAL DATABASE LANGUAGES RETRIEVAL

// app.get("/hello-rest", (req, res) => {
//   const language = req.query.language;
//   const helloWorldMessage = returnLanguage(language);
//   res.status(200).json({ message: helloWorldMessage });
// });

// app.get("/hello", (req, res) => {
//   const language = req.query.language;
//   const helloWorldMessage = returnLanguage(language);
//   res.render("helloEndpoint", { message: helloWorldMessage });
// });
