import "./App.css";

import GoalSystem from "./components/Goals/GoalSystem";
import Goal from "./data/Goal";

function App() {
  const goalTree: Goal[] = [];

  return (
    <div className="App">
      <script
        type="text/javascript"
        src="https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js"
      ></script>
      <header className="App-header">
        <h1>GoalsApp</h1>
      </header>
      <main>
        <GoalSystem goalTree={goalTree}></GoalSystem>
      </main>
    </div>
  );
}

export default App;
