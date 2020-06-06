import { Response, Request } from "https://deno.land/x/oak/mod.ts";
import { httpErrors } from "https://deno.land/x/oak/mod.ts";
import { UserSchema } from "../models/user.model.ts";

export class UserController {
  constructor() {}

  userSchema = new UserSchema();
  getUser = async ({ params, response }: {params: { id: string}; response: Response }): Promise<any> => {
    const user = await this.userSchema.getUser(params.id);
    console.log(params.id)
    if (!user) {
      throw new httpErrors.BadRequest("Usuário não existe!");
    }
    response.body = {
      user
    };
  };

  getUsers = async ({ response }: { response: Response }): Promise<any> => {
    const allUsers = await this.userSchema.getUsers();
    response.body = {
      allUsers
    };
  };

  createUser = async (
    { request, response }: { request: Request; response: Response },
  ): Promise<any> => {
    const body = await request.body();
    const isValid = await this.userSchema.validateLogin(body.value.login);
    if(!isValid) { throw new httpErrors.BadRequest('Login já existente')};
    const newUser = await this.userSchema.createUser(body.value);
    response.body = {
      message: "Usuário Criado",
      newUser
    };
  };

  updateUser = async(
    {params, request, response}: { params: {id: string}; request: Request; response: Response}
    ): Promise<any> => {
      const body = await request.body();
      const isUpdated = await this.userSchema.updateUsers(params.id, body.value);
      if(isUpdated.modifiedCount < 1) {
        throw new httpErrors.BadRequest('Usuário não necontrado')
      }
      const updatedUser = await this.userSchema.getUser(params.id)
      response.body = {
       message: "Usuário atualizado com sucesso",
       user: updatedUser
      }
    };

    deleteUser = async(
      {params, response}: { params: {id: string}; response: Response}
      ): Promise<any> => {
        const isDeleted = await this.userSchema.delete(params.id);
        if(isDeleted < 1) {
          throw new httpErrors.BadRequest('Usuário não encontrado')
        }
        response.body = {
         message: "Usuário excluido com sucesso"
        }
      };
}
