import Note from "../models/notes.js";

export async function getAllNotes(req, res){
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);        
    }catch(error){
        console.error("error in getallnotes controller", error)
        res.status(500).json({message:"internal server error"})
    }
}

export async function getNotesById (req, res){
    try{
        const note = await Note.findById(req.params.id)
        if (!note) res.status(404).json({message:"note not found"})
        res.status(200).json(note)
    }catch(error){
        console.log("error finding the note", error)
        res.status(500).json({message:"internal server error"})
    }

}
export async function postNotes(req, res){
    try{
        const {title, content} = req.body
        const newNote = new Note({title, content})
        await newNote.save();
        res.status(201).json({message:"note created successfully"})
    }catch(error){
        console.log("error in creating a note", error)
        res.status(500).json({message:"internal server error"})

    }
}
export async function editNotes(req, res){
    try{
       const {title, content} = req.body
       const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content})
       if (!updatedNote) return res.status(404).json({message:"no note found to update"})
       res.status(200).json({message: "note edited successfully"})
    
    }catch(error){
        console.log("error in updating a note", error)
        res.status(500).json({message: "internal server errror"})
    }
}
export async function deleteNotes(req, res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) {
            res.return(404).json({message:"no note found to delete"})
        }
        res.status(200).json({message:"note deleted succcessfully"})
    }catch(error){
        console.log("error in deleting a note", error)
        res.status(500).json({message:"internal server error"})

    }
}