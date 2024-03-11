/* eslint-disable new-cap */
const express = require("express");
const {default: bookController} = require("../controllers/book.controller");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const bookResponse = await bookController.insert(req.body);
    res.status(200).json(bookResponse);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
