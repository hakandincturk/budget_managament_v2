import express from 'express';
import UserController from '../Controllers/User';

const app = express();

app.post('/login', UserController.login);

export default app;