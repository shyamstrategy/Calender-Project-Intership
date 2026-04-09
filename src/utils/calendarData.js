export const monthThemeColors = [
  "#3b82f6", // Jan 0  (Blue / Snow)
  "#ec4899", // Feb 1  (Pink / Valentine)
  "#10b981", // Mar 2  (Emerald / Spring)
  "#14b8a6", // Apr 3  (Teal / Showers)
  "#16a34a", // May 4  (Green / Nature)
  "#eab308", // Jun 5  (Yellow / Summer)
  "#f97316", // Jul 6  (Orange / Heat)
  "#ef4444", // Aug 7  (Red / Late Summer)
  "#d97706", // Sep 8  (Amber / Early Fall)
  "#ea580c", // Oct 9  (Dark Orange / Halloween)
  "#57534e", // Nov 10 (Stone / Late Autumn)
  "#0891b2"  // Dec 11 (Cyan / Winter)
];

export const getHolidays = (year) => [
  { id: `h1-${year}`, title: "New Year's Day", dateFull: new Date(year, 0, 1), type: "holiday", emoji: "🎆" },
  { id: `h2-${year}`, title: "Republic Day", dateFull: new Date(year, 0, 26), type: "holiday", emoji: "🇮🇳" },
  { id: `h3-${year}`, title: "Valentine's Day", dateFull: new Date(year, 1, 14), type: "holiday", emoji: "💖" },
  { id: `h4-${year}`, title: "Maha Shivaratri", dateFull: new Date(year, 2, 8), type: "holiday", emoji: "🔱" },
  { id: `h5-${year}`, title: "Holi", dateFull: new Date(year, 2, 25), type: "holiday", emoji: "🎨" },
  { id: `h6-${year}`, title: "Earth Day", dateFull: new Date(year, 3, 22), type: "holiday", emoji: "🌍" },
  { id: `h7-${year}`, title: "May Day", dateFull: new Date(year, 4, 1), type: "holiday", emoji: "🌸" },
  { id: `h8-${year}`, title: "Independence Day", dateFull: new Date(year, 7, 15), type: "holiday", emoji: "🇮🇳" },
  { id: `h9-${year}`, title: "Raksha Bandhan", dateFull: new Date(year, 7, 19), type: "holiday", emoji: "🎀" },
  { id: `h10-${year}`, title: "Gandhi Jayanti", dateFull: new Date(year, 9, 2), type: "holiday", emoji: "🕊️" },
  { id: `h11-${year}`, title: "Diwali", dateFull: new Date(year, 10, 1), type: "holiday", emoji: "🪔" },
  { id: `h12-${year}`, title: "Christmas Day", dateFull: new Date(year, 11, 25), type: "holiday", emoji: "🎄" },
  { id: `h13-${year}`, title: "New Year's Eve", dateFull: new Date(year, 11, 31), type: "holiday", emoji: "🥂" },
];
