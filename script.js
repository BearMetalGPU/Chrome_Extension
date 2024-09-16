document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const gpuPowerSlider = document.getElementById('gpu-power');
    const modelComplexitySlider = document.getElementById('model-complexity');
    const gpuPowerValue = document.getElementById('gpu-power-value');
    const modelComplexityValue = document.getElementById('model-complexity-value');
    const recommendationDiv = document.getElementById('recommendation');
    const contactBtn = document.getElementById('contact-btn');
    const contactInfo = document.getElementById('contact-info');

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        });
    });

    // Slider functionality
    function handleGPUSliderChange() {
        const value = gpuPowerSlider.value;
        gpuPowerValue.textContent = value + (value == 1 ? ' GPU' : ' GPUs');
        if (value > 16) {
            recommendationDiv.classList.remove('hidden');
        } else {
            recommendationDiv.classList.add('hidden');
        }
    }

    function handleModelSliderChange() {
        const value = modelComplexitySlider.value;
        modelComplexityValue.textContent = value + 'B parameters';
        if (value > 500) {
            recommendationDiv.classList.remove('hidden');
        } else {
            recommendationDiv.classList.add('hidden');
        }
    }

    gpuPowerSlider.addEventListener('input', handleGPUSliderChange);
    modelComplexitySlider.addEventListener('input', handleModelSliderChange);

    // Contact button
    contactBtn.addEventListener('click', () => {
        contactInfo.classList.toggle('hidden');
    });

    // Load saved inputs (if needed)
    loadSavedInputs();
});

function loadSavedInputs() {
    chrome.storage.sync.get(['gpuPower', 'modelComplexity'], function(result) {
        if (result.gpuPower) {
            document.getElementById('gpu-power').value = result.gpuPower;
            document.getElementById('gpu-power-value').textContent = result.gpuPower + (result.gpuPower == 1 ? ' GPU' : ' GPUs');
        }
        if (result.modelComplexity) {
            document.getElementById('model-complexity').value = result.modelComplexity;
            document.getElementById('model-complexity-value').textContent = result.modelComplexity + 'B parameters';
        }
    });
}

// You can add a function to save inputs if needed
function saveInputs() {
    const gpuPower = document.getElementById('gpu-power').value;
    const modelComplexity = document.getElementById('model-complexity').value;

    chrome.storage.sync.set({
        gpuPower: gpuPower,
        modelComplexity: modelComplexity
    });
}