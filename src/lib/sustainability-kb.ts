// ============================================
// THADAM AI — Offline Sustainability Knowledge Base
// Used as fallback when Gemini is unavailable
// ============================================

interface KBEntry {
  keywords: string[];
  response: string;
}

const knowledgeBase: KBEntry[] = [
  // Carbon Footprint
  { keywords: ['carbon footprint', 'carbon emission', 'co2', 'greenhouse gas'], response: '🌍 **Understanding Your Carbon Footprint**\n\nYour carbon footprint is the total greenhouse gas emissions caused by your actions. The average Indian produces about 1.9 tonnes of CO2 per year. Here are practical steps to reduce it:\n\n• **Transport**: Walk, cycle, or use public transit — a single bus ride saves ~2.6 kg CO2 vs. a car trip\n• **Energy**: Switch to LED bulbs (saves 80% energy), use a 5-star rated AC, and turn off standby appliances\n• **Diet**: Reduce red meat — beef produces 27 kg CO2 per kg; switching to lentils drops that to 0.9 kg\n• **Shopping**: Buy local products to cut transport emissions by up to 50%\n\nUse the THADAM Carbon Tracker to monitor your daily impact!' },

  { keywords: ['reduce carbon', 'lower carbon', 'cut emissions', 'reduce emissions', 'decrease footprint'], response: '♻️ **Top 10 Ways to Reduce Your Carbon Footprint**\n\n1. **Switch to public transport** — saves 2.4 kg CO2 per trip\n2. **Use LED lighting** — 80% more efficient than incandescent\n3. **Reduce air conditioning** by 2°C — saves ~900 kg CO2/year\n4. **Go vegetarian 2 days/week** — saves ~200 kg CO2/year\n5. **Use a reusable water bottle** — prevents 156 plastic bottles/year\n6. **Compost food waste** — reduces methane from landfills\n7. **Unplug chargers** when not in use — phantom loads waste 10% energy\n8. **Buy seasonal, local produce** — lower transport emissions\n9. **Air-dry clothes** instead of using a dryer — saves 2.4 kg CO2/load\n10. **Plant a tree** — absorbs ~22 kg CO2/year\n\nTrack your progress with THADAM\'s Carbon Score!' },

  { keywords: ['carbon calculator', 'calculate carbon', 'measure footprint', 'track carbon'], response: '📊 **How to Calculate Your Carbon Footprint**\n\nYour carbon footprint comes from these key categories:\n\n• **Transportation** (40%): Track km driven, flights taken, and public transit usage\n• **Home Energy** (30%): Monitor electricity (kWh) and cooking gas (kg) consumption\n• **Food & Diet** (20%): Log meals — meat-heavy diets produce 3x more CO2\n• **Shopping & Waste** (10%): Track purchases and recycling habits\n\n**THADAM calculates this automatically!** Simply log your daily activities and our AI generates your personalized Carbon Score (0–100). Higher scores mean lower environmental impact.\n\nVisit the Carbon Tracker page to start logging!' },

  // Recycling
  { keywords: ['recycle', 'recycling', 'recyclable', 'recycling tips'], response: '♻️ **Smart Recycling Guide**\n\nNot all materials are recycled the same way:\n\n**✅ Always Recyclable:**\n• PET bottles (water, soft drinks)\n• Aluminium cans\n• Cardboard boxes (flatten first!)\n• Paper (not tissue or napkins)\n• Glass bottles and jars\n\n**❌ NOT Recyclable in regular bins:**\n• Styrofoam / thermocol\n• Chip packets (multi-layer plastic)\n• Wet or food-stained paper\n• Ceramic or Pyrex glass\n• Medical waste\n\n**💡 Pro Tips:**\n• Rinse containers before recycling\n• Remove caps from bottles\n• Flatten boxes to save space\n• Use THADAM Smart Machines for verified recycling + reward points!' },

  { keywords: ['plastic', 'plastic waste', 'plastic pollution', 'single use'], response: '🚫 **Tackling Plastic Waste**\n\nIndia generates 26,000 tonnes of plastic waste daily, but only 60% is collected.\n\n**Types of Plastic:**\n• PET (#1) — Water bottles → Highly recyclable\n• HDPE (#2) — Milk jugs, shampoo bottles → Recyclable\n• PVC (#3) — Pipes, cling wrap → Difficult to recycle\n• LDPE (#4) — Grocery bags → Some facilities accept\n• PP (#5) — Yogurt cups, bottle caps → Check locally\n• PS (#6) — Styrofoam → NOT recyclable\n\n**Action Steps:**\n1. Carry a reusable bag (saves 500 plastic bags/year)\n2. Use a steel water bottle\n3. Refuse straws and single-use cutlery\n4. Scan plastic items with THADAM Scanner to check recyclability!' },

  { keywords: ['e-waste', 'electronic waste', 'old phone', 'old laptop', 'battery disposal'], response: '🔌 **E-Waste Disposal Guide**\n\nElectronic waste is one of the fastest-growing waste streams globally.\n\n**What counts as E-Waste?**\n• Mobile phones and tablets\n• Laptops and computers\n• Batteries (lithium-ion, lead-acid)\n• Chargers and cables\n• TV screens and monitors\n• Printers and cartridges\n\n**How to dispose properly:**\n1. **Never throw in regular trash** — contains lead, mercury, cadmium\n2. Use certified e-waste collection centres\n3. THADAM Smart Machines accept small e-waste items\n4. Many manufacturers offer take-back programs\n5. Data-wipe devices before disposal\n\n**Reward:** E-waste recycling earns **100 THADAM points** per item!' },

  // Electric Vehicles
  { keywords: ['electric vehicle', 'ev', 'electric car', 'electric bike', 'electric scooter'], response: '⚡ **Electric Vehicles & Sustainability**\n\nEVs produce zero direct emissions and are 3–4x more energy efficient than petrol vehicles.\n\n**Benefits:**\n• 60–80% lower lifetime CO2 emissions\n• ₹1–1.5/km running cost vs ₹5–8/km for petrol\n• Government subsidies up to ₹1.5 lakh under FAME-II\n• Lower maintenance (fewer moving parts)\n\n**Charging Tips:**\n• Charge during off-peak hours (11 PM – 6 AM)\n• Use solar charging if available — truly zero-emission\n• Public charging stations are growing rapidly across India\n\n**Popular options in India:**\n• Ola S1 Pro, Ather 450X (scooters)\n• Tata Nexon EV, MG ZS EV (cars)\n• Revolt RV400 (motorcycle)\n\nLog your EV rides in THADAM for bonus carbon savings!' },

  // Solar Energy
  { keywords: ['solar', 'solar energy', 'solar panel', 'renewable energy', 'solar power'], response: '☀️ **Solar Energy for Homes**\n\n**Why Go Solar?**\n• India receives 300+ sunny days per year\n• A 3kW rooftop system can save ₹40,000–60,000/year\n• Government subsidies cover 40% of cost for first 3kW\n• Payback period: 4–5 years, lifespan: 25+ years\n\n**How It Works:**\n1. Solar panels convert sunlight to DC electricity\n2. An inverter converts DC to AC for home use\n3. Net metering sends excess power back to grid (earn credits!)\n\n**Getting Started:**\n• Calculate your requirement: 1kW per 100 sq ft\n• Apply via the PM Surya Ghar scheme\n• Choose a BIS-certified installer\n\nLog your solar generation in THADAM to track your green energy impact!' },

  // Water Conservation
  { keywords: ['water', 'water conservation', 'save water', 'water waste', 'water saving'], response: '💧 **Water Conservation Tips**\n\nFreshwater is only 2.5% of Earth\'s water supply.\n\n**At Home:**\n• Fix leaky taps — saves up to 20 litres/day\n• 5-minute showers instead of 10 — saves 45 litres\n• Use a bucket instead of a hose for car washing\n• Collect AC condensate water for plants\n• Install low-flow aerators on taps\n\n**In the Kitchen:**\n• Wash vegetables in a bowl, not running water\n• Use a dishwasher only when full — saves 20 litres per load\n• Reuse cooking water (pasta/rice) for watering plants\n\n**Rainwater Harvesting:**\n• A 100 sq ft roof can collect 6,000 litres per year\n• Mandatory in many Indian cities\n• Recharge groundwater and reduce water bills\n\nEvery litre saved reduces your water footprint!' },

  // Composting
  { keywords: ['compost', 'composting', 'organic waste', 'food waste', 'kitchen waste'], response: '🌱 **Home Composting Guide**\n\nFood waste in landfills produces methane — 25x more potent than CO2.\n\n**What to Compost:**\n✅ Fruit and vegetable peels\n✅ Coffee grounds and tea bags\n✅ Eggshells (crushed)\n✅ Dry leaves and garden waste\n✅ Newspaper (shredded)\n\n**What NOT to Compost:**\n❌ Meat, fish, dairy\n❌ Oily or cooked food\n❌ Diseased plants\n❌ Pet waste\n\n**Simple Method:**\n1. Get a 20L bucket with a lid\n2. Layer green waste (wet) and brown waste (dry) in 1:2 ratio\n3. Add a handful of soil\n4. Turn every 3–4 days\n5. Ready in 45–60 days!\n\nComposting earns THADAM rewards and reduces your waste footprint!' },

  // Public Transport
  { keywords: ['public transport', 'bus', 'metro', 'train', 'commute', 'transit'], response: '🚇 **Public Transport & Carbon Savings**\n\n**CO2 per passenger-km:**\n• Walking/Cycling: 0 g\n• Metro/Train: 30–40 g\n• Bus: 60–80 g\n• Petrol Car (solo): 170–200 g\n• Auto-rickshaw: 90 g\n\n**Tips for Green Commuting:**\n1. Use metro for distances > 5 km\n2. Cycle or walk for last-mile connectivity\n3. Carpool when public transit isn\'t available\n4. Work from home 2 days/week — saves ~1,200 kg CO2/year\n5. Plan errands to combine trips\n\n**Chennai Transport Options:**\n• CMRL Metro: 54.1 km network\n• MTC Buses: 3,000+ routes\n• MRTS: Beach to Velachery corridor\n\nLog your commute in THADAM to earn reward points!' },

  // Smart Cities
  { keywords: ['smart city', 'smart cities', 'urban sustainability', 'sustainable city'], response: '🏙️ **Smart Cities & Sustainability**\n\nIndia\'s Smart Cities Mission covers 100 cities with green infrastructure goals.\n\n**Key Features:**\n• **Smart Waste Management**: IoT-enabled bins with fill-level sensors (like THADAM!)\n• **Green Transport**: EV charging networks, cycle-sharing, metro expansion\n• **Renewable Energy**: Rooftop solar mandates for new buildings\n• **Water Management**: Smart meters, rainwater harvesting, recycled water\n• **Air Quality**: Real-time AQI monitoring stations\n\n**Chennai\'s Green Initiatives:**\n• 100% LED street lighting\n• 54 km metro network (expanding)\n• Mandatory rainwater harvesting\n• Coastal restoration projects\n\nTHADAM Smart Machines are part of this smart city ecosystem!' },

  // Sustainable Food
  { keywords: ['sustainable food', 'food sustainability', 'diet', 'vegan', 'vegetarian', 'meat'], response: '🥗 **Sustainable Food Choices**\n\n**CO2 per kg of food produced:**\n• Beef: 27 kg CO2\n• Lamb: 39 kg CO2\n• Cheese: 13.5 kg CO2\n• Chicken: 6.9 kg CO2\n• Rice: 2.7 kg CO2\n• Lentils/Dal: 0.9 kg CO2\n• Vegetables: 0.4 kg CO2\n\n**Tips:**\n1. **Eat seasonal** — imported food has 10x higher transport emissions\n2. **Reduce food waste** — 40% of food produced is wasted globally\n3. **Buy local** — supports farmers and cuts logistics emissions\n4. **Millet over rice** — uses 70% less water to grow\n5. **Plan meals** — reduces impulse buying and waste\n\nIndia\'s traditional diet (dal, roti, sabzi) is already one of the most sustainable globally!' },

  // Climate Change
  { keywords: ['climate change', 'global warming', 'climate crisis', 'temperature rise'], response: '🌡️ **Climate Change Facts & Action**\n\n**Current State:**\n• Global temperature has risen 1.1°C since pre-industrial times\n• India is the 3rd largest CO2 emitter globally\n• Sea levels are rising 3.3 mm per year\n• Extreme weather events have increased 5x since the 1970s\n\n**India\'s Climate Goals (COP26):**\n• Net-zero emissions by 2070\n• 50% energy from renewables by 2030\n• 1 billion tonnes CO2 reduction by 2030\n• 500 GW non-fossil fuel capacity by 2030\n\n**What YOU Can Do:**\n1. Reduce personal carbon footprint by 20% this year\n2. Support renewable energy adoption\n3. Vote for climate-conscious policies\n4. Educate others about sustainability\n5. Use tools like THADAM to track and reduce your impact\n\nEvery action counts!' },

  // Green Living
  { keywords: ['green living', 'eco friendly', 'sustainable living', 'zero waste', 'eco tips'], response: '🌿 **Green Living Essentials**\n\n**Morning Routine:**\n• Use a bamboo toothbrush (plastic ones take 400 years to decompose)\n• Choose bar soap over liquid (less plastic packaging)\n• Carry a reusable coffee cup\n\n**Shopping:**\n• Bring cloth bags (avoid 500 plastic bags/year)\n• Buy in bulk to reduce packaging\n• Choose products with minimal or recyclable packaging\n• Support local and sustainable brands\n\n**At Home:**\n• Use natural cleaners (vinegar + baking soda)\n• Switch to cloth napkins\n• Repair before replacing\n• Use energy-efficient appliances (5-star BEE rating)\n\n**Digital Footprint:**\n• Unsubscribe from unnecessary emails (each email = 4g CO2)\n• Stream in SD instead of 4K when possible\n• Delete unused cloud storage\n\nSmall changes create big impact over time!' },

  // General / AI / How
  { keywords: ['what is ai', 'artificial intelligence', 'how does ai work'], response: '🤖 **AI & Sustainability**\n\nArtificial Intelligence is a branch of computer science that enables machines to learn from data and make intelligent decisions.\n\n**How THADAM Uses AI:**\n• **Gemini Vision**: Scans waste items to identify material type and recyclability\n• **AI Coach**: Provides personalized sustainability advice based on your habits\n• **Carbon Twin**: AI generates an eco-friendlier version of your lifestyle\n• **Smart Predictions**: Forecasts your carbon trajectory and suggests improvements\n\n**AI for Climate Action:**\n• Optimizing renewable energy grids\n• Predicting extreme weather events\n• Monitoring deforestation via satellite\n• Improving crop yields with precision agriculture\n• Smart traffic management to reduce emissions\n\nTHADAM combines Google Gemini AI with real sustainability data to help you make better choices!' },

  { keywords: ['thadam', 'what is thadam', 'how does thadam work', 'about thadam'], response: '🌍 **About THADAM AI**\n\nTHADAM (Tamil: தடம் — meaning "footprint") is an AI-powered sustainability platform that helps you:\n\n1. **Understand** your carbon footprint through smart tracking\n2. **Track** daily activities and their environmental impact\n3. **Reduce** emissions with AI-powered recommendations\n\n**Key Features:**\n• 📊 **Carbon Tracker**: Log transport, energy, food, and shopping data\n• 🤖 **AI Coach**: Gemini-powered sustainability assistant\n• 📸 **Waste Scanner**: Scan any item to check recyclability\n• 🏆 **Rewards**: Earn points for eco-friendly actions\n• 🗺️ **Machine Locator**: Find nearby THADAM Smart Machines\n• 👥 **Carbon Twin**: AI-generated eco-twin comparison\n\n**Built with:** Next.js 15, Google Gemini, Firebase, Prisma, Google Maps' },

  { keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'], response: '👋 Hello! I\'m THADAM AI, your sustainability coach.\n\nI can help you with:\n• 🌍 Understanding your carbon footprint\n• ♻️ Recycling tips and waste management\n• ⚡ Energy saving advice\n• 🚇 Green commuting options\n• 🌱 Composting and zero-waste living\n• 📸 Scanning items for recyclability\n\nWhat would you like to know about sustainability today?' },

  { keywords: ['thank', 'thanks', 'thank you'], response: 'You\'re welcome! 🌱 Remember, every small sustainable action adds up. Keep using THADAM to track your impact and earn rewards for your eco-friendly choices!\n\nIs there anything else about sustainability I can help you with?' },

  { keywords: ['joke', 'funny', 'humor'], response: '😄 Here\'s an eco-friendly joke:\n\n**Why did the recycling bin break up with the trash can?**\nBecause it found someone who could actually sort things out! ♻️\n\n**What did the tree say to the wind?**\nLeaf me alone!\n\n**Why is the ocean so salty?**\nBecause the land doesn\'t wave back! 🌊\n\nBut seriously — did you know that telling a joke uses less energy than streaming a video? Even humor can be sustainable! 😁' },

  // Energy
  { keywords: ['energy', 'electricity', 'power', 'energy saving', 'power bill'], response: '⚡ **Energy Saving Guide**\n\n**Quick Wins:**\n• Switch to LED bulbs — saves ₹2,000/year for 10 bulbs\n• Set AC to 24°C (not 18°C) — saves 24% energy\n• Use 5-star appliances — 30% more efficient\n• Solar water heater — saves ₹8,000/year\n\n**Smart Home Tips:**\n• Install smart plugs to kill phantom loads\n• Use a power strip for entertainment systems\n• Natural ventilation in mornings and evenings\n• Use pressure cooker (uses 70% less energy)\n\n**Renewable Options:**\n• Rooftop solar: ₹3–4/watt installed\n• Solar inverter: Powers essentials during outages\n• Green tariff: Some utilities offer 100% renewable plans\n\n**Impact:** A typical Indian household can reduce energy consumption by 30% with these changes, saving ₹15,000–25,000 annually.' },

  // Rewards
  { keywords: ['reward', 'rewards', 'points', 'earn points', 'redeem'], response: '🏆 **THADAM Reward System**\n\n**Earn Points By:**\n• ♻️ Recycling at Smart Machines: 15–100 pts per item\n• 🚇 Logging public transit rides: 25–80 pts\n• 📸 Scanning items with AI Scanner: 10 pts\n• 📊 Daily carbon logging: 15 pts\n• 🏅 Completing challenges: 200–500 pts\n\n**Redeem Rewards:**\n• 🚇 Chennai Metro 1-Day Pass (150 pts)\n• 🍏 ₹100 Organic Grocery Voucher (250 pts)\n• ☕ Sustainable Coffee Cup 30% off (350 pts)\n• 🚲 ₹200 E-Bike Rent Credits (200 pts)\n\n**Current Challenges:**\n• Zero Waste Week (300 pts)\n• Eco Commuter Match (500 pts)\n• Gemini Waste Master (200 pts)\n\nVisit the Rewards page to see your balance and available offers!' },

  // Trees
  { keywords: ['tree', 'trees', 'plant tree', 'deforestation', 'afforestation'], response: '🌳 **Trees & Carbon Absorption**\n\n**Facts:**\n• One mature tree absorbs ~22 kg CO2 per year\n• A single tree produces enough oxygen for 2 people\n• India has pledged to create 2.5 billion tonnes of carbon sink by 2030\n\n**How Trees Help:**\n• Absorb CO2 and release oxygen\n• Cool surroundings by 2–8°C\n• Prevent soil erosion\n• Support biodiversity\n• Reduce air pollution by 60%\n\n**Plant Your Impact:**\n• THADAM tracks your "Trees Equivalent" — the number of trees needed to absorb the CO2 you\'ve saved\n• Join tree-planting drives through THADAM community challenges\n• Every 22 kg CO2 saved = 1 virtual tree planted!' },

  // Waste Management
  { keywords: ['waste management', 'garbage', 'trash', 'waste segregation', 'bin'], response: '🗑️ **Waste Segregation Guide**\n\n**Green Bin (Wet Waste):**\n• Kitchen waste, fruit peels\n• Leftover food\n• Garden waste, flowers\n• Tea bags, coffee grounds\n\n**Blue/Grey Bin (Dry Waste):**\n• Paper, cardboard\n• Plastic bottles, containers\n• Metal cans\n• Glass bottles\n\n**Red Bin (Hazardous):**\n• Batteries\n• Medicine, syringes\n• Paints, chemicals\n• CFL bulbs\n\n**THADAM Smart Machines** accept PET bottles, aluminium cans, and small e-waste — with instant reward points!\n\nProper segregation can divert 80% of waste from landfills.' },

  // Fashion
  { keywords: ['fashion', 'clothing', 'textile', 'fast fashion', 'sustainable fashion'], response: '👕 **Sustainable Fashion**\n\nFast fashion is the 2nd largest polluter after oil & gas.\n\n**The Problem:**\n• 92 million tonnes of textile waste annually\n• A single cotton shirt uses 2,700 litres of water\n• Synthetic fabrics shed microplastics when washed\n\n**Solutions:**\n1. **Buy less, buy better** — quality over quantity\n2. **Choose natural fibres** — cotton, linen, hemp\n3. **Thrift and swap** — extend clothing lifespan\n4. **Wash in cold water** — saves energy and reduces microfibre shedding\n5. **Repair and alter** — learn basic sewing\n6. **Donate** — give wearable clothes a second life\n\n**Indian Sustainable Brands:**\n• No Nasties (organic cotton)\n• Doodlage (upcycled fashion)\n• Okhai (handcrafted, fair trade)' },
];

/**
 * Search the sustainability knowledge base for the best matching response.
 * Returns null if no good match is found.
 */
export function searchKnowledgeBase(query: string): string | null {
  const lowerQuery = query.toLowerCase();

  let bestMatch: KBEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lowerQuery.includes(keyword)) {
        score += keyword.split(' ').length; // multi-word keywords score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Require at least a minimal match
  if (bestScore > 0 && bestMatch) {
    return bestMatch.response;
  }

  // Generic fallback
  return '🌍 **THADAM AI — Offline Sustainability Mode**\n\nI\'m currently operating in offline mode. Here are some topics I can help you with:\n\n• **Carbon Footprint** — How to measure and reduce your impact\n• **Recycling** — What can and can\'t be recycled\n• **Composting** — Turn food waste into garden gold\n• **Energy Saving** — Lower your electricity bills and emissions\n• **Green Commuting** — Public transport and EV options\n• **Sustainable Food** — Eco-friendly diet choices\n• **E-Waste** — Safe disposal of electronics\n• **Water Conservation** — Save every drop\n\nTry asking about any of these topics!';
}
