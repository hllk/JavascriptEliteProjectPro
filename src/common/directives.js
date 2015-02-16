angular.module('EmailApp').directive('receivedMails', function() {
  return {
      restrict: 'E',
      replace: 'true',
      template: '<div class="table-responsive"><table class="table table-hover"><thead><tr><th>Nadawca</th><th>Tytuł</th><th>Usuń</th></tr><tbody></tbody></thead></table></div>',
      controller: function ($scope) {
         $scope.del = function (id) {
             $scope.delete(id)   	
             	.success(function(jsonData, statusCode){
						var tableRow = $('#' + id);
						tableRow.remove();
					});
         };
         
         addElement = function (mail) {
         	var fragment = mail.content.substr(0, 150) + "...";
        		var sender = $("<td>" + mail.sender +"</td>");
        		var title = $("<td><a href=\"#/view/" +mail.id+ "\">" + mail.title +"</a><p>"+fragment+"</p></td>");
        		var removeBtn = $("<button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"del()\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span></button>");
				removeBtn.bind('click', function(){
            	$scope.del(mail.id); 
			   }); 
				var remove = $("<td></td>").append(removeBtn);        			
        		var row = $("<tr class='read-"+mail.read+"' id='"+mail.id+"'></tr>)");
        		$("tbody").prepend(row.append(sender).append(title).append(remove));
        };
        
        var formatTime = function(timestamp) {
	 			var date = new Date(timestamp * 1000);
				var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
				return datevalues;
			};
      },

      link: function(scope, elem, attrs) {
         scope.$watch('newemails', function(list) {
         	for(var i in scope.newemails){
         		var mail = list[i];
        			addElement(mail);
         	}
      	});
    	}
  	};
});

angular.module('EmailApp').directive('listView', function() {
  return {
      restrict: 'E',
      replace: 'true',
      template: '<div class="table-responsive"><table class="table table-hover"><thead><tr><th>Odbiorcy</th><th>Tytuł</th></tr><tbody></tbody></thead></table></div>',
      scope: {
      // creates a scope variable in your directive
      // called `list` bound to whatever was passed
      // in via the `list` attribute in the DOM
      	list: '=list'
      },
      //The link function is mainly used for:
      //   attaching event listeners to DOM elements,
      //   watching model properties for changes, 
      //   and updating the DOM.
      link: function(scope, elem, attrs) {

         scope.$watch('list', function(list) {
        		angular.forEach(list, function(mail, key) {
        			$("tbody").prepend("<tr><td>" + mail.receivers +"</td><td><a href=\"#/sentview/" +mail.id+ "\">" + mail.title +"</a></td></tr>)");
        		});
      	});
    	}
  	};
});

angular.module('EmailApp').directive('isActiveNav', [ '$location', function($location) {
	return {
 		restrict: 'A',
 		link: function(scope, element) {
   		scope.location = $location;
   		scope.$watch('location.path()', function(currentPath) {
     			if('#' + currentPath === element[0].attributes.href.nodeValue) {
       			element.parent().addClass('active');
     			} else {
       			element.parent().removeClass('active');
     			}
   		});
 		}
 	};
}]);