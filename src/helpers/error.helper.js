export class ValidationError extends Error {
  constructor(data) {
    super(data)
    this.message = "Error input validation"
    this.data = data;
  }
}
