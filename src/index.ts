const btnsContainer = document.querySelector(".header_button_container");

const itemsContainer = document.querySelector(".items_container");

const modalContainer = document.querySelector(".modal_container");
const modalTitle = document.querySelector(".modal_title_container");
const modalSub = document.querySelector(".modal_sub_container");

const modalCloseBtn = document.querySelector(".modal_closeBtn");

const addItemForm = document.querySelector(".addItemForm");

const titleInput = document.querySelector("#titleInput");
const subInput = document.querySelector("#subInput");

let lastestRole: string = "";

addItemForm?.addEventListener("submit", (event): void => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
        createItem();
        handleModal(false);
        if (titleInput instanceof HTMLInputElement && subInput instanceof HTMLInputElement) {
            titleInput.value = "";
            subInput.value = "";
        }
    }
})

// 
function deleteItem(event: MouseEvent) {
    if(event.target instanceof HTMLButtonElement) {
        const targetItem = document.getElementById(event.target.id);
        targetItem?.remove();
    }
}

function createItem(): void {
    const title: string = (<HTMLInputElement>titleInput).value;
    const sub: string = (<HTMLInputElement>subInput).value;
    const itemID = Date.now().toString();

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

btnsContainer?.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement) {
        const role: string | undefined = event.target.dataset.role;
        handleModal(true, role);
        if(typeof(role) === "string") {
            lastestRole = role;
        }
        
    }
});

modalCloseBtn?.addEventListener("click", () => {handleModal(false)});

modalContainer?.addEventListener("mousedown", (event) => {
    if(event.target instanceof HTMLDivElement && event.target.matches(".modal_container")) {
        handleModal(false);
    }
});

modalContainer?.addEventListener("keyup", (event) => {
    if(event instanceof KeyboardEvent && event.key === "Escape") {
        handleModal(false);
    }
})

function handleModal(condition: boolean, role?: string): void {
    if(modalContainer instanceof HTMLDivElement) {
        if(condition) {
            const modalSub = document.querySelector(".modal_sub");
            
            if(titleInput instanceof HTMLInputElement 
                && subInput instanceof HTMLInputElement
                && modalSub instanceof HTMLParagraphElement) 
                {
                switch(role) {
                    case "image":
                    case "video":
                        titleInput.innerText = "Title";
                        modalSub.innerText = "URL";
                        subInput.name = "url";
                        break;
                    case "note":
                    case "task":
                        titleInput.innerText = "Title";
                        modalSub.innerText = "Body";
                        subInput.name = "body";
                        break;
                    default:
                        break;
                }
                modalContainer.style.visibility = "visible";
                titleInput.focus();
                return;
            }
        }
        modalContainer.style.visibility = "hidden";
        return;
    }
}