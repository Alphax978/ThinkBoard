import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/utils.js"
import api from "../lib/axois.js"
import toast from "react-hot-toast"
const NoteCard = ({note, setNotes}) => {

  const handleDelete = async (e, id) => {
    e.preventDefault()

    if (!window.confirm("are you sure you want to delete the note?")) return


    try{
      await api.delete(`/notes/${id}`)    
      setNotes((prev) => prev.filter(note => note._id !== id))
      toast.success("your note has been deleted successfully")
    }catch(error){
      console.log("encountered an error here", error)
      toast.error("error encountered")
    }

  }


  return (
    <Link to={`/note/${note._id}`} className="card group relative overflow-hidden border border-base-300/70 bg-base-100/80 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
        <div className="card-body min-h-52 p-7">
            <h3 className="card-title line-clamp-1 text-xl font-bold text-base-content transition-colors duration-200 group-hover:text-primary">{note.title}</h3>
            <p className="line-clamp-3 min-h-16 text-base leading-7 text-base-content/70">{note.content}</p>
            <div className="card-actions mt-auto items-center justify-between border-t border-base-300/70 pt-5">
              <span className="text-sm font-medium text-base-content/50">
                {formatDate(new Date(note.createdAt))}
              </span>
              <div className="flex items-center gap-2 text-base-content/60">
                <PenSquareIcon className="size-4 transition-colors duration-200 hover:text-primary"/>
                <button className="btn btn-ghost btn-xs rounded-full text-error hover:bg-error/10">
                  <Trash2Icon className="size-4" onClick={(e) => handleDelete(e, note._id)}/>
                </button>
              </div>

            </div>
        </div>
    </Link>
  )
}

export default NoteCard
