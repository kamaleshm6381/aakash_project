export interface FrameConfig {
  id: 'classic-vision' | 'modern-teal' | 'premium-eyewear';
  name: string;
  description: string;
  badge: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor: string;
  borderColor: string;
  bgStyle: string;
  headlineTop?: string;
  subheadlineTop?: string;
}

export const SHOP_CONFIG = {
  brandName: 'AAKASH',
  brandSubtitle: 'EYE CLINIC & OPTICAL',
  brandTagline: 'PROFESSIONAL EYE CARE',
  fullName: 'AAKASH EYE CLINIC & OPTICAL',
  businessType: 'Eye Clinic & Optical Boutique',
  tagline: 'Try Your Style • Capture Your Look • Share Your Vision',
  landing: {
    heading: 'Find Your Perfect Look',
    subtitle: 'Try your style. Capture your look. Share your vision.',
    primaryButton: 'Start Virtual Photobooth',
    instructionsHeading: 'How It Works',
    steps: [
      {
        num: 1,
        title: 'Choose your spectacles',
        desc: 'Select your preferred frames or try on your chosen eyewear.',
      },
      {
        num: 2,
        title: 'Position yourself in the camera',
        desc: 'Align your face in the vertical 9:16 Instagram Story viewfinder.',
      },
      {
        num: 3,
        title: "Capture your photo with the shop's branded frame",
        desc: 'Choose from our 3 signature optical frames with live preview.',
      },
      {
        num: 4,
        title: 'Download or share your framed photo',
        desc: 'Save high-resolution 1080×1920 Instagram Story photos directly to your device.',
      },
    ],
    privacyMessage: 'Your photos stay private on your device — 100% on-device processing.',
  },
  theme: {
    colors: {
      primary: '#075985',     // Deep Ocean Blue
      secondary: '#0284C7',   // Ocean Blue
      accent: '#22A6BE',      // Bright Teal
      background: '#EAF7FA',  // Ice Blue Background
      surface: '#FFFFFF',     // White Surface
      text: '#172B3A',        // Midnight Slate
      border: '#D6EAF0',      // Soft Border
      gold: '#D4AF37',        // Metallic Gold accent
      goldLight: '#E5C158',   // Light Metallic Gold
    },
    gradient: 'linear-gradient(110deg, #075985 0%, #0284C7 48%, #22A6BE 100%)',
    gradientUsage: ['Primary call-to-action buttons', 'Selected accents', 'Small decorative highlights'],
  },
  frames: [
    {
      id: 'classic-vision',
      name: 'Classic Vision',
      description: 'Clean white frame with slim deep-blue double border. Professional and elegant.',
      badge: 'Classic',
      primaryColor: '#075985',
      secondaryColor: '#0284C7',
      accentColor: '#075985',
      borderColor: '#075985',
      bgStyle: '#FFFFFF',
      headlineTop: 'CLEAR VISION',
      subheadlineTop: 'BRIGHTER TOMORROW',
    },
    {
      id: 'modern-teal',
      name: 'Modern Teal',
      description: 'Elegant blue-to-teal accents with modern curved design.',
      badge: 'Modern',
      primaryColor: '#075985',
      secondaryColor: '#0284C7',
      accentColor: '#22A6BE',
      borderColor: '#22A6BE',
      bgStyle: '#EAF7FA',
      headlineTop: 'SEE BETTER',
      subheadlineTop: 'LOOK BRIGHTER',
    },
    {
      id: 'premium-eyewear',
      name: 'Premium Eyewear',
      description: 'Sophisticated dark-blue frame with metallic-style details. Premium and stylish.',
      badge: 'Premium',
      primaryColor: '#075985',
      secondaryColor: '#172B3A',
      accentColor: '#D4AF37',
      borderColor: '#075985',
      bgStyle: '#172B3A',
      headlineTop: 'PREMIUM EYEWEAR',
      subheadlineTop: 'FOR A CLEARER YOU',
    },
  ] as FrameConfig[],
};

export type FrameId = 'classic-vision' | 'modern-teal' | 'premium-eyewear';
