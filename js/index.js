const API_URL = "https://dummyjson.com"
const cards = document.querySelector(".cards")
const select = document.querySelector("#select")
const search = document.querySelector(".search")


// apidan malumot olish 
async function getAPI(url) {
    let data = await fetch(`${url}/products?limit=12`, {
        method: "GET"
    })

    data.json()
        .then(res => mapCards(res))
        .catch(err => console.log(err))
}
getAPI(API_URL)

// olingan malumotni card korinishida yoyish
function mapCards(data) {
    let newData = ""
    data.products.forEach(product => {
        newData += `
            <div class="cards__card">
                <div class="cards__card__img">
                    <img class="card__img" data-id="${product.id}" src="${product.images[0]}" alt="">
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


// apidan categoryni olish
async function getCategoryAPI(url) {
    let data = await fetch(`${url}/products/categories`, {
        method: "GET"
    })
    
    data.json()
        .then(res => mapCategory(res))
        .catch(err => console.log(err))
}
getCategoryAPI(API_URL)

// olingan categoryni select tegiga option sifatida qoshish
function mapCategory(data) {
    let newData = `<option value="all">All</option>`
    data.forEach(e => {
        newData += `
            <option value="${e}">${e}</option>
        `
    })

    select.innerHTML = newData
}


// select change bolganida categoryni filterlash uchun 
select.addEventListener("change", e => {
    filterSelect(API_URL,e.target.value)
})


async function filterSelect(url,selectName,searchValue) {
    let api = ""
    if (selectName === "all") {
        if(searchValue) {
            api = `${url}/products/search?q=${searchValue}`
        }
        else {
            api = `${url}/products?limit=12`
        }
    }
    else {
        api = `${url}/products/category/${selectName}?limit=12`
    }
    console.log(api);
    let data = await fetch(`${api}`, {
        method: "GET"
    })

    data.json()
        .then(res => mapCards(res))
        .catch(err => console.log(err))
}
filterSelect(API_URL, "all")

cards.addEventListener("click", e => {
    if(e.target.className === "card__img")  {
        let id = e.target.dataset.id
        window.open(`./pages/product.html?id=${id}`, "_self")
    }
    
})


search.addEventListener("keyup", e=>{
    let value = e.target.value.trim()
    if (value) {
        filterSelect(API_URL, "all", value)
        select.value = "all"
    }
})