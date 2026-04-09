export default function HeroSection({ currentMonth }) {
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

  // Dynamic image generation based on month index
  const monthIndex = currentMonth.getMonth();
  const images = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop", // Jan
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop", // Feb
    "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=1200&auto=format&fit=crop", // Mar
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop", // Apr
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", // May
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", // Jun
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop", // Jul
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1200&auto=format&fit=crop", // Aug
    "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200&auto=format&fit=crop", // Sep
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=1200&auto=format&fit=crop", // Oct
    "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=1200&auto=format&fit=crop", // Nov
    "https://images.unsplash.com/photo-1517260911058-0fcfd7337c2f?q=80&w=1200&auto=format&fit=crop"  // Dec
  ];

  // Number of spiral rings
  const rings = Array.from({ length: 15 });

  return (
    <div className="relative w-full h-32 sm:h-40 md:h-48 z-10 hidden sm:block">
      {/* Calendar Top Image */}
      <div className="relative w-full h-full overflow-hidden bg-gray-900 group shrink-0">
        <img
          src={images[monthIndex]}
          alt="Calendar Hero"
          loading="eager"
          fetchPriority="high"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-6">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-xl font-serif leading-none">
            {monthName}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-1 font-semibold drop-shadow-md">
            {year}
          </p>
        </div>
      </div>

      {/* Spiral Binder Element */}
      <div className="absolute -bottom-3 left-0 right-0 flex justify-between px-8 md:px-16 pointer-events-none z-20">
        {rings.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Top hole on picture */}
            <div className="w-3 h-3 bg-black/60 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"></div>
            {/* The metal ring */}
            <div className="w-2 h-8 bg-gradient-to-b from-gray-100 via-gray-400 to-gray-500 dark:from-gray-500 dark:via-gray-700 dark:to-gray-800 border border-gray-400/50 rounded-md -mt-2 -mb-2 shadow-lg ring-1 ring-black/10"></div>
            {/* Bottom hole on header */}
            <div className="w-3 h-3 bg-gray-200 dark:bg-gray-800 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
