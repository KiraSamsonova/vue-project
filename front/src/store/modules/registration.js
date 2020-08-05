import router from '@/router/index.js'
export default {

    actions: {
        async fetchReg(ctx, value = {}) {
            const res = await fetch(
                'http://localhost:8080/account/registration', {
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
            const response = await res.json()
            if (response.success === true) router.push('/login')
            else console.log(response.msg)
        }
    },

    mutations: {

    },
    state: {

    },

    getters: {


    },
}