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
  BtnStyle3: {
    marginTop: MARGIN_SIZES.MARGIN_2,
    backgroundColor: Colors.BUTTON_PRIMARY_COLOR,
    color: Colors.TEXT_COLOR,
    width: "auto",
    padding: Padding_Sizes.PADDING_1 / 3,
    ":hover": {
      color: Colors.TEXT_COLOR,
      backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
    },
  },
};
