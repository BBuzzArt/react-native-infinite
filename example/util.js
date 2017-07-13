export function sleep(delay=3000) {
	clearTimeout(GLOBAL.appTimer);

	return new Promise(resolve => {
		GLOBAL.appTimer = setTimeout(resolve, delay);
	});
}