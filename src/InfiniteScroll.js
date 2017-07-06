import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, Dimensions } from 'react-native';

import { Indicator, Error } from './res';

import css from './css';


export default class InfiniteScroll extends React.Component {

	static propTypes = {
		items: PropTypes.array,
	};

	static defaultProps = {
		width: 'auto',
		pageSize: 10,

		useScrollEvent: true,
		useRefresh: true,
		useDebug: false,

		items: null,
		column: 1,
		margin: 0,

		type: 'ready', // loading|refresh|ready|end
		load: function(type) {},

		endReachedPosition: 2,
		keyExtractor: null,

		renderRow: null,
		renderHeader: null,
		renderFooter: null,
		renderError: () => <Error/>,

		style: null,
		styleRow: null,
		styleItem: null,
	};

	constructor(props) {
		super(props);

		this._list = null;
		this.itemSize = 0;
		this.windowSize = { width: 0, height: 0 };
	}

	/***
	 * LIFE CYCLE AREA
	 */

	componentWillMount() {
		this.windowSize = Dimensions.get('window');
		this.itemSize = this.getItemSize();
	}

	componentWillUpdate() {
		this.windowSize = Dimensions.get('window');
		this.itemSize = this.getItemSize();
	}

	/***
	 * FUNCTIONS AREA
	 */

	getItemSize() {
		const { props } = this;
		let width = props.width === 'auto' ? this.windowSize.width : props.width;

		return props.column > 1 ? (width - ((props.column - 1) * (props.margin * 0.5))) / props.column : 'auto';
	}

	/***
	 * RENDER AREA
	 */

	renderRow(o) {
		const { props } = this;

		if (!(props.renderRow && typeof props.renderRow === 'function')) return null;

		return (
			<View style={[
				{ margin: props.margin * .5, width: this.itemSize },
				props.styleItem
			]}>
				{props.renderRow(
					o.item,
					o.index,
					this.itemSize === 'auto' ? this.windowSize.width : this.itemSize
				)}
			</View>
		);
	}

	renderHeader() {
		const { props } = this;

		if (props.renderHeader) {
			return (
				<View style={[
					css.header,
					{ margin: props.margin, marginBottom: 0 - props.margin * .5 }
				]}>
					{props.renderHeader()}
				</View>
			);
		}

		return null;
	}

	renderFooter() {
		const { props } = this;

		return (
			<View style={[
				css.footer,
				{ margin: props.margin, marginTop: 0 - props.margin * .5 }
			]}>
				{!!props.renderFooter && props.renderFooter()}
				{props.type === 'loading' && (
					<Indicator style={css.footer__loading}/>
				)}
			</View>
		);
	}

	render() {
		const { props } = this;

		// check error
		if (!(props.items && props.items.length) && props.type === 'error') {
			return props.renderError();
		}

		return (
			<View style={css.viewport}>
				<FlatList
					ref={(r) => { this._list = r; }}
					data={props.items}
					keyExtractor={props.keyExtractor ? props.keyExtractor : (item, index) => `item-${index}`}
					initialNumToRender={props.pageSize}
					renderItem={this.renderRow.bind(this)}
					ListHeaderComponent={this.renderHeader.bind(this)}
					ListFooterComponent={this.renderFooter.bind(this)}
					numColumns={props.column}
					columnWrapperStyle={props.styleRow}
					debug={props.useDebug}
					refreshing={props.useRefresh && props.type === 'refresh'}
					onRefresh={props.useRefresh ? function() { props.load('refresh'); } : null}
					removeClippedSubviews={false}
					onEndReachedThreshold={props.endReachedPosition}
					onEndReached={async function() {
						if (props.useScrollEvent && (props.type === 'ready' || props.type === 'error')) {
							props.load('more');
						}
					}}
					style={[ css.list, props.style, { margin: 0 - props.margin } ]}/>
			</View>
		);
	}

	/***
	 * METHOD AREA
	 */

	/**
	 * scroll to offset
	 *
	 * @param {Object} options
	 */
	scrollToOffset(options={}) {
		this._list.scrollToOffset({
			x: 0,
			y: 0,
			animated: true,
			...options
		});
	}

}