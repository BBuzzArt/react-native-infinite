import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { InfiniteScroll } from 'react-native-infinite';

import * as util from './util';


const patterns = [
	'oo##--##', 'oo||--||', 'o##|o##|', 'o|##o|##', 'o|--o|--',
	'o--|o--|', 'o--|--o|', '##oo##--', '##o|##o|', '########',
	'##|o##|o', '##||##||', '##--##oo', '##--##--', '|oo||--|',
	'|o##|o##', '|o--|o--', '|o--|--o', '|##o|##o', '|##||##|',
	'||oo||--', '||##||##', '||--||oo', '||--||--', '|--o|o--',
	'|--o|--o', '|--||oo|', '|--||--|', '--o|o--|', '--o|--o|',
	'--##oo##', '--##--##', '--|o--|o', '--||oo||', '--||--||'
].map((str) => { return str.split(''); });
const IMAGES = [
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/47707_20170627080238_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/53003_20170715014116_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/53228_20170626065658_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/43529_20170619035318_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/40187_20170819025619_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/1606_20150828052813_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/31757_20170807092734_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/25657_20170817044526_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/21548_20170731103716_thumb_S',
	'https://djo93u9c0domr.cloudfront.net/attachment-thumbs/7656_20160127004356_thumb_S',
];
const MARGIN = 5;
const SIZE = (Dimensions.get('window').width - (MARGIN * 3)) / 4;

const css = StyleSheet.create({
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loading__text: {
		marginTop: 8,
		fontSize: 11,
		color: '#111',
	},
});


export default class Grid extends React.Component {

	constructor()
	{
		super();

		this.state = {
			articles: [],
			type: 'ready',
		};
		this.size = (Dimensions.get('window').width / 4);
	}

	async componentDidMount()
	{
		await util.sleep(1000);

		this.setState({
			articles: this.makeImages(getImages(IMAGES, 30))
		});
	}

	makeImages(src)
	{
		let copy_src = Object.assign([], src);
		let result = [];

		function get()
		{
			return copy_src.pop();
		}

		function display(src, x, y, width, height)
		{
			return {
				src: src ? src : null,
				x: x * SIZE + (x) * MARGIN,
				y: y * SIZE + (y) * MARGIN,
				width: width * SIZE + (width - 1) * MARGIN,
				height: height * SIZE + (height - 1) * MARGIN,
			};
		}

		function group(block)
		{
			let re = [];

			for (let i=0; i<8; i++)
			{
				switch (block[i])
				{
					case 'o':
						re.push(display(get(), i % 4, Math.floor(i / 4), 1, 1));
						break;
					case '#':
						re.push(display(get(), i % 4, Math.floor(i / 4), 2, 2));
						block[i] = block[i + 1] = block[i + 4] = block[i + 5] = 'x';
						break;
					case '|':
						re.push(display(get(), i % 4, Math.floor(i / 4), 1, 2));
						block[i] = block[i + 4] = 'x';
						break;
					case '-':
						re.push(display(get(), i % 4, Math.floor(i / 4), 2, 1));
						block[i] = block[i + 1] = 'x';
						break;
				}
			}
			result.push(re);
		}

		while(copy_src.length)
		{
			group(patterns[patterns.length * Math.random() | 0].concat());
		}

		return result;
	}

	renderItem({ item, index })
	{
		const { props, state } = this;

		return (
			<View key={index} style={{
				marginTop: (index === 0) ? 0 : MARGIN,
				height: (SIZE * 2) + MARGIN,
			}}>
				{item.map((block, key) => {
					let style = {
						position: 'absolute',
						left: block.x,
						top: block.y,
						backgroundColor: '#eee',
					};

					if (!block.src) {
						return <View key={key} style={{ width: block.width, height: block.height, ...style}}/>;
					}

					return (
						<Image
							key={key}
							source={{
								uri: block.src,
								width: block.width,
								height: block.height,
							}}
							style={style}/>
					);
				})}
			</View>
		);
	}

	render()
	{
		const { props, state } = this;

		if (state.articles.length) {
			return (
				<InfiniteScroll
					items={state.articles}
					renderRow={this.renderItem.bind(this)}
					type={state.type}
					load={async (type) => {
						switch (type)
						{
							case 'more':
								let articles = Object.assign([], state.articles);
								let nextArticles = Object.assign([], getImages(IMAGES, 30));
								let last = articles[articles.length-1];

								for (let i=0; i<last.length; i++)
								{
									if (!last[i].src)
									{
										articles[articles.length-1][i].src = nextArticles.shift();
									}
								}
								this.setState({
									articles: articles.concat(this.makeImages(nextArticles))
								});
								break;

							case 'refresh':
								await util.sleep(500);
								this.setState({
									articles: this.makeImages(getImages(IMAGES, 30))
								});
								break;
						}
					}}/>
			);
		} else {
			return (
				<View style={css.loading}>
					<ActivityIndicator/>
					<Text style={css.loading__text}>Loading..</Text>
				</View>
			);
		}
	}

}


function getImages(getImages, count=5)
{
	let images = new Array(count);

	for (let i=0; i<images.length; i++)
	{
		images[i] = getImages[Math.floor(Math.random() * getImages.length)];
	}
	return images;
}