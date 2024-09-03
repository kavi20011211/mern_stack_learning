import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import goalService from './goalsService';

const initialState={
    goals:[],
    isLoading:false,
    isSuccuss:false,
    isError:false,
    message:""
}

//Set user Goal
export const setGoal = createAsyncThunk('goals/setGoal', async(goals,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.setGoal(goals,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

//Get user goals
export const getGoals = createAsyncThunk('goals/getGoals',async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);       
    }
})

//Delete user Goal
export const deleteGoal = createAsyncThunk('goals/deleteGoal', async(id,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(id,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
            .addCase(setGoal.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(setGoal.fulfilled, (state,action)=>{
                state.isSuccuss = true
                state.isLoading = false
                state.goals.push(action.payload)
            })
            .addCase(setGoal.rejected,(state,action)=>{
                state.isError = true
                state.isSuccuss = false
                state.isLoading = false
                state.message = action.payload
            })

            .addCase(getGoals.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state,action)=>{
                state.isSuccuss = true
                state.isLoading = false
                state.goals = action.payload
            })
            .addCase(getGoals.rejected,(state,action)=>{
                state.isError = true
                state.isSuccuss = false
                state.isLoading = false
                state.message = action.payload
            })

            .addCase(deleteGoal.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state,action)=>{
                state.isSuccuss = true
                state.isLoading = false
                state.goals = state.goals.filter((goal)=>goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected,(state,action)=>{
                state.isError = true
                state.isSuccuss = false
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer;