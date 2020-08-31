"use strict";

require("@babel/polyfill");

var _vue = _interopRequireDefault(require("vue/dist/vue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

new _vue["default"]({
  el: '#app',
  data: function data() {
    return {
      products: [],
      productsToDisplay: [],
      inputSearch: '',
      filterProducts: [],
      productsToCompare: [],
      productPrices: [],
      grossPrices: [],
      filterBrands: 'ALL',
      checkedColors: 'ALL',
      priceMinimum: '',
      priceMaximum: '',
      page: 0,
      specialProduct: true
    };
  },
  created: function created() {
    this.getProducts();
  },
  computed: {
    allBrands: function allBrands() {
      var brands = new Set();
      this.products.forEach(function (product) {
        brands.add(product.brand);
      });
      return _toConsumableArray(brands).sort();
    },
    allColors: function allColors() {
      var colors = new Set();
      this.products.forEach(function (product) {
        colors.add(product.color);
      });
      return colors;
    },
    paginationPages: function paginationPages() {
      var numberOfPages = Math.ceil(this.productsToDisplay.length / 4);
      return Array.from({
        length: numberOfPages
      }, function (v, k) {
        return k;
      });
    },
    productsPerPage: function productsPerPage() {
      var startIndex = this.page * 4;
      return this.productsToDisplay.slice(startIndex, startIndex + 4);
    }
  },
  methods: {
    getProducts: function getProducts() {
      var _this = this;

      fetch("http://localhost:3000/products").then(function (response) {
        return response.json();
      }).then(function (json) {
        _this.products = json;
        _this.productsToDisplay = json; // console.log(json)
      });
    },
    searchProducsts: function searchProducsts() {
      var _this2 = this;

      if (this.inputSearch.length > 2) {
        this.productsToDisplay = this.products.filter(function (product) {
          return product.brand.toLowerCase().includes(_this2.inputSearch.toLowerCase()) || product.description.toLowerCase().includes(_this2.inputSearch.toLowerCase()) || product.name.toLowerCase().includes(_this2.inputSearch.toLowerCase());
        });
      } else {
        this.productsToDisplay = this.products;
      }

      ;
    },
    selectBrand: function selectBrand() {
      var _this3 = this;

      if (this.filterBrands !== "ALL") {
        this.productsToDisplay = this.products.filter(function (product) {
          return product.brand === _this3.filterBrands;
        });
      } else {
        this.productsToDisplay = this.products;
      }
    },
    filtrPrices: function filtrPrices() {
      var _this4 = this;

      this.productsToDisplay = this.products.filter(function (product) {
        if (product.price > parseInt(_this4.priceMinimum) && product.price < parseInt(_this4.priceMaximum)) {
          return true;
        } else {
          return false;
        }
      });
    },
    filterColors: function filterColors() {
      var _this5 = this;

      if (this.checkedColors !== "ALL") {
        this.productsToDisplay = this.products.filter(function (product) {
          return product.color === _this5.checkedColors;
        });
      } else {
        this.productsToDisplay = this.products;
      }
    },
    changePage: function changePage(page) {
      this.page = page;
    },
    withoutTax: function withoutTax(brutto) {
      var vat = 0.23;
      var valueVatPrice = brutto * vat;
      console.log(valueVatPrice);
      var nettoValue = brutto - valueVatPrice;
      return nettoValue.toFixed(2);
    },
    addProductToPriceComparision: function addProductToPriceComparision(product) {
      this.productsToCompare.push(product);
      console.log(this.productsToCompare);
    },
    delProductCompare: function delProductCompare(productToCompare) {
      this.productsToCompare.splice(0, 1);
    },
    sortAscending: function sortAscending() {
      this.productsToDisplay.sort(function (a, b) {
        return a.price - b.price;
      });
    },
    sortDescending: function sortDescending() {
      this.productsToDisplay.sort(function (a, b) {
        return b.price - a.price;
      });
    }
  }
});