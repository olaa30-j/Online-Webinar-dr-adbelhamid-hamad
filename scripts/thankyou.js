document.addEventListener('DOMContentLoaded', function() {
    // استرجاع بيانات التسجيل من localStorage
    const registrationData = JSON.parse(localStorage.getItem('webinarRegistration'));
    
    if (registrationData) {
        // عرض بيانات المستخدم
        displayRegistrationInfo(registrationData);
        
        // بدء تأثيرات الكتابة
        startTypingEffects();
        
        // التحقق من وقت الندوة
        checkWebinarTime(registrationData.webinarDate, registrationData.webinarTime);
    } else {
        // إذا لم توجد بيانات، توجيه المستخدم للصفحة الرئيسية
        window.location.href = 'index.html';
    }
});

function displayRegistrationInfo(data) {
    // عرض اسم المستخدم
    const userNameElement = document.createElement('span');
    userNameElement.className = 'user-name-highlight';
    userNameElement.textContent = data.name;
    document.getElementById('user-greeting').appendChild(userNameElement);
    
    // عرض تفاصيل الندوة
    document.getElementById('webinar-date').textContent = formatArabicDate(data.webinarDate);
    document.getElementById('webinar-time').textContent = data.webinarTime;
    
    // عرض معلومات الواتساب
    document.getElementById('whatsapp-number').textContent = data.whatsapp;
}