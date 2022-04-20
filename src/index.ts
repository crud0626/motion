import Modal from "./modal";

const btnsContainer = document.querySelector(".header_button_container");
const itemsContainer = document.querySelector(".items_container");
const titleInput = document.querySelector("#titleInput");
const subInput = document.querySelector("#subInput");
const addItemForm = document.querySelector(".addItemForm");

const modal = new Modal();

let lastestRole: string = "";

function deleteItem(event: MouseEvent) {
    if(event.target instanceof HTMLButtonElement) {
        const targetItem = document.getElementById(event.target.id);
        targetItem?.remove();
    }
}

function createItem(): void {
    const itemID = Date.now().toString();
    let title = "";
    let sub = "";

    if(titleInput instanceof HTMLInputElement &&
        subInput instanceof HTMLInputElement)
    {
        title = titleInput.value;
        sub = subInput.value;
    }
    
    const item = document.createElement("div");
    item.className = "item";
    item.id = itemID;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "closeBtn";
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", (event) => deleteItem(event));
    deleteBtn.id = itemID;

    switch(lastestRole) {
        case "image":
            item.innerHTML = `
                <img src=${sub}/320/180 alt="image">
                <div class="item_text">
                    <p class="item_title">image test</p>
                </div>
            `;
            break;
        case "video":
            item.innerHTML = `
                <iframe src=http://www.youtube.com/embed/${sub} width="320" height="180" frameborder="0"></iframe>
                <div class="item_text">
                    <p class="item_title">${title}</p>
                </div>
            `;
            break;
        case "note":
            item.innerHTML = `
                <div class="item_text">
                    <p class="item_title">${title}</p>
                    <ul>
                        <li>${sub}</li>
                    </ul>
                </div>
            `;
            break;
        case "task":
            item.innerHTML = `
                <div class="item_text">
                    <p class="item_title">${title}</p>
                    <input type="checkbox" name=${sub}>
                    <label for="blah">${sub}</label>
                </div>
            `;
            break;
        default:
            return;
    }
    item.appendChild(deleteBtn);
    itemsContainer?.appendChild(item);
}

addItemForm?.addEventListener("submit", (event): void => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
        createItem();
        modal.close();
        if (titleInput instanceof HTMLInputElement && 
            subInput instanceof HTMLInputElement) 
        {
            titleInput.value = "";
            subInput.value = "";
        }
    }
})

btnsContainer?.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement) {
        const role: string | undefined = event.target.dataset.role;
        modal.open(role);
        if(typeof(role) === "string") {
            lastestRole = role;
        }
        
    }
});