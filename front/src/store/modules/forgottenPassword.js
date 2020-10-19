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
                    console.log(r)
                    if (r.success === false)
                        ctx.commit('passLinkFailedReason', r.msg)
                    else {
                        console.log(r.msg)
                        ctx.commit('passLinkSuccesfullyCreated')
                    }
                })
                .catch(error => {
                    console.log(error)

                });
        },

    },

    mutations: {
        passLinkFailedReason(state, reason) {
            state.passLinkFailedReason = reason
        },

        passLinkSuccesfullyCreated(state) {
            state.passLinkSuccesfullyCreated = false
        }
    },
    state: {
        passLinkFailedReason: '',
        passLinkSuccesfullyCreated: true
    },

    getters: {
        passLinkFailedReason(state) {
            return state.passLinkFailedReason
        },

        passLinkSuccesfullyCreated(state) {
            return state.passLinkSuccesfullyCreated
        },

        passLinkFailedErrorText(state) {
            if(state.passLinkFailedReason == 'email') return 'E-mail не найден в базе'
            if(state.passLinkFailedReason == 'otherReason') return 'Ошибка. Обратитесь в техническую поддержку'
            return 'Введите E-mail'
        }
    },
}