import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ['female', 'male', 'other'],
    },
    profilePicture: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
