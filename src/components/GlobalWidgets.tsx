'use client';

import { useState } from 'react';
import { FloatingActionButton } from './FloatingActionButton';
import { EnquiryModal } from './EnquiryModal';
import { ChatBot } from './ChatBot';
import { WhatsAppButton } from './WhatsAppButton';

export const GlobalWidgets = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      <FloatingActionButton onEnquireClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
      <ChatBot />
      <WhatsAppButton />
    </>
  );
};
