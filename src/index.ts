import express from "express";
const app = express();
const port = 8080; // default port to listen

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import userRouter from './routes/users';
app.use('/users', userRouter);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );