window.bioMp = function(el, options) {
	// Private
	var front = {width: 428, height: 889, ratio: (428 / 889)},
	    desktop = {width: 1400, height: 900, ratio: (1400 / 900)};
	
	// Options
	var options = options || {},
	    url = setOption(options.url, ''),
	    view = setOption(options.view, 'front'),
	    image = setOption(options.image, ''),
	    scale = setOption(options.scale, 0),
	    width = setOption(options.width, 0),
	    height = setOption(options.height, 0);
	
	function setOption(option, _default) {
		return (typeof option === 'undefined') ? _default : option;
	}
	
	function setSizes() {
		var selView = (view == 'front') ? front : desktop;
		
		if(scale != 0) {
			width = (selView.width * scale);
			height = (selView.height * scale);
			return;
		}
		
		if(width != 0) {
			scale = (width / selView.width);
			height = (width / selView.ratio);
			return;
		}
		
		if(height != 0) {
			scale = (height / selView.height);
			width = (height * selView.ratio);
			return;
		}
		
		scale = 1;
		width = selView.width;
		height = selView.height;
	}
	
	function create() {
		// Set view dimensions
		var selView = (view == 'front') ? front : desktop;

		// Set scrollbar CSS		
		var css = document.createTextNode(
			'.bio-mp-screen::-webkit-scrollbar {width: 6px; height: 6px;}' +
			'.bio-mp-screen::-webkit-scrollbar-track {background: none; -webkit-border-radius: 10px; border-radius: 10px;}' +
			'.bio-mp-screen::-webkit-scrollbar-thumb {-webkit-border-radius: 10px; border-radius: 10px; background: #777;}' +
			'.bio-mp-screen::-webkit-scrollbar-thumb:window-inactive {background: #777;}'
		);
		
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(css);
		
		// Add phone div
		var phone = document.createElement('div');
		el.appendChild(phone);

		// Add phone image
		var phoneImage = document.createElement('img');
		phoneImage.src = image;
		phone.appendChild(phoneImage);
		
		// Add iframe
		var iframe = document.createElement('iframe');
		iframe.src = url;
		iframe.className = 'bio-mp-screen';
		phone.appendChild(iframe);

		// Add CSS
		var wrapCss = 'width: ' + width + 'px; height: ' + height + 'px; overflow: hidden; transform-origin: 0 0 0;';
		var phoneCss = 'position: relative; top: 0px; left: 0px; width: ' + selView.width + 'px; height: ' + selView.height + 'px; background: none; -webkit-transform-origin: 0 0 0; -moz-transform-origin: 0 0 0; -ms-transform-origin: 0 0 0; -o-transform-origin: 0 0 0; transform-origin: 0 0 0; -webkit-transform: scale(' + scale + '); -moz-transform: scale(' + scale + '); -ms-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');';
		var phoneImageCss = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';

		if(view == 'desktop')
			var screenCss = 'position: absolute; top: 73px; left: 166px; width: 1070px; height: 670px; border: 0;';
		else
			var screenCss = 'position: absolute; top: 109px; left: 26.5px; width: 375px; height: 669px; border: 0;';

		el.style.cssText += wrapCss;
		phone.style.cssText = phoneCss;
		phoneImage.style.cssText = phoneImageCss;
		iframe.style.cssText = screenCss;
		
		// Add scrollbar CSS above the wrap
		el.parentNode.insertBefore(style, el);
	}
	
	// Init
	setSizes();
	create();
}