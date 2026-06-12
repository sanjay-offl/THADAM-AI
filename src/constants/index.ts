import type { EcoRank, NavItem, Reward, Badge, Challenge, CarbonForecast, ChartDataPoint } from '@/types';

export const APP_NAME = 'THADAM AI';
export const APP_TAGLINE = 'Track Your Carbon. Transform Your Future.';
export const APP_DESCRIPTION = 'AI-powered sustainability intelligence platform that helps you understand, track, reduce, and improve your environmental impact.';

export const ECO_RANKS: { rank: EcoRank; minScore: number; icon: string; color: string }[] = [
  { rank: 'Eco Beginner', minScore: 0, icon: '🌱', color: '#86EFAC' },
  { rank: 'Green Warrior', minScore: 200, icon: '🌿', color: '#4ADE80' },
  { rank: 'Climate Champion', minScore: 500, icon: '🌍', color: '#22C55E' },
  { rank: 'Earth Guardian', minScore: 1000, icon: '🛡️', color: '#16A34A' },
  { rank: 'Planet Protector', minScore: 2000, icon: '⭐', color: '#15803D' },
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Carbon', href: '/carbon' },
  { label: 'Scan', href: '/scan' },
  { label: 'Chat', href: '/chat' },
  { label: 'Rewards', href: '/rewards' },
  { label: 'Machines', href: '/machines' },
];

export const DASHBOARD_NAV: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Carbon', href: '/carbon', icon: '🌍' },
  { label: 'Scan', href: '/scan', icon: '📷' },
  { label: 'Rewards', href: '/rewards', icon: '🎁' },
  { label: 'Machines', href: '/machines', icon: '🤖' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export const ADMIN_NAV: NavItem[] = [
  { label: 'Overview', href: '/admin', icon: '📊' },
  { label: 'Users', href: '/admin', icon: '👥' },
  { label: 'Machines', href: '/admin', icon: '🤖' },
  { label: 'Rewards', href: '/admin', icon: '🎁' },
  { label: 'Telemetry', href: '/admin', icon: '📡' },
  { label: 'Reports', href: '/admin', icon: '📄' },
];

export const MACHINE_COMPONENTS = [
  { name: 'ESP32', icon: '🔌', description: 'Microcontroller' },
  { name: 'Load Cell', icon: '⚖️', description: 'Weight Sensor' },
  { name: 'HX711', icon: '📊', description: 'ADC Amplifier' },
  { name: 'Camera', icon: '📷', description: 'Vision Module' },
  { name: 'QR Scanner', icon: '📱', description: 'Code Reader' },
  { name: 'MQTT', icon: '📡', description: 'IoT Protocol' },
  { name: 'Gemini Vision', icon: '✨', description: 'AI Classifier' },
];

export const MACHINE_WORKFLOW = [
  { step: 1, title: 'Scan QR', description: 'User authenticates via QR code', icon: '📱' },
  { step: 2, title: 'Insert Waste', description: 'Place recyclable material', icon: '♻️' },
  { step: 3, title: 'Measure Weight', description: 'Load cell captures weight', icon: '⚖️' },
  { step: 4, title: 'AI Classify', description: 'Gemini Vision identifies waste', icon: '🤖' },
  { step: 5, title: 'Reward User', description: 'Credits added to wallet', icon: '🎁' },
  { step: 6, title: 'Update Score', description: 'Carbon score updated', icon: '📊' },
];

export const MQTT_TOPICS = {
  STATUS: 'thadam/machine/status',
  WEIGHT: 'thadam/machine/weight',
  IMAGE: 'thadam/machine/image',
  REWARD: 'thadam/machine/reward',
  TELEMETRY: 'thadam/machine/telemetry',
} as const;

export const DEMO_USER = {
  id: 'demo-user-1',
  email: 'demo@thadam.ai',
  name: 'Sanjay Kumar',
  carbonScore: 82,
  totalCarbonSaved: 124,
  ecoRank: 'Climate Champion' as EcoRank,
  rewardBalance: 450,
  streak: 14,
  totalRecycled: 89,
  joinedAt: new Date('2024-01-15'),
};

export const DEMO_CARBON_TWIN = {
  currentFootprint: 3.2,
  projectedFootprint: 1.8,
  treesSaved: 12,
  moneySaved: 8500,
  carbonReduction: 43.75,
  forecast: [
    { month: 'Jan', current: 3.4, projected: 3.2 },
    { month: 'Feb', current: 3.3, projected: 3.0 },
    { month: 'Mar', current: 3.2, projected: 2.7 },
    { month: 'Apr', current: 3.1, projected: 2.4 },
    { month: 'May', current: 3.0, projected: 2.1 },
    { month: 'Jun', current: 2.9, projected: 1.8 },
  ] as CarbonForecast[],
};

export const DEMO_REWARDS: Reward[] = [
  { id: 'r1', title: 'Amazon ₹100 Voucher', description: 'Redeem for Amazon shopping', cost: 200, category: 'voucher', icon: '🛒', available: true },
  { id: 'r2', title: 'Plant a Tree', description: 'We plant a tree on your behalf', cost: 50, category: 'donation', icon: '🌳', available: true },
  { id: 'r3', title: 'Eco Water Bottle', description: 'Stainless steel reusable bottle', cost: 350, category: 'product', icon: '💧', available: true },
  { id: 'r4', title: 'Movie Ticket', description: 'Single movie ticket voucher', cost: 150, category: 'experience', icon: '🎬', available: true },
  { id: 'r5', title: 'Spotify 1 Month', description: 'Premium subscription', cost: 300, category: 'subscription', icon: '🎵', available: true },
  { id: 'r6', title: 'Zomato ₹200', description: 'Food delivery voucher', cost: 250, category: 'voucher', icon: '🍔', available: true },
];

export const DEMO_BADGES: Badge[] = [
  { id: 'b1', name: 'First Scan', description: 'Complete your first waste scan', icon: '📷', rarity: 'common', unlockedAt: new Date('2024-02-01') },
  { id: 'b2', name: 'Week Warrior', description: '7-day recycling streak', icon: '🔥', rarity: 'common', unlockedAt: new Date('2024-02-08') },
  { id: 'b3', name: 'Carbon Cutter', description: 'Reduce carbon by 10kg', icon: '✂️', rarity: 'rare', unlockedAt: new Date('2024-03-15') },
  { id: 'b4', name: 'Machine Master', description: 'Use 5 different machines', icon: '🤖', rarity: 'rare', unlockedAt: new Date('2024-04-01') },
  { id: 'b5', name: 'Century Club', description: 'Recycle 100 items', icon: '💯', rarity: 'epic' },
  { id: 'b6', name: 'Planet Saver', description: 'Save 1 ton of CO₂', icon: '🌍', rarity: 'legendary' },
];

export const DEMO_CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'Daily Recycler', description: 'Recycle 3 items today', type: 'daily', target: 3, reward: 15, startDate: new Date(), endDate: new Date(Date.now() + 86400000), participants: 234 },
  { id: 'c2', title: 'Carbon Slasher', description: 'Reduce carbon by 5kg this week', type: 'weekly', target: 5, reward: 50, startDate: new Date(), endDate: new Date(Date.now() + 604800000), participants: 89 },
  { id: 'c3', title: 'Green Month', description: 'Maintain a 30-day streak', type: 'monthly', target: 30, reward: 200, startDate: new Date(), endDate: new Date(Date.now() + 2592000000), participants: 45 },
];

