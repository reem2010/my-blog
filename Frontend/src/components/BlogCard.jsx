import { useState } from "react";

export default function BlogCard({ post }) {
  const [more, setMore] = useState(false);
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600">{post.author}</p>
      </div>

      <div className="flex justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            {post.title}
          </h2>
          <p className="text-gray-600">{post.content}</p>
        </div>

        <img
          src={post.image}
          alt="Reem Tarek"
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}
