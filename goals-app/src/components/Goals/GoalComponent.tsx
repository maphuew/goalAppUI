import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import { decrement } from "../../counterslice";
import Goal from "../../data/Goal";
import goalsSlice, { increment } from "../../data/goalsSlice";

function GoalComponent(goal: Goal) {
  const goalNumber = goal.id;

  return (
    <li className="Goal" onClick={() => openGoal(goalNumber)}>
      <h4>{goal.name}</h4>
      <IconButton color="primary" aria-label="add to shopping cart">
        <EditIcon onClick={editGoal} />
      </IconButton>
      <IconButton>
        <DeleteIcon onClick={deleteGoal} />
      </IconButton>
      <p>{goal.description}</p>
    </li>
  );
}

// const count = useSelector(state => state.count)

const editGoal = () => {
  increment();
}

const deleteGoal = () => {
  decrement();
  // console.log(goalsSlice.)
}

const openGoal = (goalId: number) => {
  console.log("opening goal # " + goalId);
};

export default GoalComponent;
