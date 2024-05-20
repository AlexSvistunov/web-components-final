const commentBtn = document.querySelector('.post__comment-btn')
const postComments = document.querySelector('.post__comments')
const commentsList = document.querySelector('.comments')

const field = document.querySelector(".post__textarea");
const template = document.querySelector("template");
const sendPost = document.querySelector(".post__send");

commentBtn.addEventListener('click', () => {
  postComments.classList.toggle('hidden')
})


customElements.define(
  "custom-comment",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const value = this.getAttribute('value')
      const template = createTemplate(value);


      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content);
    

      this.shadowRoot.querySelector(".reply").addEventListener("click", () => {
        this.shadowRoot
          .querySelector(".add-comment")
          .classList.toggle("hidden");
      });

      this.shadowRoot.querySelector(".submit").addEventListener("click", () => {
        const value = this.shadowRoot.querySelector(".textarea").value;
        if (value.length) {

          const comment = document.createElement('custom-comment')
          comment.setAttribute('slot', 'inner-comment')
          comment.setAttribute('value', value)
          this.appendChild(comment)
          this.shadowRoot.querySelector(".textarea").value = ''

          this.shadowRoot.querySelector('.add-comment').classList.add('hidden')

        }
      });
    }

    disconnectedCallback() {
      alert("Комментарий был удален!!!");
    }
  }
);

sendPost.addEventListener("click", () => {
  if (field.value) {
    const comment = document.createElement("custom-comment");
    comment.setAttribute('value', field.value)
    commentsList.appendChild(comment);

    field.value = ''

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

      <textarea class="textarea"></textarea>
      <button class="submit">Reply</button>

    </div>


  </div>

  <slot name='inner-comment'></slot>
  


  <style>

    :host {
      display: block;
      max-width: 100%;
      padding: 15px;
      border-radius: 20px;
      color: black;
      padding-left: 15px;
    }

    .add-comment {
      padding: 20px 0;
      display: flex;
      align-items: center;
      gap: 25px;
    }

    .textarea {
      outline: 1px solid transparent;
      flex: 0 1 90%;
      resize: none;
      padding: 10px;
      height: 20px;
      border-radius: 10px;
    }


    .comment-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .submit {
      padding: 0;
      margin: 0;
      background: transparent;
      border: none;
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
      font-size: 18px;
    }
  </style>


  `;

  return template;
}


