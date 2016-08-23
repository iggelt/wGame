
Router.configure({
  layoutTemplate: 'layout',
});


Router.route('/game/:_id',{
  name: 'game',
	  waitOn: function(){
		return[
		Meteor.subscribe('weapons'),
		Meteor.subscribe('oneGame',this.params._id)
		];
	  },	
});
Router.route('/',{
  name: 'start',
 // waitOn: function(){
  //  return Meteor.subscribe('weapons');
  //}
  
  
  
  
});
