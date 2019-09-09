// 点击元素Z轴浮动效果插件
// 作者：liuwz
// 版本号：V1.0 日期：2019.09.06


function zLayers(selector) {
	/* 变量改为属性 */
	this.zLayer = document.querySelector(selector);
	this.zLayerList = this.zLayer.querySelectorAll('li');
	this.zLayerWidth = this.zLayer.querySelector('li').offsetWidth;
	this.zLayerHeight = this.zLayer.querySelector('li').offsetHeight;
	this.zLayerListLength = this.zLayerList.length;

	this.init();
}

zLayers.prototype = {
	constructor: zLayers,

	/* 功能抽离，此处实现初始化 */
	init: function() {
		var Layerwidth = this.zLayerWidth
		LayerHeight = this.zLayerHeight
		ListLength = this.zLayerListLength
		LayerList = this.zLayerList

		function showLayer(that) {
			that.style.cssText = "position:fixed;z-index:999999;width:" + Layerwidth +"px;box-shadow: 8px 16px 32px #3c3c3c;"
			that.classList.add("zLayerShow");
			that.getElementsByClassName("text_title")[0].append(closebtn);
			var showHeight = that.offsetHeight;
			that.offsetHeight=211;
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			var layerTop = document.querySelector(".zLayerPlace").offsetTop - scrollTop;
			that.style.cssText = that.style.cssText + "top:" + layerTop + "px;"
			// console.log(document.documentElement.scrollTop + ":" + document.querySelector(".zLayerPlace").offsetTop);
			setTimeout(function() {
				that.style.cssText = that.style.cssText + "top:50%;transform:translateY(-50%);height:" + showHeight + "px"
			}, 400)
		};

		var closebtn = document.createElement("span");
		closebtn.innerHTML = "×";
		closebtn.className = 'closeBtn';
		closebtn.onclick = function() {
			var e = event.target;
			var thisDiv = document.querySelector(".zLayerShow");
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			var layerTop = document.querySelector(".zLayerPlace").offsetTop - scrollTop;
			document.querySelector(".zLayerMask").style.cssText = "opacity:0;"
			console.log(document.documentElement.scrollTop);
			setTimeout(function() {
				thisDiv.style.cssText = thisDiv.style.cssText + "top:" + layerTop +
					"px;transform:none;box-shadow: rgb(60, 60, 60) 0 0 0;";
			}, 200);
			setTimeout(function() {
				thisDiv.style.cssText = thisDiv.style.cssText + "height: " + document.querySelector(".zLayerPlace").offsetHeight +
					"px;"
			}, 400);
			setTimeout(function() {
				document.querySelector(".zLayerMask").remove();
				document.querySelector(".zLayerPlace").remove();
				e.remove();
				thisDiv.classList.remove("zLayerShow");
				thisDiv.style.cssText = "";
			}, 600);

			document.querySelector("body").style.overflow = "";

			thisDiv.onclick = function() {
				var that = this;
				var node = that.cloneNode(true);
				node.innerHTML = "";
				node.classList.add("zLayerPlace");
				node.style.height = LayerHeight + "px";
				that.parentNode.insertBefore(node, that);
				that.style.position = "fixed";
				showLayer(that);
				that.insertAdjacentHTML("afterend", "<div class='zLayerMask'></div>");
				setTimeout(function() {
					document.querySelector(".zLayerMask").style.cssText = "opacity: 0.6;"
				}, 400);
				document.querySelector("body").style.overflow = "hidden";
				that.onclick = null;
			}

			if (e.stopPropagation) {
				e.stopPropagation();
			} else if (window.event) {
				window.event.cancelBubble = true;
			}
		};
		for (var i = 0; i < this.zLayerListLength; i++) {
			this.zLayerList[i].onclick = function() {
				var that = this;
				var node = that.cloneNode(true);
				node.innerHTML = "";
				node.classList.add("zLayerPlace");
				node.style.height = LayerHeight + "px";
				that.parentNode.insertBefore(node, that);
				that.style.position = "fixed";
				showLayer(that);
				that.insertAdjacentHTML("afterend", "<div class='zLayerMask'></div>");
				setTimeout(function() {
					document.querySelector(".zLayerMask").style.cssText = "opacity: 0.6;"
				}, 600);
				document.querySelector("body").style.overflow = "hidden";
				that.onclick = null;
			};
		}
	}
};
