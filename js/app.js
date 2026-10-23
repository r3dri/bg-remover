document.addEventListener('DOMContentLoaded', () => {
    const uploadPanel = document.getElementById('uploadPanel');
    const processingPanel = document.getElementById('processingPanel');
    const resultPanel = document.getElementById('resultPanel');

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const chooseBtn = document.getElementById('chooseBtn');

    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    const originalImg = document.getElementById('originalImg');
    const resultImg = document.getElementById('resultImg');

    const statTime = document.getElementById('statTime');
    const statOriginal = document.getElementById('statOriginal');
    const statResult = document.getElementById('statResult');
    const statSize = document.getElementById('statSize');

    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const editAgainBtn = document.getElementById('editAgainBtn');

    const modelControl = document.querySelector('.segmented-control');
    const themeToggle = document.getElementById('themeToggle');
    const toast = document.getElementById('toast');

    let currentFile = null;
    let resultBlob = null;
    let resultUrl = null;
    let selectedModel = 'fast';

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    function showToast(message, duration = 3000) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    }

    function formatSize(bytes) {
        return (bytes / 1024).toFixed(1);
    }

    function showPanel(panel) {
        uploadPanel.classList.add('hidden');
        processingPanel.classList.add('hidden');
        resultPanel.classList.add('hidden');
        panel.classList.remove('hidden');
    }

    async function loadFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            showToast('❌ Пожалуйста, выберите изображение');
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            showToast('❌ Файл слишком большой (макс. 20 МБ)');
            return;
        }

        currentFile = file;
        const originalUrl = URL.createObjectURL(file);
        originalImg.src = originalUrl;

        await processImage(file);
    }

    async function processImage(file) {
        showPanel(processingPanel);
        const startTime = performance.now();

        try {
            progressText.textContent = 'Загрузка нейросети...';
            progressFill.style.width = '20%';

            const { removeBackground } = await import('https://esm.sh/@imgly/background-removal@1.4.5');

            progressText.textContent = 'Анализ изображения...';
            progressFill.style.width = '50%';

            const config = {
                model: selectedModel === 'high' ? 'medium' : 'small',
                output: { format: 'image/png', quality: 0.9 }
            };

            progressText.textContent = 'Удаление фона...';
            progressFill.style.width = '80%';

            resultBlob = await removeBackground(file, config);

            progressFill.style.width = '100%';
            progressText.textContent = 'Готово!';

            if (resultUrl) URL.revokeObjectURL(resultUrl);
            resultUrl = URL.createObjectURL(resultBlob);
            resultImg.src = resultUrl;

            const img = new Image();
            img.src = resultUrl;
            await new Promise(resolve => img.onload = resolve);

            const endTime = performance.now();
            statTime.textContent = ((endTime - startTime) / 1000).toFixed(2);
            statOriginal.textContent = formatSize(file.size);
            statResult.textContent = formatSize(resultBlob.size);
            statSize.textContent = `${img.width}×${img.height}`;

            setTimeout(() => showPanel(resultPanel), 500);

        } catch (error) {
            console.error('Ошибка обработки:', error);
            showToast('❌ Ошибка при обработке изображения. Проверьте консоль.');
            showPanel(uploadPanel);
        }
    }

    chooseBtn.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('click', (e) => {
        if (e.target === dropZone || e.target === dropZoneInner || dropZone.contains(e.target)) {
            fileInput.click();
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) loadFile(e.target.files[0]);
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) loadFile(file);
    });

    document.addEventListener('paste', (e) => {
        const items = e.clipboardData.items;
        for (let item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) loadFile(file);
                return;
            }
        }
    });

    modelControl.addEventListener('click', (e) => {
        if (e.target.classList.contains('seg-btn')) {
            modelControl.querySelectorAll('.seg-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            selectedModel = e.target.dataset.model;
        }
    });

    copyBtn.addEventListener('click', async () => {
        if (!resultBlob) return;
        try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': resultBlob })]);
            showToast('✅ Скопировано в буфер обмена');
        } catch (error) {
            showToast('❌ Не удалось скопировать (нужен HTTPS)');
        }
    });

    downloadBtn.addEventListener('click', () => {
        if (!resultUrl || !currentFile) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        const originalName = currentFile.name.replace(/\.[^/.]+$/, '');
        a.download = `${originalName}-no-bg.png`;
        a.click();
        showToast('✅ Файл скачан');
    });

    editAgainBtn.addEventListener('click', () => {
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        currentFile = null;
        resultBlob = null;
        resultUrl = null;
        fileInput.value = '';
        showPanel(uploadPanel);
    });
});