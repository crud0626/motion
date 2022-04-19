const btnsContainer = document.querySelector(".header_button_container");

const modalContainer = document.querySelector(".modal_container");
const modalTitle = document.querySelector(".modal_title_container");
const modalSub = document.querySelector(".modal_sub_container");

const modalCloseBtn = document.querySelector(".modal_closeBtn");

btnsContainer?.addEventListener("click", (event) => {
    if(event.target instanceof HTMLButtonElement) {
        const role: string | undefined = event.target.dataset.role;
        handleModal(true, role);
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
            if(titleElem instanceof HTMLParagraphElement && subElem instanceof HTMLParagraphElement) {
                switch(role) {
                    case "image":
                    case "video":
                        titleElem.innerText = "Title";
                        subElem.innerText = "URL";
                        break;
                    case "note":
                    case "task":
                        titleElem.innerText = "Title";
                        subElem.innerText = "Body";
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
