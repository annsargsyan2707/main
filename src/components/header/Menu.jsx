import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
//import SearchIcon from "@mui/icons-material/Search";

const options = [
  {
    title: "Atria",
    submenu: ["aaa", "bbb"],
  },
  {
    title: "Luna",
    submenu: ["ccc", "ddd"],
  },
];

const ITEM_HEIGHT = 48;

export default function MyMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
    setOpenSubMenuIndex(null);
  };

  const handleSubmenuOpen = (event, index) => {
    setSubmenuAnchorEl(event.currentTarget);
    setOpenSubMenuIndex(index);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
    setOpenSubMenuIndex(null);
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
      >
        <ViewHeadlineIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option, index) => (
          <div key={index} onMouseLeave={handleSubmenuClose}>
            <MenuItem onMouseEnter={(event) => handleSubmenuOpen(event, index)}>
              {option.title}
            </MenuItem>
            {option.submenu && (
              <Menu
                anchorEl={submenuAnchorEl}
                open={openSubMenuIndex === index}
                onClose={handleSubmenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {option.submenu.map((subItem, subIndex) => (
                  <MenuItem key={subIndex} onClick={handleClose}>
                    {subItem}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </div>
        ))}
      </Menu>
    </div>
  );
}
