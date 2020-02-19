import React, { createContext } from 'react'

export const AuthContext = createContext()

export const authInitialState = {
  isAuthenticated: false,
  user: null
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}

export const withAuthProps = Component => {
  return (props) => (
    <AuthContext.Consumer>
      {({ state, dispatch }) => (
        <Component
          state={state}
          dispatch={dispatch}
          {...props}
        />
      )}
    </AuthContext.Consumer>
  )
}