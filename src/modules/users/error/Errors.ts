interface IRequest {
  message: string;
  status: number;
}

function UserException({ message, status }: IRequest): void {
  this.message = message;
  this.status = status;
}

export { UserException };
