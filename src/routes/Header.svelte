<script>
// @ts-nocheck

    import { onMount } from "svelte";
	import axios from 'axios';
    import { API_URL, URL } from "./config";
	import { browser } from "$app/environment";
    import { goto, invalidateAll } from "$app/navigation";

	let active_session = false;
	let codigo = '';
	let nombre = '';
	
	let message = '';

	let current = '';
	if(browser){
		current = window.location.href;
	}

  	// @ts-ignore
  	let dialog;
	onMount(async () => {
    	dialog = document.getElementById('dialog-modal-header');
		const session_id = localStorage.getItem("session");
		console.log(session_id);

		if(session_id == null)
			return;

		const url = `${API_URL}/api/usuario/verify`;
		axios.post(url,{session:session_id},{
			validateStatus: function(status){
				return status === 401 || status === 200;
			}
		}
		).then( response =>{
			switch(response.status){
				case 200:
					active_session = true;
					codigo = response.data[0].codigo;
					const tmpnombre = response.data[0].nombre.split(' ');
					nombre = tmpnombre[tmpnombre.length - 1];
					break;
				case 401:
					message = 'Sesión caducada';
					dialog.showModal();
				break;
			}
			if(response.status == 200){
			}
		}).catch( err => {
			console.log(err);
		})
	});

	function logout(){
		localStorage.removeItem("session");
		invalidateAll();
		location.href = '/';
	}

	function gotoLogin(){
		goto('/form/login');
	}

	function gotoInicio(){
        location.href = '/';
	}

	function gotoReview(){
		location.href = '/form/review';
	}

	function gotoRegistro(){
		location.href = '/form/account';
	}
 	function closeModal(){
		localStorage.removeItem("session");
    	dialog.close();
		gotoInicio();
  	}


	function gotoAccount(){
		location.href = '/account';
	}
</script>

<dialog data-modal id='dialog-modal-header'>
  <div class="dialog-content">
    <div class="dialog-message">{message}</div>
    <button class="dialog-btn" data-close-modal on:click={closeModal}>Cerrar</button>
  </div>
</dialog>

<header>
	<h1 class="web-name">Recomendaciones CUCEI</h1>
	<nav>
		<div class="separator">
			<div class="separator-body">
				<button class="separator-button" on:click={gotoInicio}>INICIO</button>
			</div>
			{#if current == `${URL}/`}
			<div class="separator-head"></div>
			{/if}
		</div>
		{#if active_session}
		<div class="separator">
			<div class="separator-body">
				<button class="separator-button" on:click={gotoReview}>RESEÑAR</button>
			</div>
			{#if current == `${URL}/form/review`}
			<div class="separator-head"></div>
			{/if}
		</div>
		{/if}
	</nav>
	<div class="account">
		{#if active_session}
		<button class="btn-style log-in" on:click={gotoAccount}>{nombre}</button>
		<button class="btn-style reg" on:click={logout}>Cerrar Sesión</button>
		{:else}
		<button class="btn-style log-in" on:click={gotoLogin}>Iniciar sesión</button>
		<button class="btn-style reg" on:click={gotoRegistro}>Registro</button>
		{/if}
	</div>
</header>

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


	header{
	    display: flex;
	    width: 100vw;
	    background-color: #4D3C77;
	    justify-content: space-between;
	    align-content: center;
	    flex-direction: row;
	    height: var(--header-height)
	}	

	.web-name{
		flex: 1;
	    margin: 20px 50px;
	    /*background-color: #A2678A;
	    */
	    font-weight: bold;
	    color: #F0EDD4;
	    text-shadow: #36261b31 2px 2px 2px;
	    border-radius: 20px;
		padding-top: 15px;
	}

	
	.account{
		flex: 1;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}

	nav{
		flex: 1;
	    display: flex;
		justify-content: flex-start;
	    flex-direction: row;
	}

	.btn-style{
	    height: 60px;
	    width: 200px;
	    margin: 0 20px;
	    font-weight: bold;
	    font-size: 15px;
	    border-radius: 15px;
		cursor: pointer;
	}

	:root{
		--separator-color: rgb(192, 58, 58);
		--separator-head-width: calc(var(--separator-width) / 2);
		--header-height: 120px;
		--separator-width: 80px;
		--head-height: 20px;
	}

	.separator{
	    display: flex;
    	flex-direction: column;
    	margin: 0 10px;
    	width: var(--separator-width);
    	height: calc(var(--header-height) + var(--header-height));
	}


	.separator-body{
    	display: flex;
    	justify-content: center;
    	background-color: var(--separator-color);
    	height: var(--header-height);
	}

	.separator-button{
		font-size: 12px;
	}

	.separator-body button{
    	color: white;
    	font-weight: bold;
    	background-color: transparent;
    	cursor: pointer;
    	border: none;
    	width: 100%;
	}

	.separator-head{
    	height: 0;
    	width: 0;

    	border-top: var(--separator-head-width) solid var(--separator-color);
    	border-left: var(--separator-head-width)  solid transparent;
    	border-right: var(--separator-head-width) solid transparent;
	}
</style>
