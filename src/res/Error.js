import React from 'react';
import { View, Text } from 'react-native';

import css from './css';


export default class Error extends React.Component {

	render() {
		const { props } = this;

		return (
			<View style={css.error}>
				<View style={css.error__wrap}>
					<Text style={css.error__message}>Error component</Text>
				</View>
			</View>
		);
	}

}