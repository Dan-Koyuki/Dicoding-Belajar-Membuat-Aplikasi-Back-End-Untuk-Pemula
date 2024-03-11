import BookCollection from "../src/book.collection";
const {v4: uuidv4} = require("uuid");

/**
 * Class for bookController
 * handle all function about book
 */
class BookController {
  /**
   * ?insert: a function to insert new book
   * @param {*} param0: book object which is user input
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
      throw new Error("Gagal menambahkan buku. Mohon isi nama buku");
    }

    const yearNum = parseInt(year);
    const pageCountNum = parseInt(pageCount);
    const readPageNum = parseInt(readPage);

    if (readPageNum > pageCountNum) {
      throw new Error(
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
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

    return {message: "Buku berhasil ditambahkan", bookId: newBook.bookId};
  };
}

const bookController = new BookController();

export default bookController;
