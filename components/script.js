const input = document.querySelector(".input");
const template = document.querySelector("template");
const button = document.querySelector(".button");
const comments = document.querySelector(".comments");

customElements.define(
  "custom-comment",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const value = this.getAttribute('value')
      const template = createTemplate(value);

      // я думаю что нужно управлять атрибутом

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content);
    
      // const styles = this.shadowRoot
      //   .querySelector('slot[name="styles"]')
      //   .assignedNodes();
      // this.shadowRoot.appendChild(styles[0]);

      // const layout = this.shadowRoot
      //   .querySelector('slot[name="layout"]')
      //   .assignedNodes();
      // this.shadowRoot.appendChild(layout[0]);

      this.shadowRoot.querySelector(".reply").addEventListener("click", () => {
        this.shadowRoot
          .querySelector(".add-comment")
          .classList.toggle("hidden");
      });

      this.shadowRoot.querySelector(".submit").addEventListener("click", () => {
        const value = this.shadowRoot.querySelector(".textarea").value;
        if (value) {

          const comment = document.createElement('custom-comment')
          comment.setAttribute('slot', '123')
          comment.setAttribute('value', value)
          this.appendChild(comment)
          // const comment = document.createElement("custom-comment");
          // this.shadowRoot.querySelector(".children").appendChild(comment);
          
          // const div = document.createElement('div')
          // div.setAttribute('slot', '123')
          // const template = createTemplate(value)
          // div.appendChild(template.content)

        }
      });
    }

    disconnectedCallback() {
      alert("Комментарий был удален!!!");
    }
  }
);

button.addEventListener("click", () => {
  if (input.value) {
    const comment = document.createElement("custom-comment");
    comment.setAttribute('value', input.value)
    // только создать через document.createElement(и с читать value)
    comments.appendChild(comment);
  }
});

function createTemplate(valueTitle) {
  const template = document.createElement("template");
  template.innerHTML = `
  <div class='comment-wrapper'>
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

  <slot name='123'></slot>

  <style>

    :host {
      display: block;
      max-width: 350px;
      padding: 15px;
      border-radius: 20px;
      color: black;
      padding-left: 15px;
    }


    .comment-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

    .hidden {
        display: none;
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


  `;

  return template;
}

// если есть slot, то это это вложенный комментарий
// не просто padding-left, a slotted как-то host
