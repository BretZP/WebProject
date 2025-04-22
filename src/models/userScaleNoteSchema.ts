
import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

export interface IUserScaleNote extends Document {
  userId: Types.ObjectId;
  scaleName: string;
  notesText: string;
}

const userScaleNoteSchema: Schema<IUserScaleNote> = new Schema({
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
  notesText: {
    type: String,
    default: '',
  }
}, { timestamps: true });


userScaleNoteSchema.index({ userId: 1, scaleName: 1 }, { unique: true });

const UserScaleNote: Model<IUserScaleNote> = models.UserScaleNote || mongoose.model<IUserScaleNote>('UserScaleNote', userScaleNoteSchema);

export default UserScaleNote;