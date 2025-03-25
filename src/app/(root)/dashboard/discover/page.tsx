import React from 'react'

const page = () => {
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
      <section className="flex items-start justify-center md:py-[3%] py-[5%] ">
    
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
}

export default page