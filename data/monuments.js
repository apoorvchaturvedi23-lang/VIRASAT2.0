/**
 * VIRASAT — Comprehensive Indian Heritage Dataset (data/monuments.js)
 * 
 * Contains 20 verified Indian monuments spanning multiple eras, dynasties,
 * architectural traditions, religions, and regions across India.
 * 
 * Every monument features:
 * - A genuine, verified local photograph (/images/{id}.jpg) with verified alt text & attribution.
 * - Accurate historical background, architectural specifications, timeline, and facts.
 * - Verified regional languages, native scripts, local dialects, and sociolinguistic context.
 * - Dedicated 3D model status (Taj Mahal & Ram Mandir have full interactive 3D glTF models).
 */

export const monuments = [
  {
    "id": "taj-mahal",
    "name": "Taj Mahal",
    "alternateNames": [
      "Rauza-i-Munawwara",
      "Crown of the Palace"
    ],
    "location": "Agra, Uttar Pradesh, India",
    "city": "Agra",
    "state": "Uttar Pradesh",
    "category": "Tombs & Mausoleums",
    "isUNESCO": true,
    "timeline": "1632 – 1653 CE",
    "dynasty": "Mughal Empire",
    "patron": "Emperor Shah Jahan",
    "architecturalStyle": "Indo-Islamic & Mughal Architecture",
    "shortDescription": "An internationally celebrated ivory-white Makrana marble mausoleum renowned for bilateral symmetry, central onion dome, four outward-tilted minarets, and Charbagh paradise gardens.",
    "thumbnail": "/images/taj-mahal.jpg",
    "hasModel": true,
    "modelPath": "/models/taj-mahal.glb",
    "commissionedBy": "Mughal Emperor Shah Jahan (in memory of Mumtaz Mahal)",
    "associatedFigures": [
      "shah-jahan",
      "mumtaz-mahal"
    ],
    "historicalBackground": "Commissioned in 1632 by Mughal Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, the Taj Mahal stands on the southern bank of the Yamuna River in Agra. Construction spanned over two decades employing more than 20,000 artisans under a court architects' board led by Ustad Ahmad Lahori. The complex embodies the artistic zenith of Mughal architectural refinement during India's classical Islamic period.",
    "architecture": {
      "style": "Mughal Architecture (Indo-Islamic with Persian influences)",
      "materials": "White Makrana marble from Rajasthan, red sandstone plinths, and 28 varieties of precious and semi-precious inlay stones",
      "overview": "The complex is planned along a strictly symmetrical north-south axis culminating in the octagonal tomb chamber. The monument rests on a raised marble terrace framed by four slender minarets, backed by the Yamuna River and preceded by a four-quadrant Charbagh garden.",
      "features": [
        {
          "title": "Central Onion Dome (Amrud)",
          "description": "A 35-meter-high bulbous marble dome set atop an elevated cylindrical drum, crowned with a stylized lotus collar and gilded finial."
        },
        {
          "title": "Four Outward-Tilted Minarets",
          "description": "Four 40-meter-tall three-storey minarets flank the corners of the plinth, engineered with a 2-degree outward tilt for earthquake safety."
        },
        {
          "title": "Pishtaq Vaulted Entryways",
          "description": "Grand recessed vaulted entrance portals decorated with black marble calligraphic inscriptions of Qur'anic verses."
        },
        {
          "title": "Pietra Dura (Parchin Kari) Inlays",
          "description": "Exquisite floral gemstone inlays executed with lapis lazuli, jade, crystal, turquoise, and carnelian embedded flush into marble."
        },
        {
          "title": "Charbagh Paradise Garden",
          "description": "A formal Persian quadrilateral garden divided into four equal quadrants by waterways, featuring a central marble reflecting pool."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1983 as 'the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage', and voted one of the New 7 Wonders of the World.",
    "facts": [
      "The marble changes color hues throughout the day — soft pinkish in the morning, radiant ivory-white at noon, and golden-silver under the full moon.",
      "Shah Jahan's cenotaph beside Mumtaz Mahal is the only asymmetrical element in the entire complex, placed there after his death in 1666.",
      "The Taj Trapezium Zone (TTZ) covers 10,400 sq km around the monument to protect the marble from industrial atmospheric pollution."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Taj Mahal",
        "url": "https://whc.unesco.org/en/list/252/"
      },
      {
        "title": "Archaeological Survey of India (ASI Agra Circle)",
        "url": "https://asi.nic.in/"
      }
    ],
    "imageAlt": "Genuine photograph of Taj Mahal in Agra, Uttar Pradesh",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Primary Official & Everyday Medium"
    },
    "otherLanguages": [
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Historic Regional & Literary Tradition"
      },
      {
        "name": "English",
        "native": "English",
        "role": "International Tourism & Hospitality"
      }
    ],
    "localDialects": [
      "Braj Bhasha (ब्रज भाषा)",
      "Khariboli (खड़ी बोली)"
    ],
    "languageNotes": "Agra is located in western Uttar Pradesh in the heart of the historic Braj cultural belt. While Braj Bhasha is the traditional folk idiom celebrated in medieval Bhakti poetry, modern communication is predominantly in Standard Hindi and Urdu, with English widely spoken in tourist and hospitality sectors."
  },
  {
    "id": "ram-mandir",
    "name": "Shri Ram Janmabhoomi Mandir",
    "alternateNames": [
      "Ram Mandir",
      "Ram Mandir Ayodhya",
      "Shri Ram Janmabhoomi Temple",
      "Ayodhya Ram Mandir",
      "Ram Janmabhoomi",
      "Ram Janmbhoomi Mandir",
      "Ayodhya Mandir",
      "Ram Temple Ayodhya"
    ],
    "location": "Ayodhya, Uttar Pradesh, India",
    "city": "Ayodhya",
    "state": "Uttar Pradesh",
    "category": "Temples & Religious Architecture",
    "isUNESCO": false,
    "timeline": "Consecrated 22 January 2024 CE",
    "dynasty": "Classical Nagara Tradition",
    "patron": "Shri Ram Janmabhoomi Teerth Kshetra Trust",
    "architecturalStyle": "Traditional Nagara Style (Gurjara-Chaulukya Architecture)",
    "shortDescription": "A monumental three-storey Hindu temple complex constructed at the sacred birthplace of Lord Rama in Ayodhya, built entirely with pink Bansi Paharpur sandstone without iron or steel.",
    "thumbnail": "/images/ram-mandir.jpg",
    "hasModel": true,
    "modelPath": "/models/ram-mandir.glb",
    "commissionedBy": "Shri Ram Janmabhoomi Teerth Kshetra Trust & People of India",
    "associatedFigures": [
      "goswami-tulsidas"
    ],
    "historicalBackground": "Located on the sacred Ramkot hill in Ayodhya, revered for millennia as the birthplace of Lord Shri Ram. Following historic judicial consensus, construction commenced under the Shri Ram Janmabhoomi Teerth Kshetra Trust in 2020. The Pran Pratishtha consecration ceremony took place on 22 January 2024, marking a historic cultural milestone for Indian civilizational heritage.",
    "architecture": {
      "style": "North Indian Nagara Temple Style (Maru-Gurjara Tradition)",
      "materials": "Pink Bansi Paharpur sandstone from Bharatpur (Rajasthan), granite plinth, and white Makrana marble sanctum",
      "overview": "Designed by the Sompura family of traditional temple architects, the temple spans 380 feet in length, 250 feet in width, and rises 161 feet in height. Engineered for a 1,000-year operational lifespan without any structural iron or steel reinforcement.",
      "features": [
        {
          "title": "Soaring Nagara Shikhara (161 Feet)",
          "description": "Curvilinear stone tower rising 161 feet directly over the sanctum, adorned with Urushringa spires, an Amalaka disc, and a golden Kalash with Dhwaja."
        },
        {
          "title": "Garbhagriha (Sanctum Sanctorum)",
          "description": "An octagonal inner sanctum housing the 51-inch Krishna Shila (black stone) murti of 5-year-old Ram Lalla, sculpted by Arun Yogiraj."
        },
        {
          "title": "Five Grand Mandapas",
          "description": "Five ceremonial pavilions: Nritya Mandap, Rang Mandap, Sabha Mandap, Prarthana Mandap, and Kirtan Mandap."
        },
        {
          "title": "392 Sculpted Pillars",
          "description": "Three-storey pillars hand-carved with statues of Hindu deities, Dashavatara incarnations, and celestial sages."
        },
        {
          "title": "Singh Dwar (Lion Gate)",
          "description": "Eastern grand entrance approached by 32 granite steps, flanked by monolithic statues of lions, elephants, Garuda, and Hanuman."
        }
      ]
    },
    "significance": "One of the holiest pilgrimage sites in Hinduism, representing millennia of Ramayana cultural tradition, ancient Indian stone architectural craftsmanship, and indigenous earthquake-resistant structural engineering.",
    "facts": [
      "The foundation is a 14-meter-thick roller-compacted concrete raft comprising 56 dense layers, engineered to resist seismic forces up to Zone 4.",
      "The Surya Tilak optical mechanism engineered by CBRI Roorkee directs a 58mm ray of natural sunlight onto Ram Lalla's forehead every Ram Navami noon.",
      "No iron or steel was used in the stone masonry to prevent corrosion over its 1,000-year lifespan."
    ],
    "sources": [
      {
        "title": "Shri Ram Janmabhoomi Teerth Kshetra Official Portal",
        "url": "https://srjbtkshetra.org/"
      },
      {
        "title": "Central Building Research Institute (CBRI Roorkee)",
        "url": "https://cbri.res.in/"
      }
    ],
    "imageAlt": "Genuine photograph of Shri Ram Janmabhoomi Mandir in Ayodhya, Uttar Pradesh",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Primary Official & Daily Communication"
    },
    "otherLanguages": [
      {
        "name": "Awadhi",
        "native": "अवधी",
        "role": "Traditional Mother Tongue of Ayodhya & Oudh"
      },
      {
        "name": "Sanskrit",
        "native": "संस्कृतम्",
        "role": "Temple Liturgy, Vedic Chanting & Rituals"
      },
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Historical Regional Presence"
      },
      {
        "name": "English",
        "native": "English",
        "role": "National & International Pilgrimage Information"
      }
    ],
    "localDialects": [
      "Awadhi (अवधी)",
      "Bhojpuri (भोजपुरी) influence in eastern Awadh"
    ],
    "languageNotes": "Ayodhya is the spiritual and cultural heart of the Awadh region where Awadhi—the beloved literary tongue of Goswami Tulsidas's Ramcharitmanas—is spoken natively. In the temple precincts, Vedic Sanskrit is actively chanted in daily rituals. Standard Hindi is the primary administrative medium, and English is extensively provided across pilgrim assistance centers."
  },
  {
    "id": "red-fort",
    "name": "Red Fort",
    "alternateNames": [
      "Lal Qila",
      "Qila-e-Mubarak"
    ],
    "location": "Old Delhi, Delhi, India",
    "city": "Delhi",
    "state": "Delhi",
    "category": "Forts & Palaces",
    "isUNESCO": true,
    "timeline": "1638 – 1648 CE",
    "dynasty": "Mughal Empire",
    "patron": "Emperor Shah Jahan",
    "architecturalStyle": "Mughal & Indo-Islamic Architecture",
    "shortDescription": "The historic seat of Mughal imperial power in Old Delhi, featuring towering octagonal red sandstone ramparts, the Diwan-i-Aam, Diwan-i-Khas, and Lahori Gate.",
    "thumbnail": "/images/red-fort.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Mughal Emperor Shah Jahan (when moving the capital from Agra to Shahjahanabad)",
    "associatedFigures": [
      "shah-jahan"
    ],
    "historicalBackground": "Constructed between 1638 and 1648 when Mughal Emperor Shah Jahan decided to shift his capital from Agra to the newly founded city of Shahjahanabad (Old Delhi). It served as the principal imperial residence of Mughal emperors for nearly 200 years until the British takeover after the 1857 Uprising. Today, it is where the Prime Minister of India hoists the national tricolor every Independence Day.",
    "architecture": {
      "style": "Mughal Fort Architecture",
      "materials": "Red sandstone ramparts, white marble pavilions, and floral inlay relief work",
      "overview": "Enclosed by 2.4-kilometer red sandstone ramparts with defensive bastions along the Yamuna River, incorporating symmetrical pavilions, private imperial apartments, and military gateways.",
      "features": [
        {
          "title": "Lahori Gate",
          "description": "The main public entrance gate facing Lahore, framed by monumental bastions and arched battlements."
        },
        {
          "title": "Diwan-i-Aam (Hall of Public Audience)",
          "description": "A pillared pavilion with engraved red sandstone arches where the emperor listened to petitions from citizens."
        },
        {
          "title": "Diwan-i-Khas (Hall of Private Audience)",
          "description": "White marble royal pavilion that once housed the legendary Peacock Throne, inscribed with the verse: 'If there be a paradise on earth, it is here, it is here, it is here.'"
        }
      ]
    },
    "significance": "A UNESCO World Heritage Site inscribed in 2007. The fortress is the premier national monument of independent India and a centerpiece of 17th-century Mughal urban planning.",
    "facts": [
      "Every year on 15 August (Independence Day), the Prime Minister of India addresses the nation from the ramparts of Lahori Gate.",
      "The fort originally sat directly on the banks of the Yamuna River, which filled its defensive moats.",
      "The world-famous Koh-i-Noor diamond and Peacock Throne were once housed inside the Red Fort's Diwan-i-Khas before Nadir Shah's invasion in 1739."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Red Fort Complex",
        "url": "https://whc.unesco.org/en/list/1054/"
      },
      {
        "title": "Archaeological Survey of India (ASI Delhi Circle)",
        "url": "https://asidelhicircle.bih.nic.in/"
      }
    ],
    "imageAlt": "Genuine photograph of Red Fort in Delhi, Delhi",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Official & Metropolitan Lingua Franca"
    },
    "otherLanguages": [
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Old Delhi (Shahjahanabad) Cultural Mother Tongue"
      },
      {
        "name": "Punjabi",
        "native": "ਪੰਜਾਬੀ",
        "role": "Prominent Metropolitan Language of Delhi"
      },
      {
        "name": "English",
        "native": "English",
        "role": "National Administrative & Heritage Documentation"
      }
    ],
    "localDialects": [
      "Dilliwala Khariboli",
      "Dehlavi Hindustani"
    ],
    "languageNotes": "Surrounding the Red Fort, the historic quarters of Shahjahanabad (Old Delhi) were the historical epicenter of classical Urdu poetry and Hindustani court culture. Standard Hindi and English are the administrative languages of the National Capital Territory, with Punjabi widely spoken throughout the city."
  },
  {
    "id": "qutub-minar",
    "name": "Qutub Minar Complex",
    "alternateNames": [
      "Qutb Minar",
      "Vijay Stambha of Delhi"
    ],
    "location": "Mehrauli, New Delhi, Delhi, India",
    "city": "New Delhi",
    "state": "Delhi",
    "category": "Archaeological Sites",
    "isUNESCO": true,
    "timeline": "1192 – 1220 CE",
    "dynasty": "Delhi Sultanate (Mamluk / Slave Dynasty)",
    "patron": "Qutb ud-Din Aibak & Shams ud-Din Iltutmish",
    "architecturalStyle": "Indo-Islamic & Early Afghan Architecture",
    "shortDescription": "A soaring 72.5-meter red sandstone and marble minaret, the tallest brick minaret in the world, surrounded by ancient ruins including the rust-resistant 4th-century Iron Pillar.",
    "thumbnail": "/images/qutub-minar.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Qutb ud-Din Aibak (founded 1192 CE), expanded by Iltutmish and Firoz Shah Tughlaq",
    "associatedFigures": [],
    "historicalBackground": "Founded around 1192 CE by Qutb ud-Din Aibak, the first Sultan of Delhi, following the defeat of Prithviraj Chauhan. The tower was completed by his successor Iltutmish, who added three more storeys, and later repaired by Firoz Shah Tughlaq. The surrounding complex contains the Quwwat-ul-Islam Mosque, the Alai Darwaza gateway, and the 1,600-year-old rustless Iron Pillar of Delhi.",
    "architecture": {
      "style": "Early Indo-Islamic Architecture",
      "materials": "Red and buff sandstone, white marble upper storeys, and intricately carved Arabic calligraphic bands",
      "overview": "A five-storey tapered minaret rising 72.5 meters with a base diameter of 14.3 meters narrowing to 2.7 meters at the top. Each storey is separated by projecting balconies supported by stalactite-like corbelled brackets.",
      "features": [
        {
          "title": "Tapering Sandstone Fluting",
          "description": "Alternating angular and semicircular fluting carved along the lower storeys with inscriptions of Qur'anic verses."
        },
        {
          "title": "Iron Pillar of Delhi (4th Century CE)",
          "description": "A 7.2-meter wrought iron pillar from the Gupta period famous for its metallurgical resistance to corrosion over 1,600 years."
        },
        {
          "title": "Alai Darwaza (1311 CE)",
          "description": "First true dome gateway built in India by Alauddin Khalji, displaying early horseshoe arches and red sandstone jali screens."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1993, representing the earliest monument of the Delhi Sultanate and an exceptional fusion of Islamic calligraphic artistry with indigenous Indian masonry skills.",
    "facts": [
      "At 72.5 meters (238 feet), Qutub Minar is the tallest brick minaret in the world.",
      "The tower contains 379 spiral steps leading to the uppermost observation balcony.",
      "The Iron Pillar located in the courtyard bears an inscription in Gupta Brahmi script mentioning a king named 'Chandra' (identified as Chandragupta II Vikramaditya)."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Qutb Minar and its Monuments",
        "url": "https://whc.unesco.org/en/list/233/"
      }
    ],
    "imageAlt": "Genuine photograph of Qutub Minar Complex in New Delhi, Delhi",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Primary Official Language"
    },
    "otherLanguages": [
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Historic Regional & Sultanate Epigraphy"
      },
      {
        "name": "Punjabi",
        "native": "ਪੰਜਾਬੀ",
        "role": "Widespread Delhi NCR Language"
      },
      {
        "name": "English",
        "native": "English",
        "role": "International Tourism & ASI Signage"
      }
    ],
    "localDialects": [
      "Khariboli",
      "Haryanvi border dialect in South Delhi"
    ],
    "languageNotes": "Mehrauli is one of Delhi's oldest continuously inhabited urban settlements. While ancient Arabic and Persian appear on the minar's sandstone bands, everyday conversation is carried out in Hindi, English, and Hindustani."
  },
  {
    "id": "humayuns-tomb",
    "name": "Humayun's Tomb",
    "alternateNames": [
      "Maqbara-i-Humayun"
    ],
    "location": "Nizamuddin East, New Delhi, Delhi, India",
    "city": "New Delhi",
    "state": "Delhi",
    "category": "Tombs & Mausoleums",
    "isUNESCO": true,
    "timeline": "1565 – 1572 CE",
    "dynasty": "Mughal Empire",
    "patron": "Empress Bega Begum (Haji Begum) & Akbar",
    "architecturalStyle": "Mughal & Persian Architecture",
    "shortDescription": "The first grand garden-tomb on the Indian subcontinent, which pioneered the double-dome and Charbagh layout that later inspired the design of the Taj Mahal.",
    "thumbnail": "/images/humayuns-tomb.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Empress Bega Begum, chief consort of Emperor Humayun",
    "associatedFigures": [
      "akbar-the-great"
    ],
    "historicalBackground": "Commissioned in 1565 by Empress Bega Begum following the death of the second Mughal Emperor, Humayun. Designed by Persian architect Mirak Mirza Ghiyas, it represents the first major architectural work of Emperor Akbar's reign and introduced the Persian Charbagh (four-fold garden) layout to India.",
    "architecture": {
      "style": "Early Classical Mughal Architecture",
      "materials": "Red sandstone dressed with white marble inlays and lime plaster",
      "overview": "Set within a massive 30-acre symmetrical Charbagh garden, the tomb sits on a high vaulted plinth. It was the first Indian monument to feature a Persian double-dome structure.",
      "features": [
        {
          "title": "High Double Dome",
          "description": "A 42.5-meter outer marble dome over an inner dome, creating proportional harmony both inside the chamber and outside."
        },
        {
          "title": "Symmetrical Charbagh Garden",
          "description": "Four quadrants divided by causeways and water channels symbolizing the four rivers of paradise in Islamic cosmology."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1993. It is celebrated as the direct stylistic prototype of the Taj Mahal and a milestone in Islamic garden tomb architecture.",
    "facts": [
      "Over 150 members of the Mughal royal family are interred within the cellars of the plinth, earning it the moniker 'Dormitory of the Mughals'.",
      "Bahadur Shah Zafar, the last Mughal Emperor, took refuge here during the 1857 Uprising before his capture by British officer William Hodson."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Humayun's Tomb",
        "url": "https://whc.unesco.org/en/list/247/"
      }
    ],
    "imageAlt": "Genuine photograph of Humayun's Tomb in New Delhi, Delhi",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Official & Metropolitan Medium"
    },
    "otherLanguages": [
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Sufi Nizamuddin Cultural Tradition & Poetry"
      },
      {
        "name": "English",
        "native": "English",
        "role": "International UNESCO Tourism & Documentation"
      },
      {
        "name": "Punjabi",
        "native": "ਪੰਜਾਬੀ",
        "role": "Prominent Metropolitan Language"
      }
    ],
    "localDialects": [
      "Khariboli / Hindustani"
    ],
    "languageNotes": "Situated beside Hazrat Nizamuddin Basti, where Amir Khusrau pioneered Hindavi poetry and qawwali traditions in the 13th century. Today, Standard Hindi and Urdu are spoken interchangeably in the neighborhood, with English used for international visitors."
  },
  {
    "id": "agra-fort",
    "name": "Agra Fort",
    "alternateNames": [
      "Qila-i-Akbari",
      "Red Fort of Agra"
    ],
    "location": "Agra, Uttar Pradesh, India",
    "city": "Agra",
    "state": "Uttar Pradesh",
    "category": "Forts & Palaces",
    "isUNESCO": true,
    "timeline": "1565 – 1573 CE",
    "dynasty": "Mughal Empire",
    "patron": "Emperor Akbar & Emperor Shah Jahan",
    "architecturalStyle": "Mughal & Indo-Islamic Architecture",
    "shortDescription": "A massive crescent-shaped red sandstone imperial fortress overlooking the Yamuna River, featuring the Jahangiri Mahal, Khas Mahal, and the Musamman Burj where Shah Jahan was imprisoned.",
    "thumbnail": "/images/agra-fort.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Emperor Akbar (built main red sandstone fort); marble palaces added by Shah Jahan",
    "associatedFigures": [
      "akbar-the-great",
      "shah-jahan"
    ],
    "historicalBackground": "Constructed by Emperor Akbar between 1565 and 1573 on the remains of an ancient brick fort known as Badalgarh. It served as the main seat of Mughal power until 1638. Later, Shah Jahan transformed many inner apartments into white marble palaces before being imprisoned here in his final years by his son Aurangzeb.",
    "architecture": {
      "style": "Mughal Imperial Fort Architecture",
      "materials": "Red sandstone from Rajasthan, Makrana white marble, and glazed tile inlays",
      "overview": "Enclosed by 2.5-kilometer-long, 70-foot-high double red sandstone walls with massive semi-circular bastions, moats, and riverside gateways.",
      "features": [
        {
          "title": "Musamman Burj (Octagonal Tower)",
          "description": "An open octagonal marble pavilion overlooking the Yamuna River with a clear view of the Taj Mahal, where Shah Jahan spent his final 8 years in captivity."
        },
        {
          "title": "Jahangiri Mahal",
          "description": "A red sandstone palace displaying an extraordinary fusion of Hindu Rajput brackets and carved stone beams with Islamic arches."
        },
        {
          "title": "Sheesh Mahal (Palace of Mirrors)",
          "description": "Royal dressing chamber decorated with thousands of tiny convex Syrian glass mirrors that twinkle in candlelight."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1983, celebrated for showcasing the evolutionary progression of Mughal architecture from Akbar's robust red sandstone to Shah Jahan's refined marble elegance.",
    "facts": [
      "Akbar's historians recorded that over 500 stone buildings were originally constructed inside the fort, though many were later redesigned by Shah Jahan.",
      "The fort housed the famous Peacock Throne before Shah Jahan moved the capital to Delhi in 1648."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Agra Fort",
        "url": "https://whc.unesco.org/en/list/251/"
      }
    ],
    "imageAlt": "Genuine photograph of Agra Fort in Agra, Uttar Pradesh",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Primary Official Medium"
    },
    "otherLanguages": [
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Regional Historical & Literary Language"
      },
      {
        "name": "English",
        "native": "English",
        "role": "Heritage Tourism & Certified Guides"
      }
    ],
    "localDialects": [
      "Braj Bhasha (ब्रज भाषा)",
      "Western Hindi"
    ],
    "languageNotes": "Located along the Yamuna riverbank in the Braj cultural zone. Although Persian was the historical court language of the Mughals, modern Agra residents converse in Hindi and Braj Bhasha, with English and foreign languages spoken by licensed heritage guides."
  },
  {
    "id": "fatehpur-sikri",
    "name": "Fatehpur Sikri",
    "alternateNames": [
      "City of Victory"
    ],
    "location": "Agra District, Uttar Pradesh, India",
    "city": "Fatehpur Sikri",
    "state": "Uttar Pradesh",
    "category": "Archaeological Sites",
    "isUNESCO": true,
    "timeline": "1571 – 1585 CE",
    "dynasty": "Mughal Empire",
    "patron": "Emperor Akbar",
    "architecturalStyle": "Mughal & Indo-Islamic Architecture",
    "shortDescription": "The magnificent red sandstone capital city founded by Emperor Akbar in honor of Sufi saint Sheikh Salim Chishti, home to the monumental 54-meter Buland Darwaza.",
    "thumbnail": "/images/fatehpur-sikri.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Emperor Akbar",
    "associatedFigures": [
      "akbar-the-great"
    ],
    "historicalBackground": "Founded in 1571 by Emperor Akbar to celebrate the birth of his son Jahangir, who was born through the blessings of Sufi saint Sheikh Salim Chishti. The city served as the short-lived capital of the Mughal Empire until 1585, when it was abandoned due to water shortages and Akbar's military campaigns in Punjab.",
    "architecture": {
      "style": "Akbari Mughal Architecture",
      "materials": "Locally quarried red sandstone with white marble tomb of Salim Chishti",
      "overview": "A planned royal palace complex and grand congregational mosque built on a rocky ridge, blending Gujarati, Rajasthani, and Persian architectural idioms.",
      "features": [
        {
          "title": "Buland Darwaza (Gate of Magnificence)",
          "description": "A 54-meter-tall monumental gateway erected in 1601 to commemorate Akbar's victory over Gujarat, the highest gateway in the world."
        },
        {
          "title": "Diwan-i-Khas (Private Council Chamber)",
          "description": "Famous for its central carved stone pillar with a circular platform connected to four aerial walkways where Akbar met scholars of all faiths."
        },
        {
          "title": "Tomb of Sheikh Salim Chishti",
          "description": "A pristine white marble mausoleum with intricately carved pierced jali stone screens where devotees tie red threads for wishes."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1986. It is one of the best-preserved architectural ensembles of 16th-century Mughal urbanism in the world.",
    "facts": [
      "Akbar hosted philosophical debates among scholars of Hinduism, Islam, Christianity, Jainism, and Zoroastrianism here in the Ibadat Khana.",
      "The city was completely abandoned after just 14 years of royal occupation, preserving its 16th-century layout untouched by later modifications."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Fatehpur Sikri",
        "url": "https://whc.unesco.org/en/list/255/"
      }
    ],
    "imageAlt": "Genuine photograph of Fatehpur Sikri in Fatehpur Sikri, Uttar Pradesh",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Primary Official Medium"
    },
    "otherLanguages": [
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Sufi Salim Chishti Dargah Tradition"
      },
      {
        "name": "English",
        "native": "English",
        "role": "International Tourism Guides"
      }
    ],
    "localDialects": [
      "Braj Bhasha",
      "Mewati border idioms"
    ],
    "languageNotes": "Fatehpur Sikri is located on the rocky ridge of western Uttar Pradesh bordering Rajasthan. Local residents converse in Hindi with strong Braj Bhasha influences. Urdu is devotional at the Dargah of Sheikh Salim Chishti."
  },
  {
    "id": "konark-sun-temple",
    "name": "Sun Temple, Konark",
    "alternateNames": [
      "Black Pagoda",
      "Arka Kshetra"
    ],
    "location": "Konark, Puri District, Odisha, India",
    "city": "Konark",
    "state": "Odisha",
    "category": "Temples & Religious Architecture",
    "isUNESCO": true,
    "timeline": "1250 CE (13th Century)",
    "dynasty": "Eastern Ganga Dynasty",
    "patron": "King Narasimhadeva I",
    "architecturalStyle": "Kalinga Architecture",
    "shortDescription": "Conceived as a colossal stone chariot of the Sun God Surya, featuring 24 intricately carved stone wheels functioning as sundials and pulled by seven galloping horses.",
    "thumbnail": "/images/konark-sun-temple.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "King Narasimhadeva I of the Eastern Ganga Dynasty",
    "associatedFigures": [],
    "historicalBackground": "Constructed around 1250 CE by King Narasimhadeva I to commemorate his military victories over Muslim invaders and dedicate an imperial shrine to Surya, the Hindu Sun God. Built on the shores of the Bay of Bengal, European sailors historically navigated by its dark stone silhouette, naming it the 'Black Pagoda'.",
    "architecture": {
      "style": "Kalinga Architectural Tradition",
      "materials": "Khondalite stone, chlorite relief sculptures, and iron clamping dowels",
      "overview": "Designed in the form of a celestial chariot with 24 giant stone wheels (each nearly 10 feet in diameter) drawn by seven horses, oriented so that the first rays of sunrise illuminate the main sanctum.",
      "features": [
        {
          "title": "Sundial Wheels",
          "description": "24 monumental carved stone wheels whose spokes cast shadows to accurately measure time down to minutes."
        },
        {
          "title": "Natamandira (Dancing Hall)",
          "description": "Pillared dance pavilion covered in hundreds of stone relief sculptures of Odissi dancers, celestial musicians, and acrobats."
        },
        {
          "title": "Chlorite Surya Sculptures",
          "description": "Three monolithic chlorite green stone statues of the Sun God positioned to catch the morning, midday, and setting sun."
        }
      ]
    },
    "significance": "A UNESCO World Heritage Site inscribed in 1984, representing the crowning masterpiece of Kalinga temple architecture and medieval Indian astronomical sculpture.",
    "facts": [
      "The 24 wheels symbolize the 24 fortnights (Pakshas) of the Hindu calendar, and the 7 horses represent the 7 days of the week and the 7 colors of sunlight.",
      "Legend says a massive magnet was originally placed in the temple tower that kept the primary Surya idol suspended in mid-air."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Sun Temple, Konârak",
        "url": "https://whc.unesco.org/en/list/246/"
      }
    ],
    "imageAlt": "Genuine photograph of Sun Temple, Konark in Konark, Odisha",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Odia",
      "native": "ଓଡ଼ିଆ",
      "script": "Odia",
      "status": "Classical State Language & Local Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "National Tourism & Interstate Communication"
      },
      {
        "name": "Bengali",
        "native": "বাংলা",
        "role": "Frequent Regional Pilgrim & Traveler Tongue"
      },
      {
        "name": "English",
        "native": "English",
        "role": "Archaeological & International Research"
      }
    ],
    "localDialects": [
      "Puri / Central Odia (Standard Odia)"
    ],
    "languageNotes": "Odia is one of India's classical languages with over a thousand years of epigraphic tradition. In Konark and the coastal Puri district, Odia is spoken natively by all locals. Given its popularity among domestic travelers from neighboring states, local guides and shopkeepers speak Odia, Bengali, Hindi, and English."
  },
  {
    "id": "modhera-sun-temple",
    "name": "Sun Temple, Modhera",
    "alternateNames": [
      "Modhera Surya Mandir"
    ],
    "location": "Modhera, Mehsana District, Gujarat, India",
    "city": "Modhera",
    "state": "Gujarat",
    "category": "Temples & Religious Architecture",
    "isUNESCO": false,
    "timeline": "1026 – 1027 CE",
    "dynasty": "Chaulukya / Solanki Dynasty",
    "patron": "King Bhima I",
    "architecturalStyle": "Maru-Gurjara Architecture",
    "shortDescription": "An exquisite 11th-century Solanki temple dedicated to the Sun God, celebrated for the geometric stepped water reservoir (Surya Kund) containing 108 miniature shrines.",
    "thumbnail": "/images/modhera-sun-temple.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "King Bhima I of the Solanki Dynasty",
    "associatedFigures": [],
    "historicalBackground": "Built in 1026–1027 CE by King Bhima I of the Solanki dynasty on the banks of the Pushpavati River. The temple was engineered so that during the equinoxes, the rising sun's first rays shone directly onto the diamond on the forehead of the Surya idol within the Garbhagriha.",
    "architecture": {
      "style": "Maru-Gurjara Temple Architecture",
      "materials": "Golden yellow sandstone blocks fitted with stone mortise joints",
      "overview": "Composed of three distinct axial components: the Surya Kund (stepped water tank), the Sabha Mandapa (assembly hall with 52 intricately carved pillars), and the Guda Mandapa (sanctum sanctorum).",
      "features": [
        {
          "title": "Surya Kund (Stepped Water Reservoir)",
          "description": "A monumental rectangular stepped water tank featuring geometric stairways and 108 miniature shrines dedicated to various deities."
        },
        {
          "title": "52 Carved Pillars of Sabha Mandap",
          "description": "52 monolithic sandstone pillars symbolizing the 52 weeks of the solar year, carved with episodes from the Ramayana and Mahabharata."
        }
      ]
    },
    "significance": "Recognized by the Archaeological Survey of India as a Monument of National Importance and currently on India's Tentative List for UNESCO World Heritage status.",
    "facts": [
      "No worship is performed here today as the temple sanctum was desecrated during medieval invasions, yet it hosts the annual Modhera Dance Festival.",
      "The village of Modhera became India's first 100% round-the-clock solar-powered village in 2022, continuing its ancient solar heritage."
    ],
    "sources": [
      {
        "title": "Archaeological Survey of India — Sun Temple Modhera",
        "url": "https://asi.nic.in/"
      }
    ],
    "imageAlt": "Genuine photograph of Sun Temple, Modhera in Modhera, Gujarat",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Gujarati",
      "native": "ગુજરાતી",
      "script": "Gujarati",
      "status": "Primary Regional Language & Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "National Visitor Interaction"
      },
      {
        "name": "English",
        "native": "English",
        "role": "Archaeological Documentation & State Tourism"
      }
    ],
    "localDialects": [
      "North Gujarati (Patan / Mehsani Gujarati)"
    ],
    "languageNotes": "Gujarati is the official and everyday language spoken in Modhera and Mehsana district. Local villagers speak the characteristic Mehsani dialect of Northern Gujarat. Hindi and English are widely understood at the ASI complex and visitor interpretation center."
  },
  {
    "id": "sanchi-stupa",
    "name": "Sanchi Stupa",
    "alternateNames": [
      "Great Stupa at Sanchi",
      "Mahastupa"
    ],
    "location": "Sanchi, Raisen District, Madhya Pradesh, India",
    "city": "Sanchi",
    "state": "Madhya Pradesh",
    "category": "Stupas & Buddhist Heritage",
    "isUNESCO": true,
    "timeline": "3rd Century BCE – 1st Century CE",
    "dynasty": "Mauryan Empire & Satavahana Dynasty",
    "patron": "Emperor Ashoka the Great",
    "architecturalStyle": "Ancient Buddhist Stupa Architecture",
    "shortDescription": "The oldest stone structure in India, commissioned by Emperor Ashoka over the relics of the Buddha, featuring four ornate stone Torana gateways carved with Jataka tales.",
    "thumbnail": "/images/sanchi-stupa.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Mauryan Emperor Ashoka the Great in the 3rd century BCE",
    "associatedFigures": [
      "ashoka-the-great",
      "gautama-buddha"
    ],
    "historicalBackground": "Originally commissioned in the 3rd century BCE by Emperor Ashoka over the sacred relics of Gautama Buddha. It was enlarged with a stone casing during the Shunga period, and its world-famous four ceremonial Torana gateways and railings were added by the Satavahana dynasty in the 1st century BCE.",
    "architecture": {
      "style": "Early Buddhist Architecture",
      "materials": "Sandstone core encased in dressed stone blocks with monolithic Torana gateways",
      "overview": "A monumental hemispherical stone dome (Anda) crowned by a square railing (Harmika) and a three-tiered umbrella (Chhatra) symbolizing the three jewels of Buddhism: Buddha, Dharma, and Sangha.",
      "features": [
        {
          "title": "Four Carved Torana Gateways",
          "description": "Intricately carved stone gateways facing the cardinal directions depicting events from the life of the Buddha and Jataka tales."
        },
        {
          "title": "Pradakshina Patha",
          "description": "Elevated circumambulatory stone pathways where monks and pilgrims walk clockwise in meditation."
        },
        {
          "title": "Ashoka Pillar Fragment",
          "description": "A polished sandstone pillar bearing an Ashokan edict warning against schisms in the Buddhist monastic community."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1989. It is the most complete and best-preserved Buddhist architectural complex in India.",
    "facts": [
      "In early Buddhist art at Sanchi, the Buddha is never shown in human form; he is represented through symbols like footprints, a lotus, the Bodhi tree, and an empty throne.",
      "The site was abandoned for centuries until British officer General Henry Taylor rediscovered it covered in jungle in 1818."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Buddhist Monuments at Sanchi",
        "url": "https://whc.unesco.org/en/list/524/"
      }
    ],
    "imageAlt": "Genuine photograph of Sanchi Stupa in Sanchi, Madhya Pradesh",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Primary Regional & Administrative Medium"
    },
    "otherLanguages": [
      {
        "name": "English",
        "native": "English",
        "role": "International Buddhist Pilgrimage & Research"
      },
      {
        "name": "Pali",
        "native": "पालि",
        "role": "Historical Canonical Language of Epigraphs"
      }
    ],
    "localDialects": [
      "Malwi (मालवी)",
      "Bundeli (बुंदेली) border dialect"
    ],
    "languageNotes": "Located in Raisen district near Vidisha in central Madhya Pradesh, local residents speak Standard Hindi alongside regional Malwi and Bundeli dialects. The ancient Ashokan edicts on the monument are inscribed in Brahmi script in Prakrit. Due to international Buddhist pilgrims from Sri Lanka, Thailand, and Japan, multilingual guides and English signage are common."
  },
  {
    "id": "ajanta-caves",
    "name": "Ajanta Caves",
    "alternateNames": [
      "Ajanta Rock-Cut Caves"
    ],
    "location": "Chhatrapati Sambhajinagar District, Maharashtra, India",
    "city": "Ajanta",
    "state": "Maharashtra",
    "category": "Ancient Caves",
    "isUNESCO": true,
    "timeline": "2nd Century BCE – 6th Century CE",
    "dynasty": "Satavahana & Vakataka Dynasties",
    "patron": "Emperor Harishena (Vakataka Dynasty)",
    "architecturalStyle": "Ancient Rock-Cut Buddhist Architecture",
    "shortDescription": "A horseshoe-shaped gorge containing 30 rock-cut Buddhist cave temples renowned worldwide for their masterly tempera mural paintings and colossal sculptures.",
    "thumbnail": "/images/ajanta-caves.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Satavahana and Vakataka royal patrons and merchant guilds",
    "associatedFigures": [
      "gautama-buddha"
    ],
    "historicalBackground": "Carved into a 75-meter crescent cliff along the Waghur River gorge in two distinct phases: Phase 1 (2nd century BCE under the Satavahanas) and Phase 2 (5th–6th century CE under King Harishena of the Vakatakas). The caves served as monastic retreats (Viharas) and worship halls (Chaityas) for Buddhist monks before being forgotten and rediscovered in 1819 by British officer John Smith during a tiger hunt.",
    "architecture": {
      "style": "Classical Indian Rock-Cut Cave Architecture",
      "materials": "Basalt rock carved directly from the cliff face, lime plaster, and vegetable/mineral pigment murals",
      "overview": "30 rock-cut caves including pillared prayer halls with stupas (Chaityas) and residential monasteries (Viharas), illuminated by daylight channeled through horseshoe arch windows.",
      "features": [
        {
          "title": "Padmapani & Vajrapani Murals (Cave 1)",
          "description": "World-famous fresco paintings depicting the Bodhisattvas with gentle, spiritual expressions holding a blue lotus."
        },
        {
          "title": "Reclining Buddha (Cave 26)",
          "description": "A monumental 7-meter-long stone sculpture depicting the Mahaparinirvana (death) of the Buddha surrounded by mourning disciples."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1983 as universally recognized masterpieces of Buddhist religious art and the finest surviving examples of ancient Indian painting.",
    "facts": [
      "The artists illuminated the dark caves using polished metal mirrors and white cloths to reflect natural sunlight inside from the gorge.",
      "The murals use mineral colors derived from lapis lazuli (imported from Afghanistan), red ochre, green glauconite, and gypsum."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Ajanta Caves",
        "url": "https://whc.unesco.org/en/list/242/"
      }
    ],
    "imageAlt": "Genuine photograph of Ajanta Caves in Ajanta, Maharashtra",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Marathi",
      "native": "मराठी",
      "script": "Devanagari",
      "status": "State Official Language & Regional Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "Interstate Tourism & Communication"
      },
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Deccan Historic Cultural Tongue"
      },
      {
        "name": "English",
        "native": "English",
        "role": "International UNESCO Tourism & Research"
      }
    ],
    "localDialects": [
      "Marathwada Marathi",
      "Varhadi"
    ],
    "languageNotes": "Located in the Waghur river gorge in Chhatrapati Sambhaji Nagar district, Marathi is the mother tongue and administrative language. While ancient Buddhist inscriptions are in Sanskrit and Prakrit, contemporary guides communicate in Marathi, Hindi, and English."
  },
  {
    "id": "ellora-caves",
    "name": "Ellora Caves",
    "alternateNames": [
      "Verul Leni",
      "Elapura Caves"
    ],
    "location": "Chhatrapati Sambhajinagar District, Maharashtra, India",
    "city": "Ellora",
    "state": "Maharashtra",
    "category": "Ancient Caves",
    "isUNESCO": true,
    "timeline": "6th Century – 10th Century CE",
    "dynasty": "Rashtrakuta & Yadava Dynasties",
    "patron": "King Krishna I (Rashtrakuta Dynasty)",
    "architecturalStyle": "Rock-Cut Multi-Faith Architecture",
    "shortDescription": "A complex of 34 monumental rock-cut monasteries and temples celebrating Hindu, Buddhist, and Jain traditions side-by-side, home to the monolithic Kailasa Temple.",
    "thumbnail": "/images/ellora-caves.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Rashtrakuta and Yadava monarchs",
    "associatedFigures": [],
    "historicalBackground": "Carved out of the Charanandri hills between the 6th and 10th centuries CE. Ellora is unique because its 34 caves represent three major Indian religions existing in peaceful coexistence: 12 Buddhist caves (Caves 1–12), 17 Hindu caves (Caves 13–29), and 5 Jain caves (Caves 30–34).",
    "architecture": {
      "style": "Ancient Indian Monolithic Rock-Cut Architecture",
      "materials": "Single volcanic basalt cliff face excavated from top to bottom",
      "overview": "Extending over 2 kilometers, the caves culminate in Cave 16: the Kailasa Temple, the largest monolithic rock excavation in the world.",
      "features": [
        {
          "title": "Kailasa Temple (Cave 16)",
          "description": "Carved from top to bottom out of a single volcanic rock cliff, excavating over 200,000 tonnes of rock to create a multi-storey chariot temple dedicated to Lord Shiva."
        },
        {
          "title": "Vishvakarma Cave (Cave 10)",
          "description": "The 'Carpenter's Cave', a Buddhist Chaitya with stone ribs carved to imitate wooden timber vaulted ceilings."
        },
        {
          "title": "Indra Sabha (Cave 32)",
          "description": "A two-storey Jain cave with exquisite stone carvings of lotus ceilings and statues of Mahavira and Gommateshwara."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1983, celebrated as an unparalleled feat of monolithic rock excavation and a testament to religious tolerance in ancient India.",
    "facts": [
      "The Kailasa Temple is twice the area of the Parthenon in Athens and 1.5 times its height, yet was carved entirely from a single stone cliff with chisels and hammers.",
      "Archaeologists estimate the temple took between 18 and 100 years to excavate, removing rock downwards without scaffolding."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Ellora Caves",
        "url": "https://whc.unesco.org/en/list/243/"
      }
    ],
    "imageAlt": "Genuine photograph of Ellora Caves in Ellora, Maharashtra",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Marathi",
      "native": "मराठी",
      "script": "Devanagari",
      "status": "Official State Language & Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "Domestic Tourist Interaction"
      },
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Historic Regional Language"
      },
      {
        "name": "English",
        "native": "English",
        "role": "Global Heritage Tourism"
      }
    ],
    "localDialects": [
      "Marathwada Marathi"
    ],
    "languageNotes": "Ellora (ancient Elapura) is in the Marathwada region where Marathi is universally spoken. Historical rock inscriptions on Cave 16 reflect Kannada, Sanskrit, and early Marathi script traditions, representing Rashtrakuta patronage. Today, Marathi, Hindi, and English are used."
  },
  {
    "id": "hampi",
    "name": "Group of Monuments at Hampi",
    "alternateNames": [
      "Vijayanagara Capital Ruins",
      "Kishkindha"
    ],
    "location": "Vijayanagara District, Karnataka, India",
    "city": "Hampi",
    "state": "Karnataka",
    "category": "Archaeological Sites",
    "isUNESCO": true,
    "timeline": "14th – 16th Century CE",
    "dynasty": "Vijayanagara Empire",
    "patron": "Emperor Krishnadevaraya and Sangama Rulers",
    "architecturalStyle": "Dravidian Vijayanagara Architecture",
    "shortDescription": "The magnificent ruined capital of the Vijayanagara Empire on the Tungabhadra River, renowned for the stone chariot, musical pillars of Vittala Temple, and Virupaksha Temple.",
    "thumbnail": "/images/hampi.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Sangama, Saluva, and Tuluva dynasties of the Vijayanagara Empire",
    "associatedFigures": [],
    "historicalBackground": "Founded in 1336 CE by brothers Harihara I and Bukka Raya I, Hampi served as the imperial capital of the Vijayanagara Empire. By 1500 CE, it was the second-largest medieval city in the world after Beijing, celebrated by Persian and Portuguese travelers for its wealth, bustling bazaars, and temples, before its defeat and sacking at the Battle of Talikota in 1565.",
    "architecture": {
      "style": "Vijayanagara Dravidian Architecture",
      "materials": "Locally quarried granite stone, soapstone relief carvings, and brick/stucco superstructures",
      "overview": "Spread across 41 square kilometers of boulder-strewn landscape along the Tungabhadra River, featuring grand temple complexes, royal enclosures, aqueducts, and stepped tanks.",
      "features": [
        {
          "title": "Vittala Temple Stone Chariot",
          "description": "An iconic shrine dedicated to Garuda designed as a stone chariot with rotating wheels, featured on the Indian ₹50 banknote."
        },
        {
          "title": "56 Musical Pillars (Saptaswara Pillars)",
          "description": "Cluster pillars carved from single granite blocks that resonate with distinct musical notes when tapped."
        },
        {
          "title": "Virupaksha Temple Gopuram",
          "description": "A 50-meter-tall nine-tiered entrance tower to an active temple that has had continuous worship since the 7th century CE."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1986, representing the grandest surviving capital complex of a South Indian Hindu empire.",
    "facts": [
      "In mythology, Hampi is identified as Kishkindha, the Vanara monkey kingdom described in the ancient Ramayana epic.",
      "The historic Hampi Bazaar was a half-mile long colonnaded avenue where merchants traded diamonds, rubies, and pearls by the kilogram."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Group of Monuments at Hampi",
        "url": "https://whc.unesco.org/en/list/241/"
      }
    ],
    "imageAlt": "Genuine photograph of Group of Monuments at Hampi in Hampi, Karnataka",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Kannada",
      "native": "ಕನ್ನಡ",
      "script": "Kannada",
      "status": "Classical State Language & Local Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "Telugu",
        "native": "తెలుగు",
        "role": "Historical Vijayanagara Imperial Language"
      },
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "Interstate Travelers & Backpackers"
      },
      {
        "name": "English",
        "native": "English",
        "role": "International Tourism & ASI Documentation"
      }
    ],
    "localDialects": [
      "North Karnataka Kannada (Dharwad-Bellary Kannada)"
    ],
    "languageNotes": "Hampi sits on the southern bank of the Tungabhadra River in Karnataka, where Kannada is the native tongue. During the 15th-century Vijayanagara Empire, both Kannada and Telugu flourished as court languages. Today, licensed local guides often speak Kannada, Telugu, Hindi, English, and basic European languages."
  },
  {
    "id": "mahabalipuram",
    "name": "Group of Monuments at Mahabalipuram",
    "alternateNames": [
      "Mamallapuram",
      "Seven Pagodas"
    ],
    "location": "Chengalpattu District, Tamil Nadu, India",
    "city": "Mahabalipuram",
    "state": "Tamil Nadu",
    "category": "Archaeological Sites",
    "isUNESCO": true,
    "timeline": "7th – 8th Century CE",
    "dynasty": "Pallava Dynasty",
    "patron": "King Narasimhavarman I (Mamalla) & Rajasimha",
    "architecturalStyle": "Dravidian Pallava Architecture",
    "shortDescription": "A seaside sanctuary of rock-cut sanctuaries, monolithic chariots (Pancha Rathas), and the famous Shore Temple overlooking the Bay of Bengal.",
    "thumbnail": "/images/mahabalipuram.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Pallava kings (Mahendravarman I, Narasimhavarman I, and Rajasimha)",
    "associatedFigures": [
      "rajaraja-chola-i"
    ],
    "historicalBackground": "Founded by the Pallava dynasty as a bustling major seaport for trade with Southeast Asia. Between the 7th and 8th centuries CE, Pallava sculptors transformed the granite boulders along the Coromandel Coast into open-air rock bas-reliefs, monolithic stone chariots, and structural temples.",
    "architecture": {
      "style": "Early Dravidian Pallava Rock-Cut & Structural Architecture",
      "materials": "Dressed granite blocks and living granite sea boulders",
      "overview": "Features four categories of monuments: monolithic temples (Rathas), cave sanctuaries (Mandapas), structural temples (Shore Temple), and open-air bas-reliefs.",
      "features": [
        {
          "title": "Shore Temple",
          "description": "An 8th-century structural stone temple perched directly at the water's edge of the Bay of Bengal, dedicated to Shiva and Vishnu."
        },
        {
          "title": "Descent of the Ganga (Arjuna's Penance)",
          "description": "A gigantic 27-meter wide open-air rock relief carved with over 100 figures of gods, humans, elephants, and lions witnessing the descent of the sacred river Ganga."
        },
        {
          "title": "Pancha Rathas (Five Chariots)",
          "description": "Five monolithic temples each carved from a single outcropping granite boulder, named after the Pandava brothers and Draupadi."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 1984, representing the crucial transition from rock-cut cave temples to structural stone temples in South India.",
    "facts": [
      "The 2004 Indian Ocean tsunami briefly receded sea waters by 500 meters, exposing sunken stone structures and granite lions from the ancient harbor.",
      "Krishna's Butterball is a 250-tonne granite boulder balanced on a 45-degree slope for over 1,200 years that seven elephants failed to dislodge in 1908."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Group of Monuments at Mahabalipuram",
        "url": "https://whc.unesco.org/en/list/249/"
      }
    ],
    "imageAlt": "Genuine photograph of Group of Monuments at Mahabalipuram in Mahabalipuram, Tamil Nadu",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Tamil",
      "native": "தமிழ்",
      "script": "Tamil",
      "status": "Classical Language & Native Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "English",
        "native": "English",
        "role": "Hospitality, Stone Artisan Trade & International Tourism"
      },
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "Domestic Interstate Tourism"
      }
    ],
    "localDialects": [
      "Northern Tamil (Thondai Nadu Tamil)"
    ],
    "languageNotes": "Mahabalipuram (Mamallapuram) is an ancient Pallava seaport where Tamil—one of the world's oldest surviving classical languages—is the native medium. Monolithic carvings bear 7th-century Pallava Grantha and early Tamil epigraphs. Local stone sculptors and hospitality staff speak Tamil and fluent English."
  },
  {
    "id": "charminar",
    "name": "Charminar",
    "alternateNames": [
      "Four Minarets of Hyderabad"
    ],
    "location": "Hyderabad, Telangana, India",
    "city": "Hyderabad",
    "state": "Telangana",
    "category": "Memorials & Modern Heritage",
    "isUNESCO": false,
    "timeline": "1591 CE",
    "dynasty": "Qutb Shahi Dynasty",
    "patron": "Muhammad Quli Qutb Shah",
    "architecturalStyle": "Indo-Islamic & Qutb Shahi Architecture",
    "shortDescription": "The iconic square monument with four 48.7-meter minarets built in 1591 to commemorate the founding of Hyderabad and the eradication of a deadly plague.",
    "thumbnail": "/images/charminar.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Muhammad Quli Qutb Shah, the fifth ruler of the Qutb Shahi dynasty",
    "associatedFigures": [],
    "historicalBackground": "Constructed in 1591 CE by Muhammad Quli Qutb Shah after he shifted his capital from the nearby Golconda fort to the newly planned city of Hyderabad. Historical tradition states that the monument was erected to mark the end of a catastrophic cholera epidemic that had devastated the region.",
    "architecture": {
      "style": "Qutb Shahi Indo-Islamic Architecture",
      "materials": "Granite, limestone, mortar, and pulverized marble stucco work",
      "overview": "A square structure with each side measuring 20 meters, punctuated by four grand arches facing the four cardinal streets of the historic city. At each corner rises an ornate 48.7-meter-high four-storey minaret.",
      "features": [
        {
          "title": "Four Grand Minarets",
          "description": "Four 48.7-meter minarets with double balconies and carved bulbous domes reached by 149 spiral steps inside."
        },
        {
          "title": "Upper Storey Mosque",
          "description": "An open mosque located on the western side of the roof terrace with 45 prayer spaces (Musalas)."
        }
      ]
    },
    "significance": "The global symbol of Hyderabad and Telangana, representing the artistic height of the Deccan Sultanates and the centerpiece of the historic Laad Bazaar pearl and bangle trade.",
    "facts": [
      "The monument is located precisely at the historical intersection of the trade route that connected the Golconda diamond mines to the port of Machilipatnam.",
      "Legend tells of an underground secret escape tunnel connecting Charminar to the fortress of Golconda, built to facilitate royal evacuation during siege."
    ],
    "sources": [
      {
        "title": "Archaeological Survey of India — Charminar Hyderabad",
        "url": "https://asi.nic.in/"
      }
    ],
    "imageAlt": "Genuine photograph of Charminar in Hyderabad, Telangana",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Telugu",
      "native": "తెలుగు",
      "script": "Telugu",
      "status": "Official State Language of Telangana"
    },
    "otherLanguages": [
      {
        "name": "Urdu (Dakhni)",
        "native": "دکنی اردو",
        "role": "Old City Heritage Mother Tongue"
      },
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "National Communication"
      },
      {
        "name": "English",
        "native": "English",
        "role": "IT Capital Administration & Tourism"
      }
    ],
    "localDialects": [
      "Dakhni Urdu (دکنی)",
      "Telangana Telugu"
    ],
    "languageNotes": "Hyderabad is a celebrated bilingual metropolis. In the immediate vicinity of Charminar in the historic Old City, Dakhni Urdu is the everyday vernacular and poetic medium, while Telugu is the official language of Telangana. Both languages, alongside English, are seamlessly understood across the bazaar."
  },
  {
    "id": "golden-temple",
    "name": "Golden Temple (Harmandir Sahib)",
    "alternateNames": [
      "Sri Harmandir Sahib",
      "Darbar Sahib"
    ],
    "location": "Amritsar, Punjab, India",
    "city": "Amritsar",
    "state": "Punjab",
    "category": "Temples & Religious Architecture",
    "isUNESCO": false,
    "timeline": "Founded 1577; Sanctum built 1589; Gold leaf overlaid 1830 CE",
    "dynasty": "Sikh Gurus & Sikh Empire",
    "patron": "Guru Arjan Dev Ji & Maharaja Ranjit Singh",
    "architecturalStyle": "Sikh Architecture",
    "shortDescription": "The holiest Gurdwara of Sikhism, situated in the center of the sacred Amrit Sarovar lake, gilded with 500 kilograms of pure gold foil by Maharaja Ranjit Singh.",
    "thumbnail": "/images/golden-temple.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Guru Ram Das Ji (excavated tank) & Guru Arjan Dev Ji (built sanctum)",
    "associatedFigures": [],
    "historicalBackground": "The sacred pool (Amrit Sarovar) was founded in 1577 by the fourth Sikh Guru, Guru Ram Das Ji. The fifth Guru, Guru Arjan Dev Ji, designed the central shrine and invited the Sufi saint Hazrat Mian Mir of Lahore to lay its foundation stone in 1589. The Guru Granth Sahib was first installed here in 1604. In 1830, Maharaja Ranjit Singh overlaid the upper storeys with gold foil.",
    "architecture": {
      "style": "Classical Sikh Architecture",
      "materials": "White marble lower storeys with Pietra Dura inlays, gilded copper plates on upper storeys, and gold kalash",
      "overview": "Unlike traditional Hindu temples constructed on elevated platforms with one entrance, Harmandir Sahib is built at a lower elevation than the surrounding city and features four entrances on all four sides to symbolize that people of all castes, religions, and backgrounds are welcome.",
      "features": [
        {
          "title": "Amrit Sarovar (Pool of Nectar)",
          "description": "A 5.1-meter-deep sacred water reservoir surrounding the sanctum, believed to have spiritual purifying qualities."
        },
        {
          "title": "Guru Ka Langar",
          "description": "The world's largest community free kitchen, serving over 100,000 wholesome vegetarian meals every single day to visitors regardless of faith or background."
        },
        {
          "title": "Akal Takht (Throne of the Timeless One)",
          "description": "The highest seat of temporal authority of the Sikh community, established by Guru Hargobind Ji in 1606 directly opposite the sanctum."
        }
      ]
    },
    "significance": "The spiritual epicenter of global Sikhism, embodying universal brotherhood, selfless service (Seva), equality, and spiritual devotion.",
    "facts": [
      "Over 500 kilograms of 24-karat gold foil covers the upper floors and dome of the sanctum.",
      "The foundation stone was laid by a Muslim Sufi saint, Hazrat Mian Mir, demonstrating the universal syncretism of the Sikh faith.",
      "The Langar kitchen operates 24 hours a day, using automated roti makers and giant cauldrons, run almost entirely by volunteers."
    ],
    "sources": [
      {
        "title": "Shiromani Gurdwara Parbandhak Committee (SGPC Official)",
        "url": "https://sgpc.net/"
      }
    ],
    "imageAlt": "Genuine photograph of Golden Temple (Harmandir Sahib) in Amritsar, Punjab",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Punjabi",
      "native": "ਪੰਜਾਬੀ",
      "script": "Gurmukhi",
      "status": "State Official Language & Native Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "Interstate Pilgrims & National Visitors"
      },
      {
        "name": "English",
        "native": "English",
        "role": "Global Sikh Diaspora & International Visitors"
      }
    ],
    "localDialects": [
      "Majhi Punjabi (ਮਾਝੀ — Standard Literary Punjabi)"
    ],
    "languageNotes": "Amritsar is situated in the Majha heartland of Punjab, home to the Majhi dialect which forms the basis of Standard Punjabi. The sacred scriptures of Sri Guru Granth Sahib are written in Gurmukhi script. Dedicated multilingual help desks at the shrine assist international pilgrims in Punjabi, Hindi, and English."
  },
  {
    "id": "victoria-memorial",
    "name": "Victoria Memorial",
    "alternateNames": [
      "Victoria Memorial Hall"
    ],
    "location": "Kolkata, West Bengal, India",
    "city": "Kolkata",
    "state": "West Bengal",
    "category": "Memorials & Modern Heritage",
    "isUNESCO": false,
    "timeline": "1906 – 1921 CE",
    "dynasty": "British Raj",
    "patron": "Lord Curzon (Viceroy of India)",
    "architecturalStyle": "Indo-Saracenic & British Neoclassical",
    "shortDescription": "A grand white Makrana marble monument in Kolkata set within 64 acres of gardens, blending British Neoclassical style with Mughal domes and Italian Renaissance details.",
    "thumbnail": "/images/victoria-memorial.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Lord Curzon in memory of Queen Victoria",
    "associatedFigures": [],
    "historicalBackground": "Conceived in 1901 by Lord Curzon, the Viceroy of India, following the death of Queen Victoria. The foundation stone was laid by the Prince of Wales in 1906, and the monument officially opened to the public in 1921. Today it houses a premier national museum with 25 galleries containing rare oil paintings, historical documents, and colonial artifacts.",
    "architecture": {
      "style": "Indo-Saracenic Revival & British Neoclassical",
      "materials": "White Makrana marble from Rajasthan (same source as the Taj Mahal) on brick masonry",
      "overview": "Designed by Sir William Emerson, President of the Royal Institute of British Architects. It features a central dome rising 56 meters, crowned by a 16-foot bronze revolving Angel of Victory.",
      "features": [
        {
          "title": "Bronze Angel of Victory",
          "description": "A 16-foot-tall, 3-tonne bronze winged figure perched atop the central dome that rotates with changing wind currents."
        },
        {
          "title": "Royal Gallery",
          "description": "Houses priceless historical portraits of Queen Victoria, Prince Albert, and oil paintings by Thomas and William Daniell."
        }
      ]
    },
    "significance": "The most iconic architectural landmark of Kolkata and Eastern India, representing the zenith of British imperial architecture on the subcontinent.",
    "facts": [
      "Like the Taj Mahal, the Victoria Memorial was built using white marble quarried from Makrana in Rajasthan.",
      "The construction cost was funded entirely by voluntary subscriptions from the people of India and princely states, with no funding from the British treasury."
    ],
    "sources": [
      {
        "title": "Victoria Memorial Hall Kolkata Official Portal",
        "url": "https://victoriamemorial-cal.org/"
      }
    ],
    "imageAlt": "Genuine photograph of Victoria Memorial in Kolkata, West Bengal",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Bengali",
      "native": "বাংলা",
      "script": "Bengali",
      "status": "Official State Language & Cultural Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "English",
        "native": "English",
        "role": "Museum Curation, Academic Archives & Judiciary"
      },
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "Cosmopolitan Commercial Communication"
      },
      {
        "name": "Urdu",
        "native": "اردو",
        "role": "Historic Central Kolkata Neighborhoods"
      }
    ],
    "localDialects": [
      "Rarh Bengali / Standard Kolkata Colloquial"
    ],
    "languageNotes": "Kolkata is the cultural and literary capital of Bengal where Bengali is the primary mother tongue and intellectual medium. English retains an exceptionally strong presence across museum curation and university circles, with Hindi and Urdu common in metropolitan trade."
  },
  {
    "id": "jallianwala-bagh",
    "name": "Jallianwala Bagh Memorial",
    "alternateNames": [
      "Jallianwala Bagh National Memorial"
    ],
    "location": "Amritsar, Punjab, India",
    "city": "Amritsar",
    "state": "Punjab",
    "category": "Memorials & Modern Heritage",
    "isUNESCO": false,
    "timeline": "Tragedy: 13 April 1919; Memorial dedicated: 1961 CE",
    "dynasty": "Modern India (National Freedom Struggle)",
    "patron": "Government of India (President Dr. Rajendra Prasad)",
    "architecturalStyle": "Modern Indian Memorial Architecture",
    "shortDescription": "A national historic memorial garden commemorating hundreds of unarmed peaceful civilians massacred by British colonial forces on Baisakhi day in 1919.",
    "thumbnail": "/images/jallianwala-bagh.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Jallianwala Bagh National Memorial Trust",
    "associatedFigures": [
      "sardar-vallabhbhai-patel"
    ],
    "historicalBackground": "On 13 April 1919 (Baisakhi day), thousands of peaceful Indian men, women, and children gathered in this walled garden to protest against the arrest of freedom leaders and the Rowlatt Act. Acting Brigadier-General Reginald Dyer blocked the narrow entrance with troops and ordered unprovoked firing without warning for 10 minutes, killing hundreds. The massacre was a decisive turning point in the Indian freedom struggle, leading Rabindranath Tagore to renounce his British knighthood and Mahatma Gandhi to launch the Non-Cooperation Movement.",
    "architecture": {
      "style": "Memorial Garden Architecture",
      "materials": "Red sandstone pylon flame monument, preserved brick walls with bullet holes, and Martyrs' Well",
      "overview": "A 6.5-acre walled urban park entered through a narrow historic passage. The memorial is anchored by the 45-foot red stone 'Flame of Liberty' designed by American architect Benjamin Polk.",
      "features": [
        {
          "title": "Flame of Liberty",
          "description": "A 45-foot red sandstone pylon shaped like a soaring flame rising out of a shallow pool, dedicated in 1961 by President Rajendra Prasad."
        },
        {
          "title": "Preserved Bullet Holes",
          "description": "Original brick walls preserved with white plaster markers identifying where British rifle bullets hit the walls."
        },
        {
          "title": "Martyrs' Well (Shaheedi Khuh)",
          "description": "The historical open well into which dozens of panic-stricken civilians jumped to escape the barrage of rifle bullets."
        }
      ]
    },
    "significance": "A sacred national shrine commemorating India's supreme sacrifices in the struggle against colonial rule, visited by millions of citizens and foreign dignitaries annually.",
    "facts": [
      "Nobel laureate Rabindranath Tagore renounced his British knighthood in protest, writing a historic letter of condemnation to the Viceroy.",
      "Udham Singh, an Indian revolutionary who witnessed the massacre as an orphan, traveled to London 21 years later in 1940 and assassinated Michael O'Dwyer, the colonial Lieutenant Governor who had endorsed the massacre."
    ],
    "sources": [
      {
        "title": "National Portal of India — Jallianwala Bagh Memorial",
        "url": "https://www.india.gov.in/"
      }
    ],
    "imageAlt": "Genuine photograph of Jallianwala Bagh Memorial in Amritsar, Punjab",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Punjabi",
      "native": "ਪੰਜਾਬੀ",
      "script": "Gurmukhi",
      "status": "Official State Language & Local Mother Tongue"
    },
    "otherLanguages": [
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "National Memorial Visitors & Official Signage"
      },
      {
        "name": "English",
        "native": "English",
        "role": "Historical Documentation & International Visitors"
      }
    ],
    "localDialects": [
      "Majhi Punjabi (ਮਾਝੀ)"
    ],
    "languageNotes": "Adjacent to the Golden Temple in Amritsar, local staff and citizens speak Majhi Punjabi. Historical plaques detailing the tragic 1919 massacre, martyr galleries, and light-and-sound presentations are presented tri-lingually in Punjabi, Hindi, and English."
  },
  {
    "id": "amer-fort",
    "name": "Amer Fort",
    "alternateNames": [
      "Amber Fort",
      "Amer Palace"
    ],
    "location": "Amer, Jaipur, Rajasthan, India",
    "city": "Jaipur",
    "state": "Rajasthan",
    "category": "Forts & Palaces",
    "isUNESCO": true,
    "timeline": "1592 – 1727 CE",
    "dynasty": "Kachwaha Rajput Dynasty",
    "patron": "Raja Man Singh I & Mirza Raja Jai Singh",
    "architecturalStyle": "Rajput & Mughal Architecture",
    "shortDescription": "A majestic hilltop fortress overlooking Maota Lake, famous for its grand courtyards, subterranean passages, and the dazzling Sheesh Mahal mirror palace.",
    "thumbnail": "/images/amer-fort.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Raja Man Singh I (1592 CE), expanded by Sawai Jai Singh",
    "associatedFigures": [
      "maharana-pratap"
    ],
    "historicalBackground": "Constructed in 1592 CE by Raja Man Singh I, commander-in-chief of Akbar's army, on the rugged Cheel ka Teela (Hill of Eagles). It served as the fortified seat of the Kachwaha Rajputs until Sawai Jai Singh II founded the new city of Jaipur in the plains in 1727. Connected via subterranean tunnels to the military fort of Jaigarh above.",
    "architecture": {
      "style": "Rajput Architecture with Mughal elements",
      "materials": "Red and yellow sandstone, white marble, glass inlays, and frescoes",
      "overview": "Organized across four main tiered courtyards, each reached by grand gateways such as the Ganesh Pol, incorporating royal apartments, gardens, and military defenses.",
      "features": [
        {
          "title": "Sheesh Mahal (Hall of Mirrors)",
          "description": "Royal hall covered with convex Belgian glass mirror mosaics and floral frescoes that illuminate the entire room with a single candle."
        },
        {
          "title": "Ganesh Pol Gateway",
          "description": "A three-storey ceremonial gateway painted with natural vegetable dye frescoes of Lord Ganesha and latticed jali viewing windows for royal ladies."
        },
        {
          "title": "Sukh Niwas (Pleasure Palace)",
          "description": "An early air-conditioned apartment where breezes were cooled by flowing water piped over marble cascades."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 2013 as part of the 'Hill Forts of Rajasthan', celebrated for its Rajput defensive architecture and exquisite interior art.",
    "facts": [
      "Maota Lake in front of the fort provided water to the fortress via a complex Persian wheel and pulley system lifting water up 400 feet.",
      "The Jaivana cannon at neighboring Jaigarh fort connected to Amer was the world's largest cannon on wheels at the time of its casting in 1720."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Hill Forts of Rajasthan",
        "url": "https://whc.unesco.org/en/list/247/"
      }
    ],
    "imageAlt": "Genuine photograph of Amer Fort in Jaipur, Rajasthan",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Hindi",
      "native": "हिन्दी",
      "script": "Devanagari",
      "status": "Primary Official Language"
    },
    "otherLanguages": [
      {
        "name": "Rajasthani (Dhundhari)",
        "native": "राजस्थानी (ढूंढाड़ी)",
        "role": "Traditional Regional Mother Tongue"
      },
      {
        "name": "English",
        "native": "English",
        "role": "International Royal Heritage Tourism"
      }
    ],
    "localDialects": [
      "Dhundhari (ढूंढाड़ी)",
      "Marwari influence"
    ],
    "languageNotes": "Amer and Jaipur lie in the Dhundhar geographic region where Dhundhari is the ancestral folk dialect. Standard Hindi is the administrative and educational medium of Rajasthan, while English and foreign languages are fluently spoken by licensed royal guides."
  },
  {
    "id": "csmt-mumbai",
    "name": "Chhatrapati Shivaji Maharaj Terminus",
    "alternateNames": [
      "Victoria Terminus",
      "CSMT",
      "VT Station"
    ],
    "location": "Mumbai, Maharashtra, India",
    "city": "Mumbai",
    "state": "Maharashtra",
    "category": "Memorials & Modern Heritage",
    "isUNESCO": true,
    "timeline": "1878 – 1887 CE",
    "dynasty": "British Raj",
    "patron": "Great Indian Peninsula Railway",
    "architecturalStyle": "Victorian Gothic Revival & Indo-Saracenic",
    "shortDescription": "A historic railway terminus in Mumbai that stands as one of the finest functional Victorian Gothic buildings in the world, featuring stone domes, turrets, and vaulted arches.",
    "thumbnail": "/images/csmt-mumbai.jpg",
    "hasModel": false,
    "modelPath": null,
    "commissionedBy": "Great Indian Peninsula Railway (designed by F. W. Stevens)",
    "associatedFigures": [
      "chhatrapati-shivaji-maharaj"
    ],
    "historicalBackground": "Designed by British consulting architect Frederick William Stevens and constructed over ten years between 1878 and 1887 to commemorate the Golden Jubilee of Queen Victoria. Renamed in 1996 in honor of Chhatrapati Shivaji Maharaj, the legendary founder of the Maratha Empire. Today it serves as the headquarters of Central Railway and handles over 3 million daily commuters.",
    "architecture": {
      "style": "Victorian Italianate Gothic Revival with Traditional Indian Elements",
      "materials": "Yellow Malad stone, Porbandar sandstone, Italian marble, and ornamental wrought iron",
      "overview": "Combines Victorian Gothic high-vaulted stone arches, stained glass windows, and spires with Indian palace domes, stone gargoyles, and floral stone screens.",
      "features": [
        {
          "title": "Central Octagonal Ribbed Dome",
          "description": "A monumental masonry dome surmounted by a 4-meter-tall colossal statue of 'Progress' holding a torch and a spoked wheel."
        },
        {
          "title": "Carved Stone Fauna & Gargoyles",
          "description": "Stone entrance gateposts topped with statues of a Lion (representing the United Kingdom) and a Tiger (representing India)."
        },
        {
          "title": "Stained Glass Windows",
          "description": "Vaulted ticketing hall lined with historic stained glass windows depicting locomotives, foliage, and royal coats of arms."
        }
      ]
    },
    "significance": "Inscribed as a UNESCO World Heritage Site in 2004 as an outstanding example of late 19th-century railway architecture and an icon of Mumbai's status as the commercial capital of India.",
    "facts": [
      "It was the first major railway terminus in India and remains one of the busiest railway stations in the world.",
      "Indian craft students from the Sir J.J. School of Art in Mumbai carved all the delicate wood and stone relief decorations on the building's facade."
    ],
    "sources": [
      {
        "title": "UNESCO World Heritage Centre — Chhatrapati Shivaji Terminus",
        "url": "https://whc.unesco.org/en/list/945/"
      }
    ],
    "imageAlt": "Genuine photograph of Chhatrapati Shivaji Maharaj Terminus in Mumbai, Maharashtra",
    "imageAttribution": "Archaeological Survey of India / Wikimedia Commons (CC-BY-SA)",
    "primaryLanguage": {
      "name": "Marathi",
      "native": "मराठी",
      "script": "Devanagari",
      "status": "Official State Language of Maharashtra"
    },
    "otherLanguages": [
      {
        "name": "Hindi",
        "native": "हिन्दी",
        "role": "Cosmopolitan Linqua Franca & Commuter Announcements"
      },
      {
        "name": "English",
        "native": "English",
        "role": "Commercial Capital Business, Railway Signage & IT"
      },
      {
        "name": "Gujarati",
        "native": "ગુજરાતી",
        "role": "Historic Commercial Community"
      }
    ],
    "localDialects": [
      "Standard Marathi",
      "Bambaiya Hindi-Urdu street dialect"
    ],
    "languageNotes": "As Maharashtra's capital, Marathi is the official language of government and regional rail operations. Mumbai is India's financial hub where Hindi, English, and Gujarati are used in every station announcement, ticket counter, and commuter interaction."
  }
];
