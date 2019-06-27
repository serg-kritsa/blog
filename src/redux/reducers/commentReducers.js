export default function reducer(state=[], action) {
  switch (action.type) {
    case "LOAD_COMMENTS_DATA":
      let comments = action.payload
      return [ ...comments ]
    case 'ADD_COMMENT':
      // const {postId, name, body} = action.payload
      let id = state.reduce((max,comment) => Math.max(max, comment.id),0)+1
      return [
        ...state, 
        {
          postId: action.postId,
          id, 
          email: action.login, 
          name: action.name, 
          body: action.body
        }
      ]  
    default:
      return state
  }
}