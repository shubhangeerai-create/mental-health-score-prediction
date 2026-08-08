// ==========================================
// FASTAPI URL
// ==========================================

const API_URL = "http://127.0.0.1:8000";


// ==========================================
// ELEMENTS
// ==========================================

const form = document.getElementById("predictionForm");

const submitButton =
    document.getElementById("submitButton");

const buttonText =
    document.getElementById("buttonText");

const loadingState =
    document.getElementById("loadingState");

const gaugeContainer =
    document.getElementById("gaugeContainer");

const gaugeProgress =
    document.getElementById("gaugeProgress");

const scoreValue =
    document.getElementById("scoreValue");

const signalLabel =
    document.getElementById("signalLabel");

const signalText =
    document.getElementById("signalText");

const resultTitle =
    document.getElementById("resultTitle");

const emptyResult =
    document.getElementById("emptyResult");

const apiError =
    document.getElementById("apiError");

const apiErrorText =
    document.getElementById("apiErrorText");


// ==========================================
// GAUGE
// ==========================================

const RADIUS = 105;

const CIRCUMFERENCE =
    2 * Math.PI * RADIUS;

gaugeProgress.style.strokeDasharray =
    CIRCUMFERENCE;

gaugeProgress.style.strokeDashoffset =
    CIRCUMFERENCE;


// ==========================================
// STRESS BUTTONS
// ==========================================

const stressButtons =
    document.querySelectorAll(
        "#stressButtons button"
    );


stressButtons.forEach(button => {

    button.addEventListener("click", () => {

        stressButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        document.getElementById(
            "stress_level"
        ).value = button.dataset.value;

        clearError("stress_level");

        updateInsights();
    });

});


// ==========================================
// ERROR FUNCTIONS
// ==========================================

function setError(field, message) {

    const element =
        document.getElementById(field);

    const error =
        document.getElementById(
            `${field}Error`
        );


    if (element) {

        const wrapper =
            element.closest(".input-box");

        if (wrapper) {
            wrapper.classList.add("input-error");
        }
    }


    if (error) {
        error.textContent = message;
    }
}


function clearError(field) {

    const element =
        document.getElementById(field);

    const error =
        document.getElementById(
            `${field}Error`
        );


    if (element) {

        const wrapper =
            element.closest(".input-box");

        if (wrapper) {
            wrapper.classList.remove("input-error");
        }
    }


    if (error) {
        error.textContent = "";
    }
}


function clearAllErrors() {

    const fields = [
        "age",
        "gender",
        "country",
        "academic_level",
        "most_used_platform",
        "purpose_of_use",
        "avg_daily_usage_hours",
        "daily_unlocks",
        "study_hours",
        "physical_activity_hours",
        "sleep_hours_per_night",
        "stress_level"
    ];


    fields.forEach(clearError);
}


// ==========================================
// VALIDATION
// ==========================================

function validateForm() {

    clearAllErrors();

    let valid = true;


    const requiredFields = [
        "age",
        "gender",
        "country",
        "academic_level",
        "most_used_platform",
        "purpose_of_use",
        "avg_daily_usage_hours",
        "daily_unlocks",
        "study_hours",
        "physical_activity_hours",
        "sleep_hours_per_night",
        "stress_level"
    ];


    requiredFields.forEach(field => {

        const element =
            document.getElementById(field);

        if (!element.value.trim()) {

            setError(
                field,
                "Please complete this field."
            );

            valid = false;
        }
    });


    // AGE

    const age =
        Number(
            document.getElementById("age").value
        );


    if (
        age &&
        (age < 10 || age > 100)
    ) {

        setError(
            "age",
            "Age must be between 10 and 100."
        );

        valid = false;
    }


    // HOURS

    const hourFields = [
        "avg_daily_usage_hours",
        "study_hours",
        "physical_activity_hours",
        "sleep_hours_per_night"
    ];


    hourFields.forEach(field => {

        const value =
            Number(
                document.getElementById(field).value
            );


        if (
            value < 0 ||
            value > 24
        ) {

            setError(
                field,
                "Value must be between 0 and 24."
            );

            valid = false;
        }
    });


    // DAILY UNLOCKS

    const unlocks =
        Number(
            document.getElementById(
                "daily_unlocks"
            ).value
        );


    if (
        unlocks < 0 ||
        !Number.isInteger(unlocks)
    ) {

        setError(
            "daily_unlocks",
            "Enter a valid whole number."
        );

        valid = false;
    }


    return valid;
}


// ==========================================
// GET FORM DATA
// ==========================================

function getFormData() {

    return {

        age: Number(
            document.getElementById("age").value
        ),

        gender:
            document.getElementById("gender").value,

        country:
            document.getElementById("country").value,

        academic_level:
            document.getElementById(
                "academic_level"
            ).value,

        most_used_platform:
            document.getElementById(
                "most_used_platform"
            ).value,

        purpose_of_use:
            document.getElementById(
                "purpose_of_use"
            ).value,

        avg_daily_usage_hours:
            Number(
                document.getElementById(
                    "avg_daily_usage_hours"
                ).value
            ),

        daily_unlocks:
            Number(
                document.getElementById(
                    "daily_unlocks"
                ).value
            ),

        study_hours:
            Number(
                document.getElementById(
                    "study_hours"
                ).value
            ),

        physical_activity_hours:
            Number(
                document.getElementById(
                    "physical_activity_hours"
                ).value
            ),

        sleep_hours_per_night:
            Number(
                document.getElementById(
                    "sleep_hours_per_night"
                ).value
            ),

        stress_level:
            document.getElementById(
                "stress_level"
            ).value

    };
}


// ==========================================
// LOADING
// ==========================================

