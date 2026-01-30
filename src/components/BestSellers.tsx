'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  color: string;
}

export const BestSellers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      name: 'Pure Refresh',
      category: 'True Radiance',
      price: '$39.99',
      image: '/product1.jpg',
      color: '#FFE5EC',
    },
    {
      id: 2,
      name: 'Radiant Glow',
      category: 'Luminous Glow',
      price: '$36.99',
      image: '/product2.jpg',
      color: '#E5DEFF',
    },
    {
      id: 3,
      name: 'Overnight Sleep',
      category: 'Pure Nourish',
      price: '$35.99',
      image: '/product3.jpg',
      color: '#FFF4E5',
    },
    {
      id: 4,
      name: 'Vitamin C Serum',
      category: 'Bright Boost',
      price: '$42.99',
      image: '/product4.jpg',
      color: '#E5F4FF',
    },
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === products.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? products.length - 1 : prevIndex - 1;
      }
    });
  };

  // Get visible cards (current and next 2)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % products.length;
      cards.push({ ...products[index], offset: i });
    }
    return cards;
  };

  return (
    <section className="bg-[#f6f7f0] py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#21313c] mb-2">
            Our Best Sellers
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl italic text-[#21313c]">
            Products
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            <img
              src="/elysara-hero.jpg"
              alt="Elysara Brilliance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                Elysara
              </h3>
              <p className="text-2xl md:text-3xl italic">Brilliance</p>
            </div>
          </div>

          {/* Right Side - Sliding Cards */}
          <div className="relative h-[500px] lg:h-[600px]">
            {/* Cards Stack */}
            <div className="relative w-full h-full">
              <AnimatePresence initial={false} custom={direction}>
                {getVisibleCards().map((product, index) => (
                  <motion.div
                    key={product.id}
                    custom={direction}
                    variants={index === 0 ? slideVariants : undefined}
                    initial={index === 0 ? 'enter' : undefined}
                    animate={index === 0 ? 'center' : undefined}
                    exit={index === 0 ? 'exit' : undefined}
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    drag={index === 0 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    style={{
                      zIndex: 3 - index,
                      scale: 1 - index * 0.05,
                      y: index * 20,
                      x: index * 30,
                      opacity: 1 - index * 0.3,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-2xl shadow-2xl p-8 flex flex-col justify-between"
                      style={{ backgroundColor: product.color }}
                    >
                      {/* Category Badge */}
                      <div className="inline-block">
                        <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-[#21313c]">
                          {product.category}
                        </span>
                      </div>

                      {/* Product Image */}
                      <div className="flex-1 flex items-center justify-center my-8">
                        <div className="w-48 h-48 md:w-64 md:h-64 relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain drop-shadow-2xl"
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3">
                        <h3 className="text-xl md:text-2xl font-bold text-[#21313c]">
                          {product.category}
                        </h3>
                        <h4 className="text-2xl md:text-3xl font-bold text-[#21313c]">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl md:text-3xl font-bold text-[#21313c]">
                            {product.price}
                          </span>
                          <button className="w-10 h-10 bg-[#21313c] rounded-full flex items-center justify-center hover:bg-[#2a3f4f] transition-colors">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={() => paginate(-1)}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Previous product"
              >
                <svg
                  className="w-6 h-6 text-[#21313c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Next product"
              >
                <svg
                  className="w-6 h-6 text-[#21313c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#21313c] w-8'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Effortless wellness and radiant skin—so you can focus on life, not your routine.
          </p>
        </div>
      </div>
    </section>
  );
};
