import { UserException } from "../../error/Errors";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new UserException({
        message: "Usuario não existente",
        status: 400,
      });
    }

    const admim = this.usersRepository.turnAdmin(user);

    return admim;
  }
}

export { TurnUserAdminUseCase };
