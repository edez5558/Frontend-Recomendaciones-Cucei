<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		margin: 0 auto;
		margin-top: 50px;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: row;
		background-color: #454870;
		justify-content: center;
		align-items: flex-start;
		padding: 12px;
	}

	.seccion{
		height: 100%;
		color: white;
		border-right: 0.5em solid #9fa3da;
		padding: 0 0.5em;
	}

	div h2{
		font-weight: bold;
	}

	ul{
		padding: 0;
	}

	footer li {
		list-style-type: none;
		margin: 0.3em 0;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
