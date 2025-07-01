import React from 'react'

const Login = () => {
  return (
    <div>
      {/* email */}
      <div>
        <div>
            <input type="text"
            placeholder='Email'
            name = "Email"
            
             />
        </div>
        <div>
            <input type="text"
            placeholder='Password'
            name = "Password"

             />
        </div>
      </div>
    </div>
  )
}

export default Login
