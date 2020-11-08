import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {
        async axiosFavBloggers(ctx, favArr) {

            await axios.post(
                '/bloggers/showFavBloggers', { favArr: favArr },
            )
                .then(response => {

                    let r = response.data
                    console.log(r)
                    if (r.reason === 'no Favs!')
                        return ctx.commit('favBloggers', {})

                    ctx.commit('errorMsg', r.msg)
                    ctx.commit('favBloggers', r.blogger)
                })
                .catch(error => {
                    console.log(error)

                });
        },
        async axiosSaveFavBloggers(ctx) {
            const FavObj = {
                id: ctx.getters.getUser._id,
                favArr: ctx.getters.getFavArr
            }
            console.log(FavObj)
            await axios.post(
                '/bloggers/SaveFavBloggers', { FavObj: FavObj },
            )
                .then(response => {

                    let r = response.data
                    ctx.commit('errorMsg', r.msg)

                })
                .catch(error => {
                    console.log(error)

                });
        },

        updateFavArr(ctx, whatToDo) {
            console.log(whatToDo)
            let favArr = ctx.getters.getFavArr
            let favBloggers = ctx.getters.favBloggers
            if (whatToDo[1]) { // Добавляем
                favArr.push(whatToDo[0])
            }
            else if (!whatToDo[1]) { // убираем
                favArr = favArr.filter(elem => elem !== whatToDo[0])
                favBloggers = favBloggers.filter(elem => elem._id !== whatToDo[0])
            }
            console.log(favArr)
            localStorage.setItem('favArr', JSON.stringify(favArr))
            ctx.commit('favArr', favArr)
            ctx.commit('favBloggers', favBloggers)
        }
    },

    mutations: {
        favBloggers(state, blogger) {
            state.favBloggers = blogger
        },
        favArr(state, favArr) {
            state.favArr = favArr
            //favBloggers: JSON.parse(localStorage.getItem('user') || '{}').favourites
        }
    },
    state: {
        favBloggers: [],
        favArr: JSON.parse(localStorage.getItem('favArr') || '[]')
    },

    getters: {
        favBloggers(state) {
            console.log(state.favBloggers)
            return state.favBloggers
        },
        getFavArr(state) {
            console.log(state.favArr)
            if (state.favArr && state.favArr !== null)
                return state.favArr

            return []
        }
    },
}