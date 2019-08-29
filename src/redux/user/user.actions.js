// create the actual actions
// action creator functions -> returns objects in correct format
// action type name should never change, we use capitals
export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});