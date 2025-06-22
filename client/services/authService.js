import { userLogin, userRegister } from "../src/redux/features/auth/authActions"
import store from "../src/redux/store"

export const handleLogin=(e,email,password,role)=>{
  e.preventDefault()
  try{
    if(!role||!email||!password){
      return alert('please provide all fields')
    }
    store.dispatch(userLogin({email,password,role}))
  }
  catch(error){
    console.log(error)
  }
}

export const handleRegister=(e,name,role,email,password,phone,organisationName,hospitalName,website,address)=>{
  e.preventDefault()
  try{
   store.dispatch(userRegister({name,role,email,password,phone,organisationName,hospitalName,website,address}))
  }
  catch(error){
    console.log(error)
  }
}