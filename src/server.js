// import express, {json} from 'express';
// import cors from 'cors';
// import BookRouter from '../routes/book.route.js';

// const app = express();

// // CORS Settings
// app.use(cors());
// app.use((req, res, next) => {
//   // Allow requests from all origins
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   // Define allowed methods
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   // Define allowed headers
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   // Continue to the next middleware
//   next();
// });
// app.options('*', (req, res) => {
//   // Respond to preflight requests
//   res.status(200).end();
// });

// // Routes
// app.use(json());
// app.use('/books', BookRouter);

// app.get('/', (req, res) => {
//   res.status(200)
//       .json('Welcome, this is Irwanto Danang Bahtiar\'s Bookshelf API.');
// });

// // Start the server
// const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

"use strict";

import {server as _server} from "@hapi/hapi";
import bookController from "../controllers/book.controller.js";

const init = async () => {
  const server = _server({
    "port": 9000,
    "host": "localhost",
    "routes": {
      "cors": true,
    },
  });

  server.route([
    {
      method: "GET",
      path: "/",
      handler: async (request, h) => {
        return "Welcome, this is Irwanto Danang Bahtiar's Bookshelf API.";
      },
    },
    {
      method: "POST",
      path: "/books",
      handler: async (request, h) => {
        try {
          const bookResponse = await bookController.insert(request.payload);
          return h.response({
            status: "success",
            message: bookResponse.message,
            data: bookResponse.bookId,
          }).code(bookResponse.status_code);
        } catch (error) {
          return h
              .response({
                status: "fail",
                message: error.message,
              })
              .code(error.statusCode);
        }
      },
    },
    {
      method: "GET",
      path: "/books",
      handler: async (request, h) => {
        try {
          let query1 = "";
          let query2 = "";
          let query3 = "";

          if (request.query.name) {
            query1 = request.query.name;
          }

          if (request.query.reading) {
            if (
              request.query.reading !== "0" &&
              request.query.reading !== "1"
            ) {
              throw new Error("Invalid value of 'reading'!");
            }
            query2 = request.query.reading;
          }

          if (request.query.finished) {
            if (
              request.query.finished !== "0" &&
              request.query.finished !== "1"
            ) {
              throw new Error("Invalid value of 'finished'!");
            }
            query3 = request.query.finished;
          }

          const bookResponse = await bookController.retrieve(
              query1,
              query2,
              query3,
          );

          return h.response({
            status: "success",
            data: {
              books: bookResponse.bookCollection,
            },
          }).code(bookResponse.status_code);
        } catch (error) {
          return h
              .response({
                message:
                error.message || "Something went wrong, Try again later!",
              })
              .code(400);
        }
      },
    },
    {
      method: "GET",
      path: "/books/{bookId}",
      handler: async (request, h) => {
        try {
          const bookResponse = await bookController.retrieveBook(
              request.params.bookId,
          );
          return h.response({
            status: "success",
            data: {
              book: bookResponse.book,
            },
          }).code(bookResponse.status_code);
        } catch (error) {
          return h
              .response({
                status: "fail",
                message: error.message,
              })
              .code(error.statusCode);
        }
      },
    },
    {
      method: "PUT",
      path: "/books/{bookId}",
      handler: async (request, h) => {
        try {
          const bookResponse = await bookController.update(
              request.params.bookId,
              request.payload,
          );
          return h.response({
            status: "success",
            message: bookResponse.message,
          }).code(bookResponse.status_code);
        } catch (error) {
          return h
              .response({
                status: "fail",
                message: error.message,
              })
              .code(error.statusCode);
        }
      },
    },
    {
      method: "DELETE",
      path: "/books/{bookId}",
      handler: async (request, h) => {
        try {
          const bookResponse = await bookController.remove(
              request.params.bookId,
          );
          return h.response({
            status: "success",
            message: bookResponse.message,
          }).code(bookResponse.status_code);
        } catch (error) {
          return h
              .response({
                status: "fail",
                message: error.message,
              })
              .code(error.statusCode);
        }
      },
    },
  ]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
