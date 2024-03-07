import { Colors } from "./colors";

export const TextFieldStyles = {
  input: {
    "& .MuiInputBase-input": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: Colors.ERROR_COLOR, // Change the border color
      },
      "&:hover fieldset": {
        borderColor: "#ADACAD", // Change the border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ADACAD", // Change the border color when focused
      },
    },
  },
};
