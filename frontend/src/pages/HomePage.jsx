import { useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI"
import { useEffect } from "react"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"
import api from "../lib/axois"
import NoteNotFound from "../components/NoteNotFound"
import PageIsLoading from "../components/PageIsLoading"


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
        
      }catch(error){
        console.log("seen an error", error)
        if (error.response?.status === 429){
          setIsRateLimited(true)
        }else{
          toast.error("failed to load notes")
        } 
      }
      finally{
        setLoading(false)
      }
    } 

    fetchNotes()
  },[])



  if (loading) {
    return <PageIsLoading />
  }

  return (
    <div className="min-h-screen bg-base-200/30">
      <Navbar/>

      {isRateLimited && <RateLimitedUI/>}

      <div className="mx-auto mt-10 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {notes.length > 0 && !isRateLimited && (
          <>
            <div className="mb-8 flex items-end justify-between border-b border-base-content/10 pb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-base-content">Your Notes</h2>
                <p className="mt-1 text-sm text-base-content/60">
                  {notes.length} {notes.length === 1 ? "note" : "notes"} saved
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {notes.map(note =>
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              )}
            </div>
          </>
        )}

        {notes.length === 0 && !isRateLimited && <NoteNotFound />}
      </div>

    </div>
  )
}

export default HomePage
