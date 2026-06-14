import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';

// Component imports - we need to test each UI component
// Since many components use framer-motion and need ThemeProvider,
// we create a wrapper

// ---- Test ThemeProvider ----
describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should provide default dark theme', async () => {
    const { useTheme, ThemeProvider } = await import('@/providers/ThemeProvider');
    
    function TestConsumer() {
      const { theme } = useTheme();
      return <div data-testid="theme">{theme}</div>;
    }

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    // Initially dark (matchMedia mock returns dark)
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('should toggle theme', async () => {
    const { useTheme, ThemeProvider } = await import('@/providers/ThemeProvider');
    
    function TestConsumer() {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <button onClick={toggleTheme} data-testid="toggle">Toggle</button>
        </div>
      );
    }

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    
    act(() => {
      fireEvent.click(screen.getByTestId('toggle'));
    });
    
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('should throw error when used outside provider', async () => {
    const { useTheme } = await import('@/providers/ThemeProvider');
    
    function BadConsumer() {
      const { theme } = useTheme();
      return <div>{theme}</div>;
    }

    expect(() => render(<BadConsumer />)).toThrow('useTheme must be used within a ThemeProvider');
  });

  it('should save theme to localStorage', async () => {
    const { useTheme, ThemeProvider } = await import('@/providers/ThemeProvider');
    
    function TestConsumer() {
      const { setTheme } = useTheme();
      return <button onClick={() => setTheme('light')} data-testid="set-light">Set Light</button>;
    }

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('set-light'));
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('thadam-theme', 'light');
  });
});

