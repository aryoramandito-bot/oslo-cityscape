import { EventItem } from '../types';

export const mockEvents: EventItem[] = [
  // Jakarta Events
  { 
    id: 'e1', 
    title: 'Monas Sunrise Heritage Walk', 
    time: '06:00 AM - 08:30 AM', 
    location: 'Monas Observation Deck', 
    category: 'Culture',
    description: 'Breathtaking 360-degree sunrise view over Jakarta skyline with guided architectural narration.',
    cityId: 'jakarta'
  },
  { 
    id: 'e2', 
    title: 'Kota Tua Walking Tour & Sepeda Onthel', 
    time: '10:00 AM - 12:00 PM', 
    location: 'Fatahillah Square, Old Batavia', 
    category: 'Heritage',
    description: 'Explore Dutch colonial history, visit Fatahillah Museum, and ride classic colorful vintage bicycles.',
    cityId: 'jakarta'
  },
  { 
    id: 'e3', 
    title: 'Soto Betawi Masterclass with Chef Mamat', 
    time: '01:00 PM - 02:30 PM', 
    location: 'Menteng Culinary Pavilion', 
    category: 'Culinary',
    description: 'Learn the secret spiced coconut broth techniques behind authentic Betawi heritage cooking.',
    cityId: 'jakarta'
  },
  { 
    id: 'e4', 
    title: 'Ondel-Ondel Street Puppet Procession', 
    time: '04:00 PM - 05:30 PM', 
    location: 'Kota Tua Esplanade', 
    category: 'Art & Dance',
    description: 'Traditional Betawi giant puppet performance accompanied by lively Tanjidor brass music.',
    cityId: 'jakarta'
  },
  { 
    id: 'e5', 
    title: 'Monas Musical Fountain Laser Spectacle', 
    time: '08:00 PM - 09:00 PM', 
    location: 'Monas East Plaza', 
    category: 'Night Show',
    description: 'High-tech choreographed water fountains illuminated with vibrant laser storytelling.',
    cityId: 'jakarta'
  },

  // Bandung Events
  {
    id: 'eb1',
    title: 'Sunrise at Tebing Keraton',
    time: '05:00 AM - 07:00 AM',
    location: 'Dago Pakar Highlands',
    category: 'Nature',
    description: 'Witness the mystical sea of clouds over Bandung basin from the cliffside observatory.',
    cityId: 'bandung'
  },
  {
    id: 'eb2',
    title: 'Grand Interactive Angklung Orchestra',
    time: '03:30 PM - 05:00 PM',
    location: 'Saung Angklung Udjo',
    category: 'UNESCO Music',
    description: 'Every visitor receives a bamboo angklung and participates in playing a harmonious Sundanese concert.',
    cityId: 'bandung'
  },
  {
    id: 'eb3',
    title: 'Jalan Braga Art Deco Evening Promenade',
    time: '07:00 PM - 10:00 PM',
    location: 'Jalan Braga Heritage Corridor',
    category: 'Heritage & Jazz',
    description: 'Live street jazz performances, open art galleries, and colonial cafe strolls along Paris of Java.',
    cityId: 'bandung'
  },
  {
    id: 'eb4',
    title: 'Lembang Fresh Milk & Tahu Susu Tasting',
    time: '09:00 AM - 11:30 AM',
    location: 'Lembang Plateau',
    category: 'Culinary',
    description: 'Farm-to-table tasting of silken dairy tofu with warm liquid palm sugar and mountain tea.',
    cityId: 'bandung'
  }
];
