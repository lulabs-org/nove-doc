import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    ignoreDeadLinks: false,
    srcExclude: ['README.md'],
    lang: 'zh-CN',
    title: 'nove 项目文档',
    description: 'nove 项目文档 — 个人/组织/企业智能数据仓库与 Agent 数据基础设施',

    head: [
      ['meta', { name: 'theme-color', content: '#7c3aed' }],
    ],

    lastUpdated: true,

    themeConfig: {
      siteTitle: 'nove 项目文档',

      nav: [
        { text: '首页', link: '/' },
        { text: '项目总览', link: '/guide/', activeMatch: '/guide/' },
        { text: '项目书', link: '/project-book', activeMatch: '/project-book' },
        { text: '架构与技术', link: '/architecture/', activeMatch: '/architecture/' },
        { text: '路线图', link: '/roadmap/', activeMatch: '/roadmap/' },
      ],

      sidebar: {
        '/guide/': [
          {
            text: '项目总览',
            items: [
              { text: '项目介绍', link: '/guide/' },
              { text: '项目概述', link: '/guide/overview' },
              { text: '需求与范围', link: '/guide/requirements' },
              { text: '目标与成功指标', link: '/guide/goals' },
              { text: '组织与运营', link: '/guide/organization' },
              { text: '项目名称', link: '/guide/naming' },
              { text: '陆向谦实验室介绍', link: '/guide/lulabs' },
            ],
          },
        ],

        '/project-book': [
          {
            text: '项目书',
            items: [
              { text: '项目书 · 总览', link: '/project-book' },
            ],
          },
          {
            text: '文档导航',
            items: [
              { text: '项目介绍', link: '/guide/' },
              { text: '项目概述', link: '/guide/overview' },
              { text: '需求与范围', link: '/guide/requirements' },
              { text: '目标与成功指标', link: '/guide/goals' },
              { text: '组织与运营', link: '/guide/organization' },
              { text: '技术方案总览', link: '/architecture/overview' },
              { text: '实施路线图', link: '/roadmap/implementation' },
              { text: '数据隐私白皮书', link: '/security/privacy-whitepaper' },
            ],
          },
        ],

        '/architecture/': [
          {
            text: '架构与技术',
            items: [
              { text: '技术方案总览', link: '/architecture/overview' },
              { text: '系统架构图集', link: '/architecture/system-overview' },
              { text: '技术白皮书', link: '/architecture/whitepaper' },
            ],
          },
        ],

        '/roadmap/': [
          {
            text: '路线图',
            items: [
              { text: '实施路线图', link: '/roadmap/implementation' },
              { text: '三年技术与 AI 演进路线图', link: '/roadmap/evolution' },
            ],
          },
        ],

        '/security/': [
          {
            text: '权限安全与合规',
            items: [
              { text: '人机统一权限体系', link: '/security/permission-system' },
              { text: '数据与隐私保护白皮书', link: '/security/privacy-whitepaper' },
            ],
          },
        ],

        '/reference/': [
          {
            text: '技术参考',
            items: [
              { text: 'HMAC 介绍', link: '/reference/hmac-intro' },
              { text: 'HMAC 项目实战指南', link: '/reference/hmac-guide' },
            ],
          },
        ],

        '/archive/': [
          {
            text: '历史方案归档',
            items: [
              { text: '技术框架方案探讨（v1.0）', link: '/archive/tech-framework' },
              { text: 'EduMind 完整方案构思', link: '/archive/edumind-plan' },
            ],
          },
        ],
      },

      // 项目书与合规文档作为单页展示
      outline: {
        label: '本页目录',
        level: [2, 3],
      },

      docFooter: {
        prev: '上一页',
        next: '下一页',
      },

      lastUpdated: {
        text: '最后更新于',
        formatOptions: {
          dateStyle: 'full',
          timeStyle: 'medium',
        },
      },

      langMenuLabel: '多语言',
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '菜单',
      darkModeSwitchLabel: '主题',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',

      search: {
        provider: 'local',
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: '搜索文档',
                  buttonAriaLabel: '搜索文档',
                },
                modal: {
                  noResultsText: '无法找到相关结果',
                  resetButtonTitle: '清除查询条件',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换',
                  },
                },
              },
            },
          },
        },
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/lulabs-org' },
      ],
    },
  }),
)
