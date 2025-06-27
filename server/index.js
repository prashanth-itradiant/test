import express from "express";
const app = express();
const PORT = 9000;

/**
 * GET /non-blocking
 * Returns immediately. Nothing CPU-intensive happens here,
 * so any other request can be processed right away.
 */
app.get("/non-blocking", (req, res) => {
  res.send("✅ Non-blocking route responded instantly!");
});

/**
 * GET /blocking
 * Simulates heavy synchronous work by counting to 20 000 000 000.
 * While this loop runs the Node.js event-loop is **blocked**,
 * so every other request has to wait until it finishes.
 */
app.get("/blocking", (req, res) => {
  let counter = 0;

  // ⚠️  This loop will keep the CPU busy for a LONG time.
  for (let i = 0; i <= 20_000_000_000; i++) {
    counter++;
  }

  res.send(`🛑 Blocking route finished. Final counter value: ${counter}`);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}
Try:
  • curl http://localhost:${PORT}/non-blocking
  • curl http://localhost:${PORT}/blocking`)
);
