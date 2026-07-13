import { PlusIcon, BookOpenIcon } from "lucide-react"
import { Link } from "react-router"

const NoteNotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-linear-to-br from-base-100 via-base-200 to-base-100 px-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-primary/10 p-6 shadow-xl shadow-primary/20">
            <BookOpenIcon className="size-20 text-primary drop-shadow-lg" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-base-content">
          No Notes Added
        </h1>

        <p className="mb-8 max-w-md text-base-content/70 text-lg leading-relaxed">
          Start creating your thoughts and ideas. Add your first note to get started.
        </p>

        <Link
          to="/create"
          className="btn btn-primary gap-2 rounded-full px-8 shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary/30"
        >
          <PlusIcon className="size-5" />
          <span>Create Note</span>
        </Link>
      </div>
    </div>
  )
}

export default NoteNotFound
