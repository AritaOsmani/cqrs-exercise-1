import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class UserPost {

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    content: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    authorId: string
}

export interface UserPostInterface {
    _id?: string,
    title: string,
    content: string,
    authorId: string
}

export const UserPostSchema = SchemaFactory.createForClass(UserPost)