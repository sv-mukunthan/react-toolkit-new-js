import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function ConfirmModal({
  open,
  onClose,
  title,
  body,
  width,
  onConfirm,
  loading,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width ? width : 400,
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography
            id="modal-modal-title"
            textAlign={"center"}
            variant="h4"
            component="h2"
          >
            {title}
          </Typography>
          <Typography
            id="modal-modal-description"
            textAlign={"center"}
            sx={{ mt: 2 }}
          >
            {body}
          </Typography>
          <Box sx={{ display: "flex", pt: 3, pb: 2, justifyContent: "center" }}>
            <Button
              color="error"
              variant="contained"
              sx={{ mx: 2 }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button onClick={onConfirm} disabled={loading} variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
