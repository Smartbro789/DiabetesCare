import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchMedicalNotes = createAsyncThunk('medicalnote/fetchMedicalNotes', async()=>{
    const {data} = await axios.get('/medicalnote');
    return data;
});

const initialState = {
    medicalnotes: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
}

const medicalNotesSlice = createSlice({
    name: 'medicalnote',
    initialState,
    reducers:{},
    extraReducers: {
        [fetchMedicalNotes.pending]: (state) =>{
            state.medicalnotes.items = [];
            state.medicalnotes.status = 'loading';
        },
        [fetchMedicalNotes.fulfilled] :(state, action)=>{
            state.medicalnotes.items = action.payload;
            state.medicalnotes.status = 'loaded';
        },
        [fetchMedicalNotes.rejected] :(state)=>{
            state.medicalnotes.items = [];
            state.medicalnotes.status = 'error';
        },
    },
});

export const medicalNoteReducer = medicalNotesSlice.reducer;