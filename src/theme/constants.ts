export const theme = {
  colors: {
    primary: '#545151',    // Green color used for links and highlights
    background: '#030303', // Dark background
    text: {
      primary: '#19b4ce', // Semi-transparent white for main text
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