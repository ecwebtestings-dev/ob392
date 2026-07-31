import { useState, useRef, useEffect } from "react";
import { api } from "../Authentication/api"; 

const BASE_URL = import.meta.env.VITE_API_URL;

export function useAIWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Seed with a welcome message so the widget never opens empty
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! How can I assist you today?",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setError(null);
  };


  //CLEARS CHAT
  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat cleared. How can I help you?",
        timestamp: new Date().toISOString(),
      },
    ]);
    setError(null);
  };

  async function handleSendMessage(e) {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const token = api.getToken();

      const response = await fetch(`${BASE_URL}/ai/chat`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedInput,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.response || errData.message || `Server responded with ${response.status}`);
      }

      const data = await response.json();

      // RESPONSE TEXT
      const aiResponseText =
        data.response ??
        data.data?.response ??
        data.data?.message ??
        "I'm sorry, I couldn't process that.";

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponseText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError("Failed to get a response. Please try again.");
      console.error("AI Widget Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isOpen,
    toggleOpen,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    error,
    messagesEndRef,
    handleSendMessage,
    clearChat,
  };
}