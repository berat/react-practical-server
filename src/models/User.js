import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
     nickName : String,
     email : {
         type: String,
         unique: true,
         required: [true, 'Lütfen mail adresi girin']
     },
     password: String,
     date: Date
})

export default mongoose.model('User', userSchema);