<template lang="pug">
  .container-block
    template(v-if="items && items.length > 0")
      p.main-visual メインビジュアル
      ul.list-wrap
        ListItem(
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
        )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { Context } from '@nuxt/vue-app'
import VueLazyload from 'vue-lazyload'
import ListItem from '@/components/ListItem.vue'

// オプションを変えて使うのでグローバルで注入せず各コンポーネントで設定する
Vue.use(VueLazyload, {
  observer: true,
  lazyComponent: true
})

@Component({
  components: {
    ListItem
  }
})
export default class IndexPage extends Vue {
  public items = {}

  /** ライフサイクル */
  // public async mounted(): Promise<void> {
  //   this.items = await this.$axios.$get(
  //     'http://qiita.com/api/v2/items?query=tag:nuxt.js'
  //   )
  // }

  /** ライフサイクル */
  public async asyncData({ $axios }: any): Promise<any> {
    const items = await $axios.$get(
      'http://qiita.com/api/v2/items?query=tag:nuxt.js'
    )

    return { items }
  }
}
</script>

<style lang="sass">
.container-block
  min-height: 100vh
  padding: 16px

.main-visual
  padding: 30vh 0

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
