import express from 'express';
import AuthController from '../Controllers/Auth';

const app = express();

app.post('/createUser', AuthController.createUser);

export default app;