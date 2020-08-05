import axios from 'axios'
import router from '@/router/index.js'
export default {
    actions: {

        async axiosChangeEmail(ctx, newEmail) {
            if (Object.keys(ctx.getters.getUser).length !== 0) {
                let id = ctx.getters.getUser._id
                let oldEmail = ctx.getters.getUser.email
                await axios.post(
                    'http://localhost:8080/account/changeEmail', { newEmail: newEmail, id: id, oldEmail: oldEmail },
                )
                    .then(response => {

                        let r = response.data
                        console.log(r)
                        if (r.success == true)
                            ctx.commit('changeEmail', { isParticipant: r.isParticipant, email: r.email })
                        else console.log(r.msg)
                    })
                    .catch(error => {
                        console.log(error)

                    });
            } else console.log('strange auth error')
        },

        async axiosChangePassword(ctx, user) {
            let id = ctx.getters.usersId
            user.id = id

            await axios.post(
                'http://localhost:8080/account/changePassword', { user: user },
            )
                .then(response => {

                    let r = response.data
                    console.log(r)
                    if (r.success == true)
                        console.log(r.msg)
                    else console.log(r.msg)
                })
                .catch(error => {
                    console.log(error)

                });
        },

    },

    mutations: {
        // changeEmail(state, email) {
        //     let user = JSON.parse(localStorage.getItem('user'))
        //     user.email = email,
        //         localStorage.setItem('user', JSON.stringify(user))
        //     state.user.email = email
        // }
    },
    state: {
        //  user: JSON.parse(localStorage.getItem('user')) || {},
    },

    getters: {
        // getEmail(state) {
        //     return state.user.email
        // }

    },
}