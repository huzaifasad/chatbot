'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Send, ImageIcon, Bot, User } from 'lucide-react'

export default function ChatInterface({ connectionString }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showImageResponses, setShowImageResponses] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = { role: 'user', content: inputMessage }
    setMessages([...messages, newMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulating API call
    setTimeout(() => {
      let botResponse
      if (showImageResponses) {
        botResponse = { 
          role: 'assistant', 
          content: 'Here\'s an AI-generated image based on your input:',
          image: `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(inputMessage)}`
        }
      } else {
        botResponse = { 
          role: 'assistant', 
          content: `This is a text response to: "${inputMessage}". I can provide more detailed information if needed.`
        }
      }
      setMessages(prevMessages => [...prevMessages, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newMessage = { role: 'user', content: 'Uploaded an image', image: e.target.result }
        setMessages([...messages, newMessage])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <Card className="flex-grow overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
        <CardContent className="h-full flex flex-col p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary">AI Chat Assistant</h2>
          </div>
          <ScrollArea className="flex-grow mb-4 pr-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex mb-4 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {message.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="mb-2">{message.content}</p>
                      {message.image && (
                        <img src={message.image} alt="Message content" className="max-w-full h-auto rounded" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="flex-grow flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-transparent border-none focus:ring-0"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              {/* <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current.click()}>
                <ImageIcon className="h-5 w-5" />
              </Button> */}
              <div className="flex items-center space-x-2">
                {/* <Switch
                  id="image-mode"
                  checked={showImageResponses}
                  onCheckedChange={setShowImageResponses}
                  className="data-[state=checked]:bg-green-500"
                /> */}
                {/* <Label htmlFor="image-mode" className="text-sm">Image</Label> */}
                <Button type="submit" className="w-full sm:w-auto">
              <Send className="h-5 w-5 mr-2" />
              Send
            </Button>
              </div>
            </div>
          
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

