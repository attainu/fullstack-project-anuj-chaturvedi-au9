const multer = require("multer");
const express = require("express");
const cloudinary = require('cloudinary').v2;

require("dotenv").config();

const router = express.Router();

const Element = require("../models/element");

// Screenshot upload constraints
const upload = multer({
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(JPG|jpeg|png)$/)) {
      return cb(new Error("Please upload an image in JPG, JPEG or PNG format"));
    } else if (file.size > 1024 * 1024) {
      return cb(new Error("Please upload a screenshot under 1 MB"));
    }
    cb(null, true);
  },
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
  console.warn('export CLOUDINARY_URL or set dotenv file');
} else {
  console.log('cloudinary config:');
  console.log(cloudinary.config()); //this will log here your config coming from the .env file
}

// Upload images to cloud
router.post("/img", async (req, res) => {

  const string = req.body.string;

  cloudinary.uploader.upload(`data:image/jpg;base64,${string}`, 
  function(error, result) {console.log(result, error); });
})

// Get all elements
router.get("/", async (req, res) => {
  var elements = [{ "_id": "606b2e8f7edcb932542c7624", "name": "q3", "JSCode": "document.body.style.background = \"blue\"\n", "HTMLCode": "<h1>Hello World</h1>\n", "CSSCode": "", "__v": 0 }, { "_id": "606b3129dd39a92f303ac2bd", "name": "q34", "JSCode": "dsd\n", "HTMLCode": "sas\n", "CSSCode": "saa\n", "__v": 0 }, { "_id": "606b324265dc430a7cb4b517", "name": "q35", "JSCode": "//Write your JavaScript here :)fgf\n", "HTMLCode": "Write your HTML here :)gfgf\n", "CSSCode": "Write your CSS here :)fgfg\n", "__v": 0 }, { "_id": "606b343e1d2ecb25c8b63788", "name": "q2345", "JSCode": "", "HTMLCode": "", "CSSCode": "", "__v": 0 }, { "_id": "606b35161d2ecb25c8b63789", "name": "q234", "JSCode": "Hello\t\n", "HTMLCode": "Hello\n", "CSSCode": "Hello\n", "__v": 0 }];
  elements = await Element.find();
  res.json({elements: elements});
});

// Get all the elements of specific type
// Not working
router.get("/:name", async (req, res) => {
  var elements = [];
  elements = await Element.find({ name: {$regex: req.params.name} });
  res.send(elements);
});

// Save a new element to DB
router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    const newElement = new Element({
      name: req.body.name,
      JSCode: req.body.JSCode,
      HTMLCode: req.body.HTMLCode,
      CSSCode: req.body.CSSCode,
      screenshot: req.body.buffer,
    });

    await newElement.save();
    res.send("Data uploaded successfully!");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;