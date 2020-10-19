import axios from 'axios'
export default {

    actions: {

        async axiosCreateNewProfile(ctx, arr) {
            ctx.commit('loader')
            let value = arr[1]
            let fd = arr[0]
            console.log(fd)
            await axios.post(
                'http://localhost:8080/profiles/createNewProfile', value,
            )
                .then(response => {
                    let r = response.data
                    console.log(r)
                    if (r.success === true) {
                        let id = r.blogger._id
                        for (let [name, file] of fd) {
                            console.log(`${name} = ${file}`);

                            let ext = file.name.split('.')[file.name.split('.').length - 1]
                            fd.set(name, file, `${id}.${ext}`)
                        }
                        console.log(fd)
                        console.log(fd.get('image'))
                        ctx.dispatch('uploadBloggersImage', fd)
                    }

                    // ctx.commit('newProfileIsCreated', response)

                })
                .catch(error => {
                    console.log(error)

                });
        },

        async uploadBloggersImage(ctx, fd) {
            console.log('dispatched!')
            console.log(fd)
            await axios.post(
                'http://localhost:8080/profiles/uploadBloggersImage', fd
            )
                .then(response => {
                    let r = response.data
                    console.log(r)
                    if (r.success)
                        // ctx.commit('newImageTest', r.fileName)
                        console.log('success')

                })
                .catch(error => {
                    console.log(error)

                });
        },
    },

    mutations: {
        newProfileIsCreated(state, response) {

            state.newProfileIsCreated = response

        },
        loader(state) {
            state.loader = !state.loader
        },
    },
    state: {
        newProfileIsCreated: [],
        loader: false
    },

    getters: {
        getNewProfileIsCreated(state) {
            return state.newProfileIsCreated
        },
        getLoader(state) {
            return state.loader
        }
    },
}