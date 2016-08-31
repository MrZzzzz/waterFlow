
window.onload=function(){
	// 自定义了一些滚动到底端时加载的数据
	var data=[{"src":"1.jpeg"},{"src":"2.jpeg"},{"src":"3.jpeg"},{"src":"4.jpeg"},{"src":"5.jpeg"},{"src":"6.jpeg"},{"src":"7.jpeg"},{"src":"8.jpeg"},{"src":"9.jpeg"},{"src":"10.jpeg"}];
	waterfull();
	// 滚动加载数据
	window.onscroll=function(){
		// 判断滚动条到了加载位置没
		if (checkSlide()) {
			var main=document.getElementsByClassName('main')[0];
			for (var i =0; i < data.length; i++) {
				var box=document.createElement('div');
				box.className='box';
				var pic=document.createElement('div');
				pic.className='pic';
				var img=document.createElement('img');
				img.src="img/"+data[i].src;
				pic.appendChild(img);
				box.appendChild(pic);
				main.appendChild(box);
			}
			waterfull();
		}
	}
}
// 瀑布流加载函数
function waterfull(){
	var boxArr=document.getElementsByClassName("box");
	var main=document.getElementsByClassName("main")[0];
	// 计算多少列
	var cols=Math.floor(document.documentElement.clientWidth/boxArr[0].offsetWidth);
	main.style.width=boxArr[0].offsetWidth*cols+20+"px";
	// 布局
	var colMinHeight=[];
	for (var i = 0; i < boxArr.length; i++) {
		// 布局第一行的几列，怎么排列
		if (i<cols) {
			boxArr[i].style.top=0;
			boxArr[i].style.left=i*boxArr[0].offsetWidth+"px";
			colMinHeight.push(boxArr[i].offsetHeight);		
		}
		// 布局之后的几列，怎么排列
		else{
			// 最小列的值
			var minHeight=getMinHeight(colMinHeight);
			// 最小列是第几列
			var mini=getMinCol(minHeight,colMinHeight);
			// 设置下一个图片定位的位置
			boxArr[i].style.top=minHeight+"px";
			boxArr[i].style.left=mini*boxArr[0].offsetWidth+"px";
			// 因为又加了一张图片，所以数组要重新改一下
			colMinHeight[mini]+=boxArr[i].offsetHeight;
		}	
	}
}
// 得到数组中列的最小值
function getMinHeight(arr){
	var min=arr[0];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i]<min) {
			min=arr[i];
		}
	}
	return min;
}
// 得到最小列是第几列,min是最小列的数值
function getMinCol(min,arr){
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]==min) {
			return i;
		}
	}
}
// 判断滚动条到了加载位置没
function checkSlide(){
	var boxArr=document.getElementsByClassName('box');
	var lastBoxScrollHeight=boxArr[boxArr.length-1].offsetTop;
	var lastBoxHeight=boxArr[boxArr.length-1].offsetHeight;
	// 最后一个框框距离顶部的位置+自身的高度一半
	var check1=lastBoxScrollHeight+Math.floor(lastBoxHeight/2);
	var bodyHeight=document.body.clientHeight||document.documentElement.clientHeight;
	var bodyScrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	// body中已经滚过的距离+body本身的高度
	var check2=bodyHeight+bodyScrollTop;
	// 符合条件返回true
	return (check1<check2)?true:false;
}
