import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    userForImg: { type: Schema.Types.ObjectId, ref: 'User' },
    path: String,
});

export default imagesSchema;
