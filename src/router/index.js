import { createRouter, createWebHistory } from "vue-router";
const Layout = () => import('@/layout/index.vue')
const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ left: 0, top: 0}),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
            meta: {title: 'UZ manager'}
        },{
            path: '/user',
            name: 'user',
            meta: {title: '会員管理'},
            component: Layout,
            children: [
                {
                    meta: { title: '会員一覧' },
                    name: 'user-manger',
                    path: '/user/user_management',
                },
            ]
        },
        {
            path: '/product-manager',
            name: 'product-manager',
            meta: {title: '商品管理'},
            component: Layout,
            children: [
                {
                    meta: {title: 'カテゴリ一覧'},
                    name: 'category',
                    path: '/product-manager/category'
                },
                {
                    meta: {title: '商品一覧'},
                    name: 'product',
                    path: '/product-manager/product'
                },
                {
                    meta: {title: 'オプション一覧'},
                    name: 'option',
                    path: '/product-manager/option'
                }
            ]
        },
        {
            path: '/store-manager',
            name: 'store-manager',
            meta: {title: '店舗管理'},
            component: Layout,
            children: [
                {
                    meta: { title: '店舗一覧' },
                    name: 'store',
                    path: 'store',
                    component: () => import('@/views/main-menu/store/index.vue')
                }
            ]
        },
        {
            path: '/statistical-manager',
            name: 'statistical-manager',
            meta: {title: '売上管理'},
            component: Layout,
            children: [
                {
                    meta: {title: '売上集計'},
                    name: 'statistical',
                    path: "/statistical-manager/statistical"
                }
            ]
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/login'
        }
    ]
})

export default router;