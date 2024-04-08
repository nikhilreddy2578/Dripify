// server.js
require('@babel/register')({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
});

const express = require('express');
const bodyParser = require('body-parser');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Button = require('./src/components/Button').default;
const Table = require('./src/components/Table').default;
const app = express();

app.use(bodyParser.json()); // Parse JSON bodies

app.get('/getsomething', (req, res) => {
  // Render the React component to HTML string
  const html = ReactDOMServer.renderToString(React.createElement(Button));

  // Send the HTML string as the response
  res.send(html);
});

// Endpoint to handle POST request with table data and return rendered HTML
app.post('/posttable', (req, res) => {
  const { data } = req.body;
  // Render the Table component with the data received from the client
  const html = ReactDOMServer.renderToString(React.createElement(Table, { data }));
  res.send(html);
});

// Serve index.html on root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
