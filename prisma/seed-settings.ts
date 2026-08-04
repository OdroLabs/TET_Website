/**
 * Populate the database with ALL editable website content.
 *
 *   npm run db:seed:settings          # fill in anything missing
 *   npm run db:seed:settings -- --force   # overwrite everything back to these values
 *
 * The public site reads content only from these rows — nothing is hard-coded in
 * the page files any more. A key with no row (or a blank value) means that
 * element or section simply does not render.
 *
 * Two groups are written:
 *   1. Every key in `settingPages` (src/lib/settings.ts)
 *   2. Every `label.*` row backing the interface labels (src/lib/labels.ts)
 *
 * The script fails loudly if a value here does not match a real registry key,
 * or if a registry key has no value here — so the two can never drift apart.
 */
import { PrismaClient } from "@prisma/client";
import { allSettingDefs } from "../src/lib/settings";
import { allLabelDefs } from "../src/lib/labels";
import { dictionaries } from "../src/lib/dictionaries";

const prisma = new PrismaClient();
const FORCE = process.argv.includes("--force");

type Val = { en: string; si?: string; ta?: string };

const HERO_IMAGE = "/illustrations/hero-community.svg";
const COMMUNITY_IMAGE = "/illustrations/illus-community.svg";
const BANNER_IMAGE = "/illustrations/banner-community.svg";
const OUTREACH_IMAGE = "/illustrations/illus-outreach.svg";
const EVENT_IMAGE = "/illustrations/illus-event.svg";

/** Shorthand for the many on/off switches. */
const ON: Val = { en: "1" };
/** Deliberately empty — the admin fills these in with their own material. */
const BLANK: Val = { en: "" };

const VIEW_ALL: Val = { en: "View All", si: "සියල්ල බලන්න", ta: "அனைத்தையும் காண்க" };
const CONTACT_US: Val = { en: "Contact Us", si: "අප අමතන්න", ta: "தொடர்பு கொள்ள" };
const SUPPORT_TET: Val = { en: "Support TET", si: "TET සඳහා සහාය වන්න", ta: "TET-க்கு ஆதரவு" };

