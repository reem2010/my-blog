import LongMenu from "./menu";

export default function BlogCard({ post, user, handleUpdate }) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
      <div className="mb-4 flex justify-between">
        <p className="text-sm font-medium text-gray-600">
          {post.author.username}
        </p>
        {user && user.id == post.author.id && (
          <LongMenu triggerUpdate={handleUpdate} post={post} />
        )}
      </div>

      <div className="flex justify-between gap-6 flex-wrap sm:flex-nowrap">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            {post.title}
          </h2>
          <p className="text-gray-600 whitespace-pre-wrap">
            {post.content.length > 150
              ? `${post.content.slice(0, 250)}...`
              : post.content}
          </p>
        </div>
        {post.image && (
          <img
            src={post.image}
            alt="post image"
            className=" h-48 object-cover rounded-lg shadow-md  sm:w-48 m-auto"
          />
        )}
      </div>
    </div>
  );
}
