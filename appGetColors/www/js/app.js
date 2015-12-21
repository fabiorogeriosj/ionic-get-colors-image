// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('mainController', function ($scope, $cordovaCamera, $cordovaImagePicker){
  
  var colorThief = new ColorThief();

  $scope.palette = [];

  document.addEventListener("deviceready", function () {

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 600,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    var optionsPicker = {
     maximumImagesCount: 10,
     width: 800,
     height: 800,
     quality: 80
    };

    $scope.getCamera = function (){
      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('imgDemo');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });
    }

    $scope.getPicker = function (){
      $cordovaImagePicker.getPictures(optionsPicker)
      .then(function (results) {
        var image = document.getElementById('imgDemo');
        if(results.length){
          image.src = results[0];
        } else {
          alert("Select an image!");
        }

      }, function(error) {
        // error getting photos
      });
    }

  }, false);

  $scope.getColors = function (){
    var a = document.getElementById("imgDemo");
    if(a.src){
      var c = colorThief.getColor(a);
      var p = colorThief.getPalette(a, 5);
      $scope.palette = p;
    } else {
      alert("Take a picture first!");
    }
  }

})