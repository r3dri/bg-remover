<div align="center">

# ️✂️ BG Remover

### Удаление фона с изображений нейросетью прямо в браузере

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://r3dri.github.io/bg-remover/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

![BG Remover Preview](preview.png)

**Ваш файл остаётся на вашем устройстве. Никаких серверов. Полная приватность.**

<div align="center">
  <a href="https://r3dri.github.io/bg-remover/" target="_blank">
    <img src="https://img.shields.io/badge/_Открыть_приложение-007AFF?style=for-the-badge&logo=rocket&logoColor=white" alt="Открыть приложение">
  </a>
</div>

</div>

---

## 📖 О проекте

**BG Remover** — ощный локальный инструмент для удаления фона с изображений, который работает полностью в вашем браузере:
- 🧠 Нейросеть ONNX + WebAssembly анализирует изображение
- 🎯 Создаёт точную маску прозрачности
- 💾 Сохраняет результат без отправки на сервер

Всё работает **полностью в вашем браузере** — файлы никогда не покидают ваше устройство.

---

## Возможности

<table>
<tr>
<td width="50%">

### 🔒 Приватность
- 100% локальная обработка
- Никаких сетевых запросов
- Ваши данные в безопасности

</td>
<td width="50%">

### 🎨 Современный UI
- Тёмная и светлая темы
- Apple-like дизайн
- Плавные анимации

</td>
</tr>
<tr>
<td width="50%">

### 🤖 Нейросеть
- ONNX Runtime Web
- WebAssembly для скорости
- Два режима качества

</td>
<td width="50%">

### 📊 Статистика
- Время обработки
- Размер исходника и результата
- Разрешение изображения

</td>
</tr>
</table>

### Два режима качества

1. **Быстрая** — для простых задач с однотонным фоном и чёткими границами объекта
2. **Качественная** — для сложных случаев: волосы, прозрачные объекты, мелкие детали

---

## 🌍 Поддерживаемые форматы

<div align="center">
 Форматы изображений
[![JPG](https://img.shields.io/badge/JPG-FFD700?logo=jpeg&logoColor=black)](#)
[![JPEG](https://img.shields.io/badge/JPEG-FFD700?logo=jpeg&logoColor=black)](#)
[![PNG](https://img.shields.io/badge/PNG-000000?logo=png&logoColor=white)](#)
[![WEBP](https://img.shields.io/badge/WebP-4285F4?logo=webp&logoColor=white)](#)
[![BMP](https://img.shields.io/badge/BMP-808080?logo=bmp&logoColor=white)](#)
</div>


---

## Использование

### Онлайн (через GitHub Pages)

1. Перейдите на [демо-страницу](https://r3dri.github.io/bg-remover/)
2. Перетащите изображение в зону загрузки или нажмите "Выбрать файл"
3. Выберите качество модели (быстрая или качественная)
4. Дождитесь обработки нейросетью
5. Скопируйте результат или скачайте PNG

### Локально

```bash
# Клонируйте репозиторий
git clone https://github.com/r3dri/bg-remover.git

# Откройте index.html в браузере
cd bg-remover
open index.html  # macOS
# или
xdg-open index.html  # Linux
# или просто дважды кликните на файл