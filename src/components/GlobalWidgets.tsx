'use client';

import { useState } from 'react';
import { FloatingActionButton } from './FloatingActionButton';
import { EnquiryModal } from './EnquiryModal';
import { WhatsAppButton } from './WhatsAppButton';

export const GlobalWidgets = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <>
      <FloatingActionButton onEnquireClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
      <WhatsAppButton />
    </>
  );
};
