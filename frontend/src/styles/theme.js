import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#FF4081',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#2196F3',
    },
    h5: {
      fontWeight: 600,
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: '0 1px 1px rgba(0,0,0,0.12)',
        '&:hover': {
          boxShadow: '0 2px 4px rgba(0,0,0,0.16)',
        },
      },
    },
    MuiCard: {
      root: {
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;