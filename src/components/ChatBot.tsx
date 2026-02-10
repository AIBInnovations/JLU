'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatResponse {
  keywords: string[];
  response: string;
}

const chatResponses: ChatResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    response: 'Hello! Welcome to Jagran Lakecity University, Bhopal - NAAC A+ Accredited & QS Diamond Rated University. How can I help you today? Ask me about admissions, courses, fees, placements, or campus life!',
  },
  {
    keywords: ['admission', 'apply', 'enroll', 'registration', 'join'],
    response: 'Admissions for 2025-26 are now open!\n\nRequired Documents:\n• 10th & 12th marksheets\n• Transfer Certificate\n• Migration Certificate\n• ID Proof (Aadhar/PAN)\n• Passport-size photos\n• Entrance exam scores (if applicable)\n\nApply online at jlu.edu.in or visit our campus at Mugaliyachap, Bhopal.',
  },
  {
    keywords: ['course', 'program', 'degree', 'btech', 'mba', 'bba', 'law', 'pharmacy'],
    response: 'JLU offers 85+ programs across 8 faculties:\n\n🎓 Engineering: B.Tech, M.Tech (CSE, ME, CE, ECE)\n💼 Management: BBA, MBA, PGDM\n⚖️ Law: BA LLB, BBA LLB, LLB, LLM\n💊 Pharmacy: B.Pharm, M.Pharm, D.Pharm\n🎨 Design: B.Des, M.Des (Fashion, Interior)\n📰 Journalism: BA, MA (Mass Communication)\n🔬 Science: B.Sc, M.Sc, Ph.D\n\nWhich program interests you?',
  },
  {
    keywords: ['fee', 'fees', 'cost', 'tuition', 'expense', 'price'],
    response: 'JLU Fee Structure (Per Year):\n\n• B.Tech: ₹1,14,000 - ₹1,35,000\n• MBA: ₹1,50,000 - ₹2,00,000\n• BBA: ₹80,000 - ₹1,00,000\n• BA/BBA LLB: ₹90,000 - ₹1,10,000\n• B.Pharm: ₹1,00,000 - ₹1,20,000\n• B.Des: ₹1,20,000 - ₹1,50,000\n\nTotal B.Tech fees: ~₹4.55 Lakhs (4 years)\n\nScholarships up to 100% available!',
  },
  {
    keywords: ['scholarship', 'financial aid', 'discount', 'merit'],
    response: 'JLU Scholarship Programs:\n\n🏆 Academic Excellence - Up to 100% fee waiver for high scorers\n🏅 Elite Athlete Scholarship - 100% for national/state sports achievers\n🎓 Chancellor Freeship - For 15 meritorious students\n👩 Women Empowerment - Special waivers for female students\n🎖️ Defence Ward Concession\n👨‍👩‍👧 Sibling Discount\n⏰ Early Bird Discount\n\nContact: 0755-6611100 for eligibility details.',
  },
  {
    keywords: ['hostel', 'accommodation', 'stay', 'residence', 'living'],
    response: 'JLU Hostel Facilities:\n\n🏠 Separate hostels for boys & girls\n❄️ AC & Non-AC rooms available\n🔒 24/7 security with CCTV\n📶 High-speed Wi-Fi\n🍽️ Hygienic mess with multi-cuisine\n🎮 Recreation rooms\n🏥 Medical facility on campus\n\nHostel Fees: ₹60,000 - ₹1,20,000/year\n\nLocation: Mugaliyachap Campus, Bhopal',
  },
  {
    keywords: ['placement', 'job', 'career', 'recruitment', 'company', 'package'],
    response: 'JLU Placement Highlights 2024:\n\n💰 Highest Package: ₹24 LPA\n📊 Average Package: ₹5 LPA\n📈 Placement Rate: 80%+\n\n🏢 Top Recruiters:\nAmazon, Infosys, TCS, Wipro, Deloitte, Accenture, HDFC Bank, ICICI Bank, Axis Bank, Capgemini, Persistent, JIO, NDTV, Berger, Whirlpool\n\nOur Career Development Cell provides training & placement assistance.',
  },
  {
    keywords: ['campus', 'facility', 'infrastructure', 'library', 'lab'],
    response: 'JLU Campus Features:\n\n📍 232-acre main campus + 40-acre Chandanpura hub\n📚 Pyramid-shaped library (28,000 sq.ft) with 42,000+ books\n🔬 50+ specialized laboratories\n🎭 2000+ capacity auditorium\n🏟️ Sports complex (indoor & outdoor)\n☕ Cafeteria & food court\n🏥 Medical center\n💡 Innovation & Incubation Center\n🎨 Media Center & Design Studios',
  },
  {
    keywords: ['contact', 'phone', 'email', 'address', 'location', 'reach'],
    response: 'Contact JLU Bhopal:\n\n📍 Main Campus: Mugaliyachap, Near Ratibad, Bhopal - 462044\n📍 City Hub: Near Kaliasoth Barrage, Chandanpura, Bhopal – 462007\n\n📞 Phone: 0755-6611100, 6611140\n📱 Mobile: +91-7471110103\n📧 Email: info@jlu.edu.in\n🌐 Website: www.jlu.edu.in\n\n⏰ Office Hours: Mon-Sat, 9 AM - 5 PM',
  },
  {
    keywords: ['ragging', 'anti-ragging', 'complaint', 'harassment'],
    response: 'JLU Anti-Ragging Policy:\n\n🚨 ZERO TOLERANCE for ragging!\n\n📞 National Helpline: 1800-180-5522 (24/7)\n📧 Email: antiragging@jlu.edu.in\n\n✅ Anonymous reporting available\n✅ Confidential handling\n✅ UGC compliant\n✅ Strict action against offenders\n\nReport immediately - Your safety is our priority!',
  },
  {
    keywords: ['event', 'fest', 'cultural', 'technical', 'activity'],
    response: 'JLU Annual Events:\n\n🎭 Foundation Day Celebration (May 1st)\n📰 International Festival of Media (March)\n🎪 Lakecity Fest - Cultural extravaganza\n💻 Technovate - Technical fest\n🏆 Sports Week\n📖 Literary Festival\n🎓 Convocation Ceremony\n\nRecent: 11th Foundation Day (May 2024), 7th Media Festival (March 2024)\n\nFollow @jlubhopal on Instagram!',
  },
  {
    keywords: ['ranking', 'naac', 'accreditation', 'rating', 'recognition'],
    response: 'JLU Rankings & Recognition:\n\n⭐ NAAC A+ Accredited\n💎 QS I-GAUGE Diamond Rating (First in MP!)\n🏆 NIRF Rank: 151-200 (2024)\n📰 India Today Rank: #49 Private University\n🥇 University of the Year - MP Govt (2015-2019)\n\nApprovals: UGC, AICTE, BCI, PCI\nMemberships: CII, AIMA, AIU',
  },
  {
    keywords: ['time', 'timing', 'schedule', 'hours', 'when'],
    response: 'JLU Timings:\n\n🏫 Classes: 9:00 AM - 5:00 PM (Mon-Sat)\n📚 Library: 8:00 AM - 10:00 PM\n🏢 Admin Office: 9:00 AM - 5:00 PM\n🎓 Admission Office: 9 AM - 5 PM (Open Sundays during admission season)\n\nCampus is closed on national holidays.',
  },
  {
    keywords: ['bye', 'goodbye', 'thanks', 'thank you', 'thank'],
    response: 'Thank you for choosing JLU! 🎓\n\nFor more info:\n📞 0755-6611100\n📧 info@jlu.edu.in\n🌐 www.jlu.edu.in\n\nVisit our campus for a tour!\nHave a great day! 😊',
  },
];

