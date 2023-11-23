<script>
// @ts-nocheck


    /**
     * @type {{ nombre: any; }}
     */
     export let info;

    /**
     * @param {string | number | boolean} nombre
     */
    function gotoReview(nombre){
        location.href = '/review?nombre=' + encodeURIComponent(nombre);
    }
</script>

<div class="comment">
    <p>{info.nombre}</p>
    <button on:click={gotoReview(info.nombre)}>Ver reseñas</button>
</div>

<style>
.comment{
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

button{
    width: 200px;
    border-radius: 5px;
    background-color: bisque;
    cursor: pointer;
    transition: width 0.2s;
}

button:hover{
    width: 210px;
    transition: width 0.2s;
}
</style>