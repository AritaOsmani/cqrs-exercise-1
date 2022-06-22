import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{

    @Prop({required:true,unique:true})
    username:string

    @Prop({required:true,unique:true})
    email:string

    @Prop({required:true})
    password:string
}

export interface UserInterface{
    _id?:string,
    username:string,
    email:string,
    password:string
}

export const UserSchema = SchemaFactory.createForClass(User)