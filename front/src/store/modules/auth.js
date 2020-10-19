import router from '@/router/index.js'
import axios from 'axios'
export default {

    actions: {
        async axiosAuth(ctx, value) {
            ctx.commit('auth_request')
            const res = await axios({
                url: 'http://localhost:8080/account/authentification', data: value, method: 'POST'
            })
                .then(response => {
                    let r = response.data
                    // console.log(r)
                    if (r.success === false) {
                        //  console.log(r.msg)
                        ctx.commit('auth_error', r.msg)
                    } else {
                        const token = r.token
                        const user = r.user

                        if (r.favourites) {
                            localStorage.setItem('favArr', JSON.stringify(r.favourites))
                        }
                        console.log(user)
                        user.password = value.password
                        localStorage.setItem('user-token', token)
                        localStorage.setItem('user', JSON.stringify(user))
                        axios.defaults.headers.common['Authorization'] = token

                        ctx.commit('auth_success', [token, user])
                        router.push('/settings')
                    }
                })
                .catch(error => {
                    console.log(error)
                    localStorage.removeItem('user-token')
                });
        },

        logout(ctx) {
            ctx.commit('logout')
            localStorage.removeItem('user-token')
            localStorage.removeItem('user')
            localStorage.removeItem('favArr')
            delete axios.defaults.headers.common['Authorization']
            router.push('/login')
        }
    },

    mutations: {
        authentificationResponse(state, response) {

            state.registrationResponse = response
            if (response.success == true) {
                router.push('dashboard')
            }
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, arr) {

            state.status = 'success'
            state.token = arr[0]
            state.user = arr[1]
            console.log(arr[1])

        },
        auth_error(state, response) {
            state.errMsg = response
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
        
        changeEmail(state, updatedData) {

            console.log(email)
            console.log(state.user)
            state.user.email = updatedData.email
            state.user.isParticipant = updatedData.isParticipant
            state.user.isConfirmed = false
            console.log(state.user)
            localStorage.setItem('user', JSON.stringify(state.user))
        },

        changeRole(state, role) {
            console.log(role)
            console.log(state.user)
            state.user.role = role
            console.log(state.user)
            localStorage.setItem('user', JSON.stringify(state.user))
        },

        changePassword(state, password) {
            console.log(password)
            console.log(state.user)
            state.user.password = password
            console.log(state.user)
            localStorage.setItem('user', JSON.stringify(state.user))
        }

    },
    state: {
        errMsg: "",
        authentificationResponse: {},
        status: '',
        token: localStorage.getItem('user-token') || null,
        user: JSON.parse(localStorage.getItem('user')) || {},

    },

    getters: {
        getAuthentificationResponse(state) {
            return state.authentificationResponse
        },
        isLoggedIn(state) {

            return !!state.token
        },
        authStatus(state) {

            return state.status
        },
        errMsg(state) {
            return state.errMsg
        },
        getUser(state) {

            console.log(state.user)
            return state.user
        },
        emailErrorText(state) { 
            if(state.errMsg == 'email') return 'E-mail не найден в базе'
            return 'Введите E-mail'
        },
        passwordErrorText(state) {
            if(state.errMsg == 'password') return 'Неверный пароль'
            return 'Введите пароль'
        }
    },
}