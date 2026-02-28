require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fetch = require("node-fetch");
const FormData = require("form-data");

const app = express();
const upload = multer();

app.use(express.static("public"));

app.post("/remove-bg", upload.single("image"), async (req, res) => {

  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const formData = new FormData();
  formData.append("image_file", req.file.buffer);
  formData.append("size", "auto");

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.REMOVE_BG_API_KEY
    },
    body: formData
  });

 if (!response.ok) {
  const errorText = await response.text();
  console.log("REMOVE.BG ERROR:", errorText);
  return res.status(500).send(errorText);
}
  }

  const buffer = await response.buffer();
  res.set("Content-Type", "image/png");
  res.send(buffer);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
