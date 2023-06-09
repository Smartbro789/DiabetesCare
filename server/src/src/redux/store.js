import {configureStore} from "@reduxjs/toolkit";
import {medicalNoteReducer} from "./slices/medicalNotes";
import {authReducer} from "./slices/auth";

const store = configureStore({
    reducer:{
        medicalnotes: medicalNoteReducer,
        auth: authReducer,
    }
});
export default store;