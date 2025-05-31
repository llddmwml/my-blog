const params = new URLSearchParams(location.search)
const id = parseInt(params.get("id"))
console.log(id);


fetch("data/posts.json")
  .then((res) => res.json())
  .then((posts) => {
    const post = posts.find((p) => p.id === id)
    console.log(post)
    if (!post) return document.body.innerHTML = "<h2>文章不存在。。。</h2>"

    const container = document.getElementById("article-container")
    container.innerHTML = `
    <h1>${ post.title }</h1>
    <img src="${ post.image }" alt="${ post.title }" style="max-width:100%;border-radius:10px">
    ${ post.content }
    <p>标签：${ post.tags.map((t) => `<span class="tag">${ t }</span>`).join(" ") }</p>
    `
  })

// 评论js逻辑

const commentKey = `comments-${ id }`
const commentList = document.getElementById("comment-list")
const form = document.getElementById("comment-form")
const textarea = form.querySelector("textarea")

function loadComments() {
  const saved = JSON.parse(localStorage.getItem(commentKey) || "[]")
  commentList.innerHTML = saved.map(c => `<div class="comment">${ c }</div>`).join("")
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const comment = textarea.value.trim()
  if (!comment) return
  const comments = JSON.parse(localStorage.getItem(commentKey) || "[]")
  comments.push(comment)
  localStorage.setItem(commentKey, JSON.stringify(comments))
  textarea.value = ""
  loadComments()

})

loadComments()