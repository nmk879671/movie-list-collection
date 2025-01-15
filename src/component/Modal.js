import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@mui/material";

export default function Modal({ show, setShow, body }) {
  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="draggable-dialog-title"
    >
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
