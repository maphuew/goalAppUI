import { useEffect } from "react";
import { getGoalTree } from "../../data/databaseConnector";
import Goal, { GetParentGoal, GetSubgoals, GetTopLevelGoals } from "../../data/Goal";
import { receivedGoals } from "../../data/goalsSlice";
import { useAppDispatch, useAppSelector } from "../../data/hooks";
import GoalContainerColumn from "./GoalContainerColumn";


interface GoalSystemInterface {
  goalTree: Goal[];
  selectedGoal?: Goal;
}

const GoalSystem = ({ goalTree }: GoalSystemInterface) => {
  // Todo: store the last selected goal per user on server? or localstorage?
  const dispatch = useAppDispatch();
  const goals = useAppSelector(state => state.goals.goals);
  const selectedGoalId = useAppSelector(state => state.goals.selectedGoalId);
  const selectedGoal = selectedGoalId ? goals[selectedGoalId] : undefined;

  useEffect(() => {
    getGoalTree().then(goalsCache => {
      dispatch(receivedGoals(goalsCache));
    });
  }, []);

  const columnData: Goal[][] = []

  if (selectedGoal) {
    // If there's a goal selected
    let nextGoal: Goal | undefined = selectedGoal;
    while (nextGoal) {
      columnData.unshift(GetSubgoals(goals, nextGoal));
      nextGoal = GetParentGoal(goals, nextGoal);
    }
  }
  columnData.unshift(GetTopLevelGoals(goals));

  const columns: JSX.Element[] = [];

  for (let i = 0; i < columnData.length; i++) {
    columns.push(<GoalContainerColumn key={i} goals={columnData[i]}></GoalContainerColumn>);
  }

  return <div className="mainbody">{columns}</div>;
};

export default GoalSystem;
