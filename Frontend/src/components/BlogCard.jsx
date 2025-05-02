import LongMenu from "./menu";

export default function BlogCard({ post, user, handleUpdate }) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-2xl bg-base-100 border border-base-200 shadow-[0_0_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm font-medium text-primary tracking-wide">
          {post.author.username}
        </p>
        {user && user.id == post.author.id && (
          <LongMenu triggerUpdate={handleUpdate} post={post} />
        )}
      </div>

      <div className="flex justify-between gap-6 flex-wrap sm:flex-nowrap">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-base-content mb-3 leading-tight tracking-tight">
            {post.title}
          </h2>
          <p className="whitespace-pre-wrap text-base-content/90 leading-relaxed tracking-normal">
            {post.content.length > 150
              ? `${post.content.slice(0, 250)}...`
              : post.content}
          </p>
        </div>
        {post.image && (
          <img
            src={post.image}
            alt="post image"
            className="h-48 w-full sm:w-48 object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
