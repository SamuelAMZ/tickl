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
// settings sub routes
import Username from "./components/settings/Username";
import ProfilePictures from "./components/settings/ProfilePictures";
import Description from "./components/settings/Description";
import Email from "./components/settings/Email";
import Country from "./components/settings/Country";
import Gender from "./components/settings/Gender";
import Birthdate from "./components/settings/BirthDate";
import Password from "./components/settings/Password";
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
              <Route path="/profile" element={<Profil />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/follow" element={<Follow />} />
              <Route path="/suggetions" element={<Suggetions />} />
              <Route path="/settings" element={<Settings />}>
                <Route path="username" element={<Username />} />
                <Route path="images" element={<ProfilePictures />} />
                <Route path="description" element={<Description />} />
                <Route path="email" element={<Email />} />
                <Route path="country" element={<Country />} />
                <Route path="gender" element={<Gender />} />
                <Route path="birthdate" element={<Birthdate />} />
                <Route path="password" element={<Password />} />
                <Route path="*" element={<Username />} />
              </Route>
            </Routes>
          </MenuActiveProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
