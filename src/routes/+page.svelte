<script>

	let nombre = '';
	function gotoSearch(){
		location.href = '/search?nombre=' + encodeURIComponent(nombre);
	}
</script>

<svelte:head>
	<title>Recomendaciones Cucei</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<form class="searching" on:submit|preventDefault={gotoSearch}>
    <label class="search-label" for="fname">Busqueda</label>
    <div class="search-bar">
        <input bind:value={nombre} type="text" id="fname" placeholder="Ingrese el nombre del maestro" required>
        <input type="submit" id="btn-search" value="Buscar">
    </div>
</form>

<main class="short">
    <h2 class="about">Acerca de la página</h2>
    <p class="description">Esta página fue diseñada con el objetivo principal de facilitar a los alumnos del C.U.C.E.I la búsqueda del maestro más idóneo para sus cursos. Nuestra misión es proporcionar una plataforma intuitiva y fácil de usar que permita a los estudiantes acceder a información detallada sobre los profesores, sus métodos de enseñanza y las experiencias de otros alumnos. Creemos que tener acceso a estas evaluaciones y comentarios contribuirá significativamente a la toma de decisiones informadas, mejorando así la experiencia educativa de cada estudiante en el C.U.C.E.I. </p>
</main>

<style>
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

.about{
	text-align: center;
	font-size: 25px;
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

main{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 20px 40px;
    box-shadow: 0 0 2px 4px #22092c41;
	background-color: white;
    width: 800px;
    height: 500px;
    margin: 0 auto;
    padding: 20px;
}

.short{
		height: 400px;
	}

	.description{
    width: 500px;
    font-size: 16px;
    margin-top: 40px;
    align-self: center;
}

</style>
