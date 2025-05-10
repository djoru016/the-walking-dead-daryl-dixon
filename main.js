 document.addEventListener('DOMContentLoaded', () => {
            // إخفاء شاشة التحميل
            setTimeout(() => {
                const loader = document.querySelector('.loader-container');
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 2000);
            
            // تفعيل القائمة للهواتف المحمولة
            const navSlide = () => {
                const burger = document.querySelector('.burger');
                const nav = document.querySelector('.nav-links');
                const navLinks = document.querySelectorAll('.nav-links li');
                
                burger.addEventListener('click', () => {
                    // تبديل القائمة
                    nav.classList.toggle('nav-active');
                    
                    // تحريك عناصر القائمة
                    navLinks.forEach((link, index) => {
                        if (link.style.animation) {
                            link.style.animation = '';
                        } else {
                            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                        }
                    });
                    
                    // تحريك أيقونة البرجر
                    burger.classList.toggle('toggle');
                });
            }
            
            navSlide();
            
            // تفعيل تأثيرات التمرير
            const faders = document.querySelectorAll('.fade-in');
            
            const appearOptions = {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px"
            };
            
            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    } else {
                        entry.target.classList.add('active');
                        appearOnScroll.unobserve(entry.target);
                    }
                });
            }, appearOptions);
            
            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
            
            // معرض الصور
            const galleryItems = document.querySelectorAll('.gallery-item');
            const modal = document.querySelector('.modal');
            const modalImg = document.querySelector('.modal-content');
            const closeModal = document.querySelector('.close-modal');
            
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const imgSrc = item.querySelector('img').src;
                    modalImg.src = imgSrc;
                    modal.classList.add('active');
                });
            });
            
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
            });
            
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
            
            // العد التنازلي
            const countdown = () => {
                const countDate = new Date('October 31, 2025 00:00:00').getTime();
                const now = new Date().getTime();
                const gap = countDate - now;
                
                // تحويل الوقت
                const second = 1000;
                const minute = second * 60;
                const hour = minute * 60;
                const day = hour * 24;
                
                // حساب الوقت المتبقي
                const textDay = Math.floor(gap / day);
                const textHour = Math.floor((gap % day) / hour);
                const textMinute = Math.floor((gap % hour) / minute);
                const textSecond = Math.floor((gap % minute) / second);
                
                // تحديث العناصر
                document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
                document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
                document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
                document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
            };
            
            setInterval(countdown, 1000);
            
            // عدادات السرفايفل
            const counters = document.querySelectorAll('#killCounter, #survivorCounter, #resourceCounter');
            
            const updateCount = (counter, target) => {
                const count = +counter.innerText;
                const increment = target / 200;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => updateCount(counter, target), 10);
                } else {
                    counter.innerText = target;
                }
            };
            
            const startCounting = () => {
                updateCount(document.getElementById('killCounter'), 2547);
                updateCount(document.getElementById('survivorCounter'), 1825);
                updateCount(document.getElementById('resourceCounter'), 3678);
            };
            
            // تفعيل البحث عن الشخصيات
            const characterSearch = document.getElementById('characterSearch');
            const searchBtn = document.getElementById('searchBtn');
            const characters = document.querySelectorAll('.character-card');
            
            const searchCharacters = () => {
                const searchTerm = characterSearch.value.toLowerCase();
                
                characters.forEach(character => {
                    const name = character.querySelector('h3').textContent.toLowerCase();
                    const info = character.querySelector('p').textContent.toLowerCase();
                    
                    if (name.includes(searchTerm) || info.includes(searchTerm)) {
                        character.style.display = 'block';
                    } else {
                        character.style.display = 'none';
                    }
                });
            };
            
            searchBtn.addEventListener('click', searchCharacters);
            characterSearch.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    searchCharacters();
                }
            });
            
            // تأثير الدم عند النقر
            document.body.addEventListener('click', (e) => {
                const blood = document.createElement('div');
                blood.className = 'blood-splatter';
                blood.style.left = (e.pageX - 50) + 'px';
                blood.style.top = (e.pageY - 50) + 'px';
                document.body.appendChild(blood);
                
                setTimeout(() => {
                    blood.classList.add('active');
                }, 10);
                
                setTimeout(() => {
                    blood.remove();
                }, 2000);
            });
            
            // تغيير الثيم
            const themeToggle = document.querySelector('.theme-toggle');
            let darkMode = true;
            
            themeToggle.addEventListener('click', () => {
                darkMode = !darkMode;
                
                if (darkMode) {
                    document.documentElement.style.setProperty('--dark-bg', '#121212');
                    document.documentElement.style.setProperty('--dirty-white', '#e0e0e0');
                } else {
                    document.documentElement.style.setProperty('--dark-bg', '#f5f5f5');
                    document.documentElement.style.setProperty('--dirty-white', '#333333');
                }
            });
            
            // تفعيل عدادات السرفايفل عند الوصول إلى قسم السرفايفل
            const survivalSection = document.getElementById('survival');
            
            const survivalObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCounting();
                        survivalObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            survivalObserver.observe(survivalSection);
        });