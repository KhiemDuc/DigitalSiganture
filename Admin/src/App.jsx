import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes } from "./setup/routes";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/404NotFound/NotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} path="/">
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
