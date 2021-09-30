import Goal from "../../data/Goal";
import GoalComponent from "./GoalComponent";

interface GoalContainerColumnInterface {
  goals: Goal[];
}

const GoalContainerColumn = ({ goals }: GoalContainerColumnInterface) => {
  const goalComponents = goals.map((x) => (
    <GoalComponent {...x}></GoalComponent>
  ));

  return <ul className="GoalContainer">{goalComponents}</ul>;
};

export default GoalContainerColumn;
