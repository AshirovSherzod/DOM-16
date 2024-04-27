const API_URL = "https://dummyjson.com"
const router = document.querySelector(".router")

async function getData(url) {
    let param = new URLSearchParams(window.location.search)
    let id = param.get("id")
    
    const data = await fetch(`${url}/products/${id}`)

    data.json()
        .then(res => mapCard(res))
        .catch(err => console.log(err))
}
getData(API_URL)

function mapCard(data) {
    let newData = `
        <div class="router__card">
            <div class="router__card__img">
                <img src="${data.images[0]}" alt="">
            </div>
            <div class="router__card__desc">
                <div class="router__card__dTitle">
                    <h1>${data.title}</h1>
                    <div class = "router__card_dtitle">
                        <p>$${data.price}</p>
                        <p>${data.rating} Customer Rate </p>
                    </div>
                    <hr>
                </div>
                <div class="router__card__desc__desc">
                    <h4>Short Description</h4>
                    <p>${data.description}</p>
                </div>
                <div class="router__card__btns">
                    <button class="router__card__btn">Buy Now</button>
                </div>
            </div>
        </div>
    `
    router.innerHTML = newData
}