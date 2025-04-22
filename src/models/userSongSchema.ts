import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

export interface IUserSong extends Document {
  userId: Types.ObjectId;
  scaleName: string;
  songTitle: string;
}

const userSongSchema: Schema<IUserSong> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  scaleName: {
    type: String,
    required: true,
    index: true,
  },
  songTitle: {
    type: String,
    required: true,
  }
}, { timestamps: true });

userSongSchema.index({ userId: 1, scaleName: 1, songTitle: 1 }, { unique: true });

const UserSong: Model<IUserSong> = models.UserSong || mongoose.model<IUserSong>('UserSong', userSongSchema);

export default UserSong;
