
const express = require("express"),
app = express(),
port = process.env.PORT || 5000
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/yoyoy", (req, res) => {
res.send({ message: "We did it!" });
});