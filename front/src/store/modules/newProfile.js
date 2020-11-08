import axios from 'axios'
import router from '@/router/index.js'
export default {

    actions: {

        async axiosCreateNewProfile(ctx, arr) {
            ctx.commit('loader')
            let value = arr[1]
            let fd = arr[0]
            console.log(fd)
            await axios.post(
                '/profiles/createNewProfile', value,
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
                '/profiles/uploadBloggersImage', fd
            )
                .then(response => {
                    let r = response.data
                    console.log(r)
                    if (r.success)
                        // ctx.commit('newImageTest', r.fileName)
                        console.log('success')
                        router.push('/home')
                        

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