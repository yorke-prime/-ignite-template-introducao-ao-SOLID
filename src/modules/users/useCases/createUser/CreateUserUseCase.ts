import { UserException } from "../../error/Errors";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const UserExits = this.usersRepository.findByEmail(email);

    if (!email && !name) {
      throw new UserException({
        message: "os campo de email e nome estão vazio",
        status: 400,
      });
    }

    if (!email) {
      throw new UserException({
        message: "campo de email vazio",
        status: 400,
      });
    }

    if (!name) {
      throw new UserException({
        message: "campo de username vazio",
        status: 400,
      });
    }

    if (UserExits) {
      throw new UserException({
        message: "Usuario ja existente",
        status: 400,
      });
    }

    const user = this.usersRepository.create({ name, email });

    return user;
  }
}

export { CreateUserUseCase };
