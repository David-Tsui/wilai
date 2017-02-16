function EmbeddedChatFacebookNamespace() {

	function Utils() {

	this.getQueryParms = function() {
		var queryParams = {};

		var loc = location.search.substring(1, location.search.length);
		var param_value = false;
		var params = loc.split("&");
		for (i=0; i<params.length;i++) {
			param_name = params[i].substring(0,params[i].indexOf('='));
			param_value = params[i].substring(params[i].indexOf('=') + 1 );
			queryParams[param_name] = param_value;
		}

		return queryParams;
	}

	this.getHashParams = function() {

		var hashParams = {};
		var e,
			a = /\+/g,  // Regex for replacing addition symbol with a space
			r = /([^&;=]+)=?([^&;]*)/g,
			d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
			q = decodeURIComponent(window.location.hash.substring(1));

		while (e = r.exec(q)) {
		   hashParams[d(e[1])] = d(e[2]);
		}

		return hashParams;
	};

	this.addScript = function(src) {
		var e = document.createElement('script');
		e.setAttribute('type','text/javascript');
		e.setAttribute('charset','UTF-8');
		e.setAttribute('src', src);
		document.body.appendChild(e);
	};

	this.addEvent = function(elem, event, fnc) {

		if (elem.addEventListener) {   // all browsers except IE before version 9
			elem.addEventListener(event, fnc, false);
		} else {
			if (elem.attachEvent) {    // IE before version 9
				elem.attachEvent('on' + event, fnc);
			}
		}
	}

	this.viewport = function() {
		var e = window
		, a = 'inner';
		if ( !( 'innerWidth' in window ) ) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
	};

	this.getCookieValue = function(key) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==key) {
				return unescape(y);
			}
		}
	}

	this.setCookieValue = function(key, value) {
		document.cookie = key + "=" + value;
	}

	this.getElementsByClassName = function(className) {

		if (document.getElementsByClassName) {

			return document.getElementsByClassName(className);

		} else {

			var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
			var allElements = document.getElementsByTagName("*");
			var results = [];

			var element;
			for (var i = 0; (element = allElements[i]) != null; i++) {
				var elementClass = element.className;
				if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
					results.push(element);
			}

			return results;
		}
	}

	this.isSafari = function() {
		return navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match(/Chrome/);
	}

	this.isMobile = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	var self = this;
}

function JsonpHandler(objName) {

	var currentScript = null;
	var base_url = '//www.embedded-chat.com';

	//Success callback
	this.success = null;

	this.getJSON = function(url, data, callback, failCallback) {

		var src = base_url + url +(url.indexOf("?")+1 ? "&" : "?");

		var head = document.getElementsByTagName("head")[0];
		var newScript = document.createElement("script");
		var params = [];
		var param_name = ""

		self.success = function(json) {
			if (json.status == "success") {
				if (callback) {
					callback(json);
				}
			} else {
				if (failCallback) {
					failCallback(json);
				} else {
					console.log("Embedded Chat: " + json.msg);
				}
			}
		};

		if (!objName) {
			objName = "embeddedChat";
		}
		data["callback"] = objName + ".jsonp_handler.success";
		for(param_name in data){
			params.push(param_name + "=" + encodeURIComponent(data[param_name]));
		}

		params.push("time=" + new Date().getTime());
		src += params.join("&")

		newScript.type = "text/javascript";
		newScript.src = src;
		if(this.currentScript) head.removeChild(currentScript);
		head.appendChild(newScript);
	};

	var self = this;
}

function EmbeddedChatFacebook() {
	var chat_widget_url = '/facebook/widget/';

	var edit_mode = false;
	var _project_token = null;

	var utils = new Utils();

	this.jsonp_handler = new JsonpHandler("embeddedChatFacebook");

	this.asyncInit = function() {

		if (window.embeddedChatFacebookAsyncInit) window.embeddedChatFacebookAsyncInit();
	}

	this.init = function(project_token, callback, onFailureCallback, args) {

		this.args = args || {};

		_project_token = project_token
		data = {};

		function onLoadCallback() {

			fetchChat(function(response) {
				initPostEvents();
			});
		}

		if (document.readyState === "complete") {
			onLoadCallback();
		}
		else {
			utils.addEvent(window, "load", onLoadCallback);
		}
	}

	var initPostEvents = function() {

	}

	var renderChat = function(response) {
		if (response.chat) {

			chatContainer = document.getElementById("embedded-chat-facebook-bar-container");
			if (!chatContainer) {
				chatContainer = document.createElement("div");
				chatContainer.id = "embedded-chat-facebook-bar-container";
			}
			chatContainer.innerHTML = response.chat;
			// $("#embedded-chat-facebook-side-text").text('FB粉絲團');
			document.body.appendChild(chatContainer);

		}

		setSizeOfRotatedText(response.embedded_chat_side);
	}

	var setSizeOfRotatedText = function(embedded_chat_side) {

		var element = document.getElementById("embedded-chat-facebook-side-text");
		if (!element) return;

		if (element.innerHTML != "") {
			if (embedded_chat_side == "left" || embedded_chat_side == "right") {
				var height = element.getBoundingClientRect().height;
				height += 54;
				document.getElementById("embededchat-facebook-show-button").style.height = height + "px";
			} else {
				var width = element.getBoundingClientRect().width;
				width += 50;
				document.getElementById("embededchat-facebook-show-button").style.width = width + "px";
			}
		} else {
			if (embedded_chat_side == "left" || embedded_chat_side == "right") {
				var height = 42;
				document.getElementById("embededchat-facebook-show-button").style.height = height + "px";
			} else {
				var width = 30;
				document.getElementById("embededchat-facebook-show-button").style.width = width + "px";
			}
		}
	}

	var apiMethod = function(url, params, callback, onFailureCallback, is_one_item_token) {
		params.project_token = _project_token;
		params.host = location.host;
		params.url = location.href;

		self.jsonp_handler.getJSON(url, params, callback, onFailureCallback);
	}

	var fetchChat = function(callback, force_load) {

		params = {
			screen_width: window.innerWidth || document.documentElement.clientWidth,
			screen_height: window.innerHeight || document.documentElement.clientHeight
		};

		if (self.args.edit_mode) {
			params.edit_mode = true;
		}

		function sucessCallback(response) {
			renderChat(response);
			if(callback) callback(response);
		}
		apiMethod(chat_widget_url, params, sucessCallback);
	}

	this.showChat = function() {
		document.getElementById("embededchat-facebook-container").style.display = "block";
		document.getElementById("embededchat-facebook-show-button").style.display = "none";
	}

	this.hideChat = function() {
		document.getElementById("embededchat-facebook-container").style.display = "none";
		document.getElementById("embededchat-facebook-show-button").style.display = "block";
	}

	var self = this;
}

	this.embeddedChatFacebook = new EmbeddedChatFacebook();
}

var embeddedChatFacebook = new EmbeddedChatFacebookNamespace().embeddedChatFacebook

embeddedChatFacebook.asyncInit();