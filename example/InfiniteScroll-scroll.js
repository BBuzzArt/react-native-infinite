import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
	scroll: {},
	scrollList: {},
	scrollRow: {},
	block: {
		flex: 1,
	},
	block__wrap: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	block__text: {},
	nav: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 5,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: 'rgba(0,0,0,.2)',
		backgroundColor: '#f9f9f9',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		marginHorizontal: 5,
		backgroundColor: '#999'
	},
	button__text: {
		fontSize: 12,
		color: '#fff',
		fontWeight: '600',
	},
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
				{ width: size, height: size }
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
				<InfiniteScroll
					ref={(r) => { this._infiniteScroll = r; }}
					items={state.items}
					itemHeight={100}
					column={2}
					innerMargin={10}
					outerMargin={10}
					type={state.type}
					load={(type) => this.load(type)}
					renderRow={(res) => this.renderRow(res)}
					style={css.scroll}
					styleList={css.scrollList}
					styleRow={css.scrollRow}/>
				<View style={css.nav}>
					<TouchableOpacity
						onPress={() => {
							this._infiniteScroll.list.scrollToOffset({ offset: 0 });
						}}
						style={css.button}>
						<Text style={css.button__text}>Scroll to top</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this._infiniteScroll.list.scrollToIndex({ index: 4 });
						}}
						style={css.button}>
						<Text style={css.button__text}>Scroll to 4 line</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

}