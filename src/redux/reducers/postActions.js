export const addPostsData = (data) => ({type: 'LOAD_POSTS_DATA',payload: data});

export const addFanAction = 
  (postId, currentUserId) => ({type: 'ADD_FAN',postId, currentUserId});
export const removeFanAction = 
  (postId, currentUserId) => ({type: 'REMOVE_FAN',postId, currentUserId});


export const removePostAction = (id) => ({type: 'REMOVE_POST',id});