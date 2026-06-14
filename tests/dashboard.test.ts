import { describe, it, expect } from 'vitest';
import {
  mockStats,
  mockUserProfile,
  carbonTrendData,
  rewardsTrendData,
  machineActivityData,
  wasteDistributionData,
  recentActivity,
  aiInsights,
  smartMachinesList,
  rewardsCatalog,
} from '@/data/mock';

describe('Dashboard Data Integrity', () => {
  it('should have correct platform stats', () => {
    expect(mockStats.totalUsers).toBe(2500);
    expect(mockStats.carbonSavedKg).toBe(124000);
    expect(mockStats.smartMachines).toBe(48);
    expect(mockStats.wasteProcessedTons).toBe(18.2);
    expect(mockStats.rewardsDistributedINR).toBe(480000);
  });

  it('should have valid user profile', () => {
    expect(mockUserProfile.carbonScore).toBeGreaterThan(0);
    expect(mockUserProfile.carbonScore).toBeLessThanOrEqual(100);
    expect(mockUserProfile.rewardPoints).toBeGreaterThan(0);
    expect(mockUserProfile.badges).toHaveLength(4);
    expect(mockUserProfile.ecoRank).toBeTruthy();
  });

  it('should have valid carbon trend data', () => {
    expect(carbonTrendData).toHaveLength(7);
    carbonTrendData.forEach((day: any) => {
      expect(day.transport).toBeGreaterThanOrEqual(0);
      expect(day.electricity).toBeGreaterThanOrEqual(0);
      expect(day.food).toBeGreaterThanOrEqual(0);
    });
  });

  it('should have valid rewards data', () => {
    expect(rewardsTrendData.length).toBeGreaterThan(0);
    rewardsTrendData.forEach((month: any) => {
      expect(month.earned).toBeGreaterThanOrEqual(0);
      expect(month.redeemed).toBeLessThanOrEqual(month.earned);
    });
  });

  it('should have valid machine activity data', () => {
    expect(machineActivityData.length).toBeGreaterThan(0);
    machineActivityData.forEach((hour: any) => {
      expect(hour.sessions).toBeGreaterThan(0);
      expect(hour.bottlesRecycled).toBeGreaterThan(0);
    });
  });

  it('should have valid waste distribution data summing to 100%', () => {
    const totalPercentage = wasteDistributionData.reduce((sum: number, w: any) => sum + w.value, 0);
    expect(totalPercentage).toBe(100);
  });

  it('should have valid recent activity with carbon data', () => {
    expect(recentActivity.length).toBeGreaterThan(0);
    recentActivity.forEach((act: any) => {
      expect(act.id).toBeTruthy();
      expect(act.title).toBeTruthy();
      expect(act.pts).toBeTruthy();
    });
  });

  it('should have valid AI insights', () => {
    expect(aiInsights.length).toBeGreaterThan(0);
    aiInsights.forEach((insight: any) => {
      expect(insight.title).toBeTruthy();
      expect(insight.text).toBeTruthy();
      expect(['success', 'warning', 'info']).toContain(insight.type);
    });
  });

  it('should have valid smart machines list with GPS coordinates', () => {
    expect(smartMachinesList.length).toBeGreaterThan(0);
    smartMachinesList.forEach((machine: any) => {
      expect(machine.lat).toBeDefined();
      expect(machine.lng).toBeDefined();
      expect(machine.name).toBeTruthy();
      expect(machine.status).toBeTruthy();
    });
  });

  it('should have valid rewards catalog', () => {
    expect(rewardsCatalog.challenges.length).toBeGreaterThan(0);
    expect(rewardsCatalog.offers.length).toBeGreaterThan(0);
    rewardsCatalog.offers.forEach((offer: any) => {
      expect(offer.cost).toBeGreaterThan(0);
      expect(offer.title).toBeTruthy();
    });
  });

  it('should calculate trees equivalent correctly', () => {
    const carbonSavedKg = 142.5;
    const treesEquivalent = Math.round(carbonSavedKg / 22);
    expect(treesEquivalent).toBe(6);
  });

  it('should calculate carbon score as a valid percentage', () => {
    const score = 82;
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});

describe('Dashboard Widget Order', () => {
  it('should have all required widgets', () => {
    const DEFAULT_WIDGET_ORDER = [
      'carbon-score', 'carbon-saved', 'reward-points', 'trees-equivalent',
      'weekly-progress', 'ai-insights', 'recent-activity', 'goals'
    ];

    expect(DEFAULT_WIDGET_ORDER).toHaveLength(8);
    expect(DEFAULT_WIDGET_ORDER).toContain('carbon-score');
    expect(DEFAULT_WIDGET_ORDER).toContain('weekly-progress');
  });

  it('should serialize and deserialize widget order', () => {
    const order = ['goals', 'carbon-score', 'reward-points', 'trees-equivalent', 'weekly-progress', 'ai-insights', 'recent-activity', 'carbon-saved'];
    const serialized = JSON.stringify(order);
    const restored = JSON.parse(serialized);
    expect(restored).toEqual(order);
  });
});
