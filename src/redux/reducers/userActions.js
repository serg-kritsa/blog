export const addUserData = data => ({type: 'LOAD_USERS_DATA',payload: data})
export const setCurrentUser = data => ({type: 'SET_CURRENT_USER', payload: data})
export const removeCurrentUser = data => ({type: 'REMOVE_CURRENT_USER'})