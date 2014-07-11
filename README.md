# angular-fullscreen2

Angular module providing a service which wraps the fullscreen API, and a directive which adds/removes a class on change

## Installation

`$ bower install angular-fullscreen2 --save`

## Usage

Include `angular-fullscreen2` in your module/app dependencies.

Toggle fullscreen using the service in a controller:

	angular.controller('MainCtrl', function($scope, Fullscreen) {

		$scope.fullscreenSupported = Fullscreen.isSupported();

		$scope.toggleFullscreen = function() {
			Fullscreen.toggle();
		};

	});

Use the directive to add/remove a class when entering/exiting fullscreen

	<div ng-fullscreen="fullscreen-active"></div>


## License

MIT