import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, View, FlatList, Dimensions } from 'react-native';

import { Indicator, Error } from './res';

import css from './css';


export default class InfiniteScroll extends React.Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
		pageSize: PropTypes.number,
		stamp: PropTypes.number,

		useScrollEvent: PropTypes.bool,
		useRefresh: PropTypes.bool,
		useFullHeight: PropTypes.bool,
		useDebug: PropTypes.bool,
		useWrapRow: PropTypes.bool,

		column: PropTypes.number,
		endReachedPosition: PropTypes.number,
		keyExtractor: PropTypes.string,

		type: PropTypes.string,
		load: PropTypes.func,

		renderRow: PropTypes.func.isRequired,
		renderHeader: PropTypes.func,
		renderFooter: PropTypes.func,
		renderError: PropTypes.func,

		style: ViewPropTypes.style,
		styleRow: ViewPropTypes.style,
		styleItem: ViewPropTypes.style,
	};
	static defaultProps = {
		items: null,
		width: 'auto',
		pageSize: 20,
		stamp: null, // 강제로 렌더링 하기위한 장치. 현재와 다른값으로 변하면 렌더링하게 된다.

		useScrollEvent: true,
		useRefresh: true,
		useFullHeight: true,
		useDebug: false,
		useWrapRow: true, // 한줄에 View 컴포넌트로 래핑할것인지에 대하여 정한다. 래핑하면 컬럼의 잔격이 조정된다.

		column: 1,
		endReachedPosition: 2,
		keyExtractor: null,

		type: 'ready', // loading|refresh|ready|end
		load: function(type) {},

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
		this.updateSize();
	}
	componentWillUpdate() {}
	shouldComponentUpdate(nextProps) {
		const { props } = this;

		if (props.items !== nextProps.items) return true;
		if (props.type !== nextProps.type) return true;
		if (props.stamp !== nextProps.stamp) return true;

		return false;
	}

	/***
	 * FUNCTIONS AREA
	 */
	getItemSize() {
		const { props } = this;
		let width = props.width === 'auto' ? this.windowSize.width : props.width;

		return props.column > 1 ? width / props.column : 'auto';
	}

	/***
	 * RENDER AREA
	 */
	renderRow(o) {
		const { props } = this;

		if (!(props.renderRow && typeof props.renderRow === 'function')) return null;

		if (props.useWrapRow) {
			return (
				<View style={[
					{ width: this.itemSize },
					props.styleItem
				]}>
					{props.renderRow({
						item: o.item,
						index: o.index,
						size: this.itemSize === 'auto' ? this.windowSize.width : this.itemSize
					})}
				</View>
			);
		} else {
			return props.renderRow({
				item: o.item,
				index: o.index,
				size: this.itemSize === 'auto' ? this.windowSize.width : this.itemSize
			});
		}
	}
	renderHeader() {
		const { props } = this;

		if (props.renderHeader) {
			return (
				<View style={css.header}>
					{props.renderHeader()}
				</View>
			);
		}

		return null;
	}
	renderFooter() {
		const { props } = this;

		return (
			<View style={css.footer}>
				{!!props.renderFooter && props.renderFooter()}
				{props.type === 'loading' && (
					<Indicator style={css.footer__loading}/>
				)}
			</View>
		);
	}
	render() {
		const { props } = this;

		console.warn('RENDER', + new Date());

		// check error
		if (!(props.items && props.items.length) && props.type === 'error') {
			return props.renderError();
		}

		return (
			<View style={[
				css.viewport,
				props.useFullHeight && css.viewport_fullHeight
			]}>
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
					onEndReached={function() {
						if (props.useScrollEvent && (props.type === 'ready' || props.type === 'error')) {
							props.load('more');
						}
					}}
					style={[ css.list, props.style ]}/>
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

	/**
	 * update viewport and block size
	 */
	updateSize() {
		this.windowSize = Dimensions.get('window');
		this.itemSize = this.getItemSize();
	}

}