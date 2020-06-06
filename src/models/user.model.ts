import db from "../db/connection.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
import { IUser } from "../interface/user.interface.ts";

export class UserSchema {
  constructor() {}
  userSchema = db.collection("users");

  createUser = async (user: IUser): Promise<any> => {
    const newUser = user;
    await this.userSchema.insertOne(newUser);
    return newUser
  };

  validateLogin = async (login: string): Promise<Boolean> => {
    const exists = await this.userSchema.findOne({
        login
    });
    if(!exists) {
        return true
    }
    return false
  };

  getUser = async (id: string): Promise<IUser> => {
    return await this.userSchema.findOne({
        _id: ObjectId(id)
    });
  };

  getUserByName = async(name: string): Promise<any> => {
    return await this.userSchema.findOne({
      name
    })
  }

  getUsers = async (): Promise<IUser[]> => {
    return await this.userSchema.find();
  };

  updateUsers = async (id: string, userUpdated: IUser): Promise<any> => {
    return await this.userSchema.updateOne(
      {_id :ObjectId(id)}, 
      userUpdated);
  };

  delete = async (id: string): Promise<Number> => {
    return await this.userSchema.deleteOne({
      _id: ObjectId(id),
    });
  };
}
