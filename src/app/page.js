'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Upload, Database, User, Lock, Globe, Hash, Server } from 'lucide-react'
// import Router from 'next/navigation'
import { useRouter } from 'next/navigation'
export default function ConnectionForm({ onSubmit }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    host: '',
    port: '',
    databaseName: '',
    databaseType: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    // alert('this run')
    setLoading(true)  
    e.preventDefault()
    
    try {
      const { username, password, host, port, databaseName, databaseType } = formData
      const connectionString = `${databaseType}://${username}:${password}@${host}:${port}/${databaseName}`
      // onSubmit(connectionString)
      localStorage.setItem('connectionUrl', connectionString);
      router.push('/chatbot')// Redirect on successful submission
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)  // Reset loading state after form submission
    }
    // alert('we are there')
    
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg"
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Database Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    placeholder="Enter username"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-10"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="host">DB Host</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                  <Input
                    id="host"
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    placeholder="Enter host"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                  <Input
                    id="port"
                    name="port"
                    value={formData.port}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    placeholder="Enter port"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="databaseName">Database Name</Label>
                <div className="relative">
                  <Database className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                  <Input
                    id="databaseName"
                    name="databaseName"
                    value={formData.databaseName}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    placeholder="Enter database name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="databaseType">Database Type</Label>
                <Select name="databaseType" onValueChange={(value) => setFormData({ ...formData, databaseType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="mongodb">MongoDB</SelectItem> */}
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="image">Upload Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image').click()}
                    className="w-full"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Choose File
                  </Button>
                </div>
                {image && (
                  <div className="mt-2">
                    <img src={image} alt="Uploaded" className="h-20 w-20 object-cover rounded" />
                  </div>
                )}
              </div> */}
              <Button type="submit" className="w-full">Connect</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

