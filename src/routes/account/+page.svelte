<script>
// @ts-nocheck
  
 
  import { onMount } from "svelte";
    import { API_URL } from "../config";
    import axios from "axios";
    import Review from "./review.svelte";
    import Report from "./report.svelte";

  let estudiante = {
    nombre: '',
    codigo: '',
    carrera: '',
    ciclo: '',
    estado: ''
  };

  let reviews = [];
  let reports = [];

  let dialog;
  let message = '';

  onMount(async ()=> {
    dialog = document.getElementById('dialog-modal');
    const session = localStorage.getItem("session");

    const url_estudiante = `${API_URL}/api/estudiante/get`;

    await axios.post(url_estudiante,{session:session}).then( response => {
      console.log(response.data);
      estudiante = response.data.estudiante;
      reviews = response.data.reviews || [];
      reports = response.data.reports || [];

    }).catch( err => {
      console.log(err);
    });
  })

  const fetchCancelReport = async (id) => {
    const url = `${API_URL}/api/review/report/cancel`;

    axios.post(url,{id : id}).then(response => {
             
    }).catch(err=>{
        console.log(err);
    });
  };

  const fetchDeleteReview = async (id) => {
    const url = `${API_URL}/api/review/delete`;

    axios.post(url,{id:id}).then( response => {

    }).catch(err => {
      console.log(err);
    });
  };

  function arrayRemove(arr,id){
    return arr.filter( (element) => {
        return element.id != id;
    });
  }

  function cancelReport(id){
    fetchCancelReport(id);
    showModal('Reporte cancelado');
    reports = arrayRemove(reports,id);
  }

  function deleteReview(id){
    fetchDeleteReview(id);
    showModal('Reseña eliminada');
    reviews = arrayRemove(reviews,id);
  }

  function deleteReport(id){
    fetchDeleteReview(id);
    showModal('Reporte eliminado');
    reports = arrayRemove(reports,id);
  }

  function showModal(msg){
    message = msg;
    dialog.showModal();
  }

  function closeModal(){
    dialog.close();
  }
</script>

<dialog data-modal id='dialog-modal'>
  <div class="dialog-content">
    <div class="dialog-message">{message}</div>
    <button class="dialog-btn" data-close-modal on:click={closeModal}>Cerrar</button>
  </div>
</dialog>

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
            {#if reviews.length != 0}

            <h3 class="teacher-field">Reseñas hechas</h3>
            {#each reviews as r}
              <Review info={r} callback={deleteReview}/>
            {/each}

            {/if}

            {#if reports.length != 0}

            <h3 class="teacher-field">Reportes</h3>
            {#each reports as r}
              <Report info={r} callback={cancelReport} callbackDelete={deleteReport}/>
            {/each}

            {/if}
        
    </main>


<style>
dialog{
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 100px;
    border-radius: 20px;
  }

  .dialog-content{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .dialog-message{
    margin-bottom: 20px;
    text-align: center;
  }

  .dialog-btn{
    cursor: pointer;
    border-radius: 5px;
    width: 150px;
    height: 30px;
    background-color: var(--separator-color);
    color: white;
    font-weight: bold;
    border: none;
    transition: width 0.3s;
  }

  .dialog-btn:hover{
    width: 155px;
    transition: width 0.3s;
  }

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
    width: 900px;
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