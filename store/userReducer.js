const initialState = {
  users: [],
  loading: false,
  error: null,
  messages: [],
  posts:[],
  posts_by_id:[],
  currentUserDetail: [],
  is_typing: "false",
  pusher_from: "",
  pusher_to: "",
  message_counter: 0,
  comments:[],
  commentsCounter:0,
  explorer_var:[],
  searched_result:[],
  
  /*===========register==================*/
  client_gender: '',
  client_sexualTendency: '',
  client_relationShip: '',
  profile:[],
}
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "client_gender": {
      return {
        ...state,
        client_gender: action.payload,
      };
    }
    case "client_sexual_tendency": {
      return {
        ...state,
        client_sexualTendency: action.payload
      };
    }
    case "client_relationShip": {
      return {
        ...state,
        client_relationShip: action.payload
      };
    }
    case "FETCH_USERS":{
      return {
        ...state,
        users: action.payload,
        loading:false,
      };
    }

    case "FETCH_POSTS":{
      return {
        ...state,
        posts:action.payload,
        loading:false,
      };
    }
    case "FETCH_POSTS_BY_ID":{
      return {
        ...state,
        posts_by_id:action.payload,
        loading:false,
      };
    }
    
    case "ADD_COMMENT":{
      return {
        ...state,
        comments:action.payload
      };
    }
    case "COUNT_COMMENT":{
      return {
        ...state,
        commentsCounter:action.payload
      };
    }
    
    case "FETCH_MESSAGES":{
      return {
        ...state,
        messages: action.payload,
        loading:false,
      };
    }
    case 'clickToChat':{
      return {
        ...state,
        currentUserDetail: action.payload
      };
    }
    case "ADD_MESSAGE":{
      return {
        ...state,
        messages: state.messages.concat([action.payload]),

      };
}    
case "GET_PROFILE":{
      return {
        ...state,
        profile: action.payload,

      };
}
case "EXPRORER":{
  return {
    ...state,
    explorer_var: action.payload,

  };
}
case "SEARCH_CLIENT":{
  return {
    ...state,
    searched_result: action.payload,

  };
}

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
