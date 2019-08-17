<template lang="pug">
  li.list-item
    lazy-component(@show="onLazyShow")
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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
// import lazyComponent from '@/components/ListItem.vue'
// import lazyComponent from 'vue-lazyload'

// @Component({
//   components: {
//     lazyComponent
//   }
// })
@Component
export default class ListItem extends Vue {
  /** 記事 */
  @Prop({ type: Object, required: true })
  public item: any

  public mounted() {
    console.log('this.item', this.item)
  }

  public onLazyShow() {
    console.log('lazy-show!')
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
