const express = require("express");
const bodyParser = require("body-parser");
//new
const app = express();

// Middleware to parse JSON request body  i
app.use(bodyParser.json());

// Define a route to handle POST requests and return HTML table
app.post("/api/generate-table", (req, res) => {
  const jsonData = req.body;

  // Check if the JSON data is an array
  if (!Array.isArray(jsonData)) {
    return res
      .status(400)
      .json({ error: "Invalid JSON data. Expected an array." });
  }

  // Generate HTML table from JSON data
  let html = '<table border="1"><tr>';
  for (const key in jsonData[0]) {
    html += `<th>${key}</th>`;
  }
  html += "</tr>";
  jsonData.forEach((item) => {
    html += "<tr>";
    for (const key in item) {
      html += `<td>${item[key]}</td>`;
    }
    html += "</tr>";
  });
  html += "</table>";

  // Send HTML table as response
  res.send(html);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
