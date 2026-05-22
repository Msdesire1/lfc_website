"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageCircle,
  X,
} from "lucide-react";
import Image from "next/image";

export default function Quick() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello 👋 I’m the Living Faith Church assistant. Ask me about church events, services, giving, contact details, and more.",
    },
  ]);

  const quickMessages = [
    "Tell me about this page",
    "How do I get started?",
    "Contact support",
    "Help me understand this",
  ];

  const sendMessage = async (message) => {
    const text = message || input;

    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/quick-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();
      const reply = data?.reply || "I’m sorry, I didn’t understand that. Please ask about our church, programs, or contact details.";

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong while fetching the response. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#EC3237] text-white p-4 rounded-full shadow-xl hover:scale-105 transition"
      >
        <MessageCircle size={24} />
      </button>

      {/* Popup */}
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/5"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed bottom-24 right-6 z-50 w-[95%] sm:w-95 h-100 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
            {/* Header */}
            <div className="bg-white text-[#EC3237]] p-4 flex items-center justify-center">
              <div>
              <div className=" flex flex-col  justify-center items-center">
     <div className="flex justify-center items-center">
    <Image src="/logo.svg" alt="Logo" width={50} height={48} />
     </div>
                <h2 className="font-semibold text-lg">
                  LFC Assistant
                </h2>
                  </div>

                <p className="text-xs text-black">
                  Ask anything instantly
                </p>
              </div>

<div className="absolute top-4 right-4">
  <button onClick={() => setOpen(false)}>
                <X />
              </button>
</div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-[#EC3237] text-white"
                      : "bg-white shadow"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-white shadow p-3 rounded-2xl w-fit text-sm">
                  Typing...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Messages */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto border-t  border-[#181818]/10  bg-white">
              {quickMessages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(item)}
                  className="whitespace-nowrap text-xs px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t  border-[#181818]/10  bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Type message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="flex-1 border border-[#181818]/10 rounded-full px-4 py-3 outline-none text-sm"
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="bg-[#EC3237] text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}