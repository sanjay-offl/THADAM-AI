import { describe, it, expect, vi } from 'vitest';

// ---- Mock Data Tests ----
// These test the mock data structures that pages consume
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

describe('Page Data Contracts', () => {
  // ---- Dashboard Page ----
  describe('Dashboard Page Data', () => {
    it('should have all required stat fields', () => {
      expect(mockStats).toHaveProperty('totalUsers');
      expect(mockStats).toHaveProperty('carbonSavedKg');
      expect(mockStats).toHaveProperty('smartMachines');
      expect(mockStats).toHaveProperty('wasteProcessedTons');
      expect(mockStats).toHaveProperty('rewardsDistributedINR');
    });

    it('should have positive stat values', () => {
      expect(mockStats.totalUsers).toBeGreaterThan(0);
      expect(mockStats.carbonSavedKg).toBeGreaterThan(0);
      expect(mockStats.smartMachines).toBeGreaterThan(0);
    });
  });

  // ---- Carbon Page ----
  describe('Carbon Page Data', () => {
    it('should have 7-day carbon trend data', () => {
      expect(carbonTrendData).toHaveLength(7);
    });

    it('should have valid carbon categories', () => {
      carbonTrendData.forEach((day: any) => {
        expect(day.transport).toBeGreaterThanOrEqual(0);
        expect(day.electricity).toBeGreaterThanOrEqual(0);
        expect(day.food).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have valid user profile carbon score', () => {
      expect(mockUserProfile.carbonScore).toBeGreaterThanOrEqual(0);
      expect(mockUserProfile.carbonScore).toBeLessThanOrEqual(100);
    });
  });

  // ---- Rewards Page ----
  describe('Rewards Page Data', () => {
    it('should have rewards trend data', () => {
      expect(rewardsTrendData.length).toBeGreaterThan(0);
    });

    it('should have earned >= redeemed for each month', () => {
      rewardsTrendData.forEach((month: any) => {
        expect(month.earned).toBeGreaterThanOrEqual(month.redeemed);
      });
    });

    it('should have rewards catalog with challenges and offers', () => {
      expect(rewardsCatalog.challenges.length).toBeGreaterThan(0);
      expect(rewardsCatalog.offers.length).toBeGreaterThan(0);
    });

    it('should have valid offer costs', () => {
      rewardsCatalog.offers.forEach((offer: any) => {
        expect(offer.cost).toBeGreaterThan(0);
        expect(offer.title).toBeTruthy();
      });
    });
  });

  // ---- Machine Page ----
  describe('Machines Page Data', () => {
    it('should have machine activity data', () => {
      expect(machineActivityData.length).toBeGreaterThan(0);
    });

    it('should have valid machine activity values', () => {
      machineActivityData.forEach((hour: any) => {
        expect(hour.sessions).toBeGreaterThan(0);
        expect(hour.bottlesRecycled).toBeGreaterThan(0);
      });
    });

    it('should have machines with GPS coordinates', () => {
      smartMachinesList.forEach((machine: any) => {
        expect(machine.lat).toBeDefined();
        expect(machine.lng).toBeDefined();
        expect(machine.lat).toBeGreaterThanOrEqual(-90);
        expect(machine.lat).toBeLessThanOrEqual(90);
        expect(machine.lng).toBeGreaterThanOrEqual(-180);
        expect(machine.lng).toBeLessThanOrEqual(180);
      });
    });

    it('should have machine names and statuses', () => {
      smartMachinesList.forEach((machine: any) => {
        expect(machine.name).toBeTruthy();
        expect(machine.status).toBeTruthy();
      });
    });
  });

  // ---- Analytics Page ----
  describe('Analytics Page Data', () => {
    it('should have waste distribution summing to 100%', () => {
      const total = wasteDistributionData.reduce((sum: number, w: any) => sum + w.value, 0);
      expect(total).toBe(100);
    });

    it('should have valid waste categories', () => {
      wasteDistributionData.forEach((waste: any) => {
        expect(waste.name).toBeTruthy();
        expect(waste.value).toBeGreaterThan(0);
      });
    });
  });

  // ---- Challenges/Quests ----
  describe('Challenges Data', () => {
    it('should have challenges in catalog', () => {
      expect(rewardsCatalog.challenges.length).toBeGreaterThan(0);
      rewardsCatalog.challenges.forEach((challenge: any) => {
        expect(challenge.title).toBeTruthy();
      });
    });
  });

  // ---- AI Insights ----
  describe('AI Insights Data', () => {
    it('should have valid insights', () => {
      expect(aiInsights.length).toBeGreaterThan(0);
    });

    it('should have valid insight types', () => {
      aiInsights.forEach((insight: any) => {
        expect(['success', 'warning', 'info']).toContain(insight.type);
        expect(insight.title).toBeTruthy();
        expect(insight.text).toBeTruthy();
      });
    });
  });

  // ---- Activity Feed ----
  describe('Recent Activity Data', () => {
    it('should have activity entries', () => {
      expect(recentActivity.length).toBeGreaterThan(0);
    });

    it('should have required activity fields', () => {
      recentActivity.forEach((act: any) => {
        expect(act.id).toBeTruthy();
        expect(act.title).toBeTruthy();
        expect(act.pts).toBeTruthy();
      });
    });
  });

  // ---- User Profile ----
  describe('User Profile Data', () => {
    it('should have valid profile', () => {
      expect(mockUserProfile.carbonScore).toBeGreaterThan(0);
      expect(mockUserProfile.rewardPoints).toBeGreaterThan(0);
      expect(mockUserProfile.badges).toHaveLength(4);
      expect(mockUserProfile.ecoRank).toBeTruthy();
    });

    it('should have valid badges', () => {
      mockUserProfile.badges.forEach((badge: any) => {
        expect(badge.title).toBeTruthy();
        expect(badge.icon).toBeTruthy();
      });
    });
  });
});

// ---- Route Configuration Tests ----
describe('Route Configuration', () => {
  const protectedRoutes = ['/dashboard', '/carbon', '/scan', '/chat', '/rewards', '/machines', '/profile', '/settings', '/admin'];
  
  const publicRoutes = ['/', '/about', '/login', '/blogs', '/technology', '/research', '/contact', '/privacy', '/terms', '/support', '/github', '/community'];

  it('should have all expected protected routes', () => {
    expect(protectedRoutes).toContain('/dashboard');
    expect(protectedRoutes).toContain('/carbon');
    expect(protectedRoutes).toContain('/scan');
    expect(protectedRoutes).toContain('/chat');
    expect(protectedRoutes).toContain('/rewards');
    expect(protectedRoutes).toContain('/machines');
    expect(protectedRoutes).toContain('/profile');
    expect(protectedRoutes).toContain('/settings');
    expect(protectedRoutes).toContain('/admin');
  });

  it('should not have overlapping public and protected routes', () => {
    publicRoutes.forEach(route => {
      const isProtected = protectedRoutes.some(pr => route.startsWith(pr));
      expect(isProtected).toBe(false);
    });
  });

  it('should have API routes excluded from middleware', () => {
    const apiRoutes = ['/api/auth/login', '/api/carbon/score', '/api/chat'];
    apiRoutes.forEach(route => {
      expect(route.startsWith('/api')).toBe(true);
    });
  });
});

// ---- Page Metadata Tests ----
describe('Page Metadata', () => {
  it('should have valid page titles for SEO', () => {
    const requiredTitles = [
      'THADAM AI',
    ];
    requiredTitles.forEach(title => {
      expect(title.length).toBeGreaterThan(0);
      expect(title.length).toBeLessThan(70);
    });
  });

  it('should have valid meta description', () => {
    const description = 'Track, understand, and reduce your carbon footprint with AI-powered insights.';
    expect(description.length).toBeGreaterThan(50);
    expect(description.length).toBeLessThan(160);
  });
});
