import './App.css';
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import React from "react";
import Strip from "./components/Strip/Strip";
import GirlsSection from "./components/GirlsSection/GirlsSection";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div>
            <Nav/>
            <Header/>
            <GirlsSection/>
            <Strip/>
            <Footer/>
        </div>
    );
}

export default App;
