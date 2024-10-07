import React, { useState } from "react";
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login'
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";




function App() {


   


    return (
        <>
            <div>
                <Routes>
                    <Route path='/Home' element={<><Home /></>} >
                    </Route>
                    <Route path='/' element={<><Login /></>} >
                    </Route>
                </Routes>
            </div>
        </>
    )
}

export default App
