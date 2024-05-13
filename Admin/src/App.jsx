import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes } from "./setup/routes";
import Sidebar from "./components/SideBar/SideBar";
import { Fragment } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let isSizeBar = route.sidebar;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isSizeBar ? (
                    <Sidebar appBarText={route.text}>
                      <Page />
                    </Sidebar>
                  ) : (
                    <Fragment>
                      <Page />
                    </Fragment>
                  )
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
