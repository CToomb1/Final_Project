import React from 'react';


const UserInfoContext = React.createContext({
    savedRecipes: [],
    username: '',
    getUserData: () => undefined,
});

export default UserInfoContext;
