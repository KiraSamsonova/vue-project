import axios from 'axios'
import router from '@/router/index.js'
export default {

    actions: {

        async axiosChangePassword(ctx, newPass) {

         let id = ctx.getters.getUser._id
         let oldPass = ctx.getters.getUser.password
          await axios.post(
            '/account/changePassword', { id: id, oldPass: oldPass, newPass: newPass },
          )
            .then(response => {

              let r = response.data

              if (r.success) {
                console.log(r.msg)
                ctx.commit('changePassword', newPass)
                ctx.commit('savedSuccess')
                ctx.commit('changeSettingsMode', 'show')
              }

              else console.log(r.msg)
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