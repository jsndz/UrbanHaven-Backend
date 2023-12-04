import mongoose from "mongoose";

const { Schema } = mongoose;


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  addresses: {
    type: [Schema.Types.Mixed],
  },
  orders: {
    type: [Schema.Types.Mixed],
  },
  name: {
    type: String,
  },
});

const virtual = UserSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const User = mongoose.model("User", UserSchema);

export default User;
