import { Colors } from "./colors";
import { Padding_Sizes } from "./paddingSizes";
import { MARGIN_SIZES } from "./sizes";

export const ButtonStyles = {
  BtnStyle1: {
    backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
    color: Colors.TEXT_COLOR_SECONDARY,
    borderColor: Colors.BORDER_BLUE,
    borderWidth: 2,
    width: 180,
    padding: Padding_Sizes.PADDING_4 / 3,
    ":hover": {
      color: Colors.TEXT_COLOR,
      backgroundColor: Colors.BUTTON_PRIMARY_COLOR,
    },
  },
  BtnStyle2: {
    marginRight: MARGIN_SIZES.MARGIN_4,
    backgroundColor: Colors.BUTTON_PRIMARY_COLOR,
    color: Colors.TEXT_COLOR_SECONDARY,
    width: "auto",
    padding: Padding_Sizes.PADDING_4 / 3,
    ":hover": {
      color: Colors.TEXT_COLOR,
      backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
    },
  },
};
