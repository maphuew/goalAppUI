import { GoalCache } from "./goalsSlice";

interface Goal {
    id: number;
    name: string;
    description: string;
    goalIds: number[];
    parentId?: number;
}

export const GetSubgoals = (goals: GoalCache, goal: Goal): Goal[] => {
    return goal.goalIds.map(id => goals[id]);
}

export const GetParentGoal = (goals: GoalCache, goal: Goal): Goal | undefined => {
    if (goal.parentId) {
        return goals[goal.parentId];
    }
    return undefined;
}

export const GetTopLevelGoals = (goals: GoalCache): Goal[] => {
    return Object.entries(goals).map(x => x[1]).filter((x: Goal) => !x.parentId);
}

export default Goal;