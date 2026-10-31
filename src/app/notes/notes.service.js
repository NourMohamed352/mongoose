import * as noteRepo from './notes.repository.js';

export const addNote = async (noteData, userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    const newNoteData = {
        ...noteData,
        userId: userId
    };

    return await noteRepo.createNote(newNoteData);
};

export const editNote = async (noteId, userId, updatedData) => {
    const note = await noteRepo.findNoteById(noteId);
    if (!note) {
        throw new Error('Note not found');
    }
    if (note.userId.toString() !== userId) {
        throw new Error('You are not the owner');
    }
    const updatedNote = await noteRepo.updateNote(noteId, updatedData);
    return updatedNote;
};

export const replaceNoteData = async (noteId, userId, newData) => {
    const note = await noteRepo.findNoteById(noteId);
    if (!note) {
        throw new Error('Note not found');
    }
    if (note.userId.toString() !== userId) {
        throw new Error('You are not the owner');
    }
    const dataToReplace = {
        ...newData,
        userId: note.userId
    };

    const updatedNote = await noteRepo.replaceNote(noteId, dataToReplace);
    return updatedNote;
};

export const updateAllUserNotes = async (userId, updatedData) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    const result = await noteRepo.updateAllNotesByUser(userId, updatedData);
    if (result.matchedCount === 0) {
        throw new Error('No note found');
    }

    return result;
};

export const removeNote = async (noteId, userId) => {
    const note = await noteRepo.findNoteById(noteId);
    if (!note) {
        throw new Error('Note not found');
    }
    if (note.userId.toString() !== userId) {
        throw new Error('You are not the owner');
    }
    const deletedNote = await noteRepo.deleteNote(noteId);
    return deletedNote;
};

export const getNotesPaginated = async (userId, page = 1, limit = 10) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
        throw new Error('Page and limit must be positive numbers');
    }

    const notes = await noteRepo.getPaginatedNotes(userId, pageNumber, limitNumber);
    return notes;
};

export const getNoteById = async (noteId, userId) => {
    const note = await noteRepo.findNoteById(noteId);

    if (!note) {
        throw new Error('Note not found');
    }
    if (note.userId.toString() !== userId) {
        throw new Error('You are not the owner');
    }
    return note;
};


export const getNoteByContent = async (content, userId) => {
    if (!content) {
        throw new Error('Content query parameter is required');
    }
    const note = await noteRepo.findNoteByContentAndUser(content, userId);
    if (!note) {
        throw new Error('No note found');
    }

    return note;
};
export const getNotesWithUser = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    const notes = await noteRepo.getNotesWithUserInfo(userId);
    return notes;
};

export const getAggregated = async (userId, title) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    const notes = await noteRepo.getAggregatedNotes(userId, title);
    return notes;
};

export const deleteAllUserNotes = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    await noteRepo.deleteManyNotes(userId);
};
