// ============================================
// THADAM AI — Realistic Sustainability Mock Data
// ============================================

export const mockStats = {
  totalUsers: 2500,
  carbonSavedKg: 124000,
  rewardsDistributedINR: 480000,
  smartMachines: 48,
  wasteProcessedTons: 18.2,
  activeChallenges: 12,
};

export const mockUserProfile = {
  name: "Sanjay",
  email: "sanjay@thadam.ai",
  avatar: "/assets/avatars/sanjay.png", // Or a default svg/fallback
  carbonScore: 82, // Out of 100
  carbonSavedKg: 142.5,
  rewardPoints: 2450,
  treesEquivalent: 6.5,
  ecoRank: "Green Champion",
  rankPercentile: "Top 4%",
  badges: [
    { id: "b1", title: "Zero Waste Hero", icon: "🌱", desc: "Recycled over 50 items" },
    { id: "b2", title: "Transit Pioneer", icon: "🚲", desc: "10 clean commutes recorded" },
    { id: "b3", title: "First Scan", icon: "📸", desc: "Scanned an item using Gemini AI Scanner" },
    { id: "b4", title: "Local Legend", icon: "📍", desc: "Visited 3 smart machines" },
  ],
  achievements: [
    { title: "Weekly Streak", progress: 85, desc: "Log carbon for 7 consecutive days" },
    { title: "Carbon Halfer", progress: 40, desc: "Reduce electricity carbon by 50%" },
  ]
};

export const carbonTrendData = [
  { name: 'Mon', transport: 4.2, electricity: 3.5, food: 2.1, shopping: 1.5, waste: 0.8 },
  { name: 'Tue', transport: 3.8, electricity: 3.2, food: 2.0, shopping: 1.2, waste: 0.7 },
  { name: 'Wed', transport: 2.1, electricity: 3.0, food: 2.3, shopping: 1.0, waste: 0.8 },
  { name: 'Thu', transport: 4.5, electricity: 3.4, food: 1.9, shopping: 2.5, waste: 0.9 },
  { name: 'Fri', transport: 3.0, electricity: 3.1, food: 2.2, shopping: 1.8, waste: 0.7 },
  { name: 'Sat', transport: 1.5, electricity: 4.2, food: 3.0, shopping: 3.0, waste: 1.2 },
  { name: 'Sun', transport: 1.0, electricity: 3.8, food: 2.8, shopping: 2.1, waste: 1.0 },
];

export const rewardsTrendData = [
  { month: 'Jan', earned: 320, redeemed: 200 },
  { month: 'Feb', earned: 450, redeemed: 300 },
  { month: 'Mar', earned: 600, redeemed: 450 },
  { month: 'Apr', earned: 800, redeemed: 500 },
  { month: 'May', earned: 950, redeemed: 700 },
  { month: 'Jun', earned: 1200, redeemed: 900 },
];

export const machineActivityData = [
  { hour: '08:00', sessions: 12, bottlesRecycled: 45 },
  { hour: '10:00', sessions: 28, bottlesRecycled: 112 },
  { hour: '12:00', sessions: 42, bottlesRecycled: 189 },
  { hour: '14:00', sessions: 35, bottlesRecycled: 154 },
  { hour: '16:00', sessions: 48, bottlesRecycled: 210 },
  { hour: '18:00', sessions: 55, bottlesRecycled: 245 },
  { hour: '20:00', sessions: 30, bottlesRecycled: 120 },
];

export const wasteDistributionData = [
  { name: 'Plastic PET', value: 45, color: '#22C55E' },
  { name: 'Aluminum Cans', value: 25, color: '#38BDF8' },
  { name: 'Glass Bottles', value: 15, color: '#F59E0B' },
  { name: 'Paper/Cardboard', value: 10, color: '#EC4899' },
  { name: 'Other', value: 5, color: '#64748B' },
];

export const recentActivity = [
  { id: '1', type: 'scan', title: 'Plastic Bottle Recycled', detail: 'Smart Machine #08 - Adyar', pts: '+50 pts', time: '2 hours ago', carbonSaved: '0.15 kg' },
  { id: '2', type: 'transport', title: 'Subway Ride Commute', detail: 'Compared to Petrol Car', pts: '+80 pts', time: '5 hours ago', carbonSaved: '2.4 kg' },
  { id: '3', type: 'reward', title: 'Metro Pass Voucher', detail: 'Redeemed', pts: '-500 pts', time: '1 day ago', carbonSaved: 'N/A' },
  { id: '4', type: 'energy', title: 'Solar Grid Logging', detail: 'Off-grid production', pts: '+120 pts', time: '2 days ago', carbonSaved: '4.8 kg' },
];

