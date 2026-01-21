// 年号の自動更新（フッター）
document.getElementById("year").textContent = new Date().getFullYear();

// データ読み込み関数
async function loadData() {
    try {
        const response = await fetch('assets/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        // 必要に応じてUIにエラーメッセージを表示
        alert('データの読み込みに失敗しました。');
        return null;
    }
}

// カード生成関数
function renderCards(sectionId, data) {
    const container = document.querySelector(`#${sectionId} .row`);
    if (!container) return; // コンテナが存在しない場合のガード
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
    if (!data) return; // データがない場合は処理をスキップ
    renderCards('games-section', data.games);
    renderCards('tools-section', data.tools);
    renderCards('media-section', data.media);
});
