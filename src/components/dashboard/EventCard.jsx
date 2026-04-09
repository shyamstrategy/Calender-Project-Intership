import React from 'react';
import { Trash2 } from 'lucide-react';

const colorStyles = {
  blue: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  green: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  purple: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  orange: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
  cyan: "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800",
  holiday: "bg-gradient-to-r from-pink-100 to-orange-100 text-rose-800 border-rose-200 dark:from-rose-900/40 dark:to-orange-900/40 dark:text-rose-300 dark:border-rose-800",
};

export default function EventCard({ title, time, type = "blue", avatars = [], emoji, onDelete }) {
  return (
    <div className={`group cursor-pointer rounded md:rounded-xl p-1 md:p-2.5 mb-1 md:mb-2 border hover:shadow-md transition-all duration-200 ${colorStyles[type] || colorStyles.blue} flex flex-col gap-0.5 md:gap-1 relative overflow-hidden`}>

      <div className="flex justify-between items-start">
        <div className="text-[8px] md:text-[10px] font-medium opacity-80">{time}</div>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 md:p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
            title="Delete Event"
          >
            <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
          </button>
        )}
      </div>

      <div className="text-[9px] md:text-xs font-semibold leading-tight line-clamp-1 md:line-clamp-2">
        {emoji ? <span className="mr-0.5 md:mr-1">{emoji}</span> : null}
        {title}
      </div>

      {avatars.length > 0 && (
        <div className="flex -space-x-2 mt-2">
          {avatars.slice(0, 3).map((avatar, idx) => (
            <img
              key={idx}
              src={avatar}
              alt="Participant"
              className="w-5 h-5 rounded-full border border-white/50 dark:border-black/50"
            />
          ))}

          {avatars.length > 3 && (
            <div className="w-5 h-5 rounded-full bg-white/40 dark:bg-black/40 text-[8px] font-bold flex items-center justify-center border border-white/50 dark:border-black/50">
              +{avatars.length - 3}
            </div>
          )}
        </div>
      )}

    </div>
  );
}