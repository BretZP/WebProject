import mongoose, { Schema, Document, models, Model } from 'mongoose';

interface IUser extends Document {
  username: string;
  password?: string;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    select: false,
  }
}, { timestamps: true });

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', userSchema);

export default User;
export type { IUser };
