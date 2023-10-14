import { AppBar, Button, Toolbar, Typography, styled } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

function Header() {

    return (
    <div className="header">
      <AppBar position="sticky">
        <StyledToolbar>
            <Link to={"/"}>
            <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BLOG REACT
          </Typography>
            </Link>
         
          <ChatIcon
            alt="LogoBlog"
            sx={{ display: { xs: "block", sm: "none" } }}
          />
        </StyledToolbar>
      </AppBar>
    </div>
  );
}

export default Header;
