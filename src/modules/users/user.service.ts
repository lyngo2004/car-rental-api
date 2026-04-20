import { Inject, Injectable } from "@nestjs/common";
import type { IUserRepository, TCreateUser } from "./repository/user.repository";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: IUserRepository
    ) { }

    create(createUserDto: TCreateUser) {
        return this.userRepository.createUser(createUserDto);
    }
}