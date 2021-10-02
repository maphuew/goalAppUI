import { useEffect } from "react";
import Goal from "../../data/Goal";
import { useAppDispatch, useAppSelector } from "../../data/hooks";
import GoalContainerColumn from "./GoalContainerColumn";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { receivedGoals } from "../../data/goalsSlice";

const client = new ApolloClient({
  uri: "http://0.0.0.0:8080/graphql",
  cache: new InMemoryCache(),
});

async function getGoalTree(): Promise<Goal[]> {
  async function getGoal(id: number): Promise<Goal> {
    let goal = (await client.query({
      query: gql`
      query goal {
        goal(id: ${id}) {
          id,
          name
          description,
          goals{
            id
          }
        }
      }`
    })).data.goal;

    let subGoals: Goal[] = [];
    for (let sg of goal.goals) {
      subGoals.push(await getGoal(sg.id));
    }
    // goal.goals = subGoals;
    const newGoal: Goal = {
      name: goal.name,
      description: goal.description,
      id: goal.id,
      goals: subGoals
    };
    return newGoal;
  }
  function populateParentReferences(goal: Goal, parent?: Goal) {
    goal.parent = parent;
    for (let subgoal of goal.goals) {
      populateParentReferences(subgoal, goal);
    }
  }
  var goals = await getGoal(1);
  populateParentReferences(goals, undefined);
  return [goals];
}

interface GoalSystemInterface {
  goalTree: Goal[];
  selectedGoal?: Goal;
}

const GoalSystem = ({ goalTree, selectedGoal }: GoalSystemInterface) => {
  // Todo: store the last selected goal per user on server? or localstorage?
  const dispatch = useAppDispatch();
  const goals = useAppSelector(state => state.goals.goals);
  console.log(goals);

  useEffect(() => {
    getGoalTree().then(goals => {
      dispatch(receivedGoals(goals));
    });
  }, []);

  const columns: JSX.Element[] = [];

  // if (selectedGoal) {
  //   // If there's a goal selected
  //   let nextGoal = selectedGoal.parent;
  //   while (nextGoal) {
  //     let column = (
  //       <GoalContainerColumn goals={nextGoal.goals}></GoalContainerColumn>
  //     );
  //     columns.unshift(column);
  //     nextGoal = nextGoal.parent;
  //   }
  // }

  // columns.unshift(<GoalContainerColumn goals={goals}></GoalContainerColumn>);

  return <div className="mainbody">{columns}</div>;
};

export default GoalSystem;
