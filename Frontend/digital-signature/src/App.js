// import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import Routes from "../src/setup/routes";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
