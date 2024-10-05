import React, { useState } from "react";
import { auth, provider } from "../../firebaseConfig";
import { GithubAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import './login.css';



function Login() {


    const [user, setUser] = useState(null);
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            window.location.assign("/Home");
            console.log("result",result);
            
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    
    const signInWithGithub = async () => {
        try {
            const githubProvider = new GithubAuthProvider(); 
            const result = await signInWithPopup(auth, githubProvider); 
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("GitHub sign-in successful:", user);
            setUser(user);
            window.location.assign("/Home");
        } catch (error) {
            console.error("Error signing in with GitHub", error);
        }
    };


    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
                    
                    <div className="hidden md:block md:w-1/2 bg-purple-200 relative">
                        <img
                            src='./Images/chat1.webp'
                            alt="Illustration"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    
                    <div className="w-full md:w-1/2 p-8">
                        <div className="text-right">
                            <p className="text-gray-500 text-sm">
                                Not a member? <a href="#" className="text-blue-500">Register now</a>
                            </p>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 pt-4 mb-4">Welcome To ChatHive!</h2>
                        <p className="text-gray-500 mb-8">Welcome back you've been missed!</p>

                        <form>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="input-box1 mb-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <div className="text-right mt-2" >
                                    <a href="#" className="text-sm text-blue-500" >Recovery Password</a>
                                </div>
                            </div>
                            
                            <div>
                            <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                Sign In
                            </button>
                            </div>
                        </form>

                        <div className="sign-button mt-8 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">Or continue with</p>
                            <div className="flex gap-4 ml-4">
                                <button onClick={signInWithGoogle} className="bg-gray-100 p-2 rounded-full">
                                    <FcGoogle size={30}/>
                                </button>
                                <button onClick={signInWithGithub} className="signin-git bg-gray-100 p-2 rounded-full">
                                    <img src='./Images/download1.png' className="w-7"/>
                                </button>
                                {/* <button className="bg-gray-100 p-2 rounded-full">
                                    <img src='./Images/download2.png' className="w-7"/>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
