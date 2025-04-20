import mongoose, {Schema, Document, Model } from "mongoose";

interface SScale extends Document {
    name: string;
    songs: string[];
}

const scaleSchema = new Schema<SScale>({
    name: {
        type: String
    },
    songs: {
        type: [String]
    }
});

const Scale: Model<SScale> = mongoose.models.Scale || mongoose.model<SScale>("Scale", scaleSchema);
export default Scale;