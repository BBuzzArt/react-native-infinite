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
		fontSize: 14,
		color: '#222',
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

});