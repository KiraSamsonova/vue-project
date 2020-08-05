import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {
        async axiosEmailConfirmation(ctx, value) {

            await axios.post(
                'http://localhost:8080/account/confirmEmail', { confirmLink: value },
            )
                .then(response => {
                    let r = response.data

                    if (r.success === false)
                        ctx.commit('errorMsg', r.msg)
                    else {
                        console.log(r.msg)
                        ctx.commit('loading2')
                    }
                })
                .catch(error => {
                    console.log(error)

                });
        },

    },

    mutations: {
        errorMsg(state, msg) {
            state.msg = msg
        },
        loading2(state) {

            state.loading2 = !state.loading2
        }
    },
    state: {
        loading2: true,
        msg: "",
    },

    getters: {
        msg(state) {
            return state.msg
        },
        loading2(state) {
            return state.loading2
        }
    },
}