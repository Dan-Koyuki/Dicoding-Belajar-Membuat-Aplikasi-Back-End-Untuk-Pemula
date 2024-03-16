import BookCollection from "../src/book.collection.js";
import CustomError from "../utils/customError.utils.js";
import {v4 as uuidv4} from "uuid";

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
      throw new CustomError("Gagal menambahkan buku. Mohon isi nama buku", 400);
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
      throw new CustomError(
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
          400,
      );
    }
    const newBook = {
      id: uuidv4(),
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

    return {
      status_code: 201,
      message: "Buku berhasil ditambahkan",
      bookId: newBook.id,
    };
  };

  /**
   * retrieve: retrieve all available books
   * @return {object} : status code of the action along with data of all available book
   */
  retrieve = async () => {
    const simplifiedBookCollection = BookCollection.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return {
      status_code: 200,
      bookCollection: simplifiedBookCollection,
    };
  };

  /**
   * @param {string} query1
   * @param {number} query2
   * @param {number} query3
   */
  retrieve = async (query1, query2, query3) => {
    let filteredBook = BookCollection;
    const q2 = query2 === "1";
    const q3 = query3 === "1";

    if (query1) {
      filteredBook = filteredBook.filter((book) =>
        book.name.toLowerCase().includes(query1),
      );
    }

    if (query2) {
      filteredBook = filteredBook.filter((book) => book.reading === q2);
    }

    if (query3) {
      filteredBook = filteredBook.filter((book) => book.finished === q3);
    }

    const simplifiedBookCollection = filteredBook.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return {
      status_code: 200,
      bookCollection: simplifiedBookCollection,
    };
  };

  /**
   * retrieveBook : get one specific book based on its ID
   * @param {string} bookID
   */
  retrieveBook = async (bookID) => {
    const book = BookCollection.find((b) => b.id === bookID);

    if (!book) {
      throw new CustomError("Buku tidak ditemukan", 404);
    }

    return {
      status_code: 200,
      book: book,
    };
  };

  /**
   * @param {string} bookID
   */
  update = async (
      bookID,
      {name, year, author, summary, publisher, pageCount, readPage, reading},
  ) => {
    const updatedBook = BookCollection.find((book) => book.id === bookID);

    if (!updatedBook) {
      throw new CustomError("Gagal memperbarui buku. Id tidak ditemukan", 404);
    }

    if (!name) {
      throw new CustomError("Gagal memperbarui buku. Mohon isi nama buku", 400);
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
      throw new CustomError(
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
          400,
      );
    }

    updatedBook.name= name;
    updatedBook.year= yearNum;
    updatedBook.author= author;
    updatedBook.summary= summary;
    updatedBook.publisher= publisher;
    updatedBook.pageCount= pageCountNum;
    updatedBook.readPage= readPageNum;
    updatedBook.finished= pageCountNum === readPageNum ? true : false;
    updatedBook.reading= reading;
    updatedBook.updatedAt= new Date().toISOString();

    return {
      status_code: 200,
      message: "Buku berhasil diperbarui",
    };
  };

  /**
   * @param {string} bookID
   */
  remove = async (bookID) => {
    const deletedBook = BookCollection.find((book) => book.id === bookID);

    if (!deletedBook) {
      throw new CustomError("Buku gagal dihapus. Id tidak ditemukan", 404);
    }

    const bookDeletion = BookCollection.filter((book) => book.id !== bookID);

    BookCollection.length = 0;

    bookDeletion.forEach((book) => BookCollection.push(book));

    return {
      status_code: 200,
      message: "Buku berhasil dihapus",
    };
  };
}

const bookController = new BookController();

export default bookController;
