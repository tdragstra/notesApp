import "./App.css";

import {
	selectProfile,
	selectNotes,
	selectFilters,
	selectFilteredResults,
	selectLoading,
} from "./store/notes/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchNotes, postNote } from "./store/notes/actions";
import { useEffect, useState } from "react";
import { addSubjectFilter, addUserFilter } from "./store/notes/slice";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NewPostForm from "./components/NewPostForm";

function App() {
	const profile = useSelector(selectProfile);
	const notes = useSelector(selectNotes);
	const filters = useSelector(selectFilters);

	const filtered = useSelector(selectFilteredResults);

	const dispatch = useDispatch();

	// console.log(loading);
	const flatSubject = notes.map((e) => e.subjectId);
	const flattedSubject = [...new Set(flatSubject)];
	const flatUser = notes.map((e) => e.userId);
	const flattedUser = [...new Set(flatUser)];
	const [checked, setchecked] = useState(null);

	const same = (e) => e.subjectId === 1;

	const checkedResult = (id) => {
		const result = filters.find((e) => e.subjectId === id);
		if (result) {
			return true;
		} else {
			return false;
		}
	};
	const checkedResult1 = (id) => {
		const result = filters.find((e) => e.userId === id);
		if (result) {
			return true;
		} else {
			return false;
		}
	};

	// const flat = Object.values(notes[0])[3];
	const filterType = (e) => {
		if (Object.keys(e)[0] === "subjectId") {
			return (
				<Button
					variant="outlined"
					onClick={() => dispatch(addSubjectFilter({ subjectId: e.subjectId }))}
				>
					Subject {e.subjectId}
					<div className="Close">X</div>
				</Button>
			);
		} else if (Object.keys(e)[0] === "userId") {
			return (
				<Button
					style={{ maxWidth: "100%" }}
					variant="outlined"
					onClick={() => dispatch(addUserFilter({ userId: e.userId }))}
				>
					User {e.userId}
					<div className="Close">X</div>
				</Button>
			);
		} else {
			return null;
		}
	};
	const CheckNotesToMap = (n) => {
		if (n.length > 0) return filtered;
		else return notes;
	};

	const noteList = CheckNotesToMap(filtered);

	useEffect(() => {
		dispatch(fetchNotes);
	}, [dispatch]);

	return (
		<div>
			<div className="App">
				<p> To get your profile details: </p>
				<button onClick={() => dispatch(fetchProfile)}> Get data</button>

				{profile.profile_name && (
					<div>
						<p> Profile name : {profile.profile_name} </p>
						<p> About: {profile.about_me}</p>
					</div>
				)}
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<NewPostForm />
			</div>
			<div style={{ margin: "20px" }}>
				<h1>
					Notities ({filtered.length > 0 ? filtered.length : notes.length})
				</h1>
				<div style={{ display: "flex" }}>
					Filters: <br></br>
					{filters.map((f) => {
						// console.log(Object.keys(f)[0]);
						return <div style={{ margin: "5px" }}>{filterType(f)}</div>;
					})}
				</div>
			</div>
			<div className="Main">
				<div className="Notes">
					{noteList.map((n) => (
						<div className="Note">
							<h2>{n.name} </h2>
							<div>
								<p>
									Subject: {n.subjectId}, User: {n.userId}
								</p>
							</div>
							<p>
								Note: <br></br> {n.note}
							</p>
							<div>
								{profile.profile_name ? (
									<div
										style={{
											display: "flex",
											marginRight: "10px",
											justifyContent: "flex-end",
										}}
									>
										<Button variant="contained" style={{ marginRight: "10px" }}>
											Edit
										</Button>
										<Button variant="outlined" color="warning">
											<DeleteIcon />
										</Button>{" "}
									</div>
								) : (
									<p style={{ fontStyle: "italic" }}>Login to change notes</p>
								)}
							</div>
						</div>
					))}
				</div>
				<div>
					<h3>Filteren op: </h3>
					Onderwerp:
					{flattedSubject.map((n) => (
						<div>
							{/* {console.log("test", n)} */}

							<input
								type="checkbox"
								checked={checkedResult(n)}
								readOnly={true}
								onClick={() => dispatch(addSubjectFilter({ subjectId: n }))}
							></input>
							{n}
						</div>
					))}
					<br></br>
					User:
					{flattedUser.map((n) => (
						<div>
							<input
								type="checkbox"
								checked={checkedResult1(n)}
								readOnly={true}
								onClick={() => dispatch(addUserFilter({ userId: n }))}
							></input>
							{n}
						</div>
					))}
					<div>
						<h1> Notities in lijst </h1>
						{filtered
							? filtered.map((e) => <div>{e.name.toUpperCase()} </div>)
							: console.log(false)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

// const [profileData, setProfileData] = useState(null);

// const myFunction = () => {
// 	axios({
// 		method: "GET",
// 		url: "/profile",
// 	})
// 		.then((response) => {
// 			const res = response.data;
// 			setProfileData({
// 				profile_name: res.name,
// 				about_me: res.about,
// 			});
// 		})
// 		.catch((error) => {
// 			if (error.response) {
// 				console.log(error.response);
// 				console.log(error.response.status);
// 				console.log(error.response.headers);
// 			}
// 		});
// };
