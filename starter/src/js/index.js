import "@babel/polyfill";
import Vue from 'vue/dist/vue.js';





new Vue({
    el: '#app',
    data() {
        return {
            products: [],
            inputSearch: '',
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
                    console.log(json)
                });
        },
        searchProducsts(){
            if(this.inputSearch.length>3){
               this.products.filter(product=> {
                   const matchText = product.name.toLowerCase().includes(this.inputSearch.toLowerCase());
                   if(matchText) {
                       console.log(product.name);
                   }
               }) 
            }
        }
    }
})