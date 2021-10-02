import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

import { GoalCache } from "./goalsSlice";
import Goal from "./Goal";

const client = new ApolloClient({
  uri: "http://0.0.0.0:8080/graphql", //TODO: use environment variables
  cache: new InMemoryCache(),
});

export async function getGoalTree(): Promise<GoalCache> {

  var goalCache: GoalCache = {};

  async function getGoal(id: number) {
    let goalDto = (await client.query({
      query: gql`
          query goal {
            goal(id: ${id}) {
              name
              id
              description
              parentID
              goals {
                id
              }
            }
          }`
    })).data.goal;

    const subGoalIds: number[] = goalDto.goals.map((subGoal: { id: number; }) => subGoal.id);

    const newGoal: Goal = {
      name: goalDto.name,
      description: goalDto.description,
      id: goalDto.id,
      parentId: goalDto.parentID,
      goalIds: subGoalIds,
    };

    goalCache[newGoal.id] = newGoal;

    for (const subGoalId of subGoalIds) {
      await getGoal(subGoalId);
    }
  }
  await getGoal(1);

  return goalCache;
}