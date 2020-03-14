<template>
  <v-app dark>
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
          style="position: absolute; bottom: 0; width: 100%"
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
        <!--<v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>-->
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
export default {
  data() {
    return {
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
        {
          icon: 'mdi-login',
          title: 'Log In',
          to: '/login'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Sign Up',
          to: '/signup'
        },
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
    }
  },
  // load settings from localStorage
  beforeMount() {
    const settings = localStorage.getItem('settings')
    if (settings)
      this.$store.commit('settings/updateSettings', JSON.parse(settings))
  },
  /* Remove animations for people that prefer not to see them */
  mounted() {
    const allTransitionsDisabled = false
    const { matches } = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersAnimations = localStorage.getItem('prefersAnimations') // true if animationsDuration changed
    if ((matches && !prefersAnimations) || allTransitionsDisabled) {
      this.$el.classList.add('App_NoTransition')
      this.$store.commit('settings/updateAnimationsDuration', 0)
    }
  }
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
