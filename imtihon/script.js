const getProduct = document.querySelector(".getProduct");
const searchBtn = document.querySelector(".searchBtn");
const addBtn = document.querySelector(".AddBtn");
const addProduct = document.querySelector(".addProduct");
const exit = document.querySelector(".exit");
const addSubmit = document.querySelector(".addSubmit");
const addForm = document.querySelector(".addForm");
const search = document.querySelector(".searchInput");

const API = "https://68fa52ccef8b2e621e7f9ced.mockapi.io/items"

async function getProducts() {
  try {    
    const res = await fetch(API);
    const data = await res.json();
    console.log(data);
    getProduct.innerHTML = "";
    data.forEach(renderItem);
  } catch (err) {
    getProduct.innerHTML = "Xato";
    console.log(err);
  }
}

function renderItem(el) {
  const newDiv = document.createElement("div");
  newDiv.classList = "iteamProduct";
  newDiv.dataset.id = el.id;
  newDiv.innerHTML = `
        <img src="${el.image}" alt="img">
        <div class="namePrise">
            <h2>${el.name}</h2>
            <p>${el.price} $</p>
        </div>
        <p>${el.description}</p>
        <div class="btns">
            <button class="rename">Rename</button>
            <button class="delete">Delete</button>
        </div>
    `;
  getProduct.append(newDiv);
}

addBtn.addEventListener("click", () => {
  addProduct.style.display = "flex";
});
exit.addEventListener("click", () => {
  addProduct.style.display = "none";
});
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const img = document.querySelector("#img").value;
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const description = document.querySelector("#description").value;

  const newProduct = { image: img, name, price, description };
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  const data = await res.json();
  renderItem(data);

  addForm.reset();
  addProduct.style.display = "none";
});


getProduct.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    const item = e.target.closest(".iteamProduct");
    const id = item.dataset.id;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    item.remove();
  }
});

getProduct.addEventListener("click", async (e) => {
  if (e.target.classList.contains("rename")) {
    const item = e.target.closest(".iteamProduct");
    const id = item.dataset.id;
    const img = prompt("Your img url")
    const Newname = prompt("Your product name")
    const price = +prompt("your price")
    const description = prompt("your description")

    if (!img || !Newname || !price || !description) return
  
    const updated = {
      image: img, 
      name: Newname,
      price: price,
      description: description
    };

    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const data = await res.json();
    item.querySelector("h2").innerText = data.name;
    item.querySelector("img").innerHTML = data.image;
    item.querySelector("p").innerText = data.price;

  }
});

searchBtn.addEventListener("click", async () => {
  const query = search.value.trim();
  if (!query) return;

  getProduct.innerHTML = "Qidirilmoqda ...";

  const res = await fetch(API);
  const data = await res.json();

  getProduct.innerHTML = "";

  let found = false;
  data.forEach((el) => {
    if (el.name.toLowerCase().includes(query.toLowerCase())) {
      renderItem(el);
      found = true;
    }
  });

  if (!found) {
    getProduct.innerHTML = `<div class="loading">Topilmadi</div>`;
  }
});

getProducts();
