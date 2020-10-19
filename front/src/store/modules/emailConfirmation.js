import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {
        async axiosEmailConfirmation(ctx, confirmLink) {

            await axios.post(
                'http://localhost:8080/account/confirmEmail', { confirmLink: confirmLink },
            )
                .then(response => {
                    let r = response.data
                    console.log(r)
                    if (!r.success)
                        alert('err')
                    else {
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