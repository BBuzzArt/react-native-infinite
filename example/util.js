import { Dimensions } from 'react-native';


export function sleep(delay=3000) {
	clearTimeout(GLOBAL.appTimer);

	return new Promise(resolve => {
		GLOBAL.appTimer = setTimeout(resolve, delay);
	});
}


export class ResizeEvent {

	constructor() {

		this._onChange = this._change.bind(this);

		Dimensions.addEventListener('change', this._onChange);
	}

	_change(e) {
		this.onChange(e);
	}

	onChange() {
		console.log('on change inside');
	}

	destory() {
		Dimensions.removeEventListener('change', this._onChange);
	}
}