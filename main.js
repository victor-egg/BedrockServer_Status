// 填写你的服务器地址
const serverHost = "";
const serverPort = "";
let api_path = `https://api.chron.top/mcpe/status?host=${serverHost}&port=${serverPort}`;

async function updateServerInfo() {
    // 更新数据
    const response = await fetch(api_path);
    if (!response.ok) {
        console.error("无法请求检测api");
        updateServerStatus(false);
        return;
    }
    let serverData = await response.json();
    if (serverData.code != 200) {
        console.error(`api状态异常: ${serverData.code}`);
        updateServerStatus(false);
        return;
    }
    data = serverData.data;

    // 更新信息
    document.getElementById('serverName').textContent = data.serverName;
    document.getElementById('serverHost').textContent = data.serverHost;
    document.getElementById('serverVersion').querySelector('span').textContent = data.serverVer;
    document.getElementById('protocolVersion').querySelector('span').textContent = data.protocolVer;
    document.getElementById('serverPort').querySelector('span').textContent = data.serverPort;
    document.getElementById('worldName').querySelector('span').textContent = data.worldName;
    document.getElementById('gameMode').querySelector('span').textContent = data.gameMode === 'Survival' ? '生存模式' : data.gameMode === 'Creative' ? '创造模式' : data.gameMode === 'Adventure' ? '冒险模式' : data.gameMode;
    document.getElementById('serverId').textContent = data.serverId;
    const playerCount = parseInt(data.playerNumNow);
    const playerMax = parseInt(data.playerNumMax);
    document.getElementById('playerCount').textContent = playerCount;
    document.getElementById('playerMax').textContent = playerMax;
    document.getElementById('playerProgress').style.width = `${(playerCount / playerMax) * 100}%`;

    updateServerStatus(data.online);

    updateLastUpdatedTime();
}

// 更新服务器状态
function updateServerStatus(isOnline) {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');

    if (isOnline) {
        statusIndicator.className = 'w-3 h-3 rounded-full bg-success status-pulse';
        statusText.textContent = '在线';
        statusText.className = 'text-sm font-medium text-success';
    } else {
        statusIndicator.className = 'w-3 h-3 rounded-full bg-danger';
        statusText.textContent = '离线';
        statusText.className = 'text-sm font-medium text-danger';
    }
}

// 更新最后更新时间
function updateLastUpdatedTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const date = now.getFullYear() + '-' +
        (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
        now.getDate().toString().padStart(2, '0');

    document.getElementById('lastUpdated').textContent = `上次更新: ${date} ${hours}:${minutes}:${seconds}`;
}

// 刷新
document.querySelector('button:has(.fa-refresh)').addEventListener('click', function () {
    this.querySelector('i').classList.add('fa-spin');
    setTimeout(() => {
        updateServerInfo();
        this.querySelector('i').classList.remove('fa-spin');
    }, 2000);
});

// 复制IP按钮功能
document.querySelector('button:has(.fa-copy)').addEventListener('click', function () {
    const ipText = document.getElementById('serverHost').textContent;
    navigator.clipboard.writeText(ipText).then(() => {
        const originalText = this.querySelector('span').textContent;
        this.querySelector('span').textContent = '已复制';
        this.classList.add('bg-success/20', 'text-success');
        this.classList.remove('bg-primary/20', 'text-primary');

        setTimeout(() => {
            this.querySelector('span').textContent = originalText;
            this.classList.remove('bg-success/20', 'text-success');
            this.classList.add('bg-primary/20', 'text-primary');
        }, 2000);
    });
});

document.querySelector('button:has(.fa-plus-circle)').addEventListener('click', function () {
    const serverName = document.getElementById('ServerNameInput').value;
    console.info(`Name:${serverName}`);
    window.location.href = `minecraft://?addExternalServer=${serverName}|${serverHost}:19132`;
    this.classList.add('bg-success', 'animate-pulse');
    this.querySelector('span').textContent = '游戏已启动';

    setTimeout(() => {
        this.classList.remove('bg-success', 'animate-pulse');
        this.classList.add('bg-primary');
        this.querySelector('span').textContent = '添加服务器';
    }, 2000);
});


document.addEventListener('DOMContentLoaded', function () {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        const currentYear = new Date().getFullYear().toString();
        if (!footerElement.textContent.startsWith(currentYear)) {
            footerElement.prepend(currentYear + ' ');
        }
    }
    // 初始化
    updateServerInfo();
});