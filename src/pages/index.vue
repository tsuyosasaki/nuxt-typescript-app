<template lang="pug">
  .container-block
    template(v-if="items && items.length > 0")
      ul.list-wrap
        li.list-item(v-for="item in items" :key="item.id")
          h4.title
            span {{item.title}}
            small by {{item.user.id}}
          .item
            .user
              img.image(:src="item.user.profile_image_url" alt="")
            .item-block
              div.description {{item.body.slice(0, 130)}} ...
              p.link
                a(:href="item.url") {{item.url}}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  // public items = ''

  /** ライフサイクル */
  public async asyncData({ query, $axios }): Promise<any> {
    const items = await $axios.$get(
      'http://qiita.com/api/v2/items?query=tag:nuxt.js'
    )

    console.log('items', items)

    return { items }
  }

  public description(item: Record<string | number, any>): string {
    console.log('description item', item)
    if (!item) {
      return ''
    }

    return item.body.slice(0, 130)
  }
}
</script>

<style lang="sass">
.container-block
  min-height: 100vh
  padding: 16px

.list-item + .list-item
  margin: 16px 0

.list-item
  > .title
    margin: 16px 0
    padding: 8px 0
    border-bottom: solid 1px #e5e5e5

.item
  display: flex

  > .user
    flex: 120px 0 0
    width: 120px
    margin: 5px 20px 5px 0
  > .user > .image
    width: 100%
    object-fit: cover

.item-block
  > .link
    margin: 8px 0
</style>
