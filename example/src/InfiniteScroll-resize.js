import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { InfiniteScroll } from 'react-native-infinite';

import * as util from './util';


const items = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const css = StyleSheet.create({
	viewport: {
		flex: 1,
	},
	item: {
		backgroundColor: '#d7f7ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	item__text: {

	},
});


export default class InfiniteScrollExampleResize extends React.Component {

	constructor() {
		super();

		this.state = {
			column: this.getColumn(),
			blank: false,
		};

		this._infiniteScroll = null;
		this.binds = {
			renderRow: this.renderRow.bind(this),
			onResize: this.onResize.bind(this),
		};
	}

	componentDidMount() {
		this.resizeEvent = new util.ResizeEvent();
		this.resizeEvent.onChange = this.binds.onResize;
	}

	componentWillUnmount() {
		this.resizeEvent.destroy();
	}

	getColumn() {
		return (Dimensions.get('window').width > 640) ? 4 : 2;
	}

	async onResize() {
		const { state } = this;
		const column = this.getColumn();

		if (column === state.column) {
			this._infiniteScroll.forceUpdate();
			return;
		}

		await this.setState({ blank: true, column });
		this.setState({ blank: false });
	}

	renderRow({ item, index, size }) {
		return (
			<View style={[
				css.item,
				{ height: size },
			]}>
				<Text style={css.item__text}>box{index}</Text>
			</View>
		);
	}

	render() {
		const { props, state } = this;

		return (
			<View style={css.viewport}>
				{!state.blank ? (
					<InfiniteScroll
						ref={(r) => { this._infiniteScroll = r; }}
						items={items}
						useScrollEvent={false}
						useRefresh={false}
						column={state.column}
						innerMargin={5}
						outerMargin={0}
						type="end"
						renderRow={this.binds.renderRow}
					/>
				) : null}
			</View>
		);
	}

}