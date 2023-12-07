import { genSaltSync } from "bcrypt";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import JWT_SECRET from '../config/jwt';
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
},{ timestamps: true });

UserSchema.pre('save',function(next){
  const user = this;
  const SALT = genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(user.password,SALT);
  user.password = encryptedPassword;
})

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password,this.password)
}
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

UserSchema.methods.genJwt = function(){
  return jwt.sign({
    id:this._id,
    email:this.email,
  },
  JWT_SECRET,
  {expiresIn:'1h'})
}
const User = mongoose.model("User", UserSchema);

export default User;
