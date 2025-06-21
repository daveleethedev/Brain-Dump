let posts = JSON.parse(localStorage.getItem("posts")); //Pega os posts do LocalStorage

// Pra começar a função de carregar os posts assim que a página abrir
window.onload = function () {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let main = document.getElementById("container"); // Onde os Posts ficam
    let topic = document.createElement("div"); // Cria o elemento do tópico
    topic.innerHTML = `
            <div id="post">
                <h1 id="topic-title">${post.titleInput.slice(0, 30)}...</h1>
                <h2 id="topic-prev">${post.contentInput.slice(0, 21)}.....</h2>
                <br>
                <div id="postDate">Postado dia (${post.postDay}/${
      post.postMonth
    }/${post.postYear}) as ${post.postHour}:${post.postMinutes}</div>
                <br>
                <button onclick="abrirTopico(${i})">
                    👁️
                </button>

                <button onclick="editarPost(${i})">
                    ✏️
                </button>

                <button onclick="deletarPost('${post.titleInput}')">
                    🗑️
                </button>
            </div>
            <hr>`;

    let count = document.getElementById("topics-counter");
    count.innerText = posts.length;

    let adicionaTopico = main.appendChild(topic);
  }
};

if (posts.length > 0) {
  document.getElementById("aviso").style.display = "none";
}

function abrirTopico(index) {
  localStorage.setItem("currentPost", index);
  window.open("view.html", "_self");
}

function editarPost(index) {
  localStorage.setItem("editPost", index);
  window.location.href = "edit.html";
}

function deletarPost(title) {
  const filtered = posts.filter((x) => x.titleInput != title);
  localStorage.setItem("posts", JSON.stringify(filtered));
  location.reload();
}

const searchInput = document.getElementById("searchbar");
const searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("click", () => {
  const termo = searchInput.value.toLowerCase();
  const container = document.getElementById("container");

  container.innerHTML = ""; // Limpa os tópicos anteriores

  const resultados = posts.filter(
    (post) =>
      post.titleInput.toLowerCase().includes(termo) ||
      post.contentInput.toLowerCase().includes(termo)
  );

  if (resultados.length === 0) {
    container.innerHTML = `
    <p style='text-align:center; font-size:20px; color:#aac525;'>Nenhum tópico encontrado.</p> 
    <br> 
    <img style="width:180px;margin-left:310px;" src="images/sad frogone.png">
    `;
    return;
  }

  resultados.forEach((post, i) => {
    let topic = document.createElement("div");
    topic.innerHTML = `
      <div id="post">
          <h1 id="topic-title">${post.titleInput.slice(0, 30)}...</h1>
          <h2 id="topic-prev">${post.contentInput.slice(0, 20)}.....</h2>
          <br>
          <div id="postDate">Postado dia (${post.postDay}/${post.postMonth}/${
      post.postYear
    }) às ${post.postHour}:${post.postMinutes}</div>
          <button onclick="abrirTopico(${posts.indexOf(post)})">
              👁️
          </button>
          <button onclick="deletarPost('${post.titleInput}')">
              🗑️
          </button>
      </div>
      <hr>
    `;
    container.appendChild(topic);
  });
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchButton.click();
});
