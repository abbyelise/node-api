class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  public toString() {
    const str = {
      status: this.status,
      message: this.message,
    };
    return str;
  }
};

export default HttpException;
