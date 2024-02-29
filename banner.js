function createBanner() {
    // Tips array
    const tips = [
        'Did you know? Apples are more effective than coffee at waking you up in the morning.',
        'Tip: Take a short walk every hour to improve productivity.',
        'Health Tip: Drink plenty of water throughout the day to stay hydrated.',
        'Did you know? Laughing can improve your cardiovascular health.',
        'Fitness Tip: Incorporate strength training exercises into your routine for overall health.',
        'Nutrition Tip: Include a variety of colorful vegetables in your meals for a range of nutrients.',
        'Sleep Tip: Aim for 7-9 hours of quality sleep each night for optimal health and well-being.',
        'Mindfulness Tip: Practice deep breathing or meditation to reduce stress and promote mental wellness.',
        'Exercise Tip: Find physical activities you enjoy to make staying active a fun part of your lifestyle.'
    ];

    // Get a random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Create a new div element
    const bannerContainer = document.getElementById('banner');
    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('bg-gradient-to-br', 'from-green-400', 'to-green-500', 'mt-6', 'text-center', 'p-4', 'banner-section');

    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'mx-auto');

    // Create text element with random tip
    const textElement = document.createElement('div');
    textElement.classList.add('text-2xl', 'font-bold', 'mb-4', 'text-white');
    textElement.textContent = randomTip;

    // Append children
    containerDiv.appendChild(textElement);
    bannerDiv.appendChild(containerDiv);

    // Append the bannerDiv to the body
    bannerContainer.appendChild(bannerDiv);
}

export { createBanner };
