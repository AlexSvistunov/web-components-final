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
      const value = input.value
      const template = createTemplate(value)

      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content)
      // const styles = this.shadowRoot
      //   .querySelector('slot[name="styles"]')
      //   .assignedNodes();
      // this.shadowRoot.appendChild(styles[0]);

      // const layout = this.shadowRoot
      //   .querySelector('slot[name="layout"]')
      //   .assignedNodes();
      // this.shadowRoot.appendChild(layout[0]);

      this.querySelector(".reply").addEventListener("click", () => {
        this.querySelector(".add-comment").classList.toggle("hidden");
      });

      this.querySelector(".submit").addEventListener("click", () => {
        const value = this.querySelector(".textarea").value;
        if (value) {
          const comment = document.createElement('custom-comment')
          this.querySelector(".children").appendChild(comment);
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
    const comment = document.createElement('custom-comment')
    // comments.appendChild(comment);
  }
});

// function createCustomComment(valueTitle) {
//   const customComment = document.createElement("custom-comment");
 
//   customComment.appendChild(template.content)

//   return customComment;
// }

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


<div slot='inner'></slot
  `;

  return template
}

// если есть slot, то это это вложенный комментарий
// слоты для динамических данных