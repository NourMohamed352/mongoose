import express from 'express';
import { userRouter } from "./app/users/users.route.js";
import { connectDB } from './common/db/connection.js';
import {noteRouter} from "./app/notes/notes.route.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/notes', noteRouter);

connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
});