const content: Record<string, Val> = {
  /* ====================================================== General ========= */
  site_name: {
    en: "Transgender Empowerment Trust",
    si: "ට්‍රාන්ස්ජෙන්ඩර් සවිබල ගැන්වීමේ භාරය",
    ta: "திருநங்கை மேம்பாட்டு அறக்கட்டளை",
  },
  site_short_name: { en: "TET" },
  site_tagline: {
    en: "Trans-led support for trans women in sex work — health, safety, and dignity in Sri Lanka, since 2016.",
    si: "ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා ට්‍රාන්ස් නායකත්වයෙන් යුත් සහාය — 2016 සිට ශ්‍රී ලංකාවේ සෞඛ්‍යය, ආරක්ෂාව සහ ගෞරවය.",
    ta: "பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான திருநங்கைகளால் வழிநடத்தப்படும் ஆதரவு — 2016 முதல் இலங்கையில் சுகாதாரம், பாதுகாப்பு மற்றும் கண்ணியம்.",
  },
  logo_image: BLANK,
  logo_letter: { en: "T" },
  favicon: BLANK,

  address: { en: "42 Independence Avenue,\nColombo 05,\nSri Lanka" },
  phone: { en: "+94 11 234 5678" },
  phone2: { en: "+94 77 000 1234" },
  email: { en: "support@tet-srilanka.org" },
  email2: BLANK,
  whatsapp: { en: "94770001234" },
  office_hours: {
    en: "Mon–Fri, 9am–5pm. Hotline available 24/7.",
    si: "සඳුදා – සිකුරාදා, පෙ.ව. 9 – ප.ව. 5. හදිසි උපකාරක මාර්ගය 24/7 පවතී.",
    ta: "திங்கள் – வெள்ளி, காலை 9 – மாலை 5. உதவி இணைப்பு எண் 24/7 கிடைக்கும்.",
  },
  map_embed: BLANK,

  facebook: BLANK,
  youtube: BLANK,
  instagram: BLANK,
  twitter: BLANK,
  linkedin: BLANK,
  tiktok: BLANK,

  seo_title: {
    en: "Transgender Empowerment Trust (TET)",
    si: "ට්‍රාන්ස්ජෙන්ඩර් සවිබල ගැන්වීමේ භාරය (TET)",
    ta: "திருநங்கை மேம்பாட்டு அறக்கட்டளை (TET)",
  },
  seo_description: {
    en: "TET is a trans-led community organization providing free, confidential healthcare navigation, legal support, and peer solidarity for trans female sex workers across Sri Lanka.",
    si: "TET යනු ශ්‍රී ලංකාව පුරා ට්‍රාන්ස් කාන්තා ලිංගික සේවා සපයන්නන් සඳහා නොමිලේ, රහස්‍ය සෞඛ්‍ය මාර්ගෝපදේශනය, නීති සහාය සහ සම සහයෝගීතාවය සපයන ට්‍රාන්ස් නායකත්වයෙන් යුත් ප්‍රජා සංවිධානයකි.",
    ta: "TET என்பது இலங்கை முழுவதும் திருநங்கை பாலியல் தொழிலாளர்களுக்கு இலவச, இரகசிய சுகாதார வழிகாட்டல், சட்ட உதவி மற்றும் சக ஒற்றுமையை வழங்கும் திருநங்கைகளால் வழிநடத்தப்படும் சமூக அமைப்பு.",
  },
  seo_keywords: {
    en: "TET, Sri Lanka, trans women, sex worker health, HIV prevention, harm reduction, legal aid, Colombo",
  },
  og_image: BLANK,

  /* ============================================ Header & navigation ======= */
  announce_text: BLANK,
  announce_link: BLANK,
  show_header_topbar: ON,
  show_header_langs: ON,
  show_access_toolbar: ON,
  nav_show_about: ON,
  nav_show_projects: ON,
  nav_show_services: ON,
  nav_show_publications: ON,
  nav_show_news: ON,
  nav_show_events: ON,
  nav_show_business: ON,
  nav_show_volunteer: ON,
  nav_show_hall_booking: ON,
  nav_show_suggestions: ON,
  nav_show_contact: ON,
  show_header_donate: ON,
  show_floating_donate: ON,
  header_donate_label: { en: "Donate", si: "පරිත්‍යාග කරන්න", ta: "நன்கொடை" },

  /* ======================================================== Footer ======== */
  footer_about: {
    en: "Transgender Empowerment Trust is a trans-led community organization supporting trans female sex workers across Sri Lanka with healthcare, legal aid, and peer solidarity since 2016.",
    si: "ට්‍රාන්ස්ජෙන්ඩර් සවිබල ගැන්වීමේ භාරය යනු 2016 සිට ශ්‍රී ලංකාව පුරා ට්‍රාන්ස් කාන්තා ලිංගික සේවා සපයන්නන්ට සෞඛ්‍ය සේවා, නීති සහාය සහ සම සහයෝගීතාවයෙන් සහාය දෙන ට්‍රාන්ස් නායකත්වයෙන් යුත් ප්‍රජා සංවිධානයකි.",
    ta: "திருநங்கை மேம்பாட்டு அறக்கட்டளை என்பது 2016 முதல் இலங்கை முழுவதும் திருநங்கை பாலியல் தொழிலாளர்களுக்கு சுகாதாரம், சட்ட உதவி மற்றும் சக ஒற்றுமையுடன் ஆதரவளிக்கும் திருநங்கைகளால் வழிநடத்தப்படும் சமூக அமைப்பு.",
  },
  show_footer_explore: ON,
  show_footer_involved: ON,
  show_footer_social: ON,
  show_footer_newsletter: ON,
  footer_newsletter_title: {
    en: "Stay informed about programs, events & resources",
    si: "වැඩසටහන්, සිදුවීම් සහ සම්පත් පිළිබඳ දැනුවත් වන්න",
    ta: "நிகழ்ச்சிகள், நிகழ்வுகள் மற்றும் வளங்கள் பற்றி அறிந்திருங்கள்",
  },
  footer_newsletter_text: BLANK,
  footer_copyright: {
    en: "TET. All rights reserved. Trans-led. Confidential. Judgment-free.",
    si: "TET. සියලුම හිමිකම් ඇවිරිණි. ට්‍රාන්ස් නායකත්වයෙන් යුතුයි. රහස්‍යයි. විනිශ්චයෙන් තොරයි.",
    ta: "TET. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. திருநங்கைகளால் வழிநடத்தப்படுகிறது. இரகசியம். தீர்ப்பற்றது.",
  },
  footer_credit: BLANK,

  /* ===================================================== Home page ======== */
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
  hero_image: { en: HERO_IMAGE },
  hero_cta1_label: { en: "Get Support", si: "සහාය ලබාගන්න", ta: "உதவி பெற" },
  hero_cta1_link: { en: "/contact" },
  hero_cta2_label: { en: "Learn More", si: "තව දැනගන්න", ta: "மேலும் அறிய" },
  hero_cta2_link: { en: "/about" },
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

  show_home_about: ON,
  home_about_eyebrow: { en: "Who We Are", si: "අපි කවුද", ta: "நாங்கள் யார்" },
  home_about_title: {
    en: "Transgender Empowerment Trust",
    si: "ට්‍රාන්ස්ජෙන්ඩර් සවිබල ගැන්වීමේ භාරය",
    ta: "திருநங்கை மேம்பாட்டு அறக்கட்டளை",
  },
  home_about_text: {
    en: "Transgender Empowerment Trust (TET) is a trans-led, community-based organization founded by and for trans women engaged in sex work. Registered as a non-profit in 2016, we work at the intersection of gender identity and sex worker rights — providing healthcare navigation, harm reduction, legal aid, and peer support so every member of our community can access care without discrimination and build a life on her own terms.",
    si: "ට්‍රාන්ස්ජෙන්ඩර් සවිබල ගැන්වීමේ භාරය (TET) යනු ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් විසින්, ඔවුන් වෙනුවෙන් ආරම්භ කරන ලද ට්‍රාන්ස් නායකත්වයෙන් යුත් ප්‍රජා පදනම් සංවිධානයකි. 2016 දී ලාභ නොලබන සංවිධානයක් ලෙස ලියාපදිංචි වූ අප, ස්ත්‍රී පුරුෂ භාවය සහ ලිංගික සේවා අයිතිවාසිකම් හරස් වන ස්ථානයේ කටයුතු කරමින්, සෞඛ්‍ය මාර්ගෝපදේශනය, හානි අවම කිරීම, නීති සහාය සහ සම සහාය සපයන අතර, අපගේ ප්‍රජාවේ සෑම සාමාජිකයෙකුටම වෙනස්කම් නොකර සත්කාරයට ප්‍රවේශ වී තමන්ගේම කොන්දේසි මත ජීවිතයක් ගොඩනගා ගැනීමට හැකි කරයි.",
    ta: "திருநங்கை மேம்பாட்டு அறக்கட்டளை (TET) என்பது பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளால், அவர்களுக்காக நிறுவப்பட்ட திருநங்கைகளால் வழிநடத்தப்படும் சமூகம் சார்ந்த அமைப்பு. 2016 இல் இலாப நோக்கற்ற அமைப்பாக பதிவுசெய்யப்பட்ட நாங்கள், பாலின அடையாளம் மற்றும் பாலியல் தொழிலாளர் உரிமைகள் சந்திக்கும் இடத்தில் செயல்பட்டு, சுகாதார வழிகாட்டல், தீங்கு குறைப்பு, சட்ட உதவி மற்றும் சக ஆதரவை வழங்குகிறோம், இதனால் எங்கள் சமூகத்தின் ஒவ்வொரு உறுப்பினரும் பாகுபாடின்றி பராமரிப்பை அணுகி தங்கள் சொந்த விதிமுறைகளில் வாழ்க்கையை உருவாக்க முடியும்.",
  },
  home_about_image: { en: COMMUNITY_IMAGE },
  home_about_caption: {
    en: "Transgender Empowerment Trust",
    si: "ට්‍රාන්ස්ජෙන්ඩර් සවිබල ගැන්වීමේ භාරය",
    ta: "திருநங்கை மேம்பாட்டு அறக்கட்டளை",
  },
  home_about_link_label: { en: "Learn More", si: "තව දැනගන්න", ta: "மேலும் அறிய" },

  show_home_stats: ON,
  home_stats_eyebrow: { en: "Impact", si: "බලපෑම", ta: "தாக்கம்" },
  home_stats_title: {
    en: "Measured progress that reflects community priorities",
    si: "ප්‍රජා ප්‍රමුඛතා පිළිබිඹු කරන මනිනු ලබන ප්‍රගතිය",
    ta: "சமூக முன்னுரிமைகளை பிரதிபலிக்கும் அளவிடப்பட்ட முன்னேற்றம்",
  },
  home_stats_image: { en: BANNER_IMAGE },

  show_home_services: ON,
  home_services_eyebrow: { en: "Our Services", si: "අපගේ සේවාවන්", ta: "எங்கள் சேவைகள்" },
  home_services_title: {
    en: "How we support our community",
    si: "අපි අපගේ ප්‍රජාවට සහාය දෙන ආකාරය",
    ta: "எங்கள் சமூகத்திற்கு நாம் ஆதரவளிக்கும் விதம்",
  },
  home_services_text: BLANK,
  home_services_count: { en: "6" },
  home_services_link_label: VIEW_ALL,

  show_home_projects: ON,
  home_projects_eyebrow: { en: "Our Initiatives", si: "අපගේ මුලපිරීම්", ta: "எங்கள் முயற்சிகள்" },
  home_projects_title: {
    en: "Featured Programs",
    si: "විශේෂ වැඩසටහන්",
    ta: "சிறப்பு திட்டங்கள்",
  },
  home_projects_text: BLANK,
  home_projects_count: { en: "4" },
  home_projects_link_label: VIEW_ALL,

  show_home_contact: ON,
  home_contact_eyebrow: { en: "Get In Touch", si: "සම්බන්ධ වන්න", ta: "தொடர்பு கொள்ளுங்கள்" },
  home_contact_title: {
    en: "We're here — reach out anytime",
    si: "අපි මෙහි සිටිමු — ඕනෑම වේලාවක සම්බන්ධ වන්න",
    ta: "நாங்கள் இங்கே இருக்கிறோம் — எப்போது வேண்டுமானாலும் தொடர்பு கொள்ளுங்கள்",
  },
  home_contact_text: {
    en: "Whether you need support, want to volunteer, or have a question, our team responds confidentially and without judgment.",
    si: "ඔබට සහාය අවශ්‍ය වුවත්, ස්වේච්ඡා සේවය කිරීමට කැමති වුවත්, ප්‍රශ්නයක් තිබුණත්, අපගේ කණ්ඩායම රහස්‍යභාවයෙන් සහ විනිශ්චයෙන් තොරව ප්‍රතිචාර දක්වයි.",
    ta: "உங்களுக்கு ஆதரவு தேவைப்பட்டாலும், தன்னார்வலராக இருக்க விரும்பினாலும், அல்லது கேள்வி இருந்தாலும், எங்கள் குழு இரகசியமாகவும் தீர்ப்பின்றியும் பதிலளிக்கும்.",
  },
  home_contact_card_title: { en: "Call Us", si: "අමතන්න", ta: "அழைக்கவும்" },
  home_contact_image: { en: OUTREACH_IMAGE },
  home_contact_button: CONTACT_US,

  show_home_testimonials: ON,
  home_testimonials_eyebrow: { en: "Community Voices", si: "ප්‍රජා හඬ", ta: "சமூகக் குரல்கள்" },
  home_testimonials_title: {
    en: "Stories from the center of our work",
    si: "අපගේ කාර්යයේ කේන්ද්‍රස්ථානයෙන් කථා",
    ta: "எங்கள் பணியின் மையத்திலிருந்து கதைகள்",
  },

  show_home_news: ON,
  home_news_eyebrow: { en: "Latest News", si: "නවතම පුවත්", ta: "சமீபத்திய செய்திகள்" },
  home_news_title: { en: "Updates from the Field", si: "ක්ෂේත්‍රයෙන් යාවත්කාලීන කිරීම්", ta: "களத்திலிருந்து புதுப்பிப்புகள்" },
  home_news_count: { en: "3" },

  show_home_events: ON,
  home_events_eyebrow: {
    en: "Events",
    si: "සිදුවීම්",
    ta: "நிகழ்வுகள்",
  },
  home_events_title: {
    en: "Upcoming Activities",
    si: "ඉදිරි කටයුතු",
    ta: "வரவிருக்கும் செயல்பாடுகள்",
  },
  home_events_count: { en: "2" },
  home_events_link_label: VIEW_ALL,

  show_home_partners: ON,
  home_partners_eyebrow: { en: "Partners", si: "හවුල්කරුවන්", ta: "பங்காளிகள்" },
  home_partners_title: {
    en: "Working with health, legal, and community organizations",
    si: "සෞඛ්‍ය, නීති සහ ප්‍රජා සංවිධාන සමඟ එක්ව කටයුතු කිරීම",
    ta: "சுகாதார, சட்ட மற்றும் சமூக அமைப்புகளுடன் இணைந்து செயல்படுதல்",
  },

  show_home_donate: ON,
  home_donate_eyebrow: SUPPORT_TET,
  home_donate_title: {
    en: "Help sustain healthcare, legal aid & outreach",
    si: "සෞඛ්‍ය සේවා, නීති සහාය සහ ප්‍රජා ප්‍රවේශය පවත්වාගෙන යාමට උදව් කරන්න",
    ta: "சுகாதாரம், சட்ட உதவி மற்றும் அணுகல் பணியை நிலைநிறுத்த உதவுங்கள்",
  },
  home_donate_text: {
    en: "Your support funds direct services, peer navigation, health education, and safe community spaces for trans women in sex work.",
    si: "ඔබගේ සහාය ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා සෘජු සේවා, සම මාර්ගෝපදේශනය, සෞඛ්‍ය අධ්‍යාපනය සහ ආරක්ෂිත ප්‍රජා අවකාශ සඳහා යොදවනු ලැබේ.",
    ta: "பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான நேரடி சேவைகள், சக வழிகாட்டல், சுகாதாரக் கல்வி மற்றும் பாதுகாப்பான சமூக இடங்களுக்கு உங்கள் ஆதரவு பயன்படுகிறது.",
  },
  home_donate_button: { en: "Make a Donation", si: "පරිත්‍යාගයක් කරන්න", ta: "நன்கொடை வழங்க" },
  home_donate_button2: { en: "Become a Volunteer", si: "ස්වේච්ඡා සේවකයෙක් වන්න", ta: "தன்னார்வலராகுங்கள்" },

  /* ==================================================== About page ======== */
  about_hero_title: { en: "About Us", si: "අප ගැන", ta: "எங்களைப் பற்றி" },
  about_hero_intro: {
    en: "Built by the community we serve — trans-led support for trans women in sex work since 2016.",
    si: "අප සේවය කරන ප්‍රජාව විසින්ම ගොඩනගන ලදී — 2016 සිට ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා ට්‍රාන්ස් නායකත්වයෙන් යුත් සහාය.",
    ta: "நாங்கள் சேவை செய்யும் சமூகத்தால் கட்டப்பட்டது — 2016 முதல் பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான திருநங்கைகளால் வழிநடத்தப்படும் ஆதரவு.",
  },
  about_hero_image: { en: BANNER_IMAGE },

  about_overview_title: { en: "Overview", si: "දළ විශ්ලේෂණය", ta: "மேலோட்டம்" },
  about_overview: {
    en: "TET was founded in 2016 by a small group of trans women in sex work who were tired of navigating hostile clinics, unresponsive police, and services that were never designed with them in mind. A decade later, we're a trans-led team of outreach workers, peer counsellors, legal advocates, and volunteers working across 3 provinces of Sri Lanka.",
    si: "සතුරු සායන, ප්‍රතිචාර නොදක්වන පොලීසිය සහ ඔවුන් සිතට ගෙන කිසිදා නිර්මාණය නොකළ සේවා අතරින් ගමන් කිරීමට වෙහෙසට පත් ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන්ගේ කුඩා පිරිසක් විසින් TET 2016 දී ආරම්භ කරන ලදී. දශකයකට පසු, අපි ශ්‍රී ලංකාවේ පළාත් 3ක් පුරා කටයුතු කරන ප්‍රවේශ සේවකයින්, සම උපදේශකයින්, නීති පෙනී සිටින්නන් සහ ස්වේච්ඡා සේවකයින්ගෙන් සමන්විත ට්‍රාන්ස් නායකත්වයෙන් යුත් කණ්ඩායමකි.",
    ta: "விரோதப் போக்குடைய கிளினிக்குகள், பதிலளிக்காத காவல்துறை, மற்றும் தங்களை மனதில் கொள்ளாமல் வடிவமைக்கப்பட்ட சேவைகளை எதிர்கொள்ள சோர்வடைந்த பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளின் ஒரு சிறு குழுவினரால் TET 2016 இல் நிறுவப்பட்டது. ஒரு தசாப்தத்திற்குப் பிறகு, நாங்கள் இலங்கையின் 3 மாகாணங்களில் செயல்படும் அணுகல் பணியாளர்கள், சக ஆலோசகர்கள், சட்ட வக்கீல்கள் மற்றும் தன்னார்வலர்களைக் கொண்ட திருநங்கைகளால் வழிநடத்தப்படும் குழு.",
  },
  about_overview_image: { en: COMMUNITY_IMAGE },

  about_vision_title: { en: "Our Vision", si: "අපගේ දැක්ම", ta: "எங்கள் தொலைநோக்கு" },
  about_vision: {
    en: "A future where dignity isn't conditional — where trans women in sex work can access healthcare, justice, and opportunity without fear of discrimination, violence, or erasure, and where community-led organizations are trusted partners in public health and policy.",
    si: "ගෞරවය කොන්දේසි සහිත නොවන අනාගතයක් — ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන්ට වෙනස්කම්, ප්‍රචණ්ඩත්වය හෝ මකා දැමීම ගැන බියෙන් තොරව සෞඛ්‍ය සේවා, යුක්තිය සහ අවස්ථා වෙත ප්‍රවේශ විය හැකි, සහ ප්‍රජා නායකත්වයෙන් යුත් සංවිධාන මහජන සෞඛ්‍යය සහ ප්‍රතිපත්තිවල විශ්වාසනීය හවුල්කරුවන් වන අනාගතයක්.",
    ta: "கண்ணியம் நிபந்தனைக்குட்பட்டதாக இல்லாத ஒரு எதிர்காலம் — பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகள் பாகுபாடு, வன்முறை அல்லது அழிப்பு பற்றிய பயமின்றி சுகாதாரம், நீதி மற்றும் வாய்ப்புகளை அணுக முடியும், சமூகம் தலைமையிலான அமைப்புகள் பொது சுகாதாரம் மற்றும் கொள்கையில் நம்பகமான பங்காளர்களாக இருக்கும் எதிர்காலம்.",
  },
  about_mission_title: { en: "Our Mission", si: "අපගේ මෙහෙවර", ta: "எங்கள் பணி" },
  about_mission: {
    en: "To improve access to healthcare, defend human rights, and strengthen community for trans women engaged in sex work in Sri Lanka — through services that are confidential, free, and led by people who understand the work firsthand.",
    si: "ශ්‍රී ලංකාවේ ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා සෞඛ්‍ය ප්‍රවේශය වැඩිදියුණු කිරීම, මානව හිමිකම් ආරක්ෂා කිරීම සහ ප්‍රජාව ශක්තිමත් කිරීම — රහස්‍ය, නොමිලේ සහ මෙම කාර්යය මුලින්ම තේරුම් ගන්නා අය විසින් මෙහෙයවනු ලබන සේවා හරහා.",
    ta: "இலங்கையில் பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான சுகாதார அணுகலை மேம்படுத்துதல், மனித உரிமைகளை பாதுகாத்தல், சமூகத்தை வலுப்படுத்துதல் — இரகசியமான, இலவசமான, இப்பணியை நேரடியாக புரிந்துகொள்பவர்களால் வழிநடத்தப்படும் சேவைகள் மூலம்.",
  },

  about_values_title: { en: "Our Values", si: "අපගේ වටිනාකම්", ta: "எங்கள் மதிப்புகள்" },
  about_values: {
    en: "Confidentiality :: Every interaction is private. No one accesses our services without control over their own information.\nTrans Leadership :: Our staff and peer educators are majority trans women — because lived experience is expertise.\nHarm Reduction :: We meet people where they are, without judgment, ultimatums, or conditions on care.\nRights-Based :: Health and safety are rights, not privileges — we advocate accordingly, publicly and firmly.\nSolidarity :: We build peer networks so no member of our community has to navigate crisis alone.\nAccountability :: We report transparently to our community and funders on how resources are used.",
    si: "රහස්‍යභාවය :: සෑම අන්තර්ක්‍රියාවක්ම පුද්ගලිකයි. කිසිවෙකුට තමන්ගේ තොරතුරු පිළිබඳ පාලනයකින් තොරව අපගේ සේවා වෙත ප්‍රවේශ විය නොහැක.\nට්‍රාන්ස් නායකත්වය :: අපගේ කාර්ය මණ්ඩලය සහ සම අධ්‍යාපනඥයින්ගෙන් වැඩි ප්‍රමාණයක් ට්‍රාන්ස් කාන්තාවෝය — මන්ද ජීවන අත්දැකීම ප්‍රවීණත්වයක් නිසාය.\nහානි අවම කිරීම :: අපි විනිශ්චයකින්, අවසාන නියෝගයකින් හෝ සත්කාරයට කොන්දේසිවලින් තොරව මිනිසුන් සිටින ස්ථානයේදීම හමුවෙමු.\nඅයිතිවාසිකම් පදනම් :: සෞඛ්‍යය සහ ආරක්ෂාව අයිතිවාසිකම්ය, වරප්‍රසාද නොවේ — අපි ඒ අනුව ප්‍රසිද්ධියේ සහ ස්ථිරවම පෙනී සිටිමු.\nසහයෝගීතාවය :: අපගේ ප්‍රජාවේ කිසිදු සාමාජිකයෙකුට තනිවම අර්බුදයක් මුහුණ දීමට සිදු නොවන පරිදි අපි සම ජාල ගොඩනගමු.\nගණන්දීමේ හැකියාව :: සම්පත් භාවිතා කරන ආකාරය පිළිබඳ අපගේ ප්‍රජාවට සහ අරමුදල් සපයන්නන්ට විනිවිදභාවයෙන් වාර්තා කරමු.",
    ta: "இரகசியம் :: ஒவ்வொரு தொடர்பும் தனிப்பட்டது. தங்கள் சொந்த தகவலின் மீதான கட்டுப்பாடு இல்லாமல் யாரும் எங்கள் சேவைகளை அணுக மாட்டார்கள்.\nதிருநங்கை தலைமைத்துவம் :: எங்கள் ஊழியர்கள் மற்றும் சக கல்வியாளர்களில் பெரும்பாலோர் திருநங்கைகள் — ஏனெனில் வாழ்க்கை அனுபவம் நிபுணத்துவம்.\nதீங்கு குறைப்பு :: தீர்ப்பு, இறுதி எச்சரிக்கை அல்லது பராமரிப்பு நிபந்தனைகள் இன்றி மக்கள் இருக்கும் இடத்திலேயே நாங்கள் அவர்களை சந்திக்கிறோம்.\nஉரிமை அடிப்படையிலானது :: சுகாதாரமும் பாதுகாப்பும் உரிமைகள், சலுகைகள் அல்ல — நாங்கள் அதற்கேற்ப பகிரங்கமாகவும் உறுதியாகவும் வாதிடுகிறோம்.\nஒற்றுமை :: எங்கள் சமூகத்தின் எந்த உறுப்பினரும் தனியாக நெருக்கடியை எதிர்கொள்ள வேண்டியதில்லை என்பதற்காக நாங்கள் சக வலையமைப்புகளை உருவாக்குகிறோம்.\nபொறுப்புக்கூறல் :: வளங்கள் எவ்வாறு பயன்படுத்தப்படுகின்றன என்பதை எங்கள் சமூகத்திற்கும் நிதியளிப்பவர்களுக்கும் வெளிப்படையாக அறிக்கை செய்கிறோம்.",
  },

  about_community_title: {
    en: "Communities We Serve",
    si: "අප සේවය කරන ප්‍රජාවන්",
    ta: "நாங்கள் சேவை செய்யும் சமூகங்கள்",
  },
  about_community: {
    en: "TET serves trans women engaged in sex work across Sri Lanka, alongside the wider trans community facing stigma, violence, or economic hardship. Our programs are community-led: designed and delivered by people who understand the lived experience of the women we serve, across 6 outreach sites in 3 provinces with 9 partner clinics.",
    si: "TET ශ්‍රී ලංකාව පුරා ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන්ට, අපකීර්තියට, ප්‍රචණ්ඩත්වයට හෝ ආර්ථික දුෂ්කරතාවලට මුහුණ දෙන පුළුල් ට්‍රාන්ස් ප්‍රජාව සමඟ සේවය කරයි. අපගේ වැඩසටහන් ප්‍රජා නායකත්වයෙන් යුක්තයි: අප සේවය කරන කාන්තාවන්ගේ ජීවන අත්දැකීම් තේරුම් ගන්නා අය විසින් නිර්මාණය කර ක්‍රියාත්මක කරනු ලැබේ — පළාත් 3ක ප්‍රවේශ ස්ථාන 6ක්, හවුල්කාර සායන 9ක් සමඟ.",
    ta: "TET இலங்கை முழுவதும் பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கும், களங்கம், வன்முறை அல்லது பொருளாதார சிரமங்களை எதிர்கொள்ளும் பரந்த திருநங்கை சமூகத்திற்கும் சேவை செய்கிறது. எங்கள் திட்டங்கள் சமூகத்தால் வழிநடத்தப்படுகின்றன: நாங்கள் சேவை செய்யும் பெண்களின் வாழ்க்கை அனுபவத்தைப் புரிந்துகொள்பவர்களால் வடிவமைக்கப்பட்டு வழங்கப்படுகின்றன — 3 மாகாணங்களில் 6 அணுகல் தளங்கள், 9 பங்காளர் மருத்துவமனைகளுடன்.",
  },

  about_history_title: { en: "Our Story", si: "අපගේ කථාව", ta: "எங்கள் கதை" },
  about_history: {
    en: "TET was founded in 2016 by five peer outreach volunteers operating from a rented room in Colombo. What began as informal night outreach has grown into a registered non-profit with a 24/7 crisis hotline and services across 3 provinces.\n\nOur approach has not changed: confidentiality first, no judgment, and programs shaped by the trans women who use them.",
    si: "TET 2016 දී කොළඹ කුලියට ගත් කාමරයකින් ක්‍රියාත්මක වූ සම ප්‍රවේශ ස්වේච්ඡා සේවකයින් පස් දෙනෙකු විසින් ආරම්භ කරන ලදී. අවිධිමත් රාත්‍රී ප්‍රවේශයක් ලෙස ආරම්භ වූ දේ පළාත් 3ක් පුරා සේවා සහ 24/7 හදිසි උපකාරක මාර්ගයක් සහිත ලියාපදිංචි ලාභ නොලබන සංවිධානයක් බවට වර්ධනය වී ඇත.\n\nඅපගේ ප්‍රවේශය වෙනස් වී නැත: රහස්‍යභාවය පළමුව, විනිශ්චයක් නැත, සහ එය භාවිතා කරන ට්‍රාන්ස් කාන්තාවන් විසින් හැඩගස්වන වැඩසටහන්.",
    ta: "கொழும்பில் வாடகைக்கு எடுக்கப்பட்ட ஒரு அறையிலிருந்து செயல்பட்ட ஐந்து சக அணுகல் தன்னார்வலர்களால் TET 2016 இல் நிறுவப்பட்டது. முறைசாரா இரவு அணுகல் பணியாகத் தொடங்கியது 3 மாகாணங்களில் சேவைகள் மற்றும் 24/7 நெருக்கடி உதவி இணைப்புடன் பதிவுசெய்யப்பட்ட இலாப நோக்கற்ற அமைப்பாக வளர்ந்துள்ளது.\n\nஎங்கள் அணுகுமுறை மாறவில்லை: இரகசியம் முதலில், தீர்ப்பு இல்லை, அதைப் பயன்படுத்தும் திருநங்கைகளால் வடிவமைக்கப்படும் திட்டங்கள்.",
  },
  about_history_image: { en: HERO_IMAGE },

  about_timeline_title: { en: "Milestones", si: "සන්ධිස්ථාන", ta: "மைல்கற்கள்" },
  about_timeline: {
    en: "2016 :: Founded by five peer outreach volunteers operating from a rented room in Colombo.\n2019 :: Registered as a non-profit; launched our first mobile health outreach van.\n2022 :: Opened our ID & Legal Clinic in partnership with the Legal Aid Commission.\n2026 :: Serving 3 provinces with 6 outreach sites and a 24/7 crisis hotline.",
    si: "2016 :: කොළඹ කුලියට ගත් කාමරයකින් ක්‍රියාත්මක වූ සම ප්‍රවේශ ස්වේච්ඡා සේවකයින් පස් දෙනෙකු විසින් ආරම්භ කරන ලදී.\n2019 :: ලාභ නොලබන සංවිධානයක් ලෙස ලියාපදිංචි විය; අපගේ පළමු ජංගම සෞඛ්‍ය ප්‍රවේශ වාහනය දියත් කරන ලදී.\n2022 :: නීති සහාය කොමිසම සමඟ හවුල්කාරිත්වයෙන් අපගේ හැඳුනුම්පත් සහ නීති සායනය විවෘත කරන ලදී.\n2026 :: ප්‍රවේශ ස්ථාන 6ක් සහ 24/7 හදිසි උපකාරක මාර්ගයක් සමඟ පළාත් 3කට සේවා සපයයි.",
    ta: "2016 :: கொழும்பில் வாடகைக்கு எடுக்கப்பட்ட அறையிலிருந்து செயல்பட்ட ஐந்து சக அணுகல் தன்னார்வலர்களால் நிறுவப்பட்டது.\n2019 :: இலாப நோக்கற்ற அமைப்பாக பதிவுசெய்யப்பட்டது; எங்கள் முதல் நடமாடும் சுகாதார வாகனத்தை தொடங்கியது.\n2022 :: சட்ட உதவி ஆணையத்துடன் இணைந்து எங்கள் அடையாள அட்டை & சட்ட கிளினிக்கைத் திறந்தது.\n2026 :: 6 அணுகல் தளங்கள் மற்றும் 24/7 நெருக்கடி உதவி இணைப்புடன் 3 மாகாணங்களுக்கு சேவை.",
  },

  about_team_title: { en: "Our Team", si: "අපගේ කණ්ඩායම", ta: "எங்கள் குழு" },
  about_team: {
    en: "Programme Director :: Oversees outreach, health partnerships, and organizational strategy.\nHealth Navigation Lead :: Coordinates clinic referrals and testing services.\nLegal Aid Coordinator :: Manages the ID & Legal Clinic and rights defense casework.\nPeer Navigator Team :: Twelve trained peer navigators providing accompaniment and support.",
    si: "වැඩසටහන් අධ්‍යක්ෂක :: ප්‍රවේශය, සෞඛ්‍ය හවුල්කාරිත්ව සහ සංවිධානාත්මක උපාය මාර්ග අධීක්ෂණය කරයි.\nසෞඛ්‍ය මාර්ගෝපදේශන ප්‍රධානියා :: සායන යොමු කිරීම් සහ පරීක්ෂණ සේවා සම්බන්ධීකරණය කරයි.\nනීති සහාය සම්බන්ධීකාරක :: හැඳුනුම්පත් සහ නීති සායනය සහ අයිතිවාසිකම් ආරක්ෂණ නඩු කටයුතු කළමනාකරණය කරයි.\nසම මාර්ගෝපදේශක කණ්ඩායම :: පුහුණු ලත් සම මාර්ගෝපදේශකයින් දොළහක් සහායක සහ සහාය ලබා දෙයි.",
    ta: "திட்ட இயக்குநர் :: அணுகல் பணி, சுகாதார கூட்டாண்மைகள் மற்றும் நிறுவன உத்தியை மேற்பார்வையிடுகிறார்.\nசுகாதார வழிகாட்டல் தலைவர் :: கிளினிக் பரிந்துரைகள் மற்றும் பரிசோதனை சேவைகளை ஒருங்கிணைக்கிறார்.\nசட்ட உதவி ஒருங்கிணைப்பாளர் :: அடையாள அட்டை & சட்ட கிளினிக் மற்றும் உரிமை பாதுகாப்பு வழக்குகளை நிர்வகிக்கிறார்.\nசக வழிகாட்டி குழு :: பயிற்சி பெற்ற பன்னிரண்டு சக வழிகாட்டிகள் துணை மற்றும் ஆதரவை வழங்குகின்றனர்.",
  },

  about_extra_title: BLANK,
  about_extra_text: BLANK,

  /* ================================================== Contact page ======== */
  contact_hero_title: CONTACT_US,
  contact_hero_intro: {
    en: "We're here — reach out anytime. Whether you need support, want to volunteer, or have a question, our team responds confidentially and without judgment.",
    si: "අපි මෙහි සිටිමු — ඕනෑම වේලාවක සම්බන්ධ වන්න. ඔබට සහාය අවශ්‍ය වුවත්, ස්වේච්ඡා සේවය කිරීමට කැමති වුවත්, ප්‍රශ්නයක් තිබුණත්, අපගේ කණ්ඩායම රහස්‍යභාවයෙන් සහ විනිශ්චයෙන් තොරව ප්‍රතිචාර දක්වයි.",
    ta: "நாங்கள் இங்கே இருக்கிறோம் — எப்போது வேண்டுமானாலும் தொடர்பு கொள்ளுங்கள். உங்களுக்கு ஆதரவு தேவைப்பட்டாலும், தன்னார்வலராக இருக்க விரும்பினாலும், அல்லது கேள்வி இருந்தாலும், எங்கள் குழு இரகசியமாகவும் தீர்ப்பின்றியும் பதிலளிக்கும்.",
  },
  contact_hero_image: BLANK,

  show_contact_form: ON,
  contact_form_title: {
    en: "Send Us a Message",
    si: "අපට පණිවිඩයක් යවන්න",
    ta: "எங்களுக்கு செய்தி அனுப்புங்கள்",
  },
  contact_form_note: {
    en: "You can ask us to respond via WhatsApp instead of email.",
    si: "ඊමේල් වෙනුවට WhatsApp හරහා ප්‍රතිචාර දක්වන ලෙස ඔබට අප වෙතින් ඉල්ලා සිටිය හැක.",
    ta: "மின்னஞ்சலுக்குப் பதிலாக WhatsApp மூலம் பதிலளிக்குமாறு எங்களிடம் கேட்கலாம்.",
  },
  contact_success_message: {
    en: "Your message has been sent. We will get back to you soon.",
    si: "ඔබගේ පණිවිඩය යවන ලදී. අපි ඉක්මනින් ඔබ හා සම්බන්ධ වන්නෙමු.",
    ta: "உங்கள் செய்தி அனுப்பப்பட்டது. விரைவில் உங்களைத் தொடர்பு கொள்வோம்.",
  },

  show_contact_details: ON,
  contact_details_title: {
    en: "Our Details",
    si: "අපගේ විස්තර",
    ta: "எங்கள் விவரங்கள்",
  },
  show_contact_map: ON,

  /* =================================================== Donate page ======== */
  donate_hero_title: { en: "Support Our Work", si: "අපගේ කාර්යයට සහාය වන්න", ta: "எங்கள் பணிக்கு ஆதரவளியுங்கள்" },
  donate_intro: {
    en: "Every donation goes directly toward healthcare navigation, legal aid, crisis support, and outreach for trans women in sex work.",
    si: "සෑම පරිත්‍යාගයක්ම ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන් සඳහා සෞඛ්‍ය මාර්ගෝපදේශනය, නීති සහාය, හදිසි උපකාර සහ ප්‍රජා ප්‍රවේශය සඳහා සෘජුවම යොදවනු ලැබේ.",
    ta: "ஒவ்வொரு நன்கொடையும் பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கான சுகாதார வழிகாட்டல், சட்ட உதவி, நெருக்கடி ஆதரவு மற்றும் அணுகல் பணிக்கு நேரடியாக செல்கிறது.",
  },
  donate_hero_image: BLANK,

  show_donate_online: ON,
  donate_amounts: { en: "1000\n2500\n5000\n10000\n25000" },
  donate_note: {
    en: "TET is a registered non-profit. Donations are processed securely by PayHere; we never see or store your card details. 100% of proceeds stay within community programs.",
    si: "TET ලියාපදිංචි ලාභ නොලබන සංවිධානයකි. පරිත්‍යාග PayHere මගින් ආරක්ෂිතව සකසනු ලැබේ; අපි කිසිදා ඔබගේ කාඩ්පත් විස්තර නොදකිමු හෝ නොගබඩා කරමු. ආදායමින් 100%ම ප්‍රජා වැඩසටහන් තුළ පවතී.",
    ta: "TET ஒரு பதிவுசெய்யப்பட்ட இலாப நோக்கற்ற அமைப்பு. நன்கொடைகள் PayHere மூலம் பாதுகாப்பாக செயலாக்கப்படுகின்றன; உங்கள் அட்டை விவரங்களை நாங்கள் ஒருபோதும் பார்ப்பதில்லை அல்லது சேமிப்பதில்லை. வருவாயில் 100% சமூக திட்டங்களுக்குள்ளேயே பயன்படுத்தப்படும்.",
  },

  donate_bank_title: {
    en: "Direct Bank Transfer",
    si: "බැංකු හුවමාරුව",
    ta: "நேரடி வங்கி பரிமாற்றம்",
  },
  bank_details: {
    en: "Account Name: Transgender Empowerment Trust\nBank: (your bank)\nBranch: (your branch)\nAccount No: (your account number)\nSWIFT: (for international transfers)",
  },

  donate_impact_title: SUPPORT_TET,
  donate_impact_items: {
    en: "Where it's needed most :: Flexible funding lets us respond to the most urgent needs first — from emergency shelter to crisis calls.\nHealthcare Navigation :: Referrals, screenings, and accompaniment to trans-friendly clinics.\nLegal Aid & Rights Defense :: Support with ID documentation, police harassment, and workplace discrimination.\nCrisis & Outreach :: A 24/7 hotline and night outreach teams bringing supplies and safety information directly to the community.",
    si: "වඩාත්ම අවශ්‍ය තැනට :: නම්‍යශීලී අරමුදල් හදිසි නවාතැන් සිට හදිසි ඇමතුම් දක්වා වඩාත් හදිසි අවශ්‍යතාවලට මුලින්ම ප්‍රතිචාර දැක්විය හැක.\nසෞඛ්‍ය මාර්ගෝපදේශනය :: ට්‍රාන්ස්-හිතකාමී සායන වෙත යොමු කිරීම්, පරීක්ෂණ සහ සහායක ගමන්.\nනීති සහාය සහ අයිතිවාසිකම් ආරක්ෂණය :: හැඳුනුම්පත් ලේඛන, පොලිස් හිරිහැර සහ රැකියා ස්ථාන වෙනස්කම් සම්බන්ධ සහාය.\nහදිසි උපකාර සහ ප්‍රවේශය :: ප්‍රජාව වෙත සෘජුවම සැපයුම් සහ ආරක්ෂක තොරතුරු ගෙන එන 24/7 උපකාරක මාර්ගය සහ රාත්‍රී ප්‍රවේශ කණ්ඩායම්.",
    ta: "மிகவும் தேவையான இடத்திற்கு :: நெகிழ்வான நிதி அவசர தங்குமிடம் முதல் நெருக்கடி அழைப்புகள் வரை மிக அவசரமான தேவைகளுக்கு முதலில் பதிலளிக்க உதவுகிறது.\nசுகாதார வழிகாட்டல் :: திருநங்கை-நட்பு கிளினிக்குகளுக்கான பரிந்துரைகள், பரிசோதனைகள் மற்றும் துணை.\nசட்ட உதவி & உரிமை பாதுகாப்பு :: அடையாள ஆவணங்கள், காவல்துறை துன்புறுத்தல் மற்றும் பணியிட பாகுபாடு தொடர்பான ஆதரவு.\nநெருக்கடி & அணுகல் பணி :: சமூகத்திற்கு நேரடியாக பொருட்கள் மற்றும் பாதுகாப்பு தகவல்களைக் கொண்டு வரும் 24/7 உதவி இணைப்பு மற்றும் இரவு அணுகல் குழுக்கள்.",
  },

  /* ================================================ Volunteer page ========= */
  volunteer_hero_title: { en: "Volunteer with TET", si: "TET සමඟ ස්වේච්ඡා සේවය කරන්න", ta: "TET உடன் தன்னார்வமாக பணியாற்றுங்கள்" },
  volunteer_hero_intro: {
    en: "Whether you have an hour a week or a professional skill to share, there's a place for you in our community supporting trans women in sex work across Sri Lanka.",
    si: "ඔබට සතියකට පැයක් හෝ බෙදාගැනීමට වෘත්තීය කුසලතාවක් තිබුණත්, ශ්‍රී ලංකාව පුරා ලිංගික සේවා කර්මාන්තයේ නියැලෙන ට්‍රාන්ස් කාන්තාවන්ට සහාය වන අපගේ ප්‍රජාවේ ඔබටත් ස්ථානයක් ඇත.",
    ta: "உங்களிடம் வாரத்திற்கு ஒரு மணிநேரம் அல்லது பகிர்ந்துகொள்ள ஒரு தொழில்முறை திறமை இருந்தாலும், இலங்கை முழுவதும் பாலியல் தொழிலில் ஈடுபடும் திருநங்கைகளுக்கு ஆதரவளிக்கும் எங்கள் சமூகத்தில் உங்களுக்கும் ஒரு இடம் உண்டு.",
  },
  volunteer_hero_image: { en: COMMUNITY_IMAGE },

  volunteer_opportunities_title: { en: "Ways to Help", si: "සහාය වීමේ ක්‍රම", ta: "உதவும் வழிகள்" },
  volunteer_opportunities: {
    en: "Outreach Volunteer :: Join night outreach teams distributing health supplies and information.\nPeer Counsellor Trainee :: Train to provide one-on-one peer counselling and emotional support.\nLegal Aid Assistant :: Support case intake and documentation for our legal clinic.\nEvent Support :: Help organize health camps, workshops, and community gatherings.",
    si: "ප්‍රවේශ ස්වේච්ඡා සේවක :: සෞඛ්‍ය සැපයුම් සහ තොරතුරු බෙදා දෙන රාත්‍රී ප්‍රවේශ කණ්ඩායම්වලට එක්වන්න.\nසම උපදේශක පුහුණුකරු :: එකින් එක සම උපදේශනය සහ චිත්තවේගී සහාය ලබා දීමට පුහුණු වන්න.\nනීති සහාය සහායක :: අපගේ නීති සායනය සඳහා නඩු ලබාගැනීම සහ ලේඛන සඳහා සහාය වන්න.\nඅවස්ථා සහාය :: සෞඛ්‍ය කඳවුරු, වැඩමුළු සහ ප්‍රජා රැස්වීම් සංවිධානය කිරීමට උදව් කරන්න.",
    ta: "அணுகல் தன்னார்வலர் :: சுகாதார பொருட்கள் மற்றும் தகவல்களை வழங்கும் இரவு அணுகல் குழுக்களில் இணையுங்கள்.\nசக ஆலோசகர் பயிற்சியாளர் :: ஒருவருக்கொருவர் சக ஆலோசனை மற்றும் உணர்ச்சி ஆதரவை வழங்க பயிற்சி பெறுங்கள்.\nசட்ட உதவி உதவியாளர் :: எங்கள் சட்ட கிளினிக்கிற்கான வழக்கு உள்வாங்கல் மற்றும் ஆவணப்படுத்தலுக்கு ஆதரவளியுங்கள்.\nநிகழ்வு ஆதரவு :: சுகாதார முகாம்கள், பயிலரங்குகள் மற்றும் சமூக கூட்டங்களை ஏற்பாடு செய்ய உதவுங்கள்.",
  },

  volunteer_form_title: { en: "Sign Up to Volunteer", si: "ස්වේච්ඡා සේවයට ලියාපදිංචි වන්න", ta: "தன்னார்வலராக பதிவு செய்யுங்கள்" },
  volunteer_form_note: {
    en: "Fill out the form and our volunteer coordinator will reach out within a few days. No experience necessary — we provide full training and support.",
    si: "පෝරමය පුරවන්න, දින කිහිපයක් තුළ අපගේ ස්වේච්ඡා සේවා සම්බන්ධීකාරක ඔබ හා සම්බන්ධ වනු ඇත. පළපුරුද්දක් අවශ්‍ය නොවේ — අපි සම්පූර්ණ පුහුණුව සහ සහාය සපයමු.",
    ta: "படிவத்தை நிரப்புங்கள், சில நாட்களுக்குள் எங்கள் தன்னார்வலர் ஒருங்கிணைப்பாளர் உங்களைத் தொடர்பு கொள்வார். அனுபவம் தேவையில்லை — நாங்கள் முழு பயிற்சி மற்றும் ஆதரவை வழங்குகிறோம்.",
  },
  volunteer_success_message: {
    en: "Thank you for applying! Our team will contact you soon about next steps.",
    si: "අයදුම් කිරීම ගැන ස්තුතියි! ඊළඟ පියවර ගැන අපගේ කණ්ඩායම ඉක්මනින් ඔබ හා සම්බන්ධ වනු ඇත.",
    ta: "விண்ணப்பித்தமைக்கு நன்றி! அடுத்த கட்டங்கள் குறித்து எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.",
  },

  /* ============================================= Hall booking page ========= */
  hall_hero_title: { en: "TET Community Hall Booking", si: "TET ප්‍රජා ශාලා වෙන්කිරීම", ta: "TET சமூக மண்டப முன்பதிவு" },
  hall_hero_intro: {
    en: "Book our community hall in Colombo for support-group meetings, workshops, and community events — submit a request and our team will confirm availability.",
    si: "සහාය කණ්ඩායම් රැස්වීම්, වැඩමුළු සහ ප්‍රජා අවස්ථා සඳහා කොළඹ අපගේ ප්‍රජා ශාලාව වෙන් කරගන්න — ඉල්ලීමක් යොමු කරන්න, අපගේ කණ්ඩායම ලබා ගැනීමේ හැකියාව තහවුරු කරනු ඇත.",
    ta: "ஆதரவுக் குழு கூட்டங்கள், பயிலரங்குகள் மற்றும் சமூக நிகழ்வுகளுக்காக கொழும்பில் உள்ள எங்கள் சமூக மண்டபத்தை முன்பதிவு செய்யுங்கள் — ஒரு கோரிக்கையை சமர்ப்பிக்கவும், எங்கள் குழு கிடைக்கும் தன்மையை உறுதிப்படுத்தும்.",
  },
  hall_hero_image: { en: BANNER_IMAGE },

  hall_details_title: { en: "About the Hall", si: "ශාලාව ගැන", ta: "மண்டபத்தைப் பற்றி" },
  hall_details_text: {
    en: "TET Community Hall hosts our own workshops, peer counselling circles, and legal literacy sessions — and is available to partner organizations and community groups for meetings and events. Submit a request below with your preferred date and we will get back to you to confirm availability and rates.",
    si: "TET ප්‍රජා ශාලාව අපගේම වැඩමුළු, සම උපදේශන කවයන් සහ නීති සාක්ෂරතා සැසි සඳහා ධාරිතාවය සපයන අතර, රැස්වීම් සහ අවස්ථා සඳහා හවුල්කාර සංවිධාන සහ ප්‍රජා කණ්ඩායම් සඳහාද ලබා ගත හැක. ඔබ කැමති දිනය සමඟ පහත ඉල්ලීමක් යොමු කරන්න, ලබා ගැනීමේ හැකියාව සහ ගාස්තු තහවුරු කිරීමට අපි ඔබ හා සම්බන්ධ වන්නෙමු.",
    ta: "TET சமூக மண்டபம் எங்கள் சொந்த பயிலரங்குகள், சக ஆலோசனை வட்டங்கள் மற்றும் சட்ட எழுத்தறிவு அமர்வுகளை நடத்துகிறது — மேலும் கூட்டங்கள் மற்றும் நிகழ்வுகளுக்கு பங்காளர் அமைப்புகள் மற்றும் சமூக குழுக்களுக்கும் கிடைக்கிறது. உங்கள் விருப்பமான தேதியுடன் கீழே ஒரு கோரிக்கையை சமர்ப்பிக்கவும், கிடைக்கும் தன்மை மற்றும் கட்டணங்களை உறுதிப்படுத்த நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",
  },
  hall_rates: {
    en: "Half day (up to 4 hours): Rs. 5,000\nFull day (up to 8 hours): Rs. 9,000\nCommunity groups & partner organisations: rates negotiable — ask us.",
  },
  hall_image1: { en: EVENT_IMAGE },
  hall_image2: { en: COMMUNITY_IMAGE },
  hall_image3: { en: BANNER_IMAGE },

  hall_form_title: { en: "Request a Booking", si: "වෙන්කිරීමක් ඉල්ලන්න", ta: "முன்பதிவைக் கோருங்கள்" },
  hall_form_note: {
    en: "Submit your request and our team will respond within 2 business days to confirm availability and rates.",
    si: "ඔබගේ ඉල්ලීම යොමු කරන්න, ලබා ගැනීමේ හැකියාව සහ ගාස්තු තහවුරු කිරීමට අපගේ කණ්ඩායම වැඩකරන දින 2ක් තුළ ප්‍රතිචාර දක්වනු ඇත.",
    ta: "உங்கள் கோரிக்கையை சமர்ப்பிக்கவும், கிடைக்கும் தன்மை மற்றும் கட்டணங்களை உறுதிப்படுத்த எங்கள் குழு 2 வேலை நாட்களுக்குள் பதிலளிக்கும்.",
  },
  hall_success_message: {
    en: "Thank you! We've received your booking request and will be in touch soon.",
    si: "ස්තුතියි! අපි ඔබගේ වෙන්කිරීමේ ඉල්ලීම ලබාගෙන ඇත, ඉක්මනින් ඔබ හා සම්බන්ධ වන්නෙමු.",
    ta: "நன்றி! உங்கள் முன்பதிவு கோரிக்கையை நாங்கள் பெற்றுள்ளோம், விரைவில் தொடர்பு கொள்வோம்.",
  },

  /* =================================================== Other pages ======== */
  projects_hero_title: { en: "Our Initiatives", si: "අපගේ මුලපිරීම්", ta: "எங்கள் முயற்சிகள்" },
  projects_hero_intro: {
    en: "Featured programs delivering healthcare, legal aid, and peer support across 3 provinces of Sri Lanka.",
    si: "ශ්‍රී ලංකාවේ පළාත් 3ක් පුරා සෞඛ්‍ය සේවා, නීති සහාය සහ සම සහාය ලබා දෙන විශේෂ වැඩසටහන්.",
    ta: "இலங்கையின் 3 மாகாணங்களில் சுகாதாரம், சட்ட உதவி மற்றும் சக ஆதரவை வழங்கும் சிறப்பு திட்டங்கள்.",
  },
  projects_hero_image: BLANK,
  projects_empty_text: {
    en: "No initiatives have been published yet. Please check back soon.",
    si: "තවම මුලපිරීම් ප්‍රකාශයට පත් කර නැත. කරුණාකර නැවත පරීක්ෂා කරන්න.",
    ta: "இன்னும் முயற்சிகள் வெளியிடப்படவில்லை. விரைவில் மீண்டும் பார்க்கவும்.",
  },

  services_hero_title: { en: "Our Services", si: "අපගේ සේවාවන්", ta: "எங்கள் சேவைகள்" },
  services_hero_intro: {
    en: "Care that meets you where you are. Every TET service is free, confidential, and delivered by people who understand the realities of trans life and sex work.",
    si: "ඔබ සිටින තැනටම එන සත්කාරය. සෑම TET සේවාවක්ම නොමිලේ, රහස්‍ය සහ ට්‍රාන්ස් ජීවිතයේ සහ ලිංගික සේවා කර්මාන්තයේ යථාර්ථයන් තේරුම් ගන්නා අය විසින් සපයනු ලැබේ.",
    ta: "நீங்கள் இருக்கும் இடத்திற்கே வரும் பராமரிப்பு. ஒவ்வொரு TET சேவையும் இலவசம், இரகசியம், திருநங்கை வாழ்க்கை மற்றும் பாலியல் தொழிலின் யதார்த்தங்களைப் புரிந்துகொள்பவர்களால் வழங்கப்படுகிறது.",
  },
  services_hero_image: BLANK,
  services_empty_text: {
    en: "No services have been published yet. Please check back soon.",
    si: "තවම සේවා ප්‍රකාශයට පත් කර නැත. කරුණාකර නැවත පරීක්ෂා කරන්න.",
    ta: "இன்னும் சேவைகள் வெளியிடப்படவில்லை. விரைவில் மீண்டும் பார்க்கவும்.",
  },

  publications_hero_title: { en: "Resources", si: "සම්පත්", ta: "வளங்கள்" },
  publications_hero_intro: {
    en: "Guides, hotlines, and information you can trust — practical resources on health, rights, and safety, written with and for our community.",
    si: "ඔබට විශ්වාස කළ හැකි මාර්ගෝපදේශ, උපකාරක මාර්ග සහ තොරතුරු — අපගේ ප්‍රජාව සමඟ සහ ඔවුන් වෙනුවෙන් ලියන ලද සෞඛ්‍යය, අයිතිවාසිකම් සහ ආරක්ෂාව පිළිබඳ ප්‍රායෝගික සම්පත්.",
    ta: "நீங்கள் நம்பக்கூடிய வழிகாட்டிகள், உதவி இணைப்புகள் மற்றும் தகவல்கள் — எங்கள் சமூகத்துடன் மற்றும் அதற்காக எழுதப்பட்ட சுகாதாரம், உரிமைகள் மற்றும் பாதுகாப்பு பற்றிய நடைமுறை வளங்கள்.",
  },
  publications_hero_image: BLANK,
  publications_empty_text: {
    en: "No resources have been added yet. Please check back soon.",
    si: "තවම සම්පත් එකතු කර නැත. කරුණාකර නැවත පරීක්ෂා කරන්න.",
    ta: "இன்னும் வளங்கள் சேர்க்கப்படவில்லை. விரைவில் மீண்டும் பார்க்கவும்.",
  },

  news_hero_title: { en: "News", si: "පුවත්", ta: "செய்திகள்" },
  news_hero_intro: {
    en: "Updates from our outreach, partners, and the community we work with.",
    si: "අපගේ ප්‍රවේශය, හවුල්කරුවන් සහ අප කටයුතු කරන ප්‍රජාවෙන් යාවත්කාලීන කිරීම්.",
    ta: "எங்கள் அணுகல் பணி, பங்காளர்கள் மற்றும் நாங்கள் பணியாற்றும் சமூகத்தின் புதுப்பிப்புகள்.",
  },
  news_hero_image: BLANK,
  news_empty_text: {
    en: "No news articles have been published yet. Please check back soon.",
    si: "තවම පුවත් ලිපි ප්‍රකාශයට පත් කර නැත. කරුණාකර නැවත පරීක්ෂා කරන්න.",
    ta: "இன்னும் செய்திக் கட்டுரைகள் வெளியிடப்படவில்லை. விரைவில் மீண்டும் பார்க்கவும்.",
  },

  events_hero_title: {
    en: "Events & Gallery",
    si: "සිදුවීම් සහ ගැලරිය",
    ta: "நிகழ்வுகள் & படத்தொகுப்பு",
  },
  events_hero_intro: {
    en: "Health camps, legal clinics, and community gatherings — all free and open to the community we serve.",
    si: "සෞඛ්‍ය කඳවුරු, නීති සායන සහ ප්‍රජා රැස්වීම් — සියල්ල නොමිලේ සහ අප සේවය කරන ප්‍රජාවට විවෘතයි.",
    ta: "சுகாதார முகாம்கள், சட்ட கிளினிக்குகள் மற்றும் சமூகக் கூட்டங்கள் — அனைத்தும் இலவசம், நாங்கள் சேவை செய்யும் சமூகத்திற்கு திறந்தவை.",
  },
  events_hero_image: BLANK,
  events_empty_text: {
    en: "There are no upcoming events scheduled right now. Please check back soon.",
    si: "දැනට ඉදිරි සිදුවීම් කිසිවක් සැලසුම් කර නැත. කරුණාකර නැවත පරීක්ෂා කරන්න.",
    ta: "தற்போது வரவிருக்கும் நிகழ்வுகள் திட்டமிடப்படவில்லை. விரைவில் மீண்டும் பார்க்கவும்.",
  },
  show_gallery: ON,
  gallery_title: { en: "Gallery", si: "ගැලරිය", ta: "படத்தொகுப்பு" },

  business_hero_title: { en: "Solidarity Shop", si: "සහයෝගීතා අලෙවිසැල", ta: "ஒற்றுமை கடை" },
  business_hero_intro: {
    en: "Wear your support. Every purchase directly funds TET healthcare, legal aid, and outreach programs, designed and produced with community members.",
    si: "ඔබගේ සහාය පළඳින්න. සෑම මිලදී ගැනීමක්ම TET සෞඛ්‍ය සේවා, නීති සහාය සහ ප්‍රවේශ වැඩසටහන් සඳහා සෘජුවම අරමුදල් සපයන අතර, ප්‍රජා සාමාජිකයින් සමඟ නිර්මාණය කර නිෂ්පාදනය කරනු ලැබේ.",
    ta: "உங்கள் ஆதரவை அணியுங்கள். ஒவ்வொரு வாங்குதலும் TET சுகாதாரம், சட்ட உதவி மற்றும் அணுகல் திட்டங்களுக்கு நேரடியாக நிதியளிக்கிறது, சமூக உறுப்பினர்களுடன் வடிவமைக்கப்பட்டு தயாரிக்கப்படுகிறது.",
  },
  business_hero_image: BLANK,
  business_empty_text: {
    en: "No products are listed yet. Please check back soon.",
    si: "තවම නිෂ්පාදන ලැයිස්තුගත කර නැත. කරුණාකර නැවත පරීක්ෂා කරන්න.",
    ta: "இன்னும் பொருட்கள் பட்டியலிடப்படவில்லை. விரைவில் மீண்டும் பார்க்கவும்.",
  },

  suggestions_hero_title: { en: "Suggestions", si: "යෝජනා", ta: "ஆலோசனைகள்" },
  suggestions_hero_intro: {
    en: "We value your ideas. Share your suggestions — anonymously if you prefer — to help us improve our services.",
    si: "ඔබගේ අදහස් අපට වටී. අපගේ සේවාවන් වැඩිදියුණු කිරීමට ඔබට කැමති නම් නිර්නාමිකව ඔබගේ යෝජනා බෙදාගන්න.",
    ta: "உங்கள் கருத்துக்கள் எங்களுக்கு முக்கியம். எங்கள் சேவைகளை மேம்படுத்த உங்கள் ஆலோசனைகளை — விரும்பினால் அநாமதேயமாக — பகிரவும்.",
  },
  suggestions_hero_image: BLANK,
  suggestions_success_message: {
    en: "Your suggestion has been submitted. Thank you!",
    si: "ඔබගේ යෝජනාව යොමු කරන ලදී. ස්තූතියි!",
    ta: "உங்கள் ஆலோசனை சமர்ப்பிக்கப்பட்டது. நன்றி!",
  },
};

