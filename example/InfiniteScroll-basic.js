import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { InfiniteScroll } from '../index';

import * as util from './util';


const items = [
	{ label: 'red' },
	{ label: 'orange' },
	{ label: 'yellow' },
	{ label: 'green' },
	{ label: 'blue' },
	{ label: 'darkblue' },
	{ label: 'violet' },
];
const css = StyleSheet.create({
	viewport: {
		flex: 1,
	},
	scroll: {
		marginVertical: -5,
		marginHorizontal: 5,
	},
	block: {
		height: 80,
		flex: 1,
		overflow: 'hidden',
	},
	block__wrap: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	block__text: {},
});


export default class InfiniteScrollExampleBasic extends React.Component {

	constructor(props) {
		super();

		this.state = {
			items: items,
			type: 'ready',
		};
	}

	async load(type) {
		const { props, state } = this;

		switch(type) {
			case 'more':
				await this.setState({ type: 'loading' });
				await util.sleep(500);
				this.setState({
					type: 'ready',
					items: [
						...state.items,
						...items,
					]
				});
				break;

			case 'refresh':
				await this.setState({ type: 'refresh' });
				await util.sleep(1000);
				this.setState({
					type: 'ready',
					items: items,
				});
				break;
		}
	}

	renderRow({ item, index, size }) {
		return (
			<View style={[
				css.block,
				{
					margin: 5,
					height: size - 10
				}
			]}>
				<View style={[css.block__wrap, { backgroundColor: item.label } ]}>
					<Text style={css.block__text}>{item.label}</Text>
				</View>
			</View>
		);
	}

	render() {
		const { props, state } = this;

		return (
			<View style={css.viewport}>
				<InfiniteScroll
					items={state.items}
					column={2}
					pageSize={24}
					useDebug={false}
					useWrapRow={false}
					type={state.type}
					load={(type) => this.load(type)}
					renderRow={(res) => this.renderRow(res)}
					// renderHeader={() => {
					// 	return ( <View><Text>Header component</Text></View> );
					// }}
					// renderFooter={() => {
					// 	return ( <View><Text>Footer component</Text></View> );
					// }}
					style={css.scroll}
					styleItem={{}}/>
			</View>
		);
	}

}