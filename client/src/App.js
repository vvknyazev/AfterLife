import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Main/Home";
import Auth from "./pages/Auth/Auth";

function App() {
    return (
       <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Auth/>}/>
                <Route path='/register' element={<Auth/>}/>
            </Routes>
       </div>
    );
}

export default App;
