import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import AmbientLight from '@/components/backgrounds/AmbientLight';
import AuroraEffect from '@/components/backgrounds/AuroraEffect';
import DottedGrid from '@/components/backgrounds/DottedGrid';
import EcoParticles from '@/components/backgrounds/EcoParticles';
import FloatingLeaves from '@/components/backgrounds/FloatingLeaves';
import GradientMesh from '@/components/backgrounds/GradientMesh';
import ParticleField from '@/components/backgrounds/ParticleField';

describe('Background Components', () => {
  it('should render AmbientLight', () => {
    const { container } = render(<AmbientLight />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render AuroraEffect', () => {
    const { container } = render(<AuroraEffect />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render DottedGrid', () => {
    const { container } = render(<DottedGrid />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render EcoParticles', () => {
    const { container } = render(<EcoParticles />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render FloatingLeaves', () => {
    const { container } = render(<FloatingLeaves />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render GradientMesh', () => {
    const { container } = render(<GradientMesh />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render ParticleField', () => {
    const { container } = render(<ParticleField />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
