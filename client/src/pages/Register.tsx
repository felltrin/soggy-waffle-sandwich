// import React from "react";

function Register() {
  return (
    <>
      <h2>Register</h2>
      <form>
        <div>
          <label>Username</label>
          <input type="text" id="username"/>
        </div>

        <div>
          <label>Email</label>
          <input type="email" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" id="password"/>
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" id="confirmPassword" />
        </div>

        <button type="submit">
          Register
        </button>
      </form>
    </>
  );
}

export default Register;