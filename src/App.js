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
import NewPost from "./pages/NewPost";
import SingleNormalPost from "./pages/SingleNormalPost";
import Repost from "./pages/Repost";
import Search from "./pages/Search";
import NotFoundGlobal from "./pages/NotFoundGlobal";
import Logout from "./components/Logout";
// search subroutes
import People from "./components/search/People";

// settings sub routes
import Username from "./components/settings/Username";
import ProfilePictures from "./components/settings/ProfilePictures";
import Description from "./components/settings/Description";
import Email from "./components/settings/Email";
import Country from "./components/settings/Country";
import Gender from "./components/settings/Gender";
import Birthdate from "./components/settings/BirthDate";
import Password from "./components/settings/Password";

// contexts
import { MenuActiveProvider } from "./context/MenuActive";
import { UserProvider } from "./context/UserContext";
import { MobileShowProvider } from "./context/MobileShowContext";
import { CurrentSearchTermProvider } from "./context/CurrentSearchTermContext";
import { MoreDetailsProvider } from "./context/MoreDetailContext";
import { LoginFormProvider } from "./context/LoginPagesContext";
import { HomePostsDataProvider } from "./context/HomePostDataContext";
import { HomeReRenderProvider } from "./context/HomeRerenderContext";
import { DesktopPostActiveProvider } from "./context/DesktopPostContext";
import { TargetUserProvider } from "./context/TargetUserContext";
import { ImagesUploadedProvider } from "./context/ImagesUploadedContext";
import { CloudResultProvider } from "./context/CloudResultContext";
import { CurrentRepostPostIdProvider } from "./context/CurrentRepostPostId";
import { RepostPostActiveProvider } from "./context/RepostPostActiveContext";
import { RepostStateMobileProvider } from "./context/RepostStateMobileContext";

// react query
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  // react query
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <div className="pages">
          <UserProvider>
            <MenuActiveProvider>
              <MobileShowProvider>
                <CurrentSearchTermProvider>
                  <MoreDetailsProvider>
                    <LoginFormProvider>
                      <HomePostsDataProvider>
                        <HomeReRenderProvider>
                          <DesktopPostActiveProvider>
                            <TargetUserProvider>
                              <ImagesUploadedProvider>
                                <CloudResultProvider>
                                  <CurrentRepostPostIdProvider>
                                    <RepostPostActiveProvider>
                                      <RepostStateMobileProvider>
                                        <Routes>
                                          <Route
                                            path="/"
                                            exact
                                            element={<LoginPages />}
                                          />
                                          <Route
                                            path="/home"
                                            element={<Home />}
                                          />
                                          <Route
                                            path="/explore"
                                            element={<Explore />}
                                          />
                                          <Route
                                            path="/notification"
                                            element={<Notification />}
                                          />
                                          <Route
                                            path="/bookmark"
                                            element={<Bookmark />}
                                          />

                                          <Route
                                            path="/suggetions"
                                            element={<Suggetions />}
                                          />
                                          <Route
                                            path="/new"
                                            element={<NewPost />}
                                          />
                                          <Route
                                            path="/post/:postid"
                                            element={<SingleNormalPost />}
                                          />
                                          <Route
                                            path="/repost"
                                            element={<Repost />}
                                          />
                                          <Route
                                            path="/logout"
                                            element={<Logout />}
                                          />
                                          <Route
                                            path="/followers/:username"
                                            element={<Follow />}
                                          />
                                          <Route
                                            path="/followings/:username"
                                            element={<Follow />}
                                          />
                                          <Route
                                            path="/settings"
                                            element={<Settings />}
                                          >
                                            <Route
                                              path="username"
                                              element={<Username />}
                                            />
                                            <Route
                                              path="images"
                                              element={<ProfilePictures />}
                                            />
                                            <Route
                                              path="description"
                                              element={<Description />}
                                            />
                                            <Route
                                              path="email"
                                              element={<Email />}
                                            />
                                            <Route
                                              path="country"
                                              element={<Country />}
                                            />
                                            <Route
                                              path="gender"
                                              element={<Gender />}
                                            />
                                            <Route
                                              path="birthdate"
                                              element={<Birthdate />}
                                            />
                                            <Route
                                              path="password"
                                              element={<Password />}
                                            />
                                            <Route
                                              path="*"
                                              element={<Username />}
                                            />
                                          </Route>
                                          <Route
                                            path="/search"
                                            element={<Search />}
                                          >
                                            <Route
                                              path="people"
                                              element={<People />}
                                            />
                                            <Route
                                              path="*"
                                              element={<People />}
                                            />
                                          </Route>

                                          {/* dynamic user profile pages */}
                                          <Route
                                            path="/:username"
                                            element={<Profil />}
                                          />
                                          {/* 404 for not found global subroutes */}
                                          <Route
                                            path="*"
                                            element={<NotFoundGlobal />}
                                          />
                                        </Routes>
                                      </RepostStateMobileProvider>
                                    </RepostPostActiveProvider>
                                  </CurrentRepostPostIdProvider>
                                </CloudResultProvider>
                              </ImagesUploadedProvider>
                            </TargetUserProvider>
                          </DesktopPostActiveProvider>
                        </HomeReRenderProvider>
                      </HomePostsDataProvider>
                    </LoginFormProvider>
                  </MoreDetailsProvider>
                </CurrentSearchTermProvider>
              </MobileShowProvider>
            </MenuActiveProvider>
          </UserProvider>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
