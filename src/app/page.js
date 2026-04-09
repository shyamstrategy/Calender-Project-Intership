"use client";

import { useState, useEffect } from "react";
import { addMonths, subMonths, isSameDay } from "date-fns";

import Sidebar from "@/components/dashboard/Sidebar";
import CalendarHeader from "@/components/dashboard/CalendarHeader";
import CalendarGrid from "@/components/dashboard/CalendarGrid";
import EventModal from "@/components/dashboard/EventModal";
import HeroSection from "@/components/HeroSection";
import { monthThemeColors, getHolidays } from "@/utils/calendarData";

const initialEvents = [
  {
    id: 1,
    title: "Project Meeting",
    timeStart: "09:00",
    timeEnd: "10:00",
    type: "purple",
    dateFull: new Date(2026, 3, 9)
  },
  {
    id: 2,
    title: "Attend Online Class",
    timeStart: "04:00",
    timeEnd: "05:00",
    type: "cyan",
    dateFull: new Date(2026, 3, 10)
  }
];

export default function Dashboard() {

  const [currentDate, setCurrentDate] = useState(new Date());

  // Hydration safe states
  const [events, setEvents] = useState(initialEvents);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Active event that triggers a notification
  const [activeAlarmEvent, setActiveAlarmEvent] = useState(null);

  /**
   * Application Initialization:
   */
  useEffect(() => {
    setMounted(true);

    // Load theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Load events
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  /**
   * Event Persistence:
   * Whenever 'events' state changes, sync the new state to local storage.
   */
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  /**
   * Browser Notifications:
   * Request user permission to send event reminder notifications.
   */
  useEffect(() => {

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

  }, []);

  /**
   * Event Monitoring Daemon:
   * Checks every minute if any scheduled event is starting within the next 10 minutes.
   * Dispatches system notifications to alert the user.
   */
  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date();

      events.forEach((evt) => {

        if (isSameDay(new Date(evt.dateFull), now)) {

          const [hour, minute] = evt.timeStart.split(":").map(Number);

          const eventTime = new Date(now);
          eventTime.setHours(hour, minute, 0, 0);

          const diff = (eventTime - now) / 60000;

          if (diff <= 10 && diff >= 0) {

            if ("Notification" in window && Notification.permission === "granted") {

              new Notification(`Upcoming Event: ${evt.title}`, {
                body: `Your event "${evt.title}" starts soon.`
              });

            }

            setActiveAlarmEvent(evt);

          }

        }

      });

    }, 60000);

    return () => clearInterval(interval);

  }, [events]);

  /**
   * Theme toggler logic for shifting between Light and Dark aesthetics
   */
  const toggleDarkMode = () => {

    const newTheme = !isDarkMode;

    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

  };

  // Calendar Navigation Handlers
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  /**
   * Event Range & Modal logic
   */
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  const handleCellClick = (date) => {
    // If starting a fresh selection
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      // Complete the selection, but ensure start is before end
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    }
  };

  const handleAddClick = (date) => {
    // Fallback if no range is active
    if (!rangeStart) {
      setSelectedDate(date);
    } else {
      // if clicking + inside an existing range, we already have rangeStart
      setSelectedDate(rangeStart);
    }
    setIsModalOpen(true);
  };

  const handleAddEvent = (data) => {
    const newEvent = {
      ...data,
      id: Date.now(),
      dateFull: selectedDate,
      dateEndFull: data.dateEnd ? new Date(data.dateEnd) : selectedDate
    };

    setEvents([...events, newEvent]);
    setIsModalOpen(false);

    // Clear selection range after adding an event successfully
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleEventClick = (evt) => {
    // Jump the calendar view to the month/year of the clicked event
    setCurrentDate(new Date(evt.dateFull));
  };

  const handleRsvpResponse = (response, evt) => {
    if (response === 'yes') {
      alert(`Awesome! You have accepted the invitation for "${evt.title}".`);
    } else {
      alert(`You declined the invitation for "${evt.title}".`);
    }

    // Update the event with the RSVP decision
    setEvents(events.map(e => e.id === evt.id ? { ...e, rsvp: response } : e));
  };

  const currentYear = currentDate.getFullYear();
  const dynamicHolidays = getHolidays(currentYear);
  const combinedEvents = [...events, ...dynamicHolidays];

  const currentMonthIndex = currentDate.getMonth();
  const themeAccentColor = monthThemeColors[currentMonthIndex] || '#4f46e5';

  return (
    <div
      className={`flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ '--theme-accent': themeAccentColor }}
    >

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 z-50 transition-transform`}>

        <Sidebar
          events={combinedEvents}
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          activeAlarmEvent={activeAlarmEvent}
          onEventClick={handleEventClick}
          onRsvpResponse={handleRsvpResponse}
        />

      </div>

      <main className="flex-1 flex flex-col p-2 sm:p-4 w-full h-full">

        <div className="flex-1 bg-white dark:bg-gray-950 rounded-2xl shadow-sm border flex flex-col overflow-hidden relative">

          <HeroSection currentMonth={currentDate} />

          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          <div className="flex-1 overflow-auto">

            <div className="min-w-full lg:min-w-[700px] h-full flex flex-col">
              <CalendarGrid
                currentDate={currentDate}
                events={combinedEvents}
                onCellClick={handleCellClick}
                onAddClick={handleAddClick}
                onDeleteEvent={handleDeleteEvent}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
              />
            </div>

          </div>

        </div>

      </main>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        selectedEndDate={rangeEnd}
        onAddEvent={handleAddEvent}
      />

    </div>

  );

}