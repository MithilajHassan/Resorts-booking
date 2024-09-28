import { useSignupMutation, useVerifyOtpMutation, useResendOtpMutation } from "../../slices/apiSlice"
import { RootState } from "../../store"
import { useEffect, useRef, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setCredentials } from "../../slices/authSlice"

const SignupForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isSentOtp, setIsSentOtp] = useState(false)
    const [enteredOtp,setOtp] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const [count,setCount] = useState(0)
    const [resendBtnVisible, setResendBtnVisible] = useState(false)
    

    const { userInfo } = useSelector((state:RootState)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ signup ] = useSignupMutation()
    const [ verifyOtp ] = useVerifyOtpMutation()
    const [ resendOtp ] = useResendOtpMutation()

    useEffect(() => {
        if (isSentOtp) { 
            let timer: ReturnType<typeof setInterval>;
    
            if (count > 0) {
                timer = setInterval(() => {
                    setCount((prev) => prev - 1);
                }, 1000);
            } else if (count === 0) {
                setResendBtnVisible(true)
            }
    
            return () => clearInterval(timer);
        }
    }, [count, isSentOtp])

    const OtpVerifyHandler = async()=>{
        try {
            const response = await verifyOtp({otp:enteredOtp,name,email,password}).unwrap()
            if(response.success){
                dispatch(setCredentials(response.user))
                navigate('/signin')
            }else{
                setErrMsg(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submitHandler = async()=>{
        try {
            if(password == confirmPassword){
                console.log(email)
                
                const res = await signup(email).unwrap()
                console.log(res)            
                if(res.success){   
                    setIsSentOtp(true)
                    setCount(60)
                    setErrMsg('')
                }  
            } else {
                setErrMsg("Passwords do not match!")
            }
        } catch (error) {
            console.log(error)
        }   
    }

    const resendHandler = async()=>{
        await resendOtp(email)
        setCount(60)
        setResendBtnVisible(false)
    }

    return (
        <section className="bg-white min-h-screen flex items-center justify-center">
            <div className="flex flex-col space-y-2.5 w-94 md:w-96 sm:w-96 lg:w-96">
                {isSentOtp?(
                    <>
                    <h3 className="font-bold text-xl">OTP</h3>
                    <p id="errMsg" className="text-red-500 text-center mx-1 break-words">{errMsg}</p>
    
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700">Please check your mail we sent otp.</label>
                        <input
                            id="enteredOtp"
                            type="number"
                            value={enteredOtp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter the otp"
                            className="p-1.5 border border-gray-400 rounded"
                        />
                    </div>
    
                    <button className="p-1.5 bg-blue-700 rounded-md text-white" onClick={OtpVerifyHandler}>Verify</button>
                    <div className="flex justify-between">
                        <p className="text-black">00:{count}</p>
                        {resendBtnVisible && (
                                <button className="text-gray-700 hover:text-black" onClick={resendHandler}>Resend</button>
                        )}
                    </div>
                    </>
                ):(
                    <>
                    <h3 className="font-bold text-xl">Sign-Up</h3>
                <p id="errMsg" className="text-red-500 text-center mx-1 break-words">{errMsg}</p>
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="p-1.5 border border-gray-400 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="p-1.5 border border-gray-400 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="p-1.5 border border-gray-400 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="p-1.5 border border-gray-400 rounded"
                    />
                </div>

                <button className="p-1.5 bg-blue-700 rounded-md text-white" onClick={submitHandler}>Signup</button>

                <div className="flex justify-center">
                    <div className="border-solid border border-gray-400 h-10 w-12 flex justify-center items-center">
                        <FcGoogle style={{fontSize:'1.5rem'}} />
                    </div>
                </div>

                <Link to={'/sigin'}><p className="text-center">Already have an account? signin</p></Link>
                </>
                )}
                
            </div>
        </section>
    )
}

export default SignupForm