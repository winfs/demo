new Vue({
    el: '#app',
    data: {
        products: [],
        loading: false,
        error: false,
        query: ''
    },
    methods: {
        search: function() {
            this.error = '';
            this.product = [];
            this.loading = true;

            axios.get(homeURL + '/api/search?q=' + this.query).then((response) => {
                response.data.error ? this.error = response.data.error : this.products = response.data;

                this.loading = false;
                this.query = '';
            }).catch((error) => {
                console.log(error);
            })
        }
    }
})
