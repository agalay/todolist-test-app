import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	typography: {
		fontSize: 14,
		h1: {
			fontWeight: 600,
			fontSize: 36,
			fontFamily: 'var(--title-font)',
		},
		h2: {
			fontWeight: 600,
			fontSize: 24,
		}
	},
	palette: {
		primary: {
			main: '#366EFF',
		},
		success: {
			main: '#10C200',
		},
		secondary: {
			main: '#F4F4F4'
		}
	}
});
