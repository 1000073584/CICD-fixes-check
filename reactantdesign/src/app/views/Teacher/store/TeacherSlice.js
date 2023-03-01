import { createSlice } from '@reduxjs/toolkit'
import { fetchTeacher } from './Teacher.action'
import { addTeacher } from './Teacher.action'
import { editTeacher } from './Teacher.action'
import { deleteTeacher } from './Teacher.action'

const fetchTeacherExtraReducer = {
    [fetchTeacher.pending]: (state, action) => {
        state.loading = true
    },
    [fetchTeacher.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchTeacher.rejected]: (state, action) => {
        state.loading = false
    },
}

const addTeacherExtraReducer = {
    [addTeacher.pending]: (state, action) => {
        state.loading = true
    },
    [addTeacher.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addTeacher.rejected]: (state, action) => {
        state.loading = false
    },
}

const editTeacherExtraReducer = {
    [editTeacher.pending]: (state, action) => {
        state.loading = true
    },
    [editTeacher.fulfilled]: (state, action) => {
        const { id, fname, lname } = action.payload
        const existingTeacher = state.entities.find(
            (Teacher) => Teacher.id.toString() === id.toString()
        )
        if (existingTeacher) {
            existingTeacher.fname = fname
            existingTeacher.lname = lname
        }
        state.loading = false
    },
    [editTeacher.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteTeacherExtraReducer = {
    [deleteTeacher.pending]: (state, action) => {
        state.loading = true
    },
    [deleteTeacher.fulfilled]: (state, action) => {
        const id = action.payload
        const existingTeacher = state.entities.find(
            (Teacher) => Teacher.id.toString() === id.toString()
        )
        if (existingTeacher) {
            state.entities = state.entities.filter(
                (Teacher) => Teacher.id !== id
            )
        }
        state.loading = false
    },
    [deleteTeacher.rejected]: (state, action) => {
        state.loading = false
    },
}
const TeacherSlice = createSlice({
    name: 'Teacher',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        TeacherAdded(state, action) {
            state.entities.push(action.payload)
        },
        TeacherUpdated(state, action) {
            const { id, fname, lname } = action.payload
            const existingTeacher = state.entities.find(
                (Teacher) => Teacher.id.toString() === id.toString()
            )
            if (existingTeacher) {
                existingTeacher.fname = fname
                existingTeacher.lname = lname
            }
        },
        TeacherDeleted(state, action) {
            const { id } = action.payload
            const existingTeacher = state.entities.find(
                (Teacher) => Teacher.id.toString() === id.toString()
            )
            if (existingTeacher) {
                state.entities = state.entities.filter(
                    (Teacher) => Teacher.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchTeacherExtraReducer,
        ...addTeacherExtraReducer,
        ...editTeacherExtraReducer,
        ...deleteTeacherExtraReducer,
    },
})

export const { TeacherAdded, TeacherUpdated, TeacherDeleted } =
    TeacherSlice.actions

export default TeacherSlice.reducer
