// 'use client';

// import React, { useState } from 'react';
// import { Search, Filter, MapPin } from 'lucide-react';

// interface EventLocationCardProps {
//   imageUrl: string;
//   cityName: string;
//   eventCount: number;
// }

// const EventLocationCard: React.FC<EventLocationCardProps> = ({
//   imageUrl,
//   cityName,
//   eventCount,
// }) => {
//   return (
//     <article className="overflow-hidden grow w-full font-medium bg-white rounded-xl">
//       <div className="flex relative flex-col pt-24 rounded-xl aspect-[0.728] w-full">
//         <img
//           src={imageUrl}
//           alt={`${cityName} events`}
//           className="object-cover absolute inset-0 size-full"
//         />

//         {/* Overlay Container */}
//         <div className="flex relative flex-col justify-end flex-grow w-full">
//           {/* Overlay Image */}
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1d95a04c9ade346d8c867eb7ce9021a2f2b64fe6f9686f86d7f2bb3b8ad89ea?placeholderIfAbsent=true&apiKey=b8a2f158d79945c3b9e2546116c442d3"
//             alt="overlay"
//             className="object-cover absolute inset-y-10 size-full"
//           />

//           {/* Content */}
//           <div className="flex relative flex-col items-start p-3 w-full">
//             <div className="flex gap-1 text-lg text-white whitespace-nowrap">
//               <MapPin className="text-white w-4 h-4" />
//               <h3>{cityName}</h3>
//             </div>
//             <p className="mt-1 text-xs text-white">{eventCount} Events</p>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// };

// interface CategoryCardProps {
//   iconUrl: string;
//   name: string;
//   eventCount: number;
// }

// const CategoryCard: React.FC<CategoryCardProps> = ({
//   iconUrl,
//   name,
//   eventCount,
// }) => {
//   return (
//     <article className="flex grow gap-3 justify-between px-3 py-3 w-full font-medium rounded-xl bg-zinc-900">
//       <div className="text-lg text-white whitespace-nowrap">
//         <img
//           src={iconUrl}
//           // alt={${name} icon}
//           className="object-contain rounded-full aspect-square w-[40px]"
//         />
//         <h3 className="mt-2">{name}</h3>
//       </div>
//       <p className="self-end mt-8 text-xs text-white">{eventCount} Events</p>
//     </article>
//   );
// };

// const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
//   onSearch,
// }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearch = () => {
//     onSearch(searchQuery); // Call the onSearch function with the current search query
//   };

//   return (
//     <div className="flex flex-wrap gap-3 justify-between px-3 py-2 mt-6 w-full text-white whitespace-nowrap rounded-xl bg-white bg-opacity-40">
//       {/* Filter + Search Icon + Text in One Flex Container */}
//       <div className="flex gap-2 items-center">
//         {/* Filter Button */}
//         <button className="flex items-center px-2 py-1 bg-white rounded-lg shadow-md">
//           <Filter className="text-pink-500 w-4 h-4" />
//         </button>

//         {/* Search Icon and Input Field */}
//         <div className="flex items-center gap-1">
//           <Search className="text-white w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={handleInputChange}
//             className="bg-transparent border-none outline-none text-white placeholder-white text-sm"
//           />
//         </div>
//       </div>

//       {/* Search Button */}
//       <button
//         onClick={handleSearch}
//         className="px-5 py-2 text-lg font-medium bg-pink-500 rounded-xl"
//       >
//         Search
//       </button>
//     </div>
//   );
// };

// interface LocationFilterProps {
//   activeFilter: string;
//   onFilterChange: (filter: string) => void;
// }

// const LocationFilter: React.FC<LocationFilterProps> = ({
//   activeFilter,
//   onFilterChange,
// }) => {
//   const filters = ['Asia', 'Africa', 'Europe', 'Americas'];

