import bcrypt from "bcrypt";
import mongoose from "mongoose";

export type UserModel = mongoose.Document & {
    email: string,
    password: string,
    profile: {
        name: string,
        gender: string,
        location: string,
        website: string
    },

    comparePassword: comparePasswordFunction,
    toUserJSON: toUserJSON
};

type comparePasswordFunction = (this: any, candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
type toUserJSON = (this: any) => any;

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    profile: {
        gender: String,
        location: String,
        name: String,
        website: String
    }
}, { timestamps: true });

userSchema.pre<UserModel>("save", function save (next) {
    const user = this;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (e: mongoose.Error, hash) => {
            if (e) { return next(e); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.toUserJSON = function () {
    return {
        email: this.email,
        profile: {
            gender: this.profile.gender,
            location: this.profile.location,
            name: this.profile.name,
            website: this.profile.website
        },
    };
};

const User = mongoose.model<UserModel>("User", userSchema);
export default User;
