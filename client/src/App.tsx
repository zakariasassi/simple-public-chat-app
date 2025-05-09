import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'
const socket = io('http://localhost:5600') // تأكد من أن السيرفر يعمل

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('chat message', (msg) => {
      console.log(msg)
      setMessages((prev) => [...prev, msg])
    })

    return () => socket.off('chat message')
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (message.trim() === '') return
    socket.emit('chat message', message)
    setMessage('')
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl flex flex-col h-[80vh]">
        <div className="bg-blue-600 text-white text-center p-3 rounded-t-xl text-lg font-bold">
          💬 غرفة الدردشة العامة
        </div>
        <div className="flex flex-col h-screen overflow-y-auto p-4 space-y-2 text-right">
          {messages.map((msg, i) => (
            <div key={i} className="bg-gray-200 px-3 py-2 rounded-lg inline-block max-w-[80%] ml-auto">
              {msg}
            </div>
          ))}
        </div>
        <form
          onSubmit={sendMessage}
          className="flex items-center border-t border-gray-300 p-3"
        >
          <input
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none text-right"
            placeholder="اكتب رسالتك هنا..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2"
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
