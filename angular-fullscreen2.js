/*
    Name: angular-fullscreen2
    Description: Angular module providing a service which wraps the fullscreen API, and a directive which adds/removes a class on change
    Usage: http://github.com/homerjam/angular-fullscreen2
    Author: jameshomer85@gmail.com
    Licence: MIT
*/
(function() {

    'use strict';

    angular.module('angular-fullscreen2', []);

    angular.module('angular-fullscreen2').factory('Fullscreen', ['$document',
        function($document) {
            var doc = $document[0];
            var docEl = doc.documentElement;

            var service = {};

            service.request = function(element) {
                element = element || docEl;
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            };

            service.exit = function() {
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                }
            };

            service.isEnabled = function() {
                return (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);
            };

            service.toggle = function(element) {
                element = element || docEl;
                return service.isEnabled() ? service.exit() : service.request(element);
            };

            service.isSupported = function() {
                return (docEl.fullscreenEnabled || docEl.webkitFullscreenEnabled || docEl.mozFullScreenEnabled || docEl.msFullscreenEnabled);
            };

            return service;
        }
    ]);

    angular.module('angular-fullscreen2').directive('ngFullscreen', ['Fullscreen', '$document', '$timeout',
        function(Fullscreen, $document, $timeout) {
            return {
                restrict: 'A',
                link: function($scope, $element, $attrs) {

                    $document.on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
                        $element[0].classList[Fullscreen.isEnabled() ? 'add' : 'remove']($attrs.ngFullscreen || 'fullscreen');

                        $scope[$attrs.ngFullscreen || 'fullscreen'] = Fullscreen.isEnabled();
                    });

                }
            };
        }
    ]);

})();
