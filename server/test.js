import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import pkg from "passport-azure-ad";
import UserModel from "./models/User.js";
const { OIDCStrategy } = pkg;

dotenv.config();
const app = express();
const PORT = 8000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ MongoDB connected");
});

app.use(cors({ origin: "http://localhost:5175", credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax", // Use 'none' if secure: true and cross-site
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OIDCStrategy(
    {
      identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
      clientID: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      responseType: "code",
      responseMode: "query",
      redirectUrl: `http://localhost:${PORT}/auth/callback`,
      allowHttpForRedirectUrl: true,
      scope: ["openid", "profile", "email", "User.Read"],
    },
    async (iss, sub, profile, accessToken, refreshToken, done) => {
      if (!profile.oid) return done(new Error("No OID found in user profile."));
      let user = await UserModel.findOne({ microsoftId: profile.oid });
      if (!user) {
        user = await UserModel.create({
          microsoftId: profile.oid,
          displayName: profile.displayName,
          email: profile._json.email || profile._json.preferred_username,
        });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("/auth/login", passport.authenticate("azuread-openidconnect"));

app.get(
  "/auth/callback",
  passport.authenticate("azuread-openidconnect", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    res.redirect("http://localhost:5175");
  }
);

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5175");
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
