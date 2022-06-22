import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdatePostDto } from "src/posts/dto/update-post.dto";
import { CreatePostDto } from "../../../posts/dto/create-post.dto";
import { UserPost, UserPostInterface } from "../entities/post.entity";

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(UserPost.name) private postModel: Model<UserPostInterface>
    ) { }

    async create(createPostDto: CreatePostDto): Promise<UserPostInterface> {
        const newPost = new this.postModel(createPostDto)
        return await newPost.save()
    }

    async update(postId: string, updatePostDto: UpdatePostDto) {
        await this.postModel.updateOne({ _id: postId }, { $set: updatePostDto })
    }

    async getPostById(postId: string): Promise<UserPostInterface> {
        return await this.postModel.findById({ _id: postId })
    }

    async deleteUsersPost(authorId: string) {
        await this.postModel.deleteMany({ authorId })
    }
}