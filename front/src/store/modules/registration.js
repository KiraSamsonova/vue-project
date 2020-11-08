import router from '@/router/index.js'
export default {

    actions: {
        async fetchReg(ctx, value = {}) {
            ctx.commit('emailIsInUse', '')
            const res = await fetch(
                '/account/registration', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(value) // body data type must match "Content-Type" header
            }
            );
            
            const r = await res.json()
            if(!r.success && r.msg === "Пользователь с таким email уже существует")  
            ctx.commit('emailIsInUse', r.msg)

            else if (r.success) router.push('/login')

            else console.log(r.msg)

        }
    },

    mutations: {
        emailIsInUse(state, msg) {
            state.emailIsInUse = msg
        }
    },
    state: {
        emailIsInUse: ''
    },

    getters: {
        emailIsInUse(state) {
            return state.emailIsInUse
        }

    },
}