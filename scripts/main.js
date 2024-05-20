const commentBtn = document.querySelector('.post__comment-btn')
const comments = document.querySelector('.post__comments')


commentBtn.addEventListener('click', () => {
  comments.classList.toggle('hidden')
})