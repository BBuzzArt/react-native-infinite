import React from 'react';
import { View, Text, Animated, Easing } from 'react-native';

import css from './css';


export default class StatusBar extends React.Component {

	static defaultProps = {
		height: 32,
		delay: 2000,
		speed: 200,
	};

	constructor(props) {
		super();

		this.timer = null;
		this.state = {
			anim: new Animated.Value(0),
			color: null,
			message: ''
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { state } = this;

		//if (state.stamp !== nextState.stamp) return true;
		if (state !== nextState) return true;

		return false;
	}

	open(color, message, delay) {
		const { props, state } = this;

		console.warn('OPEN STATUS BAR');

		// clear timer
		if (this.timer) {
			console.log('CLEAR TIMEOUT')
			clearTimeout(this.timer);
			this.timer = null;
		}

		this.setState({ color, message }, () => {
			// play animate
			Animated.timing(state.anim, {
				easing: Easing.out(Easing.ease),
				duration: props.speed,
				toValue: 1
			}).start(() => {
				this.timer = setTimeout(() => this.close(), delay || props.delay);
			});
		});
	}

	close() {
		const { props, state } = this;

		console.warn('CLOSE()');

		// play animate
		Animated.timing(state.anim, {
			easing: Easing.out(Easing.ease),
			duration: props.speed,
			toValue: 0
		}).start();

		this.setState({ stamp: state.stamp + 1 });
	}

	render() {
		const { props, state } = this;
		let top = state.anim.interpolate({
			inputRange: [0, 1],
			outputRange: [0 - props.height, 0]
		});

		console.warn('STATUS BAR RENDER');

		return (
			<Animated.View style={[
				css.statusBar,
				{
					height: props.height,
					top: top,
				}
			]}>
				<View style={[ css.statusBar__bar, css[`statusBar__bar_${state.color}`] ]}>
					<Text
						numberOfLines={1}
						style={[
							css.statusBar__barText,
							css[`statusBar__barText_${state.color}`],
						]}>
						{state.message}
					</Text>
				</View>
			</Animated.View>
		);
	}

}