<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list height="100%" style="position: relative">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          style="position: absolute; bottom: 0; width: 100%; transform: translateY(-100%)"
          @click.stop="
            () => {
              $vuetify.theme.dark = !$vuetify.theme.dark
              toggleTheme($vuetify.theme.dark ? 'dark' : 'light')
            }
          "
        >
          <v-list-item-action>
            <v-icon>
              mdi{{ `-brightness-${$vuetify.theme.dark ? '7' : '3'}` }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Change Theme'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          style="position: absolute; bottom: 0; width: 100%;"
          @click.stop="miniVariant = !miniVariant"
        >
          <v-list-item-action>
            <v-icon>
              mdi{{ `-chevron-${miniVariant ? 'right' : 'left'}` }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Condense'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; ZerdoX {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    clipped: false,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: 'mdi-home',
        title: 'Welcome',
        to: '/'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'ToDo',
        to: '/todo'
      },
      // {
      //   icon: 'mdi-login',
      //   title: 'Log In',
      //   to: '/login'
      // },
      // {
      //   icon: 'mdi-account-plus',
      //   title: 'Sign Up',
      //   to: '/signup'
      // },
      {
        icon: 'mdi-cogs',
        title: 'Settings',
        to: '/settings'
      },
      {
        icon: 'mdi-information',
        title: 'About Project',
        to: '/about'
      }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Your Task Manager'
  }),
  computed: mapGetters('settings', ['settings', 'animationsEnabled', 'theme']),
  // push settings to cookies
  watch: {
    settings: {
      deep: true,
      handler(settings) {
        settings = JSON.stringify(settings)
        localStorage.setItem('settings', settings)
        document.cookie = `settings=${encodeURIComponent(
          settings
        )};path=/;max-age=${Date.now() + 365 * 24 * 60 * 60}`
      }
    }
  },
  // set settings on server from user's cookies
  middleware({ app, store }) {
    if (process.server) {
      const settings = app.$cookies.get('settings')
      if (settings) {
        store.commit('settings/updateSettings', settings)
        app.vuetify.framework.theme.isDark = settings.theme === 'dark'
      }
    }
  },
  mounted() {
    // mount theme from cookies
    const settings = this.$cookies.get('settings')
    if (settings) this.$vuetify.theme.isDark = settings.theme === 'dark'
    // Remove animations for people that prefer not to see them
    const { matches } = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersAnimations = localStorage.getItem('prefersAnimations') // true if animationsDuration changed}
    if (matches && !prefersAnimations)
      this.$store.commit('settings/toggleAnimationsState', false)
  },
  methods: mapMutations('settings', ['updateSettings', 'toggleTheme'])
}
</script>

<style>
.App_NoTransition * {
  transition-duration: 0.01ms !important;
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  scroll-behavior: auto !important;
}
</style>
