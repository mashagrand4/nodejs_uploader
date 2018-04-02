import mongoose from "mongoose";

const Schema = mongoose.Schema;

export let schema = Schema({
    userForImg : { type: Schema.Types.ObjectId, ref: 'User' },
    path : String
});