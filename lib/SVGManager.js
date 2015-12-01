//!function() {
	function SVGNode(element) {
		this.ns = 'http://www.w3.org/2000/svg';
		this.element = element || '';
		this.data = '';

	}

	SVGNode.prototype.createElement = function(selector) {
		return document.createElementNS(this.ns, selector);
	};

	SVGNode.prototype.append = function(selector) {
		var newElement = this.createElement(selector);
		var parent = this.element.parentElement;

		parent.appendChild(selector);

		return new SVGNode(newElement);
	};

	SVGNode.prototype.setData = function(data) {
		this.data = data;
	};

	// #SVGNodeList

	//#SVGNodeList Constructor fn
	function SVGNodeList(parent) {
		this.parent = parent || document.querySelector('html');
	}

	//#SVGNodeList inherits from Array
	SVGNodeList.prototype = new Array();


	SVGNodeList.select = function(selector) {

		var htmlElement = document.querySelector(selector);
		return htmlElement ? new SVGNodeList([htmlElement]) : htmlElement;
	};
	SVGNodeList.prototype.select = function(selector) {};


	SVGNodeList.selectAll = function(selector) {
		var nodeList = new SVGNodeList();

		nodeList.concat(this.map(function(element) {
			var node = new SVGNodeList(element);
			var children = element.querySelectorAll(selector);

			node.concat(children);

			return node;
		}, this));

		return nodeList;
	};
	SVGNodeList.prototype.selectAll = function(selector) {
		return this.map(function(element) {
			var nodelist = new SVGNodeList(element);
			var children = element.querySelectorAll(selector);

			nodelist.concat(children);

			return nodelist;
		}, this);
	};


	SVGNodeList.prototype.enter = function() {

	};

	SVGNodeList.prototype.append = function(selector) {
		var newNode;
		var elemListLength = this.elementList.length;
		//Handle 0 case

		while (this.data.length > elemListLength) {
			if(elemListLength === 0) {
				var node = new SVGNode();
				node.createElement(selector);
			}

			var lastElement = this.elementList[elemListLength - 1];

			newNode = lastElement.append(selector);
			newNode.setData(this.data[elemListLength]);
			this.elementList.push(newNode);

			elemListLength = this.elementList.length;
		}
	};

	SVGNodeList.prototype.setData = function(data) {
		var node;
		if (data instanceof Array) {
			this.data = data;

			for(var i in this.elementList) {
				node = this.elementList[i];
				this.elementList[i].data(data[i]);
			}
		}

		return this;
	};


	var SVGNodeList = {};


//}();