// App.tsx

import "./index.css";
import "./App.css";

import UploadAudio from "./components/uploadAudio";

const App = () => {
  return (
    <div className="App">
      {/* Temporarily removed BentoGrid and BentoCard components for now */}
      <h1>Welcome to My Site</h1>
      <UploadAudio /> {/* New component to handle audio file upload */}
    </div>
  );
};

export default App;
