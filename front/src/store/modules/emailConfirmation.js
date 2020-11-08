import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {
        async axiosEmailConfirmation(ctx, confirmLink) {

            await axios.post(
                '/account/confirmEmail', { confirmLink: confirmLink },
            )
                .then(response => {
                    let r = response.data
                    console.log(r)

                    if (r.success){
                        ctx.commit('changeIsConfirmed')
                        router.push('/home')
                    }
                    else {
                        alert('Ссылка не валидна')
                        router.push('/home')
                    }
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
    }
}