export const DEMO_COMMUNITY_STATS = {
  totalUsers: 12847,
  totalMachines: 156,
  totalWasteRecycled: 45230,
  totalTreesEquivalent: 3420,
  totalCarbonReduced: 89450,
};

export const DEMO_ANALYTICS_MONTHLY: ChartDataPoint[] = [
  { label: 'Jan', value: 45 },
  { label: 'Feb', value: 52 },
  { label: 'Mar', value: 68 },
  { label: 'Apr', value: 74 },
  { label: 'May', value: 89 },
  { label: 'Jun', value: 95 },
  { label: 'Jul', value: 108 },
  { label: 'Aug', value: 124 },
];

export const DEMO_MACHINES = [
  { id: 'm1', name: 'THADAM-ECO-001', location: 'Chennai Central Station', latitude: 13.0827, longitude: 80.2707, status: 'online' as const, totalWasteProcessed: 1250, lastMaintenance: new Date('2024-04-01'), sensors: [] },
  { id: 'm2', name: 'THADAM-ECO-002', location: 'IIT Madras Campus', latitude: 12.9916, longitude: 80.2336, status: 'online' as const, totalWasteProcessed: 890, lastMaintenance: new Date('2024-04-10'), sensors: [] },
  { id: 'm3', name: 'THADAM-ECO-003', location: 'Marina Beach Entrance', latitude: 13.0500, longitude: 80.2824, status: 'maintenance' as const, totalWasteProcessed: 2100, lastMaintenance: new Date('2024-03-20'), sensors: [] },
  { id: 'm4', name: 'THADAM-ECO-004', location: 'Phoenix Mall', latitude: 12.9925, longitude: 80.2157, status: 'online' as const, totalWasteProcessed: 1780, lastMaintenance: new Date('2024-04-05'), sensors: [] },
];

export const GEMINI_SUGGESTED_PROMPTS = [
  'How can I reduce my carbon footprint?',
  'What are the best recycling practices?',
  'Calculate carbon savings from cycling to work',
  'Tips for sustainable grocery shopping',
  'How does composting help the environment?',
  'What is my eco-score breakdown?',
];

export const GEMINI_SYSTEM_PROMPT = `You are THADAM AI's Sustainability Coach powered by Gemini. You are an expert in carbon footprint calculation, waste management, recycling, sustainable living, environmental science, and green technology. Be encouraging, knowledgeable, practical, and data-driven. Provide specific, actionable advice with relevant statistics. Use metric units.`;
