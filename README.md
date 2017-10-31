# react-native-infinite

React Native infinite는 쉽게 목록형 데이터를 표현하는 래퍼(Wrapper)라고 할 수 있습니다.


## Features

- Flatlist 컴포넌트 사용
- 당겨서 새로고침 지원
- 더 불러오기 지원
- redux와 함께 사용하기 적합한 목록


## Demo

[Expo](https://expo.io) 앱을 통하여 데모를 확인해볼 수 있습니다. 데모는 다음링크를 참고하세요.

https://expo.io/@bbuzzart/react-native-infinite


## Installation
cli로 설치할 프로젝트에서 다음과 같은 명령을 실행하여 디펜더시를 추가합니다.

### npm
`npm install --save react-native-infinite`

### yarn
`yarn add react-native-infinite`


## Usage
다음 소스코드는 가장 기본적인 형태의 예제입니다.

```
import { InfiniteScroll } from 'react-native-infinite';

<InfiniteScroll
	items={[
		{ name: 'apple' },
		{ name: 'banana' },
		{ name: 'mango' }
	]}
	renderRow={({ item, index, size }) => ( <Text>{item.name}</Text> )}
/>
```

컴포넌트를 활용한 예제는 다음 소스코드 링크를 참고해주세요.
- [InfiniteScroll-basic](https://github.com/BBuzzArt/react-native-infinite/blob/master/example/src/InfiniteScroll-basic.js)
- [InfiniteScroll-resize](https://github.com/BBuzzArt/react-native-infinite/blob/master/example/src/InfiniteScroll-resize.js)
- [InfiniteScroll-scroll](https://github.com/BBuzzArt/react-native-infinite/blob/master/example/src/InfiniteScroll-scroll.js)
- [InfiniteScroll-grid](https://github.com/BBuzzArt/react-native-infinite/blob/master/example/src/InfiniteScroll-grid.js)


## Properties

### basic

| Name | default | Type | Description |
| :--- | :------ | :--- | :---------- |
| items | null | `array` | 목록이 되는 배열 형태의 데이터를 넣습니다. 이 prop은 *필수값*입니다. |
| width | 'auto' | `string|number` | 목록 영역의 가로사이즈 |
| itemHeight | null | `number` | 아이템의 높이 |

### use

| Name | default | Type | Description |
| :--- | :------ | :--- | :---------- |
| useScrollEvent | true | `boolean` | 이미지 더보기 기능을 하는 스크롤 이벤트 사용 |
| useRefresh | true | `boolean` | 목록을 아래로 당기면서 새로고침 이벤트 사용 |
| useFullHeight | true | `boolean` | 목록을 전체화면으로 사용 |
| useDebug | false | `boolean` | debug모드 사용 |

### options

| Name | default | Params | Type | Description |
| :--- | :------ | :----- | :--- | :---------- |
| column | 1 |  | `number` | 컬럼 수 |
| innerMargin | 1 |  | `number` | 요소 사이의 간격 |
| outerMargin | 1 |  | `number` | 목록 외곽의 간격 |
| removeClippedSubviews | true |  | `boolean` | 안보이는 요소는 언마운트할지에 대한 여부 |
| endReachedPosition | 2 |  | `number` | 요소 더 불러오기 이벤트 시작하는 지점 |
| pageSize | 20 |  | `number` | 한번에 표시하는 요소 갯수 |
| keyExtractor | null |  | `string` | 요소를 구분하는 key값 정의 |
| type | `'end'` |  | `string` | 목록의 상태 (`loading`:로딩중, `refresh`:새로고침 중, `ready`:대기중, `end`:더이상 불러올것이 없는상태) |
| load | `function()` | `type` | `function` | 새로고침하거나 더 불러오기할때 실행되는 이벤트. `type`이라는 현재 목록 상태를 참고하여 목록을 직업 갱신할 수 있습니다. `type`은 `props.type`값과 같은 내용입니다. |
| getItemLayout | null | `{data, index}` | `object` | 블럭의 사이즈를 정의합니다. |

### render

| Name | default | Params | Type | Description |
| :--- | :------ | :----- | :--- | :---------- |
| renderRow | null | `{item, index, size}` | `function` | 요소 하나를 렌더하는 컴포넌트. 파라메터를 이용하여 컴포넌트를 return을 통하여 출력합니다. |
| renderHeader | null |  | `function` | 목록의 상단 컴포넌트 |
| renderFooter | null |  | `function` | 목록의 하단을 컴포넌트 |
| renderError | `<Error/>` |  | `function` | 오류가 났을때 출력하는 컴포넌트  |
| renderNotFound | `<Error/>` |  | `function` | 아이템이 없을때 출력하는 컴포넌트  |

### style

| Name | default | Type | Description |
| :--- | :------ | :--- | :---------- |
| style | null | `style` | 컴포넌트의 가장 바깥의 영역 |
| styleList | null | `style` | 목록 |
| styleRow | null | `style` | 목록에서 하나의 줄 |
| styleBlock | null | `style` | 목록에서 하나의 요소 |
| styleHeader | null | `style` | 헤더영역 |
| styleFooter | null | `style` | 푸터영역 |


## API

먼저 컴포넌트로 접근할 수 있도록 인스턴스 객체로 담아둡니다.  
다음과 같이 `this.infiniteScrollRef`로 컴포넌트에 접근할 수 있습니다.

```
import React from 'react';
import { InfiniteScroll } from 'react-native-infinite';

export default class Foo extends React.Component {
	constructor(props) {
		this.infiniteScrollRef = null;
	}

	render() {
		return (
			<InfiniteScroll ref={(r) => { this.infiniteScrollRef = r; }}/>
		);
	}
}
```

### FlatList

`FlatList`를 사용하여 어떤 액션을 사용하려면 `this.infiniteScrollRef.list` 객체로 접근하여 `FlatList`의 메서드를 사용할 수 있습니다.

_example)_

```
// 가장 아래쪽으로 스크롤 이동
this.infiniteScrollRef.list.scrollToEnd();

// offset값의 위치로 스크롤 이동
this.infiniteScrollRef.list.scrollToOffset({
	offset: 20,
});
```

### scrollToOffset
원하는 위치로 스크롤을 이동합니다.

```
/**
 * @param {Object} options
 * @param {int} options.offset : 이동하려는 위치 offset 값
 * @param {int} options.animated : 애니메이션 사용유무
 */
this.infiniteScrollRef.list.scrollToOffset({
	offset: 0,
	animated: true
});
```

### re render
컬럼을 변경하게 되면 `FlatList`에서 오류가 발생됩니다. state로 컬럼 변경이 불가능해 보입니다. `reRender()`메서드를 사용하면 `FlatList` 컴포넌트를 삭제하고 다시 마운트를 합니다.

> #### 주의
> 
> 컴포넌트가 순간적으로 삭제되기 때문에 스크롤 위치가 이동하게 됩니다.

```
this.infiniteScrollRef.reRender();
```


----


Powered by [BBuzzArt](http://bbuzzart.com)

- iOS: https://itunes.apple.com/us/app/bbuzzart-new-art-in-your-hand/id868618986
- android: https://play.google.com/store/apps/details?id=net.bbuzzart.android
