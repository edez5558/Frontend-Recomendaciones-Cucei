<script>
// @ts-nocheck
  
 
  import { onMount } from "svelte";
    import { API_URL } from "../config";
    import axios from "axios";
    import Review from "./review.svelte";

  let estudiante = {
    nombre: '',
    codigo: '',
    carrera: '',
    ciclo: '',
    estado: ''
  };

  let reviews = [];

  onMount(async ()=> {
    const session = localStorage.getItem("session");

    const url_estudiante = `${API_URL}/api/estudiante/get`;
    const url_reviews = `${API_URL}/api/estudiante/review`;

    await axios.post(url_estudiante,{session:session}).then( response => {
      estudiante = response.data;
      console.log(estudiante);
    }).catch( err => {
      console.log(err);
    });



    await axios.post(url_reviews,{codigo:estudiante.codigo}).then( response => {
      reviews = response.data;
    }).catch( err => {
      console.log(err);
    })
  })
</script>

<main class="reviews-main max-long">
        <h2>Información de usuario</h2>
        <div class="login">
            <h3 class="teacher-field">Nombre</h3>
            <p class="teacher-label">{estudiante.nombre}</p>
            <h3 class="teacher-field">Codigo</h3>
            <p class="teacher-label">{estudiante.codigo}</p>
            <h3 class="teacher-field">Carrera</h3>
            <p class="teacher-label">{estudiante.carrera}</p>
            <h3 class="teacher-field">Ciclo de entrada</h3>
            <p class="teacher-label">{estudiante.ciclo}</p>
            <h3 class="teacher-field">Estado</h3>
            <p class="teacher-label">{estudiante.estado}</p>
            <h3 class="teacher-field">Reseñas hechas</h3>

            {#each reviews as r}
              <Review info={r}/>
            {/each}
        
    </main>


<style>

h2{
  margin: 0 auto;
  font-weight: bold;
  font-size: 30px;
}
.teacher-label{
    font-size: 20px;
}

.teacher-field{
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
}

main{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: white;
    border-radius: 20px 40px;
    box-shadow: 0 0 2px 4px #22092c41;
    width: 800px;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
}

.login{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50px;
	}

</style>