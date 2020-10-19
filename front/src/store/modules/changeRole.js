import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {
      async axiosChangeRole(ctx, role) {
        const changeRole = {
            id: ctx.getters.getUser._id,
            role: role,
        }
        console.log(changeRole)
        await axios.post(
            'http://localhost:8080/account/changeRole', { changeRole: changeRole },
        )
            .then(response => {
 
              let r = response.data
              if(r.success === false) return console.log('err')

              ctx.commit('changeRole', role)

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