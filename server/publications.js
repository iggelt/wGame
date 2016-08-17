Meteor.publish('weapons',function(){
	return Weapons.find();
})