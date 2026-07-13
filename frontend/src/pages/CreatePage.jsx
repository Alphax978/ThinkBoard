import { ArrowLeftIcon, FileTextIcon, Loader2Icon, PlusIcon, TypeIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axois"

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card relative overflow-hidden border border-base-300/60 bg-base-100 shadow-2xl shadow-black/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
            <div className="card-body p-6 sm:p-8">
              <div className="mb-2 flex items-center justify-between gap-4">
                <h2 className="card-title text-2xl">Create New Note</h2>
                <div className="rounded-full border border-primary/20 bg-primary/10 p-3 text-primary">
                  <FileTextIcon className="size-5" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control w-full">
                  <label className="label px-0 pb-2">
                    <span className="label-text font-medium">Title</span>
                    <span className="label-text-alt text-base-content/50">{title.length}/80</span>
                  </label>
                  <div className="relative">
                    <TypeIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-base-content/40" />
                    <input
                      type="text"
                      placeholder="Note Title"
                      maxLength={80}
                      className="input input-bordered h-12 w-full bg-base-200/60 pl-11 pr-4 text-base transition-all duration-200 focus:border-primary focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-control w-full">
                  <label className="label px-0 pb-2">
                    <span className="label-text font-medium">Content</span>
                    <span className="label-text-alt text-base-content/50">{content.length}/1000</span>
                  </label>
                  <div className="relative">
                    <FileTextIcon className="pointer-events-none absolute left-4 top-4 size-5 text-base-content/40" />
                    <textarea
                      placeholder="Write your note here..."
                      maxLength={1000}
                      className="textarea textarea-bordered min-h-44 w-full resize-y bg-base-200/60 py-4 pl-11 pr-4 text-base leading-7 transition-all duration-200 focus:border-primary focus:bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end border-t border-base-300/70 pt-6">
                  <button
                    type="submit"
                    className="btn btn-primary min-w-40 shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary/30"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2Icon className="size-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <PlusIcon className="size-4" />
                        Create Note
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
