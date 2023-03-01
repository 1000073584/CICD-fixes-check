import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'app/services/notification/store/notification.actions'
import axios from '../../../../axios'

const endPoint = 'Teacher'
export let message = ''

export const fetchTeacher = createAsyncThunk(
    'Teacher/fetchTeacher',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const Teacher = await response.data
        return Teacher
    }
)

export const addTeacher = createAsyncThunk(
    'Teacher/addTeacher',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const Teacher = await response.data
        message = 'Row added successfully!!'
        return Teacher
    }
)

export const editTeacher = createAsyncThunk(
    'Teacher/editTeacher',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const Teacher = await response.data
        message = 'Row updated successfully!!'
        return Teacher
    }
)

export const deleteTeacher = createAsyncThunk(
    'Teacher/deleteTeacher',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            message = 'Row deleted successfully!!'
            return data.id
        }
    }
)
