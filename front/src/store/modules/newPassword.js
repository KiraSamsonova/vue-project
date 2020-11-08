import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {
        async axiosPassConfirmLinkCheck(ctx) {
            console.log(ctx.getters.passLink)
            // 
            await axios.post(
                '/account/passLinkCheck', { passLink: ctx.getters.passLink },
            )
                .then(response => {
                    let r = response.data
                    console.log(r)
                    if (r.success) ctx.commit('passLinkIsValid', r.success)
                    else ctx.commit('errorMsg', r.msg)
                })
                .catch(error => {
                    console.log(error)
                });
        },

        async axiosNewPassSave(ctx, newPass) {
            console.log(ctx.getters.passLink)
            console.log(newPass)
            await axios.post(
                '/account/newPassSave', { passLink: ctx.getters.passLink, newPass: newPass },
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
        passLinkIsValid(state, isValid) {
            state.passLinkIsValid = isValid
        }
    },
    state: {
        loading: true,
        passLinkIsValid: false,
        passLink: () => {
            const urlParams = new URLSearchParams(window.location.search);
            const passlink = urlParams.get('passlink')
            return passlink
        }
        

    },

    getters: {
        passLinkIsValid(state) {
            return state.passLinkIsValid
        },
        passLink(state) {
            return state.passLink()
        }
    },
}