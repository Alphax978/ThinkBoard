import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router"
import api from "../lib/axois"
import toast from "react-hot-toast"
import PageIsLoading from "../components/PageIsLoading"
import { ArrowLeftIcon, Trash2Icon } from "lucide-react"

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate("/")
    } catch (error) {
      console.log("Error deleting note:", error)
      toast.error("Failed to delete note")
    }
  }

  const handleSave =  async () => {

    if (!note.title.trim() || !note.content.trim()){
      toast.error("please add a title or a contennt")
      return;
    }

    setSaving(true)


    try{
      await api.put(`/notes/${id}`, note)
      toast.success("your note has been updated successfully")
      navigate("/")
    }catch(error){
      console.log("encountered an error",error)
      toast.error("encoutered an error")
    }
    finally{
      setSaving(false)
    }
  }
 
  

  useEffect(() => {
    const fetchNote = async () => {
      try{
        const fetched = await api.get(`/notes/${id}`)
        setNote(fetched.data)        

      }catch(error){
        toast.error("failed to fetched the note")
        console.log("saw an error", error)
      }finally{
        setLoading(false)
      }
    }
    fetchNote()
  },[id])

  if (loading) {
    return <PageIsLoading />
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/"
              className="btn btn-ghost btn-sm gap-2 rounded-full text-base-content/70 hover:bg-base-300/40 hover:text-base-content"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-sm gap-2 rounded-full text-error/80 hover:bg-error/10 hover:text-error"
            >
              <Trash2Icon className="h-4 w-4" />
              Delete
            </button>
          </div>

          {/* add it below this */}
          <div className="card relative overflow-hidden border border-base-300/60 bg-base-100 shadow-xl shadow-black/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-accent to-secondary" />

            <div className="card-body gap-0 p-8 sm:p-10">
              <label className="mb-2 text-xs font-semibold uppercase tracking-widest text-base-content/50">
                Title
              </label>
              <input
                type="text"
                placeholder="Untitled note"
                className="w-full rounded-lg border border-white/25 bg-transparent px-4 py-3 text-2xl font-bold tracking-tight text-base-content placeholder:text-base-content/30 transition-colors focus:border-white/60 focus:outline-none sm:text-3xl"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />

              <label className="mb-2 mt-8 text-xs font-semibold uppercase tracking-widest text-base-content/50">
                Content
              </label>
              <textarea
                placeholder="Start writing..."
                className="min-h-[45vh] w-full resize-none rounded-lg border border-white/25 bg-transparent px-4 py-3 text-base leading-8 text-base-content/85 placeholder:text-base-content/30 transition-colors focus:border-white/60 focus:outline-none"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>
          </div>

          <div className="card-actions justify-end">
              <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                {saving ? "saving..." : "Save changes"}
              </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
