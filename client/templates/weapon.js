var objectsLeft=0;
var objectsRight=0;

Template.weapon.helpers({
	attributes: function(){
		var attributes = {};
		
		
		return attributes;
	},
	top: function(){
		return Math.round(Math.random()*100);
	},
	left: function(){
		var rezult=0;
		if(Math.max(objectsLeft,objectsRight)==objectsLeft){
			rezult=100;
			objectsRight++;
		}else{
			rezult=-100;
			objectsLeft++;
		}
		return rezult;
	},
	duration: function(){
		return 20;
	},
	delay: function(){
		return 10;
	}

});
Template.weapon.events({
	'click .weapon': function(e){
		e.preventDefault();
		alert(this.name);
	}
})