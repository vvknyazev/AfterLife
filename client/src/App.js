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
import Admin from "./pages/Admin/Admin";
import EditModel from "./pages/Admin/EditModel/EditModel";
import RequireAdminRole from "./features/auth/RequireAdminRole";
import Chats from "./pages/Chats/Chats";
import Sessions from "./pages/Sessions/Sessions";

// import Login from "./features/auth/Login";

function App() {

    return (
        <div >
            <Routes>
                {/*<PrivateRoute path="/register" element={<Login/>}/>*/}

                <Route element={<PrivateRoute/>}>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Registration/>}/>
                </Route>
                {/*<Route element={<PrivateRoute/>}>*/}

                {/*</Route>*/}
                <Route element={<PersistLogin/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/models' element={<Models/>}/>

                    <Route element={<RequireAuth/>}>
                        <Route element={<PrivateActivateRoute/>}>
                            <Route path="activate" element={<Activate/>}/>
                        </Route>
                        <Route element={<RequireActivatedAuth/>}>
                            <Route element={<RequireAdminRole/>}>
                                <Route path="admin" element={<Admin/>}/>
                                <Route path="admin/model/:modelId" element={<EditModel/>}/>
                            </Route>
                            <Route path="profile" element={<Profile/>}/>
                            <Route path="settings" element={<Settings/>}/>
                            <Route path="sessions" element={<Sessions/>}/>
                            <Route path="chats" element={<Chats/>}/>
                        </Route>

                    </Route>
                </Route>

            </Routes>
        </div>
    );
}

export default App;
