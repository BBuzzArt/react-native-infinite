import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import css from './css';


export default class Indicator extends React.Component {

	static defaultProps = {
		style: null
	};

	render() {
		const { props } = this;

		return (
			<View style={css.loading}>
				<ActivityIndicator animating={true} size="small" style={[ css.loading__body, props.style ]}/>
			</View>
		);
	}

}

