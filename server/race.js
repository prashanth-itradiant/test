import express from "express";
const app = express();
const PORT = 3000;

let availableSeats = 8;
let bookings = [];

let queue = [];
let activeRequests = 0;
const MAX_CONCURRENT = 3;

function processQueue() {
  // Log current queue and active state
  console.log(
    `📥 Checking queue... ActiveRequests: ${activeRequests}, QueueLength: ${queue.length}`
  );

  if (queue.length === 0 || activeRequests >= MAX_CONCURRENT) {
    console.log("⏸️ Either no one in queue or max concurrent limit reached.");
    return;
  }

  const { user, res } = queue.shift(); // FIFO
  activeRequests++;

  console.log(
    `🚦 Processing booking for ${user}. ActiveRequests: ${activeRequests}`
  );

  const delay = Math.floor(Math.random() * 2000) + 1000;

  // Simulate booking delay
  setTimeout(() => {
    console.log(`⏳ Booking delay over for ${user} (${delay}ms)`);

    if (availableSeats > 0) {
      availableSeats--;
      bookings.push({ user });
      console.log(
        `✅ Seat booked for ${user}. Remaining seats: ${availableSeats}`
      );
      res.send(`✅ Seat booked for ${user}`);
    } else {
      console.log(`❌ No seats left. Booking failed for ${user}`);
      res.send(`❌ No seats available`);
    }

    activeRequests--;
    console.log(
      `🔄 Finished processing ${user}. ActiveRequests: ${activeRequests}`
    );
    processQueue(); // Continue with next person
  }, delay);
}

// Booking endpoint
app.post("/book", (req, res) => {
  const user = req.query.user;

  console.log(`🆕 New booking request from ${user}`);
  queue.push({ user, res });
  processQueue();
});

// Booking status
app.get("/status", (req, res) => {
  res.json({
    availableSeats,
    bookings,
    inQueue: queue.map((q) => q.user),
    activeRequests,
  });
});

app.listen(PORT, () => {
  console.log(`🚍 Bus Booking Server running on http://localhost:${PORT}`);
});
