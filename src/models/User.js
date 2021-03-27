const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// This will be invoked before save method
userSchema.pre('save', function (next) {
    const user = this;

    // Will be accessed if the user's password is modified
    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

// Creating the method for user to compare the password with hash
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

mongoose.model('User', userSchema);