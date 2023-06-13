import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarmodal.css";

const CalendarModal = ({
  value,
  onChange,
  setIsCalendarModal,
  handleSubmit,
  isCalendarModal,
}) => {
  const [date, setDate] = useState();

  const handleonChange = (data) => {
    // const { name, value } = e.target;
    setDate(data);
  };
  const handleApply = () => {
    onChange(date);
    setIsCalendarModal(false);
    handleSubmit && handleSubmit(date);
  };
  return (
    <Box
      position={"absolute"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      boxShadow={"0px 5px 20px rgba(0, 0, 0, 0.3)"}
      zIndex={1}
      borderRadius={"12px"}
    >
      <Calendar onChange={handleonChange} value={value} />
      <Box position={"absolute"} bottom={0} height={60} width={"100%"} px={2}>
        <Box
          borderTop={"1px solid rgba(0, 0, 0, 0.1)"}
          width={"100%"}
          p={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "50%",
              height: "40px",
              backgroundColor: "white",
              color: "black",
              borderColor: "#E57C23",
              borderRadius: "12px",
              fontSize: "14px",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
            onClick={() => setIsCalendarModal(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "50%",
              height: "40px",
              backgroundColor: "#E57C23",
              borderRadius: "12px",
              fontSize: "14px",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
            onClick={handleApply}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarModal;
