import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
//import { api } from "../../api/api";
import axios from "axios";
import { Curriculum, Faculty  } from "../../components/types";

interface SemesterState {
	
	loading: boolean;
	semester: "Fall" | "Spring";
	error: string;
	curriculum: Curriculum[];
	faculty: Faculty[];

}

const initialState: SemesterState = {
	
	loading: false,
	semester: "Fall",
	curriculum: [],
	faculty: [],
	error: "",
};

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCurriculum = createAsyncThunk("semester/getCurriculum", async () => {
	//await timeout(5000);
	const response = await axios.get(`/api/curriculum`);
	return response.data as Curriculum[];
});

export const getFaculties = createAsyncThunk("semester/getFaculty", async () => {
	//await timeout(5000);
	const response = await axios.get(`/api/faculties`);
	return response.data as Faculty[];
});




export const semesterSlice = createSlice({
	name: "semester",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCurriculum.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCurriculum.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.curriculum = payload;
			})
			.addCase(getCurriculum.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			.addCase(getFaculties.pending, (state) => {
				state.loading = true;
			})
			.addCase(getFaculties.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.faculty = payload;
			})
			.addCase(getFaculties.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
	},
});

export const {  } = semesterSlice.actions;
export const semesterReducer = semesterSlice.reducer;
export const selectCount = (state: RootState) => state.semester;
