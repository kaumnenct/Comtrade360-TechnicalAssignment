import mongoose from "mongoose";
import "dotenv/config";

const connect = () => {
  const dbURI = process.env.MONGO_URI;

  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Database connection error: ", err));
};

export default connect;
