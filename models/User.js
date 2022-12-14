import { Schema, model, models } from 'mongoose';
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    img: { type: String, required: false, default: "https://data.whicdn.com/images/352835841/original.jpg" },
    rol: { type: String, required: true },
    API: { type: Boolean, required: true, default: false }
});

userSchema.methods.encryptPassword = async (password) => {
    const encrypted = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = bcrypt.hash(password, encrypted);
    return hash;
}

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const User = models.User || model('User', userSchema);

export default User;
