// // 首页动态加载文章数据
// document.addEventListener('DOMContentLoaded', () => {
//   fetch('data/posts.json')
//     .then(res => res.json())
//     .then(posts => {
//       console.log(posts)
//       const container = document.getElementById('post-list')
//       posts.forEach(post => {
//         const card = document.createElement('div')
//         card.className = 'post-card'
//         card.innerHTML = `
//           <img src="${ post.image }" alt="${ post.title }">
//           <h3><a href="post.html?id=${ post.id }">${ post.title }</a></h3>
//           <p>${ post.content }</p>
//         `
//         container.appendChild(card)
//       })
//     })

// })

const postsPerPage = 3
const page = parseInt(new URLSearchParams(location.search).get("page") || "1")
let posts = []

fetch("data/posts.json")
  .then(res => res.json())
  .then(data => {
    posts = data
    renderPosts() //显示当前页的文章
    renderPagination() //显示分页导航按钮
  })


function renderPosts() {
  const container = document.getElementById("post-list")
  container.innerHTML = ""
  const start = (page - 1) * postsPerPage
  const paginated = posts.slice(start, start + postsPerPage)

  paginated.forEach(post => {
    const div = document.createElement("div")
    div.className = "post-card"
    div.innerHTML = `
      <img src="${ post.image }">
      <h3><a href="post.html?id=${ post.id }">${ post.title }</a></h3>
      <p>${ post.content }</p>
    `

    container.appendChild(div)
  })
}

function renderPagination() {
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const nav = document.createElement("div")
  nav.className = "pagination"

  for (let i = 1; i <= totalPages; i++) {
    const a = document.createElement("a")
    a.herf = `index.html?page=${ i }`
    a.textContent = i
    if (i === page) a.style.fontWeight = "hold"
    nav.appendChild(a)
  }

  document.body.appendChild(nav)
}