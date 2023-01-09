import PropTypes from "prop-types";
import { Box, Button, ListItem } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export const NavItem = (props) => {
  const { href, icon, title, onClick, ...others } = props;
  const checkActive = () => {
    const path = location.pathname.split("/").filter((p) => p);
    const loc = href.replaceAll("/", "");
    return path.includes(loc);
  };
  const location = useLocation();
  const active = location.pathname === href || checkActive();

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Button
        component={NavLink}
        to={href}
        startIcon={icon}
        disableRipple
        onClick={onClick}
        sx={{
          backgroundColor: active && "rgba(255,255,255, 0.08)",
          borderRadius: 1,
          color: active ? "secondary.main" : "neutral.300",
          fontWeight: active && "fontWeightBold",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
