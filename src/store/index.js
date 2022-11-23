import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notes/slice";

const store = configureStore({
	reducer: {
		notes: notesReducer,
	},
});

export default store;
