require("dotenv").config();
const { getAccessToken } = require("./token");
const axios = require("axios");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

async function postToSalesforce(data) {
  try {
    // Get fresh token
    console.log("Getting fresh access token...");
    const token = await getAccessToken();

    // Prepare the Salesforce API endpoint
    const instanceUrl = token.instance_url;
    const accessToken = token.access_token;

    // Example: Posting to Account object
    const salesforceUrl = `${instanceUrl}/services/data/v58.0/sobjects/Mehdi_Test__c`;

    // Make the POST request to Salesforce
    const response = await axios.post(salesforceUrl, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Record created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error posting to Salesforce:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Serve the form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle form submission
app.post("/submit", async (req, res) => {
  try {
    const result = await postToSalesforce(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Open http://localhost:${PORT} in your browser to access the form`
  );
});

// Handle server shutdown gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
