import '@testing-library/jest-dom';
import { vi } from 'vitest';

process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'mock-api-key';

// ---- Mock Firebase ----
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn(() => []),
  getApp: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: null })),
  GoogleAuthProvider: class {
    setCustomParameters = vi.fn();
  },
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((auth, cb) => {
    cb({ uid: 'test-user', displayName: 'Test User', email: 'test@thadam.ai', photoURL: null });
    return vi.fn();
  }),
  getRedirectResult: vi.fn(() => Promise.resolve(null)),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => true, data: () => ({ role: 'USER' }) })),
  setDoc: vi.fn(),
  collection: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn(() => Promise.resolve({ empty: true, forEach: vi.fn() })),
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn(),
  ref: vi.fn(),
  uploadBytes: vi.fn(),
  getDownloadURL: vi.fn(() => Promise.resolve('https://mock-url')),
}));

// ---- Mock Next.js ----
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    const { src, alt, width, height, priority, ...rest } = props;
    const imgSrc = typeof src === 'string' ? src : (src?.src || '/mock-image.jpg');
    const React = require('react');
    return React.createElement('img', { src: imgSrc, alt: alt || '', width, height, ...rest });
  },
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: any) => {
    const React = require('react');
    return React.createElement('a', { href, ...rest }, children);
  },
}));

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (loader: any, opts: any) => {
    const Component = (props: any) => null;
    Component.displayName = 'DynamicComponent';
    return Component;
  },
}));

// ---- Mock Framer Motion ----
vi.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_, tag: string) => {
      const Component = ({ children, ...props }: any) => {
        const { initial, animate, exit, whileHover, whileTap, whileInView, viewport, transition, variants, layout, layoutId, ...domProps } = props;
        if (tag === 'button' || tag === 'div' || tag === 'span' || tag === 'section' || tag === 'circle' || tag === 'path' || tag === 'nav' || tag === 'a' || tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'li' || tag === 'ul' || tag === 'input' || tag === 'textarea' || tag === 'form') {
          // Filter out non-DOM props for clean rendering
          const safeDomProps: Record<string, any> = {};
          for (const [key, val] of Object.entries(domProps)) {
            if (typeof val !== 'object' || key === 'style' || key === 'className' || key === 'dangerouslySetInnerHTML') {
              safeDomProps[key] = val;
            }
          }
          // Create a React element with children for testability
          const React = require('react');
          return React.createElement(tag, safeDomProps, children);
        }
        const React = require('react');
        return React.createElement(tag, domProps, children);
      };
      Component.displayName = `motion.${tag}`;
      return Component;
    },
  }),
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
  useMotionValue: () => ({ get: () => 0, set: vi.fn() }),
  useSpring: () => ({ get: () => 0, set: vi.fn() }),
}));

// ---- Mock Google Maps ----
vi.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: any) => {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'google-map' }, children);
  },
  useLoadScript: vi.fn(() => ({ isLoaded: true, loadError: null })),
  Marker: (props: any) => {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'map-marker' }, props.children);
  },
  InfoWindow: ({ children }: any) => {
    const React = require('react');
    return React.createElement('div', { 'data-testid': 'info-window' }, children);
  },
}));

Object.defineProperty(window, 'google', {
  value: {
    maps: {
      Point: class {
        constructor(x: number, y: number) {}
      }
    }
  }
});

// ---- Mock MQTT ----
vi.mock('@/lib/mqtt', () => ({
  publish: vi.fn(),
  MQTT_TOPICS: {
    MACHINE_STATUS: 'thadam/machine/status',
    MACHINE_REWARD: 'thadam/machine/reward',
    CARBON_UPDATE: 'thadam/carbon/update',
  },
}));

// ---- Mock Prisma ----
vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      upsert: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
    },
    carbonAssessment: {
      create: vi.fn(),
      findMany: vi.fn(),
      aggregate: vi.fn(),
    },
    machine: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    machineTransaction: {
      create: vi.fn(),
    },
    reward: {
      create: vi.fn(),
      findMany: vi.fn(),
      aggregate: vi.fn(),
    },
  },
}));

// ---- Mock Firebase Admin ----
vi.mock('@/lib/firebase-admin', () => ({
  adminFirestore: {
    collection: vi.fn(() => ({
      add: vi.fn(),
      doc: vi.fn(() => ({
        set: vi.fn(),
        update: vi.fn(),
        get: vi.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
      })),
    })),
  },
  adminAuth: {
    verifyIdToken: vi.fn(),
    verifySessionCookie: vi.fn(),
    createSessionCookie: vi.fn(),
  },
}));

// ---- Mock auth-helpers for server components ----
vi.mock('@/lib/auth-helpers', () => ({
  verifyIdToken: vi.fn(),
  createSessionCookie: vi.fn(),
  setSessionCookie: vi.fn(),
  clearSessionCookie: vi.fn(),
  getCurrentUser: vi.fn(),
}));

// ---- Mock localStorage ----
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get length() { return Object.keys(store).length; },
    key: vi.fn((i: number) => Object.keys(store)[i] || null),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// ---- Mock matchMedia ----
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('dark'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ---- Mock IntersectionObserver ----
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
}
Object.defineProperty(window, 'IntersectionObserver', { value: MockIntersectionObserver });

// ---- Mock ResizeObserver ----
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
Object.defineProperty(window, 'ResizeObserver', { value: MockResizeObserver });

// ---- Mock scrollIntoView ----
Element.prototype.scrollIntoView = vi.fn();

// ---- Mock requestAnimationFrame ----
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0) as unknown as number;
  globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id);
}

// ---- Suppress console errors in tests ----
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  // Suppress specific React/test warnings that are noisy but non-actionable
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (
    msg.includes('Warning: ReactDOM.render is no longer supported') ||
    msg.includes('act(') ||
    msg.includes('Each child in a list')
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};
