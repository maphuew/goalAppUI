import Goal from "../../data/Goal";
import { Counter } from "../counter";
import GoalComponent from "./GoalComponent";

interface GoalContainerColumnInterface {
  goals: Goal[];
}

const GoalContainerColumn = ({ goals }: GoalContainerColumnInterface) => {
  const goalComponents = goals.map((x) => (
    <GoalComponent {...x}></GoalComponent>
  ));

  return <ul className="GoalContainer">{goalComponents}<Counter></Counter><Counter></Counter></ul>;
};

export default GoalContainerColumn;
