import React from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Tooltip from "@mui/material/Tooltip";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const Bookmark = () => {
  return (
    <Tooltip title="Bookmark" placement="top-start">
       <BookmarkBorderOutlinedIcon />
    </Tooltip>
  );
};

export const RemoveBookmark = () => {
  return (
    <Tooltip title="Remove bookmark" placement="top-start">
      <BookmarkIcon />
    </Tooltip>
  );
};

export const Fullscreen = () => {
  return (
    <Tooltip title="Fullscreen" placement="top-start">
          <FullscreenIcon />
        </Tooltip>
  );
};

export const FullscreenExit = () => {
  return (
    <Tooltip title="Exit fullscreen" placement="top-start">
    <FullscreenExitIcon />
  </Tooltip>
  );
};