// ---- Test Badge Component ----
describe('Badge Component', () => {
  it('should render children', async () => {
    const Badge = (await import('@/components/ui/Badge')).default;
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('should apply variant class', async () => {
    const Badge = (await import('@/components/ui/Badge')).default;
    const { container } = render(<Badge variant="accent">Accent</Badge>);
    expect(container.querySelector('.badge-accent')).toBeInTheDocument();
  });

  it('should apply default variant', async () => {
    const Badge = (await import('@/components/ui/Badge')).default;
    const { container } = render(<Badge>Default</Badge>);
    expect(container.querySelector('.badge')).toBeInTheDocument();
  });

  it('should render dot indicator', async () => {
    const Badge = (await import('@/components/ui/Badge')).default;
    const { container } = render(<Badge dot>With Dot</Badge>);
    // The dot renders as a span with specific styles
    const badge = container.querySelector('.badge');
    expect(badge?.children.length).toBeGreaterThan(0);
  });

  it('should apply custom className', async () => {
    const Badge = (await import('@/components/ui/Badge')).default;
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should render warning variant', async () => {
    const Badge = (await import('@/components/ui/Badge')).default;
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.querySelector('.badge-warning')).toBeInTheDocument();
  });

  it('should render danger variant', async () => {
    const Badge = (await import('@/components/ui/Badge')).default;
    const { container } = render(<Badge variant="danger">Danger</Badge>);
    expect(container.querySelector('.badge-danger')).toBeInTheDocument();
  });
});

// ---- Test Button Component ----
describe('Button Component', () => {
  it('should render children', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should apply primary variant by default', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    const { container } = render(<Button>Primary</Button>);
    expect(container.querySelector('.btn-primary')).toBeInTheDocument();
  });

  it('should apply secondary variant', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.querySelector('.btn-secondary')).toBeInTheDocument();
  });

  it('should apply ghost variant', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.querySelector('.btn-ghost')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled').closest('button')).toBeDisabled();
  });

  it('should be disabled when loading', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('Loading').closest('button')).toBeDisabled();
  });

  it('should show loading spinner when loading', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    const { container } = render(<Button loading>Loading</Button>);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should apply size classes', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    const { container } = render(<Button size="sm">Small</Button>);
    expect(container.querySelector('.btn-sm')).toBeInTheDocument();
  });

  it('should render icon', async () => {
    const Button = (await import('@/components/ui/Button')).default;
    render(<Button icon={<span data-testid="icon">🌱</span>}>With Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});

// ---- Test GlassCard Component ----
describe('GlassCard Component', () => {
  it('should render children', async () => {
    const GlassCard = (await import('@/components/ui/GlassCard')).default;
    render(<GlassCard>Card Content</GlassCard>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('should apply default glass class', async () => {
    const GlassCard = (await import('@/components/ui/GlassCard')).default;
    const { container } = render(<GlassCard>Content</GlassCard>);
    expect(container.querySelector('.glass')).toBeInTheDocument();
  });

  it('should apply variant classes', async () => {
    const GlassCard = (await import('@/components/ui/GlassCard')).default;
    
    const variants = ['subtle', 'strong', 'glow', 'float'] as const;
    for (const variant of variants) {
      const { container, unmount } = render(<GlassCard variant={variant}>Content</GlassCard>);
      expect(container.querySelector(`.glass-${variant}`)).toBeInTheDocument();
      unmount();
    }
  });

  it('should handle click events', async () => {
    const GlassCard = (await import('@/components/ui/GlassCard')).default;
    const handleClick = vi.fn();
    render(<GlassCard onClick={handleClick}>Clickable</GlassCard>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', async () => {
    const GlassCard = (await import('@/components/ui/GlassCard')).default;
    const { container } = render(<GlassCard className="custom">Custom</GlassCard>);
    expect(container.querySelector('.custom')).toBeInTheDocument();
  });

  it('should apply custom padding', async () => {
    const GlassCard = (await import('@/components/ui/GlassCard')).default;
    const { container } = render(<GlassCard padding="0">No Padding</GlassCard>);
    const card = container.firstElementChild;
    expect(card).toHaveStyle({ padding: '0' });
  });
});

// ---- Test Counter Component ----
describe('Counter Component', () => {
  it('should render initial value', async () => {
    const Counter = (await import('@/components/ui/Counter')).default;
    render(<Counter value={100} />);
    // Counter starts at 0 and animates, but the component should exist
    const span = screen.getByText(/\d/);
    expect(span).toBeInTheDocument();
  });

  it('should display prefix and suffix', async () => {
    const Counter = (await import('@/components/ui/Counter')).default;
    render(<Counter value={50} prefix="₹" suffix="+" />);
    const container = document.body;
    expect(container.textContent).toContain('₹');
    expect(container.textContent).toContain('+');
  });

  it('should apply className', async () => {
    const Counter = (await import('@/components/ui/Counter')).default;
    const { container } = render(<Counter value={100} className="test-counter" />);
    expect(container.querySelector('.test-counter')).toBeInTheDocument();
  });
});

// ---- Test ProgressRing Component ----
describe('ProgressRing Component', () => {
  it('should render SVG', async () => {
    const ProgressRing = (await import('@/components/ui/ProgressRing')).default;
    const { container } = render(<ProgressRing value={75} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should display value when showValue is true', async () => {
    const ProgressRing = (await import('@/components/ui/ProgressRing')).default;
    render(<ProgressRing value={75} showValue />);
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('should display label', async () => {
    const ProgressRing = (await import('@/components/ui/ProgressRing')).default;
    render(<ProgressRing value={75} label="Score" />);
    expect(screen.getByText('Score')).toBeInTheDocument();
  });

  it('should hide value when showValue is false', async () => {
    const ProgressRing = (await import('@/components/ui/ProgressRing')).default;
    render(<ProgressRing value={75} showValue={false} />);
    expect(screen.queryByText('75')).not.toBeInTheDocument();
  });

  it('should render two circles (bg + progress)', async () => {
    const ProgressRing = (await import('@/components/ui/ProgressRing')).default;
    const { container } = render(<ProgressRing value={50} />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThanOrEqual(2);
  });

  it('should apply custom size', async () => {
    const ProgressRing = (await import('@/components/ui/ProgressRing')).default;
    const { container } = render(<ProgressRing value={50} size={200} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('200');
  });
});
