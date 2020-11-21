module.exports = {
    base: '/Swamm-UI-docs/',
    title: 'SWAMM-UI',
    description: 'JUST FOR WHELL',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/logo1.png' }]
    ],
    themeConfig: {
        logo: '/assets/img/logo1.png',
        // 导航栏
        nav: [
            { text: 'UI首页', link: '/' },
            {
                text: 'JAVASCRIPT',
                items: [
                  { text: 'js基础', items:[
                      {text: '作用域', link: '/js/scope'},
                      {text: '闭包', link: '/js/closures'},
                      {text: 'this指针', link: '/js/this'},
                  ]},
                  { text: 'ES6', items:[
                      {text: 'let const', link: '/'},
                      {text: 'Array扩展', link: '/'},
                      {text: '对象扩展', link: '/'},
                  ] }
                ]
            },
            { text: 'GITHUB', link: 'https://www.baidu.com' }
          ],
        //   侧边栏
        sidebar: {
            '/js/': [
                {
                    title: 'JS基础',
                    children: [
                        '',
                        'scope',
                        'closures',
                        'this'
                    ]
                }
            ],
            sidebarDepth: 3,
        }
    },
    markdown: {
        anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }
    }
  }