import React, { useState, createContext, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code, Plane, Mail, Phone, MapPin, Github, Linkedin, Instagram, Calendar, Award, Briefcase, GraduationCap, Lightbulb, ExternalLink, ChevronRight, Trophy, Users, BookOpen, FileText, Brain, Terminal, Cpu, Zap, Rocket, Camera } from 'lucide-react';

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

// Real Resume Data
const techieData = {
  about: "I'm Gaurav Rasane. A innovative and result-oriented Computer Engineer with a sound background in technology and full-stack development. A perennial top-performing student throughout all academic years and Advisor of E-Cell ZCOER, with national-level experience in IIT Bombay and IIT Madras. Enthusiastic about developing impactful tech solutions and mentoring innovative projects like the AI Agriculture Surveillance & Defence System and Zeal Startups.",
  education: {
    degree: "Bachelor of Engineering in Computer Engineering",
    university: "Savitribai Phule Pune University",
    sgpa: "9.57",
    period: "Nov 2022 - Ongoing",
    location: "Pune, Maharashtra, India",
    hsc: { score: "84.00%", year: "2022" },
    ssc: { score: "94.80%", year: "2020" }
  },
  skills: {
    technical: [
      { name: "Python", level: 90, icon: "🐍" },
      { name: "JavaScript", level: 85, icon: "⚡" },
      { name: "HTML & CSS", level: 90, icon: "🎨" },
      { name: "C++", level: 80, icon: "⚙️" },
      { name: "Java", level: 75, icon: "☕" },
      { name: "MySQL", level: 80, icon: "🗄️" },
      { name: "MongoDB", level: 75, icon: "🍃" },
      { name: "GitHub", level: 85, icon: "🔧" }
    ],
    research: ["Academic Research", "Technical Documentation", "Surveys", "MS Office"],
    nonTechnical: ["Problem Solving", "Communication", "Adaptability", "Time Management", "Leadership"]
  },
  projects: [
    {
      title: "AI Agriculture Surveillance & Defence System",
      description: "AI, IoT & YOLOv8 based application with Flask backend for real-time intruder detection and defence system.",
      tech: ["Python", "Scikit-Learn", "Flask", "JavaScript"],
      image: "/images/projects/agri.png",
      github: "https://github.com/gauravrasane14/Agriculture-Surveillance",
      live: "#"
    },
    {
      title: "Computer Department Website",
      description: "Professional departmental website with optimized performance",
      tech: ["HTML", "CSS", "JavaScript", "GitHub"],
      image: "/images/projects/deptweb.png",
      github: "https://github.com/gauravrasane14/compweb",
      live: "https://cszcoer.netlify.app/"
    },
    {
      title: "Zeal Startups Platform",
      description: "Centralized project showcase platform with responsive design",
      tech: ["HTML", "CSS", "JavaScript", "Canva"],
      image: "/images/projects/zealstartups.png",
      github: "https://github.com/gauravrasane14/zealstartups",
      live: "https://zealstartups.netlify.app/"
    }
  ],
  achievements: [
    { title: "Top 5 at IIT Bombay", desc: "National Entrepreneurship Challenge among 1000+ teams", color: "yellow" },
    { title: "IIT Madras Selection", desc: "Global Hyperloop Competition", color: "blue" },
    { title: "SGPA 9.57", desc: "Consistent Top Performer", color: "purple" },
    { title: "Subject Ranker", desc: "Engineering Physics & Chemistry", color: "green" }
  ],
  leadership: [
    { role: "Advisor", org: "E-Cell ZCOER" },
    { role: "Campus Ambassador", org: "E-Cell IIT Bombay" },
    { role: "NSS Coordinator", org: "NSS Unit ZCOER" }
  ]
};

