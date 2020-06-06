import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { UserSchema } from "../src/models/user.model.ts";
import { IUser } from "../src/interface/user.interface.ts";

const userSchema = new UserSchema();

let userId: string;
const user: IUser= {
  login: 'test_login',
  name: 'test_name',
  password: 'test_password'
};

const userUpdated: IUser= {
  login: 'test_loginUp',
  name: 'test_nameUp',
  password: 'test_passwordUp'
};

Deno.test('should creteUser', async () => {
  const testUser = await userSchema.createUser(user);
  assertEquals(testUser.login, user.login);
  assertEquals(testUser.password, user.password);
  assertEquals(testUser.name, user.name);
});


Deno.test('should getUserByName', async () => {
  const testUser = await userSchema.getUserByName(user.name);
  userId = testUser._id.$oid;
  console.log(userId)
  assertEquals(testUser.name, user.name);
});

Deno.test('should getUserById', async () => {
  const testUser = await userSchema.getUser(userId);
  assertEquals(testUser.name, user.name);
});

Deno.test('should getAllUsers', async () => {
  const testUser = await userSchema.getUsers();
  if(Array.isArray(testUser.length)) {
    throw new Error('Error getAllUsers')
  }
});


Deno.test('should deleteUser', async () => {
  const testUser = await userSchema.delete(userId);
  if(testUser <= 0) {
    throw new Error('Error deleteUser')
  }
});

