


let initialState={
 
 userinfo:{

 },
 path:{

 }

}

function LoginPageReducer(state=initialState,action){
 
  if(action.type==='USERINFO'){
    return{...state,userinfo:action.payload.userInfo}
  }
  if(action.type==='STATE'){
    return{...state,path:action.payload.statePath}
  }
  if(action.type==='LOGOUT'){
    return  {...state,userinfo:{},path:{}}
  }
  return state
  
}
export default LoginPageReducer;

