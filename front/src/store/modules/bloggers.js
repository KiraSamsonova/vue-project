import axios from 'axios'
export default {

    actions: {
        async fetchAllBloggers(ctx, filtersValue = {}) {

            const res = await axios({
                url: 'http://localhost:8080/bloggers/allBloggers', data: filtersValue, method: 'POST'
            })
                .then(response => {
                    console.log(response.data)
                    ctx.commit('allBloggers', response.data.blogger)
                    

                })
                .catch(error => {
                    console.log(error)

                });

        },

        async axiosBloggerById(ctx, id) {

            await axios.post(
                'http://localhost:8080/bloggers/findBloggerById', { id: id }
            )
                .then(response => {

                    let r = response.data
                    console.log(r.blogger)
                    if(!r.blogger) ctx.commit('noBloggersWasFound') 
                    else {
                    let toCommit = r.blogger
                    if (r.blogger._id) toCommit = [r.blogger]
                    ctx.commit('allBloggers', toCommit)
                    }
                })
                .catch(error => {
                    console.log(error)

                });
            
        }

    },

    mutations: {
        allBloggers(state, response) {
            // state.allBloggers = response.sort((a, b) => {
            //     return b.subscribersNumber-a.subscribersNumber
            //   })

            let r = response.concat(response, response,response, response )
              state.allBloggers = r.sort((a, b) => {
                return b.subscribersNumber-a.subscribersNumber
              })
        },

        noBloggersWasFound(state) {
            state.allBloggers = []
        },
        changePage(state, pageNumber) {
            state.paginationPage = pageNumber
        }
    },

    state: {
        allBloggers: [],
        paginationPage: 1,
        numberOfCardsOnPage: 2,
    },

    getters: { 
        getAllBloggers(state) {
            return state.allBloggers;
        },

        getAllBloggersLength(state) {
            return state.allBloggers.length;
        },

        getCurrentpaginationPage(state) {
            return state.paginationPage
        },

        getAllBloggersPaginated(state) {   

            let startPos = state.paginationPage * state.numberOfCardsOnPage - +2
            let paginated = [state.allBloggers[startPos], state.allBloggers[startPos+1] ]
            let test = paginated.filter(elem => elem !== undefined)

            return test
        },

        getPaginationPagesNumber(state) {
            let getPaginationPagesNumber = []
            for(var i = 1; i <= state.allBloggers.length; i++) {

                getPaginationPagesNumber.push('one')
                i++
            }
            return getPaginationPagesNumber
        }

        }

    
}