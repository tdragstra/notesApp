import axios from "axios";
import {
	startLoading,
	notesFetched,
	profileFetched,
	doneLoading,
} from "./slice";

export const fetchProfile = async (dispatch, getState) => {
	try {
		dispatch(startLoading());
		const response = await axios.get(`/profile`);
		// console.log("response", response);

		dispatch(profileFetched(response.data));
	} catch (e) {
		console.log(e.message);
	}
};

export const fetchNotes = async (dispatch, getState) => {
	try {
		dispatch(startLoading());
		const response = await axios.get(`/notes`);
		const notes = response.data;
		dispatch(notesFetched(notes));
		dispatch(doneLoading());
	} catch (e) {
		console.log(e.message);
	}
};

export const postNote = async (dispatch, getState) => {
	const a = {
		name: "notitie 1",
		note: "nope dit gaat niet werken",
		subject_id: 1,
		user_id: 2,
	};
	try {
		const response = await axios.post(`/notes/add`, a);
		const responseNote = response.data;
		console.log(responseNote);
	} catch (e) {
		console.log(e.message);
	}
};
