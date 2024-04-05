import { Colors } from "./colors";
import {
  Delete,
  AddCircle,
  RemoveCircle,
  FormatAlignJustifyRounded,
  EditNoteRounded,
  Favorite,
} from "@mui/icons-material";

export function DeleteIcon({ style = {}, onClick = () => {} }) {
  return <Delete sx={[style, { cursor: "pointer" }]} onClick={onClick} />;
}

export function AddIcon({ style = {}, onClick = () => {} }) {
  return <AddCircle sx={[style, { cursor: "pointer" }]} onClick={onClick} />;
}

export function RemoveIcon({ style = {}, onClick = () => {} }) {
  return <RemoveCircle sx={[style, { cursor: "pointer" }]} onClick={onClick} />;
}

export function MenuIcon({ style = {}, onClick = () => {} }) {
  return (
    <FormatAlignJustifyRounded
      sx={[style, { cursor: "pointer" }]}
      onClick={onClick}
    />
  );
}

export function EditIcon({ style = {}, onClick = () => {} }) {
  return (
    <EditNoteRounded sx={[style, { cursor: "pointer" }]} onClick={onClick} />
  );
}

export function FavoriteIcon({ style = {}, onClick = () => {} }) {
  return <Favorite sx={[style, { cursor: "pointer" }]} onClick={onClick} />;
}
