//GET Endpoint to add two numbers

import express from "express";

const app = express();

// Send numbers x and y as url parameters
// e.g http://localhost:3000?x=1&y=2
app.get("/", (req, res) => {
  try {
    const { x, y } = req.query;

    const X = Number(x);
    const Y = Number(y);

    if (isNaN(X) || isNaN(Y)) {
      throw new Error("Non number params");
    }

    const sum = Number(X) + Number(Y);
    res.send(sum);
  } catch (e) {
    res.send("Missing or invalid parameters").status(400);
  }
});

app.listen(3000);
