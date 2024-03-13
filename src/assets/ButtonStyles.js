import { Colors } from "./colors";
import { Padding_Sizes } from "./paddingSizes";
import { MARGIN_SIZES } from "./sizes";

export const ButtonStyles = {
  BtnStyle1: {
    backgroundColor: Colors.TEXT_COLOR,
    color: Colors.BUTTON_PRIMARY_COLOR,
    borderColor: Colors.BUTTON_PRIMARY_COLOR,
    borderWidth: 2,
    width: 180,
    padding: Padding_Sizes.PADDING_4 / 3,
    ":hover": {
      color: Colors.BUTTON_PRIMARY_COLOR,
      backgroundColor: Colors.TEXT_COLOR,
      opacity: 0.5,
    },
  },
  BtnStyle2: {
    marginRight: MARGIN_SIZES.MARGIN_4,
    backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
    width: 180,
    padding: Padding_Sizes.PADDING_4 / 3,
    ":hover": {
      color: Colors.TEXT_COLOR,
      backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
      opacity: 0.5,
    },
  },
};
