const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());


// rate limiting:-
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      "too many reqeusts. please try again after 1 minute, if you are a hacker dont try to hack our product",
  },
});


app.get("/api/products", (req, res) => {
  res.json({
    success: true,
    products: ["laptop", "mobile", "keyboard", "mouse", "pentabs"],
  });
});

app.post("/api/login", limiter, (req, res) => {
  const { email, password } = req.body;
  res.json({
    success: true,
    message: "Login request recieved",
    email,
  });
});

// server:-
app.listen(5000, () => {
  console.log("server is running on port: 5000");
});
