/**
 * Monastery360 — Single Source of Truth Data Store
 * Smart India Hackathon 2026 (SIH25061)
 * 
 * Includes multi-city distance matrix (Gangtok, Siliguri, Bagdogra, Darjeeling),
 * live traffic calculation curves, elevation, amenities, and etiquette rules.
 */

const monasteryData = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    district: "East Sikkim",
    image: "assets/rumtek.jpg",
    elevation: "1,550 m",
    travelTime: "45 mins from Gangtok",
    distance: "24 km from Gangtok town center",
    cityDistances: {
      gangtok: "24 km (45 mins)",
      siliguri: "115 km (3.5 hrs)",
      bagdogra: "122 km (4 hrs)",
      darjeeling: "98 km (3 hrs)"
    },
    roadCondition: "Paved mountain highway (All-weather accessible)",
    annualFestival: "Kagyed Dance Festival (December)",
    chantingHours: "6:00 AM – 7:30 AM & 4:00 PM – 5:30 PM",
    amenities: ["Footwear storage", "Parking lot", "Visitor center", "Guide available"],
    govtApproved: true,
    shortHistory: "Built in the mid-1700s and reconstructed in 1966 by the 16th Karmapa, Rumtek serves as the focal seat of the Karma Kagyu lineage in Sikkim. It houses sacred relics, golden stupas, and ancient religious artwork within its traditional Tibetan architecture.",
    coordinates: { lat: 27.3033, lng: 88.5638 },
    crowdLevel: "high",
    crowdPrediction: "Estimated peak footfall occurs between 11:00 AM and 2:00 PM when tour buses arrive.",
    bestTime: "7:00 AM – 9:00 AM (quiet morning chanting)",
    hourlyCrowd: {
      "7 AM": 15,
      "9 AM": 30,
      "11 AM": 85,
      "1 PM": 90,
      "3 PM": 55,
      "5 PM": 20
    },
    etiquette: "Remove footwear before entering the main prayer hall. Photography is strictly prohibited inside the main shrine."
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    district: "West Sikkim",
    image: "assets/pemayangtse.jpg",
    elevation: "2,085 m",
    travelTime: "3.5 hrs from Gangtok (near Pelling)",
    distance: "110 km from Gangtok (2 km from Pelling)",
    cityDistances: {
      gangtok: "110 km (3.5 hrs)",
      siliguri: "130 km (4.5 hrs)",
      bagdogra: "138 km (5 hrs)",
      darjeeling: "75 km (2.5 hrs)"
    },
    roadCondition: "State highway (Good condition with scenic valley views)",
    annualFestival: "Cham Mask Dance (February)",
    chantingHours: "6:30 AM – 8:00 AM & 3:30 PM – 5:00 PM",
    amenities: ["Restroom facilities", "Parking lot", "Sculpture exhibition", "Tea stall"],
    govtApproved: true,
    shortHistory: "Founded in 1705 by Lhatsun Chenpo, Pemayangtse is one of the oldest and most revered Nyingma monasteries in Sikkim. It is famous for its three-story hand-carved wooden sculpture representing the celestial palace of Guru Rinpoche.",
    coordinates: { lat: 27.3056, lng: 88.2520 },
    crowdLevel: "med",
    crowdPrediction: "Estimated moderate visitor density during mid-day hours with quiet morning mountain light.",
    bestTime: "8:00 AM – 10:00 AM (clear view of Mt. Kanchenjunga)",
    hourlyCrowd: {
      "7 AM": 10,
      "9 AM": 25,
      "11 AM": 60,
      "1 PM": 65,
      "3 PM": 40,
      "5 PM": 15
    },
    etiquette: "Maintain silence near meditation quarters. Walk clockwise around the exterior prayer wheels."
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    district: "West Sikkim",
    image: "assets/tashiding.jpg",
    elevation: "1,460 m",
    travelTime: "4 hrs from Gangtok",
    distance: "98 km from Gangtok",
    cityDistances: {
      gangtok: "98 km (4 hrs)",
      siliguri: "125 km (4.5 hrs)",
      bagdogra: "132 km (5 hrs)",
      darjeeling: "85 km (3 hrs)"
    },
    roadCondition: "Mountain road with a 500-step stone staircase climb",
    annualFestival: "Sacred Bhumchu Water Blessing (Feb - Mar)",
    chantingHours: "6:00 AM – 7:30 AM & 4:30 PM – 6:00 PM",
    amenities: ["Stone walking trail", "Chorten sacred complex", "Drinking water station"],
    govtApproved: true,
    shortHistory: "Constructed in 1641 atop a heart-shaped hill between the Rathong and Rangit rivers, Tashiding is considered the spiritual heartland of Sikkim. It is renowned for holding the annual sacred Bhumchu water blessing ceremony.",
    coordinates: { lat: 27.3298, lng: 88.2974 },
    crowdLevel: "low",
    crowdPrediction: "Estimated low crowd density on regular days, providing a serene environment for meditation.",
    bestTime: "All day (peaceful atmosphere)",
    hourlyCrowd: {
      "7 AM": 5,
      "9 AM": 15,
      "11 AM": 30,
      "1 PM": 35,
      "3 PM": 20,
      "5 PM": 10
    },
    etiquette: "Spin prayer wheels in a clockwise direction only. Do not touch sacred chortens."
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    district: "East Sikkim",
    image: "assets/enchey.jpg",
    elevation: "1,800 m",
    travelTime: "15 mins from Gangtok town center",
    distance: "3 km from Gangtok Ridge",
    cityDistances: {
      gangtok: "3 km (15 mins)",
      siliguri: "116 km (3.5 hrs)",
      bagdogra: "124 km (4 hrs)",
      darjeeling: "96 km (3 hrs)"
    },
    roadCondition: "City asphalt road (Easily accessible by taxi)",
    annualFestival: "Detor Cham Dance (Jan - Feb)",
    chantingHours: "6:00 AM – 7:30 AM & 4:00 PM – 5:00 PM",
    amenities: ["Taxi stand", "Pine grove garden", "Footwear storage"],
    govtApproved: true,
    shortHistory: "Established in 1909 above Gangtok, Enchey belongs to the Nyingma order and was blessed by tantric master Lama Drupthob Karpo. The pagoda-style monastery is surrounded by tall pine trees overlooking the valley.",
    coordinates: { lat: 27.3361, lng: 88.6186 },
    crowdLevel: "med",
    crowdPrediction: "Estimated moderate visitor flow during morning prayer hours due to proximity to Gangtok.",
    bestTime: "7:00 AM – 9:00 AM (morning butter lamp ceremony)",
    hourlyCrowd: {
      "7 AM": 35,
      "9 AM": 50,
      "11 AM": 55,
      "1 PM": 40,
      "3 PM": 30,
      "5 PM": 15
    },
    etiquette: "Dress modestly covering shoulders and knees. Avoid loud phone calls in courtyard."
  },
  {
    id: "ralang",
    name: "Ralang Monastery",
    district: "South Sikkim",
    image: "assets/ralang.jpg",
    elevation: "1,480 m",
    travelTime: "2.5 hrs from Gangtok (near Ravangla)",
    distance: "65 km from Gangtok (13 km from Ravangla)",
    cityDistances: {
      gangtok: "65 km (2.5 hrs)",
      siliguri: "105 km (3.5 hrs)",
      bagdogra: "112 km (4 hrs)",
      darjeeling: "68 km (2.5 hrs)"
    },
    roadCondition: "Paved district road",
    annualFestival: "Pang Lhabsol Festival (August/September)",
    chantingHours: "6:30 AM – 8:00 AM & 3:30 PM – 5:00 PM",
    amenities: ["Spacious monastic courtyard", "Parking area", "Restroom"],
    govtApproved: true,
    shortHistory: "Belonging to the Kagyu order, Ralang was established following the sacred grain-scattering ritual of the 9th Karmapa. The complex features extensive monastic quarters and traditional thangka paintings.",
    coordinates: { lat: 27.2762, lng: 88.3971 },
    crowdLevel: "low",
    crowdPrediction: "Estimated low visitor traffic during regular non-festival days.",
    bestTime: "9:00 AM – 12:00 PM (bright sunlight in courtyard)",
    hourlyCrowd: {
      "7 AM": 10,
      "9 AM": 20,
      "11 AM": 35,
      "1 PM": 30,
      "3 PM": 20,
      "5 PM": 10
    },
    etiquette: "Seek permission before photographing monks or students."
  },
  {
    id: "phodong",
    name: "Phodong Monastery",
    district: "North Sikkim",
    image: "assets/phodong.jpg",
    elevation: "1,370 m",
    travelTime: "1.5 hrs from Gangtok",
    distance: "38 km from Gangtok",
    cityDistances: {
      gangtok: "38 km (1.5 hrs)",
      siliguri: "150 km (4.5 hrs)",
      bagdogra: "158 km (5 hrs)",
      darjeeling: "130 km (4 hrs)"
    },
    roadCondition: "North Sikkim highway (Permit checkpost en route)",
    annualFestival: "Phodong Chaam Festival (December)",
    chantingHours: "6:00 AM – 7:30 AM & 4:00 PM – 5:00 PM",
    amenities: ["Heritage fresco hall", "Parking space", "Tea stall"],
    govtApproved: true,
    shortHistory: "Built in 1740 by Chogyal Gyurmed Namgyal, Phodong is one of the six major Kagyu monasteries in Sikkim. It is recognized for its historical frescoes and peaceful setting along northern mountain slopes.",
    coordinates: { lat: 27.4116, lng: 88.5834 },
    crowdLevel: "low",
    crowdPrediction: "Estimated low crowd levels throughout the day after morning mountain mist clears.",
    bestTime: "10:00 AM – 2:00 PM (clear weather window)",
    hourlyCrowd: {
      "7 AM": 5,
      "9 AM": 15,
      "11 AM": 25,
      "1 PM": 25,
      "3 PM": 15,
      "5 PM": 5
    },
    etiquette: "Walk gently inside old timber halls and refrain from touching murals."
  }
];
