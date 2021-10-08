/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// @ts-nocheck
import { reactive, readonly } from 'vue'

const Vue3GoogleOauth = reactive({
  isInit: false,
  isAuthorized: false,
})
const googleAuth = (function () {
  function installClient() {
    const apiUrl = 'https://apis.google.com/js/api.js'
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = apiUrl
      script.onreadystatechange = script.onload = function (): void {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          setTimeout(function () {
            resolve(true)
          }, 500)
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }

  function initClient(config: any) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      window.gapi.load('auth2', () => {
        // @ts-ignore
        window.gapi.auth2
            .init(config)
            .then(() => {
              // @ts-ignore
              resolve(window.gapi)
            })
            .catch((error: any) => {
              reject(error)
            })
      })
    })
  }

  function Auth(this: any) {
    // @ts-ignore
    if (!(this instanceof Auth)) return new Auth()
    // @ts-ignore
    this.instance = null /* window.gapi.auth2.getAuthInstance() */
    // @ts-ignore
    this.load = (config: any) => {
      installClient()
          .then(() => {
            return initClient(config)
          })
          .then((gapi) => {
            // @ts-ignore
            this.instance = gapi.auth2.getAuthInstance()

            this.prompt = config.prompt
            // @ts-ignore
            Vue3GoogleOauth.instance = gapi.auth2.getAuthInstance()
            Vue3GoogleOauth.isInit = true
            Vue3GoogleOauth.isAuthorized = this.instance.isSignedIn.get()
          })
          .catch((error) => {
            console.error(error)
          })
    }

    // @ts-ignore
    this.signIn = () => {
      return new Promise((resolve, reject) => {
        if (!this.instance) {
          reject(false)
          return
        }
        this.instance
            .signIn()
            .then((googleUser: unknown) => {
              Vue3GoogleOauth.isAuthorized = this.instance.isSignedIn.get()
              resolve(googleUser)
            })
            .catch((error: any) => {
              reject(error)
            })
      })
    }

    // @ts-ignore
    this.getAuthCode = () => {
      return new Promise((resolve, reject) => {
        if (!this.instance) {
          reject(false)
          return
        }
        this.instance
            .grantOfflineAccess({ prompt: this.prompt })
            .then(function (resp: { code: unknown }) {
              resolve(resp.code)
            })
            .catch(function (error: any) {
              reject(error)
            })
      })
    }

    // @ts-ignore
    this.signOut = () => {
      return new Promise((resolve, reject) => {
        if (!this.instance) {
          reject(false)
          return
        }
        this.instance
            .signOut()
            .then(() => {
              Vue3GoogleOauth.isAuthorized = false
              resolve(true)
            })
            .catch((error: any) => {
              reject(error)
            })
      })
    }
  }

  // @ts-ignore
  return new Auth()
})()
// @ts-ignore
export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  install: (
      app: {
        config: { globalProperties: { $gAuth: any } }
        provide: (
            arg0: string,
            arg1: { readonly isInit: boolean; readonly isAuthorized: boolean },
        ) => void
      },
      options: { clientId: unknown },
  ) => {
    /* eslint-disable */
    //set config
    let config = null
    let defaultConfig = { scope: 'profile email', prompt: 'select_account' }
    if (typeof options === 'object') {
      config = Object.assign(defaultConfig, options)
      if (!options.clientId) {
        throw new Error('clientId is require')
      }
    } else {
      throw new TypeError('invalid option type. Object type accepted only')
    }

    //Install Vue plugin
    googleAuth.load(config)
    app.config.globalProperties.$gAuth = googleAuth
    app.provide('Vue3GoogleOauth', readonly(Vue3GoogleOauth))
  },
}
