import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const cards = [
    {
      width: 540,
      height: 500,
      bg: 'bg-[#f6f7f0]',
      hasText: true,
      isTextCard: true,
      title: "JLU's Impact",
      content: "Lorem ipsum dolor sit amet consectetur. Lectus vivamus congue massa tortor non. Pretium lobortis ultrices urna faucibus leo. Adipiscing a eu accumsan ornare. Sodales in tempor pretium nibh vulputate tincidunt aliquam.\n\nLorem ipsum dolor sit amet consectetur. Lectus vivamus congue massa tortor non."
    },
    { width: 540, height: 500, bg: 'bg-[#c3fd7a]', hasText: true, isTextCard: false },
    { width: 770, height: 500, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/2nd.jpg' },
    { width: 540, height: 500, bg: 'bg-[#1D4ED8]', hasText: true, isTextCard: false, textColor: 'text-white' },
    { width: 300, height: 170, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/9th.jpg' },
    { width: 670, height: 500, bg: 'bg-gray-200', hasText: false, isTextCard: false , image: '/6th.jpg' },
    { width: 540, height: 500, bg: 'bg-[#E9D502]', hasText: true, isTextCard: false },
    { width: 1320, height: 500, bg: 'bg-gray-200', hasText: false, isTextCard: false, image: '/8th.jpg' },
  ];

  return (
    <section ref={containerRef} className="relative h-screen bg-[#f6f7f0] overflow-hidden">
      <div className="h-full flex items-center">
        <motion.div
          initial={{ x: 0 }}
          animate={isInView ? { x: -4000 } : { x: 0 }}
          transition={{ duration: 8, ease: "easeInOut" }}
          className="flex gap-6 pl-6"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bg} relative rounded-lg flex-shrink-0 flex items-center justify-center ${card.isTextCard || card.hasText ? 'p-8' : 'p-0'} overflow-hidden`}
              style={{
                width: `${card.width}px`,
                height: `${card.height}px`,
              }}
            >
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.title ?? 'JLU highlight'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
              {card.isTextCard ? (
                <div className={`relative ${card.image ? 'bg-white/85 backdrop-blur-sm rounded-lg p-6' : ''} text-left`}>
                  <h2 className={`text-4xl font-bold ${card.textColor ?? 'text-[#21313c]'} mb-6 drop-shadow-sm`}>{card.title}</h2>
                  <div className={`${card.textColor ?? 'text-[#21313c]'} text-lg leading-relaxed whitespace-pre-line drop-shadow-sm`}>
                    {card.content}
                  </div>
                </div>
              ) : card.hasText ? (
                <div className={`relative ${card.image ? 'bg-white/85 backdrop-blur-sm rounded-lg p-6' : ''} text-center`}>
                  <div className={`text-8xl font-bold ${card.textColor ?? 'text-[#21313c]'} mb-4 drop-shadow-sm`}>600+</div>
                  <p className={`${card.textColor ?? 'text-[#21313c]'} text-lg drop-shadow-sm`}>
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
