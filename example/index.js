const input = document.querySelector('.input')
const submitBtn = document.querySelector('.submit')
const list = document.querySelector('.list')



class CustomComment extends HTMLElement {
  constructor(value) {
    super()
    const template = getTemplate(value)
    this.attachShadow({
      mode: 'open'
    })

    this.shadowRoot.append(template.content)
  }

  connectedCallback() {
    
  }
}


function getTemplate(commentText) {
  const template = document.createElement('template')
  template.innerHTML = `
  <div class="comment-head">
  <span class='nickname'>Nickname</span>
  <span class='date'>${new Date().toLocaleString()}</span>
  </div>

  <p class='text'>${commentText}</p>

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



  </style>
  `

  return template
}

customElements.define('custom-comment', CustomComment)

submitBtn.addEventListener('click', () => {
  const value = input.value
  if(value) {
    const element = new CustomComment(value)
    console.log(element)
    list.appendChild(element)
  }
})