function setLoading(isLoading) {

    submitButton.disabled = isLoading;


    if (isLoading) {

        submitButton.classList.add("loading");

        buttonText.textContent =
            "Reading the signal...";

        loadingState.classList.add("visible");

        gaugeContainer.style.display = "none";

        signalLabel.style.display = "none";

    } else {

        submitButton.classList.remove("loading");

        buttonText.textContent =
            "Read My Signal";

        loadingState.classList.remove("visible");

        gaugeContainer.style.display = "block";

        signalLabel.style.display = "flex";
    }
}


// ==========================================
// API ERROR
// ==========================================

function showApiError(message) {

    apiErrorText.textContent = message;

    apiError.classList.add("visible");
}


function hideApiError() {

    apiError.classList.remove("visible");
}


// ==========================================
// SIGNAL
// ==========================================

function getSignal(score) {

    if (score <= 3) {

        return {
            text: "Needs Attention",
            className: "attention"
        };
    }


    if (score <= 5) {

        return {
            text: "Low",
            className: "low"
        };
    }


    if (score <= 7) {

        return {
            text: "Moderate",
            className: "moderate"
        };
    }


    if (score <= 8.5) {

        return {
            text: "Strong",
            className: "strong"
        };
    }


    return {
        text: "Excellent",
        className: "excellent"
    };
}


// ==========================================
// ANIMATE SCORE
// ==========================================

function animateScore(target) {

    const duration = 1200;

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const current =
            target * eased;


        scoreValue.textContent =
            current.toFixed(2);


        const percentage =
            current / 10;


        gaugeProgress.style.strokeDashoffset =
            CIRCUMFERENCE *
            (1 - percentage);


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            scoreValue.textContent =
                target.toFixed(2);
        }
    }


    requestAnimationFrame(update);
}


// ==========================================
// DISPLAY RESULT
// ==========================================

function displayResult(score) {

    const signal =
        getSignal(score);


    emptyResult.style.display = "none";


    signalText.textContent =
        signal.text;


    signalLabel.className =
        `signal-label ${signal.className}`;


    if (score > 8.5) {

        resultTitle.textContent =
            "Your signal is looking excellent.";

    } else if (score > 7) {

        resultTitle.textContent =
            "Your signal is looking strong.";

    } else if (score > 5) {

        resultTitle.textContent =
            "Your signal is in a moderate range.";

    } else if (score > 3) {

        resultTitle.textContent =
            "Your signal is reading low.";

    } else {

        resultTitle.textContent =
            "Your signal may need attention.";
    }


    animateScore(score);
}


// ==========================================
// LIVE INSIGHTS
// ==========================================

function updateInsights() {

    const sleep =
        document.getElementById(
            "sleep_hours_per_night"
        ).value;


    const screen =
        document.getElementById(
            "avg_daily_usage_hours"
        ).value;


    const stress =
        document.getElementById(
            "stress_level"
        ).value;


    const activity =
        document.getElementById(
            "physical_activity_hours"
        ).value;


    document.getElementById(
        "sleepInsight"
    ).textContent =
        sleep
            ? `${sleep} hrs/night`
            : "—";


    document.getElementById(
        "screenInsight"
    ).textContent =
        screen
            ? `${screen} hrs/day`
            : "—";


    document.getElementById(
        "stressInsight"
    ).textContent =
        stress || "—";


    document.getElementById(
        "activityInsight"
    ).textContent =
        activity
            ? `${activity} hrs/day`
            : "—";
}


// ==========================================
// SUBMIT FORM
// ==========================================

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        hideApiError();


        // Validate

        if (!validateForm()) {
            return;
        }


        // Loading

        setLoading(true);


        resultTitle.textContent =
            "Reading your signal...";


        try {

            const formData =
                getFormData();


            console.log(
                "Sending to FastAPI:",
                formData
            );


            const response =
                await fetch(
                    `${API_URL}/predict`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                formData
                            )
                    }
                );


            let data;


            try {

                data =
                    await response.json();

            } catch {

                throw new Error(
                    "Could not read the response from FastAPI."
                );
            }


            // FastAPI / Pydantic error

            if (!response.ok) {

                let message =
                    "Prediction failed.";


                if (Array.isArray(data.detail)) {

                    message =
                        data.detail
                            .map(error => {

                                const field =
                                    error.loc
                                        ? error.loc[
                                            error.loc.length - 1
                                        ]
                                        : "";

                                return field
                                    ? `${field}: ${error.msg}`
                                    : error.msg;

                            })
                            .join(" | ");

                } else if (data.detail) {

                    message =
                        data.detail;
                }


                throw new Error(message);
            }


            // Get prediction

            const score =
                Number(
                    data.predicted_mental_health_score
                );


            if (!Number.isFinite(score)) {

                throw new Error(
                    "FastAPI returned an invalid prediction."
                );
            }


            console.log(
                "Prediction:",
                score
            );


            // Display

            displayResult(score);

        }

        catch (error) {

            console.error(
                "Prediction error:",
                error
            );


            resultTitle.textContent =
                "Prediction unavailable";


            showApiError(
                error.message ||
                "Cannot connect to FastAPI. Make sure uvicorn is running on port 8000."
            );

        }

        finally {

            setLoading(false);

        }

    }
);


// ==========================================
// CLEAR ERRORS WHEN USER CHANGES INPUT
// ==========================================

document
    .querySelectorAll(
        "#predictionForm input, #predictionForm select"
    )
    .forEach(element => {

        element.addEventListener(
            "input",
            () => {

                clearError(element.id);

                hideApiError();

                updateInsights();
            }
        );


        element.addEventListener(
            "change",
            () => {

                clearError(element.id);

                hideApiError();

                updateInsights();
            }
        );

    });


// ==========================================
// INITIAL
// ==========================================

updateInsights();