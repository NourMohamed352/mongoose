import * as noteService from './notes.service.js';

export const createNote = async (req, res) => {
    try {
        const { userId } = req.query;
        const noteData = req.body;

        await noteService.addNote(noteData, userId);
        res.status(201).json({
            message: 'Note created' ,
            noteId: newNote._id});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;

        const updatedData = req.body;

        const updatedNote = await noteService.editNote(noteId, userId, updatedData);
        res.status(200).json({
            message: 'updated',
            note: updatedNote
        });

    } catch (error) {
        if (error.message === 'You are not the owner') {
            return res.status(403).json({ message: error.message });
        }
        if (error.message === 'Note not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
};
export const replaceNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;
        const newData = req.body;
        const updatedNote = await noteService.replaceNoteData(noteId, userId, newData);
        res.status(200).json(updatedNote);

    } catch (error) {
        if (error.message === 'You are not the owner') {
            return res.status(403).json({ message: error.message });
        }
        if (error.message === 'Note not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
};
export const updateAllNotes = async (req, res) => {
    try {
        const { userId } = req.query;
        const updatedData = req.body;

        await noteService.updateAllUserNotes(userId, updatedData);
        res.status(200).json({ message: 'All notes updated' });

    } catch (error) {
        if (error.message === 'No note found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { userId } = req.query;
        const deletedNote = await noteService.removeNote(noteId, userId);
        res.status(200).json({
            message: 'deleted',
            note: deletedNote
        });

    } catch (error) {
        if (error.message === 'Note not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'You are not the owner') {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const getPaginatedNotes = async (req, res) => {
    try {
        const { userId, page, limit } = req.query;

        const notes = await noteService.getNotesPaginated(userId, page, limit);
        res.status(200).json(notes);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const note = await noteService.getNoteById(id, userId);
        res.status(200).json(note);

    } catch (error) {
        if (error.message === 'Note not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'You are not the owner') {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const getNoteByContent = async (req, res) => {
    try {
        const { content, userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const note = await noteService.getNoteByContent(content, userId);
        res.status(200).json(note);

    } catch (error) {
        if (error.message === 'No note found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({ message: error.message });
    }
};

export const getNoteWithUser = async (req, res) => {
    try {
        const { userId } = req.query;

        const notes = await noteService.getNotesWithUser(userId);
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAggregate = async (req, res) => {
    try {
        const { userId, title } = req.query;

        const notes = await noteService.getAggregated(userId, title);
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAllNotes = async (req, res) => {
    try {
        const { userId } = req.query;

        await noteService.deleteAllUserNotes(userId);
        res.status(200).json({ message: 'Deleted' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
