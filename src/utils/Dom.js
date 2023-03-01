export const stringToHTML = (str) => {
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
};

export const enableScroll = () => {
	document.querySelector('html').classList.remove('isScrollDisabled');
	document.querySelector('html').classList.remove('dft-isScrollDisabled');
	document.body.style.touchAction = "initial"
}

export const disableScroll = () => {
	document.querySelector('html').classList.add('isScrollDisabled');
	document.querySelector('html').classList.add('dft-isScrollDisabled');
	document.body.style.touchAction = "none"
}
