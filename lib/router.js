
Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/',{
  name: 'game',
  waitOn: function(){
    return Meteor.subscribe('weapons');
  }
});
