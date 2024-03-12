import BookCollection from "../src/book.collection";
import CustomError from "../utils/customError.utils";
const {v4: uuidv4} = require("uuid");

/**
 * Class for bookController
 * handle all function about book
 */
class BookController {
  /**
   * ?insert: a function to insert new book
   * @param {*} param0: book object which is user input (request body)
   */
  insert = async ({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }) => {
    if (!name) {
      throw new Error("Gagal menambahkan buku. Mohon isi nama buku", 400);
    }

    const yearNum = parseInt(year);
    const pageCountNum = parseInt(pageCount);
    const readPageNum = parseInt(readPage);

    if (isNaN(yearNum) || isNaN(pageCountNum) || isNaN(readPageNum)) {
      throw new CustomError(
          "Invalid input. Year, pageCount, and readPage must be integers.",
          400,
      );
    }

    if (readPageNum > pageCountNum) {
      throw new Error(
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
          400,
      );
    }
    const newBook = {
      bookId: uuidv4(),
      name: name,
      year: yearNum,
      author: author,
      summary: summary,
      publisher: publisher,
      pageCount: pageCountNum,
      readPage: readPageNum,
      finished: pageCountNum === readPageNum ? true : false,
      reading: reading,
      insertedAt: new Date().toISOString(),
    };

    newBook.updatedAt = newBook.insertedAt;

    BookCollection.push(newBook);

    return {status_code: 201, message: "Buku berhasil ditambahkan", bookId: newBook.bookId};
  };

  retrieve = async () => {
    const simplifiedBookCollection = BookCollection.map((book) => ({
      id: book.bookId,
      name: book.name,
      publisher: book.publisher,
    }));

    return {
      status_code: 200,
      bookCollection: simplifiedBookCollection,
    };
  };
}

const bookController = new BookController();

export default bookController;
