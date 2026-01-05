const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors({
    origin: "http://127.0.0.1:5500" 
}));
app.use(express.json()); 

mongoose.connect("mongodb+srv://ichraq:chlilowa@projetprepfa.gulgzg1.mongodb.net/?appName=ProjetPrePFA")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use("/api/users", require("./models/user/user.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);






});








