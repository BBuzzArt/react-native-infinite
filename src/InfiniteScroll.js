import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, Dimensions } from 'react-native';

import { Indicator, Error } from './res';

import css from './css';
import mock from './mock';


export default class InfiniteScroll extends React.Component {

	static propTypes = {

	};

	static defaultProps = {
		width: 'auto',
		pageSize: 10,

		useScrollEvent: true,
		useRefresh: true,
		useDebug: false,

		items: mock,
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
	};

	constructor(props) {
		super(props);

		this._list = null;

		this.rowComponent = this.renderRow.bind(this);
		this.headerComponent = this.renderHeader.bind(this);
		this.footerComponent = this.renderFooter.bind(this);
	}

	componentDidMount() {}
	componentWillUnmount() {}

	renderRow(item) {
		const { props } = this;

		// TODO: 뷰 함수 작업
		// TODO: 아이템 사이즈 작업

		return (
			<View>
				<Text>row</Text>
			</View>
		);
	}
	renderHeader() {
		const { props } = this;

		if (props.renderHeader) {
			return (
				<View style={[
					css.header,
					{ marginTop: props.margin, marginBottom: 0 - props.margin }
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
			<View style={css.footer}>
				{!!props.renderFooter && props.renderFooter()}
				{props.type === 'loading' && ( <Indicator style={css.footer__loading}/> )}
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
					keyExtractor={props.keyExtractor ? props.keyExtractor : (item, index) => `item_${index}`}
					initialNumToRender={props.pageSize}
					renderItem={this.rowComponent}
					ListHeaderComponent={this.headerComponent}
					ListFooterComponent={this.footerComponent}
					numColumns={props.column}
					columnWrapperStyle={(props.column > 1) ? { marginLeft: 0 - props.margin } : null}
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
				    style={[
				    	css.list,
					    { marginTop: 0 - props.margin },
					    props.style
				    ]}/>
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