import React, { useState, useEffect } from "react";
import socket from "../utils/socket";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const GlobalChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [senderUsername, setSenderUsername] = useState(null); // Added state for sender username
  const [receiverId, setReceiverId] = useState(null);
  const [receiverName, setReceiverName] = useState(null); // Added state for receiver name
  const [receiverAvatar, setReceiverAvatar] = useState(null); // Added state for receiver avatar
  const [isConnected, setIsConnected] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      setCurrentUserId(user.id);
      setSenderUsername(user.username); // Added set sender username
    }
  }, []);

  useEffect(() => {
    if (currentUserId && isOpen) {
      socket.emit("addUser", currentUserId);
      setIsConnected(true);

      socket.on("msg-receive", (data) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        socket.off("msg-receive");
        setIsConnected(false);
      };
    }
  }, [currentUserId, isOpen]);

  const sendMessage = () => {
    if (text.trim() === "" || !receiverId) return;

    const message = {
      senderUsername,
      senderId: currentUserId,
      receiverId,
      text,
    };

    socket.emit("send-msg", message);
    setMessages((prev) => [...prev, message]);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 2000); // Show animation for 2 seconds
    }
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
    setMessages([]);
    setReceiverId(null);
    setReceiverName(null); // Added reset receiver name
    setReceiverAvatar(null); // Added reset receiver avatar
    setShowAnimation(false);
  };

  // Function to start a chat with a specific user (can be called from other components)
  const startChat = (targetUserId, receiverName, receiverAvatar) => {
    setShowAnimation(true);
    setReceiverId(targetUserId);
    setReceiverName(receiverName);
    setReceiverAvatar(receiverAvatar); // Added set receiver avatar
    setIsOpen(true);

    // Hide animation after 2 seconds
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  // Expose startChat function globally
  useEffect(() => {
    window.startGlobalChat = startChat;
    return () => {
      delete window.startGlobalChat;
    };
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={toggleChat}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </Button>
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {receiverName && (
                <div className="flex items-center gap-2">
                  <img
                    src={receiverAvatar}
                    alt={receiverName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{receiverName}</h3>
                    <p className="text-xs text-gray-200">Freelancer</p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={closeChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {showAnimation ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-32 h-32 mb-4">
                  <DotLottieReact
                    src="https://lottie.host/7b7c55f3-1ee2-4c0d-8b07-a16fb90b2cfd/Thaqq6vlCh.lottie"
                    loop
                    autoplay
                  />
                </div>
                <p className="text-green-600 text-sm font-medium">
                  Starting chat...
                </p>
              </div>
            ) : !receiverId ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">
                  Click "Chat" on any gig to start a conversation with the
                  freelancer
                </p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-gray-500 text-sm">
                  No messages yet. Start the conversation!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.senderId === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.senderId === currentUserId
                          ? "bg-green-500 text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            {receiverId ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!text.trim()}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </Button>
              </div>
            ) : (
              <p className="text-gray-400 text-xs text-center">
                Select a freelancer to start chatting
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalChatWidget;
