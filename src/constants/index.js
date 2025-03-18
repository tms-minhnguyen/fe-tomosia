
const admin = 'admin'
const store = 'store'
const menu = [
    {
        url: '/user',
        iconNoActive: 'icon-user-active.svg',
        iconActive: 'icon-user-active.svg',
        name: '会員管理',
        role: [admin , store],
        children: [
            {
                url: '/user/user_management',
                name: '会員一覧'
            }
        ]
    },
    {
        url: '/product-manager',
        iconNoActive: 'icon-purchase-active.svg',
        iconActive: 'icon-purchase-active.svg',
        name: '商品管理',
        role: [admin , store],
        children: [
            {
                url: '/product-manager/category',
                name: 'カテゴリ一覧'
            },
            {
                url: '/product-manager/product',
                name: '商品一覧'
            },
            {
                url: '/product-manager/option',
                name: 'オプション一覧'
            }
        ]
    },
    {
        url: '/store-manager',
        iconNoActive: 'icon-store-active.svg',
        iconActive: 'icon-store-active.svg',
        name: '店舗管理',
        role: [admin, store],
        children: [
            {
                url: '/store-manager/store',
                name: '店舗一覧'
            }
        ]
    },
    {
        url: '/statistical-manager',
        iconNoActive: 'icon-statistical-active.svg',
        iconActive: 'icon-statistical-active.svg',
        name: '売上管理',
        role: [admin, store],
        children: [
            {
                url: "/statistical-manager/statistical",
                name: '売上集計'
            }
        ]
    }
];

const routes = [
    {
        url: 'user',
        name: '会員管理'
    },
    {
        url: 'product-manager',
        name: '商品管理'
    },
    {
        url: 'store-manager',
        name: '店舗管理'
    },
    {
        url: 'statistical-manager',
        name: '売上集計'
    }
]

export { menu, routes }