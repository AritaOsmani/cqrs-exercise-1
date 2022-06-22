import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateUserDto } from "../../../users/dto/updateUser.dto";
import { CreateUserDto } from "../../../users/dto/createUser.dto";
import { User, UserInterface } from "../entities/user.entity";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserInterface>) { }

    async create(createUserDto: CreateUserDto): Promise<UserInterface> {
        const newUser = new this.userModel(createUserDto)
        return await newUser.save()
    }

    async getUserById(userId: string): Promise<UserInterface> {
        return this.userModel.findById({ _id: userId })
    }

    async getAllUsers(): Promise<UserInterface[]> {
        return this.userModel.find()
    }

    async getByUsername(username: string): Promise<UserInterface> {
        return this.userModel.findOne({ username })
    }

    async getByEmail(email: string): Promise<UserInterface> {
        return this.userModel.findOne({ email })
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<void> {
        await this.userModel.updateOne({ _id: userId }, { $set: updateUserDto })
    }

    async delete(userId: string) {
        await this.userModel.deleteOne({ _id: userId })
    }
}