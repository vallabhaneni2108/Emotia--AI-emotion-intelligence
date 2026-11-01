
const textInput = document.getElementById("textInput");
const analyzeButton = document.getElementById("analyzeButton");
const clearButton = document.getElementById("clearButton");
const retryButton = document.getElementById("retryButton");

const charCount = document.getElementById("charCount");
const apiStatus = document.getElementById("apiStatus");

const emptyState = document.getElementById("emptyState");
const prediction = document.getElementById("prediction");
const errorState = document.getElementById("errorState");

const emotionName = document.getElementById("emotionName");
const emotionEmoji = document.getElementById("emotionEmoji");
const emotionDescription = document.getElementById("emotionDescription");

const confidenceValue = document.getElementById("confidenceValue");
const confidenceBar = document.getElementById("confidenceBar");

const probabilityList = document.getElementById("probabilityList");
const resultTimestamp = document.getElementById("resultTimestamp");

const toast = document.getElementById("toast");


/* EMOTION CONFIGURATION */

const emotions = {
    joy: {
        emoji: "😊",
        color: "#fbbf24",
        description: "A positive and uplifting emotional state."
    },

    sadness: {
        emoji: "🌧️",
        color: "#60a5fa",
        description: "A feeling of sadness or emotional heaviness."
    },

    love: {
        emoji: "💜",
        color: "#c084fc",
        description: "A feeling of affection, warmth, and connection."
    },

    anger: {
        emoji: "⚡",
        color: "#fb7185",
        description: "A feeling of frustration or strong displeasure."
    },

    fear: {
        emoji: "🌫️",
        color: "#a78bfa",
        description: "A feeling of worry, anxiety, or uncertainty."
    },

    surprise: {
        emoji: "✨",
        color: "#67e8f9",
        description: "A reaction to something unexpected."
    }
};


/* PARTICLE BACKGROUND */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame;

function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    createParticles();
}

function createParticles() {
    const count = Math.min(
        Math.floor(window.innerWidth / 12),
        100
    );

    particles = [];

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,

            radius: Math.random() * 1.5 + .3,

            speed: Math.random() * .25 + .08,

            alpha: Math.random() * .4 + .1,

            phase: Math.random() * Math.PI * 2
        });
    }
}

