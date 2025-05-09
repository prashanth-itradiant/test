import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import "./passport.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// ✅ Correct session setup for express-session
app.use(
  session({
    secret: "your-random-secret-key", // or use process.env.SESSION_SECRET
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: false, // set to true in production with HTTPS
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// Facebook Auth Route
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Facebook Callback
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

app.get("/auth/user", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.CLIENT_URL}`);
  });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
