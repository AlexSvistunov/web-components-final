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
      <slot name='styles'></slot>
      <slot></slot>
      `;
    }

    connectedCallback() {
      // const styles = this.shadowRoot
      //   .querySelector('slot[name="styles"]')
      //   .assignedNodes();
      // this.shadowRoot.appendChild(styles[0]);

      // const styles = this.shadowRoot.querySelector('slot[name="styles"]').assignedNodes();
      // console.log(styles);
      // styles.forEach(node => this.shadowRoot.appendChild(node));

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
          const comment = createCustomComment(value);
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
    const comment = createCustomComment(input.value);
    comments.appendChild(comment);
  }
});

function createCustomComment(valueTitle) {
  const customComment = document.createElement("custom-comment");


  return customComment;
}
