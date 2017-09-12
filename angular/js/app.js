var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/',
    template: '<h3>hello world!</h3>',
    controller: 'scheduleCtrl',
    onEnter: function(){
        Webflow.destroy();
        }
    //template: '<h3>hello world!</h3>'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});