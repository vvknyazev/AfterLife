import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Main/Home";
import Registration from "./pages/Auth/Registration";
import Login from "./pages/Auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Profile from "./pages/Profile";
import PersistLogin from "./features/auth/PersistLogin";
import PrivateRoute from "./features/auth/PrivateRoute";
import Activate from "./pages/Auth/Activate";
import PrivateActivateRoute from "./features/auth/PrivateActivateRoute";
import RequireActivatedAuth from "./features/auth/RequireActivatedAuth";
import Models from "./pages/Models/Models";
import Settings from "./pages/Settings/Settings";
import ModelProfile from "./pages/ModelProfile/ModelProfile";
import Admin from "./pages/Admin/Admin";
import EditModel from "./pages/Admin/EditModel/EditModel";
import RequireAdminRole from "./features/auth/RequireAdminRole";
import Chats from "./pages/Chats/Chats";
import Sessions from "./pages/Sessions/Sessions";
import CreateModel from "./pages/Admin/CreateModel/CreateModel";
import MessageChecker from "./features/MessageChecker";
import SessionBuilder from "./pages/SessionBuilder/SessionBuilder";
import CompleteRegistration from "./components/Auth/CompleteRegistration/CompleteRegistration";
import SettingsActivity from "./pages/Settings/SettingsActivity/SettingsActivity";
import SettingsBalance from "./pages/Settings/SettingsBalance/SettingsBalance";
import SettingsFriends from "./pages/Settings/SettingsFriends/SettingsFriends";
import SettingsAchievements from "./pages/Settings/SettingsAchievements/SettingsAchievements";

// import Login from "./features/auth/Login";

function App() {

    return (
        <div>
            <Routes>

                <Route element={<PrivateRoute/>}>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Registration/>}/>
                </Route>

                <Route element={<PersistLogin/>}>
                    <Route element={<MessageChecker/>}>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/hosts' element={<Models/>}/>

                        <Route element={<RequireAuth/>}>
                            {/*<Route element={<PrivateActivateRoute/>}>*/}
                            {/*    <Route path="activate" element={<Activate/>}/>*/}
                            {/*</Route>*/}
                            <Route element={<RequireActivatedAuth/>}>
                                <Route element={<RequireAdminRole/>}>
                                    <Route path="admin" element={<Admin/>}/>
                                    <Route path="admin/model/create" element={<CreateModel/>}/>
                                    <Route path="admin/model/:modelId" element={<EditModel/>}/>
                                </Route>
                                <Route path="complete" element={<CompleteRegistration/>}/>
                                <Route path="profile" element={<Profile/>}/>
                                <Route path="/host/:modelId" element={<ModelProfile/>}/>
                                <Route path="settings/profile" element={<Settings/>}/>
                                <Route path="settings/activity" element={<SettingsActivity/>}/>
                                <Route path="settings/balance" element={<SettingsBalance/>}/>
                                <Route path="settings/friends" element={<SettingsFriends/>}/>
                                <Route path="settings/achievements" element={<SettingsAchievements/>}/>
                                <Route path="sessions" element={<Sessions/>}/>
                                <Route path="chats" element={<Chats/>}/>
                                <Route path="create-session/:modelId" element={<SessionBuilder/>}/>
                            </Route>

                        </Route>
                    </Route>
                </Route>

            </Routes>
        </div>
    );
}

export default App;
