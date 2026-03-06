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
  FaMicrophone,
  FaStop,
  FaChevronDown
} from "react-icons/fa";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Declare SpeechRecognition type
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
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
        "👋 Hi! I'm Muhammad Ali's AI assistant. Ask me anything about his skills, experience, projects, or education! You can type or use 🎤 voice input.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Voice input states
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupTimeoutRef = useRef<NodeJS.Timeout>();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Detect mobile device and set viewport height
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
      setViewportHeight(window.innerHeight);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard visibility for mobile without zoom
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    // Prevent zoom on input focus
    const preventZoom = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Set font size to 16px to prevent zoom on iOS
        target.style.fontSize = '16px';
      }
    };

    const handleFocus = () => {
      // Small delay to ensure keyboard is shown
      setTimeout(() => {
        if (window.visualViewport) {
          const viewportHeight = window.visualViewport.height;
          const windowHeight = window.innerHeight;
          const keyboardHeight = Math.max(0, windowHeight - viewportHeight);
          setKeyboardHeight(keyboardHeight);
          
          // Scroll the message area to bottom when keyboard opens
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }
      }, 100);
    };

    const handleBlur = () => {
      setKeyboardHeight(0);
    };

    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const keyboardHeight = Math.max(0, windowHeight - viewportHeight);
        setKeyboardHeight(keyboardHeight > 100 ? keyboardHeight : 0);
      }
    };

    // Visual Viewport API for more accurate keyboard detection
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
      inputElement.addEventListener('touchstart', preventZoom, { passive: false });
    }

    // Prevent body scroll and zoom
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Add meta tag to prevent zoom if not exists
    let viewportMeta = document.querySelector('meta[name=viewport]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
        inputElement.removeEventListener('touchstart', preventZoom);
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Restore viewport meta
      const viewportMeta = document.querySelector('meta[name=viewport]');
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    };
  }, [isMobile, isOpen]);

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSpeechSupported(false);
      console.log("Speech recognition not supported");
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    if (recognitionRef.current) {
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (transcript) {
          setInput(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setError("Microphone access denied. Please allow microphone access.");
        } else if (event.error === 'no-speech') {
          setError("No speech detected. Please try again.");
        } else {
          setError("Voice input error. Please try again.");
        }
      };

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          setInput(finalTranscript);
        } else if (interimTranscript) {
          setInput(interimTranscript + '...');
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, [transcript]);

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
    setTranscript("");
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

  // Voice input handlers
  const startListening = () => {
    if (!isSpeechSupported) {
      setError("Voice input is not supported in your browser. Try Chrome or Edge.");
      return;
    }

    try {
      setTranscript("");
      setInput("Listening...");
      recognitionRef.current?.start();
    } catch (error) {
      console.error("Failed to start listening:", error);
      setError("Failed to start voice input. Please try again.");
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
      setIsListening(false);
    } catch (error) {
      console.error("Failed to stop listening:", error);
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
          "👋 Hi! I'm Muhammad Ali's AI assistant. Ask me anything about his skills, experience, projects, or education! You can type or use 🎤 voice input.",
      },
    ]);
    setShowSuggestions(true);
    setError(null);
  };

  return (
    <>
      {/* Floating Button with Notification */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Notification Badge */}
        <AnimatePresence>
          {showNotification && !isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
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
              className="absolute bottom-16 right-0 w-64 sm:w-72 bg-white rounded-2xl shadow-xl p-4 mb-2 border border-purple-100"
            >
              {/* Triangle pointer */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-purple-100"></div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaRobot className="text-white text-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Chat with me! 🎤</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Ask questions using voice or text
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => {
                        setIsOpen(true);
                        setShowPopup(false);
                        setShowNotification(false);
                      }}
                      className="flex-1 text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full hover:shadow-md transition-shadow"
                    >
                      Ask Now
                    </button>
                    <button 
                      onClick={() => setShowPopup(false)}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Later
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Button */}
        <motion.button
          className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />
            )}
            
            <motion.div
              ref={chatContainerRef}
              initial={{ opacity: 0, y: isMobile ? "100%" : 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                height: isMobile ? `calc(100% - ${keyboardHeight}px)` : "auto"
              }}
              exit={{ opacity: 0, y: isMobile ? "100%" : 20 }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
              className={`
                fixed z-50 flex flex-col overflow-hidden bg-white border border-gray-200 shadow-2xl
                ${isMobile 
                  ? `inset-x-0 bottom-0 rounded-t-2xl` 
                  : 'sm:bottom-24 sm:right-6 sm:top-auto sm:left-auto sm:w-96 sm:h-[600px] sm:rounded-2xl'
                }
              `}
              style={isMobile ? { 
                height: `calc(100% - ${keyboardHeight}px)`,
                maxHeight: '100%'
              } : {}}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 sm:p-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                      <FaRobot className="text-base sm:text-xl" />
                    </div>
                    <div className="truncate">
                      <h3 className="font-semibold text-sm sm:text-base truncate">AI Assistant</h3>
                      <p className="text-xs text-purple-100 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                        <span className="truncate">Online • Voice supported</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <button
                      onClick={resetChat}
                      className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors whitespace-nowrap"
                    >
                      Reset
                    </button>
                    
                    {/* Mobile Close Button */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="sm:hidden p-2 rounded-full hover:bg-white/20 transition"
                    >
                      <FaChevronDown size={18} />
                    </button>
                    
                    {/* Desktop Close Button */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="hidden sm:block p-2 rounded-full hover:bg-white/20 transition"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Voice Feature Banner */}
              {!hasInteracted && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-3 sm:px-4 py-2 border-b border-purple-100 flex-shrink-0">
                  <p className="text-xs text-purple-700 flex items-center">
                    <FaMicrophone className="mr-2 text-purple-600 flex-shrink-0" />
                    <span className="truncate">🎤 Try voice input! Click the microphone button.</span>
                  </p>
                </div>
              )}

              {/* Messages Area - This will scroll */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-white text-gray-800 shadow-sm border border-gray-200"
                      }`}
                    >
                      <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{message.content}</p>
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
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Error Message */}
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-full flex items-center">
                      <FaExclamationTriangle className="mr-1 flex-shrink-0" size={12} />
                      <span className="truncate max-w-[200px] sm:max-w-none">{error}</span>
                    </div>
                  </div>
                )}
                
                {/* Suggested Questions */}
                {showSuggestions && messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 sm:mt-4"
                  >
                    <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.slice(0, 4).map((question, index) => (
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

              {/* Input Area - Fixed at bottom */}
              <div className="p-3 sm:p-4 bg-white border-t border-gray-200 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isListening ? "Listening..." : "Ask a question..."}
                      className="w-full px-3 sm:px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-base sm:text-sm"
                      style={{ fontSize: '16px' }} // Force 16px to prevent zoom on iOS
                      disabled={isLoading || isListening}
                    />
                    
                    {/* Voice Input Button */}
                    {isSpeechSupported && (
                      <button
                        onClick={isListening ? stopListening : startListening}
                        disabled={isLoading}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-all ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'text-gray-400 hover:text-purple-600'
                        }`}
                        title={isListening ? "Stop listening" : "Start voice input"}
                      >
                        {isListening ? <FaStop size={14} /> : <FaMicrophone size={14} />}
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !input.trim() || isListening}
                    className={`p-2 rounded-full flex-shrink-0 ${
                      isLoading || !input.trim() || isListening
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-md"
                    } text-white transition-all`}
                  >
                    <FaPaperPlane size={14} />
                  </button>
                </div>
                
                {/* Voice Status Indicator */}
                {isListening && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center mt-2 space-x-2"
                  >
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Listening... speak now</span>
                  </motion.div>
                )}
                
                {/* Quick action buttons - Simplified for mobile */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <button 
                    onClick={() => sendMessage("What are your AI skills?")}
                    className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <FaBrain className="mr-1" size={10} />
                    <span className="hidden sm:inline">AI Skills</span>
                    <span className="sm:hidden">AI</span>
                  </button>
                  <button 
                    onClick={() => sendMessage("Cloud experience?")}
                    className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <FaCloud className="mr-1" size={10} />
                    <span className="hidden sm:inline">Cloud</span>
                    <span className="sm:hidden">Cloud</span>
                  </button>
                  <button 
                    onClick={() => sendMessage("What projects?")}
                    className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <FaCode className="mr-1" size={10} />
                    <span className="hidden sm:inline">Projects</span>
                    <span className="sm:hidden">Projects</span>
                  </button>
                  <button 
                    onClick={() => sendMessage("Contact info?")}
                    className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <FaDatabase className="mr-1" size={10} />
                    <span className="hidden sm:inline">Contact</span>
                    <span className="sm:hidden">Contact</span>
                  </button>
                </div>
                
                {/* Speech Support Warning */}
                {!isSpeechSupported && (
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Voice input not supported in this browser
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}