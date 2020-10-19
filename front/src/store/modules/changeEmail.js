import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {

      async axiosChangeEmail(ctx, newEmail) {
        if (Object.keys(ctx.getters.getUser).length !== 0) {
          let id = ctx.getters.getUser._id
          let password = ctx.getters.getUser.password
          await axios.post(
            'http://localhost:8080/account/changeEmail', { newEmail: newEmail, id: id, password: password },
          )
            .then(response => {
              let r = response.data
              console.log(r)
              if(!r.success) ctx.commit('changeEmailErrorMsg', r.msg)

              if (r.success) {
                ctx.commit('changeEmail', { isParticipant: r.isParticipant, email: r.email })
                ctx.commit('savedSuccess')
              }
            })

            .catch(error => {
              console.log(error)
            });

        } else console.log('strange auth error')
      },

    },

    mutations: {
      changeEmailErrorMsg(state, msg) {
        state.changeEmailErrorMsg = msg
      },
      savedSuccess(state) {
        state.settingsMode = 'show'
        state.savedSuccess = true
        setTimeout(savedSuccessFalse, 3000)
        function savedSuccessFalse() {   
          state.savedSuccess = false
        }
      },
      changeSettingsMode(state, mode) {
        state.settingsMode = mode
      }
    },

    state: {
      changeEmailErrorMsg: '',
      settingsMode: 'show',
      savedSuccess: false,
    },

    getters: {
      changeEmailErrorMsg(state) {
        return state.changeEmailErrorMsg
      },
      
      savedSuccess(state) {
        return state.savedSuccess
      },
      settingsMode(state) {
        return state.settingsMode
      }
    },
}