import React, { useState, createContext, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code, Plane, Mail, Phone, MapPin, Github, Linkedin, Instagram, Calendar, Award, Briefcase, GraduationCap, Lightbulb, ExternalLink, ChevronRight, Trophy, Users, BookOpen, FileText, Brain, Terminal, Cpu, Zap, Rocket, Camera, Map as MapIcon, Navigation, Package, DollarSign, Clock, Heart, Smile, AlertCircle, Copy, Download, Share2 } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import indiaGeo from "../data/maps/india.json";
import { geoMercator } from "d3-geo";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

// Real Resume Data
const techieData = {
  about: "I'm Gaurav Rasane. A innovative and result-oriented Computer Engineer with a sound background in technology and full-stack development. A perennial top-performing student throughout all academic years and Advisor of E-Cell ZCOER, with national-level experience in IIT Bombay and IIT Madras. Enthusiastic about developing impactful tech solutions and mentoring innovative projects like the AI Agriculture Surveillance & Defence System and Zeal Startups.",
  education: {
    degree: "Bachelor of Engineering in Computer Engineering",
    university: "Savitribai Phule Pune University",
    sgpa: "9.70",
    period: "Nov 2022 - May 2026",
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
      image: "/images/projects/agri.webp",
      github: "https://github.com/gauravrasane14/Agriculture-Surveillance",
      live: "#"
    },
    {
      title: "Computer Department Website",
      description: "Professional departmental website with optimized performance",
      tech: ["HTML", "CSS", "JavaScript", "GitHub"],
      image: "/images/projects/deptweb.webp",
      github: "https://github.com/gauravrasane14/compweb",
      live: "https://cszcoer.netlify.app/"
    },
    {
      title: "Zeal Startups Platform",
      description: "Centralized project showcase platform with responsive design",
      tech: ["HTML", "CSS", "JavaScript", "Canva"],
      image: "/images/projects/zealstartups.webp",
      github: "https://github.com/gauravrasane14/zealstartups",
      live: "https://zealstartups.netlify.app/"
    }
  ],
  achievements: [
    { title: "Top 5 at IIT Bombay", desc: "National Entrepreneurship Challenge among 1000+ teams", color: "yellow" },
    { title: "IIT Madras Selection", desc: "Global Hyperloop Competition", color: "blue" },
    { title: "SGPA 9.70", desc: "Consistent Top Performer", color: "purple" },
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

  // Interactive Map Destinations
  destinations: [
    {
      id: 1,
      name: "Goa",
      state: "Goa",
      coordinates: [74.1240, 15.2993],
      type: "Beach Paradise",
      color: "from-cyan-500 to-blue-500",
      photos: [
        { image: "/images/travel/goa/baga-beach.jpg", title: "Baga Beach Sunset" },
        { image: "/images/travel/goa/fort-aguada.jpg", title: "Fort Aguada" }
      ],
      stats: {
        type: "Unplanned Trip",
        budget: "₹1,500",
        duration: "3 Days",
        travelers: "2 Friends"
      },
      story:
        `<h2><b>Unplanned Goa Trip Before Exams!</b></h2>
      <p>Sometimes the best trips are the ones you never plan. Just a few days before our exams, my friend and I had this random idea - “Let’s go to Goa.” Within a few hours, with budget of ₹1500 we packed our bags, grabbed a half-kilo packet of farsan, and set off on a journey that would become one of our most memorable adventures.
      <br /><br /><b>From Pune to Mumbai:</b>
      <br />The trip began from Pune. We caught a train to Mumbai for just ₹75 and started feeling like budget travel pros already. At CSMT Mumbai, we treated ourselves to the classic vadapav worth ₹25, which gave us the real Mumbai start we needed.
      <br /><br /><b>The Overnight Journey to Goa:</b>
      <br />That night, we boarded the Konkan Kanya Express from Mumbai. The rhythmic sound of the train and the cool breeze outside made it feel like a movie. By the next morning, we reached Madgaon Junction in Goa, with excitement higher than ever and still under budget.
      <br /><br /><b>Exploring Goa on a Scooty:</b>
      <br />From Madgaon, we rented a scooty for two days at ₹500 per day, which came to ₹250 per head. Fuel cost added another ₹300 per person, but it was worth every rupee. With our small backpacks, farsan packet, and unstoppable energy, we began exploring Goa’s endless charm.
      <br />We covered more than 10 beaches across both South and North Goa. South Goa surprised us with its calmness and natural beauty, while North Goa lit up with its lively nightlife and vibrant atmosphere. From peaceful sunsets at Palolem to crowded lanes of Baga, we saw it all, laughed endlessly, and lived in the moment.
      <br /><br /><b>Living on Farsan and Budget Meals:</b>
      <br />Food was simple and affordable. One decent meal cost us around ₹150 per head, and our farsan packet became our savior during long afternoons when we were too busy exploring to stop for lunch. That farsan became legendary for us by the end of the trip!
      <br /><br /><b>The Beautiful Return Journey:</b>
      <br />For our return, we took the Goa–Delhi Express via Belagavi. The journey turned magical when we passed through Dudhsagar Waterfall, visible right from the train window. The sound of the waterfall, the mist in the air, and the greenery around made it feel like a perfect ending to our spontaneous adventure. The ticket cost only ₹190, and the view was priceless.
      <br /><br /><b>Memories for a Lifetime:</b>
      <br />With just ₹1500 and one farsan packet, we experienced an unforgettable Goa trip filled with laughter, scenic beauty, and the joy of unplanned adventures. It taught us that you don’t need a big budget to create big memories, you just need a little madness and a lot of curiosity.
      <br />Goa wasn’t just a destination; it became a reminder that the best moments in life often come without plans.</p>`,
      lesson: {
        type: "practical",
        text: "Budget travel doesn't mean compromising on experiences - it's about smart choices!"
      }
    },
    {
      id: 2,
      name: "Tirupati",
      state: "Andhra Pradesh",
      coordinates: [79.4192, 13.6288],
      type: "Spiritual Journey",
      color: "from-orange-500 to-yellow-500",
      photos: [{ image: "/images/stories/tirupati.png", title: "Tirupati Temple" }],
      stats: {
        type: "Divine Trip",
        budget: "₹3,000",
        duration: "4 Days",
        travelers: "Friends"
      },
      story: `<h2>A Divine Journey to Tirupati - The Abode of Sri Venkateswara Balaji</h2>
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
      <br />As we returned home, all of us carried a sense of spiritual fulfillment and positivity that words can hardly capture. Truly, a visit to Sri Venkateswara Balaji at Tirupati is not just a trip - it’s a divine calling that stays in your heart forever.</p>`,
      lesson: {
        type: "emotional",
        text: "Sometimes the best journeys are those that connect you with something higher 🙏"
      }
    },
    {
      id: 3,
      name: "Kalsubai Peak",
      state: "Maharashtra",
      coordinates: [73.7095, 19.6037],
      type: "Night Trek",
      color: "from-purple-500 to-pink-500",
      photos: [
        { image: "/images/travel/kalsubai/k1.jpg", title: "Summit View" },
        { image: "/images/travel/kalsubai/k2.jpg", title: "Sunrise Magic" }
      ],
      stats: { type: "Solo Trek", budget: "₹800", duration: "2 Days", travelers: "Solo" },
      story: `<h2>A Thrilling Night at Maharashtra’s Highest Peak - Kalsubai Shikhar</h2>
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
      <br />If you ever wish to experience a thrilling, peaceful, and unforgettable escape, pack your backpack and head toward Kalsubai Peak. Spend a night under the stars, away from networks and noise - and you’ll discover something rare: the beauty of absolute stillness.</p>`,
      lesson: {
        type: "emotional",
        text: "Solitude at 5,400ft teaches you that peace isn't found, it's felt 🏔️"
      }
    },
    {
      id: 4,
      name: "Banaras",
      state: "Uttar Pradesh",
      coordinates: [82.9739, 25.3176],
      type: "Cultural Experience",
      color: "from-amber-500 to-orange-500",
      photos: [
        { image: "/images/stories/banaras.png", title: "Ganga Aarti" },
        { image: "/images/stories/banaras.png", title: "Ganga Aarti" }
      ],
      stats: {
        type: "Cultural Trip",
        budget: "₹2,500",
        duration: "3 Days",
        travelers: "Solo"
      },
      story:
        `<p>Some cities are just places on the map - and then there’s Banaras (Varanasi), a city that feels alive with divinity. My journey to this ancient city was a deep dive into spirituality, history, culture, and flavor - all wrapped into one unforgettable experience.
      <br /><br />Exploring the 84 Ghats - The Soul of Banaras:
      <br />We began our exploration early in the morning, walking along the 84 ghats of the Ganga. Each ghat had its own rhythm - saints meditating, pilgrims bathing, boats gently floating, and the fragrance of incense mingling with the misty morning air.
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
</p>`,
      lesson: {
        type: "emotional",
        text: "Banaras teaches you that life and death are just two sides of the same coin 🕉️"
      }
    },
    {
      id: 5,
      name: "Konkan",
      state: "Maharashtra",
      coordinates: [73.2743, 17.1537],
      type: "Coastal Escape",
      color: "from-green-500 to-teal-500",
      photos: [
        { image: "/images/stories/aareware.webp", title: "Aareware Beach" },
        { image: "/images/stories/aareware.webp", title: "Aareware Beach" }
      ],
      stats: {
        type: "Solo Trip",
        budget: "₹2,000",
        duration: "4 Days",
        travelers: "Solo"
      },
      story:
        `<h2>A Solo Journey Through Konkan - Aarware, Ratnagiri & Ganpatipule</h2>
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
    `,
      lesson: {
        type: "practical",
        text: "State Transport buses are the best way to explore Konkan's hidden gems 🚌"
      }
    },
    {
      id: 6,
      name: "IIT Madras",
      state: "Tamil Nadu",
      coordinates: [80.2300, 12.9863],
      type: "Educational",
      color: "from-indigo-500 to-purple-500",
      photos: [
        { image: "/images/travel/iitm/iitm1.jpg", title: "IIT Madras" },
        { image: "/images/travel/iitm/iitm2.jpg", title: "IITM Entry Gate" },
        { image: "/images/travel/iitm/iitm3.jpg", title: "IITM Night Campus" },
        { image: "/images/travel/iitm/iitm4.jpg", title: "IITM Hostel" },
        { image: "/images/travel/iitm/iitm5.jpg", title: "IITM Ground" }
      ],
      stats: {
        type: "Competition",
        budget: "Sponsored",
        duration: "5 Days",
        travelers: "Team"
      },
      story: "Selected for Global Hyperloop Competition at IIT Madras.",
      lesson: {
        type: "emotional",
        text: "Dream big, work hard, and the universe conspires to make it happen ✨"
      }
    },
    {
      id: 7,
      name: "Kedarnath",
      state: "Uttarakhand",
      coordinates: [79.0669, 30.7346],
      type: "Pilgrimage & Trek",
      color: "from-blue-500 to-indigo-700",
      photos: [
        { image: "/images/travel/kedarnath/temple.jpg", title: "Kedarnath Temple" },
        { image: "/images/travel/kedarnath/trek.jpg", title: "22km Trek to Kedarnath" }
      ],
      stats: {
        type: "Spiritual Trek",
        budget: "₹1,800",
        duration: "4 Days",
        travelers: "Friends"
      },
      story:
        `
<h2><b>The Divine Trek to Shri Kedarnath</b></h2>
<p>Some journeys are not just about reaching a destination - they are about faith, strength, and surrender. The journey to Kedarnath was one of the most powerful and spiritual experiences of my life.
<br /><br /><b>Rishikesh to Gaurikund – The Beginning:</b>
<br />The journey started from Rishikesh as we boarded a bus towards Gaurikund. The route itself was breathtaking - lush green mountains, flowing rivers, and countless waterfalls falling from heights made the entire journey feel alive.
<br />Every turn of the road revealed a new view, making the long journey feel short and beautiful.
<br /><br /><b>The 22 KM Uphill Trek Begins:</b>
<br />From Gaurikund, the real test began - a trek of more than 22 km uphill. The path was challenging, but the surroundings made every step worth it. Green valleys, fresh mountain air, waterfalls along the way, and even patches of snow added to the beauty of the journey.
<br />Despite the tiredness, something kept pushing us forward - maybe faith, maybe determination.
<br /><br /><b>The Divine Darshan of Shri Kedarnath:</b>
<br />After hours of trekking, we finally reached Kedarnath. Standing in front of the sacred temple, surrounded by massive snow-covered mountains, felt unreal. All the fatigue disappeared in that moment.
<br />The darshan of <b>Shri Kedarnath</b> brought a sense of peace and fulfillment that words can’t fully describe.
<br /><br /><b>Darshan of Shri Bhairav Baba:</b>
<br />We also visited the temple of <b>Shri Bhairav Baba</b>, located at a higher point. From there, the view of the entire Kedarnath valley was simply breathtaking - a perfect mix of spirituality and natural beauty.
<br /><br /><b>The 22 KM Downhill Journey:</b>
<br />The return trek of 22 km downhill tested our physical strength, but it also gave us more time to absorb the beauty around us. Every step felt lighter, but the memories felt heavier in the heart.
<br /><br /><b>More Than Just a Trek:</b>
<br />This wasn’t just a trek - it was a journey of faith, patience, and self-discovery. It taught us how powerful belief can be and how far we can go when we truly want something.
<br /><br /><b>A Journey That Changes You:</b>
<br />Kedarnath doesn’t just give you memories - it changes something within you. As we left, we carried not just the experience, but a sense of calm, strength, and devotion.
<br />This wasn’t just a trip - it was a divine journey that will stay with me forever 🙏</p>
`,
      lesson: {
        type: "emotional",
        text: "Faith moves mountains – and sometimes, it takes you across them 🚶‍♂️🕉️"
      }
    },
    {
      id: 8,
      name: "Rishikesh",
      state: "Uttarakhand",
      coordinates: [78.2676, 30.0869],
      type: "Spiritual Escape",
      color: "from-teal-500 to-blue-600",
      photos: [
        { image: "/images/travel/rishikesh/bridge.jpg", title: "Ram Jhula" },
        { image: "/images/travel/rishikesh/aarti.jpg", title: "Ganga Aarti" }
      ],
      stats: {
        type: "Cultural Getaway",
        budget: "₹1,500",
        duration: "2 Days",
        travelers: "Friends"
      },
      story:
        "From peaceful dips in the Ganga at sunrise to the mesmerizing evening Aarti, Rishikesh was a soulful escape blessed by nature and culture.",
      lesson: {
        type: "emotional",
        text: "Let the river wash away your worries and fill your soul with peace 🌊🙏"
      }
    },
    {
      id: 9,
      name: "Manali",
      state: "Himachal Pradesh",
      coordinates: [77.1734, 32.2396],
      type: "Mountain Escape",
      color: "from-green-500 to-cyan-600",
      photos: [
        { image: "/images/travel/manali/hidimba.jpg", title: "Hidimba Temple" },
        { image: "/images/travel/manali/mall-road.jpg", title: "Mall Road" }
      ],
      stats: {
        type: "Budget Adventure",
        budget: "₹1,400",
        duration: "4 Days",
        travelers: "Solo"
      },
      story:
        "Manali welcomed me with snow-capped peaks, local flavors like Siddhu and ancient temples like Hidimba Devi. Perfect blend of nature, culture, and adventure.",
      lesson: {
        type: "practical",
        text: "Take that bus instead – the journey is just as beautiful as the destination 🚌"
      }
    },
    {
      id: 10,
      name: "Baralacha La Pass",
      state: "Himachal Pradesh",
      coordinates: [77.4638, 32.7630],
      type: "Bike Adventure",
      color: "from-slate-500 to-zinc-700",
      photos: [
        { image: "/images/travel/baralacha/pass.jpg", title: "Baralacha La at 16,040ft" },
        { image: "/images/travel/baralacha/pass.jpg", title: "Baralacha La at 16,040ft" }
      ],
      stats: {
        type: "Bike Expedition",
        budget: "₹2,400",
        duration: "2 Days",
        travelers: "Friends"
      },
      story:
        `
  <h2>Conquering Baralacha La: A Ride of Courage at 16,040 Feet</h2>
  <p>Travel is often romanticized, snow-capped peaks, cozy retreats, and scenic selfies. But sometimes, travel is pure guts. This is the story of two friends, ₹240 train tickets, a rented bike, and the fearless ride to <strong>Baralacha La Pass</strong> - 16,040 feet above sea level.</p>
  
  <h3>🚆 From Delhi to Manali via Chandigarh</h3>
  <p>The adventure kicked off with a modest ₹240 train ride to Chandigarh. From there, we boarded a bus to Manali (₹700), climbing through misty mountains toward Himachal's heartland.</p>
  
  <h3>🏡 Budget Stay in Manali</h3>
  <p>We scored accommodation for ₹400 total for two nights. We visited:</p>
  <ul>
    <li><strong>Hidimba Devi Temple</strong> - An ancient cave temple surrounded by forests</li>
    <li><strong>Old Manali</strong> - Café-lined lanes and hippie charm</li>
    <li><strong>Buddhist Monastery</strong> - Calm amidst colorful prayer flags</li>
  </ul>
  
  <h3>🏍️ Baralacha La – The Ride of Pure Thrill</h3>
  <p>With just basic helmets and sheer madness, we rented a motorbike (₹1200/day) and set out for Baralacha La. The bike groaned under cold winds and rugged terrain as we passed the towering <strong>Atal Tunnel</strong>, frozen rivers, and snowy ridges.</p>
  
  <p>At the summit - 16,040 ft - we were breathless. Partly due to altitude... and partly because we’d made it - without fancy gear, just grit and adventure.</p>
  
  <h3>❄️ Frozen. Fearless. Free.</h3>
  <p>Our gloves froze. Our faces numbed. But the view from the pass made every degree of cold worth it. It was just us, the mountains, and boundless silence.</p>
  
  <h3>🏁 The Return Journey</h3>
  <p>We rode back to Manali the same day - tired but overflowing with stories. Traveling back by bus and train, we knew this was more than a trip; it was a bold declaration to the world - <em>we lived.</em></p>
  
  <blockquote>You don’t need a fortune to travel - just a will to wander.</blockquote>
  `,
      lesson: {
        type: "practical",
        text: "Prep for the cold - high-altitude rides are as brutal as they are beautiful ❄️🏍️"
      }
    },
    {
      id: 11,
      name: "Delhi",
      state: "Delhi",
      coordinates: [77.2090, 28.6139],
      type: "City Exploration",
      color: "from-red-500 to-rose-600",
      photos: [
        { image: "/images/travel/delhi/redfort.jpg", title: "Red Fort" },
        { image: "/images/travel/delhi/india-gate.jpg", title: "India Gate" }
      ],
      stats: {
        type: "Solo Exploration",
        budget: "₹800",
        duration: "2 Days",
        travelers: "Solo"
      },
      story:
        "Exploring Old Delhi’s chaos, historical monuments, and street food was like walking through a living museum - with samosas and jalebi in hand.",
      lesson: {
        type: "practical",
        text: "Always head to Chandni Chowk with an empty stomach and a curious heart ❤️"
      }
    },
    {
      id: 12,
      name: "Prayagraj Mahakumbh",
      state: "Uttar Pradesh",
      coordinates: [81.8463, 25.4358],
      type: "Mass Pilgrimage",
      color: "from-yellow-500 to-red-600",
      photos: [
        { image: "/images/travel/prayagraj/kumbh.jpg", title: "Holy Dip at Mahakumbh" },
        { image: "/images/travel/prayagraj/kumbh.jpg", title: "Holy Dip at Mahakumbh" }
      ],
      stats: {
        type: "Spiritual Gathering",
        budget: "₹1,200",
        duration: "3 Days",
        travelers: "Friends"
      },
      story:
        "Amidst millions at the Mahakumbh, we took a holy bath, visited Juna Akhada, and soaked in chaotic devotion and deep peace all at once.",
      lesson: {
        type: "emotional",
        text: "In the crowd of millions, I found a rare stillness within ✨🌊"
      }
    },
    {
      id: 13,
      name: "Ayodhya",
      state: "Uttar Pradesh",
      coordinates: [82.1945, 26.7796],
      type: "Holy City",
      color: "from-orange-500 to-red-500",
      photos: [
        { image: "/images/travel/ayodhya/rammandir.jpg", title: "Shri Ram Mandir" },
        { image: "/images/travel/ayodhya/rammandir.jpg", title: "Shri Ram Mandir" }
      ],
      stats: {
        type: "Spiritual Trip",
        budget: "₹900",
        duration: "2 Days",
        travelers: "Friends"
      },
      story:
        "A quiet night at Ayodhya Junction led to a divine morning at the Sarayu river. Darshan at Ram Mandir, Hanuman Garhi, Kanak Bhavan and Dashrath Mahal completed the holy circuit.",
      lesson: {
        type: "emotional",
        text: "True devotion doesn’t need grandeur - just a sincere heart 🌅🙏"
      }
    },
    {
      id: 14,
      name: "Ujjain",
      state: "Madhya Pradesh",
      coordinates: [75.7804, 23.1765],
      type: "Sacred City",
      color: "from-indigo-600 to-purple-700",
      photos: [
        { image: "/images/travel/ujjain/mahakaleshwar.jpg", title: "Mahakaleshwar Temple" },
        { image: "/images/travel/ujjain/mahakaleshwar.jpg", title: "Mahakaleshwar Temple" }
      ],
      stats: {
        type: "Divine Trip",
        budget: "₹240",
        duration: "1 Day",
        travelers: "Solo"
      },
      story:
        "A short but powerful journey to the city of Mahakaleshwar, marked by temples, prasadam, and spiritual comfort.",
      lesson: {
        type: "emotional",
        text: "Even the shortest journeys can touch the deepest parts of your soul 🛕"
      }
    },
    {
      id: 15,
      name: "Omkareshwar",
      state: "Madhya Pradesh",
      coordinates: [76.1521, 22.2411],
      type: "Island Temple",
      color: "from-green-700 to-gray-600",
      photos: [
        { image: "/images/travel/omkareshwar/bridge.jpg", title: "Omkareshwar Bridge" },
        { image: "/images/travel/omkareshwar/bridge.jpg", title: "Omkareshwar Bridge" }
      ],
      stats: {
        type: "Divine Trip",
        budget: "₹580",
        duration: "2 Days",
        travelers: "Solo"
      },
      story:
        "On a temple island shaped like the Om symbol, I stayed at the Gajanan Maharaj Trust Nivas and experienced the serenity only found in sacred silence.",
      lesson: {
        type: "practical",
        text: "Sometimes the smallest detours lead to the most peaceful destinations 🕉️"
      }
    },
    {
      id: 16,
      name: "IIT Bombay",
      state: "Maharashtra",
      coordinates: [72.9149, 19.1334],
      type: "Educational",
      color: "from-orange-500 to-red-500",
      photos: [
        { image: "/images/travel/iitb/iitb1.jpg", title: "IIT Bombay Campus" },
        { image: "/images/travel/iitb/iitb2.jpg", title: "Main Building" },
        { image: "/images/travel/iitb/iitb3.jpg", title: "Powai Lake View" },
        { image: "/images/travel/iitb/iitb4.jpg", title: "Hostel Life" },
        { image: "/images/travel/iitb/iitb5.jpg", title: "E-Summit Event" }
      ],
      stats: {
        type: "Competition",
        budget: "Partially Sponsored",
        duration: "3-4 Days",
        travelers: "Team of 10"
      },
      story: `<h2>My IIT Bombay Experience</h2>
      <p>It was an unforgettable journey to IIT Bombay, one of the most inspiring places I’ve ever been to. Our team had qualified for the National Entrepreneurship Challenge (NEC) finals, and we proudly secured All India Rank 5 among more than 650 teams. Alongside this, I was also selected as the Campus Ambassador, achieving a spot in the Top 10 Campus Ambassadors across the nation, a truly proud moment.
      <br />We stayed in Hostel 17, which soon became our little home for those memorable days. The H17 Mess served as our go-to place for food, laughter, and random late-night discussions. During the day, we explored the sprawling IIT Bombay campus, from the Lecture Hall Complex to the Open Air Theatre, every corner had its own vibe.
      <br />One evening, after all the sessions and presentations, our team took a walk to the serene Powai Lake, just beside the campus. The calm water reflected the glittering lights of the city, and we talked for hours about our dreams, startups, and the journey ahead. That night became one of the most peaceful yet motivating moments of the entire trip.
      <br />As the days passed, IIT Bombay felt less like a campus and more like a world full of innovation, ideas, and friendships. The experience not only gave us recognition but also strengthened our belief in what teamwork and passion can achieve.
      <br />When we finally packed our bags to leave Hostel 17, it wasn’t just memories we carried, it was inspiration, confidence, and a drive to keep building and achieving more.</p>`
      ,
      lesson: {
        type: "practical",
        text: "Execution matters more than ideas. The real game begins when you step out and compete 🚀"
      }
    },
    {
      id: 17,
      name: "Gulmarg",
      state: "Jammu & Kashmir",
      coordinates: [74.3805, 34.0484],
      type: "Snow Destination",
      color: "from-blue-400 to-white",
      photos: [
        { image: "/images/travel/gulmarg/gulmarg1.jpg", title: "Snowy Gulmarg" },
        { image: "/images/travel/gulmarg/gulmarg2.jpg", title: "Snowy Gulmarg" }
      ],
      stats: {
        type: "Adventure",
        budget: "₹3000",
        duration: "1 Day",
        travelers: "Friends"
      },
      story:
        `
<h2><b>Snow Ride to Gulmarg & Gondola Adventure</b></h2>
<p>Some places don’t feel real until you experience them. Gulmarg was exactly that - a perfect snow paradise that felt like stepping into a dream. From the journey to the top of the mountains, everything was filled with thrill, beauty, and unforgettable moments.
<br /><br /><b>Reaching Tangmarg:</b>
<br />Our journey began by reaching Tangmarg through a sharing taxi. The excitement was already building as we could see snow-covered surroundings getting closer with every kilometer.
<br /><br /><b>The Snowy Ghat Ride to Gulmarg:</b>
<br />From Tangmarg, we boarded another shared taxi - but this one was special. It had snow chains wrapped around its wheels to drive safely on icy roads. As we climbed the ghat section towards Gulmarg, the entire road was covered in snow, and tall pine trees on both sides were painted white.
<br />It felt like we were entering a winter wonderland, with every turn revealing a more beautiful view than the last.
<br /><br /><b>Gulmarg Gondola Experience:</b>
<br />Once we reached Gulmarg, the real adventure began - the famous Gondola ride. We took both <b>Phase 1</b> and <b>Phase 2</b>, going higher and higher into the snowy mountains.
<br />As the gondola moved up, the views became more breathtaking. Snow-covered valleys, endless mountain ranges, and pure white landscapes stretched as far as the eyes could see.
<br /><br /><b>At the Top – Phase 2 Magic:</b>
<br />Reaching Phase 2 felt unreal. Surrounded by massive snow-covered peaks, the view was nothing less than magical. The cold wind, the silence, and the beauty of nature made us pause and just take it all in.
<br />We even enjoyed hot <b>maggi</b> at that height, which somehow tasted better than ever before - maybe because of the weather, or maybe because of the moment.
<br /><br /><b>Living the Snow Dream:</b>
<br />We spent time playing in the snow, walking through white landscapes, and capturing memories that felt straight out of a movie. Every second there felt special.
<br /><br /><b>More Than Just a Destination:</b>
<br />Gulmarg wasn’t just about snow or mountains - it was about the feeling of being completely free, surrounded by nature at its best.
<br /><br /><b>A Memory to Hold Forever:</b>
<br />As we came back down, we knew this wasn’t just another trip. It was an experience we would never forget - a perfect blend of adventure, beauty, and pure happiness.
<br />Sometimes, the most beautiful places are the ones that make you feel alive in every moment ❄️</p>
`,
      lesson: {
        type: "emotional",
        text: "Sometimes, peace is found where everything slows down ❄️"
      }
    },
    {
      id: 18,
      name: "Sonmarg",
      state: "Jammu & Kashmir",
      coordinates: [75.2923, 34.3039],
      type: "Valley",
      color: "from-yellow-400 to-green-500",
      photos: [
        { image: "/images/travel/sonmarg/sonmarg1.jpg", title: "Sonmarg Valley" },
        { image: "/images/travel/sonmarg/sonmarg2.jpg", title: "Sonmarg Valley" }
      ],
      stats: {
        type: "Nature Trip",
        budget: "₹1200",
        duration: "1 Day",
        travelers: "Friends"
      },
      story:
        `
<h2><b>Into the Frozen Beauty of Sonmarg</b></h2>
<p>Some places don’t just look beautiful - they make you feel something deep inside. Sonmarg was one of those places. Surrounded by snow-covered mountains, frozen rivers, and endless valleys, it felt like stepping into a silent, magical world.
<br /><br /><b>The Journey Through Sonmarg Tunnel:</b>
<br />The adventure began as we passed through the famous Sonmarg tunnel. As we entered, everything around was normal - but the moment we came out on the other side, the entire landscape had transformed into a snowy paradise.
<br />It felt like crossing into another world where everything was covered in white.
<br /><br /><b>The First View of Sonmarg Valley:</b>
<br />As we moved ahead, the Sonmarg valley opened up in front of us. Massive mountains stood tall, completely covered in snow, while the wide valley stretched endlessly with pure white beauty.
<br />It was one of those views where you just stop, look around, and forget everything else.
<br /><br /><b>Frozen River & Snow Landscapes:</b>
<br />One of the most surreal sights was the frozen river flowing through the valley. Parts of it were covered in ice, while some water still moved slowly beneath, creating a stunning contrast.
<br />The combination of mountains, snow, and the icy river made the entire place feel untouched and peaceful.
<br /><br /><b>Snow Activities & Fun:</b>
<br />We spent time playing in the snow, walking through soft white layers, and just enjoying the moment. Every step felt like walking inside a dream, and every laugh echoed through the silent valley.
<br />It wasn’t just about activities - it was about experiencing the joy of being there.
<br /><br /><b>Silence That Speaks:</b>
<br />What made Sonmarg truly special was its silence. No noise, no rush - just the sound of wind and the beauty of nature all around. It gave a kind of peace that’s hard to find anywhere else.
<br /><br /><b>A Place That Stays With You:</b>
<br />As we left Sonmarg, it didn’t feel like we were leaving a place - it felt like we were leaving a feeling behind.
<br />Sonmarg wasn’t just a destination, it was an experience that stays with you long after the journey ends ❄️</p>
`,
      lesson: {
        type: "emotional",
        text: "Nature heals in ways nothing else can 🌄"
      }
    },
    {
      id: 19,
      name: "Srinagar",
      state: "Jammu & Kashmir",
      coordinates: [74.7973, 34.0837],
      type: "City",
      color: "from-cyan-500 to-blue-600",
      photos: [
        { image: "/images/travel/srinagar/dal.jpg", title: "Dal Lake" },
        { image: "/images/travel/srinagar/dal.jpg", title: "Dal Lake" }
      ],
      stats: {
        type: "Leisure",
        budget: "₹2000",
        duration: "2 Days",
        travelers: "Friends"
      },
      story:
        "From shikara rides on Dal Lake to vibrant local markets, Srinagar blended culture, beauty, and calmness perfectly.",
      lesson: {
        type: "general",
        text: "Slow down and absorb the beauty around you 🛶"
      }
    },
    {
      id: 20,
      name: "Banihal",
      state: "Jammu & Kashmir",
      coordinates: [75.1960, 33.4365],
      type: "Mountain Town",
      color: "from-gray-600 to-blue-500",
      photos: [
        { image: "/images/travel/banihal/banihal1.jpg", title: "Banihal Station" },
        { image: "/images/travel/banihal/banihal2.jpg", title: "Banihal Station" }
      ],
      stats: {
        type: "Transit",
        budget: "₹20",
        duration: "2 Hours",
        travelers: "Friends"
      },
      story:
        `<h2><b>Dream Train Journey Through Snow: Banihal to Srinagar</b></h2>
<p>Some journeys don’t feel real - they feel like dreams. This was one of them. A simple train ride from Banihal to Srinagar turned into one of the most magical experiences of my life. Just ₹20 for a ticket, 78 km distance, and around 2 hours - but what we witnessed was priceless.
<br /><br /><b>The Beginning from Banihal:</b>
<br />We boarded the train from Banihal, a small station surrounded by towering mountains. The cold air hit our faces, and everything around us was covered in snow. Even before the train started, it felt like we were stepping into a different world.
<br /><br /><b>Snow Everywhere - A Moving Dream:</b>
<br />As the train slowly started moving, the real magic began. Snow-covered mountains stood tall on both sides, and the tracks themselves were layered with fresh snow. It felt unbelievable - a train literally moving through snow like something straight out of a movie.
<br />Every few minutes, we passed through tunnels carved inside mountains. As the train entered the dark tunnels and then suddenly emerged into bright white snowy landscapes, the contrast gave us goosebumps again and again.
<br /><br /><b>The Scenic Ride:</b>
<br />The entire route was filled with breathtaking views - frozen rivers, pine trees covered in snow, and small houses standing quietly in the valleys. The windows felt like a live cinematic screen, and we couldn’t take our eyes off them even for a second.
<br />At some points, snow was so close to the train that it felt like we could just stretch our hands and touch it.
<br /><br /><b>Only ₹20, But Worth a Million:</b>
<br />It’s hard to believe that such a world-class scenic journey costs just ₹20. No luxury, no fancy setup - just a simple train ride offering one of the most beautiful experiences nature can give.
<br /><br /><b>More Than Just a Journey:</b>
<br />This wasn’t just travel from one place to another. It was a reminder that sometimes the simplest journeys turn out to be the most extraordinary ones. Sitting by the window, watching endless snow and mountains, we felt completely lost in the moment.
<br /><br /><b>A Memory Frozen in Time:</b>
<br />By the time we reached Srinagar, we didn’t want the journey to end. It felt like waking up from a beautiful dream. That 2-hour ride gave us memories that will stay with us forever.
<br />This train journey wasn’t just about reaching Srinagar - it was about experiencing something magical, something unforgettable.</p>`,
      lesson: {
        type: "practical",
        text: "Journeys matter just as much as destinations 🚆"
      }
    },
    {
      id: 21,
      name: "Amritsar",
      state: "Punjab",
      coordinates: [74.8723, 31.6340],
      type: "Spiritual City",
      color: "from-yellow-500 to-orange-600",
      photos: [
        { image: "/images/travel/amritsar/golden-temple.jpg", title: "Golden Temple" },
        { image: "/images/travel/amritsar/golden-temple.jpg", title: "Golden Temple" }
      ],
      stats: {
        type: "Spiritual",
        budget: "₹1000",
        duration: "1 Day",
        travelers: "Friends"
      },
      story:
        "The Golden Temple’s calmness, the langar’s warmth, and the spiritual energy made Amritsar unforgettable.",
      lesson: {
        type: "emotional",
        text: "True peace comes from humility and service 🙏"
      }
    },
    {
      id: 22,
      name: "Attari–Wagah Border",
      state: "Punjab",
      coordinates: [74.5720, 31.6045],
      type: "Border Ceremony",
      color: "from-green-600 to-orange-500",
      photos: [
        { image: "/images/travel/wagah/wagah1.jpg", title: "Wagah Border Ceremony" },
        { image: "/images/travel/wagah/wagah2.jpg", title: "Wagah Border Ceremony" }
      ],
      stats: {
        type: "Experience",
        budget: "₹0",
        duration: "Few Hours",
        travelers: "Friends"
      },
      story:
        "The electrifying Wagah Border ceremony filled with patriotic energy, chants, and unity was an experience like no other.",
      lesson: {
        type: "general",
        text: "Unity and pride connect millions beyond borders 🇮🇳"
      }
    }
  ],


  posts: [
    {
      id: 11,
      destinationId: 20,
      title: "Dream Train Ride: Banihal to Srinagar",
      date: "Feb '26",
      category: "Scenic Journey",
      coverImage: "/images/stories/train.webp",
      excerpt: "A breathtaking train ride through Kashmir’s valleys - tunnels, snow peaks, and views that felt straight out of a dream.",
      readTime: "3 min read"
    },
    {
      id: 10,
      destinationId: 18,
      title: "Into the Valleys of Sonmarg",
      date: "Feb '26",
      category: "Nature Escape",
      coverImage: "/images/stories/sonmarg.webp",
      excerpt: "Golden meadows, icy rivers, and untouched beauty - Sonmarg was pure serenity in the Himalayas.",
      readTime: "4 min read"
    },
    {
      id: 9,
      destinationId: 17,
      title: "Snow Adventures in Gulmarg",
      date: "Feb '26",
      category: "Snow Experience",
      coverImage: "/images/stories/gulmarg.webp",
      excerpt: "From gondola rides to snow-covered landscapes - Gulmarg felt like a winter dream come alive.",
      readTime: "5 min read"
    },
    {
      id: 8,
      destinationId: 10,
      title: "Baralacha La Bike Expedition",
      date: "Sept '25",
      category: "Adventure Ride",
      coverImage: "/images/stories/baralacha.webp",
      excerpt: "A thrilling motorbike ride to Baralacha La Pass - 16,040 ft above sea level!",
      readTime: "6 min read"
    },
    {
      id: 7,
      destinationId: 7,
      title: "Journey to Shri Kedarnath",
      date: "May '26",
      category: "Spiritual Trek",
      coverImage: "/images/stories/kedarnath.webp",
      excerpt: "A sacred trek through the Himalayas to Kedarnath - where devotion meets endurance at 11,755 ft.",
      readTime: "5 min read"
    },
    {
      id: 6,
      destinationId: 2,
      title: "A Divine Journey to Tirupati - Sri Venkateswara Balaji",
      date: "Jul '25",
      category: "Divine Journey",
      coverImage: "/images/stories/tirupati.webp",
      excerpt: "The spiritual and divine experiences that touch your soul!",
      readTime: "7 min read"
    },
    {
      id: 5,
      destinationId: 1,
      title: "GOA Budget Trip",
      date: "Mar '25",
      category: "Unplanned Trip",
      coverImage: "/images/stories/goatrip.webp",
      excerpt: "Experience about a unplanned GOA Trip!",
      readTime: "5 min read"
    },
    {
      id: 4,
      destinationId: 16,
      title: "IIT Bombay Experience",
      date: "Feb '25",
      category: "Hackathon",
      coverImage: "/images/stories/iitb.webp",
      excerpt: "Representing ECell team at National Entrepreneurship Challenge IIT Bombay...",
      readTime: "2 min read"
    },
    {
      id: 3,
      destinationId: 4,
      title: "The Timeless Vibe of Banaras - City of Ghats, Gods & Ganga",
      date: "Jan '25",
      category: "Divine Journey",
      coverImage: "/images/stories/banaras.webp",
      excerpt: "Banaras (Varanasi), a city that feels alive with divinity!",
      readTime: "5 min read"
    },
    {
      id: 2,
      destinationId: 3,
      title: "A Thrilling Night at Kalsubai Shikhar",
      date: "Dec '24",
      category: "Thrilling Trek",
      coverImage: "/images/stories/kalsubai.webp",
      excerpt: "My night at Kalsubai Peak, the highest point in Maharashtra (5,400 ft)",
      readTime: "5 min read"
    },
    {
      id: 1,
      destinationId: 5,
      title: "A Solo Journey Through Konkan - Aarware, Ratnagiri & Ganpatipule",
      date: "Sept '24",
      category: "Solo Travel",
      coverImage: "/images/stories/aareware.webp",
      excerpt: "My solo trip to Konkan, covering Ratnagiri, Aarware, and Ganpatipule.",
      readTime: "5 min read"
    },
  ],

  // Animated Trip Stories (Instagram Highlights Style)
  tripHighlights: [
    {
      id: 1,
      title: "Pune Vibes",
      icon: "🏙️",
      color: "from-blue-400 to-cyan-500",
      stories: [
        {
          title: "Okayama Garden",
          image: "/images/travel/pune/pune1.webp",
          text: "A serene and lesser-known Japanese-style garden located in the heart of Pune.",
          tips: ["Visit during sunset for great photos", "Carry a book and relax by the lake", "Respect the quiet environment"]
        },
        {
          title: "Jambhulwadi Lake",
          image: "/images/travel/pune/pune2.webp",
          text: "A peaceful lakeside spot offering scenic views, perfect for unwinding away from city chaos.",
          tips: ["Best visited early morning", "Ideal spot for photography", "Avoid visiting during monsoon"]
        },
        {
          title: "Phoenix Mall of the Millennium",
          image: "/images/travel/pune/pune3.webp",
          text: "One of Pune’s biggest malls, showcasing global brands, entertainment zones, and eateries.",
          tips: ["Visit on weekdays to avoid crowds", "Check out seasonal décor", "Explore food court for variety"]
        },
        {
          title: "Bike Show",
          image: "/images/travel/pune/pune4.webp",
          text: "Showcase of iconic bikes and superbikes, offering a peek into biking culture in Pune.",
          tips: ["Talk to the owners for insights", "Don’t touch the bikes without permission", "Take great photos from all angles"]
        },
        {
          title: "Aagakhan Palace",
          image: "/images/travel/pune/pune5.webp",
          text: "An ancient fort with rustic charm and scenic surroundings, perfect for history lovers.",
          tips: ["Wear comfortable shoes", "Carry water and snacks", "Ideal for drones and 360 shots"]
        },
        {
          title: "Swaminarayan Tekadi",
          image: "/images/travel/pune/pune6.webp",
          text: "A spiritual and tranquil place with lush greenery and temple architecture.",
          tips: ["Maintain silence in temple areas", "Catch the sunset from the hilltop", "Great spot for meditation"]
        },
        {
          title: "Katraj Ghat – Bengaluru Highway",
          image: "/images/travel/pune/pune7.webp",
          text: "A scenic drive through the hills that offers views of the city at night.",
          tips: ["Ideal for late-night drives", "Be cautious of sharp turns", "Avoid weekends due to traffic"]
        },
        {
          title: "Khadakwasla Lake",
          image: "/images/travel/pune/pune8.webp",
          text: "A popular picnic spot with stunning sunsets and calm waters.",
          tips: ["Plan a picnic by the lakeside", "Watch out for sudden showers", "Visit during golden hour"]
        },
        {
          title: "Osho Garden",
          image: "/images/travel/pune/pune9.webp",
          text: "A tranquil garden with dense greenery, popular among meditators and nature lovers.",
          tips: ["Photography might be restricted", "Wear comfy walking shoes", "Take time to meditate"]
        },
        {
          title: "Phoenix Mall of the Millennium",
          image: "/images/travel/pune/pune10.webp",
          text: "A landmark destination for fashion, food, and entertainment in Pune.",
          tips: ["Check showtimes at PVR", "Explore everything floor-wise", "Try out the new pop-up stalls"]
        },
        {
          title: "Sky Walk Pune",
          image: "/images/travel/pune/pune11.webp",
          text: "A unique elevated pedestrian bridge offering city views and great architecture.",
          tips: ["Go at night to see the city lights", "Wear comfortable shoes", "Great for long exposure photography"]
        },
        {
          title: "Swaminarayan Tekdi",
          image: "/images/travel/pune/pune12.webp",
          text: "Another visit to the tranquil Swaminarayan hill, a great spot for peace and greenery.",
          tips: ["Walk all the way to the top", "Best visited early morning", "Respect temple customs"]
        },
        {
          title: "Taljai Tekdi",
          image: "/images/travel/pune/pune13.webp",
          text: "A lush hilltop known for its nature trails and panoramic city views.",
          tips: ["Best for early morning trekking", "Carry water", "Watch out for monkeys"]
        },
        {
          title: "Mahadji Shinde Chatri",
          image: "/images/travel/pune/pune14.jpeg",
          text: "A stunning memorial with detailed Maratha architecture and intricate carvings.",
          tips: ["Great for history and architecture lovers", "Visit in daylight for better detail", "Respect the heritage site"]
        }
      ]
    },
    {
      id: 2,
      title: "Night Vibes",
      icon: "🌃",
      color: "from-purple-500 to-indigo-600",
      stories: [
        {
          title: "Pune Laxmi Road",
          image: "/images/travel/pune/punen1.webp",
          text: "A bustling market street that transforms into a lively nightlife hub with food stalls and late-night shopping.",
          tips: ["Visit post 9 PM for night markets", "Try street food from popular stalls", "Be cautious with belongings"]
        },
        {
          title: "Jambhulwadi Lake",
          image: "/images/travel/pune/punen2.webp",
          text: "Beautifully quiet at night with moonlight reflecting off the lake - a hidden night-time gem.",
          tips: ["Carry a flashlight", "Avoid going alone", "Enjoy the peaceful atmosphere"]
        },
        {
          title: "Pune Buildings",
          image: "/images/travel/pune/punen3.webp",
          text: "The city’s skyline glows at night - perfect backdrop for long exposure photography.",
          tips: ["Use a tripod for better shots", "Find rooftops for great views", "Avoid isolated areas"]
        },
        {
          title: "Swaminarayan Temple",
          image: "/images/travel/pune/punen4.webp",
          text: "The Swaminarayan temple glows at night with its peaceful ambiance and spiritual atmosphere.",
          tips: ["Maintain silence inside", "Respect temple decorum", "Ideal for night photography"]
        },
        {
          title: "Swaminarayan Tekadi",
          image: "/images/travel/pune/punen5.webp",
          text: "A serene hill with temple lights offering a glowing view of the city and stars above.",
          tips: ["Click photos of illuminated architecture", "Wear warm clothes", "Avoid wandering off trails"]
        },
        {
          title: "Khadakwasla Dam",
          image: "/images/travel/pune/punen6.webp",
          text: "Night view of the dam with calm waters and occasional cool breeze - a perfect night escape.",
          tips: ["Go with a group", "Stay safe near water", "Watch for late-night fog"]
        },
        {
          title: "Swaminarayan Tekadi",
          image: "/images/travel/pune/punen7.webp",
          text: "Another night adventure at Tekadi, offering a great spot to relax under moonlight.",
          tips: ["Bring light snacks", "Best for calm conversations", "Carry a light jacket"]
        },
        {
          title: "Narhe Water Tank",
          image: "/images/travel/pune/punen8.webp",
          text: "An urban lookout point with views of Pune's skyline glowing under the night sky.",
          tips: ["Ideal for drone footage", "Avoid peak traffic times", "Preferably visit before midnight"]
        },
        {
          title: "Kumar Pacific Mall",
          image: "/images/travel/pune/punen9.webp",
          text: "A quiet yet modern mall at night, with lights reflecting off shiny glass exteriors.",
          tips: ["Check mall timings", "Include a quick dessert stop", "Great spot for urban photography"]
        },
        {
          title: "Taljai Tekadi",
          image: "/images/travel/pune/punen10.webp",
          text: "A refreshing nighttime trek spot with glowing cityscapes seen in the distance.",
          tips: ["Carry a torch", "Watch out for wildlife", "Wear sturdy shoes"]
        },
        {
          title: "Seasons Mall",
          image: "/images/travel/pune/punen11.webp",
          text: "One of Pune’s premium malls, glowing with neon signage and vibrant nightlife vibes.",
          tips: ["Try rooftop dining", "Choose weekdays for less rush", "Spot the LED fountains outside"]
        },
        {
          title: "Swaminarayan Tekadi",
          image: "/images/travel/pune/punen12.webp",
          text: "Another night visit to this beautiful spot - quiet, spiritual, and perfect for contemplation.",
          tips: ["Great for evening meditation", "Avoid disturbing temple prayer times", "Carry a water bottle"]
        },
        {
          title: "Jambhukwadi Bridge",
          image: "/images/travel/pune/punen13.webp",
          text: "A scenic bridge offering peaceful lake reflections and cool breezes at night.",
          tips: ["Stay safe on the roadside", "Prefer group visits", "Great for long exposure photography"]
        }
      ]
    }
  ]
};

