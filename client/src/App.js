import './App.css';
import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Main/Home";
import Registration from "./pages/Auth/Registration";
import Login from "./pages/Auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./pages/Welcome";
import UsersList from "./features/users/UsersList";

import PersistLogin from "./features/auth/PersistLogin";
import PrivateRoute from "./features/auth/PrivateRoute";
import Activate from "./pages/Auth/Activate";
import PrivateActivateRoute from "./features/auth/PrivateActivateRoute";
import RequireActivatedAuth from "./features/auth/RequireActivatedAuth";

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

                    <Route element={<RequireAuth/>}>
                        <Route element={<PrivateActivateRoute/>}>
                            <Route path="activate" element={<Activate/>}/>
                        </Route>
                        <Route element={<RequireActivatedAuth/>}>
                            <Route path="welcome" element={<Welcome/>}/>
                            <Route path="userslist" element={<UsersList/>}/>
                        </Route>

                    </Route>
                </Route>

            </Routes>
        </div>
    );
}

export default App;
