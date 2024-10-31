import axios from 'axios';
import React, { useState } from "react"
import { motion } from "framer-motion"

export default function App() {
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let destinationUrl = e.target[0].value;
      let response = await axios.post("http://localhost:9999/url", { destinationUrl }, { withCredentials: true });
      if (response.status == 200) {
        let shortenUrl = window.location.href +"u/"+response.data.url.shortenUrl;
        setShortUrl(shortenUrl);
        return;
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="bg-gray-700 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">BlackBerry URL Shortener</h1>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12" y2="18" />
          </svg>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="longUrl" className="text-sm font-medium">
              Enter your long URL
            </label>
            <input
              id="longUrl"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200">
            Shorten URL
          </button>
        </form>
        {shortUrl && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-700 p-6 space-y-4"
          >
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span className="text-sm font-medium">Your shortened URL:</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                value={shortUrl}
                readOnly
                className="flex-grow px-3 py-2 bg-gray-600 border border-gray-500 rounded-md"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors duration-200"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center text-sm text-gray-400"
      >
        Inspired by the classic BlackBerry design. <br />
        Shorten your URLs with style.
      </motion.div>
    </div>
  )
}