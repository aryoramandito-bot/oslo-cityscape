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
  // ==================== JAKARTA EVENTS ====================
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
    cityId: 'jakarta',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1000&q=85',
    host: 'Jakarta Heritage Society & City Historians',
    admission: 'Free Admission · Verified Timetable',
    meetingPoint: 'Monas North Entrance Gate (Pintu Merdeka Utara)',
    lat: -6.175392,
    lng: 106.827153,
    itinerary: [
      '06:00 AM — Dawn assembly & traditional ginger tea welcoming',
      '06:30 AM — Ascend to 115m observation cupola for sunrise panorama',
      '07:30 AM — Historical narrative of Sukarno era architecture',
      '08:15 AM — Cool-down walk across Merdeka Square gardens'
    ],
    fullDetails: 'The National Monument (Monas) symbolizes Indonesian independence with its 132-meter flame-crowned obelisk. This sunrise tour grants privileged early access before general public hours, offering mist-clearing panoramic views of Istiqlal Mosque, Cathedral, and northern port.',
    tags: ['Architecture', 'Sunrise', 'JakartaLandmark', 'Photography']
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
    cityId: 'jakarta',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1000&q=85',
    host: 'Batavia Vintage Bicycle Guild (Kosti Jakarta)',
    admission: 'Complimentary Bike Rental · Guided',
    meetingPoint: 'Depan Museum Sejarah Jakarta (Fatahillah)',
    lat: -6.135200,
    lng: 106.813301,
    itinerary: [
      '10:00 AM — Sepeda onthel selection & vintage fedora fitting',
      '10:20 AM — Architectural ride to Kali Besar canal & Toko Merah',
      '11:15 AM — Historic spice warehouse & wooden drawbridge route',
      '11:50 AM — Return to Fatahillah for traditional Es Selendang Mayang'
    ],
    fullDetails: 'Old Batavia represents 17th-century Dutch colonial headquarters in the East Indies. Riding vintage Dutch-era bicycles (sepeda onthel) past Neo-Classical facades and restored canals provides an authentic historical passage through old merchant trade routes.',
    tags: ['Batavia', 'HeritageBike', 'ColonialHistory', 'Museum']
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
    cityId: 'jakarta',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&q=85',
    host: 'Chef Mamat & Betawi Culinary Guild',
    admission: 'Masterclass Workshop · Tasting Included',
    meetingPoint: 'Menteng Culinary Pavilion, Jl. Teuku Umar No. 12',
    lat: -6.196300,
    lng: 106.832700,
    itinerary: [
      '01:00 PM — Spiced bumbu paste grinding & nutmeg roasting demo',
      '01:30 PM — Milk & coconut broth balancing technique',
      '02:00 PM — Slow beef simmers & emping cracker pairing',
      '02:20 PM — Communal tasting with sambal rebus and lime'
    ],
    fullDetails: 'Soto Betawi is Jakarta iconic savory beef soup enriched with fresh cow milk, coconut milk, lemongrass, galangal, and roasted nutmeg. Chef Mamat shares four decades of ancestral family recipes from Kemayoran.',
    tags: ['CulinaryWorkshop', 'BetawiHeritage', 'ChefMasterclass', 'SlowFood']
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
    cityId: 'jakarta',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&q=85',
    host: 'Sanggar Betawi Silat & Tanjidor Troupe',
    admission: 'Open Air Street Procession · Free Entry',
    meetingPoint: 'Pelataran Wayang Museum, Kota Tua',
    lat: -6.134000,
    lng: 106.812500,
    itinerary: [
      '04:00 PM — Opening Tanjidor brass fanfare & gendang percussion',
      '04:20 PM — 2.5-meter giant puppets dance procession',
      '05:00 PM — Interactive photo opportunity with artisans & dancers',
      '05:20 PM — Closing Betawi pantun verse chanting'
    ],
    fullDetails: 'Ondel-Ondel are massive woven-bamboo effigies dating back to pre-colonial Betawi agrarian rites, originally crafted to ward off calamities and celebrate community triumphs. Accompanied by loud trumpets, drums, and gongs, the street spectacle is quintessential Jakarta folklore.',
    tags: ['Puppetry', 'Folklore', 'StreetPerformance', 'Tanjidor']
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
    cityId: 'jakarta',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&q=85',
    host: 'DKI Jakarta Cultural Tourism Bureau',
    admission: 'Public Evening Showcase · Free Admission',
    meetingPoint: 'Air Mancur Menari, Plaza Barat Monas',
    lat: -6.175500,
    lng: 106.829000,
    itinerary: [
      '08:00 PM — Symphonic overture & ambient lighting launch',
      '08:15 PM — Choreographed 30m water jets with archipelago melodies',
      '08:45 PM — High-beam laser finale over Independence Obelisk'
    ],
    fullDetails: 'A signature Jakarta night spectacle uniting modern laser projection mapping with synchronized 30-meter high water fountains set to orchestral arrangements of Indonesian patriotic and regional anthems.',
    tags: ['NightShow', 'Fountain', 'LaserArt', 'FamilyFriendly']
  },

  // ==================== BANDUNG EVENTS ====================
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
    cityId: 'bandung',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=85',
    host: 'Dago Highlands Eco Walkers Guild',
    admission: 'Early Access Permit · Guided Trek',
    meetingPoint: 'Taman Hutan Raya Juanda Gate 2',
    lat: -6.833889,
    lng: 107.663611,
    itinerary: [
      '05:00 AM — Pine forest night trail trek with headlamps',
      '05:35 AM — Arrival at Royal Cliff ridge for dawn twilight',
      '06:00 AM — Sunrise across mist-filled Cimenyan mountain gorge',
      '06:45 AM — Fresh highland Bajigur & boiled cassava breakfast'
    ],
    fullDetails: 'Perched at 1,200 meters above sea level within the Tahura Djuanda conservation forest, Tebing Keraton provides unhindered vistas of sunrise rolling across the prehistoric Bandung volcanic basin.',
    tags: ['Sunrise', 'Highlands', 'EcoTrek', 'NaturePhotography']
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
    cityId: 'bandung',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&q=85',
    host: 'Saung Angklung Udjo Master Ensemble',
    admission: 'Workshop & Performance · Instrument Included',
    meetingPoint: 'Amphitheater Saung Angklung Udjo, Jl. Padasuka 118',
    lat: -6.897778,
    lng: 107.655000,
    itinerary: [
      '03:30 PM — Wayang Golek wooden puppet overture',
      '04:00 PM — Angklung distribution & hand-sign note tuition',
      '04:20 PM — 500-person synchronous audience orchestra',
      '04:50 PM — Sundanese Helaran dance celebration with children'
    ],
    fullDetails: 'Recognized by UNESCO as an Intangible Cultural Heritage of Humanity, the Sundanese Angklung is an ancient tuned bamboo rattle. Udjo master conductors teach entire audiences to play global and regional classics in minutes using an intuitive hand-sign system.',
    tags: ['UNESCO', 'BambooMusic', 'InteractiveConcert', 'SundaneseCulture']
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
    cityId: 'bandung',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1000&q=85',
    host: 'Bandung Heritage Society & Braga Art Guild',
    admission: 'Open Cultural Promenade · Free Entry',
    meetingPoint: 'Gedung Gas Negara / Braga Art Cafe, Jl. Braga No. 37',
    lat: -6.917400,
    lng: 107.609400,
    itinerary: [
      '07:00 PM — Assemblage outside De Vries landmark building',
      '07:30 PM — Guided architectural walk through Art Deco storefronts',
      '08:30 PM — Street acoustic jazz session & live oil painters lane',
      '09:30 PM — Coffee cupping at historic Sumber Hidangan bakery'
    ],
    fullDetails: 'During the 1920s, Jalan Braga earned Bandung the moniker Parijs van Java for its chic boutiques, confectioneries, and Art Deco salons. Today it thrives as a vibrant evening arts corridor illuminated by antique wrought-iron lanterns.',
    tags: ['ArtDeco', 'NightWalk', 'LiveJazz', 'ColonialArchitecture']
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
    cityId: 'bandung',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&q=85',
    host: 'Lembang Artisanal Dairy Collective',
    admission: 'Culinary Tasting Session · Verified',
    meetingPoint: 'Sentra Tahu Susu Lembang, Jl. Raya Lembang No. 177',
    lat: -6.816667,
    lng: 107.616667,
    itinerary: [
      '09:00 AM — Morning milk coagulation & dairy curd demonstration',
      '09:45 AM — Fresh hot tofu frying in heritage cast-iron woks',
      '10:15 AM — Tasting flight: savory garlic tofu, sweet palm curd, fermented milk',
      '11:00 AM — Organic highland tea pairing on garden terrace'
    ],
    fullDetails: 'Lembang volcanic soil and temperate climate support West Java premier dairy herds. Tahu Susu blends pure soybean extract with fresh whole cow milk to create a silken tofu with a custard-like interior and golden crisp exterior.',
    tags: ['DairyTasting', 'ArtisanalTofu', 'MountainFarm', 'SundaneseFood']
  },

  // ==================== SOLO EVENTS ====================
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
    cityId: 'solo',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1000&q=85',
    host: 'Pura Mangkunegaran Cultural Custodian Guild',
    admission: 'Palace Cultural Recital · Ticketed / Verified',
    meetingPoint: 'Pendopo Agung Pura Mangkunegaran, Jl. Ronggowarsito',
    lat: -7.567083,
    lng: 110.823611,
    itinerary: [
      '10:00 AM — Royal protocol greeting & gamelan Pelog overture',
      '10:30 AM — Sacred Srimpi classical court dance performance',
      '11:15 AM — Master class explanation of mudra hand gestures',
      '11:45 AM — Guided view of royal heirlooms and antique gamelan Kyai Kanyut Mesem'
    ],
    fullDetails: 'Pura Mangkunegaran was founded in 1757 by the warrior prince Raden Mas Said (Prince Sambernyawa). Its Pendopo Agung is the largest pillarless teak hall in Java, housing sacred court dances that embody the peak of refined Javanese royal aesthetics.',
    tags: ['RoyalCourt', 'ClassicalDance', 'Gamelan', 'Mangkunegaran']
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
    cityId: 'solo',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=85',
    host: 'Solo International Performing Arts Committee',
    admission: 'International Festival · Free Public Seating',
    meetingPoint: 'Benteng Vastenburg Main Fortress Gate, Kedung Lumbu',
    lat: -7.571111,
    lng: 110.830000,
    itinerary: [
      '07:30 PM — Opening flame ceremony & cultural flag procession',
      '08:00 PM — International delegations dance theater collaboration',
      '09:15 PM — Contemporary Javanese cross-genre percussion suite',
      '10:15 PM — Grand fireworks display over Dutch fortress ramparts'
    ],
    fullDetails: 'SIPA is an internationally renowned performing arts festival hosted inside the monumental 1745 Dutch fortress Benteng Vastenburg, convening over 20 countries in celebrating multicultural unity through dance, theater, and symphonic music.',
    tags: ['InternationalFestival', 'BentengVastenburg', 'OpenAirStage', 'WorldCulture']
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
    cityId: 'solo',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1000&q=85',
    host: 'Keraton Surakarta Hadiningrat Royal Custodians',
    admission: 'Traditional Fair & Palace Ritual · Public Access',
    meetingPoint: 'Pagelaran Keraton Surakarta, Alun-Alun Utara',
    lat: -7.577778,
    lng: 110.828056,
    itinerary: [
      '04:00 PM — Gamelan Sekaten Kyai Guntur Madu continuous recital at Masjid Agung',
      '05:30 PM — Royal heirloom Gunungan offering blessing parade',
      '07:00 PM — Pasar Malam night market open: traditional ferris wheels, crafts',
      '09:30 PM — Betel leaf chewing (Kinang) ritual for good health'
    ],
    fullDetails: 'Sekaten is a five-century-old royal tradition originating from the Demak Sultanate. In Surakarta, sacred royal gamelan sets are brought out to the Grand Mosque and played nonstop for one full week, accompanied by a bustling folk fair on the north palace square.',
    tags: ['RoyalRitual', 'Sekaten', 'NightMarket', 'KeratonSurakarta']
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
    cityId: 'solo',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=85',
    host: 'Pasar Gede Merchant Guild & Heritage Guides',
    admission: 'Curated Culinary Trail · Food Tasting Included',
    meetingPoint: 'Under Dutch Clock Tower, Pasar Gede Harjonagoro',
    lat: -7.570278,
    lng: 110.831944,
    itinerary: [
      '06:00 PM — Dutch colonial market architecture overview by Thomas Karsten',
      '06:30 PM — Silken Tahok soybean curd with warm ginger palm sugar',
      '07:15 PM — Legendary iced Dawet Telasih Bu Dermi tasting',
      '08:00 PM — Steaming savory Timlo chicken broth with sausage rolls',
      '09:00 PM — Red lantern photowalk in front of Tien Kok Sie temple'
    ],
    fullDetails: 'Designed in 1930 by renowned Dutch architect Thomas Karsten, Pasar Gede Harjonagoro seamlessly marries Dutch structural engineering with traditional Javanese roof forms. At night, its lantern-adorned corridors come alive with authentic ancestral recipes.',
    tags: ['StreetFood', 'PasarGede', 'NightWalk', 'TraditionalDessert']
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
    cityId: 'solo',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000&q=85',
    host: 'Solo Batik Carnival Foundation & Surakarta City',
    admission: 'Boulevard Street Pageant · Free Public Viewing',
    meetingPoint: 'Stadion Sriwedari Boulevard Start Line, Jl. Slamet Riyadi',
    lat: -7.568333,
    lng: 110.814722,
    itinerary: [
      '02:00 PM — Royal costume inspection & master designer runway opening',
      '02:45 PM — 4-kilometer carnival procession along Slamet Riyadi',
      '04:30 PM — Grand finale choreography in front of Benteng Vastenburg',
      '05:15 PM — Public costume exhibition and photography meet'
    ],
    fullDetails: 'Solo Batik Carnival is an avant-garde cultural parade celebrating Indonesian batik as high wearable couture. Hundreds of performers parade along Java longest urban avenue wearing handcrafted costumes weighing up to 25 kg inspired by mythical Garuda, ocean nagas, and royal court lore.',
    tags: ['BatikCarnival', 'WearableArt', 'StreetPageant', 'CostumeDesign']
  },

  // ==================== LAWEYAN EVENTS ====================
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
    cityId: 'laweyan',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&q=85',
    host: 'Batik Gunawan Setiawan Master Artisans',
    admission: 'Artisan Studio Session · Cotton Fabric Included',
    meetingPoint: 'Batik Gunawan Setiawan Courtyard, Jl. Sayuran No. 40, Laweyan',
    lat: -7.565833,
    lng: 110.796389,
    itinerary: [
      '09:30 AM — Traditional wax (malam) temperature & canting posture tuition',
      '10:00 AM — Tracing sacred Parang & Kawung motifs onto primissima cotton',
      '11:00 AM — Cold natural indigo bath immersion & oxidation process',
      '11:45 AM — Boiling water wax release (nglorod) & piece drying'
    ],
    fullDetails: 'Kampung Batik Laweyan is Indonesia oldest batik enclave, established in the 16th century under the Pajang Kingdom. This workshop provides authentic tactile experience with beeswax, copper cantings, and natural plant dyes inside a restored merchant courtyard compound.',
    tags: ['BatikTulis', 'Canting', 'IndigoDye', 'ArtisanGuild']
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
    cityId: 'laweyan',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=85',
    host: 'Laweyan Heritage Trail Community (FPKBL)',
    admission: 'Guided Heritage Walk · Free Admission',
    meetingPoint: 'Gerbang Kampung Batik Laweyan, Jl. Dr. Rajiman',
    lat: -7.566389,
    lng: 110.795833,
    itinerary: [
      '04:00 PM — Introduction to Pajang era urban design & secret fortress walls',
      '04:30 PM — Navigating the narrow walled labyrinth of Gang Senggol',
      '05:15 PM — Exclusive entrance to Ndalem Tjokrosoemartan merchant mansion',
      '05:45 PM — Golden hour photography over Kabanaran river canal'
    ],
    fullDetails: 'The merchant princes (wong sugih) of Laweyan built towering 4-meter perimeter walls with secret inter-connected courtyard gates to protect their batik wealth and independence from colonial authorities. Walking through Gang Senggol is a journey into a secluded private world.',
    tags: ['HeritageAlley', 'FortressWalls', 'Photowalk', 'MerchantMansion']
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
    cityId: 'laweyan',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&q=85',
    host: 'Yayasan Samanhudi Solo & Indonesian Historical Society',
    admission: 'Historical Symposium · Open to Public',
    meetingPoint: 'Museum KH Samanhudi, Jl. KH Samanhudi No. 12, Laweyan',
    lat: -7.566944,
    lng: 110.797222,
    itinerary: [
      '01:30 PM — Welcome & inspection of original 1911 trade guild documents',
      '02:15 PM — Keynote lecture: Indigenous Merchant Resilience in Colonial Java',
      '03:00 PM — Q&A discussion on modern creative economy legacies',
      '03:20 PM — Archival photography tour'
    ],
    fullDetails: 'Founded in 1911 by Laweyan native KH Samanhudi, Sarekat Dagang Islam was Indonesia first mass political and economic movement, created by wealthy Javanese batik traders to counter Dutch colonial trade monopolies and assert indigenous independence.',
    tags: ['HistoryTalk', 'Samanhudi', 'TradeGuild', 'NationalHero']
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
    cityId: 'laweyan',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=85',
    host: 'Laweyan Culinary Custodians & Pasar Kembang Guild',
    admission: 'Evening Stalls Walk · Tastings Included',
    meetingPoint: 'Sentra Kuliner Tradisional Laweyan, Jl. Sidoluhur No. 2',
    lat: -7.565278,
    lng: 110.796944,
    itinerary: [
      '06:30 PM — Clay pot charcoal baking demo of Apem Mencon fermented rice cakes',
      '07:15 PM — Tasting flight of hot rolled sweet banana Ledre pancakes',
      '08:00 PM — Night canting wax demonstration under gas lanterns',
      '08:45 PM — Traditional Wedang Dongo ginger peanut drink finale'
    ],
    fullDetails: 'Laweyan culinary repertoire is deeply connected to ancient ritual offerings. Apem Mencon is a fermented rice pancake baked in miniature clay lids over coconut charcoal, once reserved for palace ancestral remembrance ceremonies.',
    tags: ['NightMarket', 'ApemMencon', 'TraditionalBaking', 'LaweyanCulinary']
  }
];
