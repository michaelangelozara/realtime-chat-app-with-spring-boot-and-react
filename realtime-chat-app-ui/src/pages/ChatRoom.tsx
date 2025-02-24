import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom'
import { Message, MessageType } from '../types/Message';
import WebSocketService from '../services/WebSocketService';
import { Client } from '@stomp/stompjs';

const ChatRoom = () => {
  const username = useLoaderData();

  const [messages, setMessages] = useState < Message[] > ([]);
  const [message, setMessage] = useState < Message > ({
    message: username + " is entered the room",
    sender: username,
    type: MessageType.JOIN
  });
  const [stompClient, setStompClient] = useState < Client | null > (null);

  useEffect(() => {
    const asd = async () => {
      const client = WebSocketService((callbackMessage) => {
        setMessages((prev) => [...prev, callbackMessage]);
      });

      setStompClient(client);

      return () => client.deactivate();
    }
    asd();
  }, []);

  const sendMessage = () => {
    setMessage((prev) => ({ ...prev, type: MessageType.CHAT }))
    stompClient?.publish({ destination: "/app/chat.sendMessage", body: JSON.stringify(message) });
  }

  return (
    <div className='flex h-96'>
      <div className='bg-gray-200 w-36 rounded-2xl pt-2 flex flex-col items-center'>
        <h1 className='text-white bg-green-400 w-fit p-2 rounded-2xl'>Active {messages.length > 1 ? "Users" : "User"}</h1>
        <ul className='flex flex-col justify-start w-full pl-2 overflow-y-scroll'>
          {messages?.map((m, index) => (
            <li className='text-green-600 font-bold' key={index}>{m.sender}</li>
          ))}
        </ul>
      </div>
      <div className='w-1/4 h-96 min-w-74 border border-gray-400 rounded-2xl flex flex-col justify-between
      '>
        <div className='rounded-2xl h-3/4 bg-gray-200 p-2 overflow-y-scroll'>
          <ul className='space-y-1'>
            {messages?.map((m, index) => (
              <li key={index} className="bg-blue-600 max-w-44 w-fit text-white px-3 py-1 rounded-2xl break-words">
                {m.message}
                <br />
                <span className='text-sm'>- {m.sender} -</span>
              </li>
            ))}
          </ul>
        </div>
        <div className=' flex justify-between items-center h-fit mb-2.5 p-3'>
          <input
            className='w-3/4 border border-gray-400 rounded-md h-8 pl-2'
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage((prev: Message) => ({ ...prev, message: e.target.value }))} />
          <button className='bg-blue-600 pl-4 pr-4 pt-2 pb-2 rounded-2xl text-white' onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export const chatRoomLoader = async ({ params }: any) => {
  return params.username;
}

export default ChatRoom