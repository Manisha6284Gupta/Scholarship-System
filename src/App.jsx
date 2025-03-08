import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
// import axios from 'axios'
import authService from './backend/auth.js'
import {login, logout} from "./store/authSlice.js"
// import { Header, Footer } from './components'
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';



function App() {
  

  //This is for connecting frontend with backend

  // useEffect(()=>{
  //   axios.get('http://localhost:2000')
  //   .then((response)=>{
  //     set
  //   })
  // })

    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=>setloading(false))
      
    },[])

  return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full bloac'>
        <Header/>
        <main>

        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
