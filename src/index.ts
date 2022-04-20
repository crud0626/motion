const btnsContainer = document.querySelector(".header_button_container");

const itemsContainer = document.querySelector(".items_container");

const modalContainer = document.querySelector(".modal_container");
const modalTitle = document.querySelector(".modal_title_container");
const modalSub = document.querySelector(".modal_sub_container");

const modalCloseBtn = document.querySelector(".modal_closeBtn");

const addItemForm = document.querySelector(".addItemForm");

let lastestRole: string = "";

addItemForm?.addEventListener("submit", (event): void => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
        createItem();
    }
})

function createItem(): void {
    const title: string = (<HTMLInputElement>document.querySelector("#modalTitle")).value;
    const sub: string = (<HTMLInputElement>document.querySelector("#modalSub")).value;

    const item = document.createElement("div");
    item.className = "item";

    console.log(lastestRole);

    switch(lastestRole) {
        case "image":
            item.innerHTML = `
                <img src="https://i.picsum.photos/id/786/320/180.jpg?hmac=g1vj-iy_QoZDDl20vAioPB1Y_2ppwF07enxe-KSmcJU" alt="image">
                <div class="item_text">
                    <p class="item_title">image test</p>
                </div>
                <button class="closeBtn">X</button>
            `;
            break;
        case "video":
            item.innerHTML = `
                <iframe src=http://www.youtube.com/embed/${sub} width="320" height="180" frameborder="0"></iframe>
                <div class="item_text">
                    <p class="item_title">${title}</p>
                </div>
                <button class="closeBtn">X</button>
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
                <button class="closeBtn">X</button>
            `;
            break;
        case "task":
            item.innerHTML = `
                <div class="item_text">
                    <p class="item_title">${title}</p>
                    <input type="checkbox" name=${sub}>
                    <label for="blah">${sub}</label>
                </div>
                <button class="closeBtn">X</button>
            `;
            break;
        default:
            return;
    }
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

modalContainer?.addEventListener("click", (event) => {
    if(event.target instanceof HTMLDivElement && event.target.matches(".modal_container")) {
        handleModal(false);
    }
});

function handleModal(condition: boolean, role?: string): void {
    if(modalContainer instanceof HTMLDivElement) {
        if(condition) {
            const titleElem = document.querySelector(".modal_title");
            const subElem = document.querySelector(".modal_sub");
            const subText = document.querySelector("#modalSub");
            
            if(titleElem instanceof HTMLParagraphElement 
                && subElem instanceof HTMLParagraphElement
                && subText instanceof HTMLInputElement) 
                {
                switch(role) {
                    case "image":
                    case "video":
                        titleElem.innerText = "Title";
                        subElem.innerText = "URL";
                        subText.name = "url";
                        break;
                    case "note":
                    case "task":
                        titleElem.innerText = "Title";
                        subElem.innerText = "Body";
                        subText.name = "body";
                        break;
                    default:
                        break;
                }
                modalContainer.style.visibility = "visible";
                return;
            }
        }
        modalContainer.style.visibility = "hidden";
        return;
    }
}
