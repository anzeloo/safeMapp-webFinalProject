<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Perfil de usuario</h3><hr>

        <div class="field">
            <label class="label">Nombre:</label>
            <div class="control">
              <input class="input" type="text" placeholder="Liz Caicedo" v-model="usercomplete.nombres" disabled> 
            </div>
        </div>

       <div class="field">
            <label class="label">Apellido:</label>
            <div class="control">
              <input class="input" type="text" placeholder="Liz Caicedo" v-model="usercomplete.apellidos" disabled>
            </div>
        </div>

        <div class="field">
            <label class="label">Email:</label>
            <div class="control">
              <input class="input" type="text" placeholder="Liz Caicedo" v-model="usercomplete.email" disabled>
            </div>
        </div>

        <div class="field">
            <label class="label">Telefono:</label>
            <div class="control">
              <input class="input" type="text" placeholder="Liz Caicedo" v-model="usercomplete.telefono" disabled>
            </div>
        </div>

        

      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/init'
import firebase from 'firebase'

export default {
  data () {
    return {
      user: null,
      usercomplete: null
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user        
      } else {
        this.user = null
      }
    })

    this.listarUsuarios()
  },
  methods: {
    /*
    * Description: Filtra al usuario actualmente conectado
    */
    async listarUsuarios(){
      try {
        const resDB = await db.collection('users').get()

        resDB.forEach(res => {
          if(res.data().email == this.user.email){
            this.usercomplete = res.data()
          }
        })

      }catch(error){
        console.log(error)
      }
    }
  }
}
</script>
