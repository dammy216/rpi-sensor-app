import mongoose, { Schema, Types } from "mongoose";

export interface DetectionHistoryDoc {
  _id: Types.ObjectId;
  detectedTime: Date;
}

const DetectionHistorySchema = new Schema<DetectionHistoryDoc>({
  detectedTime: {
    type: Date,
    required: true,
    index: true,
  },
});

export default mongoose.model("DetectionHistory", DetectionHistorySchema);
