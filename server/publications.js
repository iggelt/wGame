Meteor.publish('weapons',function(){
	return Weapons.find();
});
Meteor.publish('oneGame',function(gameId){
	return Games.find(gameId);
})