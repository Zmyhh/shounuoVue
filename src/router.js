import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: require('./views/components/login').default
        },
        {
            path: '/Home',
            name: 'Home',
            component: require('./views/components/Home').default,
            redirect: '/chartPage',
            children: [
                {
                    //首页，图表页
                    path: '/chartPage',
                    name: 'chartPage',
                    component: require('./views/components/chartPage').default
                },
                {
                    //操作员设置
                    path: '/operator',
                    name: 'operator',
                    component: require('./views/SystemSettings/operator').default
                },
                {
                    // 生产计划单
                    path: '/production',
                    name: 'production',
                    component: require('./views/procurement/production').default,
                },
                {
                    // 生产计划单明细
                    path: '/productionDetail',
                    name: 'productionDetail',
                    component: require('./views/procurement/productionDetail').default,
                },
                {
                    //原材料信息
                    path: '/materials',
                    name: 'materials',
                    component: require('./views/infrastructure/materials').default,
                }, {
                    //商品信息
                    path: '/goods',
                    name: 'goods',
                    component: require('./views/infrastructure/goods').default,
                }, {
                    //供应商管理
                    path: '/supplier',
                    name: 'supplier',
                    component: require('./views/infrastructure/supplier').default,
                }, {
                    //工厂管理
                    path: '/factory',
                    name: 'factory',
                    component: require('./views/infrastructure/factory').default,
                }, {
                    //采购订单
                    path: '/purchase',
                    name: 'purchase',
                    component: require('./views/procurement/purchase').default,
                }, {
                    //入库管理
                    path: '/storage',
                    name: 'storage',
                    component: require('./views/Warehouse/storage').default,
                },
                {
                    //库存查询
                    path: '/Stock',
                    name: 'Stock',
                    component: require('./views/Warehouse/Stock').default,
                }, {
                    //工艺管理
                    path: '/ProcessManagement',
                    name: 'ProcessManagement',
                    component: require('./views/infrastructure/ProcessManagement').default,
                }, {
                    //工厂派单查询
                    path: '/FactoryDispatch',
                    name: 'FactoryDispatch',
                    component: require('./views/procurement/FactoryDispatch').default,
                }, {
                    //工厂派单管理
                    path: '/dispatchManagement',
                    name: 'dispatchManagement',
                    component: require('./views/procurement/dispatchManagement').default,
                }, {
                    //生产日志
                    path: '/ProductionLog',
                    name: 'ProductionLog',
                    component: require('./views/ProductionManagement/ProductionLog').default,
                }, {
                    //半成品发货
                    path: '/deliveryProducts',
                    name: 'deliveryProducts',
                    component: require('./views/ProductionManagement/deliveryProducts').default,
                }, {
                    //半成品入库
                    path: '/storageProducts',
                    name: 'storageProducts',
                    component: require('./views/ProductionManagement/storageProducts').default,
                }
            ]
        }
    ]
})
