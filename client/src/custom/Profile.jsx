import React, { useEffect, useState } from "react";
import AvatarIMG from "../images/AvatarIMG";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import axios from "axios";
import { useCookies } from "react-cookie";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
  const usr = window.localStorage.getItem("username");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(
    "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getu = async () => {
      const res = await axios.get(
        `http://localhost:3000/auth/getuserbyid/${userID}`
      );
      // console.log("user ", res);
      setUser(res.data);
      setAvatar(res.data.avatar);
    };
    if (cookies.access_token && userID != null && userID.length > 0) {
      getu();
    } else {
      console.log("Lofgin first");
    }
  }, []);

  const handleclick = async (e) => {
    setAvatar(e.target.currentSrc);
    const res = await axios.put("http://localhost:3000/auth/changeavatar", {
      userID: userID,
      avatar: e.target.currentSrc,
    });
    console.log(res);
  };

  return (
    <div className="bg-white">
      <div>
        <Tooltip title="Change avatar">
          <Button onClick={handleOpen}>
            <img
              style={{ width: "100px", height: "100px" }}
              src={avatar}
              className="relative"
              alt=""
            />
            <CameraAltIcon
              fontSize="small"
              className="absolute right-5 bottom-2 "
            />
          </Button>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="avatar_box">
            <img
              src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
              alt="avatar"
              onClick={handleclick}
            />

            <img
              src="https://www.kindpng.com/picc/m/78-787033_avatars-clipart-generic-user-woman-people-icon-hd.png"
              alt="avatar"
              onClick={handleclick}
            />
            <img
              src="https://www.kindpng.com/picc/m/630-6306130_avatar-avatar-male-user-icon-hd-png-download.png"
              alt="avatar"
              onClick={handleclick}
            />
            <img
              src="https://www.kindpng.com/picc/m/78-786605_person-icon-transparent-background-hd-png-download.png"
              alt="avatar"
              onClick={handleclick}
            />
            <img
              src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
              alt="avatar"
              onClick={handleclick}
            />
            <img
              src="https://www.kindpng.com/picc/m/664-6643641_avatar-transparent-background-user-icon-hd-png-download.png"
              alt="avatar"
              onClick={handleclick}
            />
            <img
              src="https://www.kindpng.com/picc/m/124-1247870_black-hair-girl-happiness-female-avatar-icon-png.png"
              alt="avatar"
              onClick={handleclick}
            />

            <img
              src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
              alt="avatar"
              onClick={handleclick}
            />

            <img
              src="https://www.kindpng.com/picc/m/78-787127_transparent-talking-to-someone-clipart-material-design-avatar.png"
              alt="avatar"
              onClick={handleclick}
            />
          </div>
        </Modal>
      </div>

      <ProfileMenu usr={usr} userID={userID} />
    </div>
  );
};

export default Profile;
