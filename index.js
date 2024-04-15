const express = require("express");
const app = express();
var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

app.get("/", function (req, res) {
  const johnKedneys = users[0].kidneys;
  const numberOfKidneys = johnKedneys.length;
  let numberOfHelthyKedney = 0;
  for (let i = 0; i < johnKedneys.length; i++) {
    if (johnKedneys[i].healthy) {
      numberOfHelthyKedney = numberOfHelthyKedney + 1;
    }
  }

  const numberOfUnHelthyKedney = numberOfKidneys - numberOfHelthyKedney;
  res.json({
    numberOfKidneys,
    numberOfHelthyKedney,
    numberOfUnHelthyKedney,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy; // Corrected variable name
  users[0].kidneys.push({
    healthy: isHealthy, // Corrected variable name
  });
  res.json({
    msg: "done",
  });
});

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].isHealthy = true;
  }
  res.json({});
});

app.delete("/", function (req, res) {
  const newKidneys = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
  }
  users[0].kidneys = newKidneys;
  res.json({
    msg: "done",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
