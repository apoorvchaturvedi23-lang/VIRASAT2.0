/**
 * VIRASAT — Historical Figures Dataset (data/figures.js)
 * 
 * Contains verified biographical and historical profiles of 10 legendary figures
 * who shaped India's civilization, empire building, and architectural heritage.
 */

export const figures = [
  {
    id: "shah-jahan",
    name: "Shah Jahan",
    title: "Fifth Mughal Emperor (Reigned 1628 – 1658 CE)",
    period: "Mughal Empire (17th Century)",
    lifespan: "1592 – 1666 CE",
    thumbnail: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Born Prince Khurram in Lahore in 1592, Shah Jahan ascended the Mughal throne in 1628. His thirty-year reign is universally recognized as the 'Golden Age' of Mughal architecture and imperial prosperity. A passionate connoisseur of arts, gems, and architecture, he transformed the empire's cities with monumentally scaled marble and sandstone complexes, including the Taj Mahal, the Red Fort of Delhi, and the Jama Masjid.",
    majorAchievements: [
      "Commissioned the world-famous Taj Mahal in Agra as a mausoleum for his beloved consort Mumtaz Mahal.",
      "Founded the new imperial capital city of Shahjahanabad (modern Old Delhi) and built the historic Red Fort.",
      "Commissioned the legendary gem-encrusted Peacock Throne (Takht-i-Taus) containing the Koh-i-Noor diamond.",
      "Commissioned the Jama Masjid of Delhi, one of the largest mosques in the world at the time."
    ],
    historicalSignificance: 
      "Shah Jahan elevated Indian architectural engineering to global acclaim by replacing red sandstone with translucent white marble adorned with delicate floral Pietra Dura inlay, creating an enduring aesthetic identity for the subcontinent.",
    associatedMonuments: ["taj-mahal", "red-fort", "agra-fort"],
    sources: [
      { title: "Archaeological Survey of India — Mughal Imperial History", url: "https://asi.nic.in/" },
      { title: "Encyclopaedia Britannica — Shah Jahan", url: "https://www.britannica.com/biography/Shah-Jahan" }
    ]
  },

  {
    id: "mumtaz-mahal",
    name: "Mumtaz Mahal",
    title: "Empress Consort of the Mughal Empire",
    period: "Mughal Empire (17th Century)",
    lifespan: "1593 – 1631 CE",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Born Arjumand Banu Begum in Agra into a noble Persian family, she was the niece of Empress Nur Jahan. She married Prince Khurram (later Shah Jahan) in 1612, who bestowed upon her the title 'Mumtaz Mahal' (Jewel of the Palace). Renowned for her intelligence, compassion, and political counsel, she accompanied her husband on military campaigns throughout the empire until her untimely passing in Burhanpur in 1631.",
    majorAchievements: [
      "Trusted custodian of the imperial seal (Muhr-i-Uzuk), conferring royal approval upon imperial decrees.",
      "Patronized poets, scholars, and established charitable endowments providing pensions and dowries for impoverished daughters.",
      "Her enduring memory inspired the construction of the Taj Mahal, recognized as the world's greatest monument dedicated to love."
    ],
    historicalSignificance: 
      "Mumtaz Mahal was one of the most influential empresses in Mughal history, whose tragic passing spurred the creation of the UNESCO World Heritage Taj Mahal complex.",
    associatedMonuments: ["taj-mahal"],
    sources: [
      { title: "Encyclopaedia Britannica — Mumtaz Mahal", url: "https://www.britannica.com/biography/Mumtaz-Mahal" }
    ]
  },

  {
    id: "ashoka-the-great",
    name: "Ashoka the Great",
    title: "Third Mauryan Emperor (Reigned c. 268 – 232 BCE)",
    period: "Mauryan Empire (3rd Century BCE)",
    lifespan: "c. 304 – 232 BCE",
    thumbnail: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Ashoka ruled over almost the entire Indian subcontinent from his capital in Pataliputra (modern Patna). Following the catastrophic human devastation of the Kalinga War around 261 BCE, he experienced deep remorse and renounced military conquest (Digvijaya) in favor of righteous moral conquest (Dharmavijaya). He converted to Buddhism and propagated Ahimsa (non-violence), religious tolerance, and welfare across Asia.",
    majorAchievements: [
      "Erected monumental polished sandstone Pillars of Ashoka and rock edicts inscribed in Brahmi script across India.",
      "Commissioned the original Great Stupa at Sanchi and distributed the Buddha's relics across 84,000 stupas.",
      "Adopted the Lion Capital of Ashoka at Sarnath, which serves today as the National Emblem of India.",
      "Dispatched Buddhist peace and diplomatic missions across Sri Lanka, Greece, Egypt, and Syria, turning Buddhism into a world religion."
    ],
    historicalSignificance: 
      "Regarded as one of history's most enlightened rulers, Ashoka created the wheel of Dharma (Ashoka Chakra) featured at the center of modern India's national flag.",
    associatedMonuments: ["sanchi-stupa"],
    sources: [
      { title: "Archaeological Survey of India — Ashokan Inscriptions & Sanchi", url: "https://asi.nic.in/" },
      { title: "Encyclopaedia Britannica — Ashoka", url: "https://www.britannica.com/biography/Ashoka" }
    ]
  },

  {
    id: "akbar-the-great",
    name: "Akbar the Great",
    title: "Third Mughal Emperor (Reigned 1556 – 1605 CE)",
    period: "Mughal Empire (16th Century)",
    lifespan: "1542 – 1605 CE",
    thumbnail: "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Ascending the throne at just 13 years old under regent Bairam Khan, Jalal-ud-din Muhammad Akbar vastly expanded the Mughal Empire across Northern, Western, and Central India. He pioneered a syncretic philosophy of Sulh-i-Kul (universal peace and religious harmony), abolished the pilgrim tax and Jizya on non-Muslims, and integrated Rajput rulers into senior imperial administration.",
    majorAchievements: [
      "Founded the planned red sandstone capital city of Fatehpur Sikri and erected the 54-meter Buland Darwaza.",
      "Rebuilt and expanded the massive red sandstone Agra Fort as the administrative center of the empire.",
      "Established the Ibadat Khana (House of Worship) where scholars of Hinduism, Islam, Christianity, Jainism, and Zoroastrianism engaged in interfaith dialogue.",
      "Introduced the standardized Mansabdari military and revenue administration system."
    ],
    historicalSignificance: 
      "Akbar synthesized Persian, Rajput, and indigenous Indian traditions to create a unified, tolerant, and cosmopolitan subcontinental empire.",
    associatedMonuments: ["fatehpur-sikri", "agra-fort", "humayuns-tomb"],
    sources: [
      { title: "Encyclopaedia Britannica — Akbar", url: "https://www.britannica.com/biography/Akbar" }
    ]
  },

  {
    id: "maharana-pratap",
    name: "Maharana Pratap",
    title: "13th King of Mewar (Reigned 1572 – 1597 CE)",
    period: "Rajput History (16th Century)",
    lifespan: "1540 – 1597 CE",
    thumbnail: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Maharana Pratap Singh I was the Hindu Rajput ruler of Mewar in northwestern India. Unlike other contemporary Rajput rulers who formed matrimonial and political alliances with the Mughal court, Pratap refused to surrender Mewar's sovereignty to Emperor Akbar, leading to the historic Battle of Haldighati in 1576 alongside his faithful warhorse Chetak.",
    majorAchievements: [
      "Led the legendary Battle of Haldighati in 1576 against the Mughal forces led by Man Singh of Amer.",
      "Pioneered early guerrilla warfare tactics in the rugged Aravalli hills to reclaim Western Mewar territory.",
      "Established the fortified temporary capital at Chavand and patronized the Mewar school of miniature painting."
    ],
    historicalSignificance: 
      "Celebrated across India as an immortal symbol of unyielding courage, independence, and patriotic self-respect.",
    associatedMonuments: ["amer-fort"],
    sources: [
      { title: "National Portal of India — Freedom & Heritage", url: "https://www.india.gov.in/" }
    ]
  },

  {
    id: "chhatrapati-shivaji-maharaj",
    name: "Chhatrapati Shivaji Maharaj",
    title: "Founder of the Maratha Empire (Coronated 1674 CE)",
    period: "Maratha Empire (17th Century)",
    lifespan: "1630 – 1680 CE",
    thumbnail: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Born at the hill fort of Shivneri in 1630, Shivaji Bhonsle carved out an independent Maratha kingdom from the declining Adilshahi Sultanate of Bijapur and resisted the expansionist Mughal Empire. He was officially crowned Chhatrapati (Paramount Sovereign) at Raigad Fort in 1674, establishing Hindavi Swarajya (self-rule) rooted in administrative efficiency, religious tolerance, and maritime power.",
    majorAchievements: [
      "Pioneered 'Ganimi Kava' (innovative guerrilla warfare) utilizing the Sahyadri mountains' rugged terrain.",
      "Created the Maratha Navy (Father of the Indian Navy) and built coastal forts like Sindhudurg and Vijaydurg.",
      "Erected and fortified over 300 hill and coastal forts across Western India.",
      "Established the Ashtapradhan (Council of Eight Ministers) to govern with code of conduct and equality."
    ],
    historicalSignificance: 
      "Shivaji revived indigenous military and naval traditions, inspiring future generations of Indian freedom fighters. Mumbai's UNESCO World Heritage terminus is named in his honor.",
    associatedMonuments: ["csmt-mumbai"],
    sources: [
      { title: "Maharashtra State Archaeology & History Portal", url: "https://maharashtra.gov.in/" },
      { title: "Encyclopaedia Britannica — Shivaji", url: "https://www.britannica.com/biography/Shivaji" }
    ]
  },

  {
    id: "rani-lakshmibai",
    name: "Rani Lakshmibai",
    title: "Queen of the Maratha Princely State of Jhansi",
    period: "Indian Rebellion of 1857",
    lifespan: "1828 – 1858 CE",
    thumbnail: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Born Manikarnika Tambe in Varanasi, she married Maharaja Gangadhar Rao of Jhansi in 1842. When the British East India Company under Lord Dalhousie refused to recognize her adopted son and annexed her state under the 'Doctrine of Lapse', she raised a rebellion with the immortal battle cry 'Main apni Jhansi nahi doongi' (I will not surrender my Jhansi). She fought on horseback leading troops in the 1857 Uprising until her martyrdom in Gwalior in 1858.",
    majorAchievements: [
      "Led the fierce armed defense of Jhansi fortress against the British East India Company's army under Sir Hugh Rose.",
      "Fought as a female military commander in active combat, training female regiments in horsemanship and archery.",
      "United forces with rebel leaders Tatya Tope and Rao Sahib to capture Gwalior Fort in 1858."
    ],
    historicalSignificance: 
      "Even British General Hugh Rose described her as 'the bravest and best military leader of the rebels'. She remains India's premier icon of female valor and anti-colonial resistance.",
    associatedMonuments: ["red-fort"],
    sources: [
      { title: "National Archives of India — 1857 Freedom Struggle", url: "https://nationalarchives.nic.in/" }
    ]
  },

  {
    id: "sardar-vallabhbhai-patel",
    name: "Sardar Vallabhbhai Patel",
    title: "First Deputy Prime Minister & Home Minister of India (Iron Man of India)",
    period: "Modern India & Freedom Struggle (20th Century)",
    lifespan: "1875 – 1950 CE",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Born in Nadiad, Gujarat, Sardar Patel was a brilliant barrister who joined Mahatma Gandhi's non-violent freedom movement following the Kheda and Bardoli peasant Satyagrahas. Following Indian Independence in 1947, he accomplished the monumental diplomatic and administrative feat of integrating over 565 disparate princely states into a unified, sovereign Union of India without civil war.",
    majorAchievements: [
      "Integrated 565+ princely states into the sovereign Republic of India through diplomatic persuasion and firmness.",
      "Created the modern All India Administrative Services (IAS and IPS), calling them the 'Steel Frame of India'.",
      "Restored the historic Somnath Temple in Gujarat as an independent national cultural initiative.",
      "Commemorated by the 182-meter Statue of Unity in Gujarat, the tallest statue in the world."
    ],
    historicalSignificance: 
      "Known as the 'Architect of Modern India' and the 'Iron Man of India', whose decisive leadership preserved the geographical and constitutional integrity of the nation.",
    associatedMonuments: ["jallianwala-bagh"],
    sources: [
      { title: "National Portal of India — Sardar Patel Legacy", url: "https://www.india.gov.in/" }
    ]
  },

  {
    id: "gautama-buddha",
    name: "Gautama Buddha",
    title: "Siddhartha Gautama — The Enlightened One",
    period: "Ancient India (c. 6th – 5th Century BCE)",
    lifespan: "c. 563 – 483 BCE",
    thumbnail: "https://images.unsplash.com/photo-1621831873866-d4b71af50162?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Born Prince Siddhartha of the Shakya clan in Lumbini, he renounced a life of royal luxury at age 29 to seek the cessation of human suffering. After years of ascetic meditation, he attained supreme enlightenment (Bodhi) beneath a pipal tree in Bodh Gaya. He delivered his first sermon (Dharmachakrapravartana) at Sarnath, establishing Buddhism and the Four Noble Truths and the Noble Eightfold Path.",
    majorAchievements: [
      "Founded Buddhism, one of the world's major spiritual and philosophical traditions.",
      "Formulated the Middle Way (Madhyamaka), rejecting both extreme hedonism and extreme self-mortification.",
      "Inspired monumental Buddhist art, stupas, rock-cut monasteries, and edicts across India, China, Japan, and Southeast Asia."
    ],
    historicalSignificance: 
      "The Buddha's teachings on compassion (Karuna), non-violence (Ahimsa), and mindfulness profoundly transformed Asian civilization and gave rise to masterpieces like Sanchi and the Ajanta Caves.",
    associatedMonuments: ["sanchi-stupa", "ajanta-caves"],
    sources: [
      { title: "UNESCO World Heritage Centre — Buddhist Heritage of India", url: "https://whc.unesco.org/" }
    ]
  },

  {
    id: "rajaraja-chola-i",
    name: "Rajaraja Chola I",
    title: "Emperor of the Chola Empire (Reigned 985 – 1014 CE)",
    period: "Chola Dynasty (10th – 11th Century CE)",
    lifespan: "947 – 1014 CE",
    thumbnail: "https://images.unsplash.com/photo-1621831873866-d4b71af50162?auto=format&fit=crop&w=800&q=80",
    biography: 
      "Arunmozhivarman ascended the Chola throne in 985 CE as Rajaraja I ('King of Kings'). Under his leadership, the Chola Empire expanded across Southern India, Sri Lanka, and the Maldives. He transformed the empire into a formidable maritime and economic power that dominated trade across the Indian Ocean and built monumental granaries, irrigation networks, and temples.",
    majorAchievements: [
      "Built the monumental Brihadisvara Temple (Peruvudaiyar Kovil) in Thanjavur, one of the tallest granite temple vimanas in the world.",
      "Conducted a comprehensive land survey and standardized revenue assessment across the empire in 1000 CE.",
      "Commissioned maritime naval expeditions that secured Indian Ocean trade routes linking South India to Southeast Asia and China.",
      "Instituted systematic stone epigraphy, recording administrative and cultural history on temple granite walls."
    ],
    historicalSignificance: 
      "Rajaraja Chola I established the golden age of Tamil Dravidian architecture and bronze metallurgy, paving the way for the Great Living Chola Temples recognized by UNESCO.",
    associatedMonuments: ["mahabalipuram"],
    sources: [
      { title: "Tamil Nadu Heritage Board & ASI", url: "https://asi.nic.in/" }
    ]
  }
];
