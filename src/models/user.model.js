import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 60,
        trim: true
    },
    fullName: {
        type: String,
        default: function () {
            return this.firstName + " " + this.lastName
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        lowercase: true
    },
    role: {
        type: String,
        enum: ['admin', 'writer', 'guest']
    },
    age: {
        type: Number,
        min: 1,
        max: 99,
        set: function(v) {
            return v < 0 ? 1 : v;
        }
    },
    numberOfArticles: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
});

userSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});
userSchema.pre("findOneAndUpdate", function (next) {
    this.set({ fullName: this.get("firstName") + " " + this.get("lastName")  });
    next();
});



const User = mongoose.model('User', userSchema);

export default User;
