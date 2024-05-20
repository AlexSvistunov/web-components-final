


const posts = document.querySelectorAll('.post')
posts.forEach(post => {
  const commentBtn = post.querySelector('.post__comment-btn')
  const postComments = post.querySelector('.post__comments')
  const commentsList = post.querySelector('.comments')

  
const field = post.querySelector(".post__textarea");
const template = post.querySelector("template");
const sendPost = post.querySelector(".post__send");


commentBtn.addEventListener('click', () => {
  postComments.classList.toggle('hidden')
})

 
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

      const replyBtn = this.shadowRoot.querySelector('.reply')
      const addComment = this.shadowRoot.querySelector('.add-comment')
      const submit = this.shadowRoot.querySelector(".submit")
      const textarea = this.shadowRoot.querySelector(".textarea")
      const textareaValue = textarea.value
    
      replyBtn.addEventListener("click", () => {
        addComment
          .classList.toggle("hidden");
      });

      submit.addEventListener("click", () => {
        if (textarea.value.length) {

          const comment = document.createElement('custom-comment')
          comment.setAttribute('slot', 'inner-comment')
          comment.setAttribute('value', value)
          this.appendChild(comment)
          textarea.value = ''

          addComment.classList.add('hidden')

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

    .comment-wrapper {
      margin: 0 0 10px;
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


