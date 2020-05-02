import React from 'react';


const UserInfoContext = React.createContext({
    savedLocations: [],
    username: '',
    locationCount: 0,
    getUserData: () => undefined,
});

export default UserInfoContext;
