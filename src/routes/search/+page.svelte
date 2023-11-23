<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { fetchDocente } from "./search";
    import Search from "./search.svelte";


    let nombre = $page.url.searchParams.get('nombre');

   // @ts-ignore
     $: promise = fetchDocente(nombre);

    function gotoSearch(){
		// @ts-ignore
		location.href = '/search?nombre=' + encodeURIComponent(nombre);
	}
</script>

<form class="searching" on:submit|preventDefault={gotoSearch}>
    <label class="search-label" for="fname">Busqueda</label>
    <div class="search-bar">
        <input bind:value={nombre} type="text" id="fname" placeholder="Ingrese el nombre del maestro" required>
        <input type="submit" id="btn-search" value="Buscar">
    </div>
</form>

<main>
    {#await promise}
       <p> Esperando</p>
    {:then results} 
        {#each results as docente}
            <Search info={docente}/>
        {/each}
        {#if results.length == 0}
        <div class="comment">
            <p class="label">Sin resultados</p>
        </div>
        {/if}
    {:catch error}
        <div class="comment">
            <p class="label">Sin resultados</p>
        </div>
    {/await}
</main>

<style>
.label{
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
}
.comment{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    border-radius: 4px 5px;
    padding: 20px 10px;
    border: 3px solid #4b455a;
    background-color: white;
    width: 800px;
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
}
.searching{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
}

.search-label{
	font-size: 20px;
}

h2{
    margin: 0 auto;
}

#fname{
    height: 30px;
    width: 600px;
}

#btn-search{
    margin: 0;
    cursor: pointer;
    border: none;
    font-weight: bold;
    background-color: var(--separator-color);
	color: white;
    border-radius: 10px;
    height: 40px;
    width: 100px;
	transition: width 0.1s;
}

#btn-search:hover{
	width: 120px;
	transition: width 0.1s;
}


</style>