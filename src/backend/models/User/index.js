import mongoose from "mongoose";
import {schema} from "./schema";

export let User = mongoose.model("User", schema);