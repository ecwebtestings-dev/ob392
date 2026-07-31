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

        {/* Toggle Button + Tooltip */}
        <div className="group relative ">
          {!isOpen && (
            <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-background px-3 py-1.5 text-sm text-white opacity-0 shadow-lg transition-all duration-200 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0">
              OB39 Ai
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-background" />
            </div>
          )}

          <button
            onClick={toggleOpen}
            className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-button-bg text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-button-hover hover:shadow-xl"
            aria-label="Toggle OB39 Assistant"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </>
  );
}