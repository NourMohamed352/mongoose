import * as userRepo from './users.repository.js';

export const signup = async (userData) => {
    const existingUser = await userRepo.findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error('Email already exists.');
    }
    const newUser = await userRepo.createUser(userData);
    return newUser;
};

export const login = async (email, password) => {
    const user = await userRepo.findUserByEmail(email);
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
    }
    return user;
};

export const updateProfile = async (id, data) => {
    const user = await userRepo.findUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    if (data.password) {
        delete data.password;
    }
    if (data.email && data.email !== user.email) {
        const emailExists = await userRepo.findUserByEmail(data.email);
        if (emailExists) {
            throw new Error('Email already exists.');
        }
    }

    const updatedUser = await userRepo.updateUser(id, data);
    return updatedUser;
};

export const deleteAccount = async (id) => {
    const user = await userRepo.findUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    await userRepo.deleteUser(id);
};

export const getUserData = async (id) => {
    const user = await userRepo.findUserById(id);
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};