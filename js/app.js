var app = angular.module('shoppingCart', ['localStorage']);

app.controller('CartController', ['$scope', '$store', function($scope, $store) {

	$store.bind($scope, 'cart', []);
	//$store.set('cart', []);


	$scope.invoice = {
		//Dit wordt later vervangen door een functie die alle items uit de database haalt.
		items : [{
			voorraad: 0,
			naam: 'Banaan',
			prijs: 19.95,
			id: 1001
		},
		{
			voorraad: 5,
			naam: 'Kip',
			prijs: 9.95,
			id: 1002
		},
		{
			voorraad: 45,
			naam: 'Kat',
			prijs: 89.95,
			id: 1003
		}],
		cart: $scope.cart
	};
	
	$scope.addToCart = function(item) {
		//check if there is already an item in the cart
		if($scope.cart.length > 0) {

			var gevonden = false;

			angular.forEach($scope.cart, function(cart, key) {
				//check if item is already in the cart, if yes icrement quantity
				if(item.id == cart.id) {
					cart.hoeveelheid++;
					gevonden = true;
				}

			});

			if(!gevonden) {
				item.hoeveelheid = 1;
				$scope.cart.push(item);
			}

		} else {
			item.hoeveelheid = 1;
			$scope.cart.push(item);

		}
		

		$store.set('cart', $scope.cart);

	};

	$scope.removeItem = function(index) {
		$scope.invoice.items.splice(index, 1);
	}

	$scope.total = function() {

		var total = 0;

		angular.forEach($scope.invoice.cart, function(item) {
				total += item.prijs * item.hoeveelheid;
		});

		return total;
	};

}]);

app.controller('CheckoutController', ['$scope', '$store', function($scope, $store) {

	$scope.cart = $store.get('cart');

	$scope.total = function() {

		var total = 0;

		angular.forEach($scope.cart, function(item) {
				total += item.prijs * item.hoeveelheid;
		});

		return total;
	};

}]);