<template>
    <div class="w-full h-auto flex flex-col justify-start pt-4 px-6">
        <div class="flex-grow bg-[#EDEDED] rounded-lg">
            <!-- Cards Container -->
            <h2 v-if="!isUserAuthenticated" class="p-4 font-roboto text-[10px] md:text-lg xl:text-xl"><span
                    class="font-bold">Invitado </span>| Regístrate para poder ofertar en las subastas.
            </h2>
            <div class="w-full h-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <!-- Dynamic Cards -->
                <div v-for="card in displayedCards" :key="card.id" class="h-[200px] md:h-[550px] w-full relative">
                    <!-- live Button -->
                    <button :class="buttonClass(card.status)" class="absolute top-2 left-2 md:top-4 md:left-4 text-white text-center text-[7px] md:text-base xl:text-lg px-2 py-1 rounded-xl z-10">{{ card.status }}</button>

                    <!-- Card content -->
                    <div class="w-full h-1/2 flex items-center justify-center">
                        <img :src="card.image" alt="horse"
                            class="w-full h-full object-cover rounded-tl-3xl rounded-br-3xl opacity-90 hover:opacity-100 transition-opacity">
                    </div>
                    <div class="w-full md:w-full h-1/2">
                        <div class="w-full h-4/5 bg-white font-roboto flex flex-col justify-around">
                            <div>
                                <h3 class="text-center text-[10px] md:text-xl xl:text-2xl font-bold">{{ card.name }}</h3>
                                <p v-if="isUserAuthenticated" class="text-center text-[7px] md:text-lg xl:text-xl">
                                    <span class="font-bold">Lote: </span> {{ card.lot }}
                                </p>
                                <p v-else class="text-center text-[7px] md:text-lg xl:text-xl">
                                    <span class="font-bold">Pedigree: </span> {{ card.pedigree }}
                                </p>
                            </div>
                            <div v-if="isUserAuthenticated">
                                <h4 class="text-center  text-[10px] md:text-lg xl:text-xl font-bold">Mejor oferta:</h4>
                                <p class="text-center text-[7px] md:text-lg xl:text-xl font-bold">{{ card.offer }}</p>
                            </div>
                        </div>
                        <div
                            class="w-full h-1/5 bg-black text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                            <button
                                class="w-full h-full uppercase transition duration-300 transform scale-100 hover:scale-105  text-[8px] md:text-xl xl:text-xl">
                                {{ isUserAuthenticated ? 'Ofertar' : 'REGÍSTRATE PARA OFERTAR' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            cards: [
                { id: 1, name: "ZAM", lot: 1, offer: "$1,000,000.00", image: "/brown-horse.png", status: "En Vivo"},
                { id: 2, name: "OVIAN", lot: 2, offer: "$2,000,000.00", image: "/ovian-horse.png", status: "Preoferta" },
                { id: 3, name: "ZAM", lot: 3, offer: "$3,000,000.00", image: "/brown-horse.png", status: "Cerrado" },
                { id: 4, name: "OVIAN", lot: 4, offer: "$4,000,000.00", image: "/ovian-horse.png", status: "En Vivo"  },
                { id: 5, name: "ZAM", lot: 5, offer: "$5,000,000.00", image: "/brown-horse.png",status: "Preoferta" },
                { id: 6, name: "OVIAN", lot: 6, offer: "$6,000,000.00", image: "/ovian-horse.png",  status: "Cerrado" }
                // ... Add more dummy data as needed ...
            ],
            guestCards: [
                { id: 1, name: "ZAM", lot: 1, pedigree: " Lorem ipsum dolor sit amet, consectetur adipiscing elit", image: "/brown-horse.png",  status: "En Vivo"},
                { id: 2, name: "OVIAN", lot: 2, pedigree: " Lorem ipsum dolor sit amet, consectetur adipiscing elit", image: "/ovian-horse.png",  status: "Preoferta"},
                { id: 3, name: "ZAM", lot: 3, pedigree: " Lorem ipsum dolor sit amet, consectetur adipiscing elit", image: "/brown-horse.png",status: "Cerrado"},
                { id: 4, name: "OVIAN", lot: 4, pedigree: " Lorem ipsum dolor sit amet, consectetur adipiscing elit", image: "/ovian-horse.png",  status: "En Vivo" },
                { id: 5, name: "ZAM", lot: 5, pedigree: " Lorem ipsum dolor sit amet, consectetur adipiscing elit", image: "/brown-horse.png", status: "Preoferta" },
                { id: 6, name: "OVIAN", lot: 6, pedigree: " Lorem ipsum dolor sit amet, consectetur adipiscing elit", image: "/ovian-horse.png", status: "Cerrado" }
            ]
        }
    },
    mounted() {
        this.$store.commit('setLayoutMode', 'lightMode'); // set to 'lightMode' or 'default'
        this.$store.commit('setTextColorTopBar', 'tex-black'); // set to 'text-black' or 'text-white'
    },
    beforeDestroy() {
        this.$store.commit('setLayoutMode', 'default'); // reset to default when leaving the page
        this.$store.commit('setTextColorTopBar', 'text-white'); // reset to default when leaving the page
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
        displayedCards() {
            return this.isUserAuthenticated ? this.cards : this.guestCards;
        }
    },
    methods: {
        buttonClass(status) {
            switch (status) {
                case 'En Vivo':
                    return 'bg-[#58886E]';
                case 'Preoferta':
                    return 'bg-[#C6B888]';
                case 'Cerrado':
                    return 'bg-[#C76868]';
                default:
                    return 'bg-[#C76868]';
            }
        }
    }
}
</script>
