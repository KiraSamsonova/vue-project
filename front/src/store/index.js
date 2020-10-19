import Vue from 'vue'
import Vuex from 'vuex'
import Test from './modules/test'
import Filters from './modules/filters'
import Registration from './modules/registration'
import Auth from './modules/auth'
import Profiles from './modules/profiles'
import Bloggers from './modules/bloggers'
import NewProfile from './modules/newProfile'
import EditProfile from './modules/editProfile'
import ChangeRole from './modules/changeRole'
import ChangeEmail from './modules/changeEmail'
import ChangePassword from './modules/changePassword'
import FilterStaticData from './modules/filterStaticData'
import NewPassword from './modules/newPassword'
import ForgottenPassword from './modules/forgottenPassword'
import EmailConfirmation from './modules/emailConfirmation'
import PersonalData from './modules/personalData'
import favBloggers from './modules/favBloggers'
Vue.use(Vuex)

export default new Vuex.Store({
  // state: {

  // },
  // mutations: {
  // },
  // actions: {
  // },
  // getters: {

  // },
  modules: {
    Test, Filters, Registration, Auth, Profiles, NewProfile,
    Bloggers, FilterStaticData, NewPassword, ForgottenPassword,
    EmailConfirmation, PersonalData, favBloggers,ChangeRole, ChangeEmail, ChangePassword, EditProfile
  }
})
