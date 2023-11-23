<script>
// @ts-nocheck

    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Review from "./review.svelte";
    import { fetchReview } from "./review";
    import { browser } from "$app/environment";
    import axios from "axios";

    const nombre = $page.url.searchParams.get('nombre');


    let session;

    if(browser)
        session = localStorage.getItem("session");
    
    $: promise = fetchReview(nombre);

    function gotoCrear(){
        location.href = '/form/review?nombre=' + encodeURIComponent(nombre);
    }

</script>

<main>
    {#await promise}
        <p>Esperando...</p>
    {:then results} 
        {#each results as r}
            <Review info={r}/>
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
</style>
