import {Router} from "express";
import {
    createNote, deleteAllNotes,
    deleteNote, getAggregate, getNote, getNoteWithUser,
    getPaginatedNotes,
    replaceNote,
    updateAllNotes,
    updateNote
} from "./notes.controller.js";
import {getNoteByContent} from "./notes.service.js";

export const noteRouter = Router();

noteRouter.get('/paginate-sort', getPaginatedNotes);

noteRouter.post('/', createNote);
noteRouter.get('/note-by-content', getNoteByContent);

noteRouter.get('/aggregate', getAggregate);

noteRouter.get('/note-with-user', getNoteWithUser);
noteRouter.patch('/all', updateAllNotes);

noteRouter.patch('/:noteId', updateNote);
noteRouter.put('/replace/:noteId', replaceNote);
noteRouter.delete('/', deleteAllNotes);

noteRouter.delete('/:noteId', deleteNote);
noteRouter.get('/:id', getNote);



