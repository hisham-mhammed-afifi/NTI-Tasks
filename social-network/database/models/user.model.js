const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    country: {
      type: String,
      trim: true,
    },
    photos: [
      {
        photo: {
          type: String,
          trim: true,
        },
      },
    ],
    following: [
      {
        follow: {
          type: mongoose.Types.ObjectId,
        },
      },
    ],
    accountStatus: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      minLength: 11,
      maxLength: 11,
    },
    tokens: [
      {
        token: {
          type: String,
          trim: true,
        },
      },
    ],
    otp: {
      type: Number,
      trim: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

// hide some data
// userSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   deletedElements = [];
//   deletedElements.forEach((element) => {
//     delete user[element];
//   });
//   return user;
// };

// bcrypt password

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT)
    );
  }
});

//login
// userSchema.statics.findByCreditionals = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("invalid email");
//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) throw new Error("invalid password");
//   return user;
// };

//generate token
// userSchema.methods.generateToken = async function () {
//   const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
//   this.tokens = { ...this.tokens, token };
//   await user.save();
//   return token;
// };

// compare password
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    else return cb(null, isMatch);
  });
};

//relation
userSchema.virtual("userPosts", {
  ref: "Post",
  localField: "_id",
  foreignField: "userId",
});
userSchema.virtual("userGroups", {
  ref: "Group",
  localField: "_id",
  foreignField: "userId",
});
userSchema.virtual("userComments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "userId",
});

const User = mongoose.model("User", userSchema);
module.exports = User;
