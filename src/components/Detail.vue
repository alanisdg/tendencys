<template>
<div class="container">
    <div class="row">
        <div class="col-md-8">
            <p>
                Orden: {{ order[0].number}}
                <span class="badge rounded-pill" 
                        :class="[classPayment(order[0].payment.status)]">{{order[0].payment.status}}
                </span>
            </p>
            
            <p class="total">
                 Total a Pagar: {{ TotalaPagar }} MXN
            </p>
            
            <button class="btn btn-outline-primary" 
                v-if="order[0].payment.status != 'Pagada'" 
                :disabled="TotalaPagar == 0" 
                @click="payment()">Pagar
            </button>
             
            <table class="table table-striped mt-5">
                <thead>
                    <th> SKU </th>
                    <th> Nombre </th>
                    <th> Cantidad </th>
                    <th> Precio </th>
                </thead>
                <tbody>
                    <tr v-for="(product) in order[0].items" :key="product.id">
                        <td>{{ product.id}} </td> 
                        <td>{{ product.name}} </td> 
                        <td> 
                            <span class="badge badge-successbadge rounded-pill bg-secondary" v-if="product.quantity > 0" @click="product.quantity--">-</span>
                                {{ product.quantity}}
                            <span class="badge badge-successbadge rounded-pill bg-secondary" @click="product.quantity++">+</span>
                        </td> 
                        <td>{{ product.price}} </td> 
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-4 addProduct" v-if="order[0].payment.status != 'Pagada'" >
            <p>Agregar un Producto</p>
            
            <form @submit.prevent="addProduct()">
            
            <div class="form-floating mb-3">
                <input type="text" class="form-control" 
                        v-model.trim="$v.name.$model"
                        :class="{ 'is-invalid' : $v.name.$error, 'is-valid': !$v.name.$invalid }"
                        placeholder="Nombre">
                <div class="valid-feedback"> El nombre es valido</div>
                <div class="invalid-feedback">
                     <span v-if="!$v.name.required">El nombre es requerido</span>
                     <span v-if="!$v.name.minLength">Mínimo 3</span>
                </div>
                <label>Nombre</label>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" 
                        v-model.trim="$v.sku.$model"
                        :class="{ 'is-invalid' : $v.sku.$error, 'is-valid': !$v.sku.$invalid }"
                        placeholder="Nombre">
                <div class="valid-feedback"> El nombre es valido</div>
                <div class="invalid-feedback">
                     <span v-if="!$v.sku.required">El SKU es requerido</span>
                     <span v-if="!$v.sku.minLength">Mínimo 3</span>
                </div>
                <label>SKU</label>
            </div>

            <div class="form-floating  mb-3">
                <input type="text" class="form-control" 
                        v-model.trim="$v.quantity.$model"
                        :class="{ 'is-invalid' : $v.quantity.$error, 'is-valid': !$v.quantity.$invalid }"
                        placeholder="Cantidad">
                <div class="valid-feedback"> La cantidad es correcta</div>
                <div class="invalid-feedback">
                     <span v-if="!$v.quantity.required">La cantidad es requerido</span>
                     <span v-if="!$v.quantity.minValue">L cantidad mínima es 1</span>
                </div>
                <label>Cantidad</label>
            </div>

            <div class="form-floating  mb-3">
                <input type="text" class="form-control" 
                        v-model.trim="$v.price.$model"
                        :class="{ 'is-invalid' : $v.price.$error, 'is-valid': !$v.price.$invalid }"
                        placeholder="Precio">
                <div class="valid-feedback"> El precio correcta</div>
                <div class="invalid-feedback">
                     <span v-if="!$v.price.required">La precio es requerido</span>
                     <span v-if="!$v.price.minValue">El precio no puede ser 0</span>
                </div>
                <label>Precio</label>
            </div>

            <button class="btn btn-secondary" 
                    type="submit" 
                    :disabled="submitStatus === 'PENDING'">
                    Agregar!
            </button>
            </form>
            
            <p class="message" v-if="submitStatus === 'OK'">Producto agregado!</p>
            <p class="message" v-if="submitStatus === 'ERROR'">Porfavor completa el formulario.</p>
            <p class="message" v-if="submitStatus === 'PENDING'">Agregando...</p>
        </div>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapState, mapActions , mapMutations } from 'vuex'
import { required , minLength ,minValue} from 'vuelidate/lib/validators'
export default {
    data(){
        return{
            order:[],
            orderID: this.$route.params.id,
            name:'',
            sku:'',
            price:'',
            quantity:'',
            submitStatus: null
        }
    },
    validations:{
        name:{
            required,
            minLength:minLength(3)
        },
        sku:{
            required,
            minLength:minLength(3)
        },
        quantity:{
            required,
            minValue:minValue(1)
             
        },
        price:{
            required,
            minValue:minValue(1)
        }
    },
    computed:{
        TotalaPagar(){
            let totalapagar = 0;
            this.order[0].items.forEach(element => {
                let total = element.quantity * element.price
                totalapagar = totalapagar + total
            });
            return totalapagar;
        },
        ...mapState(['orders'])
    },
    methods:{
        classPayment(status){
            if(status == 'paid'){
              return 'bg-secondary'
            }
            if(status == 'Pagada'){
              return 'bg-primary'
            }
        },
        payment(){
            this.order[0].payment.status = 'Pagada';
            console.log(this.orders);
            localStorage.setItem('orders',JSON.stringify(this.orders))
            Swal.fire(
                'Exito!',
                'Tu orden ha sido pagada!',
                'success'
            )
        },
        ...mapMutations(['getProducts']),
        ...mapActions(['setOrders']),
        addProduct(){
            this.$v.$touch()
                if (this.$v.$invalid)
                {
                    this.submitStatus = 'ERROR'
                } 
                else 
                {
        
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                    let item = 
                    {
                        id:new Date().valueOf(),
                        sku:this.sku,
                        name:this.name,
                        quantity:this.quantity,
                        price:this.price,
                    }
                    this.order[0].items.push(item)
                    this.sku = '',
                    this.name = '',
                    this.quantity = '',
                    this.price = ''
                    localStorage.setItem('orders',JSON.stringify(this.orders))
                    this.$v.$reset()
                    }, 500)
                }
        }
    },
    created(){
        this.getProducts();
        this.orderID
        function ordered(orderID){
             return function(element) {
                return element.id == orderID;
            }
        }
        let order = this.orders.filter(ordered(this.orderID));
        this.order = order
    }
}
</script>

<style lang="scss" scoped>
    .addProduct{
        background: #f5f3f3;
        padding: 20px;
        border-radius: 8px;
        color: grey;
        font-size: 12px;
    }
    .total{
        font-weight: bolder;
        font-size: 25px;
    }
    .message{
        margin-top: 9px;
        font-size: 13px;
    }
</style> 