<template>
    <div class="container">
        <div class="sideBar bg-gray-200 border-r border-gray-300">
            <Loading
                v-if="loading"
                class="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            />
        </div>
        <div class="main">
            <div class="main2">
                <img
                    src="../../../public/image_detail_horse.png"
                    width="100%"
                    height="100%"
                >
                <div class="title">
                    <p class="styleTitle font-montserrat">Subasta</p>
                    <p class="datesAuction font-montserrat">Inicio de preoferta: {{ new
                        Date(item.start_pre_bid).toLocaleString() }}
                    </p>
                    <p class="datesAuction font-montserrat">Cierre de preoferta: {{ new
                        Date(item.start_bid).toLocaleString() }}
                    </p>

                </div>
                <!-- <div class="dividerr"></div> -->
                <div class="auctions">
                    <li
                        class="li"
                        v-for="(horse, index,) in item.horses"
                        :key="horse.id"
                    >
                        <img src="../../../public/horse_example.png">
                        <p class="nameHorse font-montserrat">{{ horse.external_data.name }}</p>
                        <p class="prizeHorse font-montserrat">Precio inicial: {{ horse.local_data.initial_pre_bid_amount }}
                            USD</p>
                        <!-- <button class="buttonDetails" v-on:click="showHorseDetails(horse)"> -->
                        <NuxtLink
                            class="buttonDetails"
                            :to="`/bids/bid?id=${id}&horsePositionList=${index}`"
                        >
                            <p class="seeDetails font-montserrat">Ver detalles </p>
                        </NuxtLink>
                        <div v-if="horse.showDetails">
                            <p class="font-montserrat">Detalles: {{ horse.external_data.alt_name }}</p>
                            <!-- Add more details here -->
                        </div>
                    </li>
                </div>
            </div>
        </div>
</div></template>