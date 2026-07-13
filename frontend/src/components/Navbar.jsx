import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-base-content/10 bg-base-300/80 shadow-lg shadow-black/10 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <Link to={"/"}>
                    <h1 className="font-mono text-3xl font-bold tracking-tight text-primary drop-shadow-[0_0_18px_rgba(34,197,94,0.35)]">ThinkBoard</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary rounded-full px-6 shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary/30">
                        <PlusIcon className="size-5"/>
                        <span>New Note</span>
                    </Link>

                </div>
            </div>

        </div>

    </header>
  )
}

export default Navbar
