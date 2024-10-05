import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { FaArrowUp } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import './home.css';
import OpenAI from "openai";


const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });


function Home() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([{ role: "system", content: "Hello, how can I help you?" }]);
  const [user, setUser] = useState(null);
  const[loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  };

  const chatOpenAi = async () => {
    if (!input) {
      return Swal.fire({
        title: 'Warning!',
        text: 'Please enter your prompt',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
    setLoading(true);
    message.push({ role: "user", content: input });
    // OpenAI interaction
    // Set message state here after interaction
    


    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: message,
      //  [
      //   { role: "system", content: "You are a helpful assistant." },
      //   {
      //     role: "user",
      //     content:'what is mern',
      //   },
      // ],
    });
    message.push(completion.choices[0].message)
    console.log(completion.choices[0].message);
    // setLoading(true);
    setMessage([...message])
    setLoading(false);
    setInput('');


  };

  


  return (
    <div className="biggestOne min-h-screen bg-[#171717] flex flex-col justify-start items-center p-1 max-w-full">
      <div className='container flex justify-around gap-10 items-center max-w-full'>
        <div className='wrapper flex justify-center items-center gap-2 p-6 max-w-full'>
          <div className='heading-text'>
            <h1 className="text-4xl font-bold mb-2 text-gray-100 max-w-full">ChatHive</h1>
          </div>
          <div className='heading-img max-w-full'>
            <img src='./Images/chat1.webp' className='image-one rounded-full w-14' alt="App Logo"/>
          </div>
        </div>
        <div className='login flex justify-center items-center gap-2 p-6 max-w-full '>
          <div className="login-btn flex justify-center items-center gap-2 ml-2 px-4 py-2 bg-[#212121] text-sm font-bold text-white rounded-xl hover:bg-gray-800 ">
            <img src='./Images/chat2.webp' className='image-one rounded-full w-7' alt="Button Icon"/>
            <button>Try Hive Advanced</button>
          </div>

          {user ? (
            <div className="sign-btn flex justify-center items-center ml-2 px-4 h-auto w-auto py-1 bg-[#171717] text-sm font-bold text-white rounded-3xl">
              <img src={user.photoURL} className="rounded-full w-10 h-10 mr-2" alt="User Profile" />
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to='/Login'>
            <div className="sign-btn flex justify-center items-center ml-2 py-3 px-4 h-auto w-auto py-2 bg-white text-sm font-bold text-black rounded-3xl hover:bg-gray-200">
              <button>
                Sign in
              </button>
            </div>
            </Link>
          )}

        </div>
      </div>

      <section className="bg-[#212121] rounded-lg shadow-lg w-full max-w-6xl max-h-full px-8 py-5 ">
        <Chat message={message} loading={loading}/>
        <div className="input-bar flex justify-center items-center mt-4">
          <IoMdAttach className='attach' color='white' size={25}/>
          <input 
            type='text' 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder='Enter your message'
            className="w-full text-white p-3 pl-10 border rounded-3xl bg-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={chatOpenAi} 
            className="send-btn ml-2 px-4 h-auto w-auto py-2 bg-[#676767] text-white rounded-full hover:bg-gray-500"
          >
            <FaArrowUp color='white'/>
          </button>
        </div>
        <div className='text-[#B4B4B4] text-sm flex justify-center items-center p-1'>
          ChatHive can make mistakes. Check important info.
        </div>
      </section>
    </div>
  );
}

export default Home;