/* -------------------------------------------------------------------------- */

/** Fail fast if the registry and this file have drifted apart. */
function validate() {
  const registryKeys = allSettingDefs.map((d) => d.key);
  const seedKeys = Object.keys(content);

  const missing = registryKeys.filter((k) => !(k in content)).sort();
  const extra = seedKeys.filter((k) => !registryKeys.includes(k)).sort();

  if (missing.length) {
    throw new Error(
      `These settings are editable in the admin but have no seed value:\n  ${missing.join("\n  ")}`
    );
  }
  if (extra.length) {
    throw new Error(
      `These seed values do not match any setting in the admin:\n  ${extra.join("\n  ")}`
    );
  }
}

async function main() {
  validate();

  // Interface labels: seed straight from the built-in dictionaries so every
  // label exists as a real, editable database row in all three languages.
  const labelRows: Record<string, Val> = {};
  for (const def of allLabelDefs) {
    const [group, name] = def.path.split(".");
    const pick = (locale: "en" | "si" | "ta") =>
      ((dictionaries[locale] as any)[group]?.[name] as string) ?? "";
    labelRows[def.key] = { en: pick("en"), si: pick("si"), ta: pick("ta") };
  }

  const all = { ...content, ...labelRows };

  let created = 0;
  let updated = 0;
  let kept = 0;

  for (const [key, v] of Object.entries(all)) {
    const data = { valueEn: v.en, valueSi: v.si ?? null, valueTa: v.ta ?? null };
    const existing = await prisma.setting.findUnique({ where: { key } });

    if (!existing) {
      await prisma.setting.create({ data: { key, ...data } });
      created++;
    } else if (FORCE) {
      await prisma.setting.update({ where: { key }, data });
      updated++;
    } else {
      kept++;
    }
  }

  console.log(
    `Content seeded — ${created} created, ${updated} overwritten, ${kept} left as-is ` +
      `(${Object.keys(content).length} settings + ${Object.keys(labelRows).length} labels).`
  );
  if (!FORCE && kept > 0) {
    console.log("Run with --force to reset existing rows to these values.");
  }
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
