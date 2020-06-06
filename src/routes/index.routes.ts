import { Router } from "https://deno.land/x/oak/mod.ts";

import { UserController } from "../controllers/index.controller.ts";

const route = new Router();
const userCtrl = new UserController();

route
.get("/users/:id", userCtrl.getUser)
.get("/users", userCtrl.getUsers)
.post("/users", userCtrl.createUser)
.patch("/users/:id", userCtrl.updateUser)
.delete("/users/:id", userCtrl.deleteUser)

export default route;
