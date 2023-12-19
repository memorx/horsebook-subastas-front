<template>
    <div class="cont-pedigree flex justify-center items-center">
        <div v-if="link">
            <img
                :src="link"
                alt="Pedigree Image"
                style="width: 100%; height: 100%;"
            >
        </div>
        <div v-else class="w-full text-left text-gray-700">
            <h1>No hay imagen de Pedigree disponible por el momento</h1>
        </div>
    </div>
</template>

<script>

export default {
    name: 'horsePedigree',
    props: {
        link: {
            type: String,
        }
    }
}
</script>
