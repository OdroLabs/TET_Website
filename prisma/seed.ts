import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---------- Admin user ----------
  // The first account is an owner: full access, including user management.
  await prisma.user.upsert({
    where: { email: "admin@tet-srilanka.org" },
    update: { role: "owner", active: true },
    create: {
      name: "TET Admin",
      email: "admin@tet-srilanka.org",
      password: await hash("admin12345", 10),
      role: "owner",
    },
  });

  // ---------- Settings ----------
  const settings: Record<string, { en: string; si?: string; ta?: string }> = {
    site_name: {
      en: "Transgender Empowerment Trust",
      si: "ට්‍රාන්ස්ජෙන්ඩර් සවිබල ගැන්වීමේ භාරය",
      ta: "திருநங்கை மேம்பாட்டு அறக்கட்டளை",
    },
    site_tagline: {
      en: "Trans-led support for trans women in sex work — health, safety, and dignity in Sri Lanka, since 2016.",
      si: "ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා ට්‍රාන්ස් නායකත්වයෙන් යුත් සහාය — 2016 සිට ශ්‍රී ලංකාවේ සෞඛ්‍යය, ආරක්ෂාව සහ ගෞරවය.",
      ta: "பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான திருநங்கைகளால் வழிநடத்தப்படும் ஆதரவு — 2016 முதல் இலங்கையில் சுகாதாரம், பாதுகாப்பு மற்றும் கண்ணியம்.",
    },
    address: { en: "42 Independence Avenue,\nColombo 05,\nSri Lanka" },
    phone: { en: "+94 11 234 5678" },
    email: { en: "support@tet-srilanka.org" },
    whatsapp: { en: "94770001234" },
    office_hours: {
      en: "Mon–Fri, 9am–5pm. Hotline available 24/7.",
      si: "සඳුදා – සිකුරාදා, පෙ.ව. 9 – ප.ව. 5. හදිසි උපකාරක මාර්ගය 24/7 පවතී.",
      ta: "திங்கள் – வெள்ளி, காலை 9 – மாலை 5. உதவி இணைப்பு எண் 24/7 கிடைக்கும்.",
    },
    facebook: { en: "" },
    youtube: { en: "" },
    instagram: { en: "" },
    map_embed: { en: "" },
    hero_badge: {
      en: "Free · Confidential · Trans-Led",
      si: "නොමිලේ · රහස්‍ය · ට්‍රාන්ස් නායකත්වයෙන් යුතුයි",
      ta: "இலவசம் · இரகசியம் · திருநங்கைகளால் வழிநடத்தப்படுகிறது",
    },
    hero_title: {
      en: "Health, Safety & Dignity for Trans Women in Sex Work",
      si: "ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා සෞඛ්‍යය, ආරක්ෂාව සහ ගෞරවය",
      ta: "பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான சுகாதாரம், பாதுகாப்பு மற்றும் கண்ணியம்",
    },
    hero_subtitle: {
      en: "TET is a trans-led community organization providing free healthcare navigation, legal support, and peer solidarity for trans female sex workers across Sri Lanka.",
      si: "TET යනු ශ්‍රී ලංකාව පුරා ට්‍රාන්ස් කාන්තා ලිංගික සේවා සපයන්නන් සඳහා නොමිලේ සෞඛ්‍ය මාර්ගෝපදේශනය, නීති සහාය සහ සම සහයෝගීතාවය සපයන ට්‍රාන්ස් නායකත්වයෙන් යුත් ප්‍රජා සංවිධානයකි.",
      ta: "TET என்பது இலங்கை முழுவதும் திருநங்கை பாலியல் தொழிலாளர்களுக்கு இலவச சுகாதார வழிகாட்டல், சட்ட உதவி மற்றும் சக ஒற்றுமையை வழங்கும் திருநங்கைகளால் வழிநடத்தப்படும் சமூக அமைப்பு.",
    },
    hero_points: {
      en: "Confidential & judgment-free, always\nLed by trans women, for trans women\nFree services — no cost, no barriers\nRooted in community trust",
      si: "සැමවිටම රහස්‍ය සහ විනිශ්චයෙන් තොරයි\nට්‍රාන්ස් කාන්තාවන් විසින්, ට්‍රාන්ස් කාන්තාවන් වෙනුවෙන් මෙහෙයවනු ලැබේ\nනොමිලේ සේවා — වියදමක් නැත, බාධක නැත\nප්‍රජා විශ්වාසය මත පදනම් වේ",
      ta: "எப்போதும் இரகசியமும் தீர்ப்பற்றதும்\nதிருநங்கைகளால், திருநங்கைகளுக்காக வழிநடத்தப்படுகிறது\nஇலவச சேவைகள் — செலவு இல்லை, தடைகள் இல்லை\nசமூக நம்பிக்கையில் வேரூன்றியது",
    },
    hero_footnote: {
      en: "6 outreach sites · 9 partner clinics · 3 provinces served",
      si: "ප්‍රවේශ ස්ථාන 6ක් · හවුල්කාර සායන 9ක් · පළාත් 3කට සේවා සපයයි",
      ta: "6 அணுகல் தளங்கள் · 9 பங்காளர் மருத்துவமனைகள் · 3 மாகாணங்களுக்கு சேவை",
    },
    about_overview: {
      en: "TET was founded in 2016 by a small group of trans women in sex work who were tired of navigating hostile clinics, unresponsive police, and services that were never designed with them in mind. A decade later, we're a trans-led team of outreach workers, peer counsellors, legal advocates, and volunteers working across 3 provinces of Sri Lanka.",
      si: "සතුරු සායන, ප්‍රතිචාර නොදක්වන පොලීසිය සහ ඔවුන් සිතට ගෙන කිසිදා නිර්මාණය නොකළ සේවා අතරින් ගමන් කිරීමට වෙහෙසට පත් ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන්ගේ කුඩා පිරිසක් විසින් TET 2016 දී ආරම්භ කරන ලදී. දශකයකට පසු, අපි ශ්‍රී ලංකාවේ පළාත් 3ක් පුරා කටයුතු කරන ප්‍රවේශ සේවකයින්, සම උපදේශකයින්, නීති පෙනී සිටින්නන් සහ ස්වේච්ඡා සේවකයින්ගෙන් සමන්විත ට්‍රාන්ස් නායකත්වයෙන් යුත් කණ්ඩායමකි.",
      ta: "விரோதப் போக்குடைய கிளினிக்குகள், பதிலளிக்காத காவல்துறை, மற்றும் தங்களை மனதில் கொள்ளாமல் வடிவமைக்கப்பட்ட சேவைகளை எதிர்கொள்ள சோர்வடைந்த பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளின் ஒரு சிறு குழுவினரால் TET 2016 இல் நிறுவப்பட்டது. ஒரு தசாப்தத்திற்குப் பிறகு, நாங்கள் இலங்கையின் 3 மாகாணங்களில் செயல்படும் அணுகல் பணியாளர்கள், சக ஆலோசகர்கள், சட்ட வக்கீல்கள் மற்றும் தன்னார்வலர்களைக் கொண்ட திருநங்கைகளால் வழிநடத்தப்படும் குழு.",
    },
    about_vision: {
      en: "A future where dignity isn't conditional — where trans women in sex work can access healthcare, justice, and opportunity without fear of discrimination, violence, or erasure.",
      si: "ගෞරවය කොන්දේසි සහිත නොවන අනාගතයක් — ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන්ට වෙනස්කම්, ප්‍රචණ්ඩත්වය හෝ මකා දැමීම ගැන බියෙන් තොරව සෞඛ්‍ය සේවා, යුක්තිය සහ අවස්ථා වෙත ප්‍රවේශ විය හැකි අනාගතයක්.",
      ta: "கண்ணியம் நிபந்தனைக்குட்பட்டதாக இல்லாத ஒரு எதிர்காலம் — பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகள் பாகுபாடு, வன்முறை அல்லது அழிப்பு பற்றிய பயமின்றி சுகாதாரம், நீதி மற்றும் வாய்ப்புகளை அணுக முடியும் எதிர்காலம்.",
    },
    about_mission: {
      en: "To improve access to healthcare, defend human rights, and strengthen community for trans women engaged in sex work in Sri Lanka — through services that are confidential, free, and led by people who understand the work firsthand.",
      si: "ශ්‍රී ලංකාවේ ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා සෞඛ්‍ය ප්‍රවේශය වැඩිදියුණු කිරීම, මානව හිමිකම් ආරක්ෂා කිරීම සහ ප්‍රජාව ශක්තිමත් කිරීම — රහස්‍ය, නොමිලේ සහ මෙම කාර්යය මුලින්ම තේරුම් ගන්නා අය විසින් මෙහෙයවනු ලබන සේවා හරහා.",
      ta: "இலங்கையில் பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான சுகாதார அணுகலை மேம்படுத்துதல், மனித உரிமைகளை பாதுகாத்தல், சமூகத்தை வலுப்படுத்துதல் — இரகசியமான, இலவசமான, இப்பணியை நேரடியாக புரிந்துகொள்பவர்களால் வழிநடத்தப்படும் சேவைகள் மூலம்.",
    },
    about_community: {
      en: "TET serves trans women engaged in sex work across Sri Lanka, alongside the wider trans community facing stigma, violence, or economic hardship. Our programs are community-led, across 6 outreach sites in 3 provinces with 9 partner clinics.",
      si: "TET ශ්‍රී ලංකාව පුරා ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන්ට, අපකීර්තියට, ප්‍රචණ්ඩත්වයට හෝ ආර්ථික දුෂ්කරතාවලට මුහුණ දෙන පුළුල් ට්‍රාන්ස් ප්‍රජාව සමඟ සේවය කරයි. අපගේ වැඩසටහන් ප්‍රජා නායකත්වයෙන් යුක්තයි — පළාත් 3ක ප්‍රවේශ ස්ථාන 6ක්, හවුල්කාර සායන 9ක් සමඟ.",
      ta: "TET இலங்கை முழுவதும் பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கும், களங்கம், வன்முறை அல்லது பொருளாதார சிரமங்களை எதிர்கொள்ளும் பரந்த திருநங்கை சமூகத்திற்கும் சேவை செய்கிறது. எங்கள் திட்டங்கள் சமூகத்தால் வழிநடத்தப்படுகின்றன — 3 மாகாணங்களில் 6 அணுகல் தளங்கள், 9 பங்காளர் மருத்துவமனைகளுடன்.",
    },
    donate_intro: {
      en: "Every donation goes directly toward healthcare navigation, legal aid, crisis support, and outreach for trans women in sex work.",
      si: "සෑම පරිත්‍යාගයක්ම ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා සෞඛ්‍ය මාර්ගෝපදේශනය, නීති සහාය, හදිසි උපකාර සහ ප්‍රජා ප්‍රවේශය සඳහා සෘජුවම යොදවනු ලැබේ.",
      ta: "ஒவ்வொரு நன்கொடையும் பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான சுகாதார வழிகாட்டல், சட்ட உதவி, நெருக்கடி ஆதரவு மற்றும் அணுகல் பணிக்கு நேரடியாக செல்கிறது.",
    },
    bank_details: {
      en: "Account Name: Transgender Empowerment Trust\nBank: (your bank)\nBranch: (your branch)\nAccount No: (your account number)\nSWIFT: (for international transfers)",
    },
  };

  for (const [key, v] of Object.entries(settings)) {
    await prisma.setting.upsert({
      where: { key },
      update: {},
      create: { key, valueEn: v.en, valueSi: v.si ?? null, valueTa: v.ta ?? null },
    });
  }

  // ---------- Stats ----------
  const stats = [
    { labelEn: "Women Supported", labelSi: "සහාය ලැබූ කාන්තාවන්", labelTa: "ஆதரவு பெற்ற பெண்கள்", value: "1,200+", order: 1 },
    { labelEn: "Health & HIV Screenings", labelSi: "සෞඛ්‍ය සහ HIV පරීක්ෂණ", labelTa: "சுகாதாரம் & HIV பரிசோதனைகள்", value: "3,400+", order: 2 },
    { labelEn: "Legal Cases Supported", labelSi: "සහාය දක්වන ලද නීති නඩු", labelTa: "ஆதரவளிக்கப்பட்ட சட்ட வழக்குகள்", value: "180+", order: 3 },
    { labelEn: "Peer Counselling Sessions", labelSi: "සම උපදේශන සැසි", labelTa: "சக ஆலோசனை அமர்வுகள்", value: "2,600+", order: 4 },
  ];
  if ((await prisma.stat.count()) === 0) {
    await prisma.stat.createMany({ data: stats });
  }

  // ---------- Services ----------
  const services = [
    {
      icon: "🏥",
      titleEn: "Healthcare Navigation",
      titleSi: "සෞඛ්‍ය මාර්ගෝපදේශනය",
      titleTa: "சுகாதார வழிகாட்டல்",
      descriptionEn: "Referrals and escorted visits to trans-friendly clinics for general checkups, hormone therapy support, and gender-affirming care — without judgment or misgendering.",
      descriptionSi: "සාමාන්‍ය පරීක්ෂණ, හෝමෝන චිකිත්සක සහාය සහ ස්ත්‍රී පුරුෂ භාවය තහවුරු කරන සත්කාරය සඳහා ට්‍රාන්ස්-හිතකාමී සායන වෙත යොමු කිරීම් සහ සහායක ගමන් — විනිශ්චයකින් තොරව.",
      descriptionTa: "பொது பரிசோதனைகள், ஹார்மோன் சிகிச்சை ஆதரவு மற்றும் பாலின உறுதிப்படுத்தல் பராமரிப்புக்காக திருநங்கை-நட்பு கிளினிக்குகளுக்கான பரிந்துரைகள் மற்றும் துணை வருகைகள் — தீர்ப்பின்றி.",
      contentEn:
        "Access to respectful, trans-friendly healthcare is at the heart of everything TET does. Many of the women we serve face stigma, cost barriers, refusal of care, or misgendering when seeking medical treatment — so we walk with them through every step of the journey.\n\nOur healthcare navigation service connects women to a trusted network of clinics and hospitals built over a decade of relationship-building. Peer navigators accompany women to appointments where needed, help explain procedures and results, and follow up to make sure treatment plans — including hormone therapy — are completed without interruption.",
      featuresEn:
        "Trusted network of trans-friendly clinics & hospitals\nPeer navigators who accompany appointments\nHormone therapy access support\nFree health screenings and follow-up\nConfidential, judgment-free care\nHealth education at outreach sites",
      benefitsEn:
        "Care Without Misgendering :: Every partner clinic in our network is oriented to provide respectful, correctly-gendered care.\nBetter Health Outcomes :: Women complete treatment plans at far higher rates when supported by a peer navigator from first referral to final follow-up.\nEarly Detection :: Regular outreach screenings catch health issues early, when they are easiest and least costly to treat.",
      faqsEn:
        "Is the service really free? :: Yes. Screenings, referrals, and accompaniment are provided at no cost.\nWill my information be kept private? :: Absolutely. All records are confidential and nothing is shared without your written consent, including with police or family.\nHow do I get a referral? :: Contact our office, speak to any TET peer navigator, or visit an outreach site — no documents or prior appointment needed.\nCan you accompany me to the clinic? :: Yes. A trained peer navigator can accompany you to appointments if you would like support.",
      image: "/illustrations/illus-healthcare.svg",
      order: 1,
    },
    {
      icon: "🩺",
      titleEn: "HIV & STI Prevention",
      titleSi: "HIV සහ STI වැළැක්වීම",
      titleTa: "HIV & STI தடுப்பு",
      descriptionEn: "Free, confidential testing, PrEP/PEP navigation and prescription support, and regular distribution of condoms and lubricant at outreach sites.",
      descriptionSi: "නොමිලේ, රහස්‍ය පරීක්ෂණ, PrEP/PEP මාර්ගෝපදේශනය සහ ප්‍රවේශ ස්ථානවල නිතිපතා කොන්ඩම් සහ ලිහිසි ද්‍රව්‍ය බෙදාහැරීම.",
      descriptionTa: "இலவச, இரகசிய பரிசோதனை, PrEP/PEP வழிகாட்டல் மற்றும் அணுகல் தளங்களில் ஆணுறை மற்றும் லூப்ரிக்கண்ட் விநியோகம்.",
      contentEn:
        "TET has been a frontline partner in Sri Lanka's HIV response for over a decade, reaching communities that formal health systems often miss. Our approach puts confidentiality and informed choice first — no one is ever pressured, and no one is ever judged.\n\nTrained peer educators deliver accurate prevention information at outreach sites, distribute prevention materials, and support access to voluntary testing and PrEP/PEP. For anyone who tests positive, we provide immediate emotional support, fast-tracked linkage to treatment, and ongoing peer accompaniment so nobody faces the journey alone.",
      featuresEn:
        "Peer-led prevention education\nFree condom & lubricant distribution\nPrEP/PEP navigation and prescription support\nSupport for voluntary, confidential testing\nFast-track linkage to treatment services\nOngoing peer support after diagnosis",
      benefitsEn:
        "Informed Choices :: Accurate, judgment-free information lets every person make their own decisions about testing and prevention.\nEarlier Diagnosis :: Community-based outreach means testing reaches people years earlier than clinic-only models.\nNo One Left Alone :: Peer supporters stay connected after diagnosis, improving treatment retention and wellbeing.",
      faqsEn:
        "Is testing confidential? :: Yes. Testing is voluntary and confidential, and we can connect you to anonymous testing options.\nWhat happens if I test positive? :: A trained peer supporter will be with you from day one — emotionally and practically — and help you start treatment quickly.\nCan you help me access PrEP? :: Yes, we support navigation and prescription access for PrEP and PEP.\nHow can I get prevention materials? :: Through any peer educator, our office, or outreach events — always free.",
      image: "/illustrations/illus-hiv.svg",
      order: 2,
    },
    {
      icon: "💬",
      titleEn: "Mental Health & Peer Counselling",
      titleSi: "මානසික සෞඛ්‍යය සහ සම උපදේශනය",
      titleTa: "மனநலம் & சக ஆலோசனை",
      descriptionEn: "One-on-one and group counselling delivered by trained peer counsellors, plus referral to trauma-informed professional therapists when needed.",
      descriptionSi: "පුහුණු ලත් සම උපදේශකයින් විසින් සපයන එකින් එක සහ කණ්ඩායම් උපදේශනය, අවශ්‍ය විට කම්පන-දැනුවත් වෘත්තීය චිකිත්සකයින් වෙත යොමු කිරීම.",
      descriptionTa: "பயிற்சி பெற்ற சக ஆலோசகர்களால் வழங்கப்படும் தனிநபர் மற்றும் குழு ஆலோசனை, தேவைப்படும்போது அதிர்ச்சி-அறிந்த தொழில்முறை சிகிச்சையாளர்களுக்கு பரிந்துரை.",
      contentEn:
        "Healing takes more than medicine. Many of the women TET serves carry the weight of violence, stigma, family rejection, and economic stress — often with nowhere safe to talk about it.\n\nOur counselling service offers a safe, confidential space with trained peer counsellors who share lived experience, in person or by phone. Alongside one-on-one counselling, peer support circles bring women together to share experiences and build resilience with others who truly understand. Sessions are free, and women decide the pace — there is no pressure and no time limit on healing.",
      featuresEn:
        "Trained peer counsellors with lived experience\nOne-on-one and group sessions\nIn-person and phone counselling\nPeer support circles\nReferral to trauma-informed professional therapists\nCompletely free and confidential",
      benefitsEn:
        "A Safe Space :: A confidential room and a trusted listener — often the first safe space a woman has ever had to speak freely.\nStronger Together :: Peer circles turn isolation into community, with women supporting each other long after sessions end.\nPractical Coping Tools :: Counsellors teach concrete techniques for stress, grief, and anxiety that work in daily life.",
      faqsEn:
        "Do I need an appointment? :: Walk-ins are welcome, but calling ahead helps us match you with the right counsellor.\nIs counselling really confidential? :: Yes. Nothing you share leaves the room without your consent, except where someone's immediate safety is at risk.\nWhat if I just want to talk once? :: That's fine. There's no minimum commitment — come once, or come every week.\nCan you help in an emergency? :: We can connect you to crisis services immediately, including our 24/7 hotline and shelter referrals.",
      image: "/illustrations/illus-counseling.svg",
      order: 3,
    },
    {
      icon: "⚖️",
      titleEn: "Legal Aid & Rights Defense",
      titleSi: "නීති සහාය සහ අයිතිවාසිකම් ආරක්ෂණය",
      titleTa: "சட்ட உதவி & உரிமை பாதுகாப்பு",
      descriptionEn: "Free legal consultations for police harassment, arbitrary detention, workplace discrimination, and identity document (NIC/gender marker) changes.",
      descriptionSi: "පොලිස් හිරිහැර, අත්තනෝමතික අත්අඩංගුවට ගැනීම්, රැකියා ස්ථාන වෙනස්කම් සහ හැඳුනුම්පත් (NIC/ස්ත්‍රී පුරුෂ භාව සලකුණ) වෙනස් කිරීම් සඳහා නොමිලේ නීති උපදේශන.",
      descriptionTa: "காவல்துறை துன்புறுத்தல், தன்னிச்சையான காவலில் வைத்தல், பணியிட பாகுபாடு மற்றும் அடையாள ஆவண (NIC/பாலின குறியீடு) மாற்றங்களுக்கான இலவச சட்ட ஆலோசனைகள்.",
      contentEn:
        "Knowing your rights is the first step to defending them. TET's Legal Aid & Rights Defense program helps trans women in sex work understand and use the protections the law already gives them — and stands beside them when those rights are violated.\n\nWe provide one-to-one legal guidance for issues such as police harassment, violence, ID and gender marker documentation, and workplace discrimination, and connect women to sympathetic lawyers through our partnership with the Legal Aid Commission. When a woman must face a police station or court, a trained TET companion can accompany her so she never stands alone.",
      featuresEn:
        "Free one-to-one legal consultations\nReferrals to legal aid & sympathetic lawyers\nAccompaniment to police stations & courts\nHelp with NIC and gender marker documentation\nSupport for violence and harassment survivors\nRights-awareness materials in Sinhala & Tamil",
      benefitsEn:
        "Rights Made Real :: Legal knowledge is translated into plain language, so every woman knows exactly what protections she holds.\nConfidence to Act :: Accompaniment to police stations and courts removes the fear that stops most women from seeking justice.\nDocuments That Match :: Helping women update ID and gender marker documentation is one of our most requested and most valued services.",
      faqsEn:
        "I can't afford a lawyer — can you still help? :: Yes. Our guidance is free and we connect you to legal aid services that cost nothing.\nWill you come with me to the police station? :: Yes, a trained companion can accompany you to police stations, courts, and government offices.\nCan you help me update my NIC or gender marker? :: Yes, this is one of our most common and most requested services.\nIs my case kept confidential? :: Completely. We never share your information without your consent.",
      image: "/illustrations/illus-legal.svg",
      order: 4,
    },
    {
      icon: "🆘",
      titleEn: "Crisis & Emergency Support",
      titleSi: "හදිසි උපකාරය",
      titleTa: "நெருக்கடி & அவசர ஆதரவு",
      descriptionEn: "A 24/7 hotline staffed by peer responders, emergency shelter referrals, and rapid accompaniment following violence or arrest.",
      descriptionSi: "සම ප්‍රතිචාරකයින් විසින් සේවා සපයන 24/7 උපකාරක මාර්ගය, හදිසි නවාතැන් යොමු කිරීම් සහ ප්‍රචණ්ඩත්වයෙන් හෝ අත්අඩංගුවට ගැනීමෙන් පසු ඉක්මන් සහායක ගමන්.",
      descriptionTa: "சக பதிலளிப்பாளர்களால் நிர்வகிக்கப்படும் 24/7 உதவி இணைப்பு, அவசர தங்குமிட பரிந்துரைகள் மற்றும் வன்முறை அல்லது கைது செய்யப்பட்ட பிறகு விரைவான துணை.",
      contentEn:
        "Crisis does not wait for office hours. TET's 24/7 hotline is staffed by trained peer responders who understand exactly what a caller may be facing — police harassment, violence, arrest, or having nowhere safe to sleep.\n\nA single call or WhatsApp message can connect a woman to emergency shelter through our partner network, rapid accompaniment to a police station or hospital, or simply someone who will stay on the line until she feels safe. There is never a cost, and every call is confidential.",
      featuresEn:
        "24/7 hotline staffed by peer responders\nEmergency shelter referrals\nRapid accompaniment after violence or arrest\nWhatsApp support option\nCoordination with partner health & legal services\nFollow-up support after the crisis passes",
      benefitsEn:
        "Someone Always Answers :: The hotline runs around the clock, every day of the year, with no wait for office hours.\nA Bridge to Safety :: Fast referral to our shelter network means no one has to face a dangerous night with nowhere to go.\nResponders Who Understand :: Every peer responder has lived experience of the community they support.",
      faqsEn:
        "Is the hotline really free? :: Yes, calling or messaging the hotline never costs you anything beyond your own phone credit.\nWhat if I can't talk but need help? :: You can message us on WhatsApp instead of calling.\nWill you tell my family or the police? :: Never, without your explicit consent.\nWhat happens after the immediate crisis? :: A peer navigator follows up to connect you with counselling, legal, or health support as needed.",
      image: "/illustrations/illus-crisis.svg",
      order: 5,
    },
    {
      icon: "🤝",
      titleEn: "Community & Livelihood",
      titleSi: "ප්‍රජාව සහ ජීවනෝපාය",
      titleTa: "சமூகம் & வாழ்வாதாரம்",
      descriptionEn: "Peer-led savings circles, vocational skills training, and safer-work planning to support financial independence and choice.",
      descriptionSi: "මූල්‍ය ස්වාධීනත්වය සහ තේරීම සඳහා සම-මෙහෙයවන ඉතුරුම් කවයන්, වෘත්තීය කුසලතා පුහුණුව සහ ආරක්ෂිත-වැඩ සැලසුම්කරණය.",
      descriptionTa: "நிதி சுதந்திரம் மற்றும் தேர்வுக்கு ஆதரவளிக்க சக-தலைமையிலான சேமிப்பு வட்டங்கள், தொழில்முறை திறன் பயிற்சி மற்றும் பாதுகாப்பான-வேலை திட்டமிடல்.",
      contentEn:
        "Economic dependence keeps women trapped in unsafe situations. TET's Community & Livelihood program builds the practical foundations of financial independence: marketable skills, peer-led savings groups, and safety planning for work.\n\nParticipants can join savings circles, vocational training tracks, and safer-work planning sessions that respect each woman's own choices about her work. Finished products from vocational training are showcased through TET's Solidarity Shop, connecting women producers directly to supporters.",
      featuresEn:
        "Peer-led savings circles\nVocational skills training (tailoring, crafts, small trade)\nSafer-work planning and safety toolkits\nFinancial literacy basics\nMentoring by program graduates\nProducts sold through the Solidarity Shop",
      benefitsEn:
        "Economic Independence :: Practical skills and savings support help women build stable income on their own terms.\nSafety By Choice :: Safer-work planning respects each woman's decisions while reducing risk.\nCommunity Wealth :: Peer-led savings circles build both financial resilience and social connection.",
      faqsEn:
        "Who can join? :: Any woman connected to TET's community — no prior experience required.\nAre the trainings free? :: Yes, all training and materials are free.\nWhat is safer-work planning? :: Practical safety planning for street-based and venue-based work, developed with community input.\nCan I sell what I make? :: Yes, through TET's Solidarity Shop, which showcases community-made products.",
      image: "/illustrations/illus-economic.svg",
      order: 6,
    },
    {
      icon: "🌙",
      titleEn: "Safe Night Outreach",
      titleSi: "ආරක්ෂිත රාත්‍රී ප්‍රවේශය",
      titleTa: "பாதுகாப்பான இரவு அணுகல்",
      descriptionEn: "Mobile outreach teams work late-night hours to bring supplies, information, and a trusted contact directly to street-based workers.",
      descriptionSi: "ජංගම ප්‍රවේශ කණ්ඩායම් රාත්‍රී පැය තුළ සැපයුම්, තොරතුරු සහ විශ්වාසනීය සම්බන්ධතාවක් වීථි-පදනම් සේවකයින්ට සෘජුවම ගෙන එයි.",
      descriptionTa: "நடமாடும் அணுகல் குழுக்கள் இரவு நேரங்களில் தெரு அடிப்படையிலான தொழிலாளர்களுக்கு நேரடியாக பொருட்கள், தகவல்கள் மற்றும் நம்பகமான தொடர்பை கொண்டு வருகின்றன.",
      contentEn:
        "The women who most need support are often the least able to travel to find it, especially late at night. That is why TET goes to them. Our night outreach teams — trans women from the very communities we serve — visit street-based work areas across our 6 outreach sites.\n\nEach visit brings practical help: health supplies and information, prevention materials, a check-in on wellbeing, and simply a trusted, familiar face. Outreach is also how we learn — every visit shapes our programs around what the community actually needs.",
      featuresEn:
        "Regular late-night outreach visits\nFree condoms, lubricant & health supplies\nOn-the-spot information and referrals\nTrusted peer outreach workers\nSafety check-ins\nDirect line to the 24/7 crisis hotline",
      benefitsEn:
        "Support That Travels :: Services reach women where they work, removing transport and time barriers entirely.\nTrusted Faces :: Outreach is led by peers from the same communities, so trust is built in from the first visit.\nEyes on Safety :: Regular visits mean outreach workers often notice and respond to safety concerns early.",
      faqsEn:
        "How do I know when outreach visits my area? :: Peer educators announce visits through community networks, or contact our office for the schedule.\nIs it really free? :: Yes — supplies, information, and support are always free.\nCan I just talk, without needing anything? :: Of course. Outreach workers are there to connect, not just to hand out supplies.\nWhat if something happens after outreach leaves? :: Call or WhatsApp our 24/7 hotline any time.",
      image: "/illustrations/illus-outreach.svg",
      order: 7,
    },
    {
      icon: "🏳️‍⚧️",
      titleEn: "Gender-Affirming Support",
      titleSi: "ස්ත්‍රී පුරුෂ භාවය තහවුරු කිරීමේ සහාය",
      titleTa: "பாலின உறுதிப்படுத்தல் ஆதரவு",
      descriptionEn: "Guidance on hormone therapy access, name/gender marker changes, and connections to trans-competent providers.",
      descriptionSi: "හෝමෝන චිකිත්සක ප්‍රවේශය, නම/ස්ත්‍රී පුරුෂ භාව සලකුණ වෙනස් කිරීම් සහ ට්‍රාන්ස්-සමත් සත්කාරක වෙත සම්බන්ධතා පිළිබඳ මඟපෙන්වීම.",
      descriptionTa: "ஹார்மோன் சிகிச்சை அணுகல், பெயர்/பாலின குறியீடு மாற்றங்கள் மற்றும் திருநங்கை-திறன் வாய்ந்த வழங்குநர்களுடன் இணைப்புகள் குறித்த வழிகாட்டுதல்.",
      contentEn:
        "Every woman's gender-affirming journey is her own. TET helps navigate the practical steps — from finding trans-competent doctors for hormone therapy, to understanding the legal process for updating a name or gender marker on identity documents.\n\nOur peer navigators, many of whom have gone through the same process themselves, provide honest, judgment-free guidance and accompany women to appointments and government offices where needed.",
      featuresEn:
        "Hormone therapy access guidance\nConnections to trans-competent doctors\nSupport with name & gender marker changes\nPeer navigators with lived experience\nAccompaniment to appointments & government offices\nFree and confidential",
      benefitsEn:
        "Informed Decisions :: Honest, judgment-free guidance from people who understand the journey firsthand.\nFaster Access :: Direct connections to trans-competent providers cut through the usual barriers and delays.\nDocuments That Match :: Support through the legal process for updating identity documents.",
      faqsEn:
        "Do you provide hormones directly? :: No, but we connect you to trans-competent doctors and help you access care.\nCan you help me change my name legally? :: Yes, we guide you through the process and can accompany you where needed.\nIs this service only for people starting their journey? :: No — support is available at any stage, whatever that looks like for you.\nIs it confidential? :: Completely.",
      image: "/illustrations/illus-gender-affirming.svg",
      order: 8,
    },
    {
      icon: "🏠",
      titleEn: "Shelter Referrals",
      titleSi: "නවාතැන් යොමු කිරීම්",
      titleTa: "தங்குமிட பரிந்துரைகள்",
      descriptionEn: "Emergency and short-term housing referrals through our partner shelter network for members facing violence or displacement.",
      descriptionSi: "ප්‍රචණ්ඩත්වයට හෝ අවතැන් වීමට මුහුණ දෙන සාමාජිකයින් සඳහා අපගේ හවුල්කාර නවාතැන් ජාලය හරහා හදිසි සහ කෙටිකාලීන නිවාස යොමු කිරීම්.",
      descriptionTa: "வன்முறை அல்லது இடம்பெயர்வை எதிர்கொள்ளும் உறுப்பினர்களுக்கு எங்கள் பங்காளர் தங்குமிட வலையமைப்பு மூலம் அவசர மற்றும் குறுகிய கால தங்குமிட பரிந்துரைகள்.",
      contentEn:
        "No woman should have to choose between an unsafe home and no home at all. Through our partnership with the Safe Harbour Shelter Network, TET refers women facing violence, family rejection, or sudden displacement to emergency and short-term shelter.\n\nOur 24/7 hotline is the fastest way to reach this service — a peer responder can arrange a referral immediately and stay in contact until a woman is safely settled.",
      featuresEn:
        "Emergency and short-term shelter referrals\nPartnership with the Safe Harbour Shelter Network\n24/7 access via the crisis hotline\nAccompaniment to shelter intake where possible\nFollow-up support after placement\nFree and confidential",
      benefitsEn:
        "Nowhere Left to Sleep, Solved :: Fast referrals mean a woman in crisis is rarely without an option for the night.\nPartnerships That Work :: Established relationships with shelter partners mean fewer barriers at the door.\nSupport Beyond the Bed :: Follow-up connects women to counselling, legal, and livelihood services after a placement.",
      faqsEn:
        "How fast can I get shelter? :: Call our 24/7 hotline — referrals are arranged as quickly as the partner shelter allows, often the same day.\nIs there a cost? :: No, shelter referrals through TET are free.\nWill I be safe there? :: Our shelter partners are vetted and oriented to work respectfully with trans women.\nWhat happens after I leave the shelter? :: A peer navigator stays connected to help with next steps.",
      image: "/illustrations/illus-shelter.svg",
      order: 9,
    },
  ];
  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({ data: services });
  } else {
    for (const svc of services) {
      await prisma.service.updateMany({
        where: { titleEn: svc.titleEn, contentEn: null },
        data: {
          contentEn: svc.contentEn,
          featuresEn: svc.featuresEn,
          benefitsEn: svc.benefitsEn,
          faqsEn: svc.faqsEn,
        },
      });
    }
  }

  // ---------- Projects (Initiatives) ----------
  const projects = [
    {
      titleEn: "Safe Night Outreach",
      titleSi: "ආරක්ෂිත රාත්‍රී ප්‍රවේශය",
      titleTa: "பாதுகாப்பான இரவு அணுகல்",
      descriptionEn: "Mobile teams bring health supplies, information, and a trusted contact to street-based workers during late-night hours.",
      descriptionSi: "ජංගම කණ්ඩායම් රාත්‍රී පැය තුළ වීථි-පදනම් සේවකයින්ට සෞඛ්‍ය සැපයුම්, තොරතුරු සහ විශ්වාසනීය සම්බන්ධතාවක් ගෙන එයි.",
      descriptionTa: "நடமாடும் குழுக்கள் இரவு நேரங்களில் தெரு அடிப்படையிலான தொழிலாளர்களுக்கு சுகாதார பொருட்கள், தகவல்கள் மற்றும் நம்பகமான தொடர்பைக் கொண்டு வருகின்றன.",
      contentEn:
        "Safe Night Outreach is TET's founding program and remains the heartbeat of our work. Trans peer outreach workers walk known work areas across our 6 outreach sites several nights a week, bringing free health supplies, prevention information, and a familiar, trusted face to street-based workers who are often hardest to reach through clinic-based services alone.\n\nEvery visit is also a safety check-in and a direct line to TET's wider services — from HIV testing to the 24/7 crisis hotline — meaning outreach is frequently the first point of contact that brings a woman into the full range of TET's support.",
      objectivesEn:
        "Reach street-based workers where clinic-based services cannot\nDistribute free health and prevention supplies\nProvide real-time safety check-ins\nBuild trust through consistent, judgment-free presence\nConnect women to TET's wider services\nExpand coverage across all 6 outreach sites",
      outcomesEn:
        "Women Reached :: Outreach teams connect with hundreds of women each month across 6 sites in 3 provinces.\nSupplies Distributed :: Thousands of prevention and health items distributed free of charge every year.\nPathway to Care :: Outreach remains the single largest entry point into TET's healthcare and crisis services.",
      location: "6 outreach sites across 3 provinces",
      beneficiariesEn: "1,200+ women reached through night outreach",
      status: "ongoing",
      order: 1,
    },
    {
      titleEn: "ID & Legal Clinic",
      titleSi: "හැඳුනුම්පත් සහ නීති සායනය",
      titleTa: "அடையாள அட்டை & சட்ட கிளினிக்",
      descriptionEn: "A dedicated legal clinic helping women navigate police harassment, documentation, and rights violations.",
      descriptionSi: "පොලිස් හිරිහැර, ලේඛන සහ අයිතිවාසිකම් උල්ලංඝනය සම්බන්ධයෙන් කාන්තාවන්ට මඟ පෙන්වන කැපවූ නීති සායනයක්.",
      descriptionTa: "காவல்துறை துன்புறுத்தல், ஆவணப்படுத்தல் மற்றும் உரிமை மீறல்களை கடக்க பெண்களுக்கு உதவும் அர்ப்பணிப்புள்ள சட்ட கிளினிக்.",
      contentEn:
        "Opened in 2022 in partnership with the Legal Aid Commission, TET's ID & Legal Clinic is a dedicated space where trans women in sex work can get free legal guidance without having to explain themselves twice or face a hostile front desk.\n\nThe clinic handles everything from updating identity documents and gender markers, to responding to police harassment and arbitrary detention, to workplace and housing discrimination. A trained companion is available to accompany clients to police stations, courts, and government offices whenever needed.",
      objectivesEn:
        "Provide free, specialized legal guidance\nSupport NIC and gender marker documentation\nRespond to police harassment and detention cases\nAccompany clients to police stations and courts\nBuild relationships with sympathetic legal professionals\nRun periodic rights-awareness sessions",
      outcomesEn:
        "Cases Supported :: Over 180 legal cases supported since the clinic opened, spanning documentation, harassment, and discrimination.\nDocuments Updated :: Dozens of women supported to update identity documents to match their gender.\nFaster Resolutions :: Early legal guidance resolves many disputes before they escalate.",
      location: "TET Legal Clinic, Colombo",
      beneficiariesEn: "180+ legal cases supported",
      status: "ongoing",
      order: 2,
    },
    {
      titleEn: "Peer Navigator Program",
      titleSi: "සම මාර්ගෝපදේශක වැඩසටහන",
      titleTa: "சக வழிகாட்டி திட்டம்",
      descriptionEn: "Training community members to accompany, support, and advocate for one another through healthcare, legal, and crisis services.",
      descriptionSi: "සෞඛ්‍ය, නීති සහ හදිසි සේවා හරහා එකිනෙකාට සහායක වීම, සහාය දීම සහ පෙනී සිටීම සඳහා ප්‍රජා සාමාජිකයින් පුහුණු කිරීම.",
      descriptionTa: "சுகாதாரம், சட்டம் மற்றும் நெருக்கடி சேவைகள் மூலம் ஒருவருக்கொருவர் துணைபுரிய, ஆதரிக்க மற்றும் வக்காலத்து வாங்க சமூக உறுப்பினர்களை பயிற்றுவித்தல்.",
      contentEn:
        "Change lasts when it is led from within. The Peer Navigator Program identifies trans women trusted by their communities and trains them to accompany, support, and advocate for others through TET's healthcare, legal, and crisis services.\n\nTraining covers accompaniment skills, basic health literacy, crisis response, and confidentiality practice over several months of guided experience. Graduates become the backbone of TET's outreach, counselling, and clinic-accompaniment work — many of today's staff are graduates of this very program.",
      objectivesEn:
        "Identify and train trusted community members as navigators\nBuild accompaniment, health-literacy, and crisis-response skills\nProvide guided field experience over several months\nCertify graduates as TET peer navigators\nCreate pathways into paid program roles\nSustain a peer-led model across all services",
      outcomesEn:
        "Navigators Certified :: Twelve trained peer navigators currently active across outreach, health, and legal services.\nServices Multiplied :: Peer accompaniment now touches nearly every TET service, from clinic visits to court appearances.\nCareer Pathways :: Several graduates have gone on to paid staff and coordinator roles within TET.",
      location: "3 provinces",
      beneficiariesEn: "12 trained peer navigators",
      status: "ongoing",
      order: 3,
    },
    {
      titleEn: "Economic Empowerment Fund",
      titleSi: "ආර්ථික සවිබල ගැන්වීමේ අරමුදල",
      titleTa: "பொருளாதார மேம்பாட்டு நிதி",
      descriptionEn: "Supporting financial independence through vocational skills, savings circles, and the Solidarity Shop.",
      descriptionSi: "වෘත්තීය කුසලතා, ඉතුරුම් කවයන් සහ සහයෝගීතා අලෙවිසැල හරහා මූල්‍ය ස්වාධීනත්වයට සහාය වීම.",
      descriptionTa: "தொழில்முறை திறன்கள், சேமிப்பு வட்டங்கள் மற்றும் ஒற்றுமை கடை மூலம் நிதி சுதந்திரத்தை ஆதரித்தல்.",
      contentEn:
        "Economic dependence keeps women trapped in unsafe situations. The Economic Empowerment Fund builds the practical foundations of financial independence: marketable skills, peer-led savings circles, and safer-work planning.\n\nParticipants can join vocational tracks — tailoring, crafts, and small trade — pair it with basic financial literacy, and access small seed grants for viable business ideas. Finished products are sold through TET's Solidarity Shop, connecting women producers directly to supporters across Sri Lanka.",
      objectivesEn:
        "Deliver vocational training in practical livelihood tracks\nRun peer-led savings circles\nProvide seed grants for viable business ideas\nOperate the Solidarity Shop as a sales channel\nTeach safer-work planning alongside financial literacy\nMentor new entrepreneurs through their first year",
      outcomesEn:
        "Women Supported :: 300+ women have accessed livelihood training, savings circles, or seed support.\nProducts to Market :: The Solidarity Shop connects community-made products directly to supporters.\nIncomes Raised :: Participants report more stable, independent income after completing the program.",
      location: "6 outreach sites",
      beneficiariesEn: "300+ women supported",
      status: "ongoing",
      order: 4,
    },
  ];
  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({ data: projects });
  } else {
    for (const proj of projects) {
      await prisma.project.updateMany({
        where: { titleEn: proj.titleEn, contentEn: null },
        data: {
          contentEn: proj.contentEn,
          objectivesEn: proj.objectivesEn,
          outcomesEn: proj.outcomesEn,
          location: proj.location,
          beneficiariesEn: proj.beneficiariesEn,
        },
      });
    }
  }

  // ---------- Testimonials ----------
  const testimonials = [
    {
      quoteEn: "TET's outreach team treated me like a person, not a statistic. I finally got tested without fear of being judged.",
      quoteSi: "TET ගේ ප්‍රවේශ කණ්ඩායම මට කෙනෙකු ලෙස සැලකූවා, සංඛ්‍යාලේඛනයක් ලෙස නොවේ. විනිශ්චයට බියෙන් තොරව මම අවසානයේ පරීක්ෂණයට ලක් වුණා.",
      quoteTa: "TET இன் அணுகல் குழு என்னை ஒரு புள்ளிவிவரமாக அல்ல, ஒரு நபராக நடத்தியது. தீர்ப்புக்கு பயப்படாமல் நான் இறுதியாக பரிசோதனை செய்து கொண்டேன்.",
      authorEn: "Outreach client, Colombo",
      authorSi: "ප්‍රවේශ සේවා ලාභියා, කොළඹ",
      authorTa: "அணுகல் சேவை பயனாளர், கொழும்பு",
      order: 1,
    },
    {
      quoteEn: "The legal clinic helped me update my ID. For the first time, my documents match who I am.",
      quoteSi: "නීති සායනය මට මගේ හැඳුනුම්පත යාවත්කාලීන කිරීමට උදව් කළා. පළමු වතාවට, මගේ ලේඛන මම කවුරුන්දැයි පිළිබිඹු කරයි.",
      quoteTa: "சட்ட கிளினிக் என் அடையாள அட்டையை புதுப்பிக்க உதவியது. முதன்முறையாக, என் ஆவணங்கள் நான் யார் என்பதைக் காட்டுகின்றன.",
      authorEn: "Legal aid client",
      authorSi: "නීති සහාය ලාභියා",
      authorTa: "சட்ட உதவி பயனாளர்",
      order: 2,
    },
    {
      quoteEn: "Having someone to call at 2am who understands what we go through — that saved my life.",
      quoteSi: "අපි මුහුණ දෙන දේ තේරුම් ගන්නා කෙනෙකුට රාත්‍රී 2ට ඇමතීමට හැකි වීම — එය මගේ ජීවිතය බේරා ගත්තා.",
      quoteTa: "இரவு 2 மணிக்கு நாங்கள் அனுபவிப்பதைப் புரிந்துகொள்ளும் ஒருவரை அழைக்க முடிவது — அது என் உயிரைக் காப்பாற்றியது.",
      authorEn: "Crisis hotline caller",
      authorSi: "හදිසි උපකාරක මාර්ගය භාවිත කළ අයෙක්",
      authorTa: "நெருக்கடி உதவி இணைப்பு அழைப்பாளர்",
      order: 3,
    },
  ];
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({ data: testimonials });
  }

  // ---------- Partners ----------
  const partners = [
    "National STI/AIDS Program",
    "Trans Health Alliance",
    "Legal Aid Commission",
    "Community Justice Network",
    "Safe Harbour Shelter",
    "Regional Health Bureau",
  ].map((name, i) => ({ name, order: i + 1 }));
  if ((await prisma.partner.count()) === 0) {
    await prisma.partner.createMany({ data: partners });
  }

  // ---------- Sample news ----------
  const news = [
    {
      titleEn: "Mobile health van expands to three new outreach points",
      titleSi: "ජංගම සෞඛ්‍ය වාහනය නව ප්‍රවේශ ස්ථාන තුනකට පුළුල් වේ",
      titleTa: "நடமாடும் சுகாதார வாகனம் மூன்று புதிய அணுகல் புள்ளிகளுக்கு விரிவடைகிறது",
      excerptEn: "Late-night outreach now reaches more street-based workers with testing and supplies.",
      contentEn:
        "Late-night outreach now reaches more street-based workers with testing and supplies. Our mobile health van has begun regular visits to three new outreach points, bringing HIV testing, prevention supplies, and referrals directly to communities that were previously out of reach.\n\nThe expansion was made possible through our partner clinic network and the dedication of our peer navigators, who help build trust and make services accessible without stigma. Two more outreach points are planned before the end of the year.",
      contentSi:
        "රාත්‍රී ප්‍රවේශය දැන් වීථි-පදනම් සේවකයින් තවත් රාශියකට පරීක්ෂණ සහ සැපයුම් සමඟ ළඟා වේ. අපගේ ජංගම සෞඛ්‍ය වාහනය නව ප්‍රවේශ ස්ථාන තුනකට නිතිපතා චාරිකා ආරම්භ කර ඇති අතර, HIV පරීක්ෂණ, වැළැක්වීමේ සැපයුම් සහ යොමු කිරීම් සෘජුවම ප්‍රජාවන් වෙත ගෙන යයි.",
      contentTa:
        "இரவு நேர அணுகல் இப்போது மேலும் தெரு அடிப்படையிலான தொழிலாளர்களை பரிசோதனை மற்றும் பொருட்களுடன் சென்றடைகிறது. எங்கள் நடமாடும் சுகாதார வாகனம் மூன்று புதிய அணுகல் புள்ளிகளுக்கு வழக்கமான விஜயங்களைத் தொடங்கியுள்ளது, HIV பரிசோதனை, தடுப்பு பொருட்கள் மற்றும் பரிந்துரைகளை நேரடியாக சமூகங்களுக்கு கொண்டு வருகிறது.",
      highlightsEn:
        "Regular visits now cover three new outreach points\nFree HIV testing, supplies, and referrals\nPeer navigators build trust and reduce stigma\nTwo more outreach points planned this year",
      quoteEn:
        "For many women, this is the first time healthcare has come to them instead of the other way around. :: Outreach team lead",
      image: "/illustrations/illus-outreach.svg",
      publishedAt: new Date("2026-07-05"),
    },
    {
      titleEn: "Peer navigators complete trauma-informed care training",
      titleSi: "සම මාර්ගෝපදේශකයින් කම්පන-දැනුවත් සත්කාර පුහුණුව සම්පූර්ණ කරයි",
      titleTa: "சக வழிகாட்டிகள் அதிர்ச்சி-அறிந்த பராமரிப்பு பயிற்சியை நிறைவு செய்தனர்",
      excerptEn: "New graduates are strengthening accompaniment support at clinics and courts.",
      contentEn:
        "New graduates are strengthening accompaniment support at clinics and courts. This cohort of peer navigators completed a six-week trauma-informed care training, covering safe accompaniment, active listening, and recognizing signs of crisis.\n\nGraduates will now support women during clinic visits, legal proceedings, and hotline follow-ups, extending TET's capacity to accompany women through difficult moments with skill and care.",
      contentSi:
        "නව උපාධිධාරීන් සායන සහ අධිකරණවල සහායක සහාය ශක්තිමත් කරයි. මෙම සම මාර්ගෝපදේශක කණ්ඩායම, ආරක්ෂිත සහායක ගමන්, ක්‍රියාශීලී සවන්දීම සහ අර්බුද සලකුණු හඳුනාගැනීම ආවරණය කරන සති හයක කම්පන-දැනුවත් සත්කාර පුහුණුවක් සම්පූර්ණ කළහ.",
      contentTa:
        "புதிய பட்டதாரிகள் கிளினிக்குகள் மற்றும் நீதிமன்றங்களில் துணை ஆதரவை வலுப்படுத்துகின்றனர். இந்த சக வழிகாட்டிகள் குழு, பாதுகாப்பான துணை, தீவிர கேட்டல் மற்றும் நெருக்கடி அறிகுறிகளை அடையாளம் காணுதல் ஆகியவற்றை உள்ளடக்கிய ஆறு வார அதிர்ச்சி-அறிந்த பராமரிப்பு பயிற்சியை நிறைவு செய்தது.",
      highlightsEn:
        "Six-week trauma-informed care training completed\nNew skills in safe accompaniment and active listening\nGraduates will support clinic and court visits\nExtends TET's peer navigator capacity",
      quoteEn:
        "I came here quiet. I am leaving as someone my community can turn to. :: Peer navigator graduate",
      image: "/illustrations/illus-news.svg",
      publishedAt: new Date("2026-06-22"),
    },
  ];
  if ((await prisma.news.count()) === 0) {
    for (const n of news) await prisma.news.create({ data: n });
  } else {
    for (const n of news) {
      await prisma.news.updateMany({
        where: { titleEn: n.titleEn, highlightsEn: null },
        data: { highlightsEn: n.highlightsEn, quoteEn: n.quoteEn },
      });
    }
  }

  // ---------- Sample events ----------
  const events = [
    {
      titleEn: "Community Health & HIV Testing Day",
      titleSi: "ප්‍රජා සෞඛ්‍ය සහ HIV පරීක්ෂණ දිනය",
      titleTa: "சமூக சுகாதாரம் & HIV பரிசோதனை நாள்",
      descriptionEn: "Free, confidential rapid testing, counselling, and referrals in a welcoming space.",
      descriptionSi: "සුහද පරිසරයක නොමිලේ, රහස්‍ය ඉක්මන් පරීක්ෂණ, උපදේශනය සහ යොමු කිරීම්.",
      descriptionTa: "வரவேற்கத்தக்க இடத்தில் இலவச, இரகசிய விரைவு பரிசோதனை, ஆலோசனை மற்றும் பரிந்துரைகள்.",
      location: "Colombo Outreach Centre",
      contentEn:
        "Join us for a full day of free, confidential health services in a welcoming, judgment-free environment. The Community Health & HIV Testing Day brings TET's outreach team, partner clinic staff, and peer navigators together under one roof.\n\nAll services are free and confidential. No appointment, documents, or referral letters are needed — just come as you are. Sinhala- and Tamil-speaking staff will be available throughout the day.",
      highlightsEn:
        "Free rapid HIV testing and counselling\nConfidential general health screenings\nReferrals to partner clinics\nPrevention supplies distributed\nSinhala & Tamil speaking staff\nNo appointment needed",
      agendaEn:
        "10.00 am :: Registration & welcome\n10.30 am :: Testing & screenings begin\n12.30 pm :: Wellness and prevention session\n2.00 pm :: Community lunch\n3.00 pm :: Counselling & referral desk\n4.00 pm :: Closing & follow-up scheduling",
      image: "/illustrations/illus-healthcare.svg",
      startDate: new Date(Date.now() + 10 * 24 * 3600 * 1000),
    },
    {
      titleEn: "Know Your Rights: Legal Literacy Workshop",
      titleSi: "ඔබේ අයිතිවාසිකම් දැනගන්න: නීති සාක්ෂරතා වැඩමුළුව",
      titleTa: "உங்கள் உரிமைகளை அறியுங்கள்: சட்ட எழுத்தறிவு பட்டறை",
      descriptionEn: "Practical guidance on ID documentation, policing, and safety planning.",
      descriptionSi: "හැඳුනුම්පත් ලේඛන, පොලිසිය සහ ආරක්ෂක සැලසුම්කරණය පිළිබඳ ප්‍රායෝගික මඟපෙන්වීම.",
      descriptionTa: "அடையாள ஆவணங்கள், காவல்துறை மற்றும் பாதுகாப்பு திட்டமிடல் குறித்த நடைமுறை வழிகாட்டுதல்.",
      location: "TET Community Hall",
      contentEn:
        "A practical, hands-on workshop that turns legal rights from abstract ideas into tools women can actually use. Led by TET's legal aid coordinator alongside sympathetic legal professionals, the session covers ID and gender marker documentation, safe engagement with police, and community safety planning.\n\nParticipation is free and confidential. Every participant receives a plain-language rights handbook and a direct line to TET's Legal Aid & Rights Defense service when they need real help.",
      highlightsEn:
        "Plain-language legal literacy training\nID and gender marker documentation guidance\nSafe police engagement guidance\nFree rights handbook for every participant\nDirect line to TET's legal aid service\nConfidential, women-only space",
      agendaEn:
        "2.00 pm :: Welcome & introductions\n2.30 pm :: Know your rights — core session\n3.30 pm :: ID and documentation clinic\n4.15 pm :: Safe engagement with police and courts\n4.45 pm :: Q&A with legal professionals",
      image: "/illustrations/illus-legal.svg",
      startDate: new Date(Date.now() + 18 * 24 * 3600 * 1000),
    },
    {
      titleEn: "Peer Counsellor Training — Cohort 6",
      titleSi: "සම උපදේශක පුහුණුව — 6 වන කණ්ඩායම",
      titleTa: "சக ஆலோசகர் பயிற்சி — குழு 6",
      descriptionEn: "Six-week training for members interested in becoming peer counsellors.",
      descriptionSi: "සම උපදේශකයින් වීමට කැමති සාමාජිකයින් සඳහා සති හයක පුහුණුවක්.",
      descriptionTa: "சக ஆலோசகர்களாக மாற விரும்பும் உறுப்பினர்களுக்கான ஆறு வார பயிற்சி.",
      location: "TET Training Centre",
      contentEn:
        "The sixth cohort of TET's Peer Counsellor Training program begins this month — a six-week evening course that equips community members with the skills to provide one-on-one and group counselling to others.\n\nThe training covers active listening, crisis recognition, confidentiality practice, and self-care for counsellors, taught by experienced TET peer counsellors and a visiting trauma-informed therapist. Graduates join the counselling team and receive ongoing mentoring.",
      highlightsEn:
        "Six-week evening training program\nTaught by experienced peer counsellors\nCovers active listening & crisis recognition\nOngoing mentoring after graduation\nJoins TET's counselling team",
      agendaEn:
        "5.00 pm :: Weekly session start\n5.15 pm :: Skills training module\n6.15 pm :: Practice & role-play\n6.45 pm :: Group reflection & close",
      image: "/illustrations/illus-counseling.svg",
      startDate: new Date(Date.now() + 25 * 24 * 3600 * 1000),
    },
    {
      titleEn: "Economic Empowerment Info Session",
      titleSi: "ආර්ථික සවිබල ගැන්වීමේ තොරතුරු සැසිය",
      titleTa: "பொருளாதார மேம்பாட்டு தகவல் அமர்வு",
      descriptionEn: "Learn about seed grants and vocational skills training available this cycle.",
      descriptionSi: "මෙම චක්‍රයේදී ලබා ගත හැකි බීජ ප්‍රදාන සහ වෘත්තීය කුසලතා පුහුණුව පිළිබඳ දැනගන්න.",
      descriptionTa: "இந்த சுழற்சியில் கிடைக்கும் விதை மானியங்கள் மற்றும் தொழில்முறை திறன் பயிற்சி பற்றி அறியுங்கள்.",
      location: "Kandy Outreach Site",
      contentEn:
        "TET's Economic Empowerment Fund opens a new intake cycle this month. This info session walks through the vocational training tracks on offer, how the peer-led savings circles work, and how to apply for a seed grant to start or grow a small business.\n\nNo commitment is required to attend — come with questions, and leave with a clear next step if the program is right for you.",
      highlightsEn:
        "Overview of vocational training tracks\nHow peer-led savings circles work\nSeed grant application process explained\nOpen Q&A with program graduates\nNo commitment required to attend",
      agendaEn:
        "3.00 pm :: Welcome & program overview\n3.30 pm :: Vocational tracks walkthrough\n4.15 pm :: Savings circles & seed grants explained\n5.00 pm :: Q&A with graduates\n5.30 pm :: Sign-ups open",
      image: "/illustrations/illus-economic.svg",
      startDate: new Date(Date.now() + 33 * 24 * 3600 * 1000),
    },
    {
      titleEn: "Mobile Clinic — Galle Route",
      titleSi: "ජංගම සායනය — ගාල්ල මාර්ගය",
      titleTa: "நடமாடும் கிளினிக் — காலி வழி",
      descriptionEn: "Health screening, HIV testing, and referrals brought directly to the community.",
      descriptionSi: "සෞඛ්‍ය පරීක්ෂාව, HIV පරීක්ෂණ සහ යොමු කිරීම් ප්‍රජාව වෙත සෘජුවම ගෙන එනු ලැබේ.",
      descriptionTa: "சுகாதார பரிசோதனை, HIV பரிசோதனை மற்றும் பரிந்துரைகள் நேரடியாக சமூகத்திற்கு கொண்டு வரப்படுகின்றன.",
      location: "Galle Fort Outreach Point",
      contentEn:
        "TET's mobile clinic makes its regular stop along the Galle route, bringing free health screening, HIV testing, and referral support directly to a community with limited access to trans-friendly clinics.\n\nThe clinic is staffed by a nurse, a peer navigator, and TET outreach volunteers. No appointment or documentation is required — everyone is welcome to walk in throughout the day.",
      highlightsEn:
        "Free health screening and HIV testing\nStaffed by nurse and peer navigators\nReferrals to partner clinics available\nNo appointment or documents needed\nPart of TET's regular mobile clinic route",
      agendaEn:
        "11.00 am :: Mobile clinic opens\n11.30 am :: Screenings & testing begin\n2.00 pm :: Midday break\n3.00 pm :: Screenings resume\n4.30 pm :: Referral desk & wrap-up\n5.00 pm :: Clinic closes",
      image: "/illustrations/illus-outreach.svg",
      startDate: new Date(Date.now() + 40 * 24 * 3600 * 1000),
    },
    {
      titleEn: "Community Solidarity Evening",
      titleSi: "ප්‍රජා සහයෝගීතා සන්ධ්‍යාව",
      titleTa: "சமூக ஒற்றுமை மாலை",
      descriptionEn: "A social gathering to celebrate community, share food, and build connection.",
      descriptionSi: "ප්‍රජාව සමරන, ආහාර බෙදාගන්නා සහ සම්බන්ධතා ගොඩනගන සමාජ රැස්වීමක්.",
      descriptionTa: "சமூகத்தை கொண்டாடி, உணவைப் பகிர்ந்து, தொடர்பை உருவாக்கும் ஒரு சமூக கூட்டம்.",
      location: "TET Community Hall",
      contentEn:
        "Not every TET gathering is about a service — some are simply about being together. The Community Solidarity Evening is an open, relaxed evening of shared food, music, and conversation for the whole TET community and its supporters.\n\nIt's a chance to celebrate the resilience of the community, welcome new members, and thank the volunteers, peer navigators, and partners who make TET's work possible.",
      highlightsEn:
        "Shared community meal\nMusic and open conversation\nOpen to the whole TET community\nA chance to welcome new members\nRecognition for volunteers and partners",
      agendaEn:
        "6.00 pm :: Doors open & welcome\n6.30 pm :: Community meal\n7.30 pm :: Music & open floor\n8.30 pm :: Recognition & thank-yous\n9.00 pm :: Close",
      image: "/illustrations/illus-community.svg",
      startDate: new Date(Date.now() + 48 * 24 * 3600 * 1000),
    },
  ];
  if ((await prisma.event.count()) === 0) {
    for (const e of events) await prisma.event.create({ data: e });
  } else {
    for (const e of events) {
      await prisma.event.updateMany({
        where: { titleEn: e.titleEn, contentEn: null },
        data: { contentEn: e.contentEn, highlightsEn: e.highlightsEn, agendaEn: e.agendaEn },
      });
    }
  }

  // ---------- Publications (Resources) ----------
  const publications = [
    {
      titleEn: "Know Your Rights: A Pocket Guide",
      titleSi: "ඔබේ අයිතිවාසිකම් දැනගන්න: සාක්කු මාර්ගෝපදේශය",
      titleTa: "உங்கள் உரிமைகளை அறியுங்கள்: பாக்கெட் வழிகாட்டி",
      descriptionEn: "What to do during police stops, detentions, and ID checks.",
      descriptionSi: "පොලිස් නවතා පරීක්ෂා කිරීම්, අත්අඩංගුවට ගැනීම් සහ හැඳුනුම්පත් පරීක්ෂාවලදී කළ යුතු දේ.",
      descriptionTa: "காவல்துறை நிறுத்துதல், காவலில் வைத்தல் மற்றும் அடையாள சரிபார்ப்புகளின் போது என்ன செய்வது.",
      category: "other",
      coverImage: "/illustrations/illus-legal.svg",
    },
    {
      titleEn: "HIV Prevention & PrEP Basics",
      titleSi: "HIV වැළැක්වීම සහ PrEP මූලික කරුණු",
      titleTa: "HIV தடுப்பு & PrEP அடிப்படைகள்",
      descriptionEn: "Plain-language guide to testing, PrEP, and PEP access in Sri Lanka.",
      descriptionSi: "ශ්‍රී ලංකාවේ පරීක්ෂණ, PrEP සහ PEP ප්‍රවේශය පිළිබඳ සරල භාෂා මාර්ගෝපදේශය.",
      descriptionTa: "இலங்கையில் பரிசோதனை, PrEP மற்றும் PEP அணுகல் பற்றிய எளிய மொழி வழிகாட்டி.",
      category: "other",
      coverImage: "/illustrations/illus-hiv.svg",
    },
    {
      titleEn: "Gender-Affirming Care Directory",
      titleSi: "ස්ත්‍රී පුරුෂ භාවය තහවුරු කිරීමේ සත්කාර නාමාවලිය",
      titleTa: "பாலின உறுதிப்படுத்தல் பராமரிப்பு அடைவு",
      descriptionEn: "Trans-friendly clinics and providers across the island.",
      descriptionSi: "දිවයින පුරා ට්‍රාන්ස්-හිතකාමී සායන සහ සත්කාරකයින්.",
      descriptionTa: "தீவு முழுவதும் திருநங்கை-நட்பு கிளினிக்குகள் மற்றும் வழங்குநர்கள்.",
      category: "other",
      coverImage: "/illustrations/illus-gender-affirming.svg",
    },
    {
      titleEn: "Coping With Stigma & Stress",
      titleSi: "අපකීර්තිය සහ ආතතිය සමඟ කටයුතු කිරීම",
      titleTa: "களங்கம் & மன அழுத்தத்தை சமாளித்தல்",
      descriptionEn: "Mental health self-care strategies from our peer counsellors.",
      descriptionSi: "අපගේ සම උපදේශකයින්ගෙන් මානසික සෞඛ්‍ය ස්වයං-සත්කාර උපාය මාර්ග.",
      descriptionTa: "எங்கள் சக ஆலோசகர்களிடமிருந்து மனநல சுய-பராமரிப்பு உத்திகள்.",
      category: "other",
      coverImage: "/illustrations/illus-counseling.svg",
    },
    {
      titleEn: "ID Document Change Checklist",
      titleSi: "හැඳුනුම්පත් ලේඛන වෙනස් කිරීමේ පරීක්ෂණ ලැයිස්තුව",
      titleTa: "அடையாள ஆவண மாற்ற சரிபார்ப்பு பட்டியல்",
      descriptionEn: "Step-by-step guide to updating your NIC and gender marker.",
      descriptionSi: "ඔබේ NIC සහ ස්ත්‍රී පුරුෂ භාව සලකුණ යාවත්කාලීන කිරීමේ පියවරෙන් පියවර මාර්ගෝපදේශය.",
      descriptionTa: "உங்கள் NIC மற்றும் பாலின குறியீட்டை புதுப்பிப்பதற்கான படிப்படியான வழிகாட்டி.",
      category: "other",
      coverImage: "/illustrations/illus-idclinic.svg",
    },
    {
      titleEn: "Safer Work Planning Toolkit",
      titleSi: "ආරක්ෂිත වැඩ සැලසුම්කරණ මෙවලම් කට්ටලය",
      titleTa: "பாதுகாப்பான வேலை திட்டமிடல் கருவித்தொகுப்பு",
      descriptionEn: "Practical safety planning for street-based and venue-based work.",
      descriptionSi: "වීථි-පදනම් සහ ස්ථාන-පදනම් වැඩ සඳහා ප්‍රායෝගික ආරක්ෂක සැලසුම්කරණය.",
      descriptionTa: "தெரு அடிப்படையிலான மற்றும் இட அடிப்படையிலான வேலைக்கான நடைமுறை பாதுகாப்பு திட்டமிடல்.",
      category: "other",
      coverImage: "/illustrations/illus-outreach.svg",
    },
  ];
  if ((await prisma.publication.count()) === 0) {
    await prisma.publication.createMany({ data: publications });
  }

  // ---------- Products (Solidarity Shop) ----------
  const products = [
    {
      nameEn: "Solidarity T-Shirt",
      nameSi: "සහයෝගීතා ටී-ෂර්ට් එක",
      nameTa: "ஒற்றுமை டி-ஷர்ட்",
      descriptionEn: "Soft cotton tee with the TET solidarity emblem. Sizes S–XXL.",
      descriptionSi: "TET සහයෝගීතා සංකේතය සහිත මෘදු කපු ටී-ෂර්ට් එකක්. S–XXL ප්‍රමාණ.",
      descriptionTa: "TET ஒற்றுமை சின்னத்துடன் மென்மையான பருத்தி டி-ஷர்ட். S–XXL அளவுகள்.",
      price: 2200,
      image: "/illustrations/illus-shop-tshirt.svg",
      inStock: true,
      order: 1,
    },
    {
      nameEn: "Pride Tote Bag",
      nameSi: "ආඩම්බර තෝට්ට් බෑගය",
      nameTa: "பெருமை தோட்டு பை",
      descriptionEn: "Durable canvas tote — carry your everyday and your solidarity.",
      descriptionSi: "කල්පවත්නා කැන්වස් තෝට්ට් බෑගයක් — ඔබේ දෛනික දේ සහ සහයෝගීතාව රැගෙන යන්න.",
      descriptionTa: "நீடித்த கேன்வாஸ் தோட்டு பை — உங்கள் அன்றாடத்தையும் ஒற்றுமையையும் சுமந்து செல்லுங்கள்.",
      price: 1500,
      image: "/illustrations/illus-shop-tote.svg",
      inStock: true,
      order: 2,
    },
    {
      nameEn: "Enamel Pin Set",
      nameSi: "එනාමල් පින් කට්ටලය",
      nameTa: "எனாமல் பின் தொகுப்பு",
      descriptionEn: "Set of 3 enamel pins featuring community symbols.",
      descriptionSi: "ප්‍රජා සංකේත සහිත එනාමල් පින් 3ක කට්ටලයක්.",
      descriptionTa: "சமூக சின்னங்களைக் கொண்ட 3 எனாமல் பின்களின் தொகுப்பு.",
      price: 900,
      image: "/illustrations/illus-shop-pin.svg",
      inStock: true,
      order: 3,
    },
    {
      nameEn: "Community Cap",
      nameSi: "ප්‍රජා තොප්පිය",
      nameTa: "சமூக தொப்பி",
      descriptionEn: "Adjustable cap embroidered with the TET wordmark.",
      descriptionSi: "TET වචන සලකුණ ලෙස මසන ලද සකසන හැකි තොප්පියක්.",
      descriptionTa: "TET பெயர்குறியுடன் தையல் செய்யப்பட்ட சரிசெய்யக்கூடிய தொப்பி.",
      price: 1800,
      image: "/illustrations/illus-shop-cap.svg",
      inStock: true,
      order: 4,
    },
    {
      nameEn: "Solidarity Bracelet",
      nameSi: "සහයෝගීතා අත්මිටිය",
      nameTa: "ஒற்றுமை கை வளையல்",
      descriptionEn: "Handmade beaded bracelet, crafted by community members.",
      descriptionSi: "ප්‍රජා සාමාජිකයින් විසින් සාදන ලද අතින් සාදන ලද මුතු අත්මිටියක්.",
      descriptionTa: "சமூக உறுப்பினர்களால் தயாரிக்கப்பட்ட கையால் செய்யப்பட்ட மணி வளையல்.",
      price: 700,
      image: "/illustrations/illus-shop-bracelet.svg",
      inStock: true,
      order: 5,
    },
    {
      nameEn: "Sticker Pack",
      nameSi: "ස්ටිකර් පැකේජය",
      nameTa: "ஸ்டிக்கர் தொகுப்பு",
      descriptionEn: "Set of 6 vinyl stickers celebrating trans joy and resilience.",
      descriptionSi: "ට්‍රාන්ස් සතුට සහ ඔරොත්තු දීමේ හැකියාව සමරන වයිනිල් ස්ටිකර් 6ක කට්ටලයක්.",
      descriptionTa: "திருநங்கை மகிழ்ச்சி மற்றும் மீள்திறனைக் கொண்டாடும் 6 வினைல் ஸ்டிக்கர்களின் தொகுப்பு.",
      price: 500,
      image: "/illustrations/illus-shop-stickers.svg",
      inStock: true,
      order: 6,
    },
  ];
  if ((await prisma.product.count()) === 0) {
    await prisma.product.createMany({ data: products });
  }

  // ---------- Gallery images ----------
  const galleryImages = [
    { image: "/illustrations/illus-outreach.svg", captionEn: "Outreach team preparing for a night visit", order: 1 },
    { image: "/illustrations/illus-healthcare.svg", captionEn: "Community health screening day", order: 2 },
    { image: "/illustrations/illus-legal.svg", captionEn: "Legal literacy workshop in session", order: 3 },
    { image: "/illustrations/illus-community.svg", captionEn: "Community Solidarity Evening", order: 4 },
    { image: "/illustrations/banner-community.svg", captionEn: "TET Community Hall gathering", order: 5 },
  ];
  if ((await prisma.galleryImage.count()) === 0) {
    await prisma.galleryImage.createMany({ data: galleryImages });
  }

  // ---------- URL slugs ----------
  // Generate slugs from the English title for any row that doesn't have one yet
  const toSlug = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  for (const model of ["project", "service", "news", "event"] as const) {
    const delegate = (prisma as any)[model];
    const rows: { id: number; titleEn: string }[] = await delegate.findMany({
      where: { slug: null },
      select: { id: true, titleEn: true },
    });
    for (const row of rows) {
      const base = toSlug(row.titleEn) || `${model}-${row.id}`;
      let candidate = base;
      for (let i = 2; ; i++) {
        const clash = await delegate.findFirst({
          where: { slug: candidate, id: { not: row.id } },
          select: { id: true },
        });
        if (!clash) break;
        candidate = `${base}-${i}`;
      }
      await delegate.update({ where: { id: row.id }, data: { slug: candidate } });
    }
  }

  console.log("✔ Seed complete.");
  console.log("  Admin login: admin@tet-srilanka.org / admin12345");
  console.log("  ⚠ Change the password after first login (Dashboard → Change Password).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
