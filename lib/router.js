Router.route('/',{
  name: 'game',
  waitOn: function(){
    Meteor.subscribe('weapons');
  }
});
