/* eslint-disable new-cap */
import bookController from '../controllers/book.controller.js';
import express from 'express';

const BookRouter = express.Router();

BookRouter.post("/", async (req, res) => {
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

BookRouter.get("/", async (req, res) => {
  if (!req.query) {
    try {
      const bookResponse = await bookController.retrieve();
      res.status(bookResponse.status_code).json({
        status: "success",
        data: {
          books: bookResponse.bookCollection,
        },
      });
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong, Try again later!",
      });
    }
  } else {
    try {
      let query1 = "";
      let query2 = "";
      let query3 = "";
      if (req.query.name) {
        query1 = req.query.name;
      }

      if (req.query.reading) {
        if (req.query.reading !== "0" && req.query.reading !== '1') {
          throw new Error("Invalid value of 'reading'!");
        }
        query2 = req.query.reading;
      }

      if (req.query.finished) {
        if (req.query.finished !== '0' && req.query.finished !== '1') {
          throw new Error("Invalid value of \'finished\'!");
        }
        query3 = req.query.finished;
      }

      const bookResponse = await bookController.retrieve(query1, query2, query3);

      res.status(bookResponse.status_code).json({
        status: "success",
        data: {
          books: bookResponse.bookCollection,
        },
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "Something went wrong, Try again later!",
      });
    }
  }
});

BookRouter.get("/:bookId", async (req, res) => {
  try {
    const bookResponse = await bookController.retrieveBook(req.params.bookId);
    res.status(bookResponse.status_code).json({
      status: "success",
      data: {
        book: bookResponse.book,
      },
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  }
});

BookRouter.put("/:bookId", async (req, res)=> {
  try {
    const bookResponse = await bookController.update(req.params.bookId, req.body);
    res.status(bookResponse.status_code).json({
      status: "success",
      message: bookResponse.message,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  }
});

BookRouter.delete("/:bookId", async (req, res) => {
  try {
    const bookResponse= await bookController.remove(req.params.bookId);
    res.status(bookResponse.status_code).json({
      status: "success",
      message: bookResponse.message,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "fail",
      message: error.message,
    });
  }
});


export default BookRouter;
