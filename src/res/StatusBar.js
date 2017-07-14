import React from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import css from './css';


export default class StatusBar extends React.Component {

	static defaultProps = {
		height: 34,
		delay: 3000,
		color: null,
		message: 'message',
	};

	constructor(props) {
		super();

		this.timer = null;
		this.state = {
			anim: new Animated.Value(0),
		};
	}

	open(color, message) {
		const { props, state } = this;

		// clear timer
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
		}

		// play animate
		Animated.timing(state.anim, {
			easing: Easing.out(Easing.ease),
			duration: 200,
			toValue: 1
		}).start(() => {
			this.timer = setTimeout(() => this.close(), props.delay);
		});
	}

	close() {
		const { props, state } = this;

		// play animate
		Animated.timing(state.anim, {
			easing: Easing.out(Easing.ease),
			duration: 200,
			toValue: 0
		}).start();
	}

	render() {
		const { props, state } = this;
		let top = state.anim.interpolate({
			inputRange: [0, 1],
			outputRange: [0 - props.height, 0]
		});

		return (
			<Animated.View style={[
				css.statusBar,
				{
					height: props.height,
					top: top,
				}
			]}>
				<View style={[ css.bar, css[`bar_${props.color}`] ]}>
					<Text numberOfLines={1} style={css.bar__text}>{props.message}</Text>
				</View>
			</Animated.View>
		);
	}

}