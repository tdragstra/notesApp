export const selectProfile = (state) => state.notes.profile;
export const selectNotes = (state) => state.notes.allNotes;

export const selectNotesSubject =
	(...id) =>
	(state) =>
		state.notes.allNotes.map((n) => {
			if (n.subjectId === id) {
				return n;
			}
			return null;
		});
export const selectFilters = (state) => state.notes.filters;

export const selectFilteredResults = (state) =>
	state.notes.allNotes.filter((e) =>
		state.notes.filters.find(
			(f) => e.userId === f.userId || e.subjectId === f.subjectId
		)
	);
// export const selectFilteredResults = (state) =>
// 	state.notes.allNotes.filter((e) => {
// 		const id = state.notes.filters.find((f) => e.subjectId);
// 		const userId = state.notes.filters.find((f) => e.userId);
// 		if (id) {
// 			return e.subjectId === id.subjectId;
// 		} else if (userId) {
// 			return e.userId === userId.userId;
// 		} else {
// 			return e;
// 		}
// 	});

// export const selectFilteredResults = (state) =>
// 	state.notes.allNotes.filter((e) => {
// 		const subject = state.notes.filters.find((f) => e.subjectId);
// 		const user = state.notes.filters.find((f) => e.userId);
// 		if (subject) {
// 			return e.subjectId === subject.subjectId;
// 		} else {
// 			return e;
// 		}
// 	});
