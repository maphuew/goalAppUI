import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Goal from "./Goal"

interface GoalSliceState {
    goals: Goal[];
    count: number;
}

const initialState: GoalSliceState = {
    goals: [],
    count: 0,
}

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reloadGoals: state => { },
        increment: state => {
            state.count += 1;
        },
        decrement: state => {
            state.count -= 1;
        },
        receivedGoals(state, action: PayloadAction<Goal[]>) {
            const goals = action.payload;
            goals.forEach(g => {
                state.goals.push(g);
            })
            // state.goals = action.payload;
        }
    }
})

export const { reloadGoals, increment, decrement, receivedGoals } = goalsSlice.actions;

export default goalsSlice.reducer;