// https://vitepress.dev/guide/custom-theme
import { defineComponent, h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useData, useRouter } from 'vitepress'
import './style.css'

/**
 * 支持 frontmatter `redirect:` 字段：
 * 页面前置数据声明 `redirect: /target/path` 时，访问该页自动跳转到目标路径。
 * 当前站点各板块已使用真实索引页，此机制保留供后续 stub 页使用。
 */
const RedirectLayout = defineComponent({
  name: 'RedirectLayout',
  setup() {
    const { page } = useData()
    const router = useRouter()

    onMounted(() => {
      const target = page.value.frontmatter.redirect
      if (target) {
        router.go(target)
      }
    })

    return () => h(DefaultTheme.Layout)
  },
})

export default {
  extends: DefaultTheme,
  Layout: RedirectLayout,
  enhanceApp({ app }) {
    // ...
  },
} satisfies Theme
