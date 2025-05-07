// Webinar Registration System Config
const CONFIG = {
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzmuctpf-wvcIimvSykxwCWu9yv0R4ustyJGhAUiL206ojcou6s8X-wdN1UJ6y9gPay/exec",
    WEBINAR_TITLE: "ألم الأعصاب السكري: أحدث طرق التشخيص والعلاج",
    WEBINAR_DATE: "15 يونيو 2025",
    WEBINAR_TIME: "7:00 مساءً بتوقيت كندا",
    WEBINAR_LINK: "https://zoom.us/j/123456789",
    COMPANY_NUMBER: "201200241817",
    COMPANY_EMAIL: "olaadel.967@gmail.com",
    WEBSITE_NAME: "موقع_الندوات_الطبية",

    COUNTRIES: [
        { code: "EG", name: "مصر", dialCode: "20", flag: "🇪🇬" },
        { code: "SA", name: "السعودية", dialCode: "966", flag: "🇸🇦" },
        { code: "AE", name: "الإمارات", dialCode: "971", flag: "🇦🇪" },
        { code: "KW", name: "الكويت", dialCode: "965", flag: "🇰🇼" },
        { code: "QA", name: "قطر", dialCode: "974", flag: "🇶🇦" }
    ]
};

const WHATSAPP_MESSAGE_TEMPLATE = `مرحباً {name}،

شكراً لتسجيلك في ندوتنا "${CONFIG.WEBINAR_TITLE}"

التفاصيل:
📅 التاريخ: ${CONFIG.WEBINAR_DATE}
⏰ الوقت: ${CONFIG.WEBINAR_TIME}
🔗 رابط الندوة: ${CONFIG.WEBINAR_LINK}

لأي استفسارات، لا تتردد في التواصل معنا.

مع تحيات،
فريق ${CONFIG.WEBINAR_TITLE}`;

// Global variables
let lastSubmissionTime = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initForm();
    initCountdown();
    initChat();
    initSwiper();
    
    // Show hidden countdown if exists
    const hiddenCountdown = document.querySelector('.countdown-timer[style="display: none;"]');
    if (hiddenCountdown) {
        hiddenCountdown.style.display = 'block';
    }
});

// Initialize Swiper
function initSwiper() {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });
}

