import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type { IUnitOfWork } from "../unit-of-work/unit-of-work.interface";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from "../users/repository/user.repository";
import { USER_REPOSITORY } from "../users/repository/user.token";
import { JwtPayload } from "./types/jwt-payload.type";
import { JwtService } from "@nestjs/jwt";
import { RegisterResult } from "./dto/register-response.dto";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        @Inject('IUnitOfWork')
        private readonly unitOfWork: IUnitOfWork,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ) { }

    register(dto: RegisterDto): Promise<RegisterResult> {
        return this.unitOfWork.run(async ({ users, customers }) => {
            const existing = await users.findByEmail(dto.email);
            if (existing) {
                throw new ConflictException(`Email ${dto.email} already registered`);
            }

            const hashedPassword = await bcrypt.hash(dto.password, Number(this.configService.get('SALT_ROUNDS')));

            const user = await users.createUser({
                email: dto.email,
                passwordHash: hashedPassword,
            });

            const customer = await customers.createCustomer(
                user.id,
                {
                    fullName: dto.fullName,
                    phone: dto.phone,
                    address: dto.address,
                    driverLicense: dto.driverLicense,
                    dateOfBirth: dto.dateOfBirth,
                }
            );

            return {
                email: user.email,
                ...customer,
            }
        })
    };

    async login(dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = await this.jwtService.signAsync(
            payload,
            {
                secret: this.configService.get('JWT_ACCESS_SECRET')!,
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRES')!,
            },
        );

        return {
            accessToken,
            email: user.email,
        }
    }
}