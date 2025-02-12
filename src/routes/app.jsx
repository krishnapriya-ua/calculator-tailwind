import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Calculator from "../pages/calculator";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Calculator/>}/>
            </Routes>
        </BrowserRouter>
    )

}
export default App
