import React from 'react';
import { View, Text } from 'react-native';


export default class Error extends React.Component {

	render() {
		const { props } = this;

		return (
			<View>
				<Text>Error component</Text>
			</View>
		);
	}

}