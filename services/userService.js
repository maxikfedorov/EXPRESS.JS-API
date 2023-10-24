const User = require('../models/userModel.js');

const getAllUsers = async () => {
    return await User.find();
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const createUser = async (username, password, email) => {
    const newUser = new User({
        username: username,
        password: password,
        email: email
    });

    return await newUser.save();
};

const updateUser = async (id, username, password, email) => {
    const user = await User.findById(id);
    if (username != null) {
        user.username = username;
    }

    if (password != null) {
        user.password = password;
    }

    if (email != null) {
        user.email = email;
    }

    return await user.save();
};

const deleteUser = async (id) => {
    const user = await User.findById(id);
    await user.deleteOne();
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
