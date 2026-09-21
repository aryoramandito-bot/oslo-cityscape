import { RadarCoordinate } from '../types';

export const mapCoordinates = {
  // Jakarta Sites (1 - 34)
  '1':  { x: 54, y: 38 },   // National Monument (Monas)
  '2':  { x: 48, y: 29 },   // Kota Tua (Old Batavia)
  '3':  { x: 51, y: 42 },   // Soto Betawi Haji Mamat
  '4':  { x: 61, y: 37 },   // Kerak Telor Kemayoran Stand
  '5':  { x: 48, y: 28 },   // Cafe Batavia
  '6':  { x: 48, y: 30 },   // Kopi Es Tak Kie
  '7':  { x: 58, y: 42 },   // Giyanti Coffee Roastery
  '8':  { x: 42, y: 51 },   // Union Plaza Senayan
  '9':  { x: 52, y: 41 },   // Sate Khas Senayan
  '10': { x: 53, y: 42 },   // Sarinah Department Store
  '11': { x: 52, y: 44 },   // Hotel Indonesia Kempinski
  '12': { x: 82, y: 71 },   // Taman Mini Indonesia Indah (TMII)
  '13': { x: 58, y: 42 },   // Taman Ismail Marzuki (TIM)
  '14': { x: 52, y: 82 },   // Setu Babakan Cultural Village
  '15': { x: 48, y: 28 },   // Museum Sejarah Jakarta
  '16': { x: 56, y: 37 },   // Istiqlal Mosque
  '17': { x: 56, y: 37 },   // Jakarta Cathedral
  '18': { x: 57, y: 39 },   // Gereja Immanuel
  '19': { x: 48, y: 30 },   // Vihara Dharma Bhakti
  '20': { x: 77, y: 44 },   // Pura Aditya Jaya
  '21': { x: 46, y: 25 },   // Sunda Kelapa Harbor
  '22': { x: 56, y: 25 },   // Dufan Ancol
  '23': { x: 20, y: 21 },   // PIK Mangroves
  '24': { x: 51, y: 44 },   // Grand Indonesia
  '25': { x: 48, y: 12 },   // Kepulauan Seribu
  '26': { x: 77, y: 44 },   // Asinan Betawi H. Mansyur
  '27': { x: 59, y: 43 },   // Gado-Gado Bon Bin
  '28': { x: 54, y: 37 },   // Ragusa Es Italia
  '29': { x: 46, y: 54 },   // Ketoprak Ciragil
  '30': { x: 53, y: 28 },   // Nasi Uduk Ibu Sum
  '31': { x: 18, y: 18 },   // Batavia PIK
  '32': { x: 42, y: 56 },   // M Bloc Space
  '33': { x: 29, y: 43 },   // Museum MACAN
  '34': { x: 56, y: 36 },   // Pasar Baru

  // Bandung Sites (b1 - b36)
  'b1':  { x: 50, y: 40 },   // Gedung Sate
  'b2':  { x: 54, y: 58 },   // Gedung Merdeka
  'b3':  { x: 52, y: 52 },   // Jalan Braga
  'b4':  { x: 50, y: 43 },   // Museum Geologi
  'b5':  { x: 68, y: 38 },   // Saung Angklung Udjo
  'b6':  { x: 28, y: 80 },   // Kawah Putih
  'b7':  { x: 45, y: 15 },   // Tangkuban Perahu
  'b8':  { x: 47, y: 22 },   // Bosscha Observatory
  'b9':  { x: 43, y: 28 },   // Villa Isola
  'b10': { x: 50, y: 38 },   // ITB Campus
  'b11': { x: 54, y: 56 },   // Alun-Alun Bandung
  'b12': { x: 48, y: 25 },   // Dago Pakar & Tahura
  'b13': { x: 25, y: 82 },   // Setu Patenggang
  'b14': { x: 51, y: 48 },   // Taman Lalu Lintas
  'b15': { x: 54, y: 65 },   // Museum Sri Baduga
  'b16': { x: 44, y: 35 },   // Paris Van Java
  'b17': { x: 38, y: 20 },   // Curug Cimahi
  'b18': { x: 52, y: 50 },   // Batagor Kingsley
  'b19': { x: 49, y: 42 },   // Batagor & Cuanki Serayu
  'b20': { x: 54, y: 57 },   // Es Cendol Elizabeth
  'b21': { x: 55, y: 58 },   // Mie Kocok Mang Dadeng
  'b22': { x: 47, y: 37 },   // Sate Maranggi Haji Yetty
  'b23': { x: 52, y: 53 },   // Lotek Kalipah Apo
  'b24': { x: 48, y: 38 },   // Sate Maranggi
  'b25': { x: 52, y: 47 },   // Surabi Cihapit
  'b26': { x: 52, y: 51 },   // Peuyeum & Colenak
  'b27': { x: 54, y: 56 },   // Tahu Sumedang
  'b28': { x: 49, y: 44 },   // Kartika Sari
  'b29': { x: 44, y: 34 },   // Brownies Amanda
  'b30': { x: 52, y: 52 },   // Braga Permai Restaurant
  'b31': { x: 48, y: 37 },   // Nasi Timbel Bu Neni
  'b32': { x: 54, y: 57 },   // Kopi Aroma
  'b33': { x: 53, y: 55 },   // Seblak Jeletot
  'b34': { x: 46, y: 20 },   // Tahu Susu Lembang
  'b35': { x: 53, y: 54 },   // Mie Baso Akung
  'b36': { x: 54, y: 56 },   // Warung Nasi Ampera

  // Solo Sites (s1 - s32)
  's1':  { x: 50, y: 54 },   // Keraton Surakarta Hadiningrat
  's2':  { x: 48, y: 50 },   // Pura Mangkunegaran
  's3':  { x: 44, y: 51 },   // Museum Radya Pustaka
  's4':  { x: 49, y: 49 },   // Pasar Gede Harjonagoro
  's5':  { x: 48, y: 54 },   // Pasar Klewer
  's6':  { x: 49, y: 53 },   // Kampung Batik Kauman
  's7':  { x: 36, y: 51 },   // Kampung Batik Laweyan
  's8':  { x: 49, y: 51 },   // Benteng Vastenburg
  's9':  { x: 37, y: 46 },   // Lokananta
  's10': { x: 46, y: 42 },   // Taman Balekambang
  's11': { x: 57, y: 49 },   // Solo Safari
  's12': { x: 49, y: 45 },   // Masjid Raya Sheikh Zayed Solo
  's13': { x: 45, y: 52 },   // Tumurun Museum
  's14': { x: 19, y: 37 },   // De Tjolomadoe
  's15': { x: 45, y: 51 },   // Museum Danar Hadi
  's16': { x: 48, y: 48 },   // Monumen Pers Nasional
  's17': { x: 43, y: 55 },   // Selat Solo Mbak Lies
  's18': { x: 52, y: 51 },   // Timlo Sastro
  's19': { x: 48, y: 49 },   // Nasi Liwet Wongso Lemu
  's20': { x: 45, y: 53 },   // Serabi Notosuman Ny. Handayani
  's21': { x: 48, y: 54 },   // Tengkleng Klewer Bu Edi
  's22': { x: 46, y: 39 },   // Sate Kambing Mbok Galak
  's23': { x: 49, y: 49 },   // Tahok Pak Citro
  's24': { x: 49, y: 49 },   // Dawet Telasih Bu Dermi
  's25': { x: 51, y: 53 },   // Soto Gading 1
  's26': { x: 45, y: 49 },   // Soto Triwindu
  's27': { x: 18, y: 46 },   // Bebek Goreng H. Slamet
  's28': { x: 47, y: 50 },   // Timlo Maestro
  's29': { x: 40, y: 51 },   // Es Gempol Pleret Pak Suhar
  's30': { x: 49, y: 49 },   // Brambang Asem Pasar Gede (Bu Sum)
  's31': { x: 48, y: 45 },   // Gudeg Ceker Margoyudan Bu Kasno
  's32': { x: 49, y: 49 }    // Sate Buntel Tambak Segaran
} as Record<string, RadarCoordinate>;
