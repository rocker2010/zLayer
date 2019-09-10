// 点击元素Z轴浮动效果插件
// 应用于移动端，可以使内容在XY轴的二维层面增加Z轴的三维展示
// 基本构造格式:
// =======================================================
// <ul id="应用插件的ID">
// 	<li>
// 		<h3 class="text_title">标题</h3>
// 		<img src="标题图片" class="text_img">
// 		<div class="text_content">内容</div>
// 	</li>
// 	......
// </ul>
// var 自定义名称 = new zLayers('应用插件的ID');
// =======================================================
// 作者：liuwz
// Git：https://github.com/rocker2010/zLayer
// 版本号：V1.0


function zLayers(selector) {
	/* 变量改为属性 */
	this.zLayer = document.querySelector(selector);
	this.zLayerList = this.zLayer.querySelectorAll('li');
	this.zLayerImg = this.zLayer.querySelectorAll('img');
	this.zLayerWidth = this.zLayer.querySelector('li').offsetWidth;
	this.zLayerHeight = this.zLayer.querySelector('li').offsetHeight;
	this.zLayerListLength = this.zLayerList.length;

	this.init();
}

zLayers.prototype = {
	constructor: zLayers,
	/* 功能抽离，此处实现初始化 */
	init: function() {
		// 此处去掉列表图片在移动端的点击预览
		for (var i = 0; i < this.zLayerImg.length; i++) {
			this.zLayerImg[i].addEventListener('click', function(e) {
				e.preventDefault();
			});
		}

		var Layerwidth = this.zLayerWidth
		LayerHeight = this.zLayerHeight
		ListLength = this.zLayerListLength
		LayerList = this.zLayerList

		// 点击显示详细函数
		function showLayer(that) {
			that.classList.add("zLayerShow");
			that.style.cssText = "position:fixed;z-index:999999;width:" + Layerwidth + "px;box-shadow: 8px 16px 32px #3c3c3c;"
			var showBefHeight = that.offsetHeight;
			that.getElementsByClassName("text_title")[0].append(closebtn);
			var showHeight = that.offsetHeight;
			that.style.height = LayerHeight + "px";
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			var layerTop = document.querySelector(".zLayerPlace").offsetTop - scrollTop;
			that.style.cssText = that.style.cssText + "top:" + layerTop + "px;"
			setTimeout(function() {
				that.style.cssText = that.style.cssText + "top:50%;transform:translateY(-50%);-ms-transform: translateX(-50%);-moz-transform: translateX(-50%);-webkit-transform: translateX(-50%);-o-transform: translateX(-50%);height:" + showHeight + "px"
			}, 400)
		};

		// 点击关闭按钮关闭显示
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

		// 给列表增加点击显示的功能
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
