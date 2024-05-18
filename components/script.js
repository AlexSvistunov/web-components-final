const input = document.querySelector(".input");
const button = document.querySelector(".button");
const comments = document.querySelector(".comments");

customElements.define(
  "custom-comment",
  class extends HTMLElement {
    constructor() {
      super();

     
    }

    connectedCallback() {
     
    }

    disconnectedCallback() {
      alert("Комментарий был удален!!!");
    }
  }
);

button.addEventListener("click", () => {
  if (input.value) {
    const comment = createCustomComment(input.value);
    comments.appendChild(comment);
  }
});

function createCustomComment(value) {
  const template = createTemplate(value)
  const customComment = document.createElement('custom-comment')
  customComment.attachShadow({
    mode: 'open'
  })


  customComment.shadowRoot.appendChild(template)

  return customComment
  
}

function createTemplate(valueTitle) {
  const template = document.createElement("template");
  template.innerHTML = `
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


    <style slot='styles'>

    .comment-head {
      background: black;
    }

    // :host {
    // display: block;
    // background: black;
    // }

    // ::slotted(div) {
    // display: block;
    // background: black;
    // }

    </style>
    `;

    return template.content
}
