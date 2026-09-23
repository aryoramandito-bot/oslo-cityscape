/**
 * Event Dataset & Category Taxonomy for Oslo CityScape
 * Ref: 1c8afa7b-779d-46c6-9b24-313e34c497b4
 */
import { EventItem, EventCategory } from '../types';

export interface CategoryFilterTab {
  key: 'all' | EventCategory;
  label: string;
  iconUrl?: string;
  badgeColor?: string;
}

export const EVENT_CATEGORY_TABS: CategoryFilterTab[] = [
  { 
    key: 'all', 
    label: 'All Schedule',
    iconUrl: '/assets/categories/category-all.png',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
  },
  { 
    key: 'workshop', 
    label: 'Hands-On Experience', 
    iconUrl: '/assets/categories/category-workshop.png',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
  },
  { 
    key: 'walking', 
    label: 'Walking Tours', 
    iconUrl: '/assets/categories/category-walking.png',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
  },
  { 
    key: 'culinary', 
    label: 'Food & Tastings', 
    iconUrl: '/assets/categories/category-culinary.png',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
  },
  { 
    key: 'performance', 
    label: 'Shows & Arts', 
    iconUrl: '/assets/categories/category-performance.png',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
  },
  { 
    key: 'festival', 
    label: 'Festivals', 
    iconUrl: '/assets/categories/category-festival.png',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-200'
  },
];

