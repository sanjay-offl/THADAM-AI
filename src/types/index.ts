// ============================================
// THADAM AI — TypeScript Types
// ============================================

// ---- User ----
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  carbonScore: number;
  totalCarbonSaved: number;
  ecoRank: EcoRank;
  rewardBalance: number;
  streak: number;
  totalRecycled: number;
  joinedAt: Date;
}

export type EcoRank =
  | 'Eco Beginner'
  | 'Green Warrior'
  | 'Climate Champion'
  | 'Earth Guardian'
  | 'Planet Protector';

// ---- Carbon ----
export interface CarbonAssessment {
  id: string;
  userId: string;
  transport: number;
  energy: number;
  food: number;
  shopping: number;
  totalFootprint: number;
  createdAt: Date;
}

export interface CarbonLog {
  id: string;
  userId: string;
  category: CarbonCategory;
  amount: number;
  unit: string;
  description: string;
  carbonImpact: number;
  date: Date;
}

export type CarbonCategory =
  | 'transport'
  | 'energy'
  | 'food'
  | 'shopping'
  | 'waste'
  | 'water';

export interface CarbonTwin {
  currentFootprint: number;
  projectedFootprint: number;
  treesSaved: number;
  moneySaved: number;
  carbonReduction: number;
  forecast: CarbonForecast[];
}

export interface CarbonForecast {
  month: string;
  current: number;
  projected: number;
}

// ---- Machine ----
export interface Machine {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: MachineStatus;
  totalWasteProcessed: number;
  lastMaintenance: Date;
  sensors: MachineSensor[];
}

export type MachineStatus = 'online' | 'offline' | 'maintenance' | 'full';

export interface MachineSensor {
  type: string;
  value: number;
  unit: string;
  lastUpdated: Date;
}

export interface MachineTelemetry {
  id: string;
  machineId: string;
  weight: number;
  wasteType: string;
  confidence: number;
  imageUrl?: string;
  timestamp: Date;
}

// ---- Rewards ----
export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: RewardCategory;
  icon: string;
  available: boolean;
  expiresAt?: Date;
}

export type RewardCategory =
  | 'voucher'
  | 'donation'
  | 'product'
  | 'experience'
  | 'subscription';

export interface Transaction {
  id: string;
  userId: string;
  type: 'earn' | 'redeem';
  amount: number;
  description: string;
  rewardId?: string;
  createdAt: Date;
}

// ---- Challenges & Gamification ----
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  target: number;
  reward: number;
  startDate: Date;
  endDate: Date;
  participants: number;
}

export type ChallengeType =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'special';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  score: number;
  carbonSaved: number;
}

// ---- AI ----
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIConversation {
  id: string;
  userId: string;
  title: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WasteScanResult {
  wasteType: string;
  recyclability: string;
  carbonImpact: number;
  disposalMethod: string;
  confidence: number;
  suggestions: string[];
}

// ---- Analytics ----
export interface AnalyticsData {
  carbonSaved: ChartDataPoint[];
  treesEquivalent: ChartDataPoint[];
  wasteRecycled: ChartDataPoint[];
  rewardsEarned: ChartDataPoint[];
  carbonForecast: ChartDataPoint[];
  communityImpact: ChartDataPoint[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  previousValue?: number;
}

// ---- Community ----
export interface CommunityStats {
  totalUsers: number;
  totalMachines: number;
  totalWasteRecycled: number;
  totalTreesEquivalent: number;
  totalCarbonReduced: number;
}

// ---- MQTT ----
export interface MQTTMessage {
  topic: string;
  payload: Record<string, unknown>;
  timestamp: Date;
}

// ---- Theme ----
export type Theme = 'dark' | 'light';

// ---- Navigation ----
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}
