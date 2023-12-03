import express from 'express';
import UserController from '../Controllers/User';

const app = express();

app.get('/login', UserController.getAllUser);

export default app;