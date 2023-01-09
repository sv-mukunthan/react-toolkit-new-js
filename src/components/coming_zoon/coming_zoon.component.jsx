import { Grid, Box, Button } from "@mui/material";
import Assets from "imports/assets.imports";
import "./coming_zoon.component.scss";

const ComingZoon = ({
  src,
  iconHeight,
  iconWidth,
  hasButton,
  buttonClick,
  buttonText,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <img
            src={src ? src : Assets.ComingZoon}
            className="coming_zoon_image"
            style={{
              width: iconWidth,
              height: iconHeight,
            }}
            alt="coming_zoon_image"
          />
          {hasButton && (
            <Button
              sx={{ my: 3 }}
              variant="contained"
              onClick={buttonClick}
              color="primary"
            >
              {buttonText}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComingZoon;
