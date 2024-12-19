import "./App.css";
import IdleTimeIndicator from "./components/IdleTimeIndicator";
import ReactIcon from "./components/ReactIcon";
import Sidebar from "./components/Sidebar";
import { FeatureFlagProvider } from "./contexts/FeatureFlagContext";

function App() {
  return (
    <FeatureFlagProvider>
      <Sidebar />
      <ReactIcon />
      <IdleTimeIndicator />
    </FeatureFlagProvider>
  );
}

export default App;
