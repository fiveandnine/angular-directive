var testModel = angular.module("testModel",[]);
testModel.controller("testController", function($scope){
	$scope.num=31;//输入框默认值
});
testModel.directive("inputdd", function(){
	return {
		restrict: 'E',
		scope: {
			locaal: '=ddnumber'

		},
		replace: false,
		template: "<span ng-click='delNum()'>-</span><input id='provSelect1' type='text' ng-model='locaal' ng-blur= 'blur_()' ng-keyup='onkeyup($event)' ng-afterpaste='onafterpaste($event)'></input><span ng-click='addNum()'>+</span>",
		link: function(scope, element, attra){
			var inp = element.context.childNodes[1];
			$(inp).bind('input propertychange', function(e){
				inp.value = inp.value.replace(/[^0-9]/g,'');
				if(parseInt(inp.value)>100){
					inp.value = 99;
				}
				if(parseInt(inp.value) == 0){
					inp.value = 1;
				}
				scope.locaal = inp.value;

			})	
			// 先触发失去焦点事件
			scope.blur_ = function(){
				if (! inp.value) {
					inp.value = 1;
					scope.locaal = 1;	
				}
			}
			scope.addNum = function(){
				scope.locaal = parseInt(scope.locaal) + 1;
				if (scope.locaal > 99) {
					scope.locaal = 99;
				}
			}
			scope.delNum = function(){
				scope.locaal = parseInt(scope.locaal) - 1;
				if (scope.locaal<1) {
					scope.locaal = 1;
				}
			}
		}
	}
})
testModel.directive("checkboxdd", function(){
	return {
		restrict: "E",
		scope: {
			checkboxtitle: "@title"
		},
		template:"<div><div class='checkouterbox'><div class='checkindexbox'></div></div><p>{{checkboxtitle}}</p></div>",
		replace: false,
		link: function(scope, element, attra){
			var type = $(element).parent().attr("type");
			// console.log(type);
			if (type == "checkbox") {
				var ch_in_bo = $(element).find(".checkindexbox");
				$(element).click(function(){
					ch_in_bo.hasClass("oncheckdd") ? ch_in_bo.removeClass("oncheckdd") : ch_in_bo.addClass("oncheckdd");
				})
			} else{
				var ch_in_bo = $(element).find(".checkindexbox");
				$(element).click(function(){
					var list = $(element).parent().children(".checkbox_dd");
					angular.forEach(list, function(data, index){
						$(data).find(".checkindexbox").removeClass("oncheckdd");
					})
					ch_in_bo.hasClass("oncheckdd") ? ch_in_bo.removeClass("oncheckdd") : ch_in_bo.addClass("oncheckdd");
				})
			}
		}
	}
})

