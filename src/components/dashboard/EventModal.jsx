import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Link as LinkIcon, X, Check, Tag } from 'lucide-react';
import { format } from 'date-fns';

export default function EventModal({ isOpen, onClose, selectedDate, selectedEndDate, onAddEvent }) {
  const [mounted, setMounted] = useState(false);
  
  const [title, setTitle] = useState('');
  const [timeStart, setTimeStart] = useState('8:00');
  const [timeEnd, setTimeEnd] = useState('9:00');
  const [endDate, setEndDate] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('cyan'); // cyan, green, purple, orange, blue

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Reset form
      setTitle('');
      setTimeStart('8:00');
      setTimeEnd('9:00');
      setEndDate(selectedEndDate ? format(selectedEndDate, 'yyyy-MM-dd') : selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '');
      setLink('');
      setType('cyan');
    } else {
      setTimeout(() => setMounted(false), 200);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    
    onAddEvent({
      title,
      timeStart,
      timeEnd,
      dateEnd: endDate,
      link,
      type
    });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className={`relative bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-xl shadow-gray-900/10 dark:shadow-black/50 border border-gray-100 dark:border-gray-800 p-6 transition-all duration-200 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition">
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-xl font-semibold mb-2 pr-8 bg-transparent border-none outline-none focus:ring-0 w-full text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600"
            autoFocus
            required
          />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 flex gap-2 items-center">
              <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm font-medium border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                {selectedDate ? format(selectedDate, 'MMM d, yyyy') : ''}
              </div>
              <span className="text-gray-400 font-medium px-1">to</span>
              <input 
                 type="date" 
                 value={endDate}
                 min={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                 onChange={e => setEndDate(e.target.value)}
                 className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-2 text-sm font-medium border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1 flex gap-2">
               <input type="time" value={timeStart} onChange={e => setTimeStart(e.target.value)} className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm font-medium border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-center outline-none focus:border-indigo-300" required />
               <input type="time" value={timeEnd} onChange={e => setTimeEnd(e.target.value)} className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm font-medium border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-center outline-none focus:border-indigo-300" required />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <LinkIcon className="w-5 h-5" />
            </div>
            <input 
              type="url" 
              placeholder="Meeting link (optional)" 
              value={link}
              onChange={e => setLink(e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 outline-none focus:border-indigo-300 placeholder-gray-400 dark:placeholder-gray-500" 
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 flex-1">
              <button type="button" onClick={() => setType('cyan')} className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition flex items-center gap-1 ${type === 'cyan' ? 'bg-cyan-200 text-cyan-800 ring-2 ring-cyan-400' : 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 opacity-70 hover:opacity-100'}`}>Project</button>
              <button type="button" onClick={() => setType('green')} className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition flex items-center gap-1 ${type === 'green' ? 'bg-green-200 text-green-800 ring-2 ring-green-400' : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 opacity-70 hover:opacity-100'}`}>Meeting</button>
              <button type="button" onClick={() => setType('orange')} className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition flex items-center gap-1 ${type === 'orange' ? 'bg-orange-200 text-orange-800 ring-2 ring-orange-400' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 opacity-70 hover:opacity-100'}`}>Education</button>
              <button type="button" onClick={() => setType('purple')} className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition flex items-center gap-1 ${type === 'purple' ? 'bg-purple-200 text-purple-800 ring-2 ring-purple-400' : 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 opacity-70 hover:opacity-100'}`}>Event</button>
              <button type="button" onClick={() => setType('blue')} className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition flex items-center gap-1 ${type === 'blue' ? 'bg-blue-200 text-blue-800 ring-2 ring-blue-400' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 opacity-70 hover:opacity-100'}`}>Review</button>
            </div>
          </div>

          <button type="submit" className="w-full mt-4 bg-gray-900 dark:bg-indigo-600 text-white font-medium py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-indigo-700 transition active:scale-[0.98] shadow-md shadow-gray-900/20 dark:shadow-indigo-900/20">
            Add event
          </button>
        </form>
      </div>
    </div>
  );
}
