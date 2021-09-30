interface Goal {
    id: number;
    name: string;
    description: string;
    goals: Goal[];
    parent?: Goal;
}

export default Goal;