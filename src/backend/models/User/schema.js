import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default Schema({
  _id: Schema.Types.ObjectId,
  userName: String,
  pass: String,
  user_cookie: String,
  images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
});
