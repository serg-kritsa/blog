export default function reducer(state=[
  {id: 1, title: 'q', body: 'q', userId: 1, hasLike: false, likeCounter: 0}
], action) {
  // console.log('DATA TO REDUCER', action);
  // console.log('reducer');
  
  switch (action.type) {
    case 'LOAD_POSTS_DATA': 
      return [ ...action.payload ]
     
    case 'ADD_POST':
      return [...state,
        {
          id: state.reduce((maxId, post) => Math.max(post.id, maxId), -1) + 1,
          title: action.title,
          body: action.body,
          userId: action.currentUserId,
          fans: [],
        }
      ]
    case 'EDIT_POST':
      return state.map(post => {
        return (post.id === action.id)
        ? {...post, title: action.title, body: action.body }
        : post
      })
    case 'REMOVE_POST': {
      return state.filter(post => post.id != action.id)
    }

    case 'ADD_FAN':
      return state.map(post => { 
        return (post.id === action.postId) ? 
          {...post, fans: [...post.fans, action.currentUserId]} 
          : 
          post
      })
    case 'REMOVE_FAN':
      return state.map(post => {         
        return (post.id === action.postId) ? 
          {...post, fans: post.fans.filter(fan => fan != action.currentUserId) } 
          : 
          post
      })
    default:  
      return state
  }
}
