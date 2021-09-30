import Goal from "../../data/Goal";
import GoalContainerColumn from "./GoalContainerColumn";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { JsxElement } from "typescript";

interface GoalSystemInterface {
  goalTree: Goal[];
  selectedGoal?: Goal;
}

const GetGoalById = (goals: Goal[], id: number): Goal => {
  function getGoal(goals: Goal[], id: number): Goal | undefined {
    for (let goal of goals) {
      if (goal.id == id)
        return goal;
      let GoalInChildren = GetGoalById(goal.goals, id);
      if (GoalInChildren) return GoalInChildren;
    }
    return undefined;
  }
  return getGoal(goals, id) as Goal;
};

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


const GoalSystem = ({ goalTree }: GoalSystemInterface) => {
  // Todo: store the last selected goal per user on server? or localstorage?

  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();

  useEffect(() => {
    getGoalTree().then(x => {
      setGoals(x);
    })
  }, []);

  const columns: JSX.Element[] = [];

  if (selectedGoal) {
    // If there's a goal selected
    let nextGoal = selectedGoal.parent;
    while (nextGoal) {
      let column = (
        <GoalContainerColumn goals={nextGoal.goals}></GoalContainerColumn>
      );
      columns.unshift(column);
      nextGoal = nextGoal.parent;
    }
  }

  columns.unshift(<GoalContainerColumn goals={goals}></GoalContainerColumn>);

  return <div className="mainbody">{columns}</div>;
};

export default GoalSystem;
