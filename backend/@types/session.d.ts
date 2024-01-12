// DEFINITION FILES FOR TYPES THAT ARE NOT DEFINED IN THE PROJECT
import mongoose from "mongoose";

declare module 'express-session' {
      interface SessionData {
      userId: mongoose.Types.ObjectId;
    }
}
   