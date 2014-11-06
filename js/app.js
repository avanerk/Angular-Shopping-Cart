var app = angular.module('shoppingCart', []);

app.controller('CartController', ['$scope', function($scope) {

	$scope.invoice = {
		//Dit wordt later vervangen door een functie die alle items uit de database haalt.
		items : [{
			hoeveelheid: 0,
			naam: 'Banaan',
			prijs: 19.95
		},
		{
			hoeveelheid: 5,
			naam: 'Kip',
			prijs: 9.95
		},
		{
			hoeveelheid: 45,
			naam: 'Kat',
			prijs: 89.95
		}],
		cart: []
	};

	$scope.addToCart = function(item) {
		$scope.invoice.cart.push(item);

		item.hoeveelheid -= 1;

		console.log($scope.invoice.cart);
	};

	$scope.removeItem = function(index) {
		$scope.invoice.items.splice(index, 1);
	}

	$scope.total = function() {

		var total = 0;

		angular.forEach($scope.invoice.cart, function(item) {
			angular.forEach($scope.invoice.cart, function(item) {
				total += item.prijs;
			});
		});

		return total;
	};

}]);