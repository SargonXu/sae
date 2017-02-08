$(function(){
	var $oContent = $("#content");
	var $aPages = $oContent.find(".page");		//获取page页面元素集合
	var $aSlideBtns = $("#slide-nav a");		//获取侧边栏按钮组
	var $skillList = $("#skill .skill-list");		//获取技能列表
	var iClientH = $(window).height();


	$aPages.css({height:iClientH});
	$(window).resize(function(){
		$aPages.css({height:iClientH});
	});


	/*注册侧边栏按钮点击事件*/
	$aSlideBtns.click(function(event){
		event.preventDefault();
		turnPage(this);	
	})

	/*注册滚轮事件*/
	$(document).on("mousewheel",function(event){
		var $oldCurrent = $aSlideBtns.parent().filter(".current");
		if(event.originalEvent.wheelDelta>0){
			if($oldCurrent.index() === 0){
				return false;
			}else{
				var $obj =$oldCurrent.prev().children();
			}
		}
		if(event.originalEvent.wheelDelta<0){
			if($oldCurrent.index() === $aSlideBtns.length-1){
				return false;
			}else{
				var $obj = $oldCurrent.next().children();
			}
		}
		turnPage($obj);
	});
	$(document).on("DOMMouseScroll",function(event){
		var $oldCurrent = $aSlideBtns.parent().filter(".current");
		if(event.originalEvent.detail<0){
			if($oldCurrent.index() === 0){
				return false;
			}else{
				var $obj =$oldCurrent.prev().children();
			}
		}
		if(event.originalEvent.detail>0){
			if($oldCurrent.index() === $aSlideBtns.length-1){
				return false;
			}else{
				var $obj = $oldCurrent.next().children();
			}
		}
		turnPage($obj);
	});




	/*注册skill-list点击事件*/
	var $aSkillItem = $skillList.children();
	var $aSkillLink = $aSkillItem.find("div a");
	var $aSkillP = $aSkillItem.find("div p");
	var $aSkillDetail = $aSkillItem.find("div .skill-detail");
	$aSkillLink.click(function(event){
		event.preventDefault();
		$aSkillItem.each(function(){
			$(this).removeClass("current");
		});
		$(this).parent().parent().addClass("current");
	});
	/*翻页*/
	function turnPage(obj){
		if($(obj).parent().hasClass("current")){
			return false;
		}else{
			var $newCurrent = $(obj).parent();
			var $oldCurrent = $(obj).parent().siblings().filter(".current");
			$oldCurrent.removeClass("current");	
			$newCurrent.addClass("current");
			$aPages.eq($oldCurrent.index()).slideUp(800,function(){
				$(this).children().slideUp();
			});
			$aPages.eq($newCurrent.index()).slideDown(800,function(){
				$(this).children().slideDown("slow");
			});
		}
	}
});