import { Router } from "express";
import {signup, login, updateUser, deleteUser, getUser} from './users.controller.js';

export const userRouter = Router();
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.patch('/:id', updateUser);
userRouter.delete('/', deleteUser);
userRouter.get('/', getUser)