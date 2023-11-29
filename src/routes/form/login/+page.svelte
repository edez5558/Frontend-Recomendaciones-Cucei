
<script>
    import axios from "axios";
    import { API_URL } from "../../config";
    import { onMount } from "svelte";

  let codigo = '';
  let password = '';

  let message = '';
  let visible = false;
  /**
     * @type {any}
     */
  let dialog;
   onMount(() => {
    dialog = document.getElementById('dialog-modal');
  });

  async function login(){
    const url = `${API_URL}/api/usuario/login`;
    axios.post(url,{codigo:codigo,password:password},{
      validateStatus: function(status){
        return status < 500;
      }
    }).then( response => {
        console.log(response.status);
        switch(response.status){
          case 200: 
            window.localStorage.setItem("session",response.data);
            location.href = '/';
            break;
          case 406:
            message = 'Usuario no registrado';
            dialog.showModal();
            break;
          case 401:
            message = "Datos invalidos";
            dialog.showModal();
            break;
          default:
            message = "Ha ocurrido un error";
            dialog.showModal();
            break;
        }
    }).catch( err => {
        message = "Ha ocurrido un error en el servidor";
        dialog.showModal();
        console.log(err);
    });
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

<main class="reviews-main short">
    <h2>Login</h2>
    <form class="login" on:submit|preventDefault="{login}">
        <label for="POST-codigo" class="form-label">Codigo</label>
        <input id="POST-codigo" class="form-field" type="text" bind:value="{codigo}" maxlength="9" required>
        <label for="POST-password" class="form-label">Contraseña</label>
        <input id="POST-password" class="form-field" type="password" bind:value="{password}" maxlength="50" required>

        <a href="/form/account">Registrarse</a>

        <button class="form-submit" type="submit">Login</button>
    </form>
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

  main{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 20px 40px;
    background-color: white;
    box-shadow: 0 0 2px 4px #22092c41;
    width: 800px;
    height: 500px;
    margin: 0 auto;
    padding: 20px;
    padding-top: 50px;
  }

  h2{
      margin: 0 auto;
      font-size: 25px;
      font-weight: bold;
  }

  .login{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
  }

  .form-label{
      margin-top: 15px;
      margin-bottom: 15px;
  }

  .form-field{
      width: 500px;
      height: 20px;
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


  .short{
      height: 400px;
  }

</style>

