import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header() {
  return (
    <header>
      <h1>
        <HighlightIcon />
        <span className="app-title">QuickNote</span>
      </h1>
    </header>
  );
}

export default Header;
