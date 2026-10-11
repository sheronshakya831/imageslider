const slider = document.getElementById("imageSlider");
const track = document.getElementById("sliderTrack");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const dotsContainer = document.getElementById("sliderDots");
const imageCounter = document.getElementById("imageCounter");

const originalSlides = Array.from(track.children);
const totalSlides = originalSlides.length;

let currentIndex = 1;
let isMoving = false;

// Add copies at both ends for seamless looping
const firstClone = originalSlides[0].cloneNode(true);
const lastClone = originalSlides[totalSlides - 1].cloneNode(true);

firstClone.setAttribute("aria-hidden", "true");
lastClone.setAttribute("aria-hidden", "true");

track.appendChild(firstClone);
track.insertBefore(lastClone, originalSlides[0]);

// Create one dot for each image
const dots = originalSlides.map((slide, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.setAttribute("aria-label", `Show image ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index + 1));

    dotsContainer.appendChild(dot);

    return dot;
});

if (totalSlides === 0) {
    console.warn("The image slider has no slides.");
} else {
    // Keep the rest of your slider code here.
}

function updateIndicators() {
    const actualIndex = (currentIndex - 1 + totalSlides) % totalSlides;

    dots.forEach((dot, index) => {
        const isActive = index === actualIndex;

        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
    });

    imageCounter.textContent =
        `${String(actualIndex + 1).padStart(2, "0")} / ` +
        `${String(totalSlides).padStart(2, "0")}`;
}

// Move the track to the selected slide
function updateSlider(animate = true) {
    track.style.transition = animate
        ? "transform 550ms ease-in-out"
        : "none";

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    updateIndicators();
}

function goToSlide(index) {
    if (isMoving || index === currentIndex) {
        return;
    }

    isMoving = true;
    currentIndex = index;
    updateSlider();
}

function showNext() {
    if (isMoving) {
        return;
    }

    isMoving = true;
    currentIndex++;
    updateSlider();
}

// Move to the previous image
function showPrevious() {
    if (isMoving) {
        return;
    }

    isMoving = true;
    currentIndex--;
    updateSlider();
}

nextButton.addEventListener("click", showNext);
previousButton.addEventListener("click", showPrevious);

track.addEventListener("transitionend", (event) => {
    if (event.target !== track || event.propertyName !== "transform") {
        return;
    }

    if (currentIndex === totalSlides + 1) {
        currentIndex = 1;
        updateSlider(false);
    } else if (currentIndex === 0) {
        currentIndex = totalSlides;
        updateSlider(false);
    }

    isMoving = false;
});

// Re-start from Image 1
updateSlider(false);