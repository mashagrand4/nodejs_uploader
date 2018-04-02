import mongoose from "mongoose";
import {schema} from "./schema";

export let Images = mongoose.model("Images", schema);

