import axios from 'axios'
export default {
    actions: {
        async  test(ctx, fd) {
            let newFd = new FormData()
            for (let [name, value] of fd) {
                console.log(`${name} = ${value}`);
                newFd.append(name, value, 'newName.png')
            }
            console.log(newFd)
            console.log(newFd.get('image'))
        },

        async tryAxios(ctx, value) {

            await axios.post(
                'http://localhost:8080/account/tryAxios', value,
            )
                .then(response => {
                    let r = response.data
                    console.log(r)


                })
                .catch(error => {
                    console.log(error)

                });
        },

        async axiosTestFile(ctx, value) {

            await axios.post(
                'http://localhost:8080/account/tryUpload', value
            )
                .then(response => {
                    let r = response.data
                    console.log(r)
                    // ctx.commit('newImageTest', r.fileName)

                })
                .catch(error => {
                    console.log(error)

                });
        },
    },

    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        newImageTest(state, fileName) {
            state.fileName = fileName
        }
    },
    state: {
        test: 'test',
    },

    getters: {


    },
}