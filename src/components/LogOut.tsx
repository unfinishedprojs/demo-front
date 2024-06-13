import { Button } from "@suid/material";
import { useNavigate } from "@solidjs/router";

const LogOutButton = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.setItem("token", null);
    alert("You have been logged out!");
    navigate("/login");
  };

  return (
    <Button onClick={logOut} color="error">
      Log out
    </Button>
  );
};

export default LogOutButton;
