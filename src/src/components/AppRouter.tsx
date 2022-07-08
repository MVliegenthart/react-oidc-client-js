import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthHome from '../pages/AuthHome';
import { RevSearchPage, RevHomePage } from '../pages/RevPage';


export default class AppRouter extends React.Component{
    public render(){
        return (
            <BrowserRouter basename='NewUX' >
                <Routes>
                    <Route path="/" element={<AuthHome />}/>
                    <Route path="/auth" element={<AuthHome />}/>
                    <Route path="/revhome" element={<RevHomePage/>}/>
                    <Route path="/revsearch" element={<RevSearchPage/>}/>
                </Routes>
            </BrowserRouter>
        )
    };
}