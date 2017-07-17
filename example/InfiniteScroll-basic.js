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
const margin = 2;
const css = StyleSheet.create({
	viewport: {
		flex: 1,
	},
	scroll: {},
	scrollList: {},
	scrollRow: {},
	block: {},
	block__wrap: {
		paddingVertical: 30,
		alignItems: 'center'
	},
	block__text: {},
});


export default class InfiniteScrollExampleBasic extends React.Component {

	constructor(props) {
		super();

		this._infiniteScroll = null;

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
					type: state.type === 'end' ? 'end' : 'ready',
					items: items,
				});
				break;
		}
	}

	renderRow({ item, index, size }) {
		return (
			<View style={[
				css.block,
				{ width: size }
			]}>
				<View style={[css.block__wrap, { backgroundColor: item.label }]}>
					<Text style={css.block__text}>{item.label}</Text>
				</View>
			</View>
		);
	}

	render() {
		const { props, state } = this;

		return (
			<View style={css.viewport}>
				{/*<InfiniteScroll*/}
					{/*items={[*/}
						{/*{ name: 'apple' },*/}
						{/*{ name: 'banana' },*/}
						{/*{ name: 'mango' }*/}
					{/*]}*/}
					{/*renderRow={({ item, index, size }) => ( <Text>{item.name}</Text> )}*/}
				{/*/>*/}

				<InfiniteScroll
					ref={(r) => { this._infiniteScroll = r; }}
					items={state.items}
					column={2}
					stamp={25}
					innerMargin={5}
					outerMargin={0}
					type={state.type}
					load={(type) => this.load(type)}
					renderRow={(res) => this.renderRow(res)}
					renderHeader={() => <View style={{borderWidth: 1}}><Text>Header component</Text></View>}
					renderFooter={() => <View style={{borderWidth: 1}}><Text>Footer component</Text></View>}
					style={css.scroll}
					styleList={css.scrollList}
					styleRow={css.scrollRow}
				/>
				{/*<TouchableOpacity*/}
					{/*onPress={() => {*/}
						{/*//this._infiniteScroll.triggerMessage('warning', 'test &68947957823503');*/}
					{/*}}>*/}
					{/*<Text>open message</Text>*/}
				{/*</TouchableOpacity>*/}
			</View>
		);
	}

}