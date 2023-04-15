import React from 'react';
import './App.css';
import {Navigation} from "./components/maps/Navigation";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Navigation/>
        </BrowserRouter>
    );
}

export default App;
