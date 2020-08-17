import "@babel/polyfill";
import Vue from 'vue/dist/vue.js';





new Vue({
    el: '#app',
    data() {
        return {
            products: [],
            productsToDisplay: [],
            inputSearch: '',
            filterProducts: [],
            productsToCompare: [],
            productPrices: [],
            grossPrices: [],
            filterBrands: 'ALL',
            checkedColors: [],
            priceMinimum: '',
            priceMaximum: '',
        }
    },
    created() {
        this.getProducts();
    },
    computed: {
        allBrands() {
            const brands = new Set();
            this.products.forEach(product => {
                brands.add(product.brand);
            })
            return [...brands].sort();
        },

        allCollors() {
            const collors = new Set();
            this.products.forEach(product => {
                collors.add(product.collor);
            })
            return console.log(collors)


        }
    },
    methods: {
        getProducts() {
            fetch("http://localhost:3000/products")
                .then(response => response.json())
                .then(json => {
                    this.products = json
                    this.productsToDisplay = json
                    // console.log(json)
                });
        },
        searchProducsts() {
            if (this.inputSearch.length > 2) {
                this.productsToDisplay = this.products.filter(product => {
                    return product.brand.toLowerCase().includes(this.inputSearch.toLowerCase()) || product.description.toLowerCase().includes(this.inputSearch.toLowerCase()) || product.name.toLowerCase().includes(this.inputSearch.toLowerCase());
                })
            }
            else {
                this.productsToDisplay = this.products
            };


        },
        selectBrand() {
            if (this.filterBrands !== "ALL") {
                this.productsToDisplay = this.products.filter(product => {
                    return product.brand === this.filterBrands;
                })
            } else {
                this.productsToDisplay = this.products
            }
        },
        filtrPrices() {
			this.productsToDisplay = this.products.filter(product => {
				if (product.price > parseInt(this.priceMinimum) && product.price < parseInt(this.priceMaximum)) {
					return true;
				} else {
					return false;
					
				}
			})
		},







        addProductToPriceComparision() {
            console.log("działa")
        },

        sortAscending() {
            this.productsToDisplay.sort((a, b) => { return a.price - b.price });
        },
        sortDescending() {
            this.productsToDisplay.sort((a, b) => { return b.price - a.price });

        },
        myFunction() {
            const check = document.getElementById("color1").checked;
            console.log(check)
        }

    },
})