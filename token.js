"use strict";
require("dotenv").config();
const fs = require("fs");
const { getToken } = require("sf-jwt-token");
const privateKey = fs.readFileSync("private.pem").toString("utf8");
const express = require("express");

const app = express();
app.use(express.json()); // For JSON body parsing
app.use(express.urlencoded({ extended: true })); // For URL-encoded body parsing

async function getAccessToken() {
  try {
    const token = await getToken({
      iss: process.env.SF_CLIENT_ID,
      sub: process.env.SF_USERNAME,
      aud: process.env.SF_LOGIN_URL,
      privateKey: privateKey,
    });
    return token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

// Export the function
module.exports = { getAccessToken };

app.get("/", async (req, res) => {
  try {
    const token = await getAccessToken();
    console.log("Token Response:", JSON.stringify(token, null, 2));
    res.send("Token received successfully");
  } catch (error) {
    res.status(500).send("Error getting token");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
