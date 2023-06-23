<template>
    <div class="cont-detailsBid">
        <div class="details-bid">
            <div class="cont-titleBid">
                <div class="title-bid">
                    <p style="font-size: 30px; font-weight:600">Ofertas</p>
                    <p style="color: #667085;">Últimas ofertas</p>
                </div>
                <div class="winner">
                    <p style="font-size:20px; font-weight:500 ">Carlos Montes</p>
                    <p id="win-flag">GANADOR</p>
                </div>
            </div>
        </div>
        <div class="cont-tableBid">
            <table class="table-bid ">
                <thead>
                    <th class="columns-8">Nombre</th>
                    <th class="columns-1">Puja</th>
                    <th class="columns-1">Fecha</th>
                </thead>
                <tr>
                    <td class="p-3">Carlos Montes</td>
                    <td>$3000</td>
                    <td>02/03/2023 5:06PM</td>
                </tr>
                <tr>
                    <td>Sandra Gómez</td>
                    <td>$1045</td>
                    <td>02/03/2023 5:06PM</td>
                </tr>
                <tr>
                    <td>Alejandro López</td>
                    <td>$1025</td>
                    <td>02/03/2023 5:05PM</td>
                </tr>
            </table>
            <div class="paginator">
                <button>Anterior</button>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <button>Siguiente</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Bids',
  props: {
    bidId: {
      type: String,
      required: true
    },
    horseId:{
        type:String,
        required: true
    }
  },
  data() {
    return {
        HorsenName:'',
        BidDate:'',
        BidDateFormat:'',
        PreBidDate:'',
    }
  },
  computed: {
    
  },

}
</script>

<style scoped>
    .cont-detailsBid{
    padding-left: 25px;
    }
    .details-bid{
        padding-top: 45px;
    }
    .cont-titleBid{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .winner{
        display: flex;
        flex-direction: row;
        gap: 25px;
        padding-right: 25px;
        padding-top: 35px;
    }
    #win-flag{
        color:#027A48; 
        border:solid #027A48; 
        border-radius: 18px; 
        font-size:15px; 
        padding:5px 5px; 
        text-align:center;
        font-weight: 600;
    }
    .cont-tableBid{
        border-radius: 15px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.2);
        margin-top: 15px;
        margin-right:25px;
        margin-bottom: 45px;
        padding: 15px;
        
    }
    .table-bid {
        width: 100%;
    }
    .table-bid th,
    .table-bid td {
      border-bottom: 1px solid #ccc;
      text-align: left;
      padding: 8px;
    }
    .paginator{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-top: 15px;

    }
    .paginator p,
    .paginator button{
        padding: 5px;
    }
    .paginator p:hover, 
    .paginator button:hover{
        background-color: #ccc;
        border-radius: 10px;
    }
    

</style>