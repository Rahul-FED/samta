import React from 'react'
import CountdownTimer from './CountdownTimer'
import UserInfo from './UserInfo'
import Logo from './logo.png'
import './App.css'

const App = () => {
  return (
    <>
      <div className='mainDiv'>
      <h1 className='Heading' >Samta <span className='Heading2'>Assignment</span></h1>
      <img src={Logo} alt="img" />
      </div>
    <div style={{display:'flex'}}>
      <CountdownTimer/>
      <UserInfo/>
    </div>
    </>
  )
}

export default App