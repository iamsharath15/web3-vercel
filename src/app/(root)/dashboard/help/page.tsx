'use client';
import { helpCards } from '@/constants';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen text-white p-8">
      <div className="w-full ">
        <h1 className="lg:text-4xl md:text-2xl text-xl  font-bold mb-[6%] text-center">
          Welcome. How Can We Help?
        </h1>
        <form
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto mb-[8%]"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help docs, tutorials and more..."
            className="w-full py-4 pl-12 pr-32 rounded-full bg-[#101010] border border-gray-600 focus:outline-none focus:border-pink-500 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-full transition-colors"
          >
            Search
          </button>
        </form>
      </div>
      {/* Header */}

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {helpCards.map((card, index) => (
          <div
            key={index}
            className="relative bg-[#101010]/100 rounded-2xl p-8 border border-gray-700 hover:border-pink-500/50 transition-colors overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>

            <div className="flex items-center gap-3 mb-4">
              <card.icon className="text-pink-500" size={24} />
              <h2 className="text-2xl font-semibold">{card.title}</h2>
            </div>
            <p className="text-gray-300 mb-6">{card.description}</p>
            <a
              href={card.link}
              className="text-pink-400 hover:text-pink-300 transition-colors inline-flex items-center gap-2 group-hover:underline"
            >
              Learn More
              <span className="transform transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;
