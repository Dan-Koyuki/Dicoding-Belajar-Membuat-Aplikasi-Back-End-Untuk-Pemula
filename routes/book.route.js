/* eslint-disable new-cap */
const express = require("express");
const {default: bookController} = require("../controllers/book.controller");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const bookResponse = await bookController.insert(req.body);
    res.status(bookResponse.status_code).json({
      status: 'success',
      message: bookResponse.message,
      data: bookResponse.bookId,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookResponse = await bookController.retrieve();
    res.status(bookResponse.status_code).json({
      status: 'success',
      data: {
        books: bookResponse.bookCollection,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong, Try again later!",
    });
  }
});

router.get("/:bookId", async (req, res) => {
  try {
    const bookResponse = await bookController.retrieveBook(req.params.bookId);
    res.status(bookResponse.status_code).json({
      data: {
        book: bookResponse.book,
      },
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
});

module.exports = router;
