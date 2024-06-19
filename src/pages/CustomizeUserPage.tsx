import { createSignal, onMount } from "solid-js";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import api from "../lib/api";
import { Box } from "@suid/material";
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
			const token = localStorage.getItem("token");
			if (!token) {
				alert("No token found. Please login first.");
				return;
			}

			const response = await api.createCustomRole(
				roleColour(),
				roleName(),
				token
			);
			if ("error" in response) {
				setError(
					response.maybeJson
						? response.maybeJson.error
						: "Something went wrong!"
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

	onMount(async () => {
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/");
		}

		try {
			const response = await api.verifyToken(localStorage.getItem("token"));
			if ("error" in response) {
				alert("Could not verify your token");
				navigate("/");
			} else {
			}
		} catch (error) { }
	});

	return (
		<Center>
			<Box
				sx={{
					bgcolor: 'box.box',
					p: "16px",
					border: "1px solid box.box",
					borderRadius: "8px",
				}}
			>
				<div class="flex flex-col gap-4">
					<h1 class="text-2xl">Select your custom role!</h1>
					<ClosableAlert
						open={alertOpen()}
						severity="error"
						onClose={() => setAlertOpen(false)}
					>
						{error()}
					</ClosableAlert>
					<TextField
						label="Role Name"
						variant="outlined"
						onInput={(e) => setRoleName((e.target as HTMLInputElement).value)}
						fullWidth
						margin="normal"
						sx={{ my: 0 }}
					/>
					<TextField
						label="Role Hex"
						variant="outlined"
						onInput={(e) => setRoleColour((e.target as HTMLInputElement).value)}
						fullWidth
						margin="normal"
						sx={{ my: 0 }}
					/>
					<Button variant="contained" color="primary" onClick={customizeRole} sx={{ my: 0 }}>
						Create role
					</Button>
				</div>
			</Box>
		</Center>
	);
};

export default CustomizeUserPage;
