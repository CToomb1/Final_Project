import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchRecipes from "./pages/SearchRecipes";
import SavedRecipes from "./pages/SavedRecipes";
import Navbar from "./components/navbar";

import * as API from "./utils/api";
import AuthService from "./utils/auth";

import UserInfoContext from "./utils/UserInfoContext";

function App() {

    const [userInfo, setUserInfo] = useState({

        savedRecipes: [],
        username: "",
        getUserData: () => {

            const token = AuthService.loggedIn() ? AuthService.getToken() : null;
            if (!token) {
                return false;
            }
            API.getMe(token)
                .then(({ data: { username, savedRecipes } }) =>
                    setUserInfo({ ...userInfo, username, savedRecipes })
                )
                .catch((err) => console.log(err));
        },
    });


    useEffect(() => {
        userInfo.getUserData();
    });

    return (
        <Router>
            <>
                <UserInfoContext.Provider value={userInfo}>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' component={SearchRecipes} />
                        <Route exact path='/saved' component={SavedRecipes} />
                        <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
                    </Switch>
                </UserInfoContext.Provider>
            </>
        </Router>
    );
}

export default App;