// Helper Components
const GridBackground = ({ mode }) => (
  <div className="fixed inset-0 pointer-events-none opacity-20">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(${mode === 'techie' ? '#3b82f6' : '#f97316'} 1px, transparent 1px), linear-gradient(90deg, ${mode === 'techie' ? '#3b82f6' : '#f97316'} 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }} />
  </div>
);


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

const Header = () => {
  const { mode, setMode, theme, setTheme, menuOpen, setMenuOpen } = useAppContext();

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b ${theme === 'dark'
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
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              GaRa
            </div>
            <motion.div
              className={`absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-opacity ${mode === 'techie' ? 'bg-blue-500/30' : 'bg-orange-500/30'
                }`}
            />
          </motion.div>

          <div className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border ${theme === 'dark'
            ? mode === 'techie'
              ? 'bg-blue-500/10 border-blue-500/30'
              : 'bg-orange-500/10 border-orange-500/30'
            : mode === 'techie'
              ? 'bg-blue-50 border-blue-300'
              : 'bg-orange-50 border-orange-300'
            }`}>
            <motion.button
              onClick={() => setMode('techie')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${mode === 'techie'
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${mode === 'traveler'
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

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-3 rounded-full backdrop-blur-xl border ${theme === 'dark'
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
              className={`p-3 rounded-full backdrop-blur-xl border ${theme === 'dark'
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-black/5 border-black/10 text-gray-900'
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
    { id: 'map', label: 'Travel Map', icon: <MapIcon size={20} /> },
    { id: 'highlights', label: 'Trip Stories', icon: <Camera size={20} /> },
    { id: 'stories', label: 'Travel Blogs', icon: <BookOpen size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> }
  ];

  const items = mode === 'techie' ? techieItems : travelerItems;

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className={`fixed left-0 top-0 bottom-0 w-64 backdrop-blur-xl border-r z-50 ${theme === 'dark'
              ? mode === 'techie'
                ? 'bg-black/95 border-blue-500/20'
                : 'bg-black/95 border-orange-500/20'
              : mode === 'techie'
                ? 'bg-white/95 border-blue-300'
                : 'bg-white/95 border-orange-300'
              }`}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-6 border-b border-current border-opacity-20">
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  GaRa
                </h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/10'
                    }`}
                >
                  <X size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                </button>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {mode === 'techie' ? 'Computer Engineer' : 'Travel Enthusiast'}
              </p>
            </div>

            <nav className="p-4 space-y-2">
              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setMenuOpen(false);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${theme === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                    }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${mode === 'techie'
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                      : 'bg-gradient-to-r from-orange-500/20 to-pink-500/20'
                      }`}
                  />
                  <span className="relative z-10">{item.icon}</span>
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
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
            className={`text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r ${mode === 'techie'
              ? 'from-blue-500 via-purple-500 to-pink-500'
              : 'from-orange-500 via-pink-500 to-purple-500'
              } bg-clip-text text-transparent`}
          >
            GAURAV
          </motion.div>

          <motion.h2
            className={`text-2xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
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
            className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {mode === 'techie'
              ? 'Software Developer • Cloud Enthusiast • DevOps'
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
              className={`px-8 py-4 rounded-full font-bold text-white backdrop-blur-xl relative overflow-hidden group ${mode === 'techie'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                : 'bg-gradient-to-r from-orange-500 to-pink-500'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
            </motion.button>

            <motion.a
              href={mode === 'techie' ? '#projects' : '#map'}
              className={`px-8 py-4 rounded-full font-bold backdrop-blur-xl border-2 ${theme === 'dark'
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
              {mode === 'techie' ? 'View Projects' : 'Explore Map'}
            </motion.a>
          </motion.div>

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
                <StatCard icon={<MapPin />} value="60+" label="Destinations" color={mode} theme={theme} />
                <StatCard icon={<Plane />} value="8+" label="States" color={mode} theme={theme} />
                <StatCard icon={<Heart />} value="∞" label="Memories" color={mode} theme={theme} />
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
    className={`p-6 rounded-2xl backdrop-blur-xl border ${theme === 'dark'
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

// ── Under Construction Banner ─────────────────────────────────────
const UnderConstructionBanner = () => {
  const { theme, setMode } = useAppContext();
  return (
    <motion.div
      className="relative overflow-hidden mx-4 my-6 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated diagonal stripe overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6 0px, #3b82f6 20px, transparent 20px, transparent 40px)',
          backgroundSize: '56px 56px',
          animation: 'uc-stripes 2s linear infinite',
        }}
      />
      <div className={`relative flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-2 rounded-2xl backdrop-blur-xl ${theme === 'dark'
        ? 'bg-blue-500/10 border-blue-500/40'
        : 'bg-blue-50 border-blue-400'
        }`}>
        <div className="flex items-center gap-4">
          <motion.span
            className="text-3xl select-none"
            animate={{ rotate: [0, -12, 12, -8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
          >
            🚧
          </motion.span>
          <div>
            <p className={`font-black text-lg tracking-wide leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              Techie Section - Under Active Development
            </p>
            <p className={`text-sm mt-0.5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}>
              Some sections may be incomplete. Exciting updates coming soon! 🚀
            </p>
            <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Till then, why not explore the other side?
            </p>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 min-w-[200px]">
          {/* WIP badge */}
          <motion.div
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold shadow-lg shadow-blue-500/30"
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-white inline-block" />
            Work In Progress
          </motion.div>

          {/* Explore Traveler CTA */}
          <motion.button
            onClick={() => setMode('traveller')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✈️ Explore Traveler Gaurav
            <ChevronRight size={15} />
          </motion.button>
        </div>
      </div>
      <style>{`
        @keyframes uc-stripes {
          from { background-position: 0 0; }
          to   { background-position: 56px 56px; }
        }
      `}</style>
    </motion.div>
  );
};

const AboutSection = () => {
  const { mode, theme } = useAppContext();

  return (
    <section id="about" className="min-h-screen flex items-center px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-5xl md:text-6xl font-black mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            <span className={`bg-gradient-to-r ${mode === 'techie'
              ? 'from-blue-500 to-purple-500'
              : 'from-orange-500 to-pink-500'
              } bg-clip-text text-transparent`}>
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-xl border ${theme === 'dark'
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
                    title="Travel Style"
                    value="Budget & Solo"
                    subtitle="Authentic Experiences"
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
    className={`p-6 rounded-2xl backdrop-blur-xl border ${theme === 'dark'
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

// Interactive Travel Map Section
const InteractiveTravelMap = () => {
  const { theme, selectedDestination, setSelectedDestination } = useAppContext();
  const [hoveredDestination, setHoveredDestination] = useState(null);

  return (
    <section id="map" className="min-h-screen flex items-center px-4 py-12 relative overflow-hidden">
      {/* Topographic background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30 M15 15 Q30 20 45 15 M15 45 Q30 40 45 45' stroke='%238B7355' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Bold Adventure Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-600 to-amber-600" />
            <Navigation className="text-amber-600" size={32} />
            <div className="h-0.5 w-16 bg-gradient-to-r from-amber-600 via-amber-600 to-transparent" />
          </div>

          <h2 className={`text-6xl md:text-7xl font-black mb-3 uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Journey Map
            </span>
          </h2>

          <p className={`text-lg font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-amber-600/80' : 'text-amber-700'}`}>
            Explored Territories
          </p>
        </motion.div>

        {/* Map Container - Dark Navy with Vintage Aesthetic */}
        <div className="relative w-full max-w-5xl mx-auto">
          <motion.div
            className="relative overflow-hidden"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, #0A1929 0%, #1E3A5F 50%, #0A1929 100%)'
                : 'linear-gradient(135deg, #F5F3F0 0%, #E8E6E1 50%, #F5F3F0 100%)',
              border: theme === 'dark' ? '4px solid #8B7355' : '4px solid #654321',
              boxShadow: theme === 'dark'
                ? '0 25px 50px -12px rgba(217, 119, 66, 0.25), inset 0 2px 4px rgba(0,0,0,0.3)'
                : '0 25px 50px -12px rgba(139, 115, 85, 0.35), inset 0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '4px',
              aspectRatio: '4 / 3',
              position: 'relative'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Corner decorations - Vintage Map Style */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-amber-600/50 z-20" />
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-amber-600/50 z-20" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-amber-600/50 z-20" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-amber-600/50 z-20" />

            {/* Compass Rose - Top Right */}
            <div className="absolute top-6 right-6 z-20">
              <motion.div
                className={`w-20 h-20 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-black/40' : 'bg-white/60'
                  } backdrop-blur-sm border-2 border-amber-600/50 shadow-lg`}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <Navigation className="text-amber-600" size={32} />
              </motion.div>
            </div>

            {/* Map Content */}
            <div className="relative w-full h-full p-6">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [78.9629, 22.5937], scale: 1180 }}
                width={800}
                height={720}
                style={{ width: '100%', height: '100%' }}
              >
                <Geographies geography={indiaGeo}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={theme === "dark" ? "#1E3A5F" : "#D4C5B9"}
                        stroke={theme === "dark" ? "#8B7355" : "#654321"}
                        strokeWidth={0.8}
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none' },
                          pressed: { outline: 'none' }
                        }}
                      />
                    ))
                  }
                </Geographies>



                {/* Markers with improved visuals */}
                {travelerData.destinations.map((dest) => {
                  const [x, y] = [dest.coordinates[0], dest.coordinates[1]];
                  const isHovered = hoveredDestination?.id === dest.id;

                  return (
                    <Marker
                      key={dest.id}
                      coordinates={[x, y]}
                      onMouseEnter={(e) => {
                        // Get the map container's bounding rect
                        const mapContainer = e.target.closest('.relative.w-full.h-full');
                        const rect = mapContainer?.getBoundingClientRect() || { left: 0, top: 0 };

                        setHoveredDestination({
                          ...dest,
                          mouseX: e.clientX - rect.left,
                          mouseY: e.clientY - rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredDestination(null)}
                      onClick={() => setSelectedDestination(dest)}
                      style={{ cursor: "pointer" }}
                    >
                      <g>
                        {/* Outer glow - Gold/Amber */}
                        <circle
                          r={isHovered ? 16 : 12}
                          fill="url(#adventureGlow)"
                          opacity={isHovered ? 0.6 : 0.4}
                          style={{ transition: 'all 0.3s ease' }}
                        />

                        {/* Adventure Pin/Flag */}
                        <motion.path
                          d="M 0,-12 L 6,-6 L 0,0 L -6,-6 Z M 0,0 L 0,12"
                          fill="#D97706"
                          stroke="#F59E0B"
                          strokeWidth={1.5}
                          animate={isHovered ? { scale: 1.3, y: -2 } : { scale: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            filter: 'drop-shadow(0 3px 6px rgba(217, 119, 6, 0.6))'
                          }}
                        />

                        {/* Base circle */}
                        <circle
                          r={3}
                          cy={12}
                          fill="#654321"
                          stroke="#8B7355"
                          strokeWidth={1}
                        />

                        {/* Pulse on hover */}
                        {isHovered && (
                          <motion.circle
                            r={8}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth={2}
                            initial={{ r: 8, opacity: 1 }}
                            animate={{ r: 20, opacity: 0 }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "easeOut"
                            }}
                          />
                        )}
                      </g>
                    </Marker>
                  );
                })}

                {/* Gradient definitions */}
                <defs>
                  <radialGradient id="adventureGlow">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </ComposableMap>

              {/* Tooltip - Outside SVG */}
              <AnimatePresence>
                {hoveredDestination && (
                  <motion.div
                    className="absolute px-4 py-3 rounded border-2 shadow-2xl pointer-events-none z-50"
                    style={{
                      left: `${hoveredDestination.mouseX}px`,
                      top: `${hoveredDestination.mouseY - 80}px`,
                      background: theme === 'dark'
                        ? 'linear-gradient(135deg, #0A1929 0%, #1E3A5F 100%)'
                        : 'linear-gradient(135deg, #F5F3F0 0%, #E8E6E1 100%)',
                      borderColor: '#D97706',
                      backdropFilter: 'blur(12px)',
                      transform: 'translateX(-50%)'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-black text-sm text-amber-500 uppercase tracking-wide whitespace-nowrap">
                      {hoveredDestination.name}
                    </p>
                    <p className={`text-xs font-semibold mt-1 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {hoveredDestination.state}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Destination Details Modal - Rendered via Portal */}
        {selectedDestination && ReactDOM.createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
              style={{ zIndex: 9999 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDestination(null)}
            >
              <motion.div
                className={`map-modal-scroll relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-y-auto ${theme === 'dark'
                  ? 'bg-gray-900 border border-gray-800'
                  : 'bg-white border border-gray-200'
                  }`}
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Header with photo background */}
                {(() => {
                  const linkedPost = travelerData.posts.find(p => p.destinationId === selectedDestination.id);
                  const bgImage = linkedPost?.coverImage || selectedDestination.photos?.[0]?.image;
                  return (
                    <div className={`relative h-48 bg-gradient-to-r ${selectedDestination.color} flex items-center justify-center overflow-hidden`}>
                      {bgImage && (
                        <img
                          src={bgImage}
                          alt={selectedDestination.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="relative text-center text-white z-10">
                        <h2 className="text-4xl font-black mb-2 drop-shadow-lg">{selectedDestination.name}</h2>
                        <p className="text-xl opacity-90 drop-shadow">{selectedDestination.type}</p>
                      </div>
                    </div>
                  );
                })()}

                {/* Content */}
                <div className="p-8">
                  {/* Travel Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="text-orange-500" size={20} />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Type</span>
                      </div>
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {selectedDestination.stats.type}
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="text-green-500" size={20} />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Budget</span>
                      </div>
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {selectedDestination.stats.budget}
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="text-blue-500" size={20} />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Duration</span>
                      </div>
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {selectedDestination.stats.duration}
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="text-purple-500" size={20} />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Travelers</span>
                      </div>
                      <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {selectedDestination.stats.travelers}
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Story
                    </h3>
                    <div
                      className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                      dangerouslySetInnerHTML={{ __html: selectedDestination.story }}
                    />
                  </div>

                  {/* Lesson Learned */}
                  <motion.div
                    className={`p-6 rounded-2xl mb-6 ${selectedDestination.lesson.type === 'emotional'
                      ? theme === 'dark'
                        ? 'bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30'
                        : 'bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200'
                      : selectedDestination.lesson.type === 'practical'
                        ? theme === 'dark'
                          ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30'
                          : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
                        : theme === 'dark'
                          ? 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30'
                          : 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        {selectedDestination.lesson.type === 'emotional' ? (
                          <Heart className="text-pink-500 flex-shrink-0" size={28} />
                        ) : selectedDestination.lesson.type === 'practical' ? (
                          <Lightbulb className="text-blue-500 flex-shrink-0" size={28} />
                        ) : (
                          <Smile className="text-yellow-500 flex-shrink-0" size={28} />
                        )}
                      </motion.div>
                      <div>
                        <h4 className={`font-bold mb-2 text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          💡 Lesson Learned
                        </h4>
                        <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedDestination.lesson.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Photos with Carousel */}
                  {selectedDestination.photos.length > 0 && (
                    <div className="mt-6">
                      <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        📸 Photos {selectedDestination.photos.length > 1 && `(${selectedDestination.photos.length})`}
                      </h3>
                      {selectedDestination.photos.length === 1 ? (
                        // Single photo - full width
                        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                          <img
                            src={selectedDestination.photos[0].image}
                            alt={selectedDestination.photos[0].title}
                            className="w-full h-64 object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E📷 Image Not Available%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <div className={`p-3 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              {selectedDestination.photos[0].title}
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Multiple photos - scrollable carousel
                        <div className="relative">
                          <div className="photo-carousel-scroll flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                            {selectedDestination.photos.map((photo, idx) => (
                              <motion.div
                                key={idx}
                                className="flex-shrink-0 w-72 snap-center"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg hover:shadow-2xl transition-shadow">
                                  <div className="relative group">
                                    <img
                                      src={photo.image}
                                      alt={photo.title}
                                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                                      onError={(e) => {
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23374151" width="300" height="200"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E📷 Image Not Available%3C/text%3E%3C/svg%3E';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  <div className={`p-3 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
                                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                      {photo.title}
                                    </p>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                                      {idx + 1} / {selectedDestination.photos.length}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          {selectedDestination.photos.length > 2 && (
                            <div className="text-center mt-2">
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                                ← Scroll to see more photos →
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};

// Animated Trip Highlights (Instagram Style)
const TripHighlights = () => {
  const { theme } = useAppContext();
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openHighlight = (highlight) => {
    setSelectedHighlight(highlight);
    setCurrentStoryIndex(0);
  };

  const closeHighlight = () => {
    setSelectedHighlight(null);
    setCurrentStoryIndex(0);
  };

  const nextStory = () => {
    if (selectedHighlight && currentStoryIndex < selectedHighlight.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      closeHighlight();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <section id="highlights" className="min-h-screen flex items-center px-4 py-4">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Trip Highlights
          </span>
        </motion.h2>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-items-center">
          {travelerData.tripHighlights.map((highlight, index) => (
            <motion.button
              key={highlight.id}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openHighlight(highlight)}
            >
              <motion.div
                className={`w-34 h-34 rounded-full bg-gradient-to-r ${highlight.color} p-1 cursor-pointer`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                    } flex items-center justify-center text-4xl`}
                >
                  {highlight.icon}
                </div>
              </motion.div>
              <span
                className={`mt-3 text-sm font-semibold max-w-[100px] text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
              >
                {highlight.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Story Viewer (Instagram Style) */}
        <AnimatePresence>
          {selectedHighlight && (
            <motion.div
              className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHighlight}
            >
              {/* Progress bars */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 flex gap-2 z-10">
                {selectedHighlight.stories.map((_, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-white shadow-lg"
                      initial={{ width: '0%' }}
                      animate={{
                        width: idx === currentStoryIndex ? '100%' : idx < currentStoryIndex ? '100%' : '0%'
                      }}
                      transition={{
                        duration: idx === currentStoryIndex ? 4 : 0,
                        ease: "linear"
                      }}
                      onAnimationComplete={() => {
                        if (idx === currentStoryIndex) {
                          nextStory();
                        }
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Close button */}
              <motion.button
                onClick={closeHighlight}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={28} />
              </motion.button>

              {/* Story Content */}
              <motion.div
                key={currentStoryIndex}
                className="relative w-full max-w-md aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={selectedHighlight.stories[currentStoryIndex].image}
                    alt={selectedHighlight.stories[currentStoryIndex].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect fill="%23374151" width="400" height="600"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E📷 Image Not Available%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
                </div>

                {/* Navigation areas with visual hints */}
                <div className="absolute inset-0 flex">
                  {/* Left tap zone - Previous */}
                  <button
                    onClick={prevStory}
                    disabled={currentStoryIndex === 0}
                    className={`flex-1 group relative ${currentStoryIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {currentStoryIndex > 0 && (
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ChevronRight size={24} className="text-white rotate-180" />
                        </div>
                      </div>
                    )}
                  </button>
                  {/* Right tap zone - Next */}
                  <button
                    onClick={nextStory}
                    className="flex-1 group relative cursor-pointer"
                  >
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ChevronRight size={24} className="text-white" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-black mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {selectedHighlight.stories[currentStoryIndex].title}
                  </h3>
                  <p className="text-base mb-4 opacity-90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    {selectedHighlight.stories[currentStoryIndex].text}
                  </p>

                  {/* Tips */}
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-semibold opacity-90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>💡 Tips:</p>
                    {selectedHighlight.stories[currentStoryIndex].tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-orange-400 text-lg" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>•</span>
                        <span className="text-sm opacity-90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-20 left-6">
                  <motion.div
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${selectedHighlight.color} text-white font-bold text-sm shadow-lg`}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedHighlight.icon} {selectedHighlight.title}
                  </motion.div>
                </div>

                {/* Story counter */}
                <div className="absolute bottom-6 right-6">
                  <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
                    {currentStoryIndex + 1} / {selectedHighlight.stories.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Enhanced Stories Section with "Recreate This Trip" Button
const StoriesSection = () => {
  const { theme, selectedBlog, setSelectedBlog, showItinerary, setShowItinerary, setSelectedDestination } = useAppContext();

  const openStory = (post) => {
    // If the post has a linked destination, show destination preview instead
    if (post.destinationId) {
      const linkedDest = travelerData.destinations.find(d => d.id === post.destinationId);
      if (linkedDest) {
        setSelectedDestination(linkedDest);
        return;
      }
    }
    // Fall back to blog modal
    setSelectedBlog(post);
    setShowItinerary(false);
    document.body.style.overflow = 'hidden';
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    setShowItinerary(false);
    document.body.style.overflow = 'unset';
  };

  const copyItinerary = () => {
    const text = `${selectedBlog.title}\n\nItinerary:\n${selectedBlog.itinerary.map(day =>
      `Day ${day.day}: ${day.title}\n${day.activities.map(a => `- ${a}`).join('\n')}`
    ).join('\n\n')}\n\nBudget: ${selectedBlog.budget.total}\n${selectedBlog.budget.breakdown.map(b => `${b.item}: ${b.cost}`).join('\n')}\n\nPacking List:\n${selectedBlog.packingList.map(item => `- ${item}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    alert('Itinerary copied to clipboard! 📋');
  };

  return (
    <section id="stories" className="min-h-screen flex items-center px-4 py-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Travel Blogs
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {travelerData.posts.map((post, index) => {
            const isLinked = !!post.destinationId;
            return (
              <motion.div
                key={post.id}
                className={`rounded-3xl backdrop-blur-xl border overflow-hidden cursor-pointer group ${theme === 'dark'
                  ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50'
                  : 'bg-amber-50 border-amber-300 hover:border-amber-400'
                  }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => openStory(post)}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-500 to-orange-500">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-amber-600">
                      {post.category}
                    </span>
                    {isLinked && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-white flex items-center gap-1">
                        <MapPin size={10} /> On Map
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <span className="text-amber-500 flex items-center gap-1">
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

                  <div className="flex gap-2">
                    <button className="flex-1 text-amber-500 font-semibold flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                      {isLinked ? (
                        <><MapPin size={14} /> Explore Story <ChevronRight size={16} /></>
                      ) : (
                        <>Read Story <ChevronRight size={16} /></>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Blog Modal with Recreate Trip Feature */}
        <AnimatePresence>
          {selectedBlog && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-[9999] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBlog}
            >
              <div className="min-h-screen flex items-start justify-center p-4 py-4">
                <motion.article
                  className={`relative w-full max-w-4xl rounded-3xl overflow-hidden ${theme === 'dark'
                    ? 'bg-gray-900 border border-gray-800'
                    : 'bg-white border border-gray-200'
                    }`}
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeBlog}
                    className={`absolute top-6 right-6 z-20 p-3 rounded-full backdrop-blur-xl border transition-all ${theme === 'dark'
                      ? 'bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700'
                      : 'bg-white/80 border-gray-300 text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    <X size={24} />
                  </button>

                  {/* "Recreate This Trip" Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowItinerary(!showItinerary);
                    }}
                    className="absolute top-6 left-6 z-20 px-6 py-3 rounded-full font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      <MapIcon size={20} />
                      Recreate This Trip
                    </span>
                  </motion.button>

                  <div className="relative h-96 overflow-hidden bg-gradient-to-br from-amber-500 to-orange-500">
                    {selectedBlog.coverImage ? (
                      <img
                        src={selectedBlog.coverImage}
                        alt={selectedBlog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-white/90 text-amber-600 mb-4">
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

                  {/* Itinerary Panel (Slide-in) */}
                  <AnimatePresence>
                    {showItinerary && (
                      <motion.div
                        className={`absolute top-0 right-0 bottom-0 w-full md:w-96 overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                          } border-l ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} z-30`}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              Trip Guide
                            </h2>
                            <button
                              onClick={() => setShowItinerary(false)}
                              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                                }`}
                            >
                              <X size={20} />
                            </button>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mb-6">
                            <motion.button
                              onClick={copyItinerary}
                              className="flex-1 px-4 py-3 rounded-xl bg-blue-500 text-white font-semibold flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Copy size={18} />
                              Copy
                            </motion.button>
                            <motion.button
                              className="flex-1 px-4 py-3 rounded-xl bg-green-500 text-white font-semibold flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Share2 size={18} />
                              Share
                            </motion.button>
                          </div>

                          {/* Budget Breakdown */}
                          <div className={`p-4 rounded-xl mb-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                            }`}>
                            <h3 className={`font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                              <DollarSign className="text-green-500" size={20} />
                              Total Budget: {selectedBlog.budget.total}
                            </h3>
                            <div className="space-y-2">
                              {selectedBlog.budget.breakdown.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                                    {item.item}
                                  </span>
                                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {item.cost}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Itinerary */}
                          <div className="mb-6">
                            <h3 className={`font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                              <Navigation className="text-blue-500" size={20} />
                              Day-by-Day Itinerary
                            </h3>
                            <div className="space-y-4">
                              {selectedBlog.itinerary.map((day, idx) => (
                                <div key={idx} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                                  }`}>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                      {day.day}
                                    </div>
                                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                      {day.title}
                                    </h4>
                                  </div>
                                  <ul className="space-y-1 ml-10">
                                    {day.activities.map((activity, aidx) => (
                                      <li key={aidx} className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        • {activity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Map Route */}
                          <div className={`p-4 rounded-xl mb-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                            }`}>
                            <h3 className={`font-bold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                              <MapIcon className="text-red-500" size={20} />
                              Route
                            </h3>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {selectedBlog.mapRoute}
                            </p>
                          </div>

                          {/* Packing List */}
                          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                            }`}>
                            <h3 className={`font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                              <Package className="text-purple-500" size={20} />
                              Packing List
                            </h3>
                            <ul className="space-y-2">
                              {selectedBlog.packingList.map((item, idx) => (
                                <li key={idx} className={`text-sm flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                  }`}>
                                  <div className="w-4 h-4 rounded border-2 border-gray-400" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={`p-8 md:p-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                  />

                  <div className={`p-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                    }`}>
                    <button
                      onClick={closeBlog}
                      className={`w-full md:w-auto px-8 py-3 rounded-full font-bold transition-all ${theme === 'dark'
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
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

// Techie sections remain the same
const EducationSection = () => {
  const { theme } = useAppContext();

  return (
    <section id="education" className="min-h-screen flex items-center px-4 py-4">
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
          <motion.div
            className={`p-8 rounded-3xl backdrop-blur-xl border ${theme === 'dark'
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

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-xl border ${theme === 'dark'
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

            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-xl border ${theme === 'dark'
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

const SkillsSection = () => {
  const { theme } = useAppContext();

  return (
    <section id="skills" className="min-h-screen flex items-center px-4 py-4">
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
              className={`relative p-6 rounded-2xl backdrop-blur-xl border ${theme === 'dark'
                ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30'
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-300'
                } overflow-hidden group`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
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

const ProjectsSection = () => {
  const { theme } = useAppContext();

  return (
    <section id="projects" className="min-h-screen flex items-center px-4 py-4">
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
              className={`relative rounded-3xl backdrop-blur-xl border overflow-hidden group ${theme === 'dark'
                ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = ""; // fallback: hide broken images
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${theme === 'dark'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-purple-100 text-purple-700'
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${theme === 'dark'
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
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold border-2 transition-all ${theme === 'dark'
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
    <section id="achievements" className="min-h-screen flex items-center px-4 py-4">
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
    <section id="contact" className="min-h-screen flex items-center px-4 py-4">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className={`text-5xl md:text-6xl font-black mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className={`bg-gradient-to-r ${mode === 'techie'
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
                  className={`block p-5 rounded-2xl backdrop-blur-xl border transition-all group ${option.highlight
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
                  <div className={`mb-3 ${option.highlight
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
                  className={`block p-5 rounded-2xl backdrop-blur-xl border ${theme === 'dark'
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

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showWelcome, setShowWelcome] = useState(true);
  const [mode, setMode] = useState('techie');
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showItinerary, setShowItinerary] = useState(false);

  // Sync mode with URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/traveller' || path === '/traveler') {
      setMode('traveller');
    } else if (path === '/techie') {
      setMode('techie');
    }
  }, [location.pathname]);

  // Function to change mode and update URL
  const handleModeChange = (newMode) => {
    setMode(newMode);
    navigate(`/${newMode}`);
  };

  return (
    <AppContext.Provider value={{ mode, setMode: handleModeChange, theme, setTheme, menuOpen, setMenuOpen, selectedDestination, setSelectedDestination, selectedBlog, setSelectedBlog, showItinerary, setShowItinerary }}>
      <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'
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

            <main className="transition-all duration-300">
              <AnimatePresence mode="wait">
                {mode === 'techie' ? (
                  <motion.div
                    key="techie"
                    className="min-h-screen flex items-center justify-center pt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full max-w-3xl">
                      <UnderConstructionBanner />
                    </div>
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
                    <InteractiveTravelMap />
                    <StoriesSection />
                    <TripHighlights />
                    <ContactSection />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            <footer className={`py-8 text-center border-t ${theme === 'dark'
              ? 'bg-black/50 border-gray-800 text-gray-500'
              : 'bg-white/50 border-gray-200 text-gray-600'
              } backdrop-blur-xl`}>
              <p className="mb-2">©2026 Designed, Developed & Maintained By Gaurav Rasane</p>
              <p className="text-sm">Crafted with React + Framer Motion</p>
            </footer>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;