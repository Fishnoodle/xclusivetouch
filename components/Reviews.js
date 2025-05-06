import React from "react";
//import { StarIcon } from "@heroicons/react/24/solid";
import { Star } from "react-feather";

const reviews = [
  {
    content:
      "Having a digital business card is very handy and efficient, good way to spread your business without having to pull out a stack of business cards. HIGHLY RECOMMEND!!",
    rating: 5,
    link: "https://g.co/kgs/5veFFfv",
    author: {
      name: "Aryan Naidu",
      role: "Customer",
      image: "/g.jpg",
    },
  },
  {
    content:
      "I bought a couple of these NFC cards for my business. The best thing about these cards is that you will never run out, and updating is simple as a few clicks. Truly a one-time investment!",
    rating: 5,
    link: "https://g.co/kgs/z9e6rUz",
    author: {
      name: "Roneal Lingam",
      role: "Business Owner",
      image: "/fawaz.jpg",
    },
  },
  {
    content:
      "Great service! Highly recommend it. Owner is super friendly and helpful.",
    rating: 5,
    link: "https://g.co/kgs/Sj9SWqS",
    author: {
      name: "Shirley Brunetta",
      role: "Customer",
      image: "/himanil.jpg",
    },
  },
];

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-label="What our customers are saying"
      className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Loved by <span className="text-[#D4AF37]">professionals</span> worldwide
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            See what our users are saying about their XclusiveTouch experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <a 
              key={i} 
              href={review.link} 
              target="_blank" 
              rel="noreferrer"
              className="block group"
            >
              <div className="h-full bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-[#D4AF37]/30 group-hover:translate-y-[-5px]">
                {/* Quote mark decoration */}
                <div className="absolute top-2 right-2 text-[#D4AF37]/10 text-7xl font-serif">
                  &ldquo;
                </div>
                
                {/* Stars */}
                <div className="flex mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#D4AF37]" />
                  ))}
                </div>
                
                {/* Review content */}
                <blockquote className="relative mb-8">
                  <p className="text-gray-800 font-light leading-relaxed text-lg">
                    {review.content}
                  </p>
                </blockquote>
                
                {/* Author info */}
                <div className="flex items-center mt-auto pt-5 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold">
                    {review.author.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{review.author.name}</p>
                    <p className="text-sm text-gray-500">{review.author.role}</p>
                  </div>
                </div>
                
                {/* Pill badge */}
                <div className="absolute bottom-3 right-3 text-xs text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded-full font-medium">
                  Verified
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-[#D4AF37] font-medium hover:text-[#D4AF37]/80 transition-colors"
          >
            See all reviews
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}