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
      const styles = this.shadowRoot.querySelector('slot[name="styles"]').assignedNodes()
      this.shadowRoot.appendChild(styles[0])

      this.querySelector('.reply').addEventListener('click', () => {
        this.querySelector('.add-comment').classList.toggle('hidden')
      })

      this.querySelector('.submit').addEventListener('click', () => {
        const value = this.querySelector('.textarea').value
        if(value) {
          const comment = createCustomComment(value)
          this.querySelector('.children').appendChild(comment)
        }

      })

  
     
    }
  }
);

button.addEventListener("click", () => {
  if (input.value) {
    const comment = createCustomComment(input.value)
    comments.appendChild(comment)
  }
});




function createCustomComment(valueTitle) {
  const customComment = document.createElement("custom-comment");
    customComment.innerHTML = `
    <style slot="styles">

    :host {
      display: block;
      background-color: grey;
      max-width: 250px;
    }

      custom-comment {
        
      }

      .comment-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .hidden {
        display: none;
      }

      :host {
        background-color: grey;
      }

      ::slotted(.children) {
        background-color: grey;
      }

  </style> 

    <div slot="layout">
    <div class="comment-head">
      <span>Nickname</span>
      <span>May 11, 2024</span>
    </div>

    <p>${valueTitle}</p>

    <div class="comment-bottom">
      <button class='reply'>Reply</button>
      <button>Delete</button>
    </div>

    <div class='add-comment hidden'>
      <textarea class='textarea'></textarea>
      <button class='submit'>Submit</button>

    </div>

    <div class='children'></div>

  </div>


    `;

    return customComment

  
}