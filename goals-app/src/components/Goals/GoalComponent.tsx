import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Goal from "../../data/Goal";

function GoalComponent(goal: Goal) {
  const goalNumber = goal.id;


  return (
    <li className="Goal" onClick={() => openGoal(goalNumber)}>
      <h4>{goal.name}</h4>
      <IconButton color="primary" aria-label="add to shopping cart">
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <p>{goal.description}</p>
    </li>
  );
}

const openGoal = (goalId: number) => {
  console.log("opening goal # " + goalId);
};

export default GoalComponent;
