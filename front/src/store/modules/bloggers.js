import axios from 'axios'
export default {

    actions: {
        async fetchAllBloggers(ctx, filtersValue = {}) {


            const res = await axios({
                url: 'http://localhost:8080/bloggers/allBloggers', data: filtersValue, method: 'POST'
            })
                .then(response => {
                   // console.warn(response.data)
                    ctx.commit('allBloggers', response.data)

                })
                .catch(error => {
                    console.log(error)

                });

        },



    },

    mutations: {
        allBloggers(state, response) {
            state.allBloggers = response
        },
        
    },
    state: {
        allBloggers: [],

    },

    getters: {
        getAllBloggers(state) {
            
            return state.allBloggers
        },
        
    },
}