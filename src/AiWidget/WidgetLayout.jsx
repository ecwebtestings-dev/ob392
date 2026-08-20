import { Sparkles, X, Send, Trash2, Bot, User, AlertCircle } from "lucide-react";
import { useAIWidget } from "./Widget";

// Lightweight markdown renderer — handles **bold** only.
// Swap for react-markdown if you need links/lists/code blocks later.
function renderMessageContent(content) {
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function AiWidget() {
  const {
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
  } = useAIWidget();

  return (
    <>
      {/* Dark overlay — covers the page while the widget is open */}
      {isOpen && (
        <div
          onClick={toggleOpen}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-18 right-5 z-50 flex flex-col items-end">
        {/* Chat Window */}
        {isOpen && (
          <div className="mb-4 flex h-[450px] w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:w-[420px]">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-badge-bg px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-badges">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-heading">
                    OB39 Assistant
                  </h3>
                  <p className="text-xs text-text-color">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="rounded-lg p-1.5 text-text-color transition-colors hover:bg-badges/10 hover:text-badges"
                  title="Clear chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleOpen}
                  className="rounded-lg p-1.5 text-text-color transition-colors hover:bg-badges/10 hover:text-badges"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-gray-300">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[85%] gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                        msg.role === "user" ? "bg-background" : "bg-badge-bg"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-icons" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-tr-sm bg-background text-white"
                          : "rounded-tl-sm bg-card-background text-heading"
                      }`}
                    >
                      {renderMessageContent(msg.content)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="flex max-w-[85%] gap-2">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-badge-bg">
                      <Bot className="h-4 w-4 text-icons" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-card-background px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-badges [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-badges [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-badges" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-3">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-heading placeholder:text-gray-400 focus:border-badges focus:outline-none focus:ring-1 focus:ring-badges disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-button-bg text-white transition-colors hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        )}

              {/* Toggle Button + Tooltip + WhatsApp bubble */}
        <div className="group relative flex items-center gap-3">
          {/* WhatsApp bubble — slides in from the right on hover */}
          
            <a href="https://wa.me/256783380569"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Chat on WhatsApp"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg opacity-0 translate-x-3 scale-75 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:pointer-events-auto hover:scale-110"
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
            </svg>
          </a>

          {/* "OB39 Ai" label  */}
          {!isOpen && (
            <div className="pointer-events-none absolute bottom-full right-0 mb-2 -translate-y-2 whitespace-nowrap rounded-lg bg-background px-3 py-1.5 text-sm text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              OB39 Ai
              <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-background" />
            </div>
          )}

          {/* Main AI toggle button */}
          <button
            onClick={toggleOpen}
            className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-full bg-button-bg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-button-hover hover:shadow-xl"
            aria-label="Toggle OB39 Assistant"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </>
  );
}