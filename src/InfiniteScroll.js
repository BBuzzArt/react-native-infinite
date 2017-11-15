import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, View, FlatList, Dimensions } from 'react-native';

import { Indicator, Error } from './res';

import css from './css';


export default class InfiniteScroll extends React.Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
		itemHeight: PropTypes.number,

		useScrollEvent: PropTypes.bool,
		useRefresh: PropTypes.bool,
		useFullHeight: PropTypes.bool,
		useDebug: PropTypes.bool,

		column: PropTypes.number,
		innerMargin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
		outerMargin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
		removeClippedSubviews: PropTypes.bool,
		endReachedPosition: PropTypes.number,
		pageSize: PropTypes.number,
		keyExtractor: PropTypes.func,
		type: PropTypes.string,
		load: PropTypes.func,

		renderRow: PropTypes.func.isRequired,
		renderHeader: PropTypes.func,
		renderFooter: PropTypes.func,
		renderError: PropTypes.func,

		style: ViewPropTypes.style,
		styleList: ViewPropTypes.style,
		styleRow: ViewPropTypes.style,
		styleBlock: ViewPropTypes.style,
		styleHeader: ViewPropTypes.style,
		styleFooter: ViewPropTypes.style,
	};
	static defaultProps = {
		items: null,
		width: 'auto',
		itemHeight: null,

		useScrollEvent: true,
		useRefresh: true,
		useFullHeight: true,
		useDebug: false,

		column: 1,
		innerMargin: [0,0],
		outerMargin: [0,0],
		removeClippedSubviews: true,
		endReachedPosition: 2,
		pageSize: 20,
		keyExtractor: null,
		type: 'end', // loading|refresh|ready|end|error
		load: function(type) {},
		getItemLayout: null,

		renderRow: null,
		renderHeader: null,
		renderFooter: null,
		renderError: () => <Error message="Service Error"/>,
		renderNotFound: () => <Error message="Not found item"/>,

		style: null,
		styleList: null,
		styleRow: null,
		styleBlock: null,
		styleHeader: null,
		styleFooter: null,
	};

	constructor(props) {
		super(props);

		this.state = {
			blank: false,
		};
		this.list = null;
		this.itemSize = 0;
		this.windowSize = { width: 0, height: 0 };
		this.binds = {
			onEndReached: this.onEndReached.bind(this),
			renderRow: this.renderRow.bind(this),
			renderHeader: this.renderHeader.bind(this),
			renderFooter: this.renderFooter.bind(this),
			getItemLayout: this.getItemLayout.bind(this),
		};
		this.innerMargin = [0,0];
		this.outerMargin = [0,0];
	}
	componentWillMount() {
		this.updateSize(this.props);
	}
	componentWillUpdate(nextProps) {
		const { props } = this;

		// checking for updateSize
		if (
			nextProps.column !== props.column ||
			nextProps.innerMargin !== props.innerMargin ||
			nextProps.outerMargin !== props.outerMargin ||
			(nextProps.width !== 'auto' && nextProps.width !== props.width) ||
			(nextProps.width === 'auto' && this.windowSize !== Dimensions.get('window'))
		) {
			this.updateSize(nextProps);
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		const { props, state } = this;

		if (state.blank !== nextState.blank) return true;
		if (props.items !== nextProps.items) return true;
		if (props.type !== nextProps.type) return true;

		return false;
	}


	/**
	 * FUNCTIONS AREA
	 */

	/**
	 * get inner margin
	 *
	 * @return {Number}
	 */
	getInnerMargin() {
		return (this.props.column > 1) ? this.innerMargin[0] : 0;
	}

	/**
	 * get item size
	 *
	 * @return {Number}
	 */
	getItemSize(props) {
		let width = props.width === 'auto' ? this.windowSize.width : props.width;
		let innerMargin = (props.column - 1) * this.getInnerMargin();

		return props.column > 1 ? (width - (innerMargin + (this.outerMargin[0] * 2))) / props.column : 'auto';
	}

	/**
	 * update viewport and block size
	 *
	 * @param {Object} props
	 */
	updateSize(props) {
		this.windowSize = Dimensions.get('window');
		this.innerMargin = (typeof props.innerMargin === 'number') ? [props.innerMargin, props.innerMargin] : props.innerMargin;
		this.outerMargin = (typeof props.outerMargin === 'number') ? [props.outerMargin, props.outerMargin] : props.outerMargin;
		this.itemSize = this.getItemSize(props);
	}

	/**
	 * on end reached
	 */
	onEndReached() {
		const { props } = this;

		if (props.useScrollEvent && props.type === 'ready') {
			props.load('more');
		}
	}

	/**
	 * get item layout
	 *
	 * @param {Array} data
	 * @param {Number} index
	 * @return {Object}
	 */
	getItemLayout(data, index) {
		const { props } = this;

		if (props.getItemLayout) {
			return props.getItemLayout(data, index);
		} else {
			if (props.itemHeight) {
				return {
					length: props.itemHeight,
					offset: ((props.itemHeight + this.innerMargin[1]) * index) + (this.outerMargin[1]),
					index
				};
			}
		}
	}


	/**
	 * RENDER AREA
	 */
	renderRow(o) {
		const { props } = this;

		return (
			<View style={[
				css.block,
				props.styleBlock,
				{
					width: this.itemSize,
					marginLeft: this.getInnerMargin(),
					marginTop: (props.column <= o.index) ? this.innerMargin[1] : 0,
				},
				props.itemHeight && { height: props.itemHeight },
			]}>
				{props.renderRow({
					item: o.item,
					index: o.index,
					size: this.itemSize === 'auto' ? this.windowSize.width : this.itemSize
				})}
			</View>
		);
	}
	renderHeader() {
		const { props } = this;

		return (
			<View style={[
				css.header,
				!!props.outerMargin && { marginBottom: this.outerMargin[1] },
				props.styleHeader
			]}>
				{!!props.renderHeader && props.renderHeader()}
			</View>
		);
	}
	renderFooter() {
		const { props } = this;

		return (
			<View style={[
				css.footer,
				!!props.outerMargin && { marginTop: this.outerMargin[1] },
				props.styleFooter
			]}>
				{!!props.renderFooter && props.renderFooter()}
				{props.type === 'loading' && (
					<Indicator style={css.footer__loading}/>
				)}
			</View>
		);
	}
	render() {
		const { props, state } = this;

		// check type `error`
		if (props.type === 'error') {
			return props.renderError();
		}

		// check item count
		if (!(props.items && props.items.length)) {
			return props.renderNotFound();
		}

		return (
			<View style={[
				css.viewport,
				props.style,
				props.useFullHeight && css.viewport_fullHeight
			]}>
				{state.blank ? null : (
					<FlatList
						ref={(r) => { this.list = r; }}
						data={props.items}
						keyExtractor={props.keyExtractor ? props.keyExtractor : (item, index) => `item_${index}`}
						initialNumToRender={props.pageSize}
						getItemLayout={(props.getItemLayout || props.itemHeight) ? this.binds.getItemLayout : null}
						renderItem={this.binds.renderRow}
						ListHeaderComponent={this.binds.renderHeader}
						ListFooterComponent={this.binds.renderFooter}
						numColumns={props.column}
						columnWrapperStyle={props.column > 1 && [
							{ marginLeft: 0 - this.getInnerMargin() + this.outerMargin[0] },
							props.styleRow
						]}
						refreshing={props.useRefresh && props.type === 'refresh'}
						onRefresh={props.useRefresh ? function() { props.load('refresh') } : null}
						onEndReachedThreshold={props.endReachedPosition}
						removeClippedSubviews={props.removeClippedSubviews}
						onEndReached={this.binds.onEndReached}
						debug={props.useDebug}
						style={[ css.list, props.styleList ]}/>
				)}
			</View>
		);
	}


	/**
	 * METHOD AREA
	 */

	/**
	 * re render
	 */
	reRender() {
		this.updateSize(this.props);
		this.setState({ blank: true }, () => {
			this.setState({ blank: false });
		});
	}

}