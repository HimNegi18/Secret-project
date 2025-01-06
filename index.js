import express from "express";
import bodyParser from "body-parser";
// import { dirname } from 'path'
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();
const port = 3000;
var isPasswordValid = false;

app.use(bodyParser.urlencoded({ extended: true }));

const passwordCheck = (req, res, next) => {
  const password = req.body["password"];
  if (password == "ILoveMilfs") {
    isPasswordValid = true;
  } else isPasswordValid = false;
  next();
};

app.use("/check", passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html"); //process.cwd() is another approach to get current working directory
});

app.post("/check", (req, res) => {
  if (isPasswordValid) {
    res.sendFile(process.cwd() + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log("App is listening on port 3000");
});
