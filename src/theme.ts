'use client';
import { Poppins, Figtree } from 'next/font/google';
import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    '100'?: string;
    '200'?: string;
    '300'?: string;
    '400'?: string;
    '500'?: string;
    '600'?: string;
    '700'?: string;
    '800'?: string;
    '900'?: string;
  }

  interface Palette {
    neutrals: PaletteColor;
  }
  interface PaletteOptions {
    neutrals?: PaletteColor;
  }
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const figtree = Figtree({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: '#B62450',
      light: '#EC1B52',
      dark: '#88162F',
      contrastText: '#FFFFFF',
    },
    neutrals: {
      main: '#212120',
      light: '#FFFFFF',
      dark: '#000000',
      contrastText: '#000000',
      '100': '#E4E4E4',
      '200': '#CFCECE',
      '300': '#BAB8B8',
      '400': '#A5A1A1',
      '500': '#908B8B',
      '600': '#7A7474',
      '700': '#655F5F',
      '800': '#4E4949',
      '900': '#383434',
    },
    error: {
      light: '#FFB6B6',
      main: '#FF6D6D',
      dark: '#CA0000',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#FFE6AA',
      main: '#FFCC55',
      dark: '#B37D00',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#AFEEB8',
      main: '#5EDD72',
      dark: '#1B7F2A',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: `${figtree.style.fontFamily}, ${poppins.style.fontFamily}, sans-serif`,
    button: {
      textTransform: 'none',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;