import { useState } from "react"
import React from 'react'
import InputType from "./inputType"
import {Link} from 'react-router-dom'
import { handleLogin, handleRegister } from "../../../../services/authService"

const Form = ({formType,submitBtn,formTitle}) => {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[role,setRole]=useState('donar')
  const[name,setName]=useState('')
  const[organisationName,setOrganisationName]=useState('')
  const[hospitalName,setHospitalName]=useState('')
  const[website,setWebsiteName]=useState('')
  const[address,setAddress]=useState('')
  const[phone,setPhone]=useState('')

  
  return (
    <form onSubmit={(e)=>{
      if(formType==='login') return handleLogin(e,email,password,role)
      else if(formType==='register') return handleRegister(e,name,role,email,password,phone,organisationName,hospitalName,website,address)
    }}>
      <h1 className='text-center'>{formTitle}</h1>
      <hr />
      <div className="d-flex mb-3">
        <div className="form-check">
          <input 
          type="radio"
          className="form-check-input"
          name="role"
          id="donarRadio"
          value={'donar'}
          onChange={(e)=>setRole(e.target.value)}
          />

          <label htmlFor="donarRadio" className="form-check-label">
            Donar
          </label>
        </div>

        <div className="form-check ms-2">
          <input 
          type="radio"
          className="form-check-input"
          name="role"
          value={'admin'}
          id="adminRadio"
          onChange={(e)=>setRole(e.target.value)}
          />
          <label htmlFor="adminRadio" className="form-check-label">
            Admin
          </label>
        </div>

        <div className="form-check ms-2">
          <input 
          type="radio"
          className="form-check-input"
          name="role"
          id="hospitalRadio"
          value={'hospital'}
          onChange={(e)=>setRole(e.target.value)}
      
          />

          <label htmlFor="hospitalRadio" className="form-check-label">
            Hospital
          </label>
        </div>

        <div className="form-check ms-2">
          <input 
          type="radio"
          className="form-check-input"
          name="role"
          id="organisationRadio"
          value={'organisation'}
          onChange={(e)=>setRole(e.target.value)}
       

          />

          <label htmlFor="organisationRadio" className="form-check-label">
            Organisation
          </label>
        </div>


      </div>
      {(()=>{
        switch(true){
          case formType==='login':{
            return (
              <>
              <InputType 
              labelText={'email'}
              labelFor={'forEmail'}
              inputType={'email'}
              name={'email'}
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              />

              <InputType 
              labelText={'Password'}
              labelFor={'forPassword'}
              inputType={'password'}
              name={'password'}
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
             />                    
            </>
            )
          }
          case formType==='register':{
          return(
          <>
      {(role==='admin' || role==='donar')&&(
        <InputType 
      labelText={'Name'}
      labelFor={'forName'}
      inputType={'text'}
      name={'name'}
      value={name}
      onChange={(e)=>{setName(e.target.value)}}
      />
      )}
      

      {role==='organisation'&&(
<InputType 
      labelText={'organisation Name'}
      labelFor={'fororganisationName'}
      inputType={'text'}
      name={'organisationName'}
      value={organisationName}
      onChange={(e)=>{setOrganisationName(e.target.value)}}
      />
      )}
      
      {role==='hospital'&&(
        <InputType 
      labelText={'Hospital Name'}
      labelFor={'forHospitalName'}
      inputType={'text'}
      name={'hospitalName'}
      value={hospitalName}
      onChange={(e)=>{setHospitalName(e.target.value)}}      
      />

      )}
      
      <InputType 
      labelText={'email'}
      labelFor={'forEmail'}
      inputType={'email'}
      name={'email'}
      value={email}
      onChange={(e)=>{setEmail(e.target.value)}}
      />

      <InputType 
      labelText={'Password'}
      labelFor={'forPassword'}
      inputType={'password'}
      name={'password'}
      value={password}
      onChange={(e)=>{setPassword(e.target.value)}}
      />

      <InputType 
      labelText={'Website Name'}
      labelFor={'forWebsiteName'}
      inputType={'text'}
      name={'website'}
      value={website}
      onChange={(e)=>{setWebsiteName(e.target.value)}}      
      />

      <InputType 
      labelText={'Address'}
      labelFor={'forAddress'}
      inputType={'text'}
      name={'Address'}
      value={address}
      onChange={(e)=>{setAddress(e.target.value)}}      
      />

      <InputType 
      labelText={'Phone'}
      labelFor={'forPhone'}
      inputType={'text'}
      name={'phone'}
      value={phone}
      onChange={(e)=>{setPhone(e.target.value)}}      
      />
           </>)
          }

        }
      })()}
      
      <div className="d-flex flex-row justify-content-between">
        {formType==='login'?(<p>Not registered yet
          <Link to="/register"> Here !</Link>
        </p>):(<p>Already User Please
          <Link to="/login"> Login !</Link>
        </p>)}
        <button className="btn btn-primary" type="submit"
        >{submitBtn}</button>
      </div>
    </form>
  )
}

export default Form