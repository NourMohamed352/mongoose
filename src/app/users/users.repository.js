import { User } from '../../common/db/users.model.js';

export const findUserByEmail = async (email) => {

    return await User.findOne({ email: email });
};

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const findUserById = async (id) => {
    return await User.findById(id);
};

export const updateUser = async (id, updatedData) => {
    return await User.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};