export const aiInsights = [
  { id: '1', title: 'Commute Spotlight', text: 'You saved 12kg of CO2 this week by cycling on Wednesdays and Fridays. Keep it up!', type: 'success' },
  { id: '2', title: 'Phantom Load Alert', text: 'Your electricity usage spike on Saturdays suggests appliances left on standby. Try smart plugs.', type: 'warning' },
  { id: '3', title: 'Gemini Sustainability Tip', text: 'Try replacing your dairy milk intake with oat milk to lower your diet carbon footprint by up to 60%.', type: 'info' }
];

export const smartMachinesList = [
  { id: 'm1', name: 'Thadam RVM #01 - Adyar Depot', status: 'Online', fillLevel: 42, distance: '0.8 km', address: 'Adyar Metro Station Entrance A, Chennai', accepts: ['PET Bottles', 'Alu Cans'], lat: 13.0063, lng: 80.2574, totalWasteProcessedKg: 1240 },
  { id: 'm2', name: 'Thadam RVM #08 - Besant Nagar Beach', status: 'Online', fillLevel: 88, distance: '1.5 km', address: 'Promenade Rd, opposite Police Booth, Chennai', accepts: ['PET Bottles', 'Alu Cans', 'Glass'], lat: 13.0003, lng: 80.2687, totalWasteProcessedKg: 2840 },
  { id: 'm3', name: 'Thadam RVM #12 - T. Nagar Pedestrian Plaza', status: 'Maintenance', fillLevel: 95, distance: '3.2 km', address: 'Theagaraya Rd, T. Nagar, Chennai', accepts: ['PET Bottles', 'Alu Cans'], lat: 13.0405, lng: 80.2337, totalWasteProcessedKg: 950 },
  { id: 'm4', name: 'Thadam RVM #19 - IIT Madras Research Park', status: 'Online', fillLevel: 15, distance: '2.1 km', address: 'Kanagam Rd, Taramani, Chennai', accepts: ['PET Bottles', 'Alu Cans', 'E-Waste'], lat: 12.9894, lng: 80.2464, totalWasteProcessedKg: 4200 },
];

export const rewardsCatalog = {
  challenges: [
    { id: 'c1', title: 'Zero Waste Week', points: 300, duration: '4 days left', participants: 420, desc: 'Recycle at least 15 items using Smart Machines' },
    { id: 'c2', title: 'Eco Commuter Match', points: 500, duration: '12 days left', participants: 850, desc: 'Log zero-emission transport for 5 days straight' },
    { id: 'c3', title: 'Gemini Waste Master', points: 200, duration: '2 days left', participants: 180, desc: 'Scan and correctly sort 5 items with AI Scanner' },
  ],
  offers: [
    { id: 'o1', title: 'Chennai Metro 1-Day Pass', provider: 'CMRL', cost: 150, image: '🚇', desc: 'Unlimited rides for 24 hours on all lines' },
    { id: 'o2', title: '₹100 Organic Grocery Voucher', provider: 'EcoStore', cost: 250, image: '🍏', desc: 'Valid on fresh fruits and organic produce' },
    { id: 'o3', title: '30% Off Sustainable Coffee Cup', provider: 'KeepCup', cost: 350, image: '☕', desc: 'Premium reusable glass travel mug' },
    { id: 'o4', title: '₹200 E-Bike Rent Credits', provider: 'Yulu', cost: 200, image: '🚲', desc: 'Valid for eco-friendly micro-mobility rides' },
  ],
  history: [
    { id: 'h1', title: 'Metro Pass Voucher', date: '2026-06-10', pts: -500, status: 'Active' },
    { id: 'h2', title: 'Organic Grocery Voucher', date: '2026-05-28', pts: -250, status: 'Claimed' },
  ]
};

export const platformArchitecture = {
  title: "Platform Infrastructure Overview",
  services: [
    { name: "Gemini Pro Vision API", tech: "Google Cloud AI", role: "Real-time waste material detection and sorting logic." },
    { name: "Firebase Authentication", tech: "Firebase Auth", role: "Secure, unified Google Identity Federation." },
    { name: "Smart IoT Telemetry", tech: "MQTT Protocol / HiveMQ", role: "Real-time hardware status, fill level, and bin diagnostics." },
    { name: "Prisma & PostgreSQL", tech: "ORM Database", role: "Secure multi-tenant database for user carbon ledger and stats." },
    { name: "Cloud Run Hosting", tech: "Docker / Google Cloud", role: "Serverless container execution for optimal Next.js performance." }
  ]
};
