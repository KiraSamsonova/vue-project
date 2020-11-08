import axios from 'axios'

export default {
    actions: {
        async axiosGetAllThemes(ctx) {

            await axios.post(
                '/themes/getAllThemes',
            )
                .then(response => {

                    let r = response.data
                    //console.log(r.themes[0])
                   
                    ctx.commit('allThemes', r.themes[0])
                  //  ctx.commit('favBloggers', r.blogger)
                })
                .catch(error => {
                    console.log(error)

                });
        },


    },

    mutations: {
        allThemes(state, themes) {
            delete themes._id
            delete themes.__v
            state.themes = themes
        }
    },
    state: {
        themes: {}
    },

    getters: {
        getAllThemes(state) {
            return state.themes
        }
    },
}