const travelerData = {
  bio: "When I'm not coding, you'll find me exploring new destinations, immersing myself in different cultures. Travel fuels my creativity and broadens my perspective.",
  places: 60,
  states: 8,
  gallery: [
    { 
      id: 1, 
      location: "BaralachaLa Pass", 
      color: "from-orange-400 via-red-400 to-pink-500",
      photos: [
        { id: 1, title: "demo", image: "/images/travel/demo.webp", color: "from-orange-500 to-red-500" },
        { id: 2, title: "Marine Drive", image: "/images/travel/mumbai/marine-drive.jpg", color: "from-blue-500 to-cyan-500" },
        { id: 3, title: "Taj Hotel", image: "/images/travel/mumbai/taj-hotel.jpg", color: "from-yellow-500 to-orange-500" },
        { id: 4, title: "Colaba Market", image: "/images/travel/mumbai/colaba.jpg", color: "from-pink-500 to-purple-500" }
      ]
    },
    { 
      id: 2, 
      location: "Himachal", 
      color: "from-green-400 via-emerald-400 to-teal-500",
      photos: [
        { id: 1, title: "Sinhagad Fort", image: "/images/travel/pune/sinhagad.jpg", color: "from-green-500 to-emerald-500" },
        { id: 2, title: "Lonavala", image: "/images/travel/pune/lonavala.jpg", color: "from-teal-500 to-cyan-500" },
        { id: 3, title: "Khandala Ghats", image: "/images/travel/pune/khandala.jpg", color: "from-blue-500 to-green-500" },
        { id: 4, title: "Pawna Lake", image: "/images/travel/pune/pawna-lake.jpg", color: "from-cyan-500 to-blue-500" }
      ]
    },
    { 
      id: 3, 
      location: "Kedarnath", 
      color: "from-yellow-400 via-orange-400 to-red-500",
      photos: [
        { id: 1, title: "Amber Fort", image: "/images/travel/rajasthan/amber-fort.jpg", color: "from-yellow-500 to-orange-500" },
        { id: 2, title: "Hawa Mahal", image: "/images/travel/rajasthan/hawa-mahal.jpg", color: "from-pink-500 to-red-500" },
        { id: 3, title: "Jal Mahal", image: "/images/travel/rajasthan/jal-mahal.jpg", color: "from-blue-500 to-purple-500" },
        { id: 4, title: "City Palace", image: "/images/travel/rajasthan/city-palace.jpg", color: "from-orange-500 to-pink-500" }
      ]
    },
    { 
      id: 4, 
      location: "Goa", 
      color: "from-blue-400 via-cyan-400 to-teal-500",
      photos: [
        { id: 1, title: "Baga Beach", image: "/images/travel/goa/baga-beach.jpg", color: "from-cyan-500 to-blue-500" },
        { id: 2, title: "Fort Aguada", image: "/images/travel/goa/fort-aguada.jpg", color: "from-orange-500 to-red-500" },
        { id: 3, title: "Anjuna Flea Market", image: "/images/travel/goa/anjuna.jpg", color: "from-purple-500 to-pink-500" },
        { id: 4, title: "Dudhsagar Falls", image: "/images/travel/goa/dudhsagar.jpg", color: "from-green-500 to-teal-500" }
      ]
    },
    { 
      id: 5, 
      location: "Kalsubai Peak", 
      color: "from-red-400 via-pink-400 to-purple-500",
      photos: [
        { id: 1, title: "Kalsuaai Temple", image: "/images/travel/kalsubai/k1.jpg", color: "from-orange-500 to-red-500" },
        { id: 2, title: "Sunrise View", image: "/images/travel/kalsubai/k2.jpg", color: "from-red-500 to-pink-500" },
        { id: 3, title: "Midnight View", image: "/images/travel/kalsubai/k3.jpg", color: "from-yellow-500 to-orange-500" },
        { id: 4, title: "Alang-Manang View", image: "/images/travel/kalsubai/k4.jpg", color: "from-pink-500 to-purple-500" }
      ]
    },
    { 
      id: 6, 
      location: "IIT Madras", 
      color: "from-purple-400 via-indigo-400 to-blue-500",
      photos: [
        { id: 1, title: "IIT Madras", image: "/images/travel/iitm/iitm1.jpg", color: "from-green-500 to-emerald-500" },
        { id: 2, title: "IITM Entry Gate", image: "/images/travel/iitm/iitm2.jpg", color: "from-teal-500 to-cyan-500" },
        { id: 3, title: "Night Campus", image: "/images/travel/iitm/iitm3.jpg", color: "from-purple-500 to-indigo-500" },
        { id: 4, title: "Hostel Complex", image: "/images/travel/iitm/iitm4.jpg", color: "from-blue-500 to-purple-500" },
        { id: 5, title: "Open Ground", image: "/images/travel/iitm/iitm5.jpg", color: "from-blue-500 to-purple-500" }
      ]
    }
  ],
  posts: [
    {
      id: 2,
      title: "GOA Budget Trip",
      date: "Mar '25",
      category: "Unplanned Trip",
      coverImage: "/images/stories/goatrip.png",
      excerpt: "Experience about a unplanned GOA Trip!",
      readTime: "5 min read",
      content: `
      <h2>Unplanned Goa Trip Before Exams!</h2>
      <p>Sometimes the best trips are the ones you never plan. Just a few days before our exams, my friend and I had this random idea - “Let’s go to Goa.” Within a few hours, with budget of ₹1500 we packed our bags, grabbed a half-kilo packet of farsan, and set off on a journey that would become one of our most memorable adventures.
      <br /><br />From Pune to Mumbai:
      <br />The trip began from Pune. We caught a train to Mumbai for just ₹75 and started feeling like budget travel pros already. At CSMT Mumbai, we treated ourselves to the classic vadapav worth ₹25, which gave us the real Mumbai start we needed.
      <br /><br />The Overnight Journey to Goa:
      <br />That night, we boarded the Konkan Kanya Express from Mumbai. The rhythmic sound of the train and the cool breeze outside made it feel like a movie. By the next morning, we reached Madgaon Junction in Goa, with excitement higher than ever and still under budget.
      <br /><br />Exploring Goa on a Scooty:
      <br />From Madgaon, we rented a scooty for two days at ₹500 per day, which came to ₹250 per head. Fuel cost added another ₹300 per person, but it was worth every rupee. With our small backpacks, farsan packet, and unstoppable energy, we began exploring Goa’s endless charm.
      <br />We covered more than 10 beaches across both South and North Goa. South Goa surprised us with its calmness and natural beauty, while North Goa lit up with its lively nightlife and vibrant atmosphere. From peaceful sunsets at Palolem to crowded lanes of Baga, we saw it all, laughed endlessly, and lived in the moment.
      <br /><br />Living on Farsan and Budget Meals:
      <br />Food was simple and affordable. One decent meal cost us around ₹150 per head, and our farsan packet became our savior during long afternoons when we were too busy exploring to stop for lunch. That farsan became legendary for us by the end of the trip!
      <br /><br />The Beautiful Return Journey:
      <br />For our return, we took the Goa–Delhi Express via Belagavi. The journey turned magical when we passed through Dudhsagar Waterfall, visible right from the train window. The sound of the waterfall, the mist in the air, and the greenery around made it feel like a perfect ending to our spontaneous adventure. The ticket cost only ₹190, and the view was priceless.
      <br /><br />Memories for a Lifetime:
      <br />With just ₹1500 and one farsan packet, we experienced an unforgettable Goa trip filled with laughter, scenic beauty, and the joy of unplanned adventures. It taught us that you don’t need a big budget to create big memories, you just need a little madness and a lot of curiosity.
      <br />Goa wasn’t just a destination; it became a reminder that the best moments in life often come without plans.</p>
    `
    },
    {
      id: 4,
      title: "A Divine Journey to Tirupati - Sri Venkateswara Balaji",
      date: "Jan '25",
      category: "Divine Journey",
      coverImage: "/images/stories/tirupati.png",
      excerpt: "The spiritual and divine experiences that touch your soul!",
      readTime: "7 min read",
      content: `
      <h2>A Divine Journey to Tirupati — The Abode of Sri Venkateswara Balaji</h2>
      <p>Some journeys are not just trips - they’re spiritual experiences that touch your soul. My recent visit to Tirupati, the sacred abode of Sri Venkateswara Balaji, was one such divine experience that left me with immense peace, positivity, and gratitude.
      <br /><br />Journey with Friends to the Holy Hills
      <br />This trip was special - not just because of the destination, but also because I went with my close group of friends. Together, we traveled to Tirupati, a place known for its divinity, devotion, and the magnetic presence of Lord Balaji. The moment we reached, there was an unmistakable spiritual aura in the air - a calmness that instantly made us feel connected to something higher.
      <br /><br />The Divine Darshan at Tirumala
      <br />The Tirumala Tirupati Devasthanam (TTD) is not just a temple - it’s an experience that every devotee cherishes forever. Climbing the sacred steps, chanting “Govinda! Govinda!,” and finally standing before the magnificent idol of Lord Sri Venkateswara Balaji was beyond words.
      <br />It was a moment of pure devotion and peace, where everything else faded away. The positive energy inside the sanctum felt powerful, something that could only be experienced, not described.
      <br /><br />Comfortable Stay & Divine Prasadam
      <br />We were fortunate to get a comfortable accommodation provided by TTD - clean, peaceful, and close to the temple premises. Everything about the place radiated discipline and devotion.
      <br />The Annaprasadam served at the temple was equally divine - a traditional South Indian meal served on banana leaves, simple yet fulfilling. The flavors, the hospitality, and the sense of equality while dining with fellow devotees made the experience unforgettable.
      <br /><br />Exploring the Sacred Surroundings
      <br />Our journey didn’t end at Tirumala; we took the opportunity to explore several spiritual and natural treasures around Tirupati. Each place carried its own significance and offered a unique divine experience:
      <br />Padmavati Ammavari Temple (Alamelu Mangapuram): Dedicated to Goddess Padmavati, consort of Lord Venkateswara, this temple is a must-visit before heading to Tirumala. The calm atmosphere and traditional rituals make it an essential part of the Tirupati pilgrimage.
      <br />Japali Theertham: Nestled within dense forests, this ancient temple of Lord Hanuman is believed to be the spot where he met Lord Rama. The serene forest trail and peaceful surroundings make it ideal for meditation and reflection.
      <br />Silathoranam: A natural rock arch formation, believed to symbolize the celestial gateway of Lord Venkateswara. It’s one of the most unique geological structures in India and a great place to witness nature’s creativity.
      <br />Akasaganga Theertham: A sacred waterfall flowing from the Tirumala hills. Devotees believe its waters are used in temple rituals. The sight and sound of the falling water amidst the forest create a deeply refreshing and spiritual atmosphere.
      <br />Srivari Paadaalu: Known as the place where Lord Venkateswara first set foot on earth, this hilltop offers breathtaking panoramic views of the Tirumala valley. Standing there, surrounded by clouds and calm winds, feels like standing at the doorstep of heaven.
      <br />Srikalahasti Temple: A short drive from Tirupati, this magnificent temple dedicated to Lord Shiva is known as the Kashi of the South. Its powerful energy and intricate architecture make it a must-visit for every pilgrim.
      <br />Sripuram Golden Temple (Vellore): On our way back, we also visited this stunning gold-plated temple dedicated to Goddess Mahalakshmi. The temple complex glows in sunlight, and its divine aura, combined with the golden beauty, makes it an unforgettable stop on the journey.
      <br /><br />A Journey of Peace and Positivity
      <br />From start to end, the Tirupati trip was filled with moments of faith, laughter, and divine energy. Whether it was the echoing chants at the temple, the peaceful stay, the delicious prasadam, or the scenic surroundings - every bit of it added to the experience of inner peace.
      <br />As we returned home, all of us carried a sense of spiritual fulfillment and positivity that words can hardly capture. Truly, a visit to Sri Venkateswara Balaji at Tirupati is not just a trip — it’s a divine calling that stays in your heart forever.</p>
    `
    },
    {
      id: 6,
      title: "The Timeless Vibe of Banaras - City of Ghats, Gods & Ganga",
      date: "Jan '25",
      category: "Divine Journey",
      coverImage: "/images/stories/banaras.png",
      excerpt: "Banaras (Varanasi), a city that feels alive with divinity!",
      readTime: "5 min read",
      content: `
      <p>Some cities are just places on the map - and then there’s Banaras (Varanasi), a city that feels alive with divinity. My journey to this ancient city was a deep dive into spirituality, history, culture, and flavor - all wrapped into one unforgettable experience.
      <br /><br />Exploring the 84 Ghats - The Soul of Banaras:
      <br />We began our exploration early in the morning, walking along the 84 ghats of the Ganga. Each ghat had its own rhythm — saints meditating, pilgrims bathing, boats gently floating, and the fragrance of incense mingling with the misty morning air.
      <br />From the lively Assi Ghat to the sacred Dashashwamedh Ghat, and the hauntingly peaceful Manikarnika Ghat, every step along the riverbank felt like walking through centuries of devotion and stories.
      <br />The Sacred Darshan of Kashi Vishwanath
      <br />No trip to Banaras is complete without visiting the Kashi Vishwanath Temple - one of the twelve Jyotirlingas of Lord Shiva. The moment I entered the temple, surrounded by chants of “Har Har Mahadev!”, I felt a surge of divine energy that words can hardly capture.
      <br />The temple’s golden dome glistened under the sunlight, and the atmosphere was filled with devotion and reverence. It truly felt like the beating heart of Banaras.
      <br /><br />Boat Ride on the Ganga:
      <br />As evening approached, we took a boat ride on the Ganga, gliding past the ancient ghats as the sun began to set. The view from the water was surreal - old palaces, flickering lamps, and the golden reflection of the sky dancing on the river’s surface.
      <br />The boat ride was more than sightseeing - it was an experience of tranquility and timelessness, where the river seemed to whisper the stories of countless generations.
      <br /><br />Silence at Manikarnika Ghat:
      <br />Among all the ghats, Manikarnika Ghat stood out in silence. It is where life and death meet - a place of deep spiritual meaning. Watching the eternal flames, I felt a strange calmness; it wasn’t sorrowful, but peaceful - as if reminding us of the cycle of life, where every end is also a beginning.
      <br />The silence of that moment said more than a thousand words ever could.
      <br /><br />Evening Ganga Aarti at Dashashwamedh Ghat:
      <br />As night descended, the city transformed. We gathered at Dashashwamedh Ghat for the evening Ganga Aarti - one of the most mesmerizing sights I’ve ever witnessed.
      <br />The rhythmic chants, the synchronized movements of priests holding flaming lamps, the ringing of bells, and the reflection of fire on the river - it was pure magic. The atmosphere was electric yet peaceful, filled with divine vibration and spiritual warmth.
      <br /><br />The Flavors of Banaras - A Food Lover’s Heaven
      <br />Banaras is not just about temples and ghats - it’s also a food paradise! We roamed through the narrow gallis of Banaras, trying every local delicacy we could find - chaat, malaiyo, rabadi, jalebi, sweets, and the famous Banarasi lassi served in clay cups.
      <br />Every bite carried the flavor of tradition and love. The crowded lanes, laughter of vendors, and aroma of freshly made snacks created an energy that only Banaras can offer.
      <br /><br />The Vibe That Stays With You:
      <br />Banaras isn’t just a city - it’s a feeling. A blend of spirituality, simplicity, chaos, and peace. From the divine presence of Kashi Vishwanath, the eternal flames of Manikarnika, to the vibrant evenings by the Ganga Aarti, every moment felt alive and eternal.
      <br /><br />It’s a place where time pauses, where life feels sacred, and where every traveler leaves with a piece of peace.
      <br /><br />Truly, Banaras is not just visited - it’s experienced. 💫
</p>
    `
    },
    {
      id: 3,
      title: "A Thrilling Night at Kalsubai Shikhar",
      date: "Dec '24",
      category: "Thrilling Trek",
      coverImage: "/images/stories/kalsubai.png",
      excerpt: "My night at Kalsubai Peak, the highest point in Maharashtra (5,400 ft)",
      readTime: "5 min read",
      content: `
      <h2>A Thrilling Night at Maharashtra’s Highest Peak - Kalsubai Shikhar</h2>
      <p>Trekking has always been about chasing experiences - and my night at Kalsubai Peak, the highest point in Maharashtra (5,400 ft), was truly one of a kind. This wasn’t just another hike; it was a journey into stillness, stars, and solitude.
      <br /><br />Journey from Pune to Bari Village
      <br />The adventure began early from Pune, catching a local train to Kalyan and then another towards Kasara. The rhythmic sound of the local train, fading city lights, and the growing silence hinted at the mountain calling. From Kasara, I hopped onto a State Transport (ST) bus heading toward Bari Village, the base point for the Kalsubai trek.
      <br />By the time I reached Bari, the air had already turned crisp and cool - a perfect prelude to the climb that awaited.
      <br /><br />The Ascent - Into the Twilight
      <br />At 4:00 PM, I began my trek. The initial path was gentle, with lush greenery around and the setting sun painting everything in warm hues. But as dusk deepened, the climb grew steeper, and silence slowly took over the forest trail.
      <br />By the time I reached the top at 8:30 PM, darkness had fully embraced the peak. The temperature had dropped, and a gentle wind whispered through the night - it was both chilling and enchanting.
      <br /><br />Camping Alone at the Top
      <br />There was no one else around. No lights. No network. No sound - except the occasional rustle of the wind and my own heartbeat. My tent stood alone under the vast night sky, lit only by the moonlight and stars scattered like diamonds.
      <br />Looking down, the faint glimmer of distant city lights reminded me how far I was from everything - and how beautiful that felt. The moon hung bright, bathing the peak in a silver glow, while the chilly air carried the scent of wilderness.
      <br />It was a night of complete disconnect - yet total connection with nature.
      <br /><br />Sunrise from the Summit
      <br />As dawn approached, a soft orange hue began to bloom on the horizon. The sunrise from Kalsubai was pure magic - the clouds below glowing golden, the mountain peaks slowly emerging from the mist. I sat there, sipping on warm tea, soaking in every second of that peaceful moment.
      <br />The view was breathtaking, the experience soul-refreshing.
      <br /><br />The Descent and Reflection
      <br />After spending some time admiring the morning beauty, I began the descent back to Bari village. The return was smooth, with sunlight revealing the trail I had conquered in darkness.
      <br />That trek wasn’t just about reaching the top - it was about embracing solitude, feeling alive amidst silence, and realizing how nature can both humble and heal you.
      <br /><br />Final Thoughts
      <br />If you ever wish to experience a thrilling, peaceful, and unforgettable escape, pack your backpack and head toward Kalsubai Peak. Spend a night under the stars, away from networks and noise - and you’ll discover something rare: the beauty of absolute stillness.</p>
    `
    },
    {
      id: 5,
      title: "A Solo Journey Through Konkan - Aarware, Ratnagiri & Ganpatipule",
      date: "Sept '24",
      category: "Solo Travel",
      coverImage: "/images/stories/aareware.png",
      excerpt: "My solo trip to Konkan, covering Ratnagiri, Aarware, and Ganpatipule.",
      readTime: "5 min read",
      content: `
      <h2>A Solo Journey Through Konkan - Aarware, Ratnagiri & Ganpatipule</h2>
      <p>Sometimes, the best journeys are those taken alone - where every moment becomes a conversation between you and nature. My solo trip to Konkan, covering Ratnagiri, Aarware, and Ganpatipule, turned out to be a peaceful escape into the heart of coastal Maharashtra - full of greenery, sea breeze, and soulful moments.
      <br/><br/>The Coastal Road Begins - Pune to Ratnagiri via Kolhapur
      <br/>I started my journey by catching a State Transport (ST) bus from Pune, heading towards Ratnagiri via Kolhapur. The long coastal route, with winding ghats and glimpses of the Western Ghats, set the perfect tone for what lay ahead.
      <br/>The roads were calm, the air fresh, and the views - breathtaking. As the bus rolled through small villages and coconut-laden landscapes, I could already feel the charm of Konkan embracing me.
      <br/><br/>Exploring Ratnagiri - A Coastal Gem
      <br/>Ratnagiri welcomed me with its serene beaches, calm atmosphere, and authentic coastal vibe. Walking along the shores, I came across something rare - an abandoned ship stranded near the coast. Its silent presence against the vast Arabian Sea was both haunting and fascinating, as if holding stories from another time.
      <br/>Ratnagiri’s coastal beauty, mixed with its slow-paced life, made me realize how peaceful simplicity can be.
      <br/>Through Aarware - The Hidden Paradise of Konkan
      <br/>From Ratnagiri, I boarded another ST bus towards Ganpatipule, taking the scenic route via Aare Ware. The stretch between Aare and Ware beaches is one of the most beautiful coastal drives in Maharashtra - lush green hills on one side and the endless blue sea on the other.
      <br/>I stopped at Aare Ware Beach, and for a while, it felt like time stood still. The sound of waves, golden sand, and untouched beauty of the place made it one of the most peaceful moments of the trip. Standing there alone, watching the sunset melt into the sea, was nothing short of magical.
      <br/><br/>Ganpatipule - The Divine Coastal Town
      <br/>Reaching Ganpatipule, the first thing I did was take darshan of Lord Ganpati Bappa at the famous Swayambhu Ganpati Temple. The temple, situated right beside the beach, holds immense spiritual energy. Listening to the waves while offering prayers felt like connecting with nature and divinity at once.
      <br/>After the darshan, I spent time exploring Ganpatipule Beach, known for its clean sands and peaceful aura. Unlike commercial beaches, Ganpatipule still holds its traditional Konkan charm - quiet, pure, and soul-refreshing.
      <br/><br/>Prachin Konkan - A Journey into the Past
      <br/>Before returning, I visited the Prachin Konkan Museum, a unique open-air museum that beautifully showcases the traditional Konkan lifestyle, culture, and history. Walking through life-sized models of old Konkan homes, markets, and occupations gave me a deep appreciation for the region’s heritage.
      <br/>The entire environment was natural, green, and full of life - coconut trees swaying with the sea breeze, the earthy smell of soil after a drizzle, and the endless sound of waves in the distance.
      <br/><br/>Reflections of a Solo Traveller
      <br/>This solo journey through Ratnagiri, Aarware, and Ganpatipule wasn’t just about places - it was about finding peace in simplicity. The lush greenery, the sound of the sea, and the divine presence of Ganpati Bappa made it an unforgettable experience.
      <br/><br/>Traveling alone gave me the chance to slow down, reflect, and truly connect with the world around me. Konkan, with its untouched beauty and warm soul, reminded me that sometimes, solitude is the best companion.</p>
    `
    },
    {
      id: 1,
      title: "IIT Bombay Experience",
      date: "Jan '25",
      category: "Hackathon",
      coverImage: "/images/stories/iitb.png",
      excerpt: "Representing ECell team at National Entrepreneurship Challenge IIT Bombay...",
      readTime: "2 min read",
      content: `
      <h2>My IIT Bombay Experience</h2>
      <p>It was an unforgettable journey to IIT Bombay, one of the most inspiring places I’ve ever been to. Our team had qualified for the National Entrepreneurship Challenge (NEC) finals, and we proudly secured All India Rank 5 among more than 650 teams. Alongside this, I was also selected as the Campus Ambassador, achieving a spot in the Top 10 Campus Ambassadors across the nation, a truly proud moment.
      <br />We stayed in Hostel 17, which soon became our little home for those memorable days. The H17 Mess served as our go-to place for food, laughter, and random late-night discussions. During the day, we explored the sprawling IIT Bombay campus, from the Lecture Hall Complex to the Open Air Theatre, every corner had its own vibe.
      <br />One evening, after all the sessions and presentations, our team took a walk to the serene Powai Lake, just beside the campus. The calm water reflected the glittering lights of the city, and we talked for hours about our dreams, startups, and the journey ahead. That night became one of the most peaceful yet motivating moments of the entire trip.
      <br />As the days passed, IIT Bombay felt less like a campus and more like a world full of innovation, ideas, and friendships. The experience not only gave us recognition but also strengthened our belief in what teamwork and passion can achieve.
      <br />When we finally packed our bags to leave Hostel 17, it wasn’t just memories we carried, it was inspiration, confidence, and a drive to keep building and achieving more.</p>
    `
    }
  ]
};

