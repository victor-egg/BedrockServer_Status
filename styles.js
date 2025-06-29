tailwind.config = {
	theme: {
		extend: {
			colors: {
				primary: '#6C5CE7',
				secondary: '#00CEFF',
				success: '#00FF94',
				danger: '#FF3E78',
				dark: '#131524',
				darker: '#0F111C',
				card: '#1A1D2E',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			animation: {
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			}
		}
	}
}