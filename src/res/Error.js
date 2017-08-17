import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import css from './css';


export default class Error extends React.Component {

	static propTypes = {
		message: PropTypes.string,
	};
	static defaultProps = {
		message: 'error message',
		onReload: null,
	};

	render() {
		const { props } = this;

		return (
			<View style={css.error}>
				<Text style={css.error__message}>{props.message}</Text>
				{props.onReload && (
					<TouchableOpacity activeOpacity={.75} onPress={props.onReload} style={css.error__reload}>
						<Text style={css.error__reloadText}>Reload</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}

}