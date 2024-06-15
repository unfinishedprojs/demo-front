import { createSignal } from "solid-js";
import {
  AppBar as AppBarSuid,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@suid/material";
import ThemeToggle from "./ThemeToggle"; // Ensure this path is correct
import { useNavigate } from "@solidjs/router";

const AppBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = createSignal(null);
  const [demoInfraIndex, setDemoInfraIndex] = createSignal(0);

  const demoInfraTexts = [
    "Demo-Infra",
    "Cute people only!",
    "Samu was here :)",
    "Exploding in 3, 2, 1...",
    "Streaming your IP to the world!",
    "Have you watched Updog?",
    "Rewrite 4143262 of the frontend!",
    "If you turn on lightmode, you lose access to polls!",
    "This code is held together by duct tape.",
    "Do not feed the bugs.",
    "Isn't Jelqing that Genshit Impact character…",
    "Temporarily permanent.",
    "Hit any key to continue.",
    "The cake is a lie.",
    "Donald Trump please, please save me from Vencord",
    "It's not a bug, it's (probably) a feature.",
    "Bet you can't find the Easter egg.",
  ];

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);
    navigate("/login");
    handleClose();
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    handleClose();
  };

  const handlePolls = () => {
    navigate("/polls");
    handleClose();
  };

  const handleEnded = () => {
    navigate("/ended");
    handleClose();
  };

  const handleDemoInfraClick = () => {
    const randomIndex = Math.floor(Math.random() * demoInfraTexts.length);
    setDemoInfraIndex(randomIndex);
  };

  return (
    <AppBarSuid>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, userSelect: "none", cursor: "pointer" }}
          onClick={handleDemoInfraClick}
        >
          {demoInfraTexts[demoInfraIndex()]}
        </Typography>
        <Button variant="text" onClick={handlePolls}>
          Polls
        </Button>
        <Button variant="text" onClick={handleEnded}>
          Ended
        </Button>
        <ThemeToggle />
        <IconButton onClick={handleAvatarClick}>
          <Avatar
            alt={localStorage.getItem("discordSlug")}
            src={localStorage.getItem("discordPfpUrl")}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl()}
          open={Boolean(anchorEl())}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* <MenuItem onClick={handleDashboard}>Dashboard</MenuItem> */}
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBarSuid>
  );
};

export default AppBar;
