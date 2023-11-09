import { createVuetify, ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const LightTheme: ThemeDefinition = {
    dark: false,
    variables: {
    },
    colors: {
        primary: '#ccd2e3',
        accent: '#757575',
        secondary: '#FF8F00',
        info: '#26A69A',
        warning: '#FFC107',
        error: '#bb252a',
        success: '#4CAF50',
        background: '#f3f3f3',
        cancel: '#757575',
    }
}

export default defineNuxtPlugin((NuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {  // 테마 설정
            themes: {
                light: LightTheme,
                variables: {}
            }
        },
        icons: { // 아이콘 설정
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi
            }
        }
    })

    NuxtApp.vueApp.use(vuetify)
})
