import { Badge, Box, IconButton } from "@mui/material";
import { forwardRef } from "react";

const IconBtn = forwardRef(
  (
    { Icon, iconSize, badgeContent, onClick, width, heigth, badge, style },
    ref
  ) => {
    const shapeStyles = { width: width || 50, height: heigth || 50, ...style };
    const shapeCircleStyles = { borderRadius: "50%" };

    return badge ? (
      <Badge
        color="secondary"
        overlap="circular"
        badgeContent={badgeContent || ""}
      >
        <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }}>
          <IconButton
            onClick={onClick}
            sx={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              bgcolor: "#111827",
            }}
            color="primary"
            aria-label="icon-btn"
            ref={ref}
          >
            <Icon color="secondary" fontSize={iconSize || "medium"} />
          </IconButton>
        </Box>
      </Badge>
    ) : (
      <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }}>
        <IconButton
          onClick={onClick}
          sx={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            bgcolor: "#111827",
          }}
          color="primary"
          aria-label="icon-btn"
          ref={ref}
        >
          <Icon color="secondary" fontSize={iconSize || "medium"} />
        </IconButton>
      </Box>
    );
  }
);

export default IconBtn;
