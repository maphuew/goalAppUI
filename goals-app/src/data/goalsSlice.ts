import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Goal from "./Goal"

interface GoalSliceState {
    goals: GoalCache;
    selectedGoalId?: number;
}

export interface GoalCache {
    [id: number]: Goal;
}

const initialState: GoalSliceState = {
    goals: {},
}

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        receivedGoals(state, action: PayloadAction<GoalCache>) {
            state.goals = action.payload;
        },
        selectectedGoal(state, action: PayloadAction<number>) {
            state.selectedGoalId = action.payload;
        }
    }
})

export const { receivedGoals, selectectedGoal } = goalsSlice.actions;

export default goalsSlice.reducer;