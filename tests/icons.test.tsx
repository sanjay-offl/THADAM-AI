import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { 
  Menu, X, LogOut, Settings, LayoutDashboard, ChevronDown, UserIcon
} from '@/components/ui/Icons';

describe('Icons', () => {
  it('should render all icons without errors', () => {
    const icons = [
      Menu, X, LogOut, Settings, LayoutDashboard, ChevronDown, UserIcon
    ];
    
    icons.forEach(Icon => {
      const { container } = render(<Icon size={24} color="red" className="test-class" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });
  });
});
