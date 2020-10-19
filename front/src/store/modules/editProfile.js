import router from '@/router/index.js'
import axios from 'axios'
export default {

    actions: {
      async axiosGetEditingProfileInfo(ctx, profileId) {
        let userInfo = ctx.getters.getUser
        console.log(userInfo)
        ctx.commit('loader')
        
        await axios.post(
            'http://localhost:8080/profiles/getEditingProfileInfo', { userInfo, profileId}
        )
            .then(response => {
                let r = response.data
                console.log(r)
                if (r.success === true) {
                  console.log(r.blogger)
                  ctx.commit('getEditingProfileInfo', r.blogger)
                } else {
                  console.log(r)
                  router.push('/home')
                }
                
            })
            .catch(error => {
                console.log(error)

            });
    },

    async axiosReplaceOneProfile(ctx, arr) {

        let editedProfile = arr[1]
        let fd = arr[0]
        console.log(fd)
        console.log(editedProfile)
        await axios.post(
            'http://localhost:8080/profiles/replaceOneProfile', editedProfile,
        )
            .then(response => {
              let r = response.data
              console.log(r)
              if(!r.success) console.log(r.msg)

              if (r.success) {

                if (fd !== null) {
                  let id = editedProfile._id

                  for (let [name, file] of fd) {
                      console.log(`${name} = ${file}`);
                      let ext = file.name.split('.')[file.name.split('.').length - 1]
                      fd.set(name, file, `${id}.${ext}`)
                  }
                  console.log(fd)
                  console.log(fd.get('image'))
                  ctx.dispatch('uploadBloggersImage', fd)
                }// else router.push('/profiles')
              }

            })
            .catch(error => {
                console.log(error)
            });
    },



    },

    mutations: {
      getEditingProfileInfo(state, blogger) {

          state.editingProfile = blogger

      },

    },
    state: {
      editingProfile: {},

    },

    getters: {
      getEditingProfile(state) {
        return state.editingProfile
      },
    },
}