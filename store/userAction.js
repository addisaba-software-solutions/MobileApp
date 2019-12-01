import axios from 'axios'
import API from './../api.jsx'
import {AsyncStorage} from 'react-native';
export function gender(data) {
  return {
    type: "client_gender",
    payload: data,
  };
}

export function sexualTendency(data) {
  return {
    type: "client_sexual_tendency",
    payload: data,
  };
}
export function relationShip(data) {
  return {
    type: "client_relationShip",
    payload: data,
  };
}
export function getAllUser() {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/test',
      params: {
        logged_user: AsyncStorage.getItem('email'),
      },
    })

      .then((users) => {
   
        dispatch({
          type: "FETCH_USERS",
          payload: users.data,
        })
      })
      .catch(ex => {
        console.log("users", ex);
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function AddPost(title, body, img, shared) {
  const fd = new FormData();
  fd.append('title', title);
  fd.append('body', body);
  fd.append('image', img);
  fd.append('user_id', localStorage.getItem('email'));
  fd.append('id', localStorage.getItem('id'));
  fd.append('firstName', localStorage.getItem('firstName'));

  return (dispatch) => {
    axios.post(API + "/add_post", fd, {
      method: 'post',
    })
      .then((exp) => {
        console.log("res", exp)
        dispatch({
          type: "EXPRORER",
          payload: exp.data,
        })
      })
      .catch(ex => {
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function sharePost(post_id) {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/share',
      params: {
        logged_user: AsyncStorage.getItem('email'),
        post_id: post_id,
      },
    })
      .then((share_posts) => {

        console.log("res", share_posts)
        if (share_posts.data.success) {
       
          dispatch({
            type: "i don't want",
            payload: share_posts.data,
          })
        }
        else {
          Swal.fire(
            'success!',
            'You shared the post successfully',
            'error'
          )
        }

      })
      .catch(ex => {
  
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function getAllPosts() {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/get_post',
      params: {
        logged_user: "titi@gmail.com",
      },
    })
      .then((posts) => {
        console.log("posts", posts);
        dispatch({
          type: "FETCH_POSTS",
          payload: posts.data,
        })
      })
      .catch(ex => {
       
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function getAllPostsById(email) {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/post_by_id',
      params: {
        logged_user: email,
      },
    })
  .then((posts) => {
        dispatch({
          type: "FETCH_POSTS_BY_ID",
          payload: posts.data,
        })
      })
      .catch(ex => {
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function addComment(post_id, comment) {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/add_comment',
      params: {
        user_id: localStorage.getItem('email'),
        post_id: post_id,
        comment: comment,

      },
    })
      .then((add) => {

        console.log("addComment", add);
        dispatch({
          type: "ADD_COMMENT",
          payload: add.data,
        })
      })
      .catch(ex => {
      
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function countComment() {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/get_post',
      params: {
        logged_user: localStorage.getItem('email'),
      },
    })
      .then((add) => {
        console.log("addComment", addComment);
        dispatch({
          type: "COUNT_COMMENT",
          payload: add.data,
        })
      })
      .catch(ex => {
     
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function incrementLike(post_id) {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/add_like',
      params: {
        user_id: localStorage.getItem('email'),
        post_id: post_id,
      },
    })
      .then((add) => {
        console.log("++", add);
        dispatch({
          type: "ADD_LIKE",
          payload: add.data,
        })
      })
      .catch(ex => {
     
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function decrementLike(post_id) {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/del_like',
      params: {
        user_id: localStorage.getItem('email'),
        post_id: post_id,
      },
    })
      .then((add) => {
        console.log("addComment", add);
        dispatch({
          type: "DELETE_LIKE",
          payload: add.data,
        })
      })
      .catch(ex => {
    
        dispatch({
          type: "FETCH_USER_FAILURE",
          payload: ex,
        })

      })
  }
}
export function clickToChat(data) {
  return {
    type: 'clickToChat',
    payload: [data],
  };
}
export function getMessage(id) {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + "/user_getMessage",
      params: {
        sender_id: AsyncStorage.getItem('email'),
        receiver_id: id,
        message: "message",
      },
    })
      .then((res) => {

        dispatch({
          type: "FETCH_MESSAGES",
          payload: res.data,
        })

      })
      .catch(ex => {
     
        dispatch({
          type: "FETCH_MESSAGES",
          payload: ex,
        })
      })
  }
}
export function sendMessage(id, msg) {
  var receiver_id = id, message = msg;
  var sender_id = AsyncStorage.getItem('email');
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + "/user_message",
      params: {
        sender_id: sender_id,
        receiver_id: receiver_id,
        message: message,
        image: "xx",
      },
    })
      .then((res) => {
        console.log("sendxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",res);
        dispatch({
          type: "We dont need!",
          payload: res.data,
        })


      })
      .catch(ex => {
        console.log("sendxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxErrrrrrrrrrrrr",ex);

      })
  }
}
export function getProfile(email) {
  return (dispatch) => {
    axios.request({
      url: API + '/profile',
      params: {
        email: email,//localStorage.getItem('email'),
      }
    })
      .then((res) => {
        if (res.data.success) {

          dispatch({
            type: "GET_PROFILE",
            payload: res.data.success,
          })
        }
      })
      .catch(ex => {


      })
  }
}
export function addMessage(message) {
  return {
    type: "ADD_MESSAGE",
    payload: message,
  };
}

export function explorer() {
  return (dispatch) => {
    axios.request({
      method: 'get',
      url: API + '/exprore',
      params: {
        email: localStorage.getItem('email'),
      },
    })
      .then(res => {
        if (res.data.success) {
          console.log("console", res.data.success);
          dispatch({
            type: "EXPRORER",
            payload: res.data.success,
          })
        }
      })
      .catch(ex => {
        console.log("error", ex);
      })

  }
}

export function profile_visit(email) {
  return (dispatch) => {
    const visited = email;
  if (visited != localStorage.getItem('email')) {
    axios.request({
      method: 'get',
      url: API + '/profile-visited',
      params: {
        visited: visited,
        visiter: localStorage.getItem('email'),
      },
    })
    .then(res => {
      if (res.data.success) {
        console.log("console", res.data.success);
        dispatch({
          type: "VISIT_PROFILE",
          payload: "",
        })
      }
    })
    .catch(ex => {
      console.log("Exxxxxx", ex)
    })

  }
}

}
export function search(query) {
  return (dispatch) => {

    axios.request({
      method: 'get',
      url: API + '/search',
      params: {
        term: query,
        email: localStorage.getItem('email'),
      },
    })
    .then(res => {

      if (res.data.success) {
        console.log("sear",res);
        dispatch({
          type: "SEARCH_CLIENT",
          payload: res.data.success,
        })
      }
    })
    .catch(ex => {
      console.log("Exxxxxx", ex)
    })

  
}

}