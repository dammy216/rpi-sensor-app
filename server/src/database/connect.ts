import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = "";
  if (!uri) {
    throw new Error("URIが設定されていません");
  }

  try {
    await mongoose.connect(uri);
    console.log("データベースに接続しました");
  } catch (error) {
    throw new Error("データベース接続失敗", { cause: error });
  }
};

