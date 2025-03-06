export const theme = {
  colors: {
    primary: '#00bd7e',    // Green color used for links and highlights
    background: '#181818', // Dark background
    text: {
      primary: '#EBEBEBA3', // Semi-transparent white for main text
    },
    border: {
      primary: '#FFFFFF',   // White color for borders
      dashed: '#FFFFFF',    // White color for dashed borders
      separator: '#FFFFFF'  // White color for line breaks
    }
  }
} as const;

// Type for theme to ensure type safety
export type Theme = typeof theme;

// Helper function to access theme values with type safety
export const getThemeValue = <T extends keyof Theme>(key: T): Theme[T] => theme[key]; 