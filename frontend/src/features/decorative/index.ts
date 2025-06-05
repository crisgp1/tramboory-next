// Barrel export file for decorative components
// This maps the existing components to the modern structure path '@/decorative'

// Re-export components from their current locations
export { AnimatedBalloons } from '../../../components/decorative/AnimatedBalloons';
export { BackgroundVideo } from '../../../components/decorative/BackgroundVideo';
export { ParticlesBackground } from '../../../components/decorative/ParticlesBackground';

// Export background toggle components
export { BackgroundToggleProvider, useBackgroundToggle } from './BackgroundToggleContext';
export { BackgroundToggle } from './BackgroundToggle';