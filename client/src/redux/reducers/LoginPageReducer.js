


let initialState={
 
 userinfo:{},
}




function LoginPageReducer(state=initialState,action){
console.log(action)


if(action.type==='USERINFO'){
  return{...state,userinfo:action.payload.userInfo}
}
if(action.type==='LOGOUT'){
  return  {...state,userinfo:{}}
}
return state
  
}
export default LoginPageReducer;

