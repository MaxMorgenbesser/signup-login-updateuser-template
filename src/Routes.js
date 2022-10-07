import { Router } from "express";
import { home,login,signup, updateuser } from "./Services.js";

export const BrowserRouter = Router()

BrowserRouter.get('/', home )

BrowserRouter.post('/users/signup', signup)


BrowserRouter.get("/users/login" , login)

BrowserRouter.put("/users/update" , updateuser)