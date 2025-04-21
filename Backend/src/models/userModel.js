import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

userSchema.statics.userData = function (id) {
  return this.findById(id, {
    _id: 0,
    __v: 0,
    password: 0,
  });
};

const User = mongoose.model("User", userSchema);
export default User;
