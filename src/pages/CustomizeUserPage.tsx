import { createSignal } from "solid-js";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import api from "../lib/api";
import { Box, Stack } from "@suid/material";
import ClosableAlert from "../components/ClosableAlert";
import { useNavigate } from "@solidjs/router";
import { Center } from "../components/Center";

const CustomizeUserPage = () => {
  const [roleName, setRoleName] = createSignal("dumb");
  const [roleColour, setRoleColour] = createSignal("7b5804");

  const [error, setError] = createSignal("");
  const [alertOpen, setAlertOpen] = createSignal(false);
  const navigate = useNavigate();

  const customizeRole = async () => {
    try {
      const response = await api.createCustomRole(roleColour(), roleName());
      if ("error" in response) {
        setError(
          response.maybeJson
            ? response.maybeJson.error
            : "Something went wrong!",
        );
        return setAlertOpen(true);
      } else {
        alert("Your role has been created/edited!");
        navigate("/polls");
      }
    } catch (error) {
      alert("Role creation was not successful");
    }
  };

  return (
    <Center>
      <Box
        class="w-[90%] rounded-md p-4 md:w-[30vw]"
        sx={{
          bgcolor: "box.box",
          border: "1px solid box.box",
        }}
      >
        <Stack spacing={2}>
          <Stack>
            <h1 class="text-2xl">Select your custom role!</h1>
            <ClosableAlert
              open={alertOpen()}
              severity="error"
              onClose={() => setAlertOpen(false)}
            >
              {error()}
            </ClosableAlert>
          </Stack>
          <Stack>
            <TextField
              class="!my-0"
              label="Role Name"
              variant="outlined"
              onInput={(e) => setRoleName((e.target as HTMLInputElement).value)}
              fullWidth
            />
          </Stack>
          <Stack>
            <TextField
              class="!my-0"
              label="Role Hex"
              variant="outlined"
              onInput={(e) =>
                setRoleColour((e.target as HTMLInputElement).value)
              }
              fullWidth
            />
          </Stack>
          <Stack>
            <Button variant="contained" color="primary" onClick={customizeRole}>
              Create role
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default CustomizeUserPage;
