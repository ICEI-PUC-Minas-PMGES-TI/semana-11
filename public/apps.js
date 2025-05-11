// Carrega dados iniciais
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'index.html' || path === '') {
        fetch('http://localhost:3000/autor')
            .then(res => res.json())
            .then(autor => {
                document.querySelector('h1').textContent = `✨ ${autor.nome} ✨`;
                document.querySelector('p').textContent = autor.descricao;
            });

        fetch('http://localhost:3000/posts?_limit=2')
            .then(res => res.json())
            .then(posts => {
                const destaqueHTML = posts.map(post => `
                    <div class="post">
                        <h3>${post.titulo}</h3>
                        <small>${post.categoria} • ${post.data}</small>
                    </div>
                `).join('');
                document.getElementById('destaques').innerHTML = destaqueHTML;
            });
    }

    if (path === 'detalhes.html') {
        fetch('http://localhost:3000/posts')
            .then(res => res.json())
            .then(posts => {
                // Agrupa por categoria
                const categorias = [...new Set(posts.map(post => post.categoria))];
                
                let html = '';
                categorias.forEach(cat => {
                    const postsCat = posts.filter(post => post.categoria === cat);
                    html += `
                        <div class="categoria">
                            <h2>${cat}</h2>
                            ${postsCat.map(post => `
                                <div class="post">
                                    <h3>${post.titulo}</h3>
                                    <p>${post.conteudo.substring(0, 100)}...</p>
                                    <small>${post.data}</small>
                                </div>
                            `).join('')}
                        </div>
                    `;
                });
                document.getElementById('posts-container').innerHTML = html;
            });
    }
});