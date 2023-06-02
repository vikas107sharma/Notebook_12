import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const UPLOADDATE = ( {date} ) => {
  return (
    <span className="text-xs pt-1">
      <CalendarMonthIcon
        sx={{
          width: "15px",
          color: "gray",
          paddingBottom: "3px",
        }}
      />{" "}
      {date}
    </span>
  );
};
