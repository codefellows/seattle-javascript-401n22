import React, { useContext } from 'react'
import { UserContext } from './App'

const FormComponent = () => {

  const defaultUser = useContext(UserContext)
  // {userName, setUserName}

  return (
    <form>
      <label for="user">User
      <input value={defaultUser.userName || ""} onChange={(e) => defaultUser.setUserName(e.target.value)}/>
      </label>
    </form>
  )
}

export default FormComponent