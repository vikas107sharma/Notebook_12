import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useCookies } from "react-cookie";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";

export default function ProfileMenu({ usr, userID }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    alert("Loged out");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {userID !== null &&cookies.access_token ? (
          <div className="flex items-center">
            <h1 className="text-xl w-[85px] overflow-hidden truncate font-semibold pt-2 pb-2 pl-2 text-center text-blue-800 tracking-widest capitalize ">
              {usr?.split("@")[0]}
            </h1>
            <ArrowDropDownIcon />
          </div>
        ) : (
          <div className="flex items-center">
            <h1 className="text-xl font-semibold pt-2 pb-2 pl-2 text-center text-blue-800 tracking-widest capitalize ">
              Admin
            </h1>
            <ArrowDropDownIcon />
          </div>
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
       {cookies.access_token && <MenuItem>
          <h1 className="text-xs font-semibold text-center text-blue-800 tracking-widest capitalize ">
            {usr}
          </h1>
        </MenuItem>}
        <MenuItem style={{ padding: 0, margin: 0 }}>
          <Link
            className="hover:bg-zinc-300 pt-2 w-full pb-2 pl-3 pr-3 text-base text-black font-medium"
            as={Link}
            to="/creatednotes"
          >
            Your uploads
          </Link>
        </MenuItem>
        <MenuItem style={{ padding: 0, margin: 0 }}>
          <Link
            className="hover:bg-gray-300 w-full pt-2 pb-2 pl-3 pr-3 text-base text-black font-medium"
            as={Link}
            to="/savednotes"
          >
            Bookmarked
          </Link>
        </MenuItem>

        <div className="flex h-10 ">
          {cookies.access_token ? (
            <MenuItem onClick={handleClose}>
              <button
                className="text-white w-[80px] h-[30px] bg-red-500 hover:bg-red-700 text-sm pl-4 pr-4"
                onClick={logout}
              >
                Logout
              </button>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleClose}>
              <div className="flex ml-auto ">
                <Link
                  className="text-base rounded-md pl-4 pr-4 text-[#5e3aca]  hover:bg-[#7052ca] hover:text-white font-medium"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </MenuItem>
          )}
        </div>
      </Menu>
    </div>
  );
}
