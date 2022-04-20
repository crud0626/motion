export default class Modal {
    constructor() {
        if(this._closeBtn instanceof HTMLButtonElement) {
            this._closeBtn.addEventListener("click", () => {this.close()});
        }

        if(this._modalContainer instanceof HTMLDivElement) {
            this._modalContainer.addEventListener("mousedown", (event) => {
                if(event.target instanceof HTMLDivElement && event.target.matches(".modal_container")) {
                    this.close();
                }
            });

            this._modalContainer?.addEventListener("keyup", (event) => {
                if(event instanceof KeyboardEvent && event.key === "Escape") {
                    this.close();
                }
            });
        }
    }

    private _modalContainer = document.querySelector(".modal_container");
    private _subContainer = document.querySelector(".modal_sub");
    private _closeBtn = document.querySelector(".modal_closeBtn");
    private _titleInput = document.querySelector("#titleInput");
    private _subInput = document.querySelector("#subInput");

    open(role: string | undefined): void {
        if (this._titleInput instanceof HTMLInputElement && 
            this._subInput instanceof HTMLInputElement &&
            this._subContainer instanceof HTMLParagraphElement) 
        {
            switch(role) {
                case "image":
                case "video":
                    this._titleInput.innerText = "Title";
                    this._subContainer.innerText = "URL";
                    this._subInput.name = "url";
                    break;
                case "note":
                case "task":
                    this._titleInput.innerText = "Title";
                    this._subContainer.innerText = "Body";
                    this._subInput.name = "body";
                    break;
                default:
                    break;
            }
            if (this._modalContainer instanceof HTMLDivElement) {
                this._modalContainer.style.visibility = "visible"
            }
            this._titleInput.focus();
        }
    }

    close(): void {
        if (this._modalContainer instanceof HTMLDivElement) {
            this._modalContainer.style.visibility = "hidden";
        }
    }
}