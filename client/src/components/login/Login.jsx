import React, { useState, useContext } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import loginImg from './loginImg.jpg';
import { AuthContext } from '../../context/AuthContext'; 

function Login() {
  const navigate = useNavigate();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [eye, setEye] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { login } = useContext(AuthContext); 

  const handleEmailFocus = () => setEmailFocused(true);
  const handleEmailBlur = () => setEmailFocused(false);
  const handlePasswordFocus = () => setPasswordFocused(true);
  const handlePasswordBlur = () => setPasswordFocused(false);

  const handleEye = () => {
    setEye(!eye);
  };

  const onSubmit = (data) => {
    console.log('Login Data:', data);

   
    if (data.role === 'student' || data.role === 'staff') { 
      login(data.role);
      navigate(data.role === 'student' ? '/student' : '/staff'); 
    } else {
      console.error('Invalid role selected');
    }
  };

  return (
    <div className='signin-contain'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>sign in</h1>
        <p>Don't have an Account? <span onClick={() => navigate('/signup')}>sign up</span></p>
        <div className='input-area'>
          <div className="role-input2">
            <label>
              <input
                {...register("role", { required: "Please select a role" })}
                type="radio"
                value="student"
              />{" "}
              Student
            </label>
            <label>
              <input
                {...register("role", { required: "Please select a role" })}
                type="radio"
                value="staff" 
              />{" "}
              Staff
            </label>
          </div>
          <div className={`input input-email ${emailFocused || emailValue ? 'focused' : ''}`}>
            <label htmlFor="email" className='label email-label'>Email / UID</label>
            <input
              type="text"
              className='email'
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              onChange={(e) => setEmailValue(e.target.value)}
              {...register('username', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                  message: 'Invalid email'
                }
              })}
            />
            <span className='bottom-border'></span>
          </div>

          <div className={`input input-pass ${passwordFocused || passwordValue ? 'focused' : ''}`}>
            <label htmlFor="password" className='label pass-label'>Password</label>
            <input
              type={eye ? 'text' : 'password'}
              className='pass'
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              onChange={(e) => setPasswordValue(e.target.value)}
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 8 characters'
                }
              })}
            />
            <span className='bottom-border'></span>
          </div>
          <span className='forgot'>Forgot Password ?</span>
        </div>
        <div className="submit-container">
          <button type='submit' className='submit'>Login</button>

          <p>or</p>

          <div className="google">
            <svg width="35px" height="35px" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47" /><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4" /><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00" /><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374" /><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435" /><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626" /><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4" /></svg>
            <p>sign in with google</p>
          </div>
        </div>
      </form>
      <div className="signin-banner" style={{ backgroundImage: `url(${loginImg})` }}></div>
    </div>
  );
}

export default Login;