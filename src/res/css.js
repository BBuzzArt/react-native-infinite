import { StyleSheet } from 'react-native';


export default StyleSheet.create({

	// ./Indicator.js
	loading: {
		paddingVertical: 20,
	},
	loading__body: {

	},

	// ./Error.js
	error: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: 'transparent',
	},
	error__wrap: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	error__message: {},

	// ./StatusBar.js
	statusBar: {
		position: 'absolute',
		left: 0,
		right: 0,
	},

	// ./Bar.js
	bar: {
		flex: 1,
		backgroundColor: 'rgba(204,204,204,.95)',
		paddingHorizontal: 20,
		justifyContent: 'center',
	},
	bar_warning: { backgroundColor: 'rgba(208,2,27,.95)' },
	bar_success: { backgroundColor: 'rgba(65,117,5,.95)' },
	bar__text: {
		textAlign: 'center',
		fontSize: 12,
		color: '#fff',
		fontWeight: '600',
	},
});