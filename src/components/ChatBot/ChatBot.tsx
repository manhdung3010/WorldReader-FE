"use client";

import React, { useState, useRef, useEffect } from "react";
import { askChatBot } from "@/services/ai.service";
import { ChatBotIcon } from "@/shared/Icons/ChatBotIcon";
import { SendMessageIcon } from "@/shared/Icons/ChatBotIcon copy";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Suggested questions to help users get started
const suggestedQuestions = [
  "What products do you recommend for beginners?",
  "How do I track my order status?",
  "What payment methods do you accept?",
  "How long does shipping usually take?"
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageToSend = inputMessage) => {
    if (!messageToSend.trim()) return;

    const userMessage = messageToSend;
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await askChatBot({
        question: userMessage,
        history: messages,
      });

      if (response.data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.data.answer },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, an error occurred. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    // Send the suggested question immediately
    handleSendMessage(question);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#E6ECF5] hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Toggle chat"
      >
        <ChatBotIcon className="w-6 h-6 text-black" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white dark:bg-neutral-800 rounded-lg shadow-xl flex flex-col transform transition-all duration-300 ease-in-out animate-slide-up">
          {/* Chat Header */}
          <div className="p-4 border-b dark:border-neutral-700 flex justify-between items-center bg-primary/5 dark:bg-neutral-700/50">
            <div>
              <h3 className="text-lg font-semibold text-primary dark:text-primary/90">
                Shopping Assistant
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                WorldReader Assistant
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <ChatBotIcon className="w-16 h-16 mb-4 text-primary" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {`Hello! I'm WorldReader's virtual assistant. How can I help you today?`}
                </p>
                
                {/* Suggested Questions */}
                <div className="w-full space-y-2 mt-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    You can ask me about:
                  </p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left p-2 bg-gray-100 dark:bg-neutral-700 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-600 text-sm transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-[#E6ECF5] text-black"
                      : "bg-gray-100 dark:bg-neutral-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-100 dark:bg-neutral-700 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <div className="flex space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 p-3 border dark:border-neutral-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-700 min-h-[44px] max-h-32"
                rows={1}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <SendMessageIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;