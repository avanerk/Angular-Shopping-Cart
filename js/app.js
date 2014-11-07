var app = angular.module('shoppingCart', ['localStorage']);

app.controller('CartController', ['$scope', '$store', function($scope, $store) {

	$store.bind($scope, 'cart', []);


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
		cart: $scope.cart
	};
	
	$scope.addToCart = function(item) {
		$scope.cart.push(item);

		$store.set('cart', $scope.cart);

		item.hoeveelheid -= 1;
	};

	$scope.removeItem = function(index) {
		$scope.invoice.items.splice(index, 1);
	}

	$scope.total = function() {

		var total = 0;

		angular.forEach($scope.invoice.cart, function(item) {
				total += item.prijs;
		});

		return total;
	};

}]);

app.controller('CheckoutController', ['$scope', '$store', function($scope, $store) {

	$scope.kek = $store.get('cart');

}]);