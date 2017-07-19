# react-native-infinite
React Native infinite는 쉽게 목록형 데이터를 표현하는 래퍼(Wrapper)라고 할 수 있습니다.


## Installation
cli로 설치할 프로젝트에서 다음과 같은 명령을 실행합니다.

### npm
`npm install react-native-infinite --save`

### yarn
`yarn add react-native-infinite`


## Usage
다음 소스코드는 가장 기본적인 형태의 예제입니다.
```
import InfiniteScroll from 'react-native-infinite';

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
- [InfiniteScroll-basic](https://github.com/BBuzzArt/react-native-infinite/blob/master/example/InfiniteScroll-basic.js)
- link
- link


## Properties

### basic

| Name | default | Type | Description |
| :--- | :------ | :--- | :---------- |
| items | null | `array` | 목록이 되는 배열 형태의 데이터를 넣습니다. 이 prop은 *필수값*입니다. |
| width | 'auto' | `string|number` | 목록 영역의 가로사이즈 |
| stamp | null | `number` | 일부 prop(`items`, `type`)값을 제외한 값이 변하더라도 렌더가 되지 않습니다. 만약 다시 렌더하고 싶다면 현재와 다른 `stamp`값을 바꿔주세요. |

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
| endReachedPosition | 2 |  | `number` | 요소 더 불러오기 이벤트 시작하는 지점 |
| pageSize | 20 |  | `number` | 한번에 표시하는 요소 갯수 |
| keyExtractor | null |  | `string` | 요소를 구분하는 key값 정의 |
| type | 'end' |  | `string` | 목록의 상태 (`loading`:로딩중, `refresh`:새로고침 중, `ready`:대기중, `end`:더이상 불러올것이 없는상태) |
| load | `function()` | `type` | `function` | 새로고침하거나 더 불러오기할때 실행되는 이벤트. `type`이라는 현재 목록 상태를 참고하여 목록을 직업 갱신할 수 있습니다. `type`은 `props.type`값과 같은 내용입니다. |

### render

| Name | default | Params | Type | Description |
| :--- | :------ | :----- | :--- | :---------- |
| renderRow | null | `{}` | `function` | 요소 하나를 렌더합니다. 파라메터를 이용하여 컴포넌트를 return 해줘서 요소를 출력합니다.|
| renderHeader | null |  | `function` | 목록의 상단 렌더합니다. |
| renderFooter | null |  | `function` | 목록의 하단을 렌더합니다. |
| renderError | `<Error/>` |  | `function` | 오류가 났을때 렌더합니다.  |
| renderNotFound | `<Error/>` |  | `function` | 오류가 났을때 렌더합니다.  |

### style

| Name | default | Type | Description |
| :--- | :------ | :--- | :---------- |
| style | null | `style` | 컴포넌트의 가장 바깥의 영역 |
| styleList | null | `style` | 목록 |
| styleRow | null | `style` | 목록에서 하나의 줄 |
| styleBlock | null | `style` | 목록에서 하나의 요소 |


## Methods

### scrollToOffset
원하는 위치로 스크롤을 이동합니다.

```
/**
 * @param {Object} options
 * @param {int} options.x : 이동하려는 x축 값
 * @param {int} options.y : 이동하려는 y축 값
 * @param {int} options.animated : 애니메이션 사용유무
 */
infiniteScrollRef.scrollToOffset({
	x: 0,
    y: 0,
    animated: true
});
```
