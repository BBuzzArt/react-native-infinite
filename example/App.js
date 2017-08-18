import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import * as src from './src';


class App extends React.Component {

	render() {
		const { props } = this;

		return (
			<View style={css.viewport}>
				<ScrollView style={css.index}>
					<TouchableHighlight
						activeOpacity={1}
						underlayColor="rgba(0,0,0,.01)"
						onPress={() => props.navigation.navigate('ExampleBasic')}>
						<View style={css.item}>
							<Text style={css.item__text}>Basic / load items to infinity</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						activeOpacity={1}
						underlayColor="rgba(0,0,0,.01)"
						onPress={() => props.navigation.navigate('ExampleResize')}>
						<View style={css.item}>
							<Text style={css.item__text}>Resize / resize screen event</Text>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						activeOpacity={1}
						underlayColor="rgba(0,0,0,.01)"
						onPress={() => props.navigation.navigate('ExampleScroll')}>
						<View style={css.item}>
							<Text style={css.item__text}>Scroll / scroll event method</Text>
						</View>
					</TouchableHighlight>
				</ScrollView>
			</View>
		);
	}
}


const css = StyleSheet.create({
	viewport: {
		flex: 1,
	},
	index: {},
	item: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(0,0,0,.2)',
	},
	item__text: {
		fontWeight: '600',
		fontSize: 16,
		color: '#324dff',
	},
	cardStyle: {
		backgroundColor: '#fff'
	},
	headerStyle: {
		backgroundColor: '#fff',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#aaa',
	},
});

export default StackNavigator({
	Home: { screen: App, navigationOptions: { title: 'Demos', headerStyle: css.headerStyle } },
	ExampleBasic: { screen: src.ExampleBasic, navigationOptions: { title: 'Basic', headerStyle: css.headerStyle } },
	ExampleResize: { screen: src.ExampleResize, navigationOptions: { title: 'Resize', headerStyle: css.headerStyle } },
	ExampleScroll: { screen: src.ExampleScroll, navigationOptions: { title: 'Scroll', headerStyle: css.headerStyle } },

}, {
	cardStyle: css.cardStyle,
});