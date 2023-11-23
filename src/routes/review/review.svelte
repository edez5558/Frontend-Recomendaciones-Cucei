<script>
    /**
     * @type {any}
     */
    export let info;
</script>

<div class="comment">
    <div class="comment-head">
        {#if info.calificacion > 0}
        <div class="vote vote-positive">
            <p class="vote-label">RECOMENDADO</p>
        </div>
        {:else}
        <div class="vote vote-negative">
            <p class="vote-label">NO RECOMENDADO</p>
        </div>
        {/if}

        {#if info.materia != undefined}
        <div class="extra-vote">
            <div class="vote">
                <p class="vote-label">{info.materia}</p>
            </div>
        </div>
        {/if}
        
        <button class="btn-report">Reportar</button>
    </div>
    <div class="comment-body">
        <p> {info.comentario}</p>
    </div>
</div>

<style>
    .comment{
        margin: 10px 0;
        border-radius: 4px 5px;
        padding: 0px 10px;
        border: 3px solid #4b455a;
    }

    .reviews-main{

    }

    .vote{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        margin-top: 10px;
        padding: 4px 20px;

        border: 2px solid;
        border-radius: 10px 10px;
    }

    .vote-positive{
        background-color: rgb(186, 230, 169);
        border-color: rgb(102, 156, 80);
    }

    .vote-negative{
        background-color: rgb(221, 122, 122);
        border-color: rgb(156, 80, 80);
    }

    .vote-label{
        margin: 0;
        font-size: 10px;
        background-color: transparent;
    }

    .extra-vote{
        display: flex;
        flex-direction: row;
        justify-items: flex-start;
        flex: 1;
        margin: 0 20px;
    }

    .comment-head{
        display: flex;
        flex-direction: row;
        height: 40px;
        justify-content: space-between;
    }

    .btn-report{
        background-color: #e9e59c;
        margin-top: 10px;
        font-weight: bold;
        cursor: pointer;
    }

    h2{
        margin: 0 auto;
    }
</style>