// Animated Grid Background
const GridBackground = ({ mode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${mode === 'techie' ? '#3b82f6' : '#f97316'} 1px, transparent 1px), linear-gradient(90deg, ${mode === 'techie' ? '#3b82f6' : '#f97316'} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
};

// Floating Particles
const FloatingParticles = ({ mode }) => {
  const particles = Array.from({ length: 20 });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${mode === 'techie' ? 'bg-blue-500' : 'bg-orange-500'}`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Welcome Screen
const WelcomeScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            GaRa
          </div>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.p
          className="text-2xl text-white/90 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Gaurav Y. Rasane
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-2 text-blue-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Terminal size={20} />
          <span>Initializing...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Header with Toggle
const Header = () => {
  const { mode, setMode, theme, setTheme, menuOpen, setMenuOpen } = useAppContext();

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b ${
        theme === 'dark' 
          ? mode === 'techie' 
            ? 'bg-black/80 border-blue-500/30' 
            : 'bg-black/80 border-orange-500/30'
          : mode === 'techie'
            ? 'bg-white/80 border-blue-500/30'
            : 'bg-white/80 border-orange-500/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              GaRa
            </div>
            <motion.div
              className={`absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-opacity ${
                mode === 'techie' ? 'bg-blue-500/30' : 'bg-orange-500/30'
              }`}
            />
          </motion.div>

          {/* Main Toggle Switch */}
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border ${
            theme === 'dark'
              ? mode === 'techie'
                ? 'bg-blue-500/10 border-blue-500/30'
                : 'bg-orange-500/10 border-orange-500/30'
              : mode === 'techie'
                ? 'bg-blue-50 border-blue-300'
                : 'bg-orange-50 border-orange-300'
          }`}>
            <motion.button
              onClick={() => setMode('techie')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                mode === 'techie'
                  ? theme === 'dark'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-blue-500 text-white'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code size={18} />
              <span className="hidden sm:inline">Techie Gaurav</span>
            </motion.button>

            <div className={`w-px h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />

            <motion.button
              onClick={() => setMode('traveler')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
                mode === 'traveler'
                  ? theme === 'dark'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-orange-500 text-white'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plane size={18} />
              <span className="hidden sm:inline">Traveler Gaurav</span>
            </motion.button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-3 rounded-full backdrop-blur-xl border ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-yellow-400'
                  : 'bg-black/5 border-black/10 text-gray-700'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-3 rounded-full backdrop-blur-xl border ${
                theme === 'dark'
                  ? mode === 'techie'
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                    : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                  : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

// Sidebar with Neon Effect
const Sidebar = () => {
  const { mode, theme, menuOpen, setMenuOpen } = useAppContext();

  const techieItems = [
    { id: 'hero', label: 'Home', icon: <Rocket size={20} /> },
    { id: 'about', label: 'About', icon: <Lightbulb size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Cpu size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={20} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
  ];

  const travelerItems = [
    { id: 'hero', label: 'Home', icon: <Rocket size={20} /> },
    { id: 'about', label: 'About', icon: <Lightbulb size={20} /> },
    { id: 'projects', label: 'Gallery', icon: <Plane size={20} /> },
    { id: 'stories', label: 'Stories', icon: <Calendar size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
  ];

  const items = mode === 'techie' ? techieItems : travelerItems;

  return (
    <motion.aside
      className={`fixed left-0 top-20 bottom-0 w-64 backdrop-blur-xl border-r z-30 ${
        menuOpen ? 'block' : 'hidden'
      } lg:block ${
        theme === 'dark'
          ? mode === 'techie'
            ? 'bg-black/80 border-blue-500/20'
            : 'bg-black/80 border-orange-500/20'
          : mode === 'techie'
            ? 'bg-white/80 border-blue-300'
            : 'bg-white/80 border-orange-300'
      } overflow-y-auto`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <nav className="p-4 space-y-2">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => {
              setMenuOpen(false);
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 10 }}
          >
            <motion.div
              className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                mode === 'techie'
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                  : 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
              }`}
            />
            <span className="relative z-10">{item.icon}</span>
            <span className="relative z-10">{item.label}</span>
            <motion.div
              className={`absolute right-4 w-1 h-1 rounded-full ${
                mode === 'techie' ? 'bg-blue-500' : 'bg-orange-500'
              } opacity-0 group-hover:opacity-100`}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
};

// Hero Section
const HeroSection = () => {
  const { mode, theme } = useAppContext();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={`text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r ${
              mode === 'techie'
                ? 'from-blue-500 via-purple-500 to-pink-500'
                : 'from-orange-500 via-pink-500 to-purple-500'
            } bg-clip-text text-transparent`}
            animate={{
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            GAURAV
          </motion.div>

          <motion.h2
            className={`text-2xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {mode === 'techie' ? (
              <>Computer Engineer <Cpu className="inline" size={32} /> Full-Stack Developer</>
            ) : (
              <>Culture Explorer <Plane className="inline" size={32} /> Travel Enthusiast</>
            )}
          </motion.h2>

          <motion.p
            className={`text-lg md:text-xl mb-8 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {mode === 'techie'
              ? 'Software Developer • AI/ML Enthusiast • Cloud'
              : '60+ Places Explored • 8+ States • Infinite Memories'}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-4 rounded-full font-bold text-white backdrop-blur-xl relative overflow-hidden group ${
                mode === 'techie'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gradient-to-r from-orange-500 to-pink-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            <motion.a
              href="#projects"
              className={`px-8 py-4 rounded-full font-bold backdrop-blur-xl border-2 ${
                theme === 'dark'
                  ? mode === 'techie'
                    ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10'
                    : 'border-orange-500 text-orange-400 hover:bg-orange-500/10'
                  : mode === 'techie'
                    ? 'border-blue-500 text-blue-600 hover:bg-blue-50'
                    : 'border-orange-500 text-orange-600 hover:bg-orange-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mode === 'techie' ? 'View Projects' : 'Explore Gallery'}
            </motion.a>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {mode === 'techie' ? (
              <>
                <StatCard icon={<Code />} value="8+" label="Projects" color={mode} theme={theme} />
                <StatCard icon={<Award />} value="10+" label="Technologies" color={mode} theme={theme} />
                <StatCard icon={<Trophy />} value="9.57" label="SGPA" color={mode} theme={theme} />
              </>
            ) : (
              <>
                <StatCard icon={<MapPin />} value="15+" label="Places" color={mode} theme={theme} />
                <StatCard icon={<Plane />} value="8+" label="States" color={mode} theme={theme} />
                <StatCard icon={<Calendar />} value="Infinite" label="Stories" color={mode} theme={theme} />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, value, label, color, theme }) => (
  <motion.div
    className={`p-6 rounded-2xl backdrop-blur-xl border ${
      theme === 'dark'
        ? color === 'techie'
          ? 'bg-blue-500/10 border-blue-500/30'
          : 'bg-orange-500/10 border-orange-500/30'
        : color === 'techie'
          ? 'bg-blue-50 border-blue-300'
          : 'bg-orange-50 border-orange-300'
    }`}
    whileHover={{ y: -5, scale: 1.05 }}
  >
    <div className={`${color === 'techie' ? 'text-blue-500' : 'text-orange-500'} mb-2`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className={`text-3xl font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {value}
    </div>
    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
      {label}
    </div>
  </motion.div>
);

// About Section with Glassmorphism
const AboutSection = () => {
  const { mode, theme } = useAppContext();

  return (
    <section id="about" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-5xl md:text-6xl font-black mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className={`bg-gradient-to-r ${
              mode === 'techie'
                ? 'from-blue-500 to-purple-500'
                : 'from-orange-500 to-pink-500'
            } bg-clip-text text-transparent`}>
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-xl border ${
                theme === 'dark'
                  ? mode === 'techie'
                    ? 'bg-blue-500/5 border-blue-500/20'
                    : 'bg-orange-500/5 border-orange-500/20'
                  : mode === 'techie'
                    ? 'bg-blue-50/50 border-blue-200'
                    : 'bg-orange-50/50 border-orange-200'
              }`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {mode === 'techie' ? '👨‍💻 Engineering Excellence' : '🌍 Travel Philosophy'}
              </h3>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {mode === 'techie'
                  ? techieData.about
                  : travelerData.bio}
              </p>
            </motion.div>

            <div className="space-y-4">
              {mode === 'techie' ? (
                <>
                  <InfoCard
                    icon={<GraduationCap />}
                    title="Current Education"
                    value="B.E. Computer Engineering"
                    subtitle={`SGPA: ${techieData.education.sgpa}`}
                    theme={theme}
                    mode={mode}
                  />
                  <InfoCard
                    icon={<Trophy />}
                    title="Top Achievement"
                    value="Top 5 @ IIT Bombay"
                    subtitle="Among 1000+ teams"
                    theme={theme}
                    mode={mode}
                  />
                </>
              ) : (
                <>
                  <InfoCard
                    icon={<MapPin />}
                    title="Destinations"
                    value={`${travelerData.places}+ Places`}
                    subtitle={`Across ${travelerData.states} States`}
                    theme={theme}
                    mode={mode}
                  />
                  <InfoCard
                    icon={<Camera />}
                    title="Memories"
                    value="Countless"
                    subtitle="Photos & Stories"
                    theme={theme}
                    mode={mode}
                  />
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const InfoCard = ({ icon, title, value, subtitle, theme, mode }) => (
  <motion.div
    className={`p-6 rounded-2xl backdrop-blur-xl border ${
      theme === 'dark'
        ? mode === 'techie'
          ? 'bg-purple-500/10 border-purple-500/30'
          : 'bg-pink-500/10 border-pink-500/30'
        : mode === 'techie'
          ? 'bg-purple-50 border-purple-200'
          : 'bg-pink-50 border-pink-200'
    }`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <div className="flex items-start gap-4">
      <div className={`${mode === 'techie' ? 'text-purple-500' : 'text-pink-500'}`}>
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <div>
        <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {title}
        </div>
        <div className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {value}
        </div>
        <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
          {subtitle}
        </div>
      </div>
    </div>
  </motion.div>
);

// Education Section (New Separate Section)
const EducationSection = () => {
  const { theme } = useAppContext();
  
  return (
    <section id="education" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Education
          </span>
        </motion.h2>
        
        <div className="space-y-6">
          {/* Bachelor's Degree */}
          <motion.div
            className={`p-8 rounded-3xl backdrop-blur-xl border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30'
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <GraduationCap className="text-white" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {techieData.education.degree}
                </h3>
                <p className="text-blue-500 font-semibold text-lg mb-2">
                  SGPA: {techieData.education.sgpa}
                </p>
                <p className={`text-lg font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {techieData.education.university}
                </p>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {techieData.education.period}
                </p>
              </div>
            </div>
          </motion.div>

          {/* HSC and SSC */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* HSC */}
            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-xl border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30'
                  : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
              }`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-white" size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Higher Secondary Certificate (HSC)
                  </h3>
                  <p className="text-green-600 font-bold text-3xl mb-2">{techieData.education.hsc.score}</p>
                </div>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Maharashtra State Board | {techieData.education.hsc.year}
              </p>
            </motion.div>

            {/* SSC */}
            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-xl border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30'
                  : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300'
              }`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Secondary School Certificate (SSC)
                  </h3>
                  <p className="text-orange-600 font-bold text-3xl mb-2">{techieData.education.ssc.score}</p>
                </div>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Maharashtra State Board | {techieData.education.ssc.year}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section with Hexagonal Grid
const SkillsSection = () => {
  const { theme } = useAppContext();

  return (
    <section id="skills" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Tech Arsenal
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techieData.skills.technical.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={`relative p-6 rounded-2xl backdrop-blur-xl border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30'
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300'
              } overflow-hidden group`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-3">{skill.icon}</div>
                <div className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {skill.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects with 3D Card Effect
const ProjectsSection = () => {
  const { theme } = useAppContext();
  const [imageError, setImageError] = useState({});

  return (
    <section id="projects" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {techieData.projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`relative rounded-3xl backdrop-blur-xl border overflow-hidden group ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30'
                  : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600">
                {project.image && !imageError[`project-${index}`] ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(prev => ({ ...prev, [`project-${index}`]: true }))}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Code className="text-white/50" size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="relative z-10 p-6">
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>

                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        theme === 'dark'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      theme === 'dark'
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    Visit
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10'
                        : 'border-purple-600 text-purple-600 hover:bg-purple-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements with Trophy Cards
const AchievementsSection = () => {
  const { theme } = useAppContext();

  const getColorClasses = (color) => {
    const colors = {
      yellow: theme === 'dark' 
        ? 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20' 
        : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      blue: theme === 'dark'
        ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'
        : 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      purple: theme === 'dark'
        ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20'
        : 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      green: theme === 'dark'
        ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
        : 'bg-green-50 border-green-200 hover:bg-green-100'
    };
    return colors[color] || colors.yellow;
  };

  const getIconColor = (color) => {
    const colors = {
      yellow: 'text-yellow-500',
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      green: 'text-green-500'
    };
    return colors[color] || colors.yellow;
  };

  return (
    <section id="achievements" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Hall of Fame
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {techieData.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className={`relative p-8 rounded-3xl backdrop-blur-xl border overflow-hidden group transition-all ${getColorClasses(achievement.color)}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <motion.div
                className="absolute -top-10 -right-10 opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className={getIconColor(achievement.color)} size={120} />
              </motion.div>

              <div className="relative z-10">
                <Trophy className={`${getIconColor(achievement.color)} mb-4`} size={40} />
                <h3 className={`text-2xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {achievement.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Travel Gallery
const GallerySection = () => {
  const { theme } = useAppContext();
  const [selected, setSelected] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageError, setImageError] = useState({});

  const handleNext = () => {
    if (selected && currentPhotoIndex < selected.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const openGallery = (item) => {
    setSelected(item);
    setCurrentPhotoIndex(0);
    setImageError({});
  };

  const closeGallery = () => {
    setSelected(null);
    setCurrentPhotoIndex(0);
    setImageError({});
  };

  const handleImageError = (photoId) => {
    setImageError(prev => ({ ...prev, [photoId]: true }));
  };

  return (
    <section id="projects" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Travel Gallery
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travelerData.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative h-80 md:h-72 rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${item.color}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openGallery(item)}
            >
              {item.photos[0].image && !imageError[`thumb-${item.id}`] ? (
                <img 
                  src={item.photos[0].image} 
                  alt={item.location}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(`thumb-${item.id}`)}
                />
              ) : null}
              <div className={`absolute inset-0 flex flex-col items-center justify-center ${item.photos[0].image && !imageError[`thumb-${item.id}`] ? 'bg-black/40 hover:bg-black/60' : 'bg-black/30'} backdrop-blur-sm transition-all`}>
                <MapPin size={48} className="text-white mb-3" />
                <div className="font-bold text-2xl text-white mb-2">{item.location}</div>
                <div className="text-sm text-white/80">{item.photos.length} Photos</div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeGallery}
            >
              <motion.div
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                {/* Close Button */}
                <button
                  onClick={closeGallery}
                  className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors z-10"
                >
                  <X size={32} />
                </button>

                {/* Photo Counter */}
                <div className="absolute -top-12 left-0 text-white text-lg z-10">
                  {currentPhotoIndex + 1} / {selected.photos.length}
                </div>

                {/* Main Photo Display */}
                <div className="relative w-full h-96 rounded-3xl overflow-hidden bg-black">
                  {selected.photos[currentPhotoIndex].image && !imageError[`main-${currentPhotoIndex}`] ? (
                    <>
                      <img 
                        key={`photo-${currentPhotoIndex}`}
                        src={selected.photos[currentPhotoIndex].image}
                        alt={selected.photos[currentPhotoIndex].title}
                        className="w-full h-full object-contain"
                        onError={() => handleImageError(`main-${currentPhotoIndex}`)}
                      />
                      {/* Photo Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div className="text-white text-2xl font-bold">{selected.photos[currentPhotoIndex].title}</div>
                        <div className="text-white/80">{selected.location}</div>
                      </div>
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${selected.photos[currentPhotoIndex].color} flex items-center justify-center`}>
                      <div className="text-center text-white">
                        <MapPin size={80} className="mx-auto mb-4" />
                        <div className="font-bold text-5xl mb-2">{selected.location}</div>
                        <div className="text-2xl opacity-80">{selected.photos[currentPhotoIndex].title}</div>
                        <div className="text-sm mt-4 opacity-60">Image placeholder - Add your photo!</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={handlePrev}
                    disabled={currentPhotoIndex === 0}
                    className={`px-6 py-3 rounded-full font-bold transition-all ${
                      currentPhotoIndex === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentPhotoIndex === selected.photos.length - 1}
                    className={`px-6 py-3 rounded-full font-bold transition-all ${
                      currentPhotoIndex === selected.photos.length - 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    Next →
                  </button>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 justify-center mt-6 overflow-x-auto pb-2">
                  {selected.photos.map((photo, index) => (
                    <motion.button
                      key={photo.id}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                        index === currentPhotoIndex ? 'ring-4 ring-orange-500' : 'opacity-50'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {photo.image && !imageError[`thumb-${selected.id}-${index}`] ? (
                        <img 
                          src={photo.image} 
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(`thumb-${selected.id}-${index}`)}
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${photo.color}`} />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Stories Section with Blog Preview and Full View
const StoriesSection = () => {
  const { theme } = useAppContext();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="stories" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Travel Stories
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelerData.posts.map((post, index) => (
            <motion.div
              key={post.id}
              className={`rounded-3xl backdrop-blur-xl border overflow-hidden cursor-pointer group ${
                theme === 'dark'
                  ? 'bg-pink-500/10 border-pink-500/30 hover:border-pink-500/50'
                  : 'bg-pink-50 border-pink-300 hover:border-pink-400'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => openBlog(post)}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-pink-500 to-purple-500">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="text-white/50" size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-pink-600">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <span className="text-pink-500 flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {post.readTime}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {post.title}
                </h3>

                <p className={`text-sm mb-4 line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.excerpt}
                </p>

                <button className="text-pink-500 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Blog Modal */}
        <AnimatePresence>
          {selectedBlog && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBlog}
            >
              <div className="min-h-screen flex items-start justify-center p-4 py-20">
                <motion.article
                  className={`relative w-full max-w-4xl rounded-3xl overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-gray-900 border border-gray-800'
                      : 'bg-white border border-gray-200'
                  }`}
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeBlog}
                    className={`absolute top-6 right-6 z-20 p-3 rounded-full backdrop-blur-xl border transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700'
                        : 'bg-white/80 border-gray-300 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <X size={24} />
                  </button>

                  {/* Cover Image */}
                  <div className="relative h-96 overflow-hidden bg-gradient-to-br from-pink-500 to-purple-500">
                    {selectedBlog.coverImage ? (
                      <img
                        src={selectedBlog.coverImage}
                        alt={selectedBlog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="text-white/30" size={120} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-white/90 text-pink-600 mb-4">
                        {selectedBlog.category}
                      </span>
                      <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        {selectedBlog.title}
                      </h1>
                      <div className="flex items-center gap-6 text-white/80">
                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          {selectedBlog.date}
                        </span>
                        <span>{selectedBlog.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div
                    className={`p-8 md:p-12 max-w-none ${theme === 'dark'
                        ? 'text-white'
                        : 'text-gray-900'
                      }`}
                    dangerouslySetInnerHTML={{
                      __html: selectedBlog.content
                        .replace(/<h2[^>]*>/g, '<p class="text-white font-bold text-2xl mt-6 mb-3">')
                        .replace(/<\/h2>/g, '</p>')
                        .replace(/<h3[^>]*>/g, '<p class="text-white font-semibold text-xl mt-4 mb-2">')
                        .replace(/<\/h3>/g, '</p>')
                        .replace(/<ul[^>]*>/g, '<ul class="list-disc pl-6 mt-3 mb-3 text-white">')
                        .replace(/<li[^>]*>/g, '<li class="mb-1 text-white">')
                        .replace(/<p[^>]*>/g, '<p class="text-white leading-relaxed mb-3">')
                    }}
                  />

                  {/* Footer */}
                  <div className={`p-8 border-t ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <button
                      onClick={closeBlog}
                      className={`w-full md:w-auto px-8 py-3 rounded-full font-bold transition-all ${
                        theme === 'dark'
                          ? 'bg-pink-500 text-white hover:bg-pink-600'
                          : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`}
                    >
                      Close Article
                    </button>
                  </div>
                </motion.article>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Contact with Neon Effect
const ContactSection = () => {
  const { mode, theme } = useAppContext();

  const contactOptions = [
    {
      icon: <Mail size={32} />,
      title: "Email",
      value: "gauravrasane14@gmail.com",
      link: "mailto:gauravrasane14@gmail.com",
      highlight: mode === 'techie'
    },
    {
      icon: <Phone size={32} />,
      title: "Phone",
      value: "+91 76209 84926",
      link: "tel:+917620984926",
      highlight: false
    },
    {
      icon: <Linkedin size={32} />,
      title: "LinkedIn",
      value: "@gauravrasane14",
      link: "https://linkedin.com/in/gauravrasane14",
      highlight: mode === 'techie'
    },
      {
      icon: <Github size={32} />,
      title: "GitHub",
      value: "@gauravrasane14",
      link: "https://github.com/gauravrasane14",
      highlight: false
    },
    {
      icon: <Instagram size={32} />,
      title: "Instagram",
      value: "@gauravrasane_14",
      link: "https://instagram.com/gauravrasane_14",
      highlight: mode === 'traveler'
    },
    {
      icon: <MapPin size={32} />,
      title: "Location",
      value: "Pune, Maharashtra, India",
      link: null,
      highlight: false
    }
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className={`bg-gradient-to-r ${
            mode === 'techie'
              ? 'from-blue-500 to-purple-500'
              : 'from-orange-500 to-pink-500'
          } bg-clip-text text-transparent`}>
            Let's Connect
          </span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {contactOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {option.link ? (
                <motion.a
                  href={option.link}
                  target={option.link.startsWith('http') ? '_blank' : undefined}
                  rel={option.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`block p-5 rounded-2xl backdrop-blur-xl border transition-all group ${
                    option.highlight
                      ? theme === 'dark'
                        ? mode === 'techie'
                          ? 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30 hover:scale-105'
                          : 'bg-orange-500/20 border-orange-500/50 hover:bg-orange-500/30 hover:scale-105'
                        : mode === 'techie'
                          ? 'bg-blue-100 border-blue-400 hover:bg-blue-200 hover:scale-105'
                          : 'bg-orange-100 border-orange-400 hover:bg-orange-200 hover:scale-105'
                      : theme === 'dark'
                        ? 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 hover:scale-105'
                        : 'bg-white/80 border-gray-300 hover:bg-white hover:scale-105'
                  }`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`mb-3 ${
                    option.highlight
                      ? mode === 'techie' ? 'text-blue-500' : 'text-orange-500'
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {option.icon}
                  </div>
                  <h3 className={`text-base font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {option.title}
                  </h3>
                  <p className={`text-xs break-all ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {option.value}
                  </p>
                </motion.a>
              ) : (
                <motion.div
                  className={`block p-5 rounded-2xl backdrop-blur-xl border ${
                    theme === 'dark'
                      ? 'bg-gray-800/30 border-gray-700/50'
                      : 'bg-white/80 border-gray-300'
                  }`}
                  whileHover={{ y: -4 }}
                >
                  <div className={`mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {option.icon}
                  </div>
                  <h3 className={`text-base font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {option.title}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {option.value}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main App
const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mode, setMode] = useState('techie');
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppContext.Provider value={{ mode, setMode, theme, setTheme, menuOpen, setMenuOpen }}>
      <div className={`min-h-screen transition-all duration-500 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <AnimatePresence>
          {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
        </AnimatePresence>

        {!showWelcome && (
          <>
            <GridBackground mode={mode} />
            <FloatingParticles mode={mode} />
            <Header />
            <Sidebar />

            <main className="lg:ml-64 transition-all duration-300">
              <AnimatePresence mode="wait">
                {mode === 'techie' ? (
                  <motion.div
                    key="techie"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HeroSection />
                    <AboutSection />
                    <EducationSection />
                    <SkillsSection />
                    <ProjectsSection />
                    <AchievementsSection />
                    <ContactSection />
                  </motion.div>
                ) : (
                  <motion.div
                    key="traveler"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HeroSection />
                    <AboutSection />
                    <GallerySection />
                    <StoriesSection />
                    <ContactSection />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            <footer className={`lg:ml-64 py-8 text-center border-t ${
              theme === 'dark'
                ? 'bg-black/50 border-gray-800 text-gray-500'
                : 'bg-white/50 border-gray-200 text-gray-600'
            } backdrop-blur-xl`}>
              <p className="mb-2">© 2025 Gaurav Y. Rasane</p>
              <p className="text-sm">Crafted with React + Framer Motion</p>
            </footer>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;