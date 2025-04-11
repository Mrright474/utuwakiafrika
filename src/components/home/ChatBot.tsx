
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const predefinedResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! I'm Ubuntu, the virtual assistant for Utu Wa Kiafrika Charity Network. How can I help you today?"
  },
  {
    keywords: ['donate', 'donation', 'give', 'money', 'contribute'],
    response: "Thank you for your interest in donating! You can donate through our website by clicking the 'Donate Now' button at the top of the page. We accept mobile money, bank transfers, and PayPal."
  },
  {
    keywords: ['contact', 'reach', 'call', 'phone', 'email'],
    response: "You can contact us at +256744552195 or +256778777976. Our email is utuwakiafrikacharity@gmail.com. For more detailed inquiries, I recommend sending an email."
  },
  {
    keywords: ['program', 'programs', 'initiative', 'projects'],
    response: "We run various programs including education support, healthcare initiatives, clean water projects, and community development. Would you like more information on a specific program?"
  },
  {
    keywords: ['volunteer', 'help', 'join', 'participate'],
    response: "We welcome volunteers! Please send an email to utuwakiafrikacharity@gmail.com with the subject 'Volunteer Inquiry' and we'll get back to you with opportunities."
  },
  {
    keywords: ['location', 'where', 'address', 'office'],
    response: "We are located in Uganda. For our specific office address, please email us at utuwakiafrikacharity@gmail.com."
  }
];

const fallbackResponses = [
  "I'm not sure I understand. Could you please rephrase your question?",
  "For more detailed information, please email us at utuwakiafrikacharity@gmail.com.",
  "I don't have that information right now. Would you like to contact our team directly?",
  "That's a good question! For a more detailed response, please reach out to our team at utuwakiafrikacharity@gmail.com."
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Ubuntu, the virtual assistant for Utu Wa Kiafrika Charity Network. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string) => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Check predefined responses
    for (const item of predefinedResponses) {
      if (item.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        return item.response;
      }
    }
    
    // If no match, return a random fallback
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate bot typing
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button 
        className="fixed bottom-6 right-6 bg-utu-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
        onClick={handleToggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-80 sm:w-96 h-96 flex flex-col rounded-lg shadow-xl bg-white z-50 overflow-hidden">
          {/* Chat header */}
          <div className="bg-utu-red text-white p-3 flex items-center">
            <Avatar className="h-8 w-8 mr-2 bg-white text-utu-red flex items-center justify-center">
              <span className="font-bold">U</span>
            </Avatar>
            <div>
              <h3 className="font-bold">Ubuntu</h3>
              <p className="text-xs">Utu Wa Kiafrika Assistant</p>
            </div>
            <button 
              className="ml-auto text-white hover:text-gray-200"
              onClick={handleToggleChat}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 mr-2 bg-utu-red text-white flex items-center justify-center self-end">
                    <span className="font-bold">U</span>
                  </Avatar>
                )}
                <div 
                  className={`px-4 py-2 rounded-lg max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-utu-red text-white rounded-tr-none' 
                      : 'bg-gray-100 text-utu-black rounded-tl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 ml-2 bg-gray-500 text-white flex items-center justify-center self-end">
                    <span className="font-bold">U</span>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t">
            <div className="flex items-center">
              <Input 
                type="text" 
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 mr-2"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-utu-red hover:bg-red-700"
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
