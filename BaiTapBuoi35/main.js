const { z } = window.Zod;

const registerSchema = z
    .object({
        firstName: z
            .string()
            .min(2, "Họ phải có ít nhất 2 ký tự"),
        lastName: z
            .string()
            .min(2, "Tên phải có ít nhất 2 ký tự"),
        email: z
            .string()
            .email("Email không đúng định dạng"),
        phone: z
            .string()
            .optional()
            .refine(
                (val) => !val || /^0\d{9}$/.test(val),
                "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số"
            ),
        role: z.enum(["dev", "design", "pm", "other"], {
            errorMap: () => ({ message: "Vui lòng chọn vai trò" }),
        }),
        password: z
            .string()
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
            .refine(
                (val) => /[a-zA-Z]/.test(val),
                "Mật khẩu phải chứa ít nhất 1 chữ cái"
            )
            .refine(
                (val) => /\d/.test(val),
                "Mật khẩu phải chứa ít nhất 1 chữ số"
            ),

        confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
        terms: z.literal(true, {
            errorMap: () => ({ message: "Bạn cần đồng ý với điều khoản" }),
        }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (confirmPassword && password !== confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                code: z.ZodIssueCode.custom,
                message: "Mật khẩu xác nhận không khớp",
            });
        }
    });


function showError(fieldId, errorMsgId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorMsgId);
    if (!field || !errorEl) return;

    field.classList.remove("is-success");
    field.classList.add("is-error");

    // Force animation restart
    void field.offsetWidth;

    errorEl.textContent = "⚠ " + message;
    errorEl.classList.add("show");
}

function showSuccess(fieldId, errorMsgId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorMsgId);
    if (!field) return;

    field.classList.remove("is-error");
    field.classList.add("is-success");

    if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("show");
    }
}

function clearField(fieldId, errorMsgId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorMsgId);
    if (field) {
        field.classList.remove("is-error", "is-success");
    }
    if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("show");
    }
}

function getFormData() {
    return {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim() || undefined,
        role: document.getElementById("role").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        terms: document.getElementById("terms").checked,
    };
}

const FIELD_MAP = [
    { field: "firstName",       error: "firstNameError" },
    { field: "lastName",        error: "lastNameError" },
    { field: "email",           error: "emailError" },
    { field: "phone",           error: "phoneError" },
    { field: "role",            error: "roleError" },
    { field: "password",        error: "passwordError" },
    { field: "confirmPassword", error: "confirmPasswordError" },
    { field: "terms",           error: "termsError" },
];

function applyValidationResult(result, touchedFields = null) {
    const fieldErrors = result.success
        ? {}
        : result.error.flatten().fieldErrors;

    FIELD_MAP.forEach(({ field, error }) => {
        if (touchedFields && !touchedFields.has(field)) return;

        if (fieldErrors[field] && fieldErrors[field].length > 0) {
            showError(field, error, fieldErrors[field][0]);
        } else {
            const el = document.getElementById(field);
            const hasValue = el
                ? el.type === "checkbox"
                    ? true
                    : el.value.trim() !== ""
                : false;

            if (hasValue) {
                showSuccess(field, error);
            } else {
                clearField(field, error);
            }
        }
    });
}


document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = getFormData();
    const result = registerSchema.safeParse(data);

    // Đánh dấu tất cả field đã được chạm
    const allFields = new Set(FIELD_MAP.map((f) => f.field));
    applyValidationResult(result, allFields);

    if (result.success) {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("successScreen").classList.add("show");
    }
});


const touchedFields = new Set();

FIELD_MAP.forEach(({ field }) => {
    const el = document.getElementById(field);
    if (!el) return;

    const eventType = el.type === "checkbox" ? "change" : "blur";

    el.addEventListener(eventType, () => {
        touchedFields.add(field);
        const data = getFormData();
        const result = registerSchema.safeParse(data);
        applyValidationResult(result, touchedFields);
    });
});


document.getElementById("togglePassword").addEventListener("click", () => {
    const pwInput = document.getElementById("password");
    const btn = document.getElementById("togglePassword");
    if (pwInput.type === "password") {
        pwInput.type = "text";
        btn.textContent = "🙈";
    } else {
        pwInput.type = "password";
        btn.textContent = "👁";
    }
});

document.getElementById("toggleConfirm").addEventListener("click", () => {
    const confirmInput = document.getElementById("confirmPassword");
    const btn = document.getElementById("toggleConfirm");
    if (confirmInput.type === "password") {
        confirmInput.type = "text";
        btn.textContent = "🙈";
    } else {
        confirmInput.type = "password";
        btn.textContent = "👁";
    }
});


const strengthLabels = ["", "Yếu", "Trung bình", "Khá mạnh", "Mạnh"];

document.getElementById("password").addEventListener("input", () => {
    const val = document.getElementById("password").value;
    const barsEl = document.getElementById("strengthBars");
    const labelEl = document.getElementById("strengthLabel");

    if (!val) {
        barsEl.removeAttribute("data-level");
        labelEl.textContent = "Độ mạnh mật khẩu";
        return;
    }

    let score = 0;
    if (val.length >= 8)            score++;
    if (/[A-Z]/.test(val))          score++;
    if (/\d/.test(val))             score++;
    if (/[^A-Za-z0-9]/.test(val))   score++;

    const level = Math.max(1, score);
    barsEl.setAttribute("data-level", level);
    labelEl.textContent = "Độ mạnh: " + strengthLabels[level];
});


document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("registerForm").reset();

    FIELD_MAP.forEach(({ field, error }) => clearField(field, error));

    const barsEl = document.getElementById("strengthBars");
    barsEl.removeAttribute("data-level");
    document.getElementById("strengthLabel").textContent = "Độ mạnh mật khẩu";

    document.getElementById("togglePassword").textContent = "👁";
    document.getElementById("toggleConfirm").textContent = "👁";
    document.getElementById("password").type = "password";
    document.getElementById("confirmPassword").type = "password";

    touchedFields.clear();

    document.getElementById("successScreen").classList.remove("show");
    document.getElementById("registerForm").style.display = "";
});

