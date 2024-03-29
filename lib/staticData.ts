import { BedType } from "../types/room"

// 1월부터 12월까지
export const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

// 1부터 31까지
export const dayList = Array.from(Array(31), (_, i) => `${String(i + 1)}`)

// 현재 년부터 100년전
export const yearList = Array.from(Array(100), (_, i) => `${String(new Date().getFullYear() - i)}`)

// 숙소 큰 범위의 건물 유형
export const largeBuildingTypeList = [
  'Apartment',
  'House',
  'Secondary Unit',
  'Unique Space',
  'B&B',
  'Boutique Hotel',
]

// 아파트 건물 유형
export const apartmentBuildingTypeList = [
  'Apartment',
  'Flat',
  'Annex',
  'Casa Particular(Cuba)',
  'Loft',
  'Residence',
]

// 주택 건물 유형
export const houseBuildingTypeList = [
  'House',
  'Bungalow',
  'Log Cabin',
  'Casa',
  'Particular(Cuba)',
  'Chalet',
  'Suburban House',
  'Cyclades(Greece)',
  'Dammuso',
  'Dome House',
  'House Boat',
  'Hut',
  'Light House',
  'Pension(Korea)',
  'Town House',
  'Masion',
]

// 별채 건물 유형
export const secondaryUnitBuildingTypeList = [
  'Annex For Guest',
  'Guest Suite',
  'WWOOF',
]

// 독특한 숙소 건물 유형
export const uniqueSpaceBuildingTypeList = [
  'Shed',
  'Boat',
  'Bus',
  'Caravan',
  'Palace',
  'Cave',
  'Dome House',
  'WWOOF',
  'House Boat',
  'Hut',
  'Igloo',
  'Island',
  'Light House',
  'Pension(Korea)',
  'Plane',
  'Tent',
  'Teepee',
  'Train',
  'Tree House',
  'Windmill House',
  'Yurt',
]

// B&B 건물유형
export const bnbBuildingTypeList = [
  'B&B',
  'Casa Particular',
  'WWOOF',
  'Ryokan(Japan)',
]

// 부티크 호텔 건물 유형
export const boutiqueHotelBuildingTypeList = [
  'Boutique Hotel',
  'Apart Hotel',
  'Heritage Hotel(India)',
  'Hostel',
  'Hotel',
  'Mountain Lodge',
  'Resort',
  'Residence',
]

// 침실 개수
export const bedroomCountList = Array.from(Array(16), (_, i) => `${i} Bedroom(s)`)

// 침대 유형
export const bedTypes: BedType[] = [
  'Sofa',
  'Air Mettress',
  'Blanket',
  'Single',
  'Double',
  'Queen-size',
  'Bunk',
  'Crib',
  'Hammock',
  'Waterbed'
]

// 국가 리스트
export const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Côte d'Ivoire",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Swaziland",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
]

// 편의 시설
export const amenityList = [
  'Wifi',
  'TV',
  'Heater',
  'Air Conditioner',
  'Iron',
  'Shampoo',
  'Hair Dryer',
  'Breakfast, Coffee, Tea',
  'Business Space',
  'Fireplace',
  'Closet',
  'Guest Entrance'
]

// 편의 공간
export const convenienceList = [
  'Kitchen',
  'Laundry Room',
  'Parking Lot',
  'Gym',
  'Swimming Pool',
  'Jacuzzi'
]
