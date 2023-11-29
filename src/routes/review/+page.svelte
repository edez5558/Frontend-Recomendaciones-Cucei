<script>
// @ts-nocheck
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Review from "./review.svelte";
    import { fetchReview } from "./review";
    import { browser } from "$app/environment";

    let dialog;
    let message = '';

    onMount(() => {
        dialog = document.getElementById('dialog-modal');
    });

    const nombre = $page.url.searchParams.get('nombre');


    let session;

    if(browser)
        session = localStorage.getItem("session");
    
    $: promise = fetchReview(nombre);

    function gotoCrear(){
        location.href = '/form/review?nombre=' + encodeURIComponent(nombre);
    }

    function showModal(){
        message = 'Reporte creado';
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

{#await promise}
    <p>Esperando informacion ....</p>
{:then result} 
    <h2 class="label-data">Nombre</h2>
    <p class="data-data">{result.nombre}</p>

    {#if result.departamentos != null}
        <h2 class="label-data">Departamentos</h2>

        {#each result.departamentos as departamento}
        <p class="data-data">{departamento.departamento}</p>
        {/each}
    {/if}
{:catch}
    <p>Ha ocurrido un error intenta refrescar la pagina.</p>
{/await}


<main>
    {#await promise}
        <p>Esperando...</p>
    {:then results} 
        {#each results.reviews as r}
            <Review info={r} clickFunction={showModal}/>
        {/each}
    {:catch error}
        <p>{error}</p>
    {/await}

    {#if session}
    <div class="comment">
        <button class="btn-add" on:click={gotoCrear}>+ Agregar reseña</button>
    </div>
    {:else}
    <div class="comment">
        <p>Para escribir una recomendación debe haber una sesión activa</p>
    </div>
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
    .btn-add{
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 5px;
        background-color: var(--separator-color);
        color: white;
        font-weight: bold;
        padding: 6px 40px;
        width: 230px;
        transition: width 0.2s;
        cursor: pointer;
    }

    .btn-add:hover{
        width: 240px;
        transition: width 0.2s;
    }
    main{
        display: flex;
        flex-direction: column;
        background-color: white;
        justify-content: flex-start;
        border-radius: 20px 40px;
        box-shadow: 0 0 2px 4px #22092c41;
        width: 800px;
        height: 100%;
        margin: 0 auto;
        padding: 20px;
    }
    .comment{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        border-radius: 4px 5px;
        padding: 0px 10px;
        border: 3px solid #4b455a;
    }

    .label-data{
        margin: 0 auto;
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 20px;
        text-align: center;
    }

    .data-data{
        margin: 0 auto;
        margin-bottom: 25px;
        text-align: center;
    }
</style>