export const mockEvents: EventItem[] = [
  // Jakarta Events
  { 
    id: 'e1', 
    title: 'Monas Sunrise Heritage Walk', 
    time: '06:00 AM - 08:30 AM', 
    duration: '2.5h Morning Trail',
    location: 'Monas Observation Deck', 
    category: 'walking',
    categoryLabel: 'Walking Tour',
    iconUrl: '/assets/categories/category-walking.png',
    highlightBadge: 'Skyline Panorama',
    description: 'Breathtaking 360-degree sunrise view over Jakarta skyline with guided architectural narration.',
    cityId: 'jakarta'
  },
  { 
    id: 'e2', 
    title: 'Kota Tua Walking Tour & Sepeda Onthel', 
    time: '10:00 AM - 12:00 PM', 
    duration: '2.0h Guided Ride',
    location: 'Fatahillah Square, Old Batavia', 
    category: 'walking',
    categoryLabel: 'Walking Tour',
    iconUrl: '/assets/categories/category-walking.png',
    highlightBadge: 'Dutch Batavia Trail',
    description: 'Explore Dutch colonial history, visit Fatahillah Museum, and ride classic colorful vintage bicycles.',
    cityId: 'jakarta'
  },
  { 
    id: 'e3', 
    title: 'Soto Betawi Masterclass with Chef Mamat', 
    time: '01:00 PM - 02:30 PM', 
    duration: '1.5h Masterclass',
    location: 'Menteng Culinary Pavilion', 
    category: 'workshop',
    categoryLabel: 'Hands-On Experience',
    iconUrl: '/assets/categories/category-workshop.png',
    highlightBadge: 'Cook & Taste',
    description: 'Learn the secret spiced coconut broth techniques behind authentic Betawi heritage cooking.',
    cityId: 'jakarta'
  },
  { 
    id: 'e4', 
    title: 'Ondel-Ondel Street Puppet Procession', 
    time: '04:00 PM - 05:30 PM', 
    duration: '1.5h Street Spectacle',
    location: 'Kota Tua Esplanade', 
    category: 'performance',
    categoryLabel: 'Stage & Show',
    iconUrl: '/assets/categories/category-performance.png',
    highlightBadge: 'Betawi Giant Puppets',
    description: 'Traditional Betawi giant puppet performance accompanied by lively Tanjidor brass music.',
    cityId: 'jakarta'
  },
  { 
    id: 'e5', 
    title: 'Monas Musical Fountain Laser Spectacle', 
    time: '08:00 PM - 09:00 PM', 
    duration: '1.0h Night Spectacle',
    location: 'Monas East Plaza', 
    category: 'performance',
    categoryLabel: 'Stage & Show',
    iconUrl: '/assets/categories/category-performance.png',
    highlightBadge: 'Laser & Water Show',
    description: 'High-tech choreographed water fountains illuminated with vibrant laser storytelling.',
    cityId: 'jakarta'
  },

  // Bandung Events
  {
    id: 'eb1',
    title: 'Sunrise at Tebing Keraton',
    time: '05:00 AM - 07:00 AM',
    duration: '2.0h Mountain Walk',
    location: 'Dago Pakar Highlands',
    category: 'walking',
    categoryLabel: 'Walking & Nature',
    iconUrl: '/assets/categories/category-walking.png',
    highlightBadge: 'Sea of Clouds',
    description: 'Witness the mystical sea of clouds over Bandung basin from the cliffside observatory.',
    cityId: 'bandung'
  },
  {
    id: 'eb2',
    title: 'Grand Interactive Angklung Orchestra',
    time: '03:30 PM - 05:00 PM',
    duration: '1.5h Interactive Concert',
    location: 'Saung Angklung Udjo',
    category: 'workshop',
    categoryLabel: 'Hands-On Experience',
    iconUrl: '/assets/categories/category-workshop.png',
    highlightBadge: 'UNESCO Bamboo Symphony',
    description: 'Every visitor receives a bamboo angklung and participates in playing a harmonious Sundanese concert.',
    cityId: 'bandung'
  },
  {
    id: 'eb3',
    title: 'Jalan Braga Art Deco Evening Promenade',
    time: '07:00 PM - 10:00 PM',
    duration: '3.0h Night Corridor',
    location: 'Jalan Braga Heritage Corridor',
    category: 'walking',
    categoryLabel: 'Walking Tour',
    iconUrl: '/assets/categories/category-walking.png',
    highlightBadge: 'Live Jazz & Galleries',
    description: 'Live street jazz performances, open art galleries, and colonial cafe strolls along Paris of Java.',
    cityId: 'bandung'
  },
  {
    id: 'eb4',
    title: 'Lembang Fresh Milk & Tahu Susu Tasting',
    time: '09:00 AM - 11:30 AM',
    duration: '2.5h Farm Tasting',
    location: 'Lembang Plateau',
    category: 'culinary',
    categoryLabel: 'Food & Tastings',
    iconUrl: '/assets/categories/category-culinary.png',
    highlightBadge: 'Mountain Dairy Tasting',
    description: 'Farm-to-table tasting of silken dairy tofu with warm liquid palm sugar and mountain tea.',
    cityId: 'bandung'
  },

  // Solo Events
  {
    id: 'es1',
    title: 'Royal Mangkunegaran Court Dance & Gamelan',
    time: '10:00 AM - 12:00 PM',
    duration: '2.0h Classical Dance',
    location: 'Pura Mangkunegaran Pendopo Agung',
    category: 'performance',
    categoryLabel: 'Stage & Show',
    iconUrl: '/assets/categories/category-performance.png',
    highlightBadge: 'Bedhaya & Srimpi',
    description: 'Witness master dancers perform classical Bedhaya and Srimpi under the grandest open-timber teak pendopo in Southeast Asia.',
    cityId: 'solo'
  },
  {
    id: 'es2',
    title: 'SIPA (Solo International Performing Arts)',
    time: '07:30 PM - 10:30 PM',
    duration: '3.0h Global Stage',
    location: 'Benteng Vastenburg Arena',
    category: 'festival',
    categoryLabel: 'Festival & Ceremony',
    iconUrl: '/assets/categories/category-festival.png',
    highlightBadge: 'Fortress Stage Arena',
    description: 'Global performing arts and cultural dance spectacular staged against the illuminated ramparts of the 18th-century Dutch fortress.',
    cityId: 'solo'
  },
  {
    id: 'es3',
    title: 'Sekaten Night Fair & Royal Gunungan Parade',
    time: '04:00 PM - 11:00 PM',
    duration: 'Evening Royal Fair',
    location: 'Alun-Alun Keraton Surakarta',
    category: 'festival',
    categoryLabel: 'Festival & Ceremony',
    iconUrl: '/assets/categories/category-festival.png',
    highlightBadge: 'Centuries-Old Royal Fair',
    description: 'Historic centuries-old Javanese festival celebrating the Prophet with Kyai Guntur Madu gamelan recitals and traditional market games.',
    cityId: 'solo'
  },
  {
    id: 'es4',
    title: 'Pasar Gede Heritage Culinary & Lantern Night Walk',
    time: '06:00 PM - 09:30 PM',
    duration: '3.5h Tasting Stroll',
    location: 'Pasar Gede Harjonagoro & Tien Kok Sie',
    category: 'culinary',
    categoryLabel: 'Food & Tastings',
    iconUrl: '/assets/categories/category-culinary.png',
    highlightBadge: 'Dawet, Tahok & Timlo',
    description: 'Guided evening stroll sampling Dawet Telasih, Tahok, and Timlo beneath thousands of illuminated street lanterns.',
    cityId: 'solo'
  },
  {
    id: 'es5',
    title: 'Solo Batik Carnival Grand Street Procession',
    time: '02:00 PM - 05:30 PM',
    duration: '3.5h Street Pageant',
    location: 'Jalan Slamet Riyadi Boulevard',
    category: 'festival',
    categoryLabel: 'Festival & Ceremony',
    iconUrl: '/assets/categories/category-festival.png',
    highlightBadge: 'Towering Batik Costumes',
    description: 'Spectacular annual street pageant featuring towering wearable art costumes crafted from authentic Javanese batik.',
    cityId: 'solo'
  },

  // Laweyan Events
  {
    id: 'elw1',
    title: 'Canting & Malam: Traditional Batik Tulis Workshop',
    time: '09:30 AM - 12:00 PM',
    duration: '2.5h Hands-on Studio',
    location: 'Batik Gunawan Setiawan Workshop',
    category: 'workshop',
    categoryLabel: 'Hands-On Experience',
    iconUrl: '/assets/categories/category-workshop.png',
    highlightBadge: 'Artisan Masterclass',
    description: 'Hands-on natural indigo wax-resist dyeing under the tutelage of third-generation master batik artisans.',
    cityId: 'laweyan'
  },
  {
    id: 'elw2',
    title: 'Gang Senggol Sunset Heritage Photowalk',
    time: '04:00 PM - 06:00 PM',
    duration: '2.0h Sunset Trail',
    location: 'Lorong Gang Senggol & Ndalem Tjokrosoemartan',
    category: 'walking',
    categoryLabel: 'Walking Tour',
    iconUrl: '/assets/categories/category-walking.png',
    highlightBadge: 'Fortress Alleys & Compounds',
    description: 'Guided walking exploration through fortress-like brick corridors, secret merchant compounds, and Pajang spiritual sanctuaries.',
    cityId: 'laweyan'
  },
  {
    id: 'elw3',
    title: 'Syarikat Dagang Islam Historic Commemoration Talk',
    time: '01:30 PM - 03:30 PM',
    duration: '2.0h Historical Dialogue',
    location: 'Rumah KH Samanhudi & FPKBL Center',
    category: 'walking',
    categoryLabel: 'Walking & Heritage',
    iconUrl: '/assets/categories/category-walking.png',
    highlightBadge: 'Merchant Guild Roots',
    description: 'Curated historical dialogue retracing the 1911 indigenous batik trade guild revolution and early Indonesian merchant society.',
    cityId: 'laweyan'
  },
  {
    id: 'elw4',
    title: 'Laweyan Night Market: Apem Mencon & Ledre Tasting',
    time: '06:30 PM - 09:30 PM',
    duration: '3.0h Night Stalls',
    location: 'Sentra FPKBL & Jl. Dr. Radjiman',
    category: 'culinary',
    categoryLabel: 'Food & Tastings',
    iconUrl: '/assets/categories/category-culinary.png',
    highlightBadge: 'Live Canting & Warm Delicacies',
    description: 'Savor ancestral coal-baked Apem Mencon and freshly crisped banana Ledre while watching live canting demonstrations.',
    cityId: 'laweyan'
  }
];
