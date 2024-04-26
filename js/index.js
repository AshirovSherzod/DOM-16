const API_URL = "https://dummyjson.com"
const cards = document.querySelector(".cards")
const select = document.querySelector("#select")
console.log(select);

async function getAPI(url) {
    let data = await fetch(`${url}/products?limit=12`, {
        method: "GET"
    })

    data.json()
        .then(res => mapCards(res))
        .catch(err => console.log(err))
}
getAPI(API_URL)

async function mapSelect(api,id) {
    let url = ""
    if (id === "all") {
        url = `${api}/products?limit=8`
    }
    else {
        url = `${api}/products/category/${id}?limit=8`
    }

    const data = await fetch(`${url}`, {
        method: "GET"
    })

    data.json()
        .then(res => mapCards(res))
        .catch(err => console.log(err))
}
mapSelect(API_URL, "all")

function mapCards(data) {
    let newData = ""
    data.products.forEach(product => {
        newData += `
            <div class="cards__card">
                <div class="cards__card__img">
                    <img src="${product.images[0]}" alt="">
                </div>
                <div class="cards__card__desc">
                    <h1>${product.title}</h1>
                    <p>$${product.price}</p>
                </div>
            </div>
        `
    });
    cards.innerHTML = newData
}

function mapOption(data) {
    let newData = `<option value="all">All</option>`
    data.forEach(e => {
        newData += `
            <option value="${e}">${e}</option>
        `
    });
    select.innerHTML = newData
}

select.addEventListener("click", e=> {
    mapSelect(API_URL,e.target.value)
})