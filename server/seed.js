require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Outbreak = require("./models/Outbreak");
const User = require("./models/User");

const seedData = [
  { disease_name: "COVID-19", region: "South Asia", country: "India", latitude: 20.5937, longitude: 78.9629, cases_count: 15420, deaths_count: 230, recovered_count: 12800, severity: "high", date_reported: new Date("2026-04-01"), description: "New wave in Maharashtra and Delhi", is_verified: true },
  { disease_name: "COVID-19", region: "Southeast Asia", country: "Indonesia", latitude: -0.7893, longitude: 113.9213, cases_count: 8300, deaths_count: 95, recovered_count: 7100, severity: "medium", date_reported: new Date("2026-04-02"), description: "Rising cases in Java and Bali", is_verified: true },
  { disease_name: "Dengue", region: "South America", country: "Brazil", latitude: -14.235, longitude: -51.9253, cases_count: 23000, deaths_count: 180, recovered_count: 19500, severity: "critical", date_reported: new Date("2026-04-03"), description: "Severe dengue across multiple states", is_verified: true },
  { disease_name: "Malaria", region: "Sub-Saharan Africa", country: "Nigeria", latitude: 9.082, longitude: 8.6753, cases_count: 45000, deaths_count: 890, recovered_count: 38000, severity: "critical", date_reported: new Date("2026-04-01"), description: "Seasonal surge after rainy season", is_verified: true },
  { disease_name: "Cholera", region: "East Africa", country: "Ethiopia", latitude: 9.145, longitude: 40.4897, cases_count: 3200, deaths_count: 45, recovered_count: 2800, severity: "high", date_reported: new Date("2026-04-05"), description: "Water contamination in rural areas", is_verified: true },
  { disease_name: "Ebola", region: "Central Africa", country: "DRC", latitude: -4.0383, longitude: 21.7587, cases_count: 120, deaths_count: 48, recovered_count: 62, severity: "critical", date_reported: new Date("2026-03-28"), description: "New cluster in Equateur province", is_verified: true },
  { disease_name: "Measles", region: "Central Asia", country: "Afghanistan", latitude: 33.9391, longitude: 67.71, cases_count: 5600, deaths_count: 78, recovered_count: 4200, severity: "high", date_reported: new Date("2026-04-04"), description: "Low vaccination rates contributing", is_verified: true },
  { disease_name: "Tuberculosis", region: "Southeast Asia", country: "Philippines", latitude: 12.8797, longitude: 121.774, cases_count: 8900, deaths_count: 320, recovered_count: 6500, severity: "high", date_reported: new Date("2026-03-30"), description: "Drug-resistant TB rising", is_verified: true },
  { disease_name: "Influenza A", region: "East Asia", country: "China", latitude: 35.8617, longitude: 104.1954, cases_count: 28000, deaths_count: 150, recovered_count: 26000, severity: "medium", date_reported: new Date("2026-04-06"), description: "H3N2 strain in northern provinces", is_verified: true },
  { disease_name: "Zika", region: "Central America", country: "Mexico", latitude: 23.6345, longitude: -102.5528, cases_count: 1800, deaths_count: 5, recovered_count: 1500, severity: "low", date_reported: new Date("2026-04-02"), description: "Localized in Yucatan peninsula", is_verified: true },
  { disease_name: "Yellow Fever", region: "West Africa", country: "Ghana", latitude: 7.9465, longitude: -1.0232, cases_count: 420, deaths_count: 35, recovered_count: 310, severity: "medium", date_reported: new Date("2026-03-25"), description: "Cases in Ashanti region", is_verified: true },
  { disease_name: "COVID-19", region: "Western Europe", country: "Germany", latitude: 51.1657, longitude: 10.4515, cases_count: 4200, deaths_count: 18, recovered_count: 3900, severity: "low", date_reported: new Date("2026-04-07"), description: "Subvariant monitoring", is_verified: true },
  { disease_name: "Dengue", region: "South Asia", country: "Bangladesh", latitude: 23.685, longitude: 90.3563, cases_count: 12500, deaths_count: 95, recovered_count: 10800, severity: "high", date_reported: new Date("2026-04-05"), description: "Monsoon surge in Dhaka", is_verified: true },
  { disease_name: "Mpox", region: "Central Africa", country: "Cameroon", latitude: 7.3697, longitude: 12.3547, cases_count: 340, deaths_count: 12, recovered_count: 280, severity: "medium", date_reported: new Date("2026-04-03"), description: "Clade I investigation", is_verified: true },
  { disease_name: "Lassa Fever", region: "West Africa", country: "Nigeria", latitude: 9.082, longitude: 8.6753, cases_count: 890, deaths_count: 120, recovered_count: 650, severity: "high", date_reported: new Date("2026-03-29"), description: "Dry season peak", is_verified: true },
  { disease_name: "COVID-19", region: "North America", country: "United States", latitude: 37.0902, longitude: -95.7129, cases_count: 6800, deaths_count: 25, recovered_count: 6200, severity: "low", date_reported: new Date("2026-04-08"), description: "BA.2.86 tracking", is_verified: true },
  { disease_name: "Malaria", region: "Southeast Asia", country: "Myanmar", latitude: 21.9162, longitude: 95.956, cases_count: 15000, deaths_count: 210, recovered_count: 13000, severity: "high", date_reported: new Date("2026-04-01"), description: "Border areas affected", is_verified: true },
  { disease_name: "Cholera", region: "South Asia", country: "Pakistan", latitude: 30.3753, longitude: 69.3451, cases_count: 4100, deaths_count: 65, recovered_count: 3500, severity: "high", date_reported: new Date("2026-04-06"), description: "Post-flood contamination", is_verified: true },
  { disease_name: "Influenza A", region: "Western Europe", country: "France", latitude: 46.2276, longitude: 2.2137, cases_count: 9500, deaths_count: 42, recovered_count: 8800, severity: "low", date_reported: new Date("2026-04-04"), description: "Seasonal flu declining", is_verified: true },
  { disease_name: "Dengue", region: "Southeast Asia", country: "Thailand", latitude: 15.87, longitude: 100.9925, cases_count: 7600, deaths_count: 28, recovered_count: 6900, severity: "medium", date_reported: new Date("2026-04-07"), description: "Urban transmission", is_verified: true },
];

async function seed() {
  await connectDB();
  await Outbreak.deleteMany({});
  await Outbreak.insertMany(seedData);
  console.log("✅ Seeded 20 outbreak records");

  const existing = await User.findOne({ email: "admin@outbreak.com" });
  if (!existing) {
    await User.create({ name: "Admin", email: "admin@outbreak.com", password: "admin123", role: "admin" });
    console.log("✅ Admin user created (admin@outbreak.com / admin123)");
  }
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
