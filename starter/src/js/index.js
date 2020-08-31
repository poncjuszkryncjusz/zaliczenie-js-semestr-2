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
            checkedColors: 'ALL',
            priceMinimum: '',
            priceMaximum: '',
            page: 0,
            specialProduct: true,
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

        allColors() {
            const colors = new Set();
            this.products.forEach(product => {
                colors.add(product.color);
            })
            return colors

        },

        paginationPages() {
            const numberOfPages = Math.ceil(this.productsToDisplay.length / 4);
            return Array.from({ length: numberOfPages }, (v, k) => k);
        },

        productsPerPage() {
            const startIndex = this.page * 4;
            return this.productsToDisplay.slice(startIndex, startIndex + 4)
        },
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

        filterColors() {
            if (this.checkedColors !== "ALL") {
                this.productsToDisplay = this.products.filter(product => {
                    return product.color === this.checkedColors;
                })

            } else {
                this.productsToDisplay = this.products
            }
        },

        changePage(page) {
            this.page = page;
        },

        withoutTax(brutto) {
            const vat = 0.23;
            let valueVatPrice = (brutto * vat);
            console.log(valueVatPrice);

            let nettoValue = brutto - valueVatPrice;

            return nettoValue.toFixed(2)
        },

        addProductToPriceComparision(product) {
            this.productsToCompare.push(product);

            console.log(this.productsToCompare)
        },

        delProductCompare(productToCompare) {
            this.productsToCompare.splice(0, 1);
        },

        sortAscending() {
            this.productsToDisplay.sort((a, b) => { return a.price - b.price });
        },
        sortDescending() {
            this.productsToDisplay.sort((a, b) => { return b.price - a.price });
        },
    },
})