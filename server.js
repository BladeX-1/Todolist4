require("dotenv").config();
const express = require("express");
const sequelize = require("./config/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Task } = require("./models/models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/signup", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "username and password are required" });
    }
    const alreadyUser = await User.findOne({ where: { username } });
    console.log("alreadyUser", alreadyUser);
    if (alreadyUser) {
        return res.status(400).json({ msg: "username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    return res
        .status(200)
        .json({ msg: "username created", username: newUser.username });
});
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ msg: "username and password are required" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(400).json({ msg: "invalid username" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ msg: "invalid password" });
    }

    res.cookie("login");
});
app.get("/api/todos", (req, res) => {});
app.post("/api/todos", (req, res) => {});

app.listen(process.env.APP_PORT || 3000, () => {
    console.log(`app active on port ${process.env.APP_PORT || 3000}`);
});
