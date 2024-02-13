import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

import 'react-phone-input-2/lib/style.css';

import { auth } from './firebase.config.js';

function App() {

  const [otp, setotp] = useState('')
  const [ph, setph] = useState('')
  const [loading, setloading] = useState(false)
  const [showotp, setshowotp] = useState(false)
  const [user, setuser] = useState(null)

  function onCapchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup()
        },
        'expired-callback': () => {

        }
      });
    }
  }

  function onSignup(){
    setloading(true)
    onCapchVerify()
    const appVerifier=window.recaptchaVerifier
    const formatph='+'+ph
    signInWithPhoneNumber(auth, formatph, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setloading(false)
      setshowotp(true)
      toast.success('OTP sended successfully!')
    }).catch((error) => {
      // console.log(error);
      setloading(false)
    });
  }

  function onOTPVerify(){
    setloading(true)
    window.confirmationResult.confirm(otp).then(async(res)=>{
      // console.log(res)
      setuser(res.user)
      setloading(false)
    }).catch(error=>{
      console.log(error);
      setloading(false)
    })
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{duration:4000}} />
        <div id="recaptcha-container">

        </div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Login Form <br />Made by Nikhilesh Chouhan
            </h1>
            {
              showotp ? (
                <>
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
                  </div>
                  <label htmlFor="otp"
                    className='font-bold text-xl text-white text-center'
                  >
                    Enter your OTP
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setotp}
                    OTPLength={6}
                    otpType='number'
                    disabled={false}
                    autoFocus
                    className='otp-container'
                  />
                  <button onClick={onOTPVerify} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                    {
                      loading && <CgSpinner Size={20}
                        className='mt-1 animate-spin'
                      />
                    }
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>
                  <label htmlFor=""
                    className='font-bold text-xl text-white text-center'
                  >
                    Verify your Phone number
                  </label>
                  <PhoneInput
                    country={'in'} value={ph} onChange={setph}
                  />
                  <button onClick={onSignup} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                    {
                      loading && <CgSpinner Size={20}
                        className='mt-1 animate-spin'
                      />
                    }
                    <span>Send a code via SMS</span>
                  </button>
                </>
              )}

          </div>
        )}
      </div>
    </section>
  );
}

export default App;
