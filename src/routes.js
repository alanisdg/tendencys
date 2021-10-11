import Orders from './components/Orders.vue';
import Detail from './components/Detail.vue';

export default[
    {
        path: '/', component:Orders
    },
    {
        path: '/order/:id', component:Detail
    },
]