//   return (
//     <div className="flex flex-wrap gap-2 mt-2 w-full text-lg font-medium text-white whitespace-nowrap">
//       {filters.map((filter) => (
//         <button
//           key={filter}
//           onClick={() => onFilterChange(filter)}
//           className={`px-2 py-1 rounded-lg ${
//             activeFilter === filter ? 'bg-pink-500' : 'bg-white bg-opacity-40'
//           }`}
//         >
//           {filter}
//         </button>
//       ))}
//     </div>
//   );
// };

// const page: React.FC = () => {
//   const [activeFilter, setActiveFilter] = useState('Asia');
//   const [searchQuery, setSearchQuery] = useState('');

//   const locationCards = [
//     {
//       imageUrl: 'https://i.postimg.cc/9Qd34JNz/dubai.png',
//       cityName: 'Dubai',
//       eventCount: 24,
//       region: 'Asia',
//     },
//     {
//       imageUrl: 'https://i.postimg.cc/ydN2bB6S/Bangkok.png',
//       cityName: 'Bangkok',
//       eventCount: 24,
//       region: 'Asia',
//     },
//     {
//       imageUrl: 'https://i.postimg.cc/9Qd34JNz/dubai.png',
//       cityName: 'Dubai',
//       eventCount: 24,
//       region: 'Asia',
//     },
//     {
//       imageUrl: 'https://i.postimg.cc/ydN2bB6S/Bangkok.png',
//       cityName: 'Bangkok',
//       eventCount: 24,
//       region: 'Asia',
//     },
//     {
//       imageUrl: 'https://i.postimg.cc/9Qd34JNz/dubai.png',
//       cityName: 'Cairo',
//       eventCount: 18,
//       region: 'Africa',
//     },
//     {
//       imageUrl: 'https://i.postimg.cc/9Qd34JNz/dubai.png',
//       cityName: 'Paris',
//       eventCount: 30,
//       region: 'Europe',
//     },
//   ];

//   const categories = [
//     {
//       iconUrl: 'https://i.postimg.cc/MZnpcJ0T/Technology.png',
//       name: 'Technology',
//       eventCount: 24,
//     },
//     {
//       iconUrl: 'https://i.postimg.cc/4Nt45vSR/Arts-culture.png',
//       name: 'Arts & Culture',
//       eventCount: 24,
//     },
//     {
//       iconUrl: 'https://i.postimg.cc/sgrj0BkQ/crypto.png',
//       name: 'Crypto',
//       eventCount: 24,
//     },
//     {
//       iconUrl: 'https://i.postimg.cc/NM5BrRHV/fitness.png',
//       name: 'Fitness',
//       eventCount: 24,
//     },
//     {
//       iconUrl: 'https://i.postimg.cc/yYFB91DV/wellness.png',
//       name: 'Welness',
//       eventCount: 24,
//     },
//     {
//       iconUrl: 'https://i.postimg.cc/q7Zd0g5G/climate.png',
//       name: 'Climate',
//       eventCount: 24,
//     },
//   ];

//   const filteredLocationCards = locationCards.filter(
//     (card) =>
//       card.region === activeFilter &&
//       card.cityName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <main className="items-start flex flex-col py-[10%] bg-stone-950 min-h-screen relative">
//       <div
//         className="absolute inset-0 bg-gradient-to-b from-[#6A5ACD] via-[#C54B8C] to-[#B284BE]"
//         style={{
//           height: 'calc(100vh - 300px)',
//           zIndex: 0,
//           background: `
//             linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0.1, 0.2, 0.3, 0.99) 100%),
//             linear-gradient(to right,
//               #6A5ACD 0%,
//               #C54B8C 50%,
//               #B284BE 100%)
//           `,
//           backgroundBlendMode: 'multiply',
//         }}
//       />

//       {/* Content */}
//       <section className="flex flex-col items-start w-full max-w-6xl mx-auto pl-2 relative z-10">
//         <h2 className="text-3xl font-medium text-white mt-8">
//           Discover Amazing Events
//         </h2>

