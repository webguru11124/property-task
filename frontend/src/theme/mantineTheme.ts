import { createTheme } from '@mantine/core';
import type { MantineColorsTuple, MantineTheme } from '@mantine/core';

const brandColor: MantineColorsTuple = [
  '#f4f0ff',
  '#e6deff',
  '#cbb9ff',
  '#ae91ff',
  '#976fff',
  '#8b5cf6',
  '#8253f4',
  '#7145d9',
  '#663dc2',
  '#5a34ab'
];

const primaryColor: MantineColorsTuple = [
  '#f0f9ff',
  '#e0f2fe',
  '#bae6fd',
  '#7dd3fc',
  '#38bdf8',
  '#0ea5e9',
  '#0284c7',
  '#0369a1',
  '#075985',
  '#0c4a6e'
];

export const mantineTheme = createTheme({
  fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  headings: {
    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.75rem', lineHeight: '1.4' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', lineHeight: '1.5' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
    },
  },

  colors: {
    brand: brandColor,
    primary: primaryColor,
  },

  primaryColor: 'brand',
  primaryShade: { light: 5, dark: 7 },

  defaultRadius: 'md',

  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  },

  components: {
    Button: {
      defaultProps: {
        size: 'md',
        variant: 'filled',
      },
      styles: (theme: MantineTheme) => ({
        root: {
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: theme.shadows.md,
          },
        },
      }),
    },

    TextInput: {
      defaultProps: {
        size: 'md',
      },
      styles: (theme: MantineTheme) => ({
        input: {
          '&:focus': {
            borderColor: theme.colors.brand[5],
            boxShadow: `0 0 0 2px ${theme.colors.brand[1]}`,
          },
        },
      }),
    },

    Paper: {
      defaultProps: {
        shadow: 'sm',
        radius: 'lg',
        p: 'lg',
      },
      styles: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        },
      },
    },

    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'lg',
        withBorder: false,
      },
      styles: (theme: MantineTheme) => ({
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows.lg,
          },
        },
      }),
    },

    Badge: {
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    },

    Notification: {
      defaultProps: {
        radius: 'md',
      },
    },
  },

  other: {
    transitions: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    gradients: {
      brand: 'linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%)',
      primary: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
      success: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      error: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
    },
  },
});