import { Routes, Route, useLocation } from "react-router-dom";

import { CustomForm } from "./components/custom-form/custom-form";
import { UserCard } from "./components/weather-card/weather-card";
import { Modal } from "./components/modal/modal";
import { Layout } from "./pages/layout";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import "./App.scss";

function App() {
  // const dispatch = useDispatch();
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />} />
        {/* <Route path="/weather/card" element={<UserCard />} /> */}
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/weather/add"
            element={<Modal children={<CustomForm />} />}
          />
          <Route
            path="/weather/:id"
            element={<Modal children={<UserCard />} />}
          />
          <Route
            path="/weather/update/:id"
            element={<Modal children={<CustomForm editMode={true} />} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
