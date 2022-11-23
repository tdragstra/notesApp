import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allNotes: [
		{
			name: "Azure AZ900",
			subject: "cloud",
			note: "",
		},
	],
	cloudNotes: { name: "Azure AZ900", subject: "cloud", note: "" },
	pythonNotes: { name: "Create virtual env", subject: "python", note: "" },
	flaskNotes: { name: "Install flask", subject: "flask", note: "" },
	djangoNotes: { name: "Install django", subject: "django", note: "" },
	profile: { profile_name: null, about_me: null },
	loading: { loading: false },
	filters: [],
	filteredResults: [],
};

export const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		notesFetched: (state, action) => {
			state.allNotes = action.payload.map((a) => {
				return {
					id: a.id,
					name: a.name,
					note: a.note,
					subjectId: a.subject_id,
					userId: a.user_id,
				};
			});

			state.loading = false;
			// state.allSpaces = [...state.allSpaces, ...action.payload];
		},
		profileFetched: (state, action) => {
			state.profile.profile_name = action.payload.name;
			state.profile.about_me = action.payload.about;
			state.loading = false;
		},
		startLoading: (state) => {
			state.loading = true;
		},
		doneLoading: (state) => {
			state.loading = false;
		},
		addSubjectFilter: (state, action) => {
			const same = (e) => e.subjectId === action.payload.subjectId;
			const newArray = state.filters.findIndex(same);
			if (newArray > -1) {
				state.filters = state.filters.filter(
					(e) => e.subjectId !== action.payload.subjectId
				);
			} else {
				state.filters = [...state.filters, action.payload];
			}
		},
		addUserFilter: (state, action) => {
			const same = (e) => e.userId === action.payload.userId;
			const newArray = state.filters.findIndex(same);
			if (newArray > -1) {
				state.filters = state.filters.filter(
					(e) => e.userId !== action.payload.userId
				);
			} else {
				state.filters = [...state.filters, action.payload];
			}
		},
	},
});

// Action creators are generated for each case reducer function
// as we add cases to our reducer we will also export the corresponding actions
export const {
	notesFetched,
	profileFetched,
	startLoading,
	doneLoading,
	addSubjectFilter,
	addUserFilter,
} = notesSlice.actions;

export default notesSlice.reducer;

// const newArray = state.filters.findIndex((same) => {
// 	if (same.subjectId === action.payload.subjectId) {
// 		return { ...same, enabled: !same.enabled };
// 	} else {
// 		return item;
// 	}
// });
