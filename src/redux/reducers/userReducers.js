export default function reducer(state={
  current: null,
  users: [],
}, action) {
  switch (action.type) {
    case "LOAD_USERS_DATA":
      return {...state, users: action.payload,}
    case 'SET_CURRENT_USER':
      return {...state, current: action.payload,}
    case 'REMOVE_CURRENT_USER':
      return {...state, current: null,}
    default:
      return state
  }
}