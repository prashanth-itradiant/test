import express from "express";

const app = express();
const PORT = 8000;

// Non-blocking route
app.get("/non-blocking", (req, res) => {
  res.send("This is non-blocking");
});

// Blocking route
app.get("/blocking", (req, res) => {
  let count = 0;
  for (let i = 0; i < 20000000000; i++) {
    count += i;
  }
  res.send("Blocking operation complete");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