//         <SearchBar onSearch={setSearchQuery} />

//         <h2 className="mt-8 text-xl font-medium text-white">
//           Explore Local Events
//         </h2>

//         {/* Interactive Location Filter */}
//         <LocationFilter
//           activeFilter={activeFilter}
//           onFilterChange={setActiveFilter}
//         />

//         <div className="mt-6 w-full">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {filteredLocationCards.map((card, index) => (
//               <div key={index}>
//                 <EventLocationCard {...card} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <h2 className="mt-12 text-xl font-medium text-white">
//           Browse by category
//         </h2>

//         <div className="mt-6 w-full">
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//             {categories.map((category, index) => (
//               <div key={index}>
//                 <CategoryCard {...category} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default page;
'use client';

import React, { useState } from 'react';

const page: React.FC = () => {
  const categories = [
    {
      iconUrl: 'https://i.postimg.cc/MZnpcJ0T/Technology.png',
      name: 'Technology',
      eventCount: 24,
    },
    {
      iconUrl: 'https://i.postimg.cc/4Nt45vSR/Arts-culture.png',
      name: 'Arts & Culture',
      eventCount: 24,
    },
    {
      iconUrl: 'https://i.postimg.cc/sgrj0BkQ/crypto.png',
      name: 'Crypto',
      eventCount: 24,
    },
    {
      iconUrl: 'https://i.postimg.cc/NM5BrRHV/fitness.png',
      name: 'Fitness',
      eventCount: 24,
    },
    {
      iconUrl: 'https://i.postimg.cc/yYFB91DV/wellness.png',
      name: 'Welness',
      eventCount: 24,
    },
    {
      iconUrl: 'https://i.postimg.cc/q7Zd0g5G/climate.png',
      name: 'Climate',
      eventCount: 24,
    },
  ];

  return (
    <>
      <section className="flex items-start justify-center md:py-[10%] py-[15%] min-h-screen bg-black  bg-gradient-to-b relative">
        <div
          className="absolute inset-0  bg-gradient-to-b top-0 "
          style={{
            height: '40%',
            zIndex: 0,
            background: `
            linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0.1, 0.2, 0.3, 0.99) 100%),
            linear-gradient(to right, 
             #6A5ACD 0%, 
          #C54B8C 50%, 
          #B284BE 100%)
          `,
            backgroundBlendMode: 'multiply',
          }}
        />
        <div className="w-11/12 flex items-start justify-center flex-col z-10">
          <div className="w-full flex items-start justify-center flex-col">
            <h1 className="text-white font-semibold lg:text-[32px] md:text-[30px] text-[28px] ">
              Discover Amazing Events
            </h1>
            <p className="text-white pt-1 font-medium lg:text-[16px] md:text-[14px] text-[12px]">
              Discover exciting events happening around you! Browse by category
              and find concerts, festivals, workshops, sports events, and more.
              Whether you're into music, tech, food, or adventure, there's
              something for everyone.
            </p>
          </div>
          <div className="w-full flex flex-col py-[3%]">
            <h1 className="text-white font-medium lg:text-[24px] md:text-[20px] text-[16px]">
              Browse by Category
            </h1>
            <div className="flex flex-wrap pt-[2%]">
              {categories.map((category, index) => (
                <div key={index} className="md:w-4/12 w-6/12 p-2">
                  <div className="flex flex-col bg-[#1B1B1B] rounded-xl p-2 h-full">
                    <div className="flex items-center justify-start p-4">
                      <img
                        src={category.iconUrl}
                        alt={category.name}
                        className="object-contain w-12 h-12 rounded-full aspect-square"
                      />
                    </div>
                    <div className="flex items-center justify-between px-4 ">
                      <h3 className="text-white font-medium lg:text-[18px] md:text-[16px] text-[14px]">
                        {category.name}
                      </h3>
                      <p className=" text-white font-normal lg:text-[18px] md:text-[16px] text-[14px]">
                        {category.eventCount} Events
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
