import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InfiniteScroll } from 'react-native-infinite';

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
});


export default class InfiniteScrollExampleBasic extends React.Component {

	constructor(props) {
		super();

		this._infiniteScroll = null;
		this.isMount = false;

		this.state = {
			items: items,
			type: 'ready',
		};
	}

	componentDidMount() {
		this.isMount = true;
	}

	componentWillUnmount() {
		this.isMount = false;
	}

	async load(type) {
		const { props, state } = this;

		switch(type) {
			case 'more':
				await this.setState({ type: 'loading' });
				await util.sleep(500);
				if (!this.isMount) return;
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
				if (!this.isMount) return;
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
					itemHeight={60}
					column={2}
					innerMargin={[5,1]}
					outerMargin={[5,5]}
					type={state.type}
					load={(type) => this.load(type)}
					renderRow={(res) => this.renderRow(res)}
					renderHeader={() => <View style={{borderWidth: 1}}><Text>Header component</Text></View>}
					renderFooter={() => <View style={{borderWidth: 1}}><Text>Footer component</Text></View>}
					style={css.scroll}
					styleList={css.scrollList}
					styleRow={css.scrollRow}/>
			</View>
		);
	}

}