const quickQuestions = [
  'Tell me about admissions',
  'What courses are available?',
  'Fee structure',
  'Placement statistics',
  'Campus facilities',
  'Contact information',
];

const findResponse = (input: string): string => {
  const lowercaseInput = input.toLowerCase();

  for (const item of chatResponses) {
    if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
      return item.response;
    }
  }

  return "I'm not sure about that. Could you please rephrase your question? You can ask me about admissions, courses, fees, placements, campus facilities, or contact information. Alternatively, call our helpline at +91-755-2987600 for immediate assistance.";
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm JLU Assistant. How can I help you today? You can type your question or select from the quick options below.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: findResponse(text),
      isBot: true,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-[9000] bg-[#03463B] text-white shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center"
        style={{
          left: isMobile ? '12px' : '24px',
          bottom: isMobile ? '12px' : '24px',
          width: isMobile ? '52px' : '60px',
          height: isMobile ? '52px' : '60px',
          borderRadius: '50%',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Notification badge */}
        {!isOpen && (
          <motion.span
            className="absolute -top-1 -right-1 w-4 h-4 bg-[#c3fd7a] rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-[10px] font-bold text-[#03463B]">1</span>
          </motion.span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-[9001] bg-white shadow-2xl overflow-hidden flex flex-col"
            style={{
              ...(isMobile
                ? {
                    inset: 0,
                    borderRadius: 0,
                  }
                : {
                    left: '24px',
                    bottom: '100px',
                    width: '380px',
                    height: '520px',
                    borderRadius: '20px',
                  }),
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-[#03463B] text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">JLU Assistant</h3>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#c3fd7a] rounded-full animate-pulse" />
                  Online - Ready to help
                </p>
              </div>
              {isMobile && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white text-[#21313c] rounded-tl-sm shadow-sm'
                        : 'bg-[#03463B] text-white rounded-tr-sm'
                    }`}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-[10px] mt-1 ${message.isBot ? 'text-gray-400' : 'text-white/60'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-gray-100 bg-white">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.slice(0, 4).map((question) => (
                    <button
                      key={question}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-[#03463B] hover:text-white text-[#21313c] rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#03463B] text-sm"
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-[#03463B] text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
