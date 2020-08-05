import axios from 'axios'

export default {

    actions: {
        async fetchAllProfiles(ctx, id = '') {

            const res = await axios({
                url: 'http://localhost:8080/profiles/allProfiles', data: { id: id }, method: 'POST'
            })
                .then(response => {
                    console.log(response.data)

                    ctx.commit('allProfiles', response.data.blogger)

                })
                .catch(error => {
                    console.log(error)
                    localStorage.removeItem('token')

                });



        },


        async  deleteProfile(ctx, id = '') {
            const res = await fetch(
                'http://localhost:8080/profiles/deleteProfile', {
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
                body: JSON.stringify({ id: id }) // body data type must match "Content-Type" header
            }
            );
            const response = await res.json()
            console.log(response)
            if (response.success == true) {
                console.log(id)
                ctx.commit('updateProfiles', id)
            }
        }



    },

    mutations: {
        allProfiles(state, response) {

            state.allProfiles = response

        },

        updateProfiles(state, id) {
            console.log(state.allProfiles.filter(elem => elem._id !== id))
            state.allProfiles = state.allProfiles.filter(elem => elem._id !== id)
        }
    },
    state: {
        allProfiles: []
    },

    getters: {
        getAllProfiles(state) {
            return state.allProfiles
        },



    },
}