import {
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { postNote } from "../../store/notes/actions";

export default function NewPostForm() {
	const dispatch = useDispatch();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				margin: "10px",
				width: "50%",
			}}
		>
			<FormControl>
				<InputLabel htmlFor="naam">Naam</InputLabel>
				<Input id="naam" aria-describedby="naam-text" />
				<FormHelperText id="naam-text">
					Voer de naam van jouw nieuwe notitie in
				</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="note">Notitie</InputLabel>
				<TextField
					id="note"
					aria-describedby="note-text"
					multiline
					rows={12}
					maxRows={12}
				/>
				<FormHelperText id="note-text">Voeg de notitie toe</FormHelperText>
			</FormControl>
			<FormControl>
				<InputLabel htmlFor="my-input">Kies user</InputLabel>
				<Select id="my-input" aria-describedby="my-helper-text">
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
				<FormHelperText id="my-helper-text">
					Kies de user aan wie de notitie gekoppeld moet worden. <br></br> Je
					moet wel toestemming hebben om aan een andere user te koppelen.
				</FormHelperText>
			</FormControl>
			<FormControl size="small">
				<InputLabel htmlFor="onderwerp">Kies onderwerp</InputLabel>
				<Select id="onderwerp" aria-describedby="onderwerp-text">
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
				<FormHelperText id="ondewerp-tekst">Kies onderwerp</FormHelperText>
			</FormControl>
			<Button
				type="submit"
				variant="contained"
				style={{ marginRight: "10px" }}
				onClick={() => dispatch(postNote)}
			>
				Add post
			</Button>
		</div>
	);
}
