// 年号の自動更新（フッター）
document.getElementById("year").textContent = new Date().getFullYear();

// データ読み込み関数
async function loadData() {
    const response = await fetch('assets/data.json');
    return await response.json();
}

// カード生成関数
function renderCards(sectionId, data) {
    const container = document.querySelector(`#${sectionId} .row`);
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <a class="card text-center link-underline link-underline-opacity-0 h-100 hover-rise" href="${item.href}" target="_blank" rel="noopener">
                <img src="${item.img}" class="card-img-top p-3" alt="${item.title}" />
                <div class="card-body py-2">
                    <h3 class="h6 mb-1">${item.title}</h3>
                    ${item.desc ? `<p class="card-text small text-muted mb-0">${item.desc}</p>` : ''}
                </div>
            </a>
        `;
        container.appendChild(card);
    });
}

// DOM読み込み後にカードをレンダリング
document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData();
    renderCards('games-section', data.games);
    renderCards('tools-section', data.tools);
    renderCards('media-section', data.media);
});
