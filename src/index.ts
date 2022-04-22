import Modal from "./modal.js";

const btnsContainer = document.querySelector(".header_button_container");
const itemsContainer = document.querySelector(".items_container");
const titleInput = document.querySelector("#titleInput");
const subInput = document.querySelector("#subInput");
const addItemForm = document.querySelector(".addItemForm");

const modal = new Modal();

let lastestRole: string = "";

class DragController {
    private _draggedItem: HTMLDivElement | null = null;

    add = (element: HTMLDivElement): void => {
        element.addEventListener("dragstart", (event: DragEvent) => {
            if(event?.dataTransfer && event.currentTarget instanceof HTMLDivElement) {
                event.dataTransfer.effectAllowed = 'move';
                this._draggedItem = event.currentTarget;
            }
        });
    
        element.addEventListener("dragover", (event: DragEvent) => {
            event.preventDefault();
            if (event.currentTarget instanceof HTMLDivElement &&
                event.target instanceof HTMLElement) {
                event.currentTarget.style.border = "1px solid #f64435";
            }
        });
    
        element.addEventListener("dragleave", (event: DragEvent) => {
            event.stopPropagation();
            if (event.currentTarget instanceof HTMLDivElement) {
                event.currentTarget.style.border = "1px solid #3f3f3f";
            }
        });
    
        element.addEventListener("drop", (event: DragEvent) => {
            event.stopPropagation();
            if (itemsContainer instanceof HTMLDivElement && 
                event.currentTarget instanceof HTMLDivElement &&
                this._draggedItem instanceof HTMLDivElement) 
            {
                event.currentTarget.style.border = "1px solid #3f3f3f";
                itemsContainer.insertBefore(this._draggedItem, event.currentTarget);
                this._draggedItem = null;
            }
        });
    }
}

const dragController = new DragController();

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
    item.draggable = true;
    item.id = itemID;
    item.addEventListener("click", (event): void => {
        deleteItem(event);
    })

    switch(lastestRole) {
        case "image":
            item.innerHTML = `
                <img src=${sub} alt="image">
                <div class="item_text">
                    <p class="item_title">${title}</p>
                    <button class="closeBtn" id=${itemID}>X</button>
                </div>
            `;
            break;
        case "video":
            item.innerHTML = `
                <iframe src=http://www.youtube.com/embed/${sub} frameborder="0"></iframe>
                <div class="item_text">
                    <p class="item_title">${title}</p>
                    <button class="closeBtn" id=${itemID}>X</button>
                </div>
            `;
            break;
        case "note":
            item.innerHTML = `
                <div class="item_text">
                    <div>
                        <p class="item_title">${title}</p>
                        <ul>
                            <li>${sub}</li>
                        </ul>
                    </div>
                    <button class="closeBtn" id=${itemID}>X</button>
                </div>
            `;
            break;
        case "task":
            item.innerHTML = `
                <div class="item_text">
                    <div>
                        <p class="item_title">${title}</p>
                        <input type="checkbox" name="blahblah" id="blah">
                        <label for="blah">${sub}</label>
                    </div>
                    <button class="closeBtn" id=${itemID}>X</button>
                </div>
            `;
            break;
        default:
            return;
    }
    itemsContainer?.appendChild(item);
    dragController.add(item);
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