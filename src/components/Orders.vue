<template>
  <div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="display-6">Ordenes</h1>
            <table class="table table-striped">
                <thead>
                    <tr class="table-light"> 
                        <th>No.</th>
                        <th>Articulos</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>           
                </thead>
                <tbody>
                    <tr  v-for="order in orders" :key="order.id">
                        <td>No: {{ order.number }} </td>
                        <td><span class="badge rounded-pill " :class="[classPayment(order.payment.status)]">{{order.payment.status}}</span></td>
                        <td>{{order.items.length}}</td>
                        <td><a class="btn btn-outline-secondary btn-sm" :href="'/#/order/'+order.id">Detalles</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script> 
import { mapState , mapMutations } from 'vuex'

export default {
  name: "Orders",
  data() {
    return {
       isActive:true
    };
  },
  computed:{
    ...mapState(['orders'])
  },
  methods: { 
      classPayment(status){
          if(status == 'paid'){
              return 'bg-secondary'
          }
          if(status == 'Pagada'){
              return 'bg-primary'
          }
      },
    ...mapMutations(['getProducts']),
  },
  created() {
       this.getProducts();
  },
};
</script>

<style scoped>
    .block{
        border-bottom: 1px solid #e2e2e2;
    background: rgb(247 247 247);
    padding: 10px;
    color: #6d757d; 
    font-size: 12px;
    }
    .price{
        font-weight: bold;
        font-size: 16px;
    }
</style>