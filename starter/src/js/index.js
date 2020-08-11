import "@babel/polyfill";
import Vue from 'vue/dist/vue.js';





new Vue({
    el: '#app',
    data() {
        return {
            products: [],
            inputSearch: '',
            filterProducts: [],
            productsToCompare: [],
            productPrices: [],
            grossPrices: [],
        }
    },
    created() {
        this.getProducts();
    },
    methods: {
        getProducts() {
            fetch("http://localhost:3000/products")
                .then(response => response.json())
                .then(json => {
                    this.products = json
                    // console.log(json)
                });
        },
        searchProducsts() {
            this.filterProducts = [];
            if (this.inputSearch.length > 2) {
                this.products.filter(product => {
                    const matchTextBrand = product.brand.toLowerCase().includes(this.inputSearch.toLowerCase());
                    const matchTextDescription = product.description.toLowerCase().includes(this.inputSearch.toLowerCase());
                    const matchTextName = product.name.toLowerCase().includes(this.inputSearch.toLowerCase());
                    if (matchTextName) {
                        this.filterProducts.push(product.name);
                        // console.log(product.name);
                    }
                    if (matchTextBrand) {
                        this.filterProducts.push(product.name);
                        //console.log(product.brand);

                    }
                    if (matchTextDescription) {
                        this.filterProducts.push(product.name);
                        //  console.log(product.description);
                    }
                })
            }
        },
        addProductToPriceComparision() {
            console.log("działa")
        },

        sortAscending() {
            // this.productPrices = [];
            this.products.filter(product => {
                const prices = parseInt(product.price);
                //   console.log(this.productPrices )
                if (prices) {
                    const gross = prices * 1.23;

                    this.grossPrices.push(gross);
                    this.grossPrices.sort(function (a, b) { return a - b });
                    console.log(this.grossPrices);


                    this.productPrices.push(prices);
                    this.productPrices.sort(function (a, b) { return a - b });
                    // console.log(this.productPrices);
                }
            })
        },
        sortDescending() {
            this.products.filter(product => {
                const prices = parseInt(product.price);
                //   console.log(this.productPrices )
                if (prices) {

                    const gross = prices * 1.23;

                    this.grossPrices.push(gross);
                    this.grossPrices.sort(function (a, b) { return b - a });
                    console.log(this.grossPrices);

                    this.productPrices.push(prices);
                    this.productPrices.sort(function (a, b) { return b - a });
                    // console.log(this.productPrices);
                }
            })
        },
        myFunction() {
            const check = document.getElementById("color1").checked;
            console.log(check)
        }

    },
})