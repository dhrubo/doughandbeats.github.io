const express = require('express');
const path = require('path');

const app = express();
// To avoid port conflicts, you can change the port number here
const port = 3001;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
