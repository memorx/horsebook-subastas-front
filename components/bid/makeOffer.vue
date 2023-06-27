<template>
    <div>
        <button class="makeOffer" @click="openModal">Hacer una Oferta</button>
        <div v-if="modalVisible" class="modal">
            <div class="modal-content">
                <div class="alert-cont">
                    <div v-if="successMessage" class="alert alert-success">
                        {{ successMessage }}
                    </div>
                    <div v-if="errorMessage" class="alert alert-danger">
                        {{ errorMessage }}
                    </div>
                </div>
                <div class="cont-OfferImg">
                </div>
                <h3 class="title-makeOffer font-montserrat">Enviar puja</h3>
                <div class="cont-titleCurrenOffer">
                    <h4 class="currentOffer">Oferta Actual: ${{ lastOffer }}</h4>
                </div>
                <form class="form-makeOffer" @submit="submitForm">
                    <div>
                        <label class="valorPuja font-montserrat" for="amount">Ingresa el valor de tu puja aquí:</label>
                        <input type="number" id="amount" class="inputPuja" placeholder="Ingrese valor"
                            v-model="formData.amount" required>
                    </div>
                    <div class="cont-buttonOffer">
                        <button class="buttonOffer buttonCancel font-montserrat" @click="closeModal">Cerrar</button>
                        <button class="buttonOffer font-montserrat" type="submit">Hacer oferta</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  

<script>
import axios from 'axios'
import JWTDecode from "jwt-decode"


export default {
    name: 'MakeOffer',

    data() {
        return {
            modalVisible: false,
            formData: {
                subasta_id: '',
                horse_id: '',
                amount: null,
                email: '',
                pre_bid: false
            },
            successMessage: '',
            errorMessage: '',
            OfferStatus: null,
        };
    },
    props: {
        bidId: {
            type: String,
            required: true
        },
        horseID: {
            type: [String, Number],
            required: true
        },
        EndPreBidDate: {
            type: String,
            required: true
        },
        lastOffer: {
            type: String,
            required: true
        },
    },
    computed: {
        setUser() {
            return this.$store.state.user;
        },
    },
    methods: {
        openModal() {
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        },
        statusOffer(EndPreBidDate) {
            const CurrentDate = new Date()
            const EndPrebid = new Date(EndPreBidDate)
            return this.OfferStatus = CurrentDate < EndPrebid
        },
        submitForm(event) {
            event.preventDefault();
            const PostBidEndpoint = '/subastas/bid/'
            const url = `${this.$config.baseURL}${PostBidEndpoint}`
            const decoded = JWTDecode(this.$cookies.get("access_token"))
            this.formData.horse_id = this.horseID
            this.formData.subasta_id = this.bidId
            this.formData.email = this.setUser.email
            //status offer
            this.formData.pre_bid = this.statusOffer(this.EndPreBidDate)

            axios.post(url, this.formData, {
                headers: {
                    Authorization: `Token ${decoded.token}`
                }
            })
                .then(response => {
                    this.successMessage = 'Oferta enviada correctamente';
                    this.errorMessage = '';
                    this.$emit('form-submitted');
                    setTimeout(() => {
                        this.successMessage = '';
                    }, 6000);
                })
                .catch(error => {
                    this.errorMessage = 'Error al enviar la oferta';
                    if (error.response && error.response.data && error.response.data.non_field_errors && error.response.data.non_field_errors.length > 0) {
                        this.errorMessage = error.response.data.non_field_errors[0];
                    }
                    this.successMessage = '';
                    setTimeout(() => {
                        this.errorMessage = '';
                        this.successMessage = '';
                    }, 6000);
                });
        },
    },
};
</script>
  
<style>
/* BUTTON MAKE OFFER*/
.makeOffer {
    color: white;
    background-color: black;
    font-size: 14;
    font-weight: 600;
    padding: 10px 16px;
}

.makeOffer:hover {
    background-color: rgb(92, 90, 90);
}

/* MODAL STYLE */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.modal-content {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    width: 600px;
    height: 500px;

}

.cont-OfferImg {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 220px;
    background-image: url('../../public/horse_white.png');
    background-repeat: no-repeat;
    background-position: 0px -70px;
    background-size: cover;
}

#closeModal {
    justify-content: end;
}

.form-makeOffer {
    padding-top: 15px;
}

/*ALERT*/

.alert {
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    max-width: 100%;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}

.cont-buttonOffer {
    box-sizing: border-box;
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    margin-top: 30px;
    /* Shadow/xs */
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
}

.cont-buttonOffer:hover {
    color: #344054;
    transition: 0.3s;
}

.title-makeOffer {
    padding-top: 15px;
    font-weight: bold;
    font-size: 1.7em;
}

.cont-titleCurrenOffer {
    display: flex;
    justify-content: end;
}

.currentOffer {
    color: #039855;
    border: #039855 solid 3px;
    padding: 5px;
    width: 240px;
    border-radius: 45px;
}

.buttonOffer {
    padding: 10px 15px;
    width: 45vw;
    border: 1px solid black;
    background-color: black;
    color: white;
}

.buttonOffer:hover {
    background-color: rgb(92, 90, 90);
    color: white;
    transition: 0.3s;
}

.buttonCancel {
    background-color: white;
    color: black;
}

.inputPuja {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 14px;
    gap: 8px;
    width: 100%;
    height: 5%;
    /* Base/White */
    background: #FFFFFF;
    /* Gray/300 */
    border: 1px solid #D0D5DD;
    /* Shadow/xs */
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}

.valorPuja {
    font-family: 'Montserrat' "sans-serif";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */
    /* Gray/600 */
    color: #475467;
}
</style>