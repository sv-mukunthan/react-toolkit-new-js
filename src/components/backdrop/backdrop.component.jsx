const { Backdrop, CircularProgress } = require("@mui/material");

const BackDrop = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => console.log("close")}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
