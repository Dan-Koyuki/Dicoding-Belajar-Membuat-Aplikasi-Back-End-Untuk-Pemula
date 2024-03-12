/**
 * CustomError - Create a custom Error to included statusCode
 */
class CustomError extends Error {
  /**
   * extended constructor for new CustomError
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};

export default CustomError;
