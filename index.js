const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());

//cors
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

//test api

app.get("/test", (req, res) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
});

//get all users

app.get("/users", async (req, res) => {
  try {
    console.log("here");
    const users = await prisma.user.findMany();
    console.log("here");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
});

//get user by id

app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
});

// create user

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const users = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
});

// update user

app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const users = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        email,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
});

//get user by id

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
});

//start server

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
