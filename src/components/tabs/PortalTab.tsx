import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Send, Sparkles, Compass } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: {
    type: 'NAVIGATE' | 'VIEW_EVENT' | 'VIEW_PERK';
    label: string;
    targetId?: string;
  };
}

export default function PortalTab() {
  const { activeCity, setSelectedLandmark, allLandmarks, setActiveTab } = useAppContext();
  const [input, setInput] = useState('');
  const cityName = activeCity === 'solo' ? 'Solo (Surakarta)' : activeCity === 'bandung' ? 'Bandung' : 'Jakarta';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Selamat datang! I am Mpok Voyage, your Oslo Cityscape intelligence. How can I guide your cultural exploration in ${cityName} today?`,
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = activeCity === 'solo'
    ? [
        'Where can I eat authentic Selat Solo?',
        'Tell me about Keraton Surakarta court history.',
        'How do I visit Lokananta music recording studio?',
        'What are the best batik spots in Laweyan & Kauman?',
      ]
    : activeCity === 'bandung'
    ? [
        'Where is the best Batagor in Bandung?',
        'How do I visit Kawah Putih crater?',
        'Tell me about Saung Angklung Udjo music.',
        'Where can I find legendary Brownies Amanda?',
      ]
    : [
        'Where can I eat authentic Soto Betawi?',
        'What cultural events are happening today?',
        'How do I redeem my F&B perks?',
        'Tell me about Kota Tua heritage bicycles.',
      ];

  const isJakarta = activeCity === 'jakarta';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let action: ChatMessage['action'] = undefined;

      const q = query.toLowerCase();
      if (q.includes('soto') || q.includes('betawi')) {
        reply =
          'Soto Betawi Haji Mamat is our top recommendation. Their beef and offal is slow-cooked in rich coconut and fresh milk broth. You also have an active 15% discount perk available!';
        action = {
          type: 'NAVIGATE',
          label: 'View Soto Betawi Details',
          targetId: '3',
        };
      } else if (q.includes('batagor') || q.includes('kingsley')) {
        reply =
          'Batagor Kingsley on Jl. Veteran is the definitive benchmark for Bandung fried fish dumplings with fragrant peanut-lime sauce. Plus, 20% perk applies today!';
        action = {
          type: 'NAVIGATE',
          label: 'View Batagor Kingsley',
          targetId: 'b18',
        };
      } else if (q.includes('selat') || q.includes('lies')) {
        reply =
          'Selat Solo Mbak Lies in Serengan is the royal benchmark for Javanese beef steak salad — braised tender beef, soy egg, vegetables, and spiced mustard broth. 15% perk active!';
        action = {
          type: 'NAVIGATE',
          label: 'View Selat Solo Mbak Lies',
          targetId: 's17',
        };
      } else if (q.includes('keraton') || q.includes('palace') || q.includes('mangkunegaran')) {
        reply =
          'Surakarta is home to two great palaces: Keraton Kasunanan (founded 1745) and Pura Mangkunegaran (1757, featuring Southeast Asia\'s largest solid teak open pendopo).';
        action = {
          type: 'NAVIGATE',
          label: 'View Keraton Surakarta',
          targetId: 's1',
        };
      } else if (q.includes('lokananta') || q.includes('vinyl') || q.includes('music')) {
        reply =
          'Lokananta is Indonesia\'s legendary first state recording studio and vinyl press, brilliantly revitalized into a modern audio museum, archive, and live amphitheater.';
        action = {
          type: 'NAVIGATE',
          label: 'View Lokananta',
          targetId: 's9',
        };
      } else if (q.includes('event') || q.includes('tour') || q.includes('dance')) {
        reply = activeCity === 'solo'
          ? 'Upcoming highlight: Royal Mangkunegaran Court Dance under the Pendopo Agung, and SIPA international performances at Benteng Vastenburg.'
          : activeCity === 'bandung'
          ? 'Upcoming highlight: Grand Interactive Angklung Orchestra at Saung Angklung Udjo starts daily at 03:30 PM. Each guest receives a tuned bamboo instrument!'
          : 'Upcoming highlight: The Ondel-Ondel Puppet Street Dance takes place at 04:00 PM at Kota Tua Esplanade, followed by the Monas Laser Show at 08:00 PM.';
        action = {
          type: 'VIEW_EVENT',
          label: 'Browse Events Calendar',
        };
      } else if (q.includes('perk') || q.includes('discount') || q.includes('voucher')) {
        reply =
          'You currently hold unlocked perks for dining and museum access in your Vault. Present the verification code at the merchant counter to redeem.';
        action = {
          type: 'VIEW_PERK',
          label: 'Open Perks Tab',
        };
      } else if (q.includes('kawah putih') || q.includes('volcano') || q.includes('crater')) {
        reply =
          'Kawah Putih is a surreal turquoise-white volcanic crater lake at 2,430m in Ciwidey. It is open daily 07:00 AM - 05:00 PM. Bring a warm jacket and face mask for sulfur vapors!';
        action = {
          type: 'NAVIGATE',
          label: 'View Kawah Putih',
          targetId: 'b6',
        };
      } else {
        reply = `Understood. Based on verified heritage archives for ${cityName}, exploring early morning or late afternoon yields the best weather. Feel free to ask about landmarks, walking routes, or regional delicacies!`;
      }

      const assistantMsg: ChatMessage = {
        id: 'ast_' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (!action) return;
    if (action.type === 'NAVIGATE' && action.targetId) {
      const target = allLandmarks.find((item) => item.id === action.targetId);
      if (target) {
        setSelectedLandmark(target);
      }
    } else if (action.type === 'VIEW_EVENT') {
      setActiveTab('events');
    } else if (action.type === 'VIEW_PERK') {
      setActiveTab('perks');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[700px] justify-between pb-18">
      {/* Top Concierge Profile Banner */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs mb-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff9898] to-rose-400 flex items-center justify-center text-white shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-gray-900 font-outfit">Mpok Voyage</h3>
            <span className="px-1.5 py-0.5 rounded-md text-[8.5px] font-bold uppercase bg-emerald-100 text-emerald-700">
              Active AI
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            Heritage Wayfinding & Cultural Concierge · {cityName}
          </p>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-none">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-gray-900 text-white rounded-br-xs'
                  : 'bg-white border border-gray-200/80 text-gray-800 rounded-bl-xs'
              }`}
            >
              <p>{msg.text}</p>

              {msg.action && (
                <button
                  onClick={() => handleActionClick(msg.action)}
                  className="mt-2.5 w-full py-1.5 px-3 rounded-xl bg-gray-50 border border-gray-200/80 text-gray-800 font-outfit font-bold text-[11px] flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#ff9898]" />
                  {msg.action.label}
                </button>
              )}
            </div>
            <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border border-gray-200/60 w-20">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="my-2.5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-white border border-gray-200/80 text-gray-600 hover:border-gray-300 text-[11px] whitespace-nowrap shadow-2xs font-outfit cursor-pointer shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="relative mt-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask Mpok Voyage about ${cityName}...`}
          className="w-full pl-4 pr-12 py-3 rounded-2xl bg-white border border-gray-200/90 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#ff9898] focus:ring-2 focus:ring-[#ff9898]/20 shadow-xs"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
