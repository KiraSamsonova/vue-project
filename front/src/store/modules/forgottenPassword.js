import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {
        async axiosNewPassLink(ctx, value) {

            await axios.post(
                'http://localhost:8080/account/createNewPassLink', { email: value },
            )
                .then(response => {

                    let r = response.data
                    ctx.commit('errorMsg', r.msg)
                    // if (r.success === false)
                    //     ctx.commit('errorMsg', r.msg)
                    // else {
                    //     console.log(r.msg)
                    //     ctx.commit('loading2')
                    // }
                })
                .catch(error => {
                    console.log(error)

                });
        },

    },

    mutations: {

    },
    state: {

    },

    getters: {

    },
}