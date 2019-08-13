import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user_id : Number,
    post : {
        type: String,
        required: [true, 'İçerik giriniz']
    },
    who : String,
    date : String
})

export default mongoose.model('Posts', postSchema);