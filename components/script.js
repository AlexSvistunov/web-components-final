const input = document.querySelector(".input");
const template = document.querySelector("template");
const button = document.querySelector(".button");
const comments = document.querySelector(".comments");

customElements.define(
  "custom-comment",
  class extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <slot name='layout'></slot>
        <slot name='styles'></slot>
      `;
    }

    connectedCallback() {
      const styles = this.shadowRoot
        .querySelector('slot[name="styles"]')
        .assignedNodes();
      this.shadowRoot.appendChild(styles[0]);

      const layout = this.shadowRoot
        .querySelector('slot[name="layout"]')
        .assignedNodes();
      this.shadowRoot.appendChild(layout[0]);

      this.shadowRoot.querySelector(".reply").addEventListener("click", () => {
        this.shadowRoot
          .querySelector(".add-comment")
          .classList.toggle("hidden");
      });

      this.shadowRoot.querySelector(".submit").addEventListener("click", () => {
        const value = this.shadowRoot.querySelector(".textarea").value;
        if (value) {
          const comment = createCustomComment(value);
          this.shadowRoot.querySelector(".children").appendChild(comment);
        }
      });
    }

    disconnectedCallback() {
      alert('Комментарий был удален!!!')
    }
  }
);

button.addEventListener("click", () => {
  if (input.value) {
    const comment = createCustomComment(input.value);
    comments.appendChild(comment);
  }
});

function createCustomComment(valueTitle) {
  const customComment = document.createElement("custom-comment");
  customComment.innerHTML = `
    <style slot="styles">
      
      ul {
        margin: 0;
        padding: 0;
      }

      .comment-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .hidden {
        display: none;
      }

      custom-comment {
        display: block;
        border: 1px solid blue;
      }

      :host {
        display: block;
        max-width: 350px;
        // background-color: rgb(128 166 226);
        border: 1px solid blue;
        padding: 15px;
        border-radius: 20px;
        color: black;
      }

      :slotted(div) {
        border: 1px solid blue;
      }

      .layout {
        background: black;
      }

      .children {
        padding-left: 15px;
      }

      .comment-bottom {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 7px;
      }

      .reply, .delete {
        border: none;
        background: transparent;
        // color: white;
        color: black;
        font-size: 16px;
      }

      .nickname {
        font-size: 16px;
      }

      .date {
        font-size: 12px;
      }

      .text {
        font-size: 21px;
      }


  </style> 

    <div slot="layout">
    <div class="comment-head">
      <span class='nickname'>Nickname</span>
      <span class='date'>${new Date().toLocaleString()}</span>
    </div>

    <p class='text'>${valueTitle}</p>

    <div class="comment-bottom">
      <button class='reply'>Reply</button>
      <button class='delete'>Delete</button>
    </div>

    <div class='add-comment hidden'>
      <textarea class='textarea'></textarea>
      <button class='submit'>Submit</button>

    </div>

    <ul class='children'></div>

  </div>


    `;

  return customComment;
}
