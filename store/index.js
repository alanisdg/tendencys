import axios from "axios";
export default {
	state: 
    {
        orders:[]
    },
    actions:
    {
        setOrders(context,orders)
        {
            context.commit('SetOrders',orders)
        }
    },
    mutations:
    {
        SetOrders(state,orders)
        {
            state.orders = orders 
        },

        getProducts()
        {
            let orders = JSON.parse(localStorage.getItem('orders'))

            if(orders === null)
            {
                axios.get("http://localhost:8080/api/v2/orders", { headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`, },})
                    .then((response) => {
                    this.state.orders = response.data.orders 
                    localStorage.setItem('orders',JSON.stringify(response.data.orders))
                }) 

            }else
            {
                this.state.orders = orders
            }
        }
    }

}