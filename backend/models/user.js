import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "please enter a valid email address"],
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
      validate: [
        {
          validator: (value) => validator.isStrongPassword(value),
          message:
            "Password must contain at least one or more character and symbols.",
        },
      ],
    },
  },
  {
    timeStamps: true,
  }
);
userSchema.pre("save", async function (next)  {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.comparePassword = async function(givenPassword)  {
  return await bcrypt.compare(givenPassword, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
