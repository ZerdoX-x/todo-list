<template>
  <div class="index d-flex flex-wrap">
    <h1>
      Hi, there is some useful links below. Contact me if you got a work for me.
    </h1>
    <v-btn
      v-for="(link, index) of links"
      :key="index"
      :href="link.nuxt ? undefined : link.href"
      :to="link.nuxt ? link.href : undefined"
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
  data: () => ({
    links: [
      {
        text: 'Get Started With ToDo',
        href: './todo',
        nuxt: true
      },
      {
        text: "Author's Github Account",
        href: 'https://github.com/zerdox-x'
      },
      {
        text: "Author's VK Profile",
        href: 'https://vk.com/zerdox'
      },
      {
        text: 'zerdox.cool4@gmail.com',
        href: 'mailto:zerdox.cool4@gmail.com'
      },
      {
        text: '@vladimir_porotnikov (tg)',
        href: 'tg://vladimir_porotnikov'
      },
      {
        text: 'source code',
        href: 'https://github.com/zerdox-x/todo-list'
      }
    ]
  })
}
</script>
