import React from 'react';
import { motion } from 'motion/react';

const reviewsData = [
  {
    id: 1,
    name: "TheVestor",
    serverName: "THEVESTOR",
    project: "Trading Discord Server",
    rating: 5,
    review: "I am literally out of words to express my gratitude to this gem of a person for the level of work he has done to create our discord. Absolutely an amazing person, listens to everything with patience and answers in proper detail until you're satisfied. He went way over the top to deliver the project and is highly professional with his clients.",
    date: "2024-03-15"
  },
  {
    id: 2,
    name: "Allygiles",
    serverName: "MOON HEAVEN",
    project: "Community Discord Server",
    rating: 5,
    review: "The seller was fast, very nice and was able to get my server made in UNDER 24 hours! I'm very thankful because I just have not had time to make this server and he did it for me in record time! 10 out of 10! I'm very happy!",
    date: "2024-03-10"
  },
  {
    id: 3,
    name: "Aaronbowen",
    serverName: "GAMERS UNITE",
    project: "Gaming / Streaming Server",
    rating: 5,
    review: "100% go with this guy! Very professional in communication and skills, done a lot more than asked and would 100% recommend to anyone",
    date: "2024-03-08"
  },
  {
    id: 5,
    name: "Mvnu",
    serverName: "HIGHLIFE",
    project: "Community Discord Server",
    rating: 5,
    review: "The best one! Very friendly, helpful and good communication. Thanks for the fast delivery!",
    date: "2024-03-02"
  },
  {
    id: 6,
    name: "chengyedong",
    serverName: "SAMO PETS",
    project: "NFT Discord Server",
    rating: 5,
    review: "Excellent! The after-sales support is fantastic, unlike some other sellers who just forget about you after the order is complete. The after-sales service is handled extremely well. Any questions are answered immediately, which I believe is the most crucial aspect. As someone with no prior experience in community building, it has been tremendously helpful.",
    date: "2024-02-28"
  },
  {
    id: 10,
    name: "Thebear",
    serverName: "THEBEAR",
    project: "Gaming Discord Server",
    rating: 5,
    review: "I couldn't recommend this service enough! Delivered ASAP, explained everything, even helped on additional! I'll definitely be using this service again in the future!! -GG",
    date: "2024-02-18"
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-headline font-black mb-16 uppercase tracking-tighter"
      >
        What Clients Say
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsData.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl bg-surface-container border border-outline-variant/20 hover:border-primary/50 transition-colors duration-300 flex flex-col h-full shadow-lg"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-on-surface-variant flex-grow mb-6 italic">"{review.review}"</p>
            <div className="mt-auto">
              <h4 className="font-bold text-on-surface font-headline">{review.name}</h4>
              <p className="text-sm text-primary uppercase font-bold tracking-wider">{review.serverName}</p>
              <p className="text-xs text-on-surface-variant opacity-70 mt-1">{review.project}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
