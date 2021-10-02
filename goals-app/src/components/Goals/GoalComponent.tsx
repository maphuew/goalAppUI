import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Goal from "../../data/Goal";

function GoalComponent(goal: Goal) {
  const goalNumber = goal.id;

  return (
    <li className="Goal" onClick={() => openGoal(goalNumber)}>
      <h4>{goal.name}</h4>
      <IconButton onClick={() => editGoal(goalNumber)} >
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => deleteGoal(goalNumber)}>
        <DeleteIcon />
      </IconButton>
      <p>{goal.description}</p>
    </li>
  );
}

// const count = useSelector(state => state.count)

const editGoal = (goalId: number) => {
  console.log("editing goal # " + goalId);
}

const deleteGoal = (goalId: number) => {
  console.log("deleting goal # " + goalId);
}

const openGoal = (goalId: number) => {
  console.log("opening goal # " + goalId);
};

export default GoalComponent;
