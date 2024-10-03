import React from 'react';
import parse from 'html-react-parser';
import { marked } from 'marked';
import './chat.css'


function Chat({ message, loading }) {
  return (
    <>
      <h2 className="text-2xl flex justify-center items-center text-gray-200 p-2 font-semibold mb-4">Your Hive</h2>
      <ul className='chat-section flex flex-col space-y-5 overflow-y-auto overflow-x-none h-96'>
        {message?.map((ele, index) => (
          <li
            key={index}
            className={`${ele?.role === "user" ? "user-data self-end bg-[#2F2F2F] text-white mr-2 rounded-3xl max-w-lg" : "chatgpt-data self-start bg-[#212121] text-justify text-white max-w-4xl flex gap-1 items-start"} p-2 `}
          >

            {ele?.role === "user" ? '' :
              <img
                src={'./Images/chat2.webp'}
                alt='ChatGPT Avatar'
                className='image-two rounded-full w-8 h-8 mr-2'
              />
            }

            <span>
              {ele?.content && parse(marked(ele.content))}
            </span>

          </li>
        ))}
        {loading && <div className='flex items-center justify-start pl-5 w-full h-full'>
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
        </div>}

      </ul>
    </>
  );
}

export default Chat;
