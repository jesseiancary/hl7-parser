import React, { useReducer, useEffect } from 'react'
import { Routes } from './routes/routes'
import './App.css'
import { AuthContext, authReducer, authInitialState } from './utils/auth-context'

const App = () => {

  const [state, dispatch] = useReducer(authReducer, authInitialState)

  /*
   * @description Set state from localStorage on refresh
   */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user
        }
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Routes />
      </div>
    </AuthContext.Provider>
  )

}

export default App