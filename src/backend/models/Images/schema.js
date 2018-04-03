import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default Schema({
  userForImg: { type: Schema.Types.ObjectId, ref: 'User' },
  path: String,
});
