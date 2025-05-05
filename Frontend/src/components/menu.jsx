import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../api/axiosConfig";
import toast from "react-hot-toast";
import { postContext } from "../contexts/PostContext";
import { useContext } from "react";

const ITEM_HEIGHT = 48;

export default function LongMenu({ triggerUpdate, post }) {
  const { deletePost } = useContext(postContext);

  const handleDelete = () => {
    setAnchorEl(null);
    toast.promise(
      api.delete(`/posts/${post.id}`).then(() => deletePost(post.id)),
      {
        loading: "Deleting...",
        success: <b>Post deleted!</b>,
        error: <b>Could not delete the post.</b>,
      }
    );
  };

  const handleUpdate = () => {
    setAnchorEl(null);
    triggerUpdate(post);
  };
  const options = [
    { text: "Edit", action: handleUpdate },
    { text: "Delete", action: handleDelete },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: "#7362e0",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          horizontal: "right",
        }}
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
        className="cursor-pointer"
      >
        {options.map((option) => (
          <MenuItem
            key={option.text}
            selected={option === "Pyxis"}
            onClick={option.action}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
