import { Loader2Icon } from "lucide-react"

const PageIsLoading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-base-100 via-base-200 to-base-100">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <Loader2Icon className="size-16 animate-spin text-primary drop-shadow-lg" strokeWidth={1.5} />
        </div>
        <p className="text-lg font-medium text-base-content/70 tracking-wide">Loading</p>
      </div>
    </div>
  )
}

export default PageIsLoading
