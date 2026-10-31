import * as userService from './users.service.js';

export const signup = async (req, res) => {
    try {
        const userData = req.body;
        await userService.signup(userData);
        res.status(201).json({ message: 'User added successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await userService.login(email, password);
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = req.body;

        await userService.updateProfile(id, updateData);

        res.status(200).json({ message: 'User updated' });

    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Email already exists.') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required in query params' });
        }
        await userService.deleteAccount(id);
        res.status(200).json({ message: 'User deleted' });

    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required in query params' });
        }
        const user = await userService.getUserData(id);
        res.status(200).json(user);

    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};