function animateParticles() {
    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    const time = Date.now() * .0005;

    particles.forEach(p => {
        p.y -= p.speed;

        p.x += Math.sin(time + p.phase) * .15;

        if (p.y < -5) {
            p.y = window.innerHeight + 5;
            p.x = Math.random() * window.innerWidth;
        }

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(167,139,250,${p.alpha})`;

        ctx.fill();
    });

    animationFrame = requestAnimationFrame(animateParticles);
}

resizeCanvas();

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animateParticles();
}

window.addEventListener("resize", resizeCanvas);


/* API STATUS */

async function checkAPI() {
    try {
        const response = await fetch("/health");

        if (!response.ok) {
            throw new Error("API unavailable");
        }

        const data = await response.json();

        apiStatus.textContent = data.model_loaded
            ? "AI ONLINE"
            : "MODEL LOADING";

        apiStatus.previousElementSibling.classList.toggle(
            "online",
            Boolean(data.model_loaded)
        );

        apiStatus.previousElementSibling.classList.toggle(
            "offline",
            !data.model_loaded
        );

    } catch (error) {
        apiStatus.textContent = "API OFFLINE";

        apiStatus.previousElementSibling.classList.add("offline");

        console.error("API health check:", error);
    }
}

checkAPI();


/* CHARACTER COUNTER */

function updateCounter() {
    const length = textInput.value.length;

    charCount.textContent = `${length} / 2000`;

    charCount.style.color =
        length > 1800 ? "#fb7185" : "";
}

textInput.addEventListener("input", updateCounter);


/* EXAMPLE BUTTONS */

document.querySelectorAll(".example-chip").forEach(button => {

    button.addEventListener("click", () => {

        textInput.value = button.dataset.text;

        updateCounter();

        textInput.focus();

        showToast("Example loaded ✦");

    });

});


/* CLEAR */

clearButton.addEventListener("click", () => {

    textInput.value = "";

    updateCounter();

    resetResult();

    textInput.focus();

});


function resetResult() {
    emptyState.style.display = "flex";

    prediction.classList.remove("show");

    errorState.classList.remove("show");

    confidenceBar.style.width = "0%";

    probabilityList.innerHTML = "";
}


/* LOADING */

function setLoading(loading) {

    analyzeButton.disabled = loading;

    analyzeButton.classList.toggle("loading", loading);

}


/* ANALYZE */

async function analyzeText() {

    const text = textInput.value.trim();

    if (!text) {
        showToast("Please enter some text first.");
        textInput.focus();
        return;
    }

    if (text.length > 2000) {
        showToast("Please keep your text under 2000 characters.");
        return;
    }

    setLoading(true);

    emptyState.style.display = "flex";

    prediction.classList.remove("show");

    errorState.classList.remove("show");

    try {

        const response = await fetch("/predict", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail || "Prediction failed."
            );
        }

        displayResult(data);

    } catch (error) {

        showError(error.message);

        console.error("Prediction error:", error);

    } finally {

        setLoading(false);

    }

}


/* DISPLAY RESULT */

function displayResult(data) {

    emptyState.style.display = "none";

    errorState.classList.remove("show");

    prediction.classList.add("show");

    const emotion = String(
        data.predicted_emotion || "unknown"
    ).toLowerCase();

    const config = emotions[emotion] || {
        emoji: "✦",
        color: "#a78bfa",
        description: "Your emotional insight."
    };

    emotionName.textContent =
        capitalize(emotion);

    emotionEmoji.textContent =
        config.emoji;

    emotionDescription.textContent =
        config.description;

    emotionEmoji.style.borderColor =
        `${config.color}55`;

    emotionEmoji.style.background =
        `${config.color}15`;

    emotionName.style.color =
        config.color;


    const confidence = normalizeConfidence(
        data.confidence
    );

    confidenceValue.textContent =
        `${confidence.toFixed(1)}%`;

    confidenceBar.style.width = "0%";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            confidenceBar.style.width =
                `${confidence}%`;
        });
    });


    /* SUPPORTS BOTH SPELLINGS */

    const probabilities =
        data.all_probabilites ||
        data.all_probabilities ||
        {};

    renderProbabilities(probabilities);


    resultTimestamp.textContent =
        "ANALYSIS COMPLETE";

    showToast("Emotion analysis complete ✦");

}


/* PROBABILITY BARS */

function renderProbabilities(probabilities) {

    probabilityList.innerHTML = "";

    const entries = Object.entries(probabilities);

    entries.sort((a, b) => {
        return Number(b[1]) - Number(a[1]);
    });

    entries.forEach(([name, value], index) => {

        const emotion = name.toLowerCase();

        const config = emotions[emotion] || {
            color: "#a78bfa"
        };

        const probability = normalizeConfidence(value);

        const row = document.createElement("div");

        row.className = "probability-row";

        row.style.setProperty(
            "--emotion-color",
            config.color
        );

        row.innerHTML = `
            <span class="probability-name">
                ${capitalize(emotion)}
            </span>

            <div class="probability-track">
                <div class="probability-fill"></div>
            </div>

            <span class="probability-value">
                ${probability.toFixed(1)}%
            </span>
        `;

        probabilityList.appendChild(row);

        const fill = row.querySelector(".probability-fill");

        setTimeout(() => {
            fill.style.width = `${probability}%`;
        }, 100 + index * 100);

    });

}


/* ERROR */

function showError(message) {

    emptyState.style.display = "none";

    prediction.classList.remove("show");

    errorState.classList.add("show");

    document.getElementById("errorMessage").textContent =
        message || "Unable to analyze your text.";

}


/* RETRY */

retryButton.addEventListener("click", analyzeText);


/* BUTTON */

analyzeButton.addEventListener("click", analyzeText);


/* ENTER KEY */

textInput.addEventListener("keydown", event => {

    if (
        event.key === "Enter" &&
        (event.ctrlKey || event.metaKey)
    ) {
        analyzeText();
    }

});


/* HELPERS */

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function normalizeConfidence(value) {

    let number = Number(value);

    if (!Number.isFinite(number)) {
        return 0;
    }

    // Supports confidence values in either 0–1 or 0–100 format.
    if (number <= 1) {
        number *= 100;
    }

    return Math.max(0, Math.min(number, 100));
}


/* TOAST */

let toastTimer;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}
