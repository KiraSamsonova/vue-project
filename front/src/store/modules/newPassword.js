import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {
        async axiosPassConfirmLinkCheck(ctx) {
            console.log(ctx.getters.confirmLink)
            await axios.post(
                'http://localhost:8080/account/passConfirmLinkCheck', { confirmLink: ctx.getters.confirmLink },
            )
                .then(response => {

                    let r = response.data
                    console.log(r)
                    ctx.commit('passConfirmLinkIsValid', r.success)

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

        async axiosNewPassSave(ctx, newPass) {
            console.log(ctx.getters.confirmLink)
            console.log(newPass)
            await axios.post(
                'http://localhost:8080/account/newPassSave', { confirmLink: ctx.getters.confirmLink, newPass: newPass },
            )
                .then(response => {

                    let r = response.data
                    console.log(r)

                })
                .catch(error => {
                    console.log(error)

                });
        },

    },

    mutations: {
        passConfirmLinkIsValid(state, isValid) {
            state.passConfirmLinkIsValid = isValid
        }
    },
    state: {
        loading: true,
        passConfirmLinkIsValid: false,
        confirmLink: location.pathname.split('/').pop()
    },

    getters: {
        passConfirmLinkIsValid(state) {
            return state.passConfirmLinkIsValid
        },
        confirmLink(state) {
            return state.confirmLink
        }
    },
}