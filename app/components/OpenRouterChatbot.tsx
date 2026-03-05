// app/components/OpenRouterChatbot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaRobot,
  FaCode,
  FaBrain,
  FaCloud,
  FaDatabase,
  FaExclamationTriangle,
  FaBell,
  FaCommentDots
} from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What are your main skills?",
  "Tell me about your experience",
  "Where did you study?",
  "What projects have you worked on?",
  "Are you open to work?",
  "How can I contact you?"
];

export default function OpenRouterChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Muhammad Ali's AI assistant. Ask me anything about his skills, experience, projects, or education!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupTimeoutRef = useRef<NodeJS.Timeout>();

  // Show popup after 3 seconds
  useEffect(() => {
    if (!isOpen && !hasInteracted) {
      popupTimeoutRef.current = setTimeout(() => {
        setShowPopup(true);
        // Auto hide popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }, 3000);
    }

    return () => {
      if (popupTimeoutRef.current) {
        clearTimeout(popupTimeoutRef.current);
      }
    };
  }, [isOpen, hasInteracted]);

  // Hide notification when chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowNotification(false);
      setShowPopup(false);
      setHasInteracted(true);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (messageText?: string) => {
    const messageToSend = messageText || input;
    if (!messageToSend.trim() || isLoading) return;

    setError(null);
    setShowSuggestions(false);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: messageToSend }]);
    setIsLoading(true);
    setHasInteracted(true);

    try {
      const response = await fetch("/api/openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to get response. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later or email Muhammad directly at muhammadaliacc@gmail.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hi! I'm Muhammad Ali's AI assistant. Ask me anything about his skills, experience, projects, or education!",
      },
    ]);
    setShowSuggestions(true);
    setError(null);
  };

  return (
    <>
      {/* Floating Button with Notification */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Notification Badge */}
        <AnimatePresence>
          {showNotification && !isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
            >
              1
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup Message */}
        <AnimatePresence>
          {showPopup && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-16 right-0 w-64 bg-white rounded-2xl shadow-xl p-4 mb-2 border border-purple-100"
            >
              {/* Triangle pointer */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-purple-100"></div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Ask me anything! 👋</p>
                  <p className="text-xs text-gray-500 mt-1">
                    I can tell you about Muhammad's skills, experience, and projects
                  </p>
                  <button 
                    onClick={() => {
                      setIsOpen(true);
                      setShowPopup(false);
                      setShowNotification(false);
                    }}
                    className="mt-2 text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full hover:shadow-md transition-shadow w-full"
                  >
                    Ask Now
                  </button>
                </div>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Button */}
        <motion.button
          className="relative w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <FaRobot className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Muhammad Ali's AI Assistant</h3>
                    <p className="text-xs text-purple-100">Online • Ready to help</p>
                  </div>
                </div>
                <button 
                  onClick={resetChat}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors"
                  title="Start new conversation"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Welcome Banner */}
            {messages.length === 1 && !hasInteracted && (
              <div className="bg-purple-50 px-4 py-2 border-b border-purple-100">
                <p className="text-xs text-purple-700 flex items-center">
                  <FaCommentDots className="mr-2" />
                  👋 Feel free to ask me anything about Muhammad's work!
                </p>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : "bg-white text-gray-800 shadow-sm border border-gray-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Error Message */}
              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-full flex items-center">
                    <FaExclamationTriangle className="mr-1" size={12} />
                    {error}
                  </div>
                </div>
              )}
              
              {/* Suggested Questions */}
              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(question)}
                        className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 hover:border-purple-500 hover:text-purple-600 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about skills, experience..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                  className={`p-2 rounded-full ${
                    isLoading || !input.trim()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-md"
                  } text-white transition-all`}
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
              
              {/* Quick action buttons */}
              <div className="flex justify-center space-x-4 mt-3">
                <button 
                  onClick={() => sendMessage("What are your AI/ML skills?")}
                  className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                >
                  <FaBrain className="mr-1" size={10} />
                  AI Skills
                </button>
                <button 
                  onClick={() => sendMessage("Tell me about your cloud experience")}
                  className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                >
                  <FaCloud className="mr-1" size={10} />
                  Cloud
                </button>
                <button 
                  onClick={() => sendMessage("What projects have you built?")}
                  className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                >
                  <FaCode className="mr-1" size={10} />
                  Projects
                </button>
                <button 
                  onClick={() => sendMessage("How can I contact you?")}
                  className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                >
                  <FaDatabase className="mr-1" size={10} />
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}