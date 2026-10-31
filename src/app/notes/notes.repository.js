import { Note } from '../../common/db/notes.model.js';
import mongoose from 'mongoose';
export const createNote = async (noteData) => {
    return await Note.create(noteData);
};
export const findNoteById = async (id) => {
    return await Note.findById(id);
};
export const updateNote = async (id, updatedData) => {
    return await Note.findByIdAndUpdate(id, updatedData, { new: true });
};
export const replaceNote = async (id, newData) => {
    return await Note.findOneAndReplace({ _id: id }, newData, { new: true });
};
export const updateAllNotesByUser = async (userId, updatedData) => {
    return await Note.updateMany({ userId: userId }, { $set: updatedData });
};
export const deleteNote = async (id) => {
    return await Note.findByIdAndDelete(id);
};
export const getPaginatedNotes = async (userId, page, limit) => {
    const skip = (page - 1) * limit;
    return Note.find({userId: userId})
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);
};
export const findNoteByContentAndUser = async (content, userId) => {
    return await Note.findOne({
        content: content,
        userId: userId
    });
};
export const getNotesWithUserInfo = async (userId) => {
    return await Note.find({ userId: userId })
        .select('title userId createdAt')
        .populate('userId', 'email');
};

export const getAggregatedNotes = async (userId, title) => {
    const matchCondition = { userId: new mongoose.Types.ObjectId(userId) };
    if (title) {
        matchCondition.title = title;
    }

    return await Note.aggregate([
        { $match: matchCondition },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                userId: 1,
                createdAt: 1,
                user: { $arrayElemAt: ['$userDetails', 0] }
            }
        },
        {
            $project: {
                title: 1,
                userId: 1,
                createdAt: 1,
                "user.name": 1,
                "user.email": 1
            }
        }
    ]);
};


export const deleteManyNotes = async (userId) => {
    return await Note.deleteMany({ userId: userId });
};

