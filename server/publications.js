Meteor.publish('weapons',function(){
	return Weapons.find();
});
Meteor.publish('games',function(gameId){
	return Weapons.find(gameId);
})