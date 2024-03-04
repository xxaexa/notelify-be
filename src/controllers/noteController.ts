import { Request, Response } from "express";
import { Note } from "../models/Note";

// Create
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;
    const newNote = new Note({
      user_id: userId,
      title,
      description,
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read
export const getNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const notes = await Note.find({ user_id: userId });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// ReadOne
export const getNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    res.status(200).json(note);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
export const updateNote = async (req: Request, res: Response) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedNote);
  } catch (error) {
    res.status(404).send(error);
  }
};

// Delete
export const deletedNote = async (req: Request, res: Response) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).send();
    res.status(200).send(deletedNote);
  } catch (error) {
    res.status(500).send(error);
  }
};
