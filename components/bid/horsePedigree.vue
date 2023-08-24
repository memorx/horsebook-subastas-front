<template>
    <div class="cont-pedigree flex justify-center items-center">
        <div v-if="link">
            <img
                :src="link"
                alt="Pedigree Image"
                style="width: 100%; height: 100%;"
            >
        </div>
        <div v-else>
            <h1>IMAGEN NO DISPONIBLE POR EL MOMENTO</h1>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PedigreeComponent',
    props: {
        link: {
            type: String,
        }
    }
}
</script>
