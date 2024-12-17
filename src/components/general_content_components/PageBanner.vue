<script setup>

    const props = defineProps({

        title: {
            type: String,
            default: 'page title here', // Classe par défaut
        },

    })


</script>

<template>

    <div class="d-flex flex-wrap flex-column mt-4 p-5 bg-dark text-white rounded">

        <div class="d-flex flex-column">

            <h2 class="display-4">{{title}}</h2>
            
        </div>

        <div class="d-flex flex-wrap flex-row bd-highlight mb-3">

            <!--
            <div class="p-2 bd-highlight">
                <a href="/article" class="btn btn-success">Create an article</a>
            </div>

            <div class="p-2 bd-highlight">
                <button type="button" class="btn btn-light">My settings</button>
            </div>
            -->

        </div>
        
    </div>
    

</template>