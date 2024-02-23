"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedNote = exports.updateNote = exports.getNote = exports.getNotes = exports.createNote = void 0;
const Note_1 = require("../models/Note");
// Create
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const newNote = new Note_1.Note({
            user_id: userId,
            title,
            description,
        });
        yield newNote.save();
        res.status(201).json(newNote);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createNote = createNote;
// Read
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        console.log(userId);
        const notes = yield Note_1.Note.find({ user_id: userId });
        res.status(200).send(notes);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getNotes = getNotes;
// ReadOne
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const note = yield Note_1.Note.findById(noteId);
        res.status(200).json(note);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getNote = getNote;
// Update
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedNote = yield Note_1.Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send(updatedNote);
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.updateNote = updateNote;
// Delete
const deletedNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedNote = yield Note_1.Note.findByIdAndDelete(req.params.id);
        if (!deletedNote)
            return res.status(404).send();
        res.status(200).send(deletedNote);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.deletedNote = deletedNote;
