import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Modal({ show, setShow, title, body }) {
  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setShow(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
