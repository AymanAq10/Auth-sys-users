import React, { useState } from 'react';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword,setConfirmedPassword]=useState('');
  const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('initial');
  const [message, setMessage] = useState('');
  const [width, setwidth] = useState(0);
  const token = localStorage.getItem('token');
  const handleSendCode = async () => {
    try {
      // Send a POST request to your backend API to send the verification code
      const response = await fetch('https://auth-sys-users.onrender.com/users/send-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setConfirmationCodeSent(true);
        setwidth('calc(100%/3)')
        setMessage('Verification code sent to your email.');
      } else {
        setConfirmationCodeSent(false);
        const data = await response.json();
        setMessage(data.error || 'Failed to send verification code.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      setMessage('An error occurred while sending the verification code.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      // Send a POST request to your backend API to verify the reset code    
      console.log(email,resetCode)
      const response = await fetch('https://auth-sys-users.onrender.com/users/verify-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetCode }),
      });
      console.log(response)
      if (response.status === 200) {
        setwidth('calc(100%/3 + 100%/3 )')
        console.log(width)
        setVerificationStatus('verified');
        setMessage('Code verified. You can now reset your password.');
      } else {
        const data = await response.json();
        setMessage(data.error || 'Invalid reset code.');
      }
    } catch (error) {
      console.error('Error verifying reset code:', error);
      setMessage('An error occurred while verifying the reset code.');
    }  
  };

  const handleResetPassword = async () => {
  console.log(resetCode)
    try {
      // Send a POST request to your backend API to reset the password
      if(newPassword !== confirmedPassword){
      	alert('passwords not the same')
      }
      else{
      const response = await fetch('https://auth-sys-users.onrender.com/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,resetCode, newPassword }),
      });

      if (response.status === 200) {
        setwidth('100%')
        setMessage('Password reset successful.');
        setInterval(()=>{window.location="/"},1200)
      } else {
        const data = await response.json();
        setMessage(data.error || 'Password reset failed.');
      }}
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting the password.');
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
		Reset Password
          </h2>
        </div>
      {verificationStatus === 'initial' && !confirmationCodeSent && (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div >
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
          <button onClick={handleSendCode} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5">Send Verification Code</button>
        </div>
      )}

      {confirmationCodeSent && verificationStatus === 'initial' && (
        
           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div >
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Verification Code
              </label>
              <div className="mt-2">
                <input
          	  type="text"
            	  value={resetCode}
            	  onChange={(e) => setResetCode(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
          <button onClick={handleSendCode} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"onClick={handleVerifyCode}>Verify Code</button>
        </div>
        
         )}

      {verificationStatus === 'verified' && (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div >
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
          	    type="password"
            	    value={newPassword}
            	    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-2">
                <input
          	    type="password"
            	    value={confirmedPassword}
            	    onChange={(e) => setConfirmedPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
          <button onClick={handleSendCode} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}
      <div className="styling_pers mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <i style={{width:width}}></i>
      {width == '100%'?<p text-center>done</p>:null}
      </div>
      {message && <p>{message}</p>}
        </div>
    </div>
  );
}

export default ResetPasswordForm;

