import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/axiosConfig";
import toast from "react-hot-toast";

export default function BlogCard({ post, user, handleUpdate, deletePost }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      deletePost(id);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
      <div className="mb-4 flex justify-between">
        <p className="text-sm font-medium text-gray-600">
          {post.author.username}
        </p>
        {user && user.id == post.author.id && (
          <div>
            <EditIcon
              className="cursor-pointer text-gray-700"
              onClick={() => handleUpdate(post)}
            />
            <DeleteIcon
              className="cursor-pointer ml-2 text-gray-700"
              onClick={() => {
                toast.promise(handleDelete(post.id), {
                  loading: "Deleting...",
                  success: <b>Post deleted!</b>,
                  error: <b>Could not delete the post.</b>,
                });
              }}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            {post.title}
          </h2>
          <p className="text-gray-600 whitespace-pre-wrap">
            {" "}
            {post.content.length > 150
              ? `${post.content.slice(0, 250)}...`
              : post.content}
          </p>
        </div>
        {post.image && (
          <img
            src={post.image}
            alt="post image"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        )}
      </div>
    </div>
  );
}
