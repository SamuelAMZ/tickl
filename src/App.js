import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPages from "./pages/LoginPages";
import Explore from "./pages/Explore";
import Notification from "./pages/Notification";
import Profil from "./pages/Profil";
import Bookmark from "./pages/Bookmark";
import Settings from "./pages/Settings";
import Follow from "./pages/Follow";
import Suggetions from "./pages/Suggetions";
import { MenuActiveProvider } from "./context/MenuActive";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <div className="pages">
        <UserProvider>
          <MenuActiveProvider>
            <Routes>
              <Route path="/" exact element={<LoginPages />} />
              <Route path="/home" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/follow" element={<Follow />} />
              <Route path="/suggetions" element={<Suggetions />} />
            </Routes>
          </MenuActiveProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
