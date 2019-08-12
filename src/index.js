import express from 'express';
import bodyParser from 'body-parser';
import AuthRouter from './routes';
import mongoose from 'mongoose';
import cors from 'cors';


mongoose.connect('mongodb+srv://root:root@cluster0-qwfpm.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}, err => console.log(err ? err : 'Mongo connected.'));


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

AuthRouter(app);

app.get('/', (req, res) => {
    res.send("API yapıyoruz.");
})

app.listen(process.env.PORT || 3000, () => console.log("server ayakta"))