import { AppDispatch } from "../../store"
import { useSigninMutation } from "../../slices/userApiSlice"
import { setAdminAuth, setCredentials } from "../../slices/authSlice"
import { FormEvent, useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../store"

interface SigninFormProps {
    role: 'user' | 'admin';
    signupUrl?: string;
    nextPage: string;
    alertMsg?: string;
}

const SigninForm: React.FC<SigninFormProps> = ({ role, signupUrl, nextPage, alertMsg }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errMsg, setErrMsg] = useState('')

    const { adminInfo } = useSelector((state: RootState) => state.auth)
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const [signin] = useSigninMutation()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(()=>{
        if(alertMsg){
            setErrMsg(alertMsg)
        }
    })

    useEffect(() => {
        if (role == 'admin') {
            if (adminInfo) {
                navigate('/admin/dashboard')
            }
        } else {
            if (userInfo) {
                navigate('/')
            }
        }
    }, [])

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await signin({ email, password, role }).unwrap()
            if (role == 'user') {
                dispatch(setCredentials(res))
            } 
            navigate(nextPage)
        } catch (err: any) {
            if (err?.data) {
                setErrMsg(err.data?.message)
            }
            console.log(err)
        }
    }

    return (
        <section className="bg-white min-h-screen flex items-center justify-center">
            <form className="flex flex-col space-y-2.5 w-94 md:w-96 sm:w-96 lg:w-96" onSubmit={(e) => submitHandler(e)}>
                <h3 className="font-bold text-xl">Sign-In</h3>
                <p id="errMsg" className="text-red-500 text-center mx-1 break-words">{errMsg}</p>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="p-1.5 border border-gray-400 rounded"
                        required={true}
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
                        required
                    />
                </div>

                <button type="submit" className="p-1.5 bg-blue-700 rounded-md text-white">Signin</button>
                <p className="text-center">Or</p>
                 <div className="flex justify-center">
                    <div className="border-solid border border-gray-400 h-10 w-12 flex justify-center items-center">
                        <FcGoogle style={{fontSize:'1.5rem'}} />
                    </div>
                </div>
                {signupUrl && (<p className="text-center">New user?<Link to={signupUrl} className="text-blue-700 underline"> signup</Link></p>)}
            </form>
        </section>
    )
}

export default SigninForm