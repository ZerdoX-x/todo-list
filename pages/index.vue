<template>
  <div class="index d-flex flex-wrap">
    <v-btn
      v-for="(link, index) of links"
      :key="index"
      :href="link.href"
      class="my-5"
      width="100%"
    >
      {{ link.text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      links: [
        {
          text: 'My Github Account',
          href: 'https://github.com/zerdox-x'
        },
        {
          text: 'My VK Profile',
          href: 'https://vk.com/zerdox'
        },
        {
          text: 'zerdox.cool4@gmail.com',
          href: 'mailto:zerdox.cool4@gmail.com'
        },
        {
          text: '@vladimir_porotnikov (tg)',
          href: 'tg://vladimir_porotnikov'
        }
      ]
    }
  }
}
</script>
