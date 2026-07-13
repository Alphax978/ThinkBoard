import express from "express"
import { deleteNotes, editNotes, getAllNotes, postNotes, getNotesById } from "../controllers/notesController.js"

const router = express.Router()

router.get("/", getAllNotes)
router.get("/:id", getNotesById)
router.post("/", postNotes)
router.put("/:id", editNotes)
router.delete("/:id", deleteNotes)

export default router;