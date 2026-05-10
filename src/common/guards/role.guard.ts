import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/role.decorator";
import { USER_REPOSITORY } from "src/modules/users/repository/user.token";
import type { IUserRepository } from "src/modules/users/repository/user.repository";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(USER_REPOSITORY) 
        private readonly userRepository: IUserRepository
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const dbUser = await this.userRepository.findById(user.sub);
        if (!dbUser) {
            return false;
        }

        if (!requiredRoles.includes(dbUser.role)) {
            return false;
        }

        return requiredRoles.some((role) => role === dbUser.role);
    }
}