// Initialize Chat
function initChat() {
    // تأثيرات صوتية
    const messageSound = document.getElementById('messageSound');
    const chatModal = document.getElementById('chatModal');
    const fixedChatBtn = document.getElementById('fixedChatBtn');
    const fixedWhatsappBtn = document.getElementById('fixedWhatsappBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const minimizeChatBtn = document.getElementById('minimizeChatBtn');

    // بيانات الأسئلة والأجوبة
    const faqData = {
        answer1: {
            question: "ما هي مدة الندوة؟",
            answer: "مدة الندوة ساعة واحدة كاملة، تتضمن:<br><br>" +
                "• 40 دقيقة عرض تقديمي مفصل<br>" +
                "• 20 دقيقة للأسئلة والأجوبة المباشرة<br><br>" +
                "وستحصل خلالها على معلومات قيمة تغنيك عن ساعات طويلة من البحث."
        },
        answer2: {
            question: "هل الندوة مجانية حقاً؟",
            answer: "نعم، الندوة مجانية بالكامل بدون أي تكاليف خفية.<br><br>" +
                "نقدمها كجزء من مسؤوليتنا المجتمعية لنشر الوعي الصحي.<br><br>" +
                "كل ما نطلبه هو مشاركتك الفعالة والاستفادة القصوى من المحتوى."
        },
        answer3: {
            question: "كيف يمكنني المشاركة في الندوة؟",
            answer: "خطوات المشاركة بسيطة:<br><br>" +
                "1. سجل بياناتك عبر النموذج الموجود بالصفحة<br>" +
                "2. سنرسل لك رابط الزووم على الواتساب قبل الندوة<br>" +
                "3. انضم بالرابط في الموعد المحدد<br><br>" +
                "سيتم إرسال تذكير قبل ساعة من البدء."
        },
        answer4: {
            question: "هل يمكنني الحصول على تسجيل للندوة؟",
            answer: "بالطبع!<br><br>" +
                "• سيتم إرسال تسجيل الندوة لجميع المسجلين<br>" +
                "• التسجيل متاح لمدة 7 أيام بعد الندوة<br>" +
                "• يمكنك طلب نسخة خاصة مقابل رسوم رمزية إذا أردت حفظها للأبد"
        }
    };

    // فتح الشات مع تأثير صوتي
    if (fixedChatBtn) {
        fixedChatBtn.addEventListener('click', function() {
            chatModal.classList.add('active');
            if (messageSound) messageSound.play();

            // إظهار مؤشر الكتابة لمحاكاة الشات الحقيقي
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) typingIndicator.classList.add('active');

            setTimeout(() => {
                if (typingIndicator) typingIndicator.classList.remove('active');
            }, 1500);
        });
    }

    // زر الواتساب
    if (fixedWhatsappBtn) {
        fixedWhatsappBtn.addEventListener('click', function() {
            window.location.href = 'https://wa.me/14039987830';
        });
    }

    // إغلاق الشات
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function() {
            chatModal.classList.remove('active');
        });
    }

    // تصغير الشات
    if (minimizeChatBtn) {
        minimizeChatBtn.addEventListener('click', function() {
            chatModal.classList.remove('active');
            setTimeout(() => {
                const badge = fixedChatBtn.querySelector('.notification-badge');
                if (badge) badge.style.display = 'flex';
            }, 300);
        });
    }

    // التعامل مع الأسئلة السريعة
    document.querySelectorAll('.quick-question').forEach(question => {
        question.addEventListener('click', function() {
            const answerId = this.getAttribute('data-answer');
            const faq = faqData[answerId];

            // إضافة السؤال كرسالة من المستخدم
            addMessage(faq.question, 'sent');

            // إظهار مؤشر الكتابة
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) typingIndicator.classList.add('active');

            // محاكاة وقت الكتابة
            setTimeout(() => {
                if (typingIndicator) typingIndicator.classList.remove('active');
                addMessage(faq.answer, 'received');
                if (messageSound) messageSound.play();
            }, 1500);
        });
    });

    // دالة لإضافة رسالة جديدة
    function addMessage(text, type) {
        const chatBody = document.querySelector('.chat-body');
        if (!chatBody) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${getCurrentTime()}</div>
            </div>
        `;

        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // دالة للحصول على الوقت الحالي
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'م' : 'ص';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    }

    setTimeout(() => {
        if (chatModal && !chatModal.classList.contains('active')) {
            const badge = fixedChatBtn.querySelector('.notification-badge');
            if (badge) badge.style.display = 'flex';
        }
    }, 30000);
}

// Countdown initialization
function initCountdown() {
    // Parse Arabic date from CONFIG
    const webinarDate = parseArabicDate(CONFIG.WEBINAR_DATE + " " + CONFIG.WEBINAR_TIME) || 
                       new Date('June 15, 2025 19:00:00 GMT-0400'); // Fallback for Canada time
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = webinarDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update all days elements
        document.querySelectorAll('.days').forEach(el => {
            el.textContent = days.toString().padStart(2, '0');
        });
        
        // Update all hours elements
        document.querySelectorAll('.hours').forEach(el => {
            el.textContent = hours.toString().padStart(2, '0');
        });
        
        // Update all minutes elements
        document.querySelectorAll('.minutes').forEach(el => {
            el.textContent = minutes.toString().padStart(2, '0');
        });
        
        // Update all seconds elements
        document.querySelectorAll('.seconds').forEach(el => {
            el.textContent = seconds.toString().padStart(2, '0');
        });

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelectorAll('.countdown-container, .countdown-timer').forEach(container => {
                container.innerHTML = `
                    <div class="ended-message">
                        <h3 class="font-bold">الندوة قد بدأت!</h3>
                        <p>يمكنك الانضمام الآن عبر الرابط التالي:</p>
                        <a href="${CONFIG.WEBINAR_LINK}" class="text-red-600 font-bold underline mt-2 inline-block">
                            انضم إلى الندوة
                        </a>
                    </div>
                `;
            });
        }
    }

    let countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}

// Function to parse Arabic date strings
function parseArabicDate(dateString) {
    const arabicMonths = {
        'يناير': 0, 'فبراير': 1, 'مارس': 2, 'أبريل': 3, 'مايو': 4, 'يونيو': 5,
        'يوليو': 6, 'أغسطس': 7, 'سبتمبر': 8, 'أكتوبر': 9, 'نوفمبر': 10, 'ديسمبر': 11
    };
    
    const timeParts = {
        'صباحاً': 'AM',
        'مساءً': 'PM'
    };
    
    try {
        const dateMatch = dateString.match(/(\d{1,2})\s+(\S+)\s+(\d{4})\s+(\d{1,2}):(\d{2})\s+(\S+)/);
        if (!dateMatch) return null;
        
        const [, day, arabicMonth, year, hour, minute, timePart] = dateMatch;
        const month = arabicMonths[arabicMonth];
        const ampm = timeParts[timePart] || 'AM';
        
        let hour24 = parseInt(hour);
        if (ampm === 'PM' && hour24 < 12) hour24 += 12;
        if (ampm === 'AM' && hour24 === 12) hour24 = 0;
        
        return new Date(year, month, day, hour24, minute, 0);
    } catch (e) {
        console.error("Error parsing Arabic date:", e);
        return null;
    }
}

// Form validation and submission
function initForm() {
    const form = document.getElementById('webinar-form');
    if (!form) {
        console.error('Form not found!');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(e).catch(error => {
            console.error('Form submission error:', error);
            alert(`حدث خطأ: ${error.message}`);
        });
    });

    document.getElementById('name')?.addEventListener('blur', validateName);
    document.getElementById('phone')?.addEventListener('blur', validatePhone);
    document.getElementById('country')?.addEventListener('change', validatePhone);
}

async function validateName() {
    const nameInput = document.getElementById('name');
    const errorElement = document.getElementById('name-error');
    const name = nameInput.value.trim();

    if (!name) {
        showError(errorElement, 'الاسم مطلوب');
        return false;
    }

    if (name.length < 3) {
        showError(errorElement, 'الاسم يجب أن يكون 3 أحرف على الأقل');
        return false;
    }

    hideError(errorElement);
    return true;
}

async function validatePhone() {
    const countrySelect = document.getElementById('country');
    const phoneInput = document.getElementById('phone');
    const errorElement = document.getElementById('phone-error');
    const countryCode = countrySelect.value;
    const phoneNumber = phoneInput.value.replace(/\D/g, '');

    let isValid = true;
    let errorMessage = '';

    if (!phoneNumber) {
        isValid = false;
        errorMessage = 'رقم الهاتف مطلوب';
    } else {
        switch (countryCode) {
            case 'EG':
                if (!/^(12|15|11|10)\d{8,9}$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = 'رقم مصر يجب أن يبدأ ب 11, 15, 12 أو 10 ويتكون من 10-11 رقم';
                }
                break;
            case 'SA':
            case 'AE':
                if (!/^5\d{8}$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = 'رقم الخليج يجب أن يبدأ ب 5 ويتكون من 9 أرقام';
                }
                break;
            case 'KW':
                if (!/^[569]\d{7}$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = 'رقم الكويت يجب أن يبدأ ب 5, 6 أو 9 ويتكون من 8 أرقام';
                }
                break;
            case 'QA':
                if (!/^[3-7]\d{7}$/.test(phoneNumber)) {
                    isValid = false;
                    errorMessage = 'رقم قطر يجب أن يبدأ ب 3-7 ويتكون من 8 أرقام';
                }
                break;
        }
    }

    if (isValid) {
        const selectedCountry = CONFIG.COUNTRIES.find(c => c.code === countryCode);
        document.getElementById('full-phone-number').value = `+${selectedCountry.dialCode}${phoneNumber}`;
        hideError(errorElement);
    } else {
        showError(errorElement, errorMessage);
    }

    return isValid;
}

function showError(element, message) {
    if (!element) return;
    element.textContent = message;
    element.classList.remove('hidden');
}

function hideError(element) {
    if (!element) return;
    element.classList.add('hidden');
}

async function handleFormSubmit(e) {
    const isNameValid = await validateName();
    const isPhoneValid = await validatePhone();

    if (!isNameValid || !isPhoneValid) {
        throw new Error('الرجاء تصحيح الأخطاء في النموذج');
    }

    const now = Date.now();
    if (now - lastSubmissionTime < 5000) {
        throw new Error('الرجاء الانتظار 5 ثواني بين كل محاولة');
    }
    lastSubmissionTime = now;

    const formData = getFormData();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<span class="loading"></span> جاري التسجيل...';

    try {
        const result = await submitToGoogleAppsScript(formData);
        
        if (result.status !== 'success') {
            throw new Error(result.message || 'فشل في التسجيل');
        }

        handleSuccess(formData);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

function getFormData() {
    const countrySelect = document.getElementById('country');
    const selectedCountry = CONFIG.COUNTRIES.find(c => c.code === countrySelect.value);
    const phoneInput = document.getElementById('phone').value.replace(/\D/g, '');

    return {
        name: document.getElementById('name').value.trim(),
        whatsapp: `+${selectedCountry.dialCode}${phoneInput}`,
        country: selectedCountry.name,
        website: CONFIG.WEBSITE_NAME
    };
}

async function submitToGoogleAppsScript(data) {
    try {
        const formData = new URLSearchParams();
        for (const key in data) {
            if (data[key]) formData.append(key, data[key]);
        }

        const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting to Google Apps Script:', error);
        return {
            status: 'error',
            message: error.message || 'فشل الاتصال بالخادم'
        };
    }
}

function handleSuccess(formData) {
    localStorage.setItem('webinarRegistration', JSON.stringify({
        name: formData.name,
        whatsapp: formData.whatsapp,
        webinarTitle: CONFIG.WEBINAR_TITLE,
        webinarDate: CONFIG.WEBINAR_DATE,
        webinarTime: CONFIG.WEBINAR_TIME,
        webinarLink: CONFIG.WEBINAR_LINK,
        expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)  
    }));

    // sendWhatsAppMessage(formData.whatsapp, formData.name);
    window.location.href = 'thankyou.html';
}

function sendWhatsAppMessage(number, name) {
    try {
        const message = WHATSAPP_MESSAGE_TEMPLATE
            .replace('{name}', name)
            .replace('{webinar_title}', CONFIG.WEBINAR_TITLE)
            .replace('{webinar_date}', CONFIG.WEBINAR_DATE)
            .replace('{webinar_time}', CONFIG.WEBINAR_TIME)
            .replace('{webinar_link}', CONFIG.WEBINAR_LINK);

        const cleanNumber = number.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.error('Failed to send WhatsApp message:', error);
    }
}