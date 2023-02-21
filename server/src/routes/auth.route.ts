import { Router } from 'express';
import { login, getAllUsers } from '../controllers/auth.controller';

export const AuthRouter: Router = Router();

AuthRouter.get('/', getAllUsers);
AuthRouter.post('/login', login);
