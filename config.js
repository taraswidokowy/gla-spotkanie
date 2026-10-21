// Po wdrożeniu Apps Script wklej tu adres z "Wdróż → Aplikacja internetowa" (kończy się na /exec)
const API_URL = 'https://script.google.com/macros/s/AKfycbyuuynhQmIkBAwTEVi0OfmNjS0Bbz61YKIs3PMNl4bcw9qIWRXhDriCMR8IT3zjredZ/exec';
const TOTAL = 5;
const DEADLINE = 'niedzieli 25 października';

// Spotkanie online, 1 godzina. Godzina = początek spotkania.
const HOURS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
// Wyłączone godziny w danym dniu tygodnia (co tydzień)
const OFF = {
  'wt': ['17:00', '18:00', '19:00'],
  'śr': ['16:00', '17:00', '18:00'],
  'czw': ['09:00', '10:00', '11:00', '17:00', '18:00', '19:00'],
  'pt': ['09:00', '10:00', '11:00'],
};
// Wyłączone godziny w konkretnym dniu
const OFF_DATES = {
  '2026-10-27': ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  '2026-11-03': ['12:00', '13:00', '14:00', '15:00', '16:00'],
  '2026-11-05': ['14:00', '15:00'],
};
// Dni robocze między FROM a TO (włącznie), bez dat z SKIP.
const FROM = '2026-10-26';
const TO = '2026-11-06';
const SKIP = [];
