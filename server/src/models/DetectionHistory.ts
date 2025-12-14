import mongoose, { Schema, Types } from "mongoose";

export interface DetectionHistoryDoc {
  _id: Types.ObjectId;
  detectedAt: Date;
}

const DetectionHistorySchema = new Schema<DetectionHistoryDoc>({
  detectedAt: {
    type: Date,
    required: true,
    index: true,
  },
});

export default mongoose.model("DetectionHistory", DetectionHistorySchema);
