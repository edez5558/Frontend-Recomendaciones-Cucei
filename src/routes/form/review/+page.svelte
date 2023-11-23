<script>
    import { page } from "$app/stores";
    import { API_URL } from "../../config";
    import axios from "axios";
    import { onMount } from "svelte";

    let nombre = $page.url.searchParams.get('nombre');
    let clave = '';
    let comentario = '';
    let calificacion = '';

      let message = '';
        /**
         * @type {any}
          */
        let dialog;
        onMount(() => {
            dialog = document.getElementById('dialog-modal');
        });


    let disable = false;

    async function createReview(){
        const session = localStorage.getItem("session");
        const url = `${API_URL}/api/review/create`;
        disable = true
        console.log(url);

        await axios.post(url,{clave:clave,nombre:nombre,calificacion:calificacion,comentario:comentario,session:session}).then( response =>{
            if(nombre != null){
                location.href = "/review?nombre=" + encodeURIComponent(nombre);
            }
        }).catch( err => {
            message = 'Ha ocurrido un error en el servidor';
            dialog.showModal();
        });

        disable = false;
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
    <h2>Reseñar</h2>
    <form class="login" on:submit|preventDefault="{createReview}">
        <label for="POST-nombre" class="form-label">Nombre del maestro </label>
        <input bind:value={nombre} id="POST-nombre" class="form-field" type="text" placeholder="Ejemplo: GARCIA HERNANDEZ, MARTIN" maxlength="200">
        <label for="POST-clave" class="form-label" >Clave de materia (No obligatorio)</label>
        <input bind:value={clave} id="POST-clave" class="form-field" type="text" placeholder="Ejemplo: I5884" maxlength="20">
        <label for="POST-comentario" class="form-label">Recomendacion</label>
        <textarea bind:value={comentario} id="POST-comentario" class="form-text" maxlength="800"></textarea>
        <fieldset>
            <legend>Lo recomiendas?</legend>
            <div>
                <input bind:group={calificacion} id="POST-recomendado" name="calificacion" type="radio" value="1" required>
                <label for="POST-recomendado">Lo recomiendo</label>
            </div>
            <div>
                <input bind:group={calificacion} id="POST-norecomendado" name="calificacion" type="radio" value="0" required>
                <label for="POST-norecomendado">No lo recomiendo</label>
            </div>
        </fieldset>

        <input class="form-submit" type="submit" value="Guardar" disabled={disable}>
    </form>
</main>

<style>
    h2{
        margin: 0 auto;
        font-size: 30px;
        font-weight: bold;
    }
    main{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background-color: white;
        border-radius: 20px 40px;
        box-shadow: 0 0 2px 4px #22092c41;
        width: 800px;
        height: 700px;
        margin: 0 auto;
        padding: 20px;
    }

    .login{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
    }

    .form-label{
        margin-top: 20px;
        margin-bottom: 15px;
    }

    .form-field{
        width: 500px;
        height: 20px;
    }

    .form-text{
        width: 500px;
        height: 150px;
        resize: none;
    }


  .form-submit{
    height: 40px;
    width: 500px;
    margin-top: 40px;
    background-color: #cc4242;
    font-weight: bold;
    border: none;
    border-radius: 20px 20px;
    color: white;
    cursor: pointer;
    transition: height 0.2s, width 0.2s;
  }

  .form-submit:hover{
    height: 45px;
    width: 505px;
    transition: height 0.5s, width 0.5s;
  }
</style>