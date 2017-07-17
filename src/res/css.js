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
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	error__message: {
		marginBottom: 20,
		fontSize: 16,
	},
	error__reload: {
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#f1f1f1',
	},
	error__reloadText: {
		fontSize: 12,
	},

	// // ./StatusBar.js
	// statusBar: {
	// 	position: 'absolute',
	// 	left: 0,
	// 	right: 0,
	// },
	// statusBar__bar: {
	// 	flex: 1,
	// 	backgroundColor: 'rgba(204,204,204,.95)',
	// 	paddingHorizontal: 20,
	// 	justifyContent: 'center',
	// },
	// statusBar__bar_warning: {
	// 	backgroundColor: 'rgba(208,2,27,.95)'
	// },
	// statusBar__bar_success: {
	// 	backgroundColor: 'rgba(65,117,5,.95)'
	// },
	// statusBar__barText: {
	// 	textAlign: 'center',
	// 	fontSize: 12,
	// 	color: '#fff',
	// 	fontWeight: '600',
	// },

});