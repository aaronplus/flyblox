const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserAdressScheme = new mongoose.Schema({
  address: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  activated: {
    type: Boolean,
    default: true,
  },
})

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    photo: {
      type: String,
    },
    phone: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    addresses: [
      {
        type: UserAdressScheme,
      },
    ],
    password: {
      type: String,
      required: true,
    },
    twofactorauth: {
      type: Boolean,
      default: false,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre("save", function (next) {
  const user = this
  if (!user.isModified("password")) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err)
      }

      if (!isMatch) {
        return resolve(false)
      }

      resolve(true)
    })
  })
}

module.exports = User = mongoose.model("User", UserSchema)
