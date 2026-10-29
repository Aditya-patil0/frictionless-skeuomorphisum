import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Facebook,
  HeartHandshake,
  Grid2X2,
  HeartPulse,
  Hospital,
  Image as ImageIcon,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  Send,
  Menu,
  Microscope,
  Play,
  Quote,
  Search,
  Sprout,
  Stethoscope,
  Target,
  Twitter,
  Users,
  UsersRound,
  Video,
  X,
  Youtube,
} from 'lucide-react';

type Language = 'EN' | 'HI' | 'MR' | 'KN';
type GalleryMedia = { title: string; subtitle: string; kind: string; position: string; badge: string; videoSrc?: string; imageSrc?: string; portrait?: boolean };

const galleryVideos: GalleryMedia[] = [
  { title: 'Video 1', subtitle: 'Hospital initiative', kind: 'Videos', position: 'photo-gallery-two', badge: 'Video', videoSrc: '/hospital%20gallary/video/vid1.mp4' },
  { title: 'Video 2', subtitle: 'Community moments', kind: 'Videos', position: 'photo-gallery-five', badge: 'Video', videoSrc: '/hospital%20gallary/video/vid3.mp4' },
  { title: 'Video 3', subtitle: 'Hospital update', kind: 'Videos', position: 'photo-gallery-three', badge: 'Video', videoSrc: '/hospital%20gallary/video/s1.mp4' },
];

const galleryPhotos: GalleryMedia[] = [
  'Shilannyas1.jpeg', 'Shilannyas2.jpeg', 'Shilannyas3.jpeg', 'Shilannyas4.jpeg', 'Shilannyas5.jpeg',
  'Shilannyas6.jpeg', 'Shilannyas7.jpeg', 'Shilannyas8.jpeg', 'Shilannyas9.jpeg', 'Shilannyas10.jpeg',
  'Shilannyas11.jpeg', 'Shilannyas12.jpeg', 'Shilannyas13.jpeg', 'Shilannyas14.jpeg', 'Shilannyas15.jpeg',
  'hospitalpaya.jpeg', 'hospitalpaya1.jpeg', 'hospitalpaya2.jpeg', 'hospitaludhagatana.jpg',
].map((fileName) => ({
  title: fileName.startsWith('Shilannyas')
    ? `Hospital Shilannyas ${fileName.match(/\d+/)?.[0] ?? ''}`.trim()
    : fileName.replace(/\.[^.]+$/, '').replace(/(\d+)/g, ' $1').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (letter) => letter.toUpperCase()),
  subtitle: fileName,
  kind: 'Images',
  position: '',
  badge: 'Photo',
  imageSrc: `/hospital%20gallary/photos/${encodeURIComponent(fileName)}`,
}));

const specifiedBhavanPhotos: GalleryMedia[] = [
  { title: 'Aahaarabhavan - Nourishment and Community', subtitle: 'Specified Bhavan', kind: 'Images', position: '', badge: 'Photo', imageSrc: '/hospital%20gallary/specifed%20bhavan/Aahaarabhavan_%20Nourishment%20and%20Community.png', portrait: true },
  { title: 'Candraprabha Jain Temple', subtitle: 'Specified Bhavan', kind: 'Images', position: '', badge: 'Photo', imageSrc: '/hospital%20gallary/specifed%20bhavan/Candraprabha%20Jain%20Temple%20Devotional%20Poster.png', portrait: true },
  { title: 'Jain Bhojanalaya - Nourishment and Seva', subtitle: 'Specified Bhavan', kind: 'Images', position: '', badge: 'Photo', imageSrc: '/hospital%20gallary/specifed%20bhavan/Jain%20Bhojanalaya_%20Nourishment%20and%20Seva.png', portrait: true },
  { title: 'Jinwani Ambulance - Service and Compassion', subtitle: 'Specified Bhavan', kind: 'Images', position: '', badge: 'Photo', imageSrc: '/hospital%20gallary/specifed%20bhavan/Jinwani%20Ambulance_%20Service%20and%20Compassion.png', portrait: true },
  { title: 'Munishree Akshayasaagarajee Mahaaraaj Tyaagee Bhavan', subtitle: 'Specified Bhavan', kind: 'Images', position: '', badge: 'Photo', imageSrc: '/hospital%20gallary/specifed%20bhavan/Munishree%20Akshaysaagaraji%20Spiritual%20Center%20Poster.png', portrait: true },
  { title: 'Vaidya Niwas - Jain Spiritual Residence', subtitle: 'Specified Bhavan', kind: 'Images', position: '', badge: 'Photo', imageSrc: '/hospital%20gallary/specifed%20bhavan/Vaidya%20Niwas%20Jain%20Spiritual%20Residence.png', portrait: true },
  { title: 'Vineet Chandraprabh Panchakarm', subtitle: 'Specified Bhavan', kind: 'Images', position: '', badge: 'Photo', imageSrc: '/hospital%20gallary/specifed%20bhavan/Vineet%20Chandraprabh%20Panchakarm%20Wellness%20Poster.png', portrait: true },
];

const hospitals = [
  {
    name: 'Saint Shiromani Param Pooja 108 Acharya Shri Vidyasagar Maharaj Ayurvedic Chikitsalaya',
    type: 'Traditional healing for holistic well-being',
    description: {
      EN: 'Comprehensive Ayurvedic treatment focused on natural healing, preventive care and overall wellness.',
      HI: 'प्राकृतिक उपचार, निवारक देखभाल और समग्र स्वास्थ्य पर केंद्रित व्यापक आयुर्वेदिक उपचार।',
      MR: 'नैसर्गिक उपचार, प्रतिबंधात्मक सेवा आणि सर्वांगीण आरोग्यावर केंद्रित सर्वसमावेशक आयुर्वेदिक उपचार.',
      KN: 'ನೈಸರ್ಗಿಕ ಚಿಕಿತ್ಸೆ, ತಡೆಗಟ್ಟುವ ಆರೈಕೆ ಮತ್ತು ಸಮಗ್ರ ಕ್ಷೇಮದ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿದ ಸಮಗ್ರ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ.',
    },
    icon: Leaf,
    color: 'green',
    features: ['Ayurvedic Consultation', 'Panchakarma Therapy', 'Wellness & Lifestyle Guidance', 'Preventive & Rejuvenative Care'],
  },
  {
    name: 'Acharya Ratna Param Pooja 108 Bahubali Maharaj Allopathic Chikitsalaya',
    type: 'Modern medical care with compassion',
    description: {
      EN: 'Compassionate modern medical care with general consultations and specialist OPD services.',
      HI: 'सामान्य परामर्श और विशेषज्ञ ओपीडी सेवाओं के साथ संवेदनशील आधुनिक चिकित्सा देखभाल।',
      MR: 'सामान्य सल्ला आणि तज्ज्ञ ओपीडी सेवांसह करुणामय आधुनिक वैद्यकीय सेवा.',
      KN: 'ಸಾಮಾನ್ಯ ಸಮಾಲೋಚನೆ ಮತ್ತು ತಜ್ಞರ ಒಪಿಡಿ ಸೇವೆಗಳೊಂದಿಗೆ ಕರುಣಾಮಯ ಆಧುನಿಕ ವೈದ್ಯಕೀಯ ಆರೈಕೆ.',
    },
    icon: Stethoscope,
    color: 'blue',
    features: ['General Medicine', 'Specialty OPD Services', 'Inpatient Facilities (Planned)', 'Emergency & Critical Care (Planned)'],
  },
  {
    name: 'Shant-Murti Param Pooja 108 Acharyashree Sanmati Sagarji Maharaj Nidaan Kendra',
    type: 'Advanced diagnostics for early detection',
    description: {
      EN: 'Diagnostic testing and preventive screening to support early detection and informed care.',
      HI: 'शीघ्र पहचान और बेहतर देखभाल के लिए जांच और निवारक स्वास्थ्य स्क्रीनिंग।',
      MR: 'लवकर निदान आणि योग्य उपचारांसाठी तपासणी व प्रतिबंधात्मक आरोग्य तपासणी.',
      KN: 'ಆರಂಭಿಕ ಪತ್ತೆ ಮತ್ತು ಸೂಕ್ತ ಆರೈಕೆಗೆ ನೆರವಾಗುವ ರೋಗನಿರ್ಣಯ ಪರೀಕ್ಷೆಗಳು ಹಾಗೂ ತಡೆಗಟ್ಟುವ ತಪಾಸಣೆ.',
    },
    icon: Microscope,
    color: 'violet',
    features: ['Pathology Laboratory', 'Radiology & Imaging (Planned)', 'Preventive Health Checkups', 'Comprehensive Health Screening'],
  },
];

type Practitioner = {
  name: string;
  image: string;
  resume: string;
  email?: string;
};

const makePractitioner = (name: string, portrait: string, resume: string, email?: string): Practitioner => ({
  name,
  image: `/hospital%20gallary/doctor/${encodeURIComponent(portrait)}`,
  resume: `/hospital%20gallary/doctor/dr%20biodata/${encodeURIComponent(resume)}`,
  ...(email ? { email } : {}),
});

const practitionersByHospital: Practitioner[][] = [
  [
    makePractitioner('Dr. Pradeep Madnaik', 'Dr.Pradeep Madnaik..jpg', 'Dr. Pradeep Madnaik_Resume.pdf', 'pradeepmadnaik@gmail.com'),
    makePractitioner('Dr. Savita Sidanale', 'Dr Savita Bharat Sidanale.jpg', 'Dr Savita Bharat Sidanale_resume.pdf', 'drbsavita1008@gmail.com'),
    makePractitioner('Vd. Arati S. Patil', 'Vd.Arati Shamgonda Patil .png', 'Vd.Arati Patil_resume.pdf', 'aratipatilphd@gmail.com'),
    makePractitioner('Dr. Jyotsna Samaj', 'Dr Jyotsna Chandrakanth Samaj.jpg', 'Dr_Jyotsna_Chandrakanth_Samaj_Biodata.pdf', 'jyotsnacs08@gmail.com'),
    makePractitioner('Dr. Chandrakanth Samaj', 'Dr Chandrakanth Dada Samaj.jpeg', 'Dr Chandrakanth Dada Samaj.pdf', 'csamaj.samaj076@gmail.com'),
  ],
  [
    makePractitioner('Dr. Jayakanta Badabade', 'DR.MRS. JAYAKANTA PARISA BADABADE.png', 'Dr.JP Badabade_Resume.pdf'),
    makePractitioner('Dr. Mrs. Mamta Madnai', 'Dr.Mrs.MamtaMadnai.jpg', 'DR.Mamta_Resume.pdf', 'mamtamadnaik@gmail.com'),
    makePractitioner('Dr. Nikita Magdum', 'DR NIKITA SANJAY MAGDUM.png', 'dr Nikita Magdum_Resume.pdf', 'nikitamagdum48@gmail.com'),
    makePractitioner('Dr. Ashok Jangate', 'Dr ashok jengate.jpg', 'Dr Ashok_Jangate_Resume.pdf', 'jangate.ashok@gmail.com'),
    makePractitioner('Dr. Nitin Patil', 'nitine patil.jpg', 'Dr nitin patil.pdf', 'NitinPatil@gmail.com'),
  ],
  [
    makePractitioner('Dr. Kshitija Patil', 'Dr KSHITIJA PATIL.png', 'DR.Kshitija diatecian_resume.pdf', 'kshitu1008@gmail.com'),
    makePractitioner('Dr. Aditya Desai', 'Dr.Aditya Deepak Desai.jpg', 'Dr.Aditya Deepak Desai.pdf'),
    makePractitioner('Dr. Akanksha Desai', 'Dr. AKANKSHA  ADITYA  DESAI.jpg', 'Dr. AKANKSHA  ADITYA  DESAI.pdf'),
    makePractitioner('Vd. Vanita Chougule', 'Vd. Vanita Sunil Chougule.png', 'dr.vanita Profile  3.pdf', 'vanitachougule777@gmail.com'),
  ],
];

const advisoryBoardMembers = [
  [
    'Dr. B. B. Vitragji Kailas Doshi (Bhaiya) Akaluj, B.A.M.S.',
    'Dr. Shri. Chandrakantji Dada Samaj, Mudhol M.D. (Aayurvedik)',
    'Dr. Shri. Amolji Ajit Patil, Sangli MD (Aayurvedik)',
    'Dr. Shri Sujitji Subhash Patil, Sangli MD (Aayurvedik)',
    'Dr. Shri Amol Ashok Sakale, Nandre (B.A. M.S. , M.D. Pediatrics)',
    'Dr. Shri Shirishji Nemgonda Patil, Kolhapur B.A.M.S.',
    'Dr. Shri Sujayji Prakash Wadkar, Ashta B.A.M.S.',
    'Dr. Shri Dipakji Gajanan Kadage, Ichalkaranji. B.A.M.S.',
    'Dr. Mrs. Savita Bharat Sidnale, Dattwad, B.A.M.S. PGDND',
    'Dr. Mrs. Jyotsna Chandrakant Samaj, Mudhaol B.A.M.S.',
  ],
  [
    'Dr. Shri. Baburavji Aadappa Shikhare, Jaysingpur B.A.M.S.',
    'Dr. Mrs. Jaykantaji Parisa Badbade, Ichalkaranji. M.D. (Ped.)',
    'Dr. Shri. Vijay N. Patil, Jaysingpur (M.D. Homeopathic)',
    'Dr. Shri. Padmeshji Shrikant Patil, (Motake) Jaysingpur. M.B.B.S., DDV.',
    'Dr. Vinayji Bhimrao Rajmane, Islampur B.A.M.S.',
    'Dr. Shri. Pramodji Ashok Choudhari, Sangli B.H.M.S.',
    'Dr. Shri. Sureshji Nemgonda Patil, Jaysingpur M.B.B.S., B.A.M.S',
    'Dr. Shri. Digambarji Sukumar Nandre, Kothali, B.H.M.S.',
    'Dr. Shri. Vinodji Neminath Aurwade, Alas, M.D.S.',
    'Dr. Smt. Aasha Shital Chougule, Sangli D.Pharma.',
  ],
  [
    'Dr. Sudhirji Purandar Choudhari, Nandre M.B.B.S',
    'Dr. Kavita Arun Lalwani, Ichalkaranji Alternate Therapist',
    'Shri. Pradipji Rajaram Upadhye, Rui',
    'Shri. Santoshji Jangonda Patil, Ichalkaranji.',
    'Shri. Vijaykumarji Jingonda Patil, Nimshirrgaon',
  ],
];

type EventItem = { date: string; month: string; title: string; text: string; image: string; imageSrc: string };

const events: EventItem[] = [
  { date: '15', month: 'July 2026', title: 'सुवर्णप्राशन संस्कार विधी', text: '', image: 'photo-event-one', imageSrc: '/hospital%20gallary/Events/743925687_17962515558132524_8371479680812625707_n.webp' },
  { date: '', month: '', title: 'आधुनिक वैद्यकिय विभाग', text: '', image: 'photo-event-two', imageSrc: '/hospital%20gallary/Events/813421160_18094818881310699_5249409034840261016_n.webp' },
  { date: '', month: '', title: 'आयुर्वेदिक विभाग', text: '', image: 'photo-event-three', imageSrc: '/hospital%20gallary/Events/SaveClip.App_814085547_18094819085310699_477251517517902695_n.jpg' },
];

const homeEvents: EventItem[] = [
  ...events,
  { date: '', month: '', title: 'Slide Preview 1', text: '', image: 'photo-event-one', imageSrc: events[0].imageSrc },
  { date: '', month: '', title: 'Slide Preview 2', text: '', image: 'photo-event-two', imageSrc: events[1].imageSrc },
];

const feedbackVideoFolder = '/hospital%20gallary/Feedback%20videos/';
const patientFeedbackVideos = [
  'feedback1.mp4',
  'feedback2.mp4',
  'feedback3.mp4',
  'संतशिरोमणी प.पू.१०८आचार्यश्री विद्यासागर महाराज जी इनके आशीर्वाद से आचार्यश्री का एक प्रकल्प दक्.mp4',
  'प. पू. १०८आचार्यश्री चंद्रप्रभसागर महाराज जी यांच्या पावन आशिर्वाद आणि मंगल प्रेरणेने सुरू असलेल.mp4',
  'प. पू. १०८आचार्यश्री चंद्रप्रभसागर महाराज जी यांच्या पावन आशिर्वाद आणि मंगल प्रेरणेने सुरू असलेल (1).mp4',
  'प. पू. १०८आचार्यश्री चंद्रप्रभसागर महाराज जी यांच्या पावन आशिर्वाद आणि मंगल प्रेरणेने सुरू असलेल (2).mp4',
  'प. पू. १०८आचार्यश्री चंद्रप्रभसागर महाराज जी यांच्या पावन आशिर्वाद आणि मंगल प्रेरणेने सुरू असलेल (4).mp4',
  'प. पू. १०८आचार्यश्री चंद्रप्रभसागर महाराज जी यांच्या पावन आशिर्वाद आणि मंगल प्रेरणेने सुरू असलेल (5).mp4',
].map((filename) => ({
  src: `${feedbackVideoFolder}${encodeURIComponent(filename)}`,
}));

const patientFeedbackTranslations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'Patient Voices': 'रोगियों की आवाज़',
    'Stories of Healing & Hope': 'स्वास्थ्य लाभ और आशा की कहानियाँ',
    'Real experiences from patients whose lives have been touched by our care.': 'हमारी देखभाल से लाभान्वित हुए मरीजों के वास्तविक अनुभव।',
    'Patient feedback videos': 'रोगियों की प्रतिक्रिया के वीडियो',
    'Patient feedback video': 'रोगी प्रतिक्रिया वीडियो',
    'Play patient feedback video': 'रोगी प्रतिक्रिया वीडियो चलाएँ',
    'Previous feedback video': 'पिछला प्रतिक्रिया वीडियो',
    'Next feedback video': 'अगला प्रतिक्रिया वीडियो',
    'Show feedback video': 'प्रतिक्रिया वीडियो दिखाएँ',
    Feedback: 'प्रतिक्रिया',
    'Watch a patient feedback video shared with our trust.': 'हमारे ट्रस्ट के साथ साझा किया गया रोगी प्रतिक्रिया वीडियो देखें।',
    'Patient Feedback': 'रोगी प्रतिक्रिया',
    'Video could not start. Use the video controls to try again.': 'वीडियो शुरू नहीं हो सका। फिर से प्रयास करने के लिए वीडियो नियंत्रणों का उपयोग करें।',
  },
  MR: {
    'Patient Voices': 'रुग्णांचे अनुभव',
    'Stories of Healing & Hope': 'आरोग्य आणि आशेच्या कहाण्या',
    'Real experiences from patients whose lives have been touched by our care.': 'आमच्या सेवेमुळे लाभलेल्या रुग्णांचे खरे अनुभव.',
    'Patient feedback videos': 'रुग्णांच्या अभिप्रायाचे व्हिडिओ',
    'Patient feedback video': 'रुग्ण अभिप्राय व्हिडिओ',
    'Play patient feedback video': 'रुग्ण अभिप्राय व्हिडिओ प्ले करा',
    'Previous feedback video': 'मागील अभिप्राय व्हिडिओ',
    'Next feedback video': 'पुढील अभिप्राय व्हिडिओ',
    'Show feedback video': 'अभिप्राय व्हिडिओ दाखवा',
    Feedback: 'अभिप्राय',
    'Watch a patient feedback video shared with our trust.': 'आमच्या ट्रस्टसोबत शेअर केलेला रुग्ण अभिप्राय व्हिडिओ पहा.',
    'Patient Feedback': 'रुग्ण अभिप्राय',
    'Video could not start. Use the video controls to try again.': 'व्हिडिओ सुरू होऊ शकला नाही. पुन्हा प्रयत्न करण्यासाठी व्हिडिओ नियंत्रणे वापरा.',
  },
  KN: {
    'Patient Voices': 'ರೋಗಿಗಳ ಅನುಭವಗಳು',
    'Stories of Healing & Hope': 'ಗುಣಮುಖತೆ ಮತ್ತು ಭರವಸೆಯ ಕಥೆಗಳು',
    'Real experiences from patients whose lives have been touched by our care.': 'ನಮ್ಮ ಆರೈಕೆಯಿಂದ ಪ್ರಯೋಜನ ಪಡೆದ ರೋಗಿಗಳ ನೈಜ ಅನುಭವಗಳು.',
    'Patient feedback videos': 'ರೋಗಿಗಳ ಪ್ರತಿಕ್ರಿಯೆಯ ವೀಡಿಯೊಗಳು',
    'Patient feedback video': 'ರೋಗಿಗಳ ಪ್ರತಿಕ್ರಿಯೆ ವೀಡಿಯೊ',
    'Play patient feedback video': 'ರೋಗಿಗಳ ಪ್ರತಿಕ್ರಿಯೆ ವೀಡಿಯೊ ಪ್ಲೇ ಮಾಡಿ',
    'Previous feedback video': 'ಹಿಂದಿನ ಪ್ರತಿಕ್ರಿಯೆ ವೀಡಿಯೊ',
    'Next feedback video': 'ಮುಂದಿನ ಪ್ರತಿಕ್ರಿಯೆ ವೀಡಿಯೊ',
    'Show feedback video': 'ಪ್ರತಿಕ್ರಿಯೆ ವೀಡಿಯೊ ತೋರಿಸಿ',
    Feedback: 'ಪ್ರತಿಕ್ರಿಯೆ',
    'Watch a patient feedback video shared with our trust.': 'ನಮ್ಮ ಟ್ರಸ್ಟ್‌ನೊಂದಿಗೆ ಹಂಚಿಕೊಂಡ ರೋಗಿಯ ಪ್ರತಿಕ್ರಿಯೆ ವೀಡಿಯೊ ನೋಡಿ.',
    'Patient Feedback': 'ರೋಗಿಗಳ ಪ್ರತಿಕ್ರಿಯೆ',
    'Video could not start. Use the video controls to try again.': 'ವೀಡಿಯೊ ಪ್ರಾರಂಭವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಲು ವೀಡಿಯೊ ನಿಯಂತ್ರಣಗಳನ್ನು ಬಳಸಿ.',
  },
};

function HomeEventCard({ event }: { event: EventItem }) {
  return <article className={`home-event-card${event.date ? ' has-date' : ''}`}>
    <div className="home-event-art"><img className="home-event-photo" src={event.imageSrc} alt={event.title} /></div>
    <div className="home-event-details">
      {event.date && event.month && <div className="home-event-date"><strong>{event.date}</strong><small>{event.month}</small></div>}
      <div className="home-event-copy"><h3>{event.title}</h3>{event.text && <p>{event.text}</p>}</div>
      <ChevronRight className="home-event-arrow" size={18} />
    </div>
  </article>;
}

function HomeEventCarousel({ language }: { language: Language }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.home-event-card');
    if (!card) return;
    const gap = Number.parseFloat(getComputedStyle(marqueeRef.current ?? track).columnGap) || 0;
    const animation = marqueeRef.current?.getAnimations()[0];
    const duration = animation?.effect?.getTiming().duration;

    if (animation && typeof duration === 'number' && duration > 0) {
      const currentTime = typeof animation.currentTime === 'number' ? animation.currentTime : 0;
      animation.currentTime = currentTime + direction * duration / homeEvents.length;
      return;
    }

    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return <>
    <div className="home-event-carousel" role="region" aria-label={tx('News & Events', language)}>
      <div className="home-event-controls">
        <button type="button" onClick={() => scrollTrack(-1)} aria-label={tx('Previous events', language)}><ChevronLeft size={18} /></button>
        <button type="button" onClick={() => scrollTrack(1)} aria-label={tx('Next events', language)}><ChevronRight size={18} /></button>
      </div>
      <div className="home-event-grid" ref={trackRef} aria-roledescription="carousel">
        <div className="home-event-track" ref={marqueeRef}>
          {[...homeEvents, ...homeEvents].map((event, index) => <HomeEventCard event={{ ...event, title: tx(event.title, language), month: tx(event.month, language), text: tx(event.text, language) }} key={`${event.title}-${index}`} />)}
        </div>
      </div>
    </div>
  </>;
}

function PatientFeedbackCarousel({ language }: { language: Language }) {
  const [selectedVideo, setSelectedVideo] = useState<GalleryMedia | null>(null);
  const videoCards = [...patientFeedbackVideos, ...patientFeedbackVideos];

  return <section className="patient-feedback-section" aria-labelledby="patient-feedback-title">
    <div className="container">
      <div className="patient-feedback-heading">
        <span className="eyebrow"><HeartPulse size={13} />{tx('Patient Voices', language)}</span>
        <h2 id="patient-feedback-title">{tx('Stories of Healing & Hope', language)}</h2>
        <p>{tx('Real experiences from patients whose lives have been touched by our care.', language)}</p>
      </div>
      <div className="patient-feedback-viewport" role="region" aria-label={tx('Patient feedback videos', language)}>
        <div className="patient-feedback-track">
          {videoCards.map((video, index) => {
            const isDuplicate = index >= patientFeedbackVideos.length;
            const videoIndex = index % patientFeedbackVideos.length;
            return <article className="patient-feedback-card" key={`${video.src}-${index}`} aria-hidden={isDuplicate}>
            <div className="patient-feedback-media">
              <VideoPreview className="patient-feedback-thumbnail" src={video.src} />
              <button
                type="button"
                className="patient-feedback-play"
                aria-label={`${tx('Play patient feedback video', language)} ${videoIndex + 1}`}
                tabIndex={isDuplicate ? -1 : 0}
                onClick={() => setSelectedVideo({
                  title: `${tx('Patient Feedback', language)} ${videoIndex + 1}`,
                  subtitle: '',
                  kind: 'Videos',
                  position: '',
                  badge: 'Video',
                  videoSrc: video.src,
                })}
              ><Play size={20} fill="currentColor" /></button>
              <span className="patient-feedback-badge"><Video size={13} />{tx('Feedback', language)}</span>
            </div>
            </article>;
          })}
        </div>
      </div>
    </div>
    {selectedVideo && <MediaModal item={selectedVideo} onClose={() => setSelectedVideo(null)} language={language} />}
  </section>;
}

function Photo({ className = '', position = '', onClick }: { className?: string; position?: string; onClick?: () => void }) {
  return <div className={`reference-photo ${position} ${className}`} aria-label={onClick ? 'Open gallery' : 'Temporary reference image'} onClick={onClick} onKeyDown={onClick ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick(); } } : undefined} role={onClick ? 'link' : undefined} tabIndex={onClick ? 0 : undefined} />;
}

function VideoPreview({ src, className = '' }: { src: string; className?: string }) {
  return <video className={`video-preview ${className}`} src={src} muted playsInline preload="metadata" onLoadedMetadata={(event) => { const video = event.currentTarget; if (video.duration > 0) video.currentTime = Math.min(0.1, video.duration / 2); }} aria-hidden="true" />;
}

function GalleryPhoto({ item, className = '', onClick }: { item: GalleryMedia; className?: string; onClick?: () => void }) {
  return <img className={`gallery-photo ${className}`} src={item.imageSrc} alt={item.title} title={item.title} onClick={onClick} onKeyDown={onClick ? (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick(); } } : undefined} role={onClick ? 'link' : undefined} tabIndex={onClick ? 0 : undefined} />;
}

function CountUp({ value }: { value: number }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let animationFrame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCount(value);
        return;
      }

      const startTime = performance.now();
      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / 900, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return <span ref={counterRef} aria-hidden="true">{count}</span>;
}

function HospitalsPage({ onHospital, language }: { onHospital: (index: number) => void; language: Language }) {
  const [selectedEvent, setSelectedEvent] = useState<GalleryMedia | null>(null);
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscriptionPrepared, setSubscriptionPrepared] = useState(false);
  const subscriptionMailto = `mailto:info@vidyasagartrust.org?subject=${encodeURIComponent('Newsletter subscription request')}&body=${encodeURIComponent(`Please subscribe ${subscriptionEmail} to the Vidyasagar Ayurvedic Chikitsalaya Trust newsletter.`)}`;
  const showEvent = (event: EventItem) => setSelectedEvent({
    title: event.title,
    subtitle: event.text || event.month,
    kind: 'Event',
    position: event.image,
    badge: 'Event',
    imageSrc: event.imageSrc,
  });

  return <section className="hospitals-page reference-hospitals-page">
    <div className="hospitals-reference-hero">
      <div className="container hospitals-reference-hero-inner">
        <div className="hospitals-reference-copy">
          <span className="eyebrow">{tx('Our Hospital Initiative', language)}</span>
          <h1>{tx('Three Sections.', language)}<br /><em>{tx('One Integrated Care.', language)}</em></h1>
          <p>{tx('Traditional wisdom, modern medicine and advanced diagnostics coming together for a healthier society.', language)}</p>
        </div>
      </div>
    </div>
    <div className="container hospitals-reference-content">
      <div className="reference-section-heading">
        <span className="eyebrow">{tx('Our Hospitals', language)}</span>
        <h2>{tx('Vidyasagar Maharaj’s', language)} <em>{tx('Vision in Action', language)}</em></h2>
        <p>{tx('An integrated healthcare initiative with three complementary sections to provide complete and compassionate care.', language)}</p>
      </div>
      <div className="reference-hospital-grid">
        {hospitals.map((hospital, index) => (
          <article className={`reference-hospital-card ${hospital.color}`} key={hospital.name}>
            <Photo className="reference-hospital-photo" position={`photo-card-${index + 1}`} />
            <div className="reference-hospital-body">
              <div className="reference-hospital-icon"><hospital.icon size={25} /></div>
              <h3>{tx(hospital.name, language)}</h3>
              <p className="reference-hospital-type">{tx(hospital.type, language)}</p>
              <p className="reference-hospital-description">{hospital.description[language]}</p>
              <div className="reference-subheading">
                <strong>{tx('Key Services', language)}</strong>
                <button onClick={() => onHospital(index)}>{tx('View All', language)} <ArrowRight size={11} /></button>
              </div>
              <ul className="reference-services">
                {hospital.features.map((feature) => <li key={feature}>{tx(feature, language)}</li>)}
              </ul>
              <div className="reference-subheading practitioner-heading">
                <strong>{tx('Our Practitioners', language)}</strong>
                <button onClick={() => onHospital(index)}>{tx('View All', language)} <ArrowRight size={11} /></button>
              </div>
              <div className="practitioner-row">
                {practitionersByHospital[index].map((person) => (
                  <div className="practitioner" key={person.name}>
                    <img className="practitioner-photo" src={person.image} alt={person.name} loading="lazy" />
                    <strong>{person.name}</strong>
                    <div className="practitioner-actions">
                      {person.email && (
                        <a href={`mailto:${person.email}`} aria-label={`Email ${person.name}`} title="Send email">
                          <Mail size={15} />
                        </a>
                      )}
                      <a href={person.resume} download aria-label={`Download ${person.name}'s resume`} title="Download resume">
                        <Download size={15} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <button className="appointment-button" onClick={() => onHospital(index)}>
                <Mail size={14} />{tx('Book Appointment', language)} ({tx(index === 0 ? 'Ayurveda' : index === 1 ? 'Allopathic' : 'Nidaan Kendra', language)})
              </button>
              <small className="appointment-note">{tx('You will be redirected to email with selected doctor details.', language)}</small>
            </div>
          </article>
        ))}
      </div>
      <div className="reference-stats">
        <span aria-label={`3 ${tx('Integrated Sections', language)}`}><Hospital /><b><CountUp value={3} /><small>{tx('Integrated Sections', language)}</small></b></span>
        <span><Leaf /><b>{tx('Complete', language)}<small>{tx('Healthcare Ecosystem', language)}</small></b></span>
        <span><UsersRound /><b>{tx('Community', language)}<small>{tx('Focused', language)}</small></b></span>
        <span><HeartPulse /><b>{tx('Preventive', language)}<small>{tx('Approach', language)}</small></b></span>
        <span><Building2 /><b>{tx('Modern', language)}<small>{tx('Infrastructure', language)}</small></b></span>
        <span><Sprout /><b>{tx('Guided by', language)}<small>{tx('Jain Values', language)}</small></b></span>
      </div>
      <PatientFeedbackCarousel language={language} />
      <div className="reference-news-grid">
        <div className="reference-news">
          <div className="reference-news-heading">
            <div>
              <h2><CalendarDays size={20} />{tx('Latest News & Events', language)}</h2>
              <p>{tx('Stay updated with our health camps, awareness programs and upcoming events.', language)}</p>
            </div>
            <a className="small-button" href="#gallery-events">{tx('View All', language)} <ArrowRight size={13} /></a>
          </div>
          <div className="reference-event-grid">
            {events.map((event) => (
              <article
                className="reference-event-card"
                key={event.title}
                role="button"
                tabIndex={0}
                aria-label={`${tx('Open', language)} ${tx(event.title, language)}`}
                onClick={() => showEvent(event)}
                onKeyDown={(keyboardEvent) => {
                  if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                    keyboardEvent.preventDefault();
                    showEvent(event);
                  }
                }}
              >
                <div className="reference-event-media">
                  <img src={event.imageSrc} alt={tx(event.title, language)} loading="lazy" />
                  {event.date && event.month && (
                    <div className="reference-event-date">
                      <strong>{event.date}</strong>
                      <small>{tx(event.month, language)}</small>
                    </div>
                  )}
                </div>
                <div className="reference-event-copy">
                  <h3>{tx(event.title, language)}</h3>
                  {event.text && <p>{tx(event.text, language)}</p>}
                  <ChevronRight size={18} className="reference-event-arrow" />
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="newsletter-card">
          <div className="newsletter-icon"><Mail size={23} /></div>
          <h2>{tx('Subscribe to Our Newsletter', language)}</h2>
          <p>{tx('Get the latest updates on our hospitals, events and community initiatives.', language)}</p>
          <form onSubmit={(submitEvent) => {
            submitEvent.preventDefault();
            window.location.href = subscriptionMailto;
            setSubscriptionPrepared(true);
          }}>
            <input
              placeholder={tx('Enter your email address', language)}
              type="email"
              required
              value={subscriptionEmail}
              onChange={(inputEvent) => {
                setSubscriptionEmail(inputEvent.target.value);
                setSubscriptionPrepared(false);
              }}
            />
            <button className="appointment-button" type="submit">{tx('Subscribe', language)} <ArrowRight size={14} /></button>
          </form>
          {subscriptionPrepared && (
            <p className="newsletter-status" role="status">
              {tx('Your email app should open with a subscription request. Send the email to complete signup.', language)}{' '}
              <a href={subscriptionMailto}>{tx('Open the email request', language)}</a>
            </p>
          )}
        </aside>
      </div>
    </div>
    {selectedEvent && <MediaModal item={selectedEvent} onClose={() => setSelectedEvent(null)} language={language} />}
  </section>;
}

function AboutPage({ onBack, onHospital, onDonate, language }: { onBack: () => void; onHospital: (index: number) => void; onDonate: (project: { name: string; amount: string; cost: string }) => void; language: Language }) {
  const inspirations = [
    { name: 'Saint Shiromani Param Pooja 108 Acharya Shri Vidyasagar Maharaj', description: 'His teachings of compassion, humility and service to humanity are at the heart of our mission. Inspired by his example, we work to make authentic, holistic healthcare more accessible and to treat every person with dignity, understanding and care. His vision encourages us to serve not only individual patients, but the well-being of the wider community. We carry these values into every interaction, with a commitment to listen, support and care for people at every stage of life.', image: '/hospital%20gallary/mahraja%20ji/Vidyasagar%20Maharaj.png' },
    { name: 'Acharya Ratna Param Pooja 108 Bahubali Maharaj', description: 'A symbol of strength, self-discipline and concern for the welfare of all. These values inspire us to offer thoughtful, compassionate care and encourage healthier lives. His example reminds us that a strong healthcare community is built through dedication, responsibility and respect for every individual. By bringing traditional wisdom together with attentive care, we aim to support lasting well-being for patients and families.', image: '/hospital%20gallary/mahraja%20ji/Bahubali%20Maharaj.png' },
    { name: 'Shant-Murti Param Pooja 108 Acharyashree Sanmati Sagarji Maharaj', description: 'His vision of knowledge, diagnosis and awareness inspires the work of our Nidaan Kendra. We carry this forward by encouraging early detection, preventive healthcare and informed choices. Through accessible diagnostic services and health awareness, we aim to help individuals and families take confident steps towards their well-being. We believe that clear information and timely guidance can help build a healthier, more confident community.', image: '/hospital%20gallary/mahraja%20ji/Sanmati%20Sagarji.png' },
  ];
  const valueTags = ['Seva', 'Compassion', 'Integrity', 'Community', 'Sustainability', 'Sanskar'];
  const projects = [
    { name: 'Sri 1008 Bhagavana Candraprabha Digambara Jaina Mandira', amount: '2100000', cost: '₹21 lakh', imageSrc: specifiedBhavanPhotos[1].imageSrc },
    { name: 'Munishree Akshayasaagarajee Mahaaraaj Tyaagee Bhavan', amount: '1100000', cost: '₹11 lakh', note: '3 rooms', imageSrc: specifiedBhavanPhotos[4].imageSrc },
    { name: 'Vineet - Chandraprabh Tyaagee Panchakarm Kaksh', amount: '700000', cost: '₹7 lakh', imageSrc: specifiedBhavanPhotos[6].imageSrc },
    { name: 'Mallee - Samayamatee Aahaarabhavan', amount: '1100000', cost: '₹11 lakh', note: 'Room 2', imageSrc: specifiedBhavanPhotos[0].imageSrc },
    { name: 'Swastishree Jinsenji Bhattaraka Mahaswamiji Bhojanalaya', amount: '2500000', cost: '₹25 lakh', imageSrc: specifiedBhavanPhotos[2].imageSrc },
    { name: 'Jinwani Ambulance', amount: '500000', cost: '₹5 lakh', imageSrc: specifiedBhavanPhotos[3].imageSrc },
    { name: 'Acharya Pushpadantsagarji Maharaj Vaidya Niwas (Opened 1BHK - Number 4)', amount: '2500000', cost: '₹25 lakh', imageSrc: specifiedBhavanPhotos[5].imageSrc },
  ];
  return <section className="about-page"><div className="about-hero"><div className="container about-hero-inner"><div className="about-hero-copy"><span className="eyebrow">{tx('About Our Trust', language)}</span><h1>{tx('Rooted in Values,', language)}<br /><em>{tx('Dedicated to a Healthier Society', language)}</em></h1><p>{tx('Vidyasagar Ayurvedic Chikitsalaya Trust is an initiative inspired by the teachings of Acharyashree Vidyasagar Maharaj, with a mission to provide accessible, authentic and holistic healthcare for every individual, guided by the principles of Seva, Swasthya and Sanskar.', language)}</p><div className="about-pill-row"><span><Leaf size={18} /><b>{tx('Seva', language)}</b><small>{tx('Service to Society', language)}</small></span><span><HeartPulse size={18} /><b>{tx('Swasthya', language)}</b><small>{tx('Health for All', language)}</small></span><span><UsersRound size={18} /><b>{tx('Sanskar', language)}</b><small>{tx('Values for a Better Tomorrow', language)}</small></span></div></div><Photo className="about-hero-photo" position="photo-purpose" /><div className="about-quote"><Quote size={31} fill="currentColor" /><p>{tx('True healthcare is not just the absence of disease, but the harmony of body, mind and soul.', language)}</p><strong>— {tx('Acharyashree', language)}<br />{tx('Vidyasagar Maharaj', language)}</strong></div></div></div><div className="container about-content"><div className="about-section-heading"><h2>{tx('Our Inspiration', language)}</h2><p>{tx('The divine guidance of our revered Acharyas', language)}</p></div><div className="inspiration-grid">{inspirations.map((inspiration) => <article className="inspiration-card" key={inspiration.name}><img src={inspiration.image} alt={tx(inspiration.name, language)} loading="lazy" /><div><h3>{tx(inspiration.name, language)}</h3><p>{tx(inspiration.description, language)}</p></div></article>)}</div><div className="about-section-heading mission-heading"><h2>{tx('Our Mission, Vision and Values', language)}</h2></div><div className="values-grid"><article className="value-card mission-card"><Target size={28} /><h3>{tx('Our Mission', language)}</h3><p>{tx('To provide accessible, affordable and authentic healthcare inspired by the teachings of our Acharyas, promoting holistic well-being and service to society.', language)}</p></article><article className="value-card vision-card"><Eye size={28} /><h3>{tx('Our Vision', language)}</h3><p>{tx('A healthier society with integrated Ayurveda, modern medicine and advanced diagnostics, ensuring quality care for every individual.', language)}</p></article><article className="value-card"><Leaf size={28} /><h3>{tx('Our Core Values', language)}</h3><div className="value-tags">{valueTags.map((tag) => <span key={tag}>{tx(tag, language)}</span>)}</div></article><article className="values-feature"><Photo position="photo-purpose" /><div><h3>{tx('Inspired by Timeless Values', language)}</h3><p>{tx('Building a healthier tomorrow through service, knowledge and care.', language)}</p><button className="small-button" onClick={onBack}>{tx('Know More About Us', language)} <ArrowRight size={13} /></button></div></article></div><div className="about-section-heading hospitals-heading"><h2>{tx('Our Hospitals', language)}</h2><p>{tx('Three complementary sections, one unified healthcare initiative', language)}</p></div><div className="about-hospital-grid">{hospitals.map((hospital, index) => <article className="about-hospital-card" key={hospital.name}><Photo position={`photo-card-${index + 1}`} /><div className="about-hospital-copy"><div className={`about-hospital-icon ${hospital.color}`}><hospital.icon size={22} /></div><h3>{tx(hospital.name, language)}</h3><p>{tx(hospital.type, language)}</p><button className="small-button" onClick={() => onHospital(index)}>{tx('View Details', language)} <ArrowRight size={13} /></button></div></article>)}</div><div className="about-section-heading board-heading"><h2>{tx('Hospital Advisory Board', language)}</h2><p>{tx('Guided by experienced professionals and well-wishers, our advisory board supports our mission.', language)}</p></div><div className="advisory-board-grid">{advisoryBoardMembers.map((members, hospitalIndex) => <section className="advisory-board-group" key={hospitals[hospitalIndex].name}><h3>{tx(hospitals[hospitalIndex].name, language)}</h3><table><thead><tr><th scope="col">{tx('S.No', language)}</th><th scope="col">{tx('Name', language)}</th></tr></thead><tbody>{members.map((member, memberIndex) => <tr key={member}><td>{memberIndex + 1}</td><td>{tx(member, language)}</td></tr>)}</tbody></table></section>)}</div><div className="about-section-heading community-heading"><h2>{tx('Our Community Initiatives', language)}</h2><p>{tx('Working together for a healthier and more compassionate society.', language)}</p></div><div className="community-grid"><img className="community-banner" src="/hospital%20gallary/community%20banner.png" alt={tx('Community health initiatives', language)} /></div><div className="projects-heading"><div><h2><Building2 size={20} /> {tx('Specified Bhavan', language)} <span>{tx('(Construction / Development)', language)}</span></h2><p>{tx('Choose a project to support; the listed amount is its estimated project cost.', language)}</p></div><a className="text-link" href="https://www.vidyasanmatidas.org.in/Hospitals.html" target="_blank" rel="noreferrer">{tx('View All Projects', language)} <ArrowRight size={14} /></a></div>  <div className="projects-grid">{projects.map((project) => <article className="project-card" key={project.name}><img className="project-image" src={project.imageSrc} alt={tx(project.name, language)} loading="lazy" /><div className="project-copy"><h3>{tx(project.name, language)}</h3><p className="project-cost">{tx('Project cost:', language)} {project.cost}{project.note ? ` (${tx(project.note, language)})` : ''}</p><button className="project-button" onClick={() => onDonate(project)}>{tx('Contribute', language)} <ArrowRight size={13} /></button></div></article>)}</div></div></section>;
}

function HospitalPage({ hospital, onBack, language }: { hospital: typeof hospitals[number]; onBack: () => void; language: Language }) {
  return <section className="detail-page hospital-detail-page"><div className="container"><button className="back-link" onClick={onBack}><ArrowRight size={16} /> {tx('Back', language)}</button><div className="detail-heading"><span className="eyebrow">{tx('Our Hospital Initiative', language)}</span><h1>{tx(hospital.name, language)}</h1><p>{tx(hospital.type, language)}. {tx('Explore the services and care pathway planned for our community.', language)}</p></div><div className="hospital-detail-layout"><Photo position="photo-card-1" /><div><h2>{tx('Care with purpose', language)}</h2><p>{tx('Our integrated healthcare approach brings compassionate service, trusted guidance and accessible care together under one roof.', language)}</p><ul>{hospital.features.map((feature) => <li key={feature}><CheckCircle2 size={15} /> {tx(feature, language)}</li>)}</ul><button className="button button-green" onClick={onBack}>{tx('Return to hospitals', language)}</button></div></div></div></section>;
}

function ContactPage({ onDonate, language }: { onDonate: () => void; language: Language }) {
  const [sent, setSent] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [activeHospital, setActiveHospital] = useState(0);
  const hospitalSliderRef = useRef<HTMLDivElement>(null);
  const questions = ['What are the visiting hours?', 'How can I book an appointment?', 'Can I support the trust through donations?', 'Where is the hospital located?'];
  const hospitalAddress = 'Beside My School, opposite Chaudeshwari Cotton Mill, Kolhapur-Jaysingpur Road, Chipri, Tal. Shirol, Dist. Kolhapur.';
  const hospitalMapUrl = 'https://maps.app.goo.gl/9gK2kucJNrDHA6aA8';
  const mapQuery = encodeURIComponent(`${hospitalAddress} Vidyasagar Ayurvedic Chikitsalaya Trust`);
  const mapSearchUrl = hospitalMapUrl;
  const directionsUrl = hospitalMapUrl;
  const nearbyUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('hospitals near Vidyasagar Ayurvedic Chikitsalaya Trust')}`;
  useEffect(() => {
    if (window.location.hash === '#volunteer-form') {
      requestAnimationFrame(() => document.getElementById('volunteer-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
  }, []);
  return <section className="contact-page">
    <div className="contact-hero"><div className="container contact-hero-inner"><div className="contact-hero-copy">
      <span className="eyebrow">{tx('Get In Touch', language)}</span>
      <h1>{tx('We Are Here', language)}<br />{tx('for a Healthier Tomorrow', language)}</h1>
      <p>{tx('For inquiries, support, collaborations, donations or any information about our hospitals and community initiatives, feel free to reach out to us. We are always happy to hear from you.', language)}</p>
    </div></div></div>
    <div className="container contact-content">
      <div className="contact-cards">
        <article><Phone size={22} /><div><h3>{tx('Call Us', language)}</h3><p><a href="tel:+919876543210">{tx('+91 98765 43210', language)}</a></p><small>{tx('Mon – Sat', language)}<br />9:00 AM – 6:00 PM</small></div></article>
        <article><Mail size={22} /><div><h3>{tx('Email Us', language)}</h3><p><a href="mailto:info@vidyasagartrust.org">info@vidyasagartrust.org</a></p><small>{tx('We usually respond', language)}<br />{tx('within 24 hours.', language)}</small></div></article>
        <article><MapPin size={22} /><div><h3>{tx('Visit Us', language)}</h3><p><a href={hospitalMapUrl} target="_blank" rel="noreferrer">{tx(hospitalAddress, language)}</a></p><small>{tx('Open for visitors', language)}</small></div></article>
        <article><HeartHandshake size={22} /><div><h3>{tx('Support Us', language)}</h3><p>{tx('For Donations & CSR', language)}</p><small><a href="mailto:csr@vidyasagartrust.org">csr@vidyasagartrust.org</a></small><button onClick={onDonate}>{tx('Know More', language)} <ArrowRight size={12} /></button></div></article>
      </div>
      <div className="contact-main-grid">
        <div className="map-card">
          <nav className="map-tabs" aria-label={tx('Map actions', language)}>
            <a className="active" href={mapSearchUrl} target="_blank" rel="noreferrer">{tx('Location', language)}</a>
            <a href={directionsUrl} target="_blank" rel="noreferrer">{tx('Directions', language)}</a>
            <a href={nearbyUrl} target="_blank" rel="noreferrer">{tx('Nearby Places', language)}</a>
          </nav>
          <div className="map-surface">
            <iframe title={tx('Vidyasagar Ayurvedic Chikitsalaya Trust location map', language)} src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <div className="message-card" id="volunteer-form"><span className="eyebrow">{tx('Contact us', language)}</span><h2>{tx('Send Us a Message', language)}</h2><p>{tx('Have a question or need more information? Fill out the form below and our team will get back to you.', language)}</p>
          {sent ? <div className="contact-success" role="status" aria-live="polite"><CheckCircle2 size={35} /><h3>{tx('Email draft prepared', language)}</h3><p>{tx('Your email app should open with your message. Send it there to complete your inquiry.', language)}</p><button className="small-button" onClick={() => setSent(false)}>{tx('Back to the form', language)}</button></div> : <form onSubmit={(event) => { event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return; const data = new FormData(form); const subject = String(data.get('subject') ?? 'General enquiry'); const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nContact: ${data.get('phone')}\n\nMessage:\n${data.get('message')}`; window.location.href = `mailto:info@vidyasagartrust.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; setSent(true); }}>
            <label>{tx('Full Name', language)} *<input name="name" required placeholder={tx('Enter your name', language)} /></label>
            <label>{tx('Email Address', language)} *<input name="email" required type="email" placeholder={tx('Enter your email', language)} /></label>
            <label>{tx('Contact Number', language)}<input name="phone" placeholder={tx('Enter your mobile number', language)} /></label>
            <label>{tx('Subject', language)} *<select name="subject" required defaultValue={window.location.hash === '#volunteer-form' ? 'Volunteer' : ''}><option value="" disabled>{tx('Select a subject', language)}</option><option value="General enquiry">{tx('General enquiry', language)}</option><option value="Appointments">{tx('Appointments', language)}</option><option value="Donations">{tx('Donations', language)}</option><option value="Volunteer">{tx('Volunteer', language)}</option></select></label>
            <label className="message-field">{tx('Message', language)} *<textarea name="message" required placeholder={tx('Write your message here...', language)} /></label>
            <label className="consent"><input type="checkbox" required /> {tx('I agree to be contacted by the trust for my inquiry.', language)}</label>
            <button className="button button-green" type="submit"><Send size={14} /> {tx('Send Message', language)}</button>
          </form>}
        </div>
      </div>
      <div className="contact-section-heading"><h2>{tx('Our Hospital Locations', language)}</h2><p>{tx('Visit our integrated healthcare facility. Get directions, view details or navigate directly from your mobile device.', language)}</p></div>
      <div className="contact-hospital-grid" ref={hospitalSliderRef} onScroll={(event) => {
        const slider = event.currentTarget;
        const nextIndex = Math.round(slider.scrollLeft / slider.clientWidth);
        setActiveHospital(Math.min(hospitals.length - 1, Math.max(0, nextIndex)));
      }}>
        {hospitals.map((hospital, index) => <article className="contact-hospital-card" key={hospital.name}>
          <Photo className={`contact-hospital-photo contact-hospital-photo-${index + 1}`} position={`photo-card-${index + 1}`} />
          <div className="contact-hospital-copy">
            <div className={`about-hospital-icon ${hospital.color}`}><hospital.icon size={22} /></div>
            <h3>{tx(hospital.name, language)}</h3>
            <p><MapPin size={15} /> <a href={hospitalMapUrl} target="_blank" rel="noreferrer">{tx(hospitalAddress, language)}</a></p>
            <div>
              <a href={hospitalMapUrl} target="_blank" rel="noreferrer" className="small-button">{tx('View on Map', language)} <ArrowRight size={14} /></a>
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="direction-button"><MapPin size={15} /> {tx('Get Directions', language)}</a>
            </div>
          </div>
        </article>)}
      </div>
      <div className="contact-hospital-slider-controls" aria-label={tx('Hospital locations slider', language)}>
        <button type="button" aria-label={tx('Previous hospital', language)} onClick={() => {
          const nextIndex = Math.max(0, activeHospital - 1);
          setActiveHospital(nextIndex);
          hospitalSliderRef.current?.scrollTo({ left: nextIndex * hospitalSliderRef.current.clientWidth, behavior: 'smooth' });
        }} disabled={activeHospital === 0}><ChevronLeft size={18} /></button>
        {hospitals.map((hospital, index) => <button
          type="button"
          className={activeHospital === index ? 'active' : ''}
          aria-label={`${tx('Show', language)} ${tx(hospital.name, language)}`}
          aria-current={activeHospital === index ? 'true' : undefined}
          key={hospital.name}
          onClick={() => {
            setActiveHospital(index);
            hospitalSliderRef.current?.scrollTo({ left: index * hospitalSliderRef.current.clientWidth, behavior: 'smooth' });
          }}
        />)}
        <button type="button" aria-label={tx('Next hospital', language)} onClick={() => {
          const nextIndex = Math.min(hospitals.length - 1, activeHospital + 1);
          setActiveHospital(nextIndex);
          hospitalSliderRef.current?.scrollTo({ left: nextIndex * hospitalSliderRef.current.clientWidth, behavior: 'smooth' });
        }} disabled={activeHospital === hospitals.length - 1}><ChevronRight size={18} /></button>
      </div>
      <div className="contact-bottom-grid"><div className="faq-card"><h2>{tx('Frequently Asked Questions', language)}</h2>{questions.map((question, index) => <button key={question} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}><span>{tx(question, language)}</span>{openQuestion === index ? <ChevronDown size={15} /> : <Plus size={15} />}{openQuestion === index && <small>{tx('Our team will be happy to guide you with this request. Please contact us for the latest details.', language)}</small>}</button>)}</div>
        <div className="quick-contact-card"><h2>{tx('Quick Contacts', language)}</h2><div><p><Mail size={14} /> {tx('General Enquiries', language)} <span>info@vidyasagartrust.org</span></p><p><Phone size={14} /> {tx('Appointments (Ayurvedic)', language)} <span>ayurveda@vidyasagartrust.org</span></p><p><Phone size={14} /> {tx('Appointments (Allopathic)', language)} <span>allopathy@vidyasagartrust.org</span></p><p><Microscope size={14} /> {tx('Diagnostics (Nidaan Kendra)', language)} <span>cs@vidyasagartrust.org</span></p><p><HeartHandshake size={14} /> {tx('Donations & CSR', language)} <span>media@vidyasagartrust.org</span></p></div></div>
      </div>
    </div>
  </section>;
}

function GalleryPage({ language }: { language: Language }) {
  const [filter, setFilter] = useState<'All' | 'Images' | 'Videos' | 'Events'>(() => window.location.hash === '#gallery-videos' ? 'Videos' : window.location.hash === '#gallery-events' ? 'Events' : 'All');
  const [query, setQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  useEffect(() => {
    const syncFilter = () => setFilter(window.location.hash === '#gallery-videos' ? 'Videos' : window.location.hash === '#gallery-events' ? 'Events' : 'All');
    window.addEventListener('hashchange', syncFilter);
    return () => window.removeEventListener('hashchange', syncFilter);
  }, []);
  const media: GalleryMedia[] = [
    ...galleryVideos,
    ...patientFeedbackVideos.map((video, index) => ({
      title: `Feedback video ${index + 1}`,
      subtitle: '',
      kind: 'Videos',
      position: '',
      badge: 'Video',
      videoSrc: video.src,
    })),
    ...galleryPhotos,
    ...specifiedBhavanPhotos,
    ...events.map((event) => ({ title: event.title, subtitle: event.text ?? '', kind: 'Events', position: event.image, badge: 'Event', imageSrc: event.imageSrc, portrait: true })),
  ];
  const uniqueMedia = [...new Map(media.map((item) => [item.videoSrc ?? item.imageSrc ?? `${item.kind}:${item.title}`, item])).values()];
  const visibleMedia = uniqueMedia.filter((item) => {
    const searchableText = `${item.title} ${item.subtitle} ${tx(item.title, language)} ${tx(item.subtitle, language)}`.toLowerCase();
    return (filter === 'All' || item.kind === filter) && searchableText.includes(query.toLowerCase());
  });
  return <section className="gallery-page"><div className="gallery-page-hero"><div className="gallery-hero-inner"><div><h1>{tx('Moments of', language)} <em>{tx('Our Journey', language)}</em></h1><p>{tx('A glimpse of our hospitals, construction updates, health camps, community initiatives and important events.', language)}</p></div></div></div><div className="container gallery-page-content"><div className="gallery-toolbar"><div className="filter-tabs">{[['All', Grid2X2], ['Images', ImageIcon], ['Videos', Video], ['Events', CalendarDays]].map(([name, Icon]) => <button className={filter === name ? 'active' : ''} key={name as string} onClick={() => { const nextFilter = name as 'All' | 'Images' | 'Videos' | 'Events'; setFilter(nextFilter); window.location.hash = nextFilter === 'Videos' ? 'gallery-videos' : nextFilter === 'Events' ? 'gallery-events' : 'gallery-page'; }}><Icon size={16} /> {tx(name as string, language)}</button>)}</div><div className="gallery-actions"><label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tx('Search gallery...', language)} /></label></div></div><div className="gallery-title-row"><div><h2>{tx('Latest Gallery', language)}</h2><p>{tx('Browse all hospital videos and photos. Hover over a photo to see its filename.', language)}</p></div><button className="sort-button">{tx('Newest First', language)} <ChevronDown size={14} /></button></div><div className="media-grid">{visibleMedia.map((item, index) => { const localizedItem = { ...item, title: tx(item.title, language), subtitle: tx(item.subtitle, language) }; return <article className={`media-card media-${index + 1}${item.imageSrc ? ' media-photo-card' : ''}${item.portrait ? ' media-card-portrait' : ''}`} key={item.videoSrc ?? item.imageSrc ?? item.title} onClick={() => setSelectedMedia(item)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedMedia(item); } }}>{item.videoSrc ? <VideoPreview className="media-thumbnail" src={item.videoSrc} /> : item.imageSrc ? <GalleryPhoto item={localizedItem} className="media-thumbnail" /> : <Photo position={item.position} />}<span className="media-badge">{item.badge === 'Video' ? <Video size={12} /> : <ImageIcon size={12} />} {tx(item.badge, language)}</span>{item.kind === 'Videos' && <button className="media-play" aria-label={`${tx('Play', language)} ${localizedItem.title}`}><Play size={18} fill="currentColor" /></button>}<div className="media-caption"><span>{item.kind === 'Videos' ? <Play size={14} fill="currentColor" /> : <ImageIcon size={14} />}<strong>{localizedItem.title}</strong><small>{localizedItem.subtitle}</small></span></div></article>; })}{visibleMedia.length === 0 && <div className="empty-gallery"><Search size={28} /><h3>{tx('No matching moments', language)}</h3><p>{tx('Try another search or choose a different filter.', language)}</p></div>}</div><div className="gallery-events-heading"><div><h2>{tx('Events & Activities', language)}</h2><p>{tx('Stay updated with our latest events, health camps, awareness programs and community initiatives.', language)}</p></div><button className="text-link" onClick={() => setFilter('Events')}>{tx('View All Events', language)} <ArrowRight size={14} /></button></div><div className="gallery-events-grid activity-slider">{events.map((event) => <article className="gallery-event-card" key={event.title} onClick={() => setSelectedMedia({ title: event.title, subtitle: event.text || event.month, kind: 'Event', position: event.image, badge: 'Event', imageSrc: event.imageSrc, portrait: true })} role="button" tabIndex={0} onKeyDown={(eventKey) => { if (eventKey.key === 'Enter' || eventKey.key === ' ') { eventKey.preventDefault(); setSelectedMedia({ title: event.title, subtitle: event.text || event.month, kind: 'Event', position: event.image, badge: 'Event', imageSrc: event.imageSrc, portrait: true }); } }}><img className="gallery-event-poster" src={event.imageSrc} alt={tx(event.title, language)} loading="lazy" /><div className="gallery-event-date"><strong>{event.date}</strong><small>{tx(event.month, language)}</small></div><div><h3>{tx(event.title, language)}</h3><p>{tx(event.text, language)}</p></div><button className="circle-arrow" aria-label={`${tx('Open', language)} ${tx(event.title, language)}`}><ChevronRight size={16} /></button></article>)}</div></div>{selectedMedia && <MediaModal item={selectedMedia} onClose={() => setSelectedMedia(null)} language={language} />}</section>;
}

function MediaModal({ item, onClose, language }: { item: GalleryMedia; onClose: () => void; language: Language }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <div className="media-modal-backdrop" role="presentation" onClick={onClose}>
      <div className={`media-modal${item.videoSrc ? ' video-only' : ''}`} role="dialog" aria-modal="true" aria-label={tx(item.title, language)} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={tx('Close preview', language)}><X size={18} /></button>
        {item.videoSrc
          ? <video className="media-modal-video" src={item.videoSrc} controls autoPlay playsInline />
          : <>
              {item.imageSrc
                ? <img className="media-modal-photo" src={item.imageSrc} alt={tx(item.title, language)} title={tx(item.title, language)} />
                : <Photo position={item.position} />}
              <div className="media-modal-details">
                <span className="eyebrow">{tx(item.kind, language)}</span>
                <h2>{tx(item.title, language)}</h2>
                <p>{tx(item.subtitle, language)}</p>
              </div>
            </>}
      </div>
    </div>,
    document.body,
  );
}

function DonationModal({ onClose, language, project }: { onClose: () => void; language: Language; project: { name: string; amount: string; cost: string } | null }) {
  const [step, setStep] = useState<'details' | 'qr' | 'success'>('details');
  const [details, setDetails] = useState({ name: '', email: '', amount: '1000', customAmount: '', purpose: project?.name ?? 'Hospital support' });
  const updateDetails = (field: keyof typeof details, value: string) => setDetails((current) => ({ ...current, [field]: value }));
  const donationAmount = details.amount === 'custom' ? details.customAmount : details.amount;
  const downloadReceipt = () => {
    const receipt = `Vidyasagar Ayurvedic Chikitsalaya Trust\nDonation Receipt\n\nReceipt No: VAT-${Date.now()}\nDonor: ${details.name}\nEmail: ${details.email}\nAmount: ₹${donationAmount}\nPurpose: ${details.purpose}\nStatus: Payment received\n\nThank you for supporting our mission.`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([receipt], { type: 'text/plain' }));
    link.download = `donation-receipt-${details.name.replace(/\\s+/g, '-').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><div className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label={tx('Close donation form', language)}><X size={18} /></button>{step === 'success' ? <div className="success-state"><CheckCircle2 size={48} /><h2>{tx('Thank you,', language)} {details.name}</h2><p>{tx('Your donation of ', language)}₹{donationAmount}{tx(' for ', language)}{tx(details.purpose, language).toLowerCase()}{tx(' has been recorded. A confirmation has been prepared for ', language)}{details.email}.</p><button className="button button-green" onClick={downloadReceipt}>{tx('Download Receipt', language)}</button><button className="text-link" onClick={onClose}>{tx('Close', language)}</button></div> : step === 'qr' ? <div className="qr-payment"><span className="eyebrow">{tx('Complete payment', language)}</span><h2 id="donation-title">{tx('Scan to donate', language)} ₹{donationAmount}</h2><p>{tx('Use any UPI app to scan this code. Purpose:', language)} {tx(details.purpose, language)}</p><div className="qr-code">{Array.from({ length: 81 }, (_, index) => <i key={index} style={{ background: (index * 17 + index % 5 * 3) % 7 < 3 ? '#102f3d' : 'transparent' }} />)}</div><strong>UPI ID: vidyasagartrust@upi</strong><button className="donate-large" onClick={() => setStep('success')}><CheckCircle2 size={16} /> {tx('I have completed payment', language)}</button><button className="text-link" onClick={() => setStep('details')}>{tx('Edit details', language)}</button></div> : <><span className="eyebrow">{tx('Support the mission', language)}</span><h2 id="donation-title">{tx('Make a meaningful difference', language)}</h2><p className="modal-intro">{tx('Choose where your contribution should help.', language)}</p><form onSubmit={(event) => { event.preventDefault(); setStep('qr'); }}><label>{tx('Your name', language)}<input required value={details.name} onChange={(event) => updateDetails('name', event.target.value)} placeholder={tx('Enter your name', language)} /></label><label>{tx('Email address', language)}<input required type="email" value={details.email} onChange={(event) => updateDetails('email', event.target.value)} placeholder="you@example.com" /></label><label>{tx('Contribution amount', language)}<select value={details.amount} onChange={(event) => updateDetails('amount', event.target.value)}>{project && <option value={project.amount}>{tx('Full project cost:', language)} {project.cost}</option>}<option value="500">₹500</option><option value="1000">₹1,000</option><option value="2500">₹2,500</option><option value="5000">₹5,000</option><option value="custom">{tx('Custom amount', language)}</option></select></label>{details.amount === 'custom' && <label>{tx('Enter custom amount', language)} (₹)<input required type="number" min="1" step="1" value={details.customAmount} onChange={(event) => updateDetails('customAmount', event.target.value)} placeholder={tx('Enter custom amount', language)} /></label>}<label>{tx('Donate for', language)}<select value={details.purpose} onChange={(event) => updateDetails('purpose', event.target.value)}>{project && <option value={project.name}>{tx(project.name, language)}</option>}<option value="Hospital support">{tx('Hospital support', language)}</option><option value="Events & activities">{tx('Events & activities', language)}</option><option value="Annadan">{tx('Annadan', language)}</option><option value="Ayurvedic Chikitsalaya">{tx('Ayurvedic Chikitsalaya', language)}</option><option value="Allopathic Chikitsalaya">{tx('Allopathic Chikitsalaya', language)}</option><option value="Nidaan Kendra">{tx('Nidaan Kendra', language)}</option></select></label><button className="donate-large" type="submit"><HeartHandshake size={16} /> {tx('Continue to QR payment', language)} <ArrowRight size={15} /></button></form></>}</div></div>;
}

const languageCopy: Record<Language, { home: string; about: string; hospitals: string; gallery: string; contact: string; donate: string }> = {
  EN: { home: 'Home', about: 'About Us', hospitals: 'Hospitals', gallery: 'Gallery', contact: 'Contact', donate: 'Donate Now' },
  HI: { home: 'होम', about: 'हमारे बारे में', hospitals: 'अस्पताल', gallery: 'गैलरी', contact: 'संपर्क', donate: 'दान करें' },
  MR: { home: 'मुख्यपृष्ठ', about: 'आमच्याबद्दल', hospitals: 'रुग्णालये', gallery: 'गॅलरी', contact: 'संपर्क', donate: 'देणगी द्या' },
  KN: { home: 'ಮುಖಪುಟ', about: 'ನಮ್ಮ ಬಗ್ಗೆ', hospitals: 'ಆಸ್ಪತ್ರೆಗಳು', gallery: 'ಗ್ಯಾಲರಿ', contact: 'ಸಂಪರ್ಕ', donate: 'ದೇಣಿಗೆ ನೀಡಿ' },
};

const translations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'Traditional wisdom': 'पारंपरिक ज्ञान', 'Modern approach': 'आधुनिक दृष्टिकोण', 'Compassionate': 'करुणामय', 'Healthcare for a': 'स्वास्थ्य सेवा एक', 'Healthier Society': 'स्वस्थ समाज के लिए', 'Explore Our Hospitals': 'हमारे अस्पताल देखें', 'Support Our Mission': 'हमारे मिशन का समर्थन करें', 'Our Hospital Initiative': 'हमारी अस्पताल पहल', 'View Details': 'विवरण देखें', 'Back': 'वापस', 'Care with purpose': 'उद्देश्यपूर्ण देखभाल', 'Return to hospitals': 'अस्पतालों पर लौटें', 'Get In Touch': 'संपर्क करें', 'Support the mission': 'मिशन का समर्थन करें', 'Three Complementary Sections, One Vision': 'तीन पूरक विभाग, एक दृष्टि', 'Integrating Ayush, modern medicine and advanced diagnostics for complete and compassionate care.': 'आयुष, आधुनिक चिकित्सा और उन्नत जांच को एक साथ लाकर संपूर्ण और संवेदनशील देखभाल।', 'Our Purpose': 'हमारा उद्देश्य', 'Inspired by a Greater Vision': 'एक महान दृष्टि से प्रेरित', 'Know More About Us': 'हमारे बारे में और जानें', 'Gallery & Introduction': 'गैलरी और परिचय', 'A Glimpse of Our Initiative': 'हमारी पहल की एक झलक', 'View Full Gallery': 'पूरी गैलरी देखें', 'Be a Part of Our Mission': 'हमारे मिशन का हिस्सा बनें', 'Donate Now': 'अभी दान करें', 'About Our Trust': 'हमारे ट्रस्ट के बारे में', 'Our Inspiration': 'हमारी प्रेरणा', 'Our Mission, Vision and Values': 'हमारा मिशन, दृष्टि और मूल्य', 'Our Hospitals': 'हमारे अस्पताल', 'Hospital Advisory Board': 'अस्पताल सलाहकार मंडल', 'Our Community Initiatives': 'हमारी सामुदायिक पहल', 'Specified Bhavan': 'निर्धारित भवन', 'Contact us': 'संपर्क करें', 'Send Us a Message': 'हमें संदेश भेजें', 'Our Hospital Locations': 'हमारे अस्पतालों के स्थान', 'Frequently Asked Questions': 'अक्सर पूछे जाने वाले प्रश्न', 'Quick Contacts': 'त्वरित संपर्क', 'Complete payment': 'भुगतान पूरा करें', 'Make a meaningful difference': 'एक सार्थक बदलाव लाएं', 'Quick Links': 'त्वरित लिंक', 'Support Us': 'हमारा समर्थन करें', 'Contact Details': 'संपर्क विवरण'
  },
  MR: {
    'Traditional wisdom': 'पारंपरिक ज्ञान', 'Modern approach': 'आधुनिक दृष्टिकोन', 'Compassionate': 'करुणामय', 'Healthcare for a': 'आरोग्यसेवा एका', 'Healthier Society': 'निरोगी समाजासाठी', 'Explore Our Hospitals': 'आमची रुग्णालये पहा', 'Support Our Mission': 'आमच्या ध्येयाला पाठिंबा द्या', 'Our Hospital Initiative': 'आमचा रुग्णालयीन उपक्रम', 'View Details': 'तपशील पहा', 'Back': 'मागे', 'Care with purpose': 'उद्देशपूर्ण सेवा', 'Return to hospitals': 'रुग्णालयांकडे परत जा', 'Get In Touch': 'संपर्क साधा', 'Support the mission': 'ध्येयाला पाठिंबा द्या', 'Three Complementary Sections, One Vision': 'तीन पूरक विभाग, एक दृष्टी', 'Our Purpose': 'आमचा उद्देश', 'Inspired by a Greater Vision': 'एका महान दृष्टीने प्रेरित', 'Know More About Us': 'आमच्याबद्दल अधिक जाणून घ्या', 'Gallery & Introduction': 'गॅलरी आणि परिचय', 'A Glimpse of Our Initiative': 'आमच्या उपक्रमाची झलक', 'View Full Gallery': 'संपूर्ण गॅलरी पहा', 'Be a Part of Our Mission': 'आमच्या ध्येयाचा भाग व्हा', 'Donate Now': 'आता देणगी द्या', 'About Our Trust': 'आमच्या ट्रस्टबद्दल', 'Our Inspiration': 'आमची प्रेरणा', 'Our Mission, Vision and Values': 'आमचे ध्येय, दृष्टी आणि मूल्ये', 'Our Hospitals': 'आमची रुग्णालये', 'Hospital Advisory Board': 'रुग्णालय सल्लागार मंडळ', 'Our Community Initiatives': 'आमचे सामुदायिक उपक्रम', 'Specified Bhavan': 'निश्चित भवन', 'Contact us': 'संपर्क करा', 'Send Us a Message': 'आम्हाला संदेश पाठवा', 'Our Hospital Locations': 'आमच्या रुग्णालयांचे स्थान', 'Frequently Asked Questions': 'वारंवार विचारले जाणारे प्रश्न', 'Quick Contacts': 'त्वरित संपर्क', 'Complete payment': 'पेमेंट पूर्ण करा', 'Make a meaningful difference': 'अर्थपूर्ण बदल घडवा', 'Quick Links': 'त्वरित दुवे', 'Support Us': 'आम्हाला पाठिंबा द्या', 'Contact Details': 'संपर्क तपशील'
  },
  KN: {
    'Traditional wisdom': 'ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನ', 'Modern approach': 'ಆಧುನಿಕ ವಿಧಾನ', 'Compassionate': 'ಕರುಣಾಮಯ', 'Healthcare for a': 'ಆರೋಗ್ಯ ಸೇವೆ ಒಂದು', 'Healthier Society': 'ಆರೋಗ್ಯಕರ ಸಮಾಜಕ್ಕಾಗಿ', 'Explore Our Hospitals': 'ನಮ್ಮ ಆಸ್ಪತ್ರೆಗಳನ್ನು ನೋಡಿ', 'Support Our Mission': 'ನಮ್ಮ ಧ್ಯೇಯವನ್ನು ಬೆಂಬಲಿಸಿ', 'Our Hospital Initiative': 'ನಮ್ಮ ಆಸ್ಪತ್ರೆ ಯೋಜನೆ', 'View Details': 'ವಿವರಗಳನ್ನು ನೋಡಿ', 'Back': 'ಹಿಂದೆ', 'Care with purpose': 'ಉದ್ದೇಶಪೂರ್ಣ ಆರೈಕೆ', 'Return to hospitals': 'ಆಸ್ಪತ್ರೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ', 'Get In Touch': 'ಸಂಪರ್ಕಿಸಿ', 'Support the mission': 'ಧ್ಯೇಯವನ್ನು ಬೆಂಬಲಿಸಿ', 'Three Complementary Sections, One Vision': 'ಮೂರು ಪೂರಕ ವಿಭಾಗಗಳು, ಒಂದು ದೃಷ್ಟಿ', 'Our Purpose': 'ನಮ್ಮ ಉದ್ದೇಶ', 'Inspired by a Greater Vision': 'ಮಹಾನ್ ದೃಷ್ಟಿಯಿಂದ ಪ್ರೇರಿತ', 'Know More About Us': 'ನಮ್ಮ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ', 'Gallery & Introduction': 'ಗ್ಯಾಲರಿ ಮತ್ತು ಪರಿಚಯ', 'A Glimpse of Our Initiative': 'ನಮ್ಮ ಯೋಜನೆಯ ಒಂದು ನೋಟ', 'View Full Gallery': 'ಸಂಪೂರ್ಣ ಗ್ಯಾಲರಿ ನೋಡಿ', 'Be a Part of Our Mission': 'ನಮ್ಮ ಧ್ಯೇಯದ ಭಾಗವಾಗಿರಿ', 'Donate Now': 'ಈಗ ದಾನ ಮಾಡಿ', 'About Our Trust': 'ನಮ್ಮ ಟ್ರಸ್ಟ್ ಬಗ್ಗೆ', 'Our Inspiration': 'ನಮ್ಮ ಪ್ರೇರಣೆ', 'Our Mission, Vision and Values': 'ನಮ್ಮ ಧ್ಯೇಯ, ದೃಷ್ಟಿ ಮತ್ತು ಮೌಲ್ಯಗಳು', 'Our Hospitals': 'ನಮ್ಮ ಆಸ್ಪತ್ರೆಗಳು', 'Hospital Advisory Board': 'ಆಸ್ಪತ್ರೆ ಸಲಹಾ ಮಂಡಳಿ', 'Our Community Initiatives': 'ನಮ್ಮ ಸಮುದಾಯ ಯೋಜನೆಗಳು', 'Specified Bhavan': 'ನಿರ್ದಿಷ್ಟ ಭವನ', 'Contact us': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ', 'Send Us a Message': 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ', 'Our Hospital Locations': 'ನಮ್ಮ ಆಸ್ಪತ್ರೆಗಳ ಸ್ಥಳಗಳು', 'Frequently Asked Questions': 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು', 'Quick Contacts': 'ತ್ವರಿತ ಸಂಪರ್ಕ', 'Complete payment': 'ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಿ', 'Make a meaningful difference': 'ಅರ್ಥಪೂರ್ಣ ಬದಲಾವಣೆ ತಂದುಕೊಡಿ', 'Quick Links': 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು', 'Support Us': 'ನಮ್ಮನ್ನು ಬೆಂಬಲಿಸಿ', 'Contact Details': 'ಸಂಪರ್ಕ ವಿವರಗಳು'
  }
};

const fullTranslations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'Loading': 'लोड हो रहा है',
    'Vidyasagar': 'विद्यासागर',
    'Ayurvedic Chikitsalaya': 'आयुर्वेदिक चिकित्सालय',
    'Seva · Swasthya · Sanskar': 'सेवा · स्वास्थ्य · संस्कार',
    'Compassionate Healthcare for a Healthier Society': 'स्वस्थ समाज के लिए करुणामय स्वास्थ्य सेवा',
    'An initiative of Vidyasagar Ayurvedic Chikitsalaya Trust towards providing accessible, authentic and holistic healthcare inspired by the teachings of Acharyashree Vidyasagar Maharaj.': 'आचार्यश्री विद्यासागर महाराज की शिक्षाओं से प्रेरित, सुलभ, प्रामाणिक और समग्र स्वास्थ्य सेवा प्रदान करने की विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्ट की पहल।',
    'Traditional healing for holistic well-being': 'समग्र कल्याण के लिए पारंपरिक उपचार',
    'Modern medical care with compassion': 'करुणा के साथ आधुनिक चिकित्सा सेवा',
    'Advanced diagnostics for early detection': 'शीघ्र पहचान के लिए उन्नत निदान',
    'Ayurvedic Consultation': 'आयुर्वेदिक परामर्श',
    'Panchakarma Therapy': 'पंचकर्म चिकित्सा',
    'Wellness & Lifestyle Guidance': 'स्वास्थ्य और जीवनशैली मार्गदर्शन',
    'Preventive & Rejuvenative Care': 'निवारक और कायाकल्प देखभाल',
    'General Medicine': 'सामान्य चिकित्सा',
    'Specialty OPD Services': 'विशेषज्ञ ओपीडी सेवाएँ',
    'Inpatient Facilities (Planned)': 'अंतरंग रोगी सुविधाएँ (प्रस्तावित)',
    'Emergency & Critical Care (Planned)': 'आपातकालीन और गहन देखभाल (प्रस्तावित)',
    'Pathology Laboratory': 'पैथोलॉजी प्रयोगशाला',
    'Radiology & Imaging (Planned)': 'रेडियोलॉजी और इमेजिंग (प्रस्तावित)',
    'Preventive Health Checkups': 'निवारक स्वास्थ्य जाँच',
    'Comprehensive Health Screening': 'व्यापक स्वास्थ्य जाँच',
    'Three Complementary Sections, One Vision': 'तीन पूरक विभाग, एक दृष्टि',
    'Integrating Ayush, modern medicine and advanced diagnostics for complete and compassionate care.': 'संपूर्ण और करुणामय देखभाल के लिए आयुष, आधुनिक चिकित्सा और उन्नत निदान का एकीकरण।',
    'Our Purpose': 'हमारा उद्देश्य',
    'Inspired by a Greater Vision': 'एक महान दृष्टि से प्रेरित',
    'We strive to make quality healthcare accessible to every individual, promote holistic well-being, and serve the society with compassion, inspired by the teachings of Acharyashree Vidyasagar Maharaj.': 'आचार्यश्री विद्यासागर महाराज की शिक्षाओं से प्रेरित होकर, हम प्रत्येक व्यक्ति तक गुणवत्तापूर्ण स्वास्थ्य सेवा पहुँचाने, समग्र कल्याण को बढ़ावा देने और करुणा के साथ समाज की सेवा करने का प्रयास करते हैं।',
    'Know More About Us': 'हमारे बारे में और जानें',
    'Preventive & Curative Care': 'निवारक और उपचारात्मक देखभाल',
    'Research & Education': 'अनुसंधान और शिक्षा',
    'Community Health Programs': 'सामुदायिक स्वास्थ्य कार्यक्रम',
    'Hospital Sections': 'अस्पताल विभाग',
    'Lives to Impact': 'जीवनों पर सकारात्मक प्रभाव',
    'Integrated': 'एकीकृत',
    'Approach': 'दृष्टिकोण',
    'Community': 'समुदाय',
    'Focused': 'केंद्रित',
    'Guided by': 'के मार्गदर्शन में',
    'Jain Values': 'जैन मूल्य',
    'Gallery & Introduction': 'गैलरी और परिचय',
    'A Glimpse of Our Initiative': 'हमारी पहल की एक झलक',
    'Take a look at our hospitals, facilities and community activities.': 'हमारे अस्पतालों, सुविधाओं और सामुदायिक गतिविधियों की झलक देखें।',
    'View Full Gallery': 'पूरी गैलरी देखें',
    'Video 1': 'वीडियो 1',
    'Video 2': 'वीडियो 2',
    'Video 3': 'वीडियो 3',
    '4 Videos': '4 वीडियो',
    'Latest Events': 'नवीनतम कार्यक्रम',
    'News & Events': 'समाचार और कार्यक्रम',
    'Previous events': 'पिछले कार्यक्रम',
    'Next events': 'अगले कार्यक्रम',
    'Slide Preview 1': 'स्लाइड पूर्वावलोकन १',
    'Slide Preview 2': 'स्लाइड पूर्वावलोकन २',
    'Stay updated with our latest activities, health camps and upcoming events.': 'हमारी नवीनतम गतिविधियों, स्वास्थ्य शिविरों और आगामी कार्यक्रमों की जानकारी पाएँ।',
    'View All Events': 'सभी कार्यक्रम देखें',
    'Be a Part of Our Mission': 'हमारे मिशन का हिस्सा बनें',
    'Your support helps us build a healthier society through accessible and authentic healthcare for all.': 'आपका सहयोग सभी के लिए सुलभ और प्रामाणिक स्वास्थ्य सेवा के माध्यम से स्वस्थ समाज बनाने में मदद करता है।',
    'Donate Now': 'अभी दान करें',
    'Acharya Shri Vidyasagar Ayurvedic Chikitsalaya': 'आचार्य श्री विद्यासागर आयुर्वेदिक चिकित्सालय',
    'Vidyasanmatidas': 'विद्यासन्मतिदास',
    'Vidyasagar Ayurvedic Chikitsalaya Trust': 'विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्ट',
    'Education · Character · Social Welfare': 'शिक्षा · चरित्र · समाज कल्याण',
    'Home': 'मुखपृष्ठ',
    'About Us': 'हमारे बारे में',
    'Hospitals': 'अस्पताल',
    'Gallery': 'गैलरी',
    'Contact': 'संपर्क',
    'Quick Links': 'त्वरित लिंक',
    'Support Us': 'हमारा समर्थन करें',
    'Contact Details': 'संपर्क विवरण',
    'About Our Trust': 'हमारे ट्रस्ट के बारे में',
    'Rooted in Values,': 'मूल्यों में निहित,',
    'Dedicated to a Healthier Society': 'स्वस्थ समाज के लिए समर्पित',
    'True healthcare is not just the absence of disease, but the harmony of body, mind and soul.': 'सच्चा स्वास्थ्य केवल रोग का न होना नहीं, बल्कि शरीर, मन और आत्मा का सामंजस्य है।',
    'The divine guidance of our revered Acharyas': 'हमारे पूजनीय आचार्यों का दिव्य मार्गदर्शन',
    'Our Inspiration': 'हमारी प्रेरणा',
    'Our Mission, Vision and Values': 'हमारा मिशन, दृष्टि और मूल्य',
    'Our Mission': 'हमारा मिशन',
    'Our Vision': 'हमारी दृष्टि',
    'Our Core Values': 'हमारे मूल मूल्य',
    'Get In Touch': 'संपर्क करें',
    'We Are Here': 'हम यहाँ हैं',
    'for a Healthier Tomorrow': 'स्वस्थ कल के लिए',
    'Call Us': 'हमें कॉल करें',
    'Email Us': 'हमें ईमेल करें',
    'Visit Us': 'हमसे मिलें',
    'Location': 'स्थान',
    'Directions': 'दिशाएँ',
    'Nearby Places': 'आस-पास के स्थान',
    'View larger map': 'बड़ा मानचित्र देखें',
    'Contact us': 'संपर्क करें',
    'Send Us a Message': 'हमें संदेश भेजें',
    'Full Name': 'पूरा नाम',
    'Email Address': 'ईमेल पता',
    'Contact Number': 'संपर्क नंबर',
    'Subject': 'विषय',
    'Message': 'संदेश',
    'Send Message': 'संदेश भेजें',
    'Our Hospital Locations': 'हमारे अस्पतालों के स्थान',
    'Frequently Asked Questions': 'अक्सर पूछे जाने वाले प्रश्न',
    'Quick Contacts': 'त्वरित संपर्क',
    'Complete payment': 'भुगतान पूरा करें',
    'Make a meaningful difference': 'एक सार्थक बदलाव लाएँ',
    'Choose where your contribution should help.': 'चुनें कि आपका योगदान कहाँ सहायता करे।',
    'Your name': 'आपका नाम',
    'Enter your name': 'अपना नाम दर्ज करें',
    'Email address': 'ईमेल पता',
    'Enter your email': 'अपना ईमेल दर्ज करें',
    'Contribution amount': 'योगदान राशि',
    'Custom amount': 'कस्टम राशि',
    'Enter custom amount': 'कस्टम राशि दर्ज करें',
    'Donate for': 'इस हेतु दान करें',
    'Hospital support': 'अस्पताल सहायता',
    'Events & activities': 'कार्यक्रम और गतिविधियाँ',
    'Continue to QR payment': 'QR भुगतान जारी रखें',
    'Scan to donate': 'दान करने के लिए स्कैन करें',
    'Use any UPI app to scan this code. Purpose:': 'इस कोड को स्कैन करने के लिए किसी भी UPI ऐप का उपयोग करें। उद्देश्य:',
    'I have completed payment': 'मैंने भुगतान पूरा कर लिया है',
    'Edit details': 'विवरण संपादित करें',
    'Thank you,': 'धन्यवाद,',
    'Download Receipt': 'रसीद डाउनलोड करें',
    'Close': 'बंद करें',
    'Gallery & Events': 'गैलरी और कार्यक्रम',
    'Moments of': 'यात्रा के',
    'Our Journey': 'कुछ पल',
    'Latest Gallery': 'नवीनतम गैलरी',
    'All': 'सभी',
    'Images': 'चित्र',
    'Videos': 'वीडियो',
    'Events': 'कार्यक्रम',
    'Search gallery...': 'गैलरी खोजें...',
    'Newest First': 'नवीनतम पहले',
    'Events & Activities': 'कार्यक्रम और गतिविधियाँ',
    'No matching moments': 'कोई मेल खाता क्षण नहीं',
    'Try another search or choose a different filter.': 'दूसरी खोज करें या कोई अन्य फ़िल्टर चुनें।',
    'View All': 'सभी देखें',
    'Book Appointment': 'अपॉइंटमेंट बुक करें',
    'Key Services': 'मुख्य सेवाएँ',
    'Our Practitioners': 'हमारे चिकित्सक',
    'Subscribe to Our Newsletter': 'हमारे समाचार पत्र की सदस्यता लें',
    'Subscribe': 'सदस्यता लें',
    'Enter your email address': 'अपना ईमेल पता दर्ज करें',
    'Your email app should open with a subscription request. Send the email to complete signup.': 'सदस्यता अनुरोध के साथ आपका ईमेल ऐप खुलना चाहिए। सदस्यता पूरी करने के लिए ईमेल भेजें।',
    'Open the email request': 'ईमेल अनुरोध खोलें',
  },
  MR: {
    'Loading': 'लोड होत आहे',
    'Vidyasagar': 'विद्यासागर',
    'Ayurvedic Chikitsalaya': 'आयुर्वेदिक चिकित्सालय',
    'Seva · Swasthya · Sanskar': 'सेवा · स्वास्थ्य · संस्कार',
    'Compassionate Healthcare for a Healthier Society': 'निरोगी समाजासाठी करुणामय आरोग्यसेवा',
    'An initiative of Vidyasagar Ayurvedic Chikitsalaya Trust towards providing accessible, authentic and holistic healthcare inspired by the teachings of Acharyashree Vidyasagar Maharaj.': 'आचार्यश्री विद्यासागर महाराज यांच्या शिकवणुकीतून प्रेरित, सुलभ, अस्सल आणि सर्वांगीण आरोग्यसेवा देण्याचा विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्टचा उपक्रम.',
    'Traditional healing for holistic well-being': 'सर्वांगीण आरोग्यासाठी पारंपरिक उपचार',
    'Modern medical care with compassion': 'करुणेने परिपूर्ण आधुनिक वैद्यकीय सेवा',
    'Advanced diagnostics for early detection': 'लवकर निदानासाठी प्रगत तपासणी',
    'Ayurvedic Consultation': 'आयुर्वेदिक सल्ला',
    'Panchakarma Therapy': 'पंचकर्म उपचार',
    'Wellness & Lifestyle Guidance': 'आरोग्य आणि जीवनशैली मार्गदर्शन',
    'Preventive & Rejuvenative Care': 'प्रतिबंधात्मक आणि पुनरुज्जीवन सेवा',
    'General Medicine': 'सामान्य वैद्यक',
    'Specialty OPD Services': 'विशेषज्ञ बाह्यरुग्ण सेवा',
    'Inpatient Facilities (Planned)': 'आंतररुग्ण सुविधा (नियोजित)',
    'Emergency & Critical Care (Planned)': 'आपत्कालीन आणि अतिदक्षता सेवा (नियोजित)',
    'Pathology Laboratory': 'पॅथॉलॉजी प्रयोगशाळा',
    'Radiology & Imaging (Planned)': 'रेडिओलॉजी आणि इमेजिंग (नियोजित)',
    'Preventive Health Checkups': 'प्रतिबंधात्मक आरोग्य तपासणी',
    'Comprehensive Health Screening': 'सर्वसमावेशक आरोग्य तपासणी',
    'Three Complementary Sections, One Vision': 'तीन पूरक विभाग, एकच ध्येय',
    'Integrating Ayush, modern medicine and advanced diagnostics for complete and compassionate care.': 'संपूर्ण आणि करुणामय सेवेसाठी आयुष, आधुनिक वैद्यक आणि प्रगत निदान यांचा समन्वय.',
    'Our Purpose': 'आमचा उद्देश',
    'Inspired by a Greater Vision': 'एका महान दृष्टिकोनातून प्रेरित',
    'We strive to make quality healthcare accessible to every individual, promote holistic well-being, and serve the society with compassion, inspired by the teachings of Acharyashree Vidyasagar Maharaj.': 'आचार्यश्री विद्यासागर महाराज यांच्या शिकवणुकीतून प्रेरित होऊन, प्रत्येक व्यक्तीला दर्जेदार आरोग्यसेवा उपलब्ध करून देणे, सर्वांगीण स्वास्थ्याला प्रोत्साहन देणे आणि करुणेने समाजाची सेवा करणे हे आमचे ध्येय आहे.',
    'Know More About Us': 'आमच्याबद्दल अधिक जाणून घ्या',
    'Preventive & Curative Care': 'प्रतिबंधात्मक आणि उपचारात्मक सेवा',
    'Research & Education': 'संशोधन आणि शिक्षण',
    'Community Health Programs': 'समुदाय आरोग्य कार्यक्रम',
    'Hospital Sections': 'रुग्णालय विभाग',
    'Lives to Impact': 'जीवनांवर सकारात्मक परिणाम',
    'Integrated': 'एकात्मिक',
    'Approach': 'दृष्टिकोन',
    'Community': 'समुदाय',
    'Focused': 'केंद्रित',
    'Guided by': 'यांच्या मार्गदर्शनाखाली',
    'Jain Values': 'जैन मूल्ये',
    'Gallery & Introduction': 'गॅलरी आणि परिचय',
    'A Glimpse of Our Initiative': 'आमच्या उपक्रमाची एक झलक',
    'Take a look at our hospitals, facilities and community activities.': 'आमची रुग्णालये, सुविधा आणि सामुदायिक उपक्रम पाहा.',
    'View Full Gallery': 'संपूर्ण गॅलरी पहा',
    'Video 1': 'व्हिडिओ १',
    'Video 2': 'व्हिडिओ २',
    'Video 3': 'व्हिडिओ ३',
    '4 Videos': '४ व्हिडिओ',
    'Latest Events': 'नवीनतम कार्यक्रम',
    'News & Events': 'बातम्या आणि कार्यक्रम',
    'Previous events': 'मागील कार्यक्रम',
    'Next events': 'पुढील कार्यक्रम',
    'Slide Preview 1': 'स्लाइड पूर्वावलोकन १',
    'Slide Preview 2': 'स्लाइड पूर्वावलोकन २',
    'Stay updated with our latest activities, health camps and upcoming events.': 'आमच्या नवीन उपक्रम, आरोग्य शिबिरे आणि आगामी कार्यक्रमांची माहिती मिळवा.',
    'View All Events': 'सर्व कार्यक्रम पहा',
    'Be a Part of Our Mission': 'आमच्या ध्येयाचा भाग व्हा',
    'Your support helps us build a healthier society through accessible and authentic healthcare for all.': 'सर्वांसाठी सुलभ आणि अस्सल आरोग्यसेवेच्या माध्यमातून निरोगी समाज घडविण्यास तुमचा पाठिंबा मदत करतो.',
    'Donate Now': 'आता देणगी द्या',
    'Acharya Shri Vidyasagar Ayurvedic Chikitsalaya': 'आचार्य श्री विद्यासागर आयुर्वेदिक चिकित्सालय',
    'Vidyasanmatidas': 'विद्यासन्मतिदास',
    'Vidyasagar Ayurvedic Chikitsalaya Trust': 'विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्ट',
    'Education · Character · Social Welfare': 'शिक्षण · चारित्र्य · समाजकल्याण',
    'Home': 'मुख्यपृष्ठ',
    'About Us': 'आमच्याबद्दल',
    'Hospitals': 'रुग्णालये',
    'Gallery': 'गॅलरी',
    'Contact': 'संपर्क',
    'Quick Links': 'त्वरित दुवे',
    'Support Us': 'आम्हाला पाठिंबा द्या',
    'Contact Details': 'संपर्क तपशील',
    'About Our Trust': 'आमच्या ट्रस्टबद्दल',
    'Rooted in Values,': 'मूल्यांशी नाते जपून,',
    'Dedicated to a Healthier Society': 'निरोगी समाजासाठी समर्पित',
    'True healthcare is not just the absence of disease, but the harmony of body, mind and soul.': 'खरे आरोग्य म्हणजे केवळ रोगाचा अभाव नव्हे, तर शरीर, मन आणि आत्मा यांचा समतोल.',
    'The divine guidance of our revered Acharyas': 'आमच्या पूजनीय आचार्यांचे दिव्य मार्गदर्शन',
    'Our Inspiration': 'आमची प्रेरणा',
    'Our Mission, Vision and Values': 'आमचे ध्येय, दृष्टी आणि मूल्ये',
    'Our Mission': 'आमचे ध्येय',
    'Our Vision': 'आमची दृष्टी',
    'Our Core Values': 'आमची मूलभूत मूल्ये',
    'Get In Touch': 'संपर्क साधा',
    'We Are Here': 'आम्ही येथे आहोत',
    'for a Healthier Tomorrow': 'निरोगी उद्यासाठी',
    'Call Us': 'आम्हाला फोन करा',
    'Email Us': 'आम्हाला ईमेल करा',
    'Visit Us': 'आम्हाला भेट द्या',
    'Location': 'ठिकाण',
    'Directions': 'दिशा',
    'Nearby Places': 'जवळची ठिकाणे',
    'View larger map': 'मोठा नकाशा पहा',
    'Contact us': 'संपर्क करा',
    'Send Us a Message': 'आम्हाला संदेश पाठवा',
    'Full Name': 'पूर्ण नाव',
    'Email Address': 'ईमेल पत्ता',
    'Contact Number': 'संपर्क क्रमांक',
    'Subject': 'विषय',
    'Message': 'संदेश',
    'Send Message': 'संदेश पाठवा',
    'Our Hospital Locations': 'आमच्या रुग्णालयांची ठिकाणे',
    'Frequently Asked Questions': 'वारंवार विचारले जाणारे प्रश्न',
    'Quick Contacts': 'त्वरित संपर्क',
    'Complete payment': 'पेमेंट पूर्ण करा',
    'Make a meaningful difference': 'अर्थपूर्ण बदल घडवा',
    'Choose where your contribution should help.': 'तुमचे योगदान कुठे उपयोगी पडावे ते निवडा.',
    'Your name': 'तुमचे नाव',
    'Enter your name': 'तुमचे नाव लिहा',
    'Email address': 'ईमेल पत्ता',
    'Enter your email': 'तुमचा ईमेल लिहा',
    'Contribution amount': 'योगदानाची रक्कम',
    'Custom amount': 'इच्छित रक्कम',
    'Enter custom amount': 'इच्छित रक्कम लिहा',
    'Donate for': 'यासाठी देणगी',
    'Hospital support': 'रुग्णालयासाठी मदत',
    'Events & activities': 'कार्यक्रम आणि उपक्रम',
    'Continue to QR payment': 'QR पेमेंटसाठी पुढे जा',
    'Scan to donate': 'देणगीसाठी स्कॅन करा',
    'Use any UPI app to scan this code. Purpose:': 'हा कोड स्कॅन करण्यासाठी कोणतेही UPI ॲप वापरा. उद्देश:',
    'I have completed payment': 'मी पेमेंट पूर्ण केले आहे',
    'Edit details': 'तपशील बदला',
    'Thank you,': 'धन्यवाद,',
    'Download Receipt': 'पावती डाउनलोड करा',
    'Close': 'बंद करा',
    'Gallery & Events': 'गॅलरी आणि कार्यक्रम',
    'Moments of': 'आमच्या प्रवासातील',
    'Our Journey': 'काही क्षण',
    'Latest Gallery': 'नवीनतम गॅलरी',
    'All': 'सर्व',
    'Images': 'प्रतिमा',
    'Videos': 'व्हिडिओ',
    'Events': 'कार्यक्रम',
    'Search gallery...': 'गॅलरी शोधा...',
    'Newest First': 'नवीनतम प्रथम',
    'Events & Activities': 'कार्यक्रम आणि उपक्रम',
    'No matching moments': 'जुळणारे क्षण सापडले नाहीत',
    'Try another search or choose a different filter.': 'दुसरा शोध वापरा किंवा वेगळा फिल्टर निवडा.',
    'View All': 'सर्व पहा',
    'Book Appointment': 'अपॉइंटमेंट नोंदवा',
    'Key Services': 'मुख्य सेवा',
    'Our Practitioners': 'आमचे वैद्यकीय तज्ज्ञ',
    'Subscribe to Our Newsletter': 'आमच्या वृत्तपत्राची सदस्यता घ्या',
    'Subscribe': 'सदस्यता घ्या',
    'Enter your email address': 'तुमचा ईमेल पत्ता लिहा',
    'Your email app should open with a subscription request. Send the email to complete signup.': 'सदस्यता विनंतीसह तुमचे ईमेल ॲप उघडेल. नोंदणी पूर्ण करण्यासाठी ईमेल पाठवा.',
    'Open the email request': 'ईमेल विनंती उघडा',
  },
  KN: {
    'Loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ',
    'Vidyasagar': 'ವಿದ್ಯಾಸಾಗರ',
    'Ayurvedic Chikitsalaya': 'ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ',
    'Seva · Swasthya · Sanskar': 'ಸೇವಾ · ಸ್ವಾಸ್ಥ್ಯ · ಸಂಸ್ಕಾರ',
    'Compassionate Healthcare for a Healthier Society': 'ಆರೋಗ್ಯಕರ ಸಮಾಜಕ್ಕಾಗಿ ಕರುಣೆಯ ಆರೋಗ್ಯ ಸೇವೆ',
    'An initiative of Vidyasagar Ayurvedic Chikitsalaya Trust towards providing accessible, authentic and holistic healthcare inspired by the teachings of Acharyashree Vidyasagar Maharaj.': 'ಆಚಾರ್ಯಶ್ರೀ ವಿದ್ಯಾಸಾಗರ ಮಹಾರಾಜರ ಬೋಧನೆಗಳಿಂದ ಪ್ರೇರಿತವಾಗಿ ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವ, ಅಧಿಕೃತ ಮತ್ತು ಸಮಗ್ರ ಆರೋಗ್ಯ ಸೇವೆಯನ್ನು ನೀಡುವ ವಿದ್ಯಾಸಾಗರ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ ಟ್ರಸ್ಟ್‌ನ ಉಪಕ್ರಮ.',
    'Traditional healing for holistic well-being': 'ಸಮಗ್ರ ಯೋಗಕ್ಷೇಮಕ್ಕಾಗಿ ಸಾಂಪ್ರದಾಯಿಕ ಚಿಕಿತ್ಸೆ',
    'Modern medical care with compassion': 'ಕರುಣೆಯೊಂದಿಗೆ ಆಧುನಿಕ ವೈದ್ಯಕೀಯ ಆರೈಕೆ',
    'Advanced diagnostics for early detection': 'ಆರಂಭಿಕ ಪತ್ತೆಗಾಗಿ ಸುಧಾರಿತ ರೋಗನಿರ್ಣಯ',
    'Ayurvedic Consultation': 'ಆಯುರ್ವೇದ ಸಮಾಲೋಚನೆ',
    'Panchakarma Therapy': 'ಪಂಚಕರ್ಮ ಚಿಕಿತ್ಸೆ',
    'Wellness & Lifestyle Guidance': 'ಆರೋಗ್ಯ ಮತ್ತು ಜೀವನಶೈಲಿ ಮಾರ್ಗದರ್ಶನ',
    'Preventive & Rejuvenative Care': 'ತಡೆಗಟ್ಟುವ ಮತ್ತು ಪುನಶ್ಚೇತನ ಆರೈಕೆ',
    'General Medicine': 'ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ',
    'Specialty OPD Services': 'ವಿಶೇಷ ಹೊರರೋಗಿ ಸೇವೆಗಳು',
    'Inpatient Facilities (Planned)': 'ಒಳರೋಗಿ ಸೌಲಭ್ಯಗಳು (ಯೋಜಿತ)',
    'Emergency & Critical Care (Planned)': 'ತುರ್ತು ಮತ್ತು ತೀವ್ರ ನಿಗಾ (ಯೋಜಿತ)',
    'Pathology Laboratory': 'ರೋಗಶಾಸ್ತ್ರ ಪ್ರಯೋಗಾಲಯ',
    'Radiology & Imaging (Planned)': 'ವಿಕಿರಣಶಾಸ್ತ್ರ ಮತ್ತು ಚಿತ್ರಣ (ಯೋಜಿತ)',
    'Preventive Health Checkups': 'ತಡೆಗಟ್ಟುವ ಆರೋಗ್ಯ ತಪಾಸಣೆ',
    'Comprehensive Health Screening': 'ಸಮಗ್ರ ಆರೋಗ್ಯ ತಪಾಸಣೆ',
    'Three Complementary Sections, One Vision': 'ಮೂರು ಪೂರಕ ವಿಭಾಗಗಳು, ಒಂದೇ ದೃಷ್ಟಿ',
    'Integrating Ayush, modern medicine and advanced diagnostics for complete and compassionate care.': 'ಸಂಪೂರ್ಣ ಮತ್ತು ಕರುಣೆಯ ಆರೈಕೆಗಾಗಿ ಆಯುಷ್, ಆಧುನಿಕ ವೈದ್ಯಕೀಯ ಮತ್ತು ಸುಧಾರಿತ ರೋಗನಿರ್ಣಯದ ಸಮನ್ವಯ.',
    'Our Purpose': 'ನಮ್ಮ ಉದ್ದೇಶ',
    'Inspired by a Greater Vision': 'ಉನ್ನತ ದೃಷ್ಟಿಯಿಂದ ಪ್ರೇರಿತ',
    'We strive to make quality healthcare accessible to every individual, promote holistic well-being, and serve the society with compassion, inspired by the teachings of Acharyashree Vidyasagar Maharaj.': 'ಆಚಾರ್ಯಶ್ರೀ ವಿದ್ಯಾಸಾಗರ ಮಹಾರಾಜರ ಬೋಧನೆಗಳಿಂದ ಪ್ರೇರಿತರಾಗಿ, ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಗುಣಮಟ್ಟದ ಆರೋಗ್ಯ ಸೇವೆ ಒದಗಿಸಲು, ಸಮಗ್ರ ಯೋಗಕ್ಷೇಮವನ್ನು ಉತ್ತೇಜಿಸಲು ಮತ್ತು ಕರುಣೆಯಿಂದ ಸಮಾಜಕ್ಕೆ ಸೇವೆ ಸಲ್ಲಿಸಲು ನಾವು ಶ್ರಮಿಸುತ್ತೇವೆ.',
    'Know More About Us': 'ನಮ್ಮ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'Preventive & Curative Care': 'ತಡೆಗಟ್ಟುವ ಮತ್ತು ಚಿಕಿತ್ಸಕ ಆರೈಕೆ',
    'Research & Education': 'ಸಂಶೋಧನೆ ಮತ್ತು ಶಿಕ್ಷಣ',
    'Community Health Programs': 'ಸಮುದಾಯ ಆರೋಗ್ಯ ಕಾರ್ಯಕ್ರಮಗಳು',
    'Hospital Sections': 'ಆಸ್ಪತ್ರೆ ವಿಭಾಗಗಳು',
    'Lives to Impact': 'ಜೀವನಗಳ ಮೇಲೆ ಪ್ರಭಾವ',
    'Integrated': 'ಸಂಯೋಜಿತ',
    'Approach': 'ವಿಧಾನ',
    'Community': 'ಸಮುದಾಯ',
    'Focused': 'ಕೇಂದ್ರಿತ',
    'Guided by': 'ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ',
    'Jain Values': 'ಜೈನ ಮೌಲ್ಯಗಳು',
    'Gallery & Introduction': 'ಗ್ಯಾಲರಿ ಮತ್ತು ಪರಿಚಯ',
    'A Glimpse of Our Initiative': 'ನಮ್ಮ ಉಪಕ್ರಮದ ಒಂದು ನೋಟ',
    'Take a look at our hospitals, facilities and community activities.': 'ನಮ್ಮ ಆಸ್ಪತ್ರೆಗಳು, ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
    'View Full Gallery': 'ಪೂರ್ಣ ಗ್ಯಾಲರಿ ವೀಕ್ಷಿಸಿ',
    'Video 1': 'ವೀಡಿಯೊ 1',
    'Video 2': 'ವೀಡಿಯೊ 2',
    'Video 3': 'ವೀಡಿಯೊ 3',
    '4 Videos': '4 ವೀಡಿಯೊಗಳು',
    'Latest Events': 'ಇತ್ತೀಚಿನ ಕಾರ್ಯಕ್ರಮಗಳು',
    'News & Events': 'ಸುದ್ದಿ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು',
    'Previous events': 'ಹಿಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು',
    'Next events': 'ಮುಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು',
    'Slide Preview 1': 'ಸ್ಲೈಡ್ ಪೂರ್ವವೀಕ್ಷಣೆ ೧',
    'Slide Preview 2': 'ಸ್ಲೈಡ್ ಪೂರ್ವವೀಕ್ಷಣೆ ೨',
    'Stay updated with our latest activities, health camps and upcoming events.': 'ನಮ್ಮ ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು, ಆರೋಗ್ಯ ಶಿಬಿರಗಳು ಮತ್ತು ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.',
    'View All Events': 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    'Be a Part of Our Mission': 'ನಮ್ಮ ಧ್ಯೇಯದ ಭಾಗವಾಗಿರಿ',
    'Your support helps us build a healthier society through accessible and authentic healthcare for all.': 'ಎಲ್ಲರಿಗೂ ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವ ಮತ್ತು ಅಧಿಕೃತ ಆರೋಗ್ಯ ಸೇವೆಯ ಮೂಲಕ ಆರೋಗ್ಯಕರ ಸಮಾಜ ನಿರ್ಮಿಸಲು ನಿಮ್ಮ ಬೆಂಬಲ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    'Donate Now': 'ಈಗ ದೇಣಿಗೆ ನೀಡಿ',
    'Acharya Shri Vidyasagar Ayurvedic Chikitsalaya': 'ಆಚಾರ್ಯ ಶ್ರೀ ವಿದ್ಯಾಸಾಗರ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ',
    'Vidyasanmatidas': 'ವಿದ್ಯಾಸನ್ಮತಿದಾಸ',
    'Vidyasagar Ayurvedic Chikitsalaya Trust': 'ವಿದ್ಯಾಸಾಗರ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ ಟ್ರಸ್ಟ್',
    'Education · Character · Social Welfare': 'ಶಿಕ್ಷಣ · ವ್ಯಕ್ತಿತ್ವ · ಸಮಾಜ ಕಲ್ಯಾಣ',
    'Home': 'ಮುಖಪುಟ',
    'About Us': 'ನಮ್ಮ ಬಗ್ಗೆ',
    'Hospitals': 'ಆಸ್ಪತ್ರೆಗಳು',
    'Gallery': 'ಗ್ಯಾಲರಿ',
    'Contact': 'ಸಂಪರ್ಕ',
    'Quick Links': 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    'Support Us': 'ನಮ್ಮನ್ನು ಬೆಂಬಲಿಸಿ',
    'Contact Details': 'ಸಂಪರ್ಕ ವಿವರಗಳು',
    'About Our Trust': 'ನಮ್ಮ ಟ್ರಸ್ಟ್ ಬಗ್ಗೆ',
    'Rooted in Values,': 'ಮೌಲ್ಯಗಳಲ್ಲಿ ಬೇರೂರಿ,',
    'Dedicated to a Healthier Society': 'ಆರೋಗ್ಯಕರ ಸಮಾಜಕ್ಕೆ ಸಮರ್ಪಿತ',
    'True healthcare is not just the absence of disease, but the harmony of body, mind and soul.': 'ನಿಜವಾದ ಆರೋಗ್ಯವೆಂದರೆ ರೋಗವಿಲ್ಲದಿರುವುದಷ್ಟೇ ಅಲ್ಲ, ದೇಹ, ಮನಸ್ಸು ಮತ್ತು ಆತ್ಮದ ಸಾಮರಸ್ಯ.',
    'The divine guidance of our revered Acharyas': 'ನಮ್ಮ ಪೂಜ್ಯ ಆಚಾರ್ಯರ ದಿವ್ಯ ಮಾರ್ಗದರ್ಶನ',
    'Our Inspiration': 'ನಮ್ಮ ಪ್ರೇರಣೆ',
    'Our Mission, Vision and Values': 'ನಮ್ಮ ಧ್ಯೇಯ, ದೃಷ್ಟಿ ಮತ್ತು ಮೌಲ್ಯಗಳು',
    'Our Mission': 'ನಮ್ಮ ಧ್ಯೇಯ',
    'Our Vision': 'ನಮ್ಮ ದೃಷ್ಟಿ',
    'Our Core Values': 'ನಮ್ಮ ಮೂಲ ಮೌಲ್ಯಗಳು',
    'Get In Touch': 'ಸಂಪರ್ಕಿಸಿ',
    'We Are Here': 'ನಾವು ಇಲ್ಲಿದ್ದೇವೆ',
    'for a Healthier Tomorrow': 'ಆರೋಗ್ಯಕರ ನಾಳೆಗಾಗಿ',
    'Call Us': 'ನಮಗೆ ಕರೆ ಮಾಡಿ',
    'Email Us': 'ನಮಗೆ ಇಮೇಲ್ ಮಾಡಿ',
    'Visit Us': 'ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ',
    'Location': 'ಸ್ಥಳ',
    'Directions': 'ದಾರಿ',
    'Nearby Places': 'ಹತ್ತಿರದ ಸ್ಥಳಗಳು',
    'View larger map': 'ದೊಡ್ಡ ನಕ್ಷೆ ವೀಕ್ಷಿಸಿ',
    'Contact us': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    'Send Us a Message': 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'Full Name': 'ಪೂರ್ಣ ಹೆಸರು',
    'Email Address': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'Contact Number': 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ',
    'Subject': 'ವಿಷಯ',
    'Message': 'ಸಂದೇಶ',
    'Send Message': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'Our Hospital Locations': 'ನಮ್ಮ ಆಸ್ಪತ್ರೆಗಳ ಸ್ಥಳಗಳು',
    'Frequently Asked Questions': 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    'Quick Contacts': 'ತ್ವರಿತ ಸಂಪರ್ಕಗಳು',
    'Complete payment': 'ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಿ',
    'Make a meaningful difference': 'ಅರ್ಥಪೂರ್ಣ ಬದಲಾವಣೆ ತನ್ನಿ',
    'Choose where your contribution should help.': 'ನಿಮ್ಮ ಕೊಡುಗೆ ಎಲ್ಲಿ ಸಹಾಯ ಮಾಡಬೇಕು ಎಂದು ಆಯ್ಕೆಮಾಡಿ.',
    'Your name': 'ನಿಮ್ಮ ಹೆಸರು',
    'Enter your name': 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
    'Email address': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'Enter your email': 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
    'Contribution amount': 'ಕೊಡುಗೆ ಮೊತ್ತ',
    'Custom amount': 'ಕಸ್ಟಮ್ ಮೊತ್ತ',
    'Enter custom amount': 'ಕಸ್ಟಮ್ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ',
    'Donate for': 'ಇದಕ್ಕಾಗಿ ದೇಣಿಗೆ',
    'Hospital support': 'ಆಸ್ಪತ್ರೆ ಬೆಂಬಲ',
    'Events & activities': 'ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳು',
    'Continue to QR payment': 'QR ಪಾವತಿಗೆ ಮುಂದುವರಿಯಿರಿ',
    'Scan to donate': 'ದೇಣಿಗೆ ನೀಡಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    'Use any UPI app to scan this code. Purpose:': 'ಈ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಯಾವುದೇ UPI ಅಪ್ಲಿಕೇಶನ್ ಬಳಸಿ. ಉದ್ದೇಶ:',
    'I have completed payment': 'ನಾನು ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೇನೆ',
    'Edit details': 'ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ',
    'Thank you,': 'ಧನ್ಯವಾದಗಳು,',
    'Download Receipt': 'ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    'Close': 'ಮುಚ್ಚಿ',
    'Gallery & Events': 'ಗ್ಯಾಲರಿ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು',
    'Moments of': 'ನಮ್ಮ ಪಯಣದ',
    'Our Journey': 'ಕೆಲವು ಕ್ಷಣಗಳು',
    'Latest Gallery': 'ಇತ್ತೀಚಿನ ಗ್ಯಾಲರಿ',
    'All': 'ಎಲ್ಲಾ',
    'Images': 'ಚಿತ್ರಗಳು',
    'Videos': 'ವೀಡಿಯೊಗಳು',
    'Events': 'ಕಾರ್ಯಕ್ರಮಗಳು',
    'Search gallery...': 'ಗ್ಯಾಲರಿಯಲ್ಲಿ ಹುಡುಕಿ...',
    'Newest First': 'ಹೊಸದು ಮೊದಲು',
    'Events & Activities': 'ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳು',
    'No matching moments': 'ಹೊಂದಾಣಿಕೆಯ ಕ್ಷಣಗಳಿಲ್ಲ',
    'Try another search or choose a different filter.': 'ಮತ್ತೊಂದು ಹುಡುಕಾಟ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಬೇರೆ ಫಿಲ್ಟರ್ ಆಯ್ಕೆಮಾಡಿ.',
    'View All': 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
    'Book Appointment': 'ನೇಮಕಾತಿ ಕಾಯ್ದಿರಿಸಿ',
    'Key Services': 'ಪ್ರಮುಖ ಸೇವೆಗಳು',
    'Our Practitioners': 'ನಮ್ಮ ವೈದ್ಯರು',
    'Subscribe to Our Newsletter': 'ನಮ್ಮ ಸುದ್ದಿಪತ್ರಕ್ಕೆ ಚಂದಾದಾರರಾಗಿ',
    'Subscribe': 'ಚಂದಾದಾರರಾಗಿ',
    'Enter your email address': 'ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ',
    'Your email app should open with a subscription request. Send the email to complete signup.': 'ಚಂದಾದಾರಿಕೆ ವಿನಂತಿಯೊಂದಿಗೆ ನಿಮ್ಮ ಇಮೇಲ್ ಆ್ಯಪ್ ತೆರೆಯುತ್ತದೆ. ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಲು ಇಮೇಲ್ ಕಳುಹಿಸಿ.',
    'Open the email request': 'ಇಮೇಲ್ ವಿನಂತಿ ತೆರೆಯಿರಿ',
  },
};

const pageTranslations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'Three Sections.': 'तीन विभाग।',
    'One Integrated Care.': 'एकीकृत स्वास्थ्य सेवा।',
    'Traditional wisdom, modern medicine and advanced diagnostics coming together for a healthier society.': 'स्वस्थ समाज के लिए पारंपरिक ज्ञान, आधुनिक चिकित्सा और उन्नत निदान का संगम।',
    'Holistic': 'समग्र',
    'Approach': 'दृष्टिकोण',
    'Affordable': 'किफायती',
    'for All': 'सभी के लिए',
    'Focused': 'केंद्रित',
    'Vidyasagar Maharaj’s': 'विद्यासागर महाराज की',
    'Vision in Action': 'साकार होती दृष्टि',
    'An integrated healthcare initiative with three complementary sections to provide complete and compassionate care.': 'संपूर्ण और करुणामय देखभाल प्रदान करने के लिए तीन पूरक विभागों वाली एकीकृत स्वास्थ्य सेवा पहल।',
    'Key Services': 'मुख्य सेवाएँ',
    'Our Practitioners': 'हमारे चिकित्सक',
    'Book Appointment': 'अपॉइंटमेंट बुक करें',
    'You will be redirected to email with selected doctor details.': 'आपको चुने गए डॉक्टर के विवरण के साथ ईमेल पर भेजा जाएगा।',
    'Integrated Sections': 'एकीकृत विभाग',
    'Complete': 'संपूर्ण',
    'Healthcare Ecosystem': 'स्वास्थ्य सेवा प्रणाली',
    'Preventive': 'निवारक',
    'Modern': 'आधुनिक',
    'Infrastructure': 'बुनियादी ढाँचा',
    'Latest News & Events': 'ताज़ा समाचार और कार्यक्रम',
    'Stay updated with our health camps, awareness programs and upcoming events.': 'हमारे स्वास्थ्य शिविरों, जागरूकता कार्यक्रमों और आगामी आयोजनों की जानकारी पाएँ।',
    'Subscribe to Our Newsletter': 'हमारे समाचार पत्र की सदस्यता लें',
    'Get the latest updates on our hospitals, events and community initiatives.': 'हमारे अस्पतालों, कार्यक्रमों और सामुदायिक पहलों की नवीनतम जानकारी पाएँ।',
    'Rooted in Values,': 'मूल्यों में निहित,',
    'Dedicated to a Healthier Society': 'स्वस्थ समाज के लिए समर्पित',
    'Vidyasagar Ayurvedic Chikitsalaya Trust is an initiative inspired by the teachings of Acharyashree Vidyasagar Maharaj, with a mission to provide accessible, authentic and holistic healthcare for every individual, guided by the principles of Seva, Swasthya and Sanskar.': 'विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्ट आचार्यश्री विद्यासागर महाराज की शिक्षाओं से प्रेरित पहल है। इसका उद्देश्य सेवा, स्वास्थ्य और संस्कार के सिद्धांतों के आधार पर प्रत्येक व्यक्ति को सुलभ, प्रामाणिक और समग्र स्वास्थ्य सेवा प्रदान करना है।',
    'Service to Society': 'समाज की सेवा',
    'Health for All': 'सभी के लिए स्वास्थ्य',
    'His teachings of compassion, simplicity and service to humanity inspire our mission to build a healthier and more harmonious society.': 'करुणा, सादगी और मानव सेवा की उनकी शिक्षाएँ स्वस्थ और अधिक सौहार्दपूर्ण समाज बनाने के हमारे मिशन को प्रेरित करती हैं।',
    'A symbol of strength, self-discipline and universal welfare, guiding us towards holistic care and compassionate medical services for all.': 'शक्ति, आत्म-अनुशासन और सार्वभौमिक कल्याण का प्रतीक, जो हमें सभी के लिए समग्र देखभाल और करुणामय चिकित्सा सेवाओं की दिशा दिखाता है।',
    'His vision of knowledge, diagnosis and awareness inspires our Nidaan Kendra to promote early detection and preventive healthcare.': 'ज्ञान, निदान और जागरूकता की उनकी दृष्टि हमारा निदान केंद्र को शीघ्र पहचान और निवारक स्वास्थ्य सेवा को बढ़ावा देने के लिए प्रेरित करती है।',
    'To provide accessible, affordable and authentic healthcare inspired by the teachings of our Acharyas, promoting holistic well-being and service to society.': 'हमारे आचार्यों की शिक्षाओं से प्रेरित सुलभ, किफायती और प्रामाणिक स्वास्थ्य सेवा प्रदान करना तथा समग्र कल्याण और समाज सेवा को बढ़ावा देना।',
    'A healthier society with integrated Ayurveda, modern medicine and advanced diagnostics, ensuring quality care for every individual.': 'एक ऐसा स्वस्थ समाज जहाँ एकीकृत आयुर्वेद, आधुनिक चिकित्सा और उन्नत निदान से प्रत्येक व्यक्ति को गुणवत्तापूर्ण देखभाल मिले।',
    'We Are Here': 'हम यहाँ हैं',
    'for a Healthier Tomorrow': 'स्वस्थ कल के लिए',
    'For inquiries, support, collaborations, donations or any information about our hospitals and community initiatives, feel free to reach out to us. We are always happy to hear from you.': 'पूछताछ, सहायता, सहयोग, दान या हमारे अस्पतालों और सामुदायिक पहलों की जानकारी के लिए हमसे संपर्क करें। हमें आपकी बात सुनकर खुशी होगी।',
    'For Society': 'समाज के लिए',
    'Values for a Better Tomorrow': 'बेहतर कल के लिए मूल्य',
    'Mon – Sat': 'सोम – शनि',
    'We usually respond': 'हम आमतौर पर उत्तर देते हैं',
    'within 24 hours.': '24 घंटों के भीतर।',
    'Open for visitors': 'आगंतुकों के लिए खुला',
    'For Donations & CSR': 'दान और CSR के लिए',
    'Know More': 'और जानें',
    'Have a question or need more information? Fill out the form below and our team will get back to you.': 'कोई प्रश्न है या अधिक जानकारी चाहिए? नीचे दिया गया फ़ॉर्म भरें, हमारी टीम आपसे संपर्क करेगी।',
    'Message sent successfully': 'संदेश सफलतापूर्वक भेजा गया',
    'Thank you. Our team will get back to you soon.': 'धन्यवाद। हमारी टीम शीघ्र आपसे संपर्क करेगी।',
    'Send another message': 'एक और संदेश भेजें',
    'Select a subject': 'विषय चुनें',
    'General enquiry': 'सामान्य पूछताछ',
    'Appointments': 'अपॉइंटमेंट',
    'Donations': 'दान',
    'Volunteer': 'स्वयंसेवा',
    'I agree to be contacted by the trust for my inquiry.': 'मैं अपनी पूछताछ के लिए ट्रस्ट द्वारा संपर्क किए जाने की सहमति देता/देती हूँ।',
    'Visit our integrated healthcare facility. Get directions, view details or navigate directly from your mobile device.': 'हमारी एकीकृत स्वास्थ्य सुविधा पर आएँ। दिशा-निर्देश पाएँ, विवरण देखें या अपने मोबाइल से रास्ता खोलें।',
    'View on Map': 'मानचित्र पर देखें',
    'Get Directions': 'दिशा-निर्देश पाएँ',
    'Our team will be happy to guide you with this request. Please contact us for the latest details.': 'हमारी टीम आपकी सहायता करके प्रसन्न होगी। नवीनतम जानकारी के लिए कृपया हमसे संपर्क करें।',
    'General Enquiries': 'सामान्य पूछताछ',
    'Appointments (Ayurvedic)': 'अपॉइंटमेंट (आयुर्वेदिक)',
    'Appointments (Allopathic)': 'अपॉइंटमेंट (एलोपैथिक)',
    'Diagnostics (Nidaan Kendra)': 'निदान केंद्र जाँच',
    'Donations & CSR': 'दान और CSR',
    'Gallery & Events': 'गैलरी और कार्यक्रम',
    'A glimpse of our hospitals, construction updates, health camps, community initiatives and important events.': 'हमारे अस्पतालों, निर्माण कार्य, स्वास्थ्य शिविरों, सामुदायिक पहलों और महत्वपूर्ण कार्यक्रमों की झलक।',
    'Browse all hospital videos and photos. Hover over a photo to see its filename.': 'अस्पताल के सभी वीडियो और तस्वीरें देखें। फ़ाइल का नाम देखने के लिए तस्वीर पर जाएँ।',
    'Try another search or choose a different filter.': 'दूसरी खोज करें या कोई अन्य फ़िल्टर चुनें।',
    'Close preview': 'पूर्वावलोकन बंद करें',
    'Play': 'चलाएँ',
    'Hospital support': 'अस्पताल सहायता',
    'Choose where your contribution should help.': 'चुनें कि आपका योगदान कहाँ सहायता करे।',
    'Your donation of': 'आपका दान',
    'has been recorded. A confirmation has been prepared for': 'दर्ज कर लिया गया है। पुष्टि संदेश तैयार है:',
    'Use any UPI app to scan this code. Purpose:': 'इस कोड को स्कैन करने के लिए कोई भी UPI ऐप इस्तेमाल करें। उद्देश्य:',
    'Your name': 'आपका नाम',
    'you@example.com': 'you@example.com',
  },
  MR: {
    'Three Sections.': 'तीन विभाग.',
    'One Integrated Care.': 'एकात्मिक आरोग्यसेवा.',
    'Traditional wisdom, modern medicine and advanced diagnostics coming together for a healthier society.': 'निरोगी समाजासाठी पारंपरिक ज्ञान, आधुनिक वैद्यक आणि प्रगत निदान यांचा संगम.',
    'Holistic': 'सर्वांगीण',
    'Approach': 'दृष्टिकोन',
    'Affordable': 'परवडणारे',
    'for All': 'सर्वांसाठी',
    'Focused': 'केंद्रित',
    'Vidyasagar Maharaj’s': 'विद्यासागर महाराजांची',
    'Vision in Action': 'प्रत्यक्षात साकारलेली दृष्टी',
    'An integrated healthcare initiative with three complementary sections to provide complete and compassionate care.': 'संपूर्ण आणि करुणामय सेवा देण्यासाठी तीन पूरक विभागांचा एकात्मिक आरोग्य उपक्रम.',
    'Key Services': 'मुख्य सेवा',
    'Our Practitioners': 'आमचे वैद्यकीय तज्ज्ञ',
    'Book Appointment': 'अपॉइंटमेंट नोंदवा',
    'You will be redirected to email with selected doctor details.': 'निवडलेल्या डॉक्टरांच्या माहितीसह तुम्हाला ईमेलकडे पाठवले जाईल.',
    'Integrated Sections': 'एकात्मिक विभाग',
    'Complete': 'संपूर्ण',
    'Healthcare Ecosystem': 'आरोग्यसेवा प्रणाली',
    'Preventive': 'प्रतिबंधात्मक',
    'Modern': 'आधुनिक',
    'Infrastructure': 'पायाभूत सुविधा',
    'Latest News & Events': 'ताज्या बातम्या आणि कार्यक्रम',
    'Stay updated with our health camps, awareness programs and upcoming events.': 'आमची आरोग्य शिबिरे, जनजागृती कार्यक्रम आणि आगामी उपक्रमांची माहिती मिळवा.',
    'Subscribe to Our Newsletter': 'आमच्या वृत्तपत्राची सदस्यता घ्या',
    'Get the latest updates on our hospitals, events and community initiatives.': 'आमची रुग्णालये, कार्यक्रम आणि सामुदायिक उपक्रम यांची ताजी माहिती मिळवा.',
    'Vidyasagar Ayurvedic Chikitsalaya Trust is an initiative inspired by the teachings of Acharyashree Vidyasagar Maharaj, with a mission to provide accessible, authentic and holistic healthcare for every individual, guided by the principles of Seva, Swasthya and Sanskar.': 'विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्ट हा आचार्यश्री विद्यासागर महाराज यांच्या शिकवणुकीतून प्रेरित उपक्रम आहे. सेवा, स्वास्थ्य आणि संस्कार यांच्या तत्त्वांनुसार प्रत्येकाला सुलभ, अस्सल आणि सर्वांगीण आरोग्यसेवा देणे हे त्याचे ध्येय आहे.',
    'Service to Society': 'समाजसेवा',
    'Health for All': 'सर्वांसाठी आरोग्य',
    'Values for a Better Tomorrow': 'उज्ज्वल उद्यासाठी मूल्ये',
    'His teachings of compassion, simplicity and service to humanity inspire our mission to build a healthier and more harmonious society.': 'करुणा, साधेपणा आणि मानवसेवेची त्यांची शिकवण निरोगी आणि अधिक सुसंवादी समाज घडविण्याच्या आमच्या ध्येयाला प्रेरणा देते.',
    'A symbol of strength, self-discipline and universal welfare, guiding us towards holistic care and compassionate medical services for all.': 'शक्ती, आत्मशिस्त आणि सर्वकल्याणाचे प्रतीक; सर्वांसाठी सर्वांगीण सेवा आणि करुणामय वैद्यकीय सेवांचा मार्ग दाखवणारे.',
    'His vision of knowledge, diagnosis and awareness inspires our Nidaan Kendra to promote early detection and preventive healthcare.': 'ज्ञान, निदान आणि जागरूकतेची त्यांची दृष्टी आमच्या निदान केंद्राला लवकर निदान आणि प्रतिबंधात्मक आरोग्यसेवा प्रोत्साहित करण्याची प्रेरणा देते.',
    'To provide accessible, affordable and authentic healthcare inspired by the teachings of our Acharyas, promoting holistic well-being and service to society.': 'आमच्या आचार्यांच्या शिकवणुकीतून प्रेरित सुलभ, परवडणारी आणि अस्सल आरोग्यसेवा देणे तसेच सर्वांगीण स्वास्थ्य आणि समाजसेवा वाढवणे.',
    'A healthier society with integrated Ayurveda, modern medicine and advanced diagnostics, ensuring quality care for every individual.': 'एकात्मिक आयुर्वेद, आधुनिक वैद्यक आणि प्रगत निदान यांच्या मदतीने प्रत्येकाला गुणवत्तापूर्ण सेवा देणारा निरोगी समाज.',
    'We Are Here': 'आम्ही येथे आहोत',
    'for a Healthier Tomorrow': 'निरोगी उद्यासाठी',
    'For inquiries, support, collaborations, donations or any information about our hospitals and community initiatives, feel free to reach out to us. We are always happy to hear from you.': 'चौकशी, मदत, सहकार्य, देणगी किंवा आमची रुग्णालये व सामुदायिक उपक्रम यांची माहिती हवी असल्यास आमच्याशी संपर्क साधा. तुमचे म्हणणे ऐकून आम्हाला आनंद होईल.',
    'For Society': 'समाजासाठी',
    'Mon – Sat': 'सोम – शनि',
    'We usually respond': 'आम्ही साधारणपणे उत्तर देतो',
    'within 24 hours.': '२४ तासांच्या आत.',
    'Open for visitors': 'भेट देणाऱ्यांसाठी खुले',
    'For Donations & CSR': 'देणगी आणि CSR साठी',
    'Know More': 'अधिक जाणून घ्या',
    'Have a question or need more information? Fill out the form below and our team will get back to you.': 'प्रश्न आहे किंवा अधिक माहिती हवी आहे? खालील फॉर्म भरा, आमची टीम तुमच्याशी संपर्क साधेल.',
    'Message sent successfully': 'संदेश यशस्वीरीत्या पाठवला',
    'Thank you. Our team will get back to you soon.': 'धन्यवाद. आमची टीम लवकरच तुमच्याशी संपर्क साधेल.',
    'Send another message': 'दुसरा संदेश पाठवा',
    'Select a subject': 'विषय निवडा',
    'General enquiry': 'सामान्य चौकशी',
    'Appointments': 'अपॉइंटमेंट',
    'Donations': 'देणग्या',
    'Volunteer': 'स्वयंसेवक',
    'I agree to be contacted by the trust for my inquiry.': 'माझ्या चौकशीसाठी ट्रस्टने माझ्याशी संपर्क साधण्यास मी सहमत आहे.',
    'Visit our integrated healthcare facility. Get directions, view details or navigate directly from your mobile device.': 'आमच्या एकात्मिक आरोग्य सुविधेला भेट द्या. दिशा मिळवा, तपशील पाहा किंवा मोबाइलवरून थेट मार्ग शोधा.',
    'View on Map': 'नकाशावर पहा',
    'Get Directions': 'दिशा मिळवा',
    'Our team will be happy to guide you with this request. Please contact us for the latest details.': 'या विनंतीसाठी मार्गदर्शन करताना आमच्या टीमला आनंद होईल. ताज्या माहितीसाठी कृपया संपर्क साधा.',
    'General Enquiries': 'सामान्य चौकशी',
    'Appointments (Ayurvedic)': 'अपॉइंटमेंट (आयुर्वेदिक)',
    'Appointments (Allopathic)': 'अपॉइंटमेंट (एलोपॅथिक)',
    'Diagnostics (Nidaan Kendra)': 'निदान केंद्र तपासणी',
    'Donations & CSR': 'देणगी आणि CSR',
    'A glimpse of our hospitals, construction updates, health camps, community initiatives and important events.': 'आमची रुग्णालये, बांधकाम अद्यतने, आरोग्य शिबिरे, सामुदायिक उपक्रम आणि महत्त्वाच्या कार्यक्रमांची झलक.',
    'Browse all hospital videos and photos. Hover over a photo to see its filename.': 'रुग्णालयाचे सर्व व्हिडिओ आणि फोटो पाहा. फाइलचे नाव पाहण्यासाठी फोटोवर जा.',
    'Close preview': 'पूर्वावलोकन बंद करा',
    'Play': 'चालवा',
    'Choose where your contribution should help.': 'तुमची देणगी कुठे उपयोगी पडावी ते निवडा.',
    'Your donation of': 'तुमची देणगी',
    'has been recorded. A confirmation has been prepared for': 'नोंदवली आहे. पुष्टी संदेश तयार आहे:',
    'Use any UPI app to scan this code. Purpose:': 'हा कोड स्कॅन करण्यासाठी कोणतेही UPI ॲप वापरा. उद्देश:',
    'you@example.com': 'you@example.com',
  },
  KN: {
    'Three Sections.': 'ಮೂರು ವಿಭಾಗಗಳು.',
    'One Integrated Care.': 'ಒಂದೇ ಸಮಗ್ರ ಆರೈಕೆ.',
    'Traditional wisdom, modern medicine and advanced diagnostics coming together for a healthier society.': 'ಆರೋಗ್ಯಕರ ಸಮಾಜಕ್ಕಾಗಿ ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನ, ಆಧುನಿಕ ವೈದ್ಯಕೀಯ ಮತ್ತು ಸುಧಾರಿತ ರೋಗನಿರ್ಣಯದ ಸಂಗಮ.',
    'Holistic': 'ಸಮಗ್ರ',
    'Approach': 'ವಿಧಾನ',
    'Affordable': 'ಕೈಗೆಟುಕುವ',
    'for All': 'ಎಲ್ಲರಿಗೂ',
    'Focused': 'ಕೇಂದ್ರಿತ',
    'Vidyasagar Maharaj’s': 'ವಿದ್ಯಾಸಾಗರ ಮಹಾರಾಜರ',
    'Vision in Action': 'ಕಾರ್ಯರೂಪದಲ್ಲಿರುವ ದೃಷ್ಟಿ',
    'An integrated healthcare initiative with three complementary sections to provide complete and compassionate care.': 'ಸಂಪೂರ್ಣ ಮತ್ತು ಕರುಣೆಯ ಆರೈಕೆ ಒದಗಿಸಲು ಮೂರು ಪೂರಕ ವಿಭಾಗಗಳ ಸಮಗ್ರ ಆರೋಗ್ಯ ಉಪಕ್ರಮ.',
    'Key Services': 'ಪ್ರಮುಖ ಸೇವೆಗಳು',
    'Our Practitioners': 'ನಮ್ಮ ವೈದ್ಯರು',
    'Book Appointment': 'ನೇಮಕಾತಿ ಕಾಯ್ದಿರಿಸಿ',
    'You will be redirected to email with selected doctor details.': 'ಆಯ್ಕೆಮಾಡಿದ ವೈದ್ಯರ ವಿವರಗಳೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಇಮೇಲ್‌ಗೆ ಕರೆದೊಯ್ಯಲಾಗುತ್ತದೆ.',
    'Integrated Sections': 'ಸಮಗ್ರ ವಿಭಾಗಗಳು',
    'Complete': 'ಸಂಪೂರ್ಣ',
    'Healthcare Ecosystem': 'ಆರೋಗ್ಯ ಸೇವಾ ವ್ಯವಸ್ಥೆ',
    'Preventive': 'ತಡೆಗಟ್ಟುವ',
    'Modern': 'ಆಧುನಿಕ',
    'Infrastructure': 'ಮೂಲಸೌಕರ್ಯ',
    'Latest News & Events': 'ಇತ್ತೀಚಿನ ಸುದ್ದಿ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು',
    'Stay updated with our health camps, awareness programs and upcoming events.': 'ನಮ್ಮ ಆರೋಗ್ಯ ಶಿಬಿರಗಳು, ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.',
    'Subscribe to Our Newsletter': 'ನಮ್ಮ ಸುದ್ದಿಪತ್ರಕ್ಕೆ ಚಂದಾದಾರರಾಗಿ',
    'Get the latest updates on our hospitals, events and community initiatives.': 'ನಮ್ಮ ಆಸ್ಪತ್ರೆಗಳು, ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಮುದಾಯ ಉಪಕ್ರಮಗಳ ಇತ್ತೀಚಿನ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.',
    'Vidyasagar Ayurvedic Chikitsalaya Trust is an initiative inspired by the teachings of Acharyashree Vidyasagar Maharaj, with a mission to provide accessible, authentic and holistic healthcare for every individual, guided by the principles of Seva, Swasthya and Sanskar.': 'ವಿದ್ಯಾಸಾಗರ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ ಟ್ರಸ್ಟ್ ಆಚಾರ್ಯಶ್ರೀ ವಿದ್ಯಾಸಾಗರ ಮಹಾರಾಜರ ಬೋಧನೆಗಳಿಂದ ಪ್ರೇರಿತ ಉಪಕ್ರಮವಾಗಿದೆ. ಸೇವಾ, ಸ್ವಾಸ್ಥ್ಯ ಮತ್ತು ಸಂಸ್ಕಾರದ ತತ್ವಗಳೊಂದಿಗೆ ಎಲ್ಲರಿಗೂ ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವ, ಅಧಿಕೃತ ಮತ್ತು ಸಮಗ್ರ ಆರೋಗ್ಯ ಸೇವೆ ಒದಗಿಸುವುದು ಇದರ ಧ್ಯೇಯ.',
    'Service to Society': 'ಸಮಾಜ ಸೇವೆ',
    'Health for All': 'ಎಲ್ಲರಿಗೂ ಆರೋಗ್ಯ',
    'Values for a Better Tomorrow': 'ಉತ್ತಮ ನಾಳೆಗಾಗಿ ಮೌಲ್ಯಗಳು',
    'His teachings of compassion, simplicity and service to humanity inspire our mission to build a healthier and more harmonious society.': 'ಕರುಣೆ, ಸರಳತೆ ಮತ್ತು ಮಾನವ ಸೇವೆಯ ಅವರ ಬೋಧನೆಗಳು ಆರೋಗ್ಯಕರ ಮತ್ತು ಸಾಮರಸ್ಯದ ಸಮಾಜ ನಿರ್ಮಿಸುವ ನಮ್ಮ ಧ್ಯೇಯಕ್ಕೆ ಪ್ರೇರಣೆ ನೀಡುತ್ತವೆ.',
    'A symbol of strength, self-discipline and universal welfare, guiding us towards holistic care and compassionate medical services for all.': 'ಶಕ್ತಿ, ಸ್ವಯಂ ಶಿಸ್ತು ಮತ್ತು ಸಾರ್ವತ್ರಿಕ ಕಲ್ಯಾಣದ ಸಂಕೇತ; ಎಲ್ಲರಿಗೂ ಸಮಗ್ರ ಆರೈಕೆ ಮತ್ತು ಕರುಣೆಯ ವೈದ್ಯಕೀಯ ಸೇವೆಗೆ ದಾರಿ ತೋರಿಸುತ್ತದೆ.',
    'His vision of knowledge, diagnosis and awareness inspires our Nidaan Kendra to promote early detection and preventive healthcare.': 'ಜ್ಞಾನ, ರೋಗನಿರ್ಣಯ ಮತ್ತು ಜಾಗೃತಿಯ ಅವರ ದೃಷ್ಟಿ ನಮ್ಮ ನಿಧಾನ ಕೇಂದ್ರಕ್ಕೆ ಆರಂಭಿಕ ಪತ್ತೆ ಮತ್ತು ತಡೆಗಟ್ಟುವ ಆರೋಗ್ಯ ಸೇವೆ ಉತ್ತೇಜಿಸಲು ಪ್ರೇರಣೆ ನೀಡುತ್ತದೆ.',
    'To provide accessible, affordable and authentic healthcare inspired by the teachings of our Acharyas, promoting holistic well-being and service to society.': 'ನಮ್ಮ ಆಚಾರ್ಯರ ಬೋಧನೆಗಳಿಂದ ಪ್ರೇರಿತ ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವ, ಕೈಗೆಟುಕುವ ಮತ್ತು ಅಧಿಕೃತ ಆರೋಗ್ಯ ಸೇವೆ ನೀಡಿ ಸಮಗ್ರ ಯೋಗಕ್ಷೇಮ ಮತ್ತು ಸಮಾಜ ಸೇವೆಯನ್ನು ಉತ್ತೇಜಿಸುವುದು.',
    'A healthier society with integrated Ayurveda, modern medicine and advanced diagnostics, ensuring quality care for every individual.': 'ಸಮಗ್ರ ಆಯುರ್ವೇದ, ಆಧುನಿಕ ವೈದ್ಯಕೀಯ ಮತ್ತು ಸುಧಾರಿತ ರೋಗನಿರ್ಣಯದ ಮೂಲಕ ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಗುಣಮಟ್ಟದ ಆರೈಕೆ ಒದಗಿಸುವ ಆರೋಗ್ಯಕರ ಸಮಾಜ.',
    'We Are Here': 'ನಾವು ಇಲ್ಲಿದ್ದೇವೆ',
    'for a Healthier Tomorrow': 'ಆರೋಗ್ಯಕರ ನಾಳೆಗಾಗಿ',
    'For inquiries, support, collaborations, donations or any information about our hospitals and community initiatives, feel free to reach out to us. We are always happy to hear from you.': 'ವಿಚಾರಣೆ, ಬೆಂಬಲ, ಸಹಯೋಗ, ದೇಣಿಗೆ ಅಥವಾ ನಮ್ಮ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ಸಮುದಾಯ ಉಪಕ್ರಮಗಳ ಮಾಹಿತಿ ಬೇಕಿದ್ದರೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ. ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಮಗೆ ಸಂತೋಷ.',
    'For Society': 'ಸಮಾಜಕ್ಕಾಗಿ',
    'Mon – Sat': 'ಸೋಮ – ಶನಿ',
    'We usually respond': 'ನಾವು ಸಾಮಾನ್ಯವಾಗಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ',
    'within 24 hours.': '24 ಗಂಟೆಗಳೊಳಗೆ.',
    'Open for visitors': 'ಭೇಟಿದಾರರಿಗೆ ತೆರೆದಿದೆ',
    'For Donations & CSR': 'ದೇಣಿಗೆ ಮತ್ತು CSR ಗಾಗಿ',
    'Know More': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
    'Have a question or need more information? Fill out the form below and our team will get back to you.': 'ಪ್ರಶ್ನೆಯಿದೆಯೇ ಅಥವಾ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಬೇಕೇ? ಕೆಳಗಿನ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ, ನಮ್ಮ ತಂಡ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
    'Message sent successfully': 'ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ',
    'Thank you. Our team will get back to you soon.': 'ಧನ್ಯವಾದಗಳು. ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
    'Send another message': 'ಮತ್ತೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ',
    'Select a subject': 'ವಿಷಯ ಆಯ್ಕೆಮಾಡಿ',
    'General enquiry': 'ಸಾಮಾನ್ಯ ವಿಚಾರಣೆ',
    'Appointments': 'ನೇಮಕಾತಿಗಳು',
    'Donations': 'ದೇಣಿಗೆಗಳು',
    'Volunteer': 'ಸ್ವಯಂಸೇವಕ',
    'I agree to be contacted by the trust for my inquiry.': 'ನನ್ನ ವಿಚಾರಣೆಗಾಗಿ ಟ್ರಸ್ಟ್ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.',
    'Visit our integrated healthcare facility. Get directions, view details or navigate directly from your mobile device.': 'ನಮ್ಮ ಸಮಗ್ರ ಆರೋಗ್ಯ ಸೌಲಭ್ಯಕ್ಕೆ ಭೇಟಿ ನೀಡಿ. ದಾರಿ ಪಡೆಯಿರಿ, ವಿವರಗಳನ್ನು ನೋಡಿ ಅಥವಾ ಮೊಬೈಲ್‌ನಿಂದ ನೇರವಾಗಿ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ.',
    'View on Map': 'ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
    'Get Directions': 'ದಾರಿ ಪಡೆಯಿರಿ',
    'Our team will be happy to guide you with this request. Please contact us for the latest details.': 'ಈ ವಿನಂತಿಯಲ್ಲಿ ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ನಮ್ಮ ತಂಡ ಸಂತೋಷಿಸುತ್ತದೆ. ಇತ್ತೀಚಿನ ವಿವರಗಳಿಗಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    'General Enquiries': 'ಸಾಮಾನ್ಯ ವಿಚಾರಣೆಗಳು',
    'Appointments (Ayurvedic)': 'ನೇಮಕಾತಿಗಳು (ಆಯುರ್ವೇದ)',
    'Appointments (Allopathic)': 'ನೇಮಕಾತಿಗಳು (ಅಲೋಪಥಿ)',
    'Diagnostics (Nidaan Kendra)': 'ನಿದಾನ ಕೇಂದ್ರ ಪರೀಕ್ಷೆಗಳು',
    'Donations & CSR': 'ದೇಣಿಗೆ ಮತ್ತು CSR',
    'A glimpse of our hospitals, construction updates, health camps, community initiatives and important events.': 'ನಮ್ಮ ಆಸ್ಪತ್ರೆಗಳು, ನಿರ್ಮಾಣದ ಮಾಹಿತಿ, ಆರೋಗ್ಯ ಶಿಬಿರಗಳು, ಸಮುದಾಯ ಉಪಕ್ರಮಗಳು ಮತ್ತು ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮಗಳ ಒಂದು ನೋಟ.',
    'Browse all hospital videos and photos. Hover over a photo to see its filename.': 'ಆಸ್ಪತ್ರೆಯ ಎಲ್ಲಾ ವೀಡಿಯೊಗಳು ಮತ್ತು ಫೋಟೋಗಳನ್ನು ನೋಡಿ. ಫೈಲ್ ಹೆಸರು ನೋಡಲು ಫೋಟೋ ಮೇಲೆ ಕರ್ಸರ್ ಇರಿಸಿ.',
    'Close preview': 'ಮುನ್ನೋಟ ಮುಚ್ಚಿ',
    'Play': 'ಚಲಾಯಿಸಿ',
    'Choose where your contribution should help.': 'ನಿಮ್ಮ ಕೊಡುಗೆ ಎಲ್ಲಿ ಸಹಾಯ ಮಾಡಬೇಕು ಎಂದು ಆಯ್ಕೆಮಾಡಿ.',
    'Your donation of': 'ನಿಮ್ಮ ದೇಣಿಗೆ',
    'has been recorded. A confirmation has been prepared for': 'ದಾಖಲಾಗಿದೆ. ದೃಢೀಕರಣವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ:',
    'Use any UPI app to scan this code. Purpose:': 'ಈ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಯಾವುದೇ UPI ಅಪ್ಲಿಕೇಶನ್ ಬಳಸಿ. ಉದ್ದೇಶ:',
    'you@example.com': 'you@example.com',
  },
};

const moreTranslations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'Saint Shiromani Param Pooja 108 Acharya Shri Vidyasagar Maharaj Ayurvedic Chikitsalaya': 'संत शिरोमणि परम पूज्य १०८ आचार्य श्री विद्यासागर महाराज आयुर्वेदिक चिकित्सालय',
    'Acharya Ratna Param Pooja 108 Bahubali Maharaj Allopathic Chikitsalaya': 'आचार्य रत्न परम पूज्य १०८ बाहुबली महाराज एलोपैथिक चिकित्सालय',
    'Shant-Murti Param Pooja 108 Acharyashree Sanmati Sagarji Maharaj Nidaan Kendra': 'शांत-मूर्ति परम पूज्य १०८ आचार्यश्री सन्मति सागरजी महाराज निदान केंद्र',
    'Saint Shiromani Param Pooja 108 Acharya Shri Vidyasagar Maharaj': 'संत शिरोमणि परम पूज्य १०८ आचार्य श्री विद्यासागर महाराज',
    'Acharya Ratna Param Pooja 108 Bahubali Maharaj': 'आचार्य रत्न परम पूज्य १०८ बाहुबली महाराज',
    'Shant-Murti Param Pooja 108 Acharyashree Sanmati Sagarji Maharaj': 'शांत-मूर्ति परम पूज्य १०८ आचार्यश्री सन्मति सागरजी महाराज',
    'Vidyasagar Maharaj': 'विद्यासागर महाराज',
    'Acharyashree': 'आचार्यश्री',
    'Three complementary sections, one unified healthcare initiative': 'तीन पूरक विभाग, एक एकीकृत स्वास्थ्य सेवा पहल',
    'Inspired by Timeless Values': 'शाश्वत मूल्यों से प्रेरित',
    'Building a healthier tomorrow through service, knowledge and care.': 'सेवा, ज्ञान और देखभाल के माध्यम से स्वस्थ कल का निर्माण।',
    'Guided by experienced professionals and well-wishers, our advisory board supports our mission.': 'अनुभवी पेशेवरों और शुभचिंतकों के मार्गदर्शन में हमारा सलाहकार मंडल हमारे मिशन का समर्थन करता है।',
    'Working together for a healthier and more compassionate society.': 'स्वस्थ और अधिक करुणामय समाज के लिए मिलकर कार्य करना।',
    'Health Camps': 'स्वास्थ्य शिविर',
    'Free medical checkups and awareness programs': 'निःशुल्क चिकित्सा जाँच और जागरूकता कार्यक्रम',
    'Patient Support': 'रोगी सहायता',
    'Guidance and support for underprivileged patients': 'वंचित रोगियों के लिए मार्गदर्शन और सहायता',
    'Health Education': 'स्वास्थ्य शिक्षा',
    'Awareness programs on preventive healthcare': 'निवारक स्वास्थ्य सेवा पर जागरूकता कार्यक्रम',
    'Healthy Communities': 'स्वस्थ समुदाय',
    'Stronger Tomorrows': 'सशक्त भविष्य',
    '(Construction / Development)': '(निर्माण / विकास)',
    'Support the development of purposeful facilities for a better healthcare ecosystem.': 'बेहतर स्वास्थ्य सेवा प्रणाली के लिए उपयोगी सुविधाओं के विकास में सहयोग करें।',
    'View All Projects': 'सभी परियोजनाएँ देखें',
    'Main Hospital Building': 'मुख्य अस्पताल भवन',
    'Patient Facility Block': 'रोगी सुविधा खंड',
    'Research & Training Center': 'अनुसंधान और प्रशिक्षण केंद्र',
    'Contribution in Progress': 'योगदान जारी है',
    'Contribute': 'योगदान दें',
    'Chairman': 'अध्यक्ष',
    'Member': 'सदस्य',
    'Traditional wisdom, modern medicine and advanced diagnostics coming together for a healthier society.': 'स्वस्थ समाज के लिए पारंपरिक ज्ञान, आधुनिक चिकित्सा और उन्नत निदान का संगम।',
    'One Integrated Care.': 'एकीकृत स्वास्थ्य सेवा।',
    'Explore the services and care pathway planned for our community.': 'हमारे समुदाय के लिए नियोजित सेवाओं और उपचार प्रक्रिया को जानें।',
    'Our integrated healthcare approach brings compassionate service, trusted guidance and accessible care together under one roof.': 'हमारा एकीकृत स्वास्थ्य दृष्टिकोण करुणामय सेवा, विश्वसनीय मार्गदर्शन और सुलभ देखभाल को एक ही स्थान पर उपलब्ध कराता है।',
    'Maharashtra – India': 'महाराष्ट्र – भारत',
    'Donate': 'दान करें',
    'CSR / Donations': 'CSR / दान',
    'Become a Volunteer': 'स्वयंसेवक बनें',
    'Community Initiatives': 'सामुदायिक पहल',
    'All Rights Reserved.': 'सर्वाधिकार सुरक्षित।',
    'Designed by': 'निर्माता',
    'Social media links': 'सोशल मीडिया लिंक',
    'Choose language': 'भाषा चुनें',
    'Toggle navigation': 'नेविगेशन टॉगल करें',
    'More Photos': 'और तस्वीरें',
    'July 2026': 'जुलाई 2026',
    'Event': 'कार्यक्रम',
    'Video': 'वीडियो',
    'Photo': 'तस्वीर',
    'Play Video': 'वीडियो चलाएँ',
    'Open': 'खोलें',
    'Close preview': 'पूर्वावलोकन बंद करें',
    'What are the visiting hours?': 'आने-जाने का समय क्या है?',
    'How can I book an appointment?': 'मैं अपॉइंटमेंट कैसे बुक कर सकता/सकती हूँ?',
    'Can I support the trust through donations?': 'क्या मैं दान के माध्यम से ट्रस्ट का सहयोग कर सकता/सकती हूँ?',
    'Where is the hospital located?': 'अस्पताल कहाँ स्थित है?',
    '123, Trust Road, City, Maharashtra': '123, ट्रस्ट रोड, शहर, महाराष्ट्र',
    '123, Trust Road, City,': '123, ट्रस्ट रोड, शहर,',
    'City, Maharashtra – India': 'शहर, महाराष्ट्र – भारत',
    'Your donation of ': 'आपका दान ',
    ' for ': ' के लिए ',
    ' has been recorded. A confirmation has been prepared for ': ' दर्ज कर लिया गया है। पुष्टि संदेश तैयार है: ',
    'Enter your mobile number': 'अपना मोबाइल नंबर दर्ज करें',
    'Write your message here...': 'अपना संदेश यहाँ लिखें...',
    'Trust Road, City, Maharashtra – India': 'ट्रस्ट रोड, शहर, महाराष्ट्र – भारत',
    'Vidyasagar Ayurvedic Chikitsalaya Trust home': 'विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्ट मुखपृष्ठ',
    'Vidyasagar Ayurvedic Chikitsalaya Trust logo': 'विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्ट का लोगो',
    'Vidyasanmatidas Original Trust home': 'विद्यासन्मतिदास मूल ट्रस्ट मुखपृष्ठ',
    'Vidyasanmatidas Original Trust logo': 'विद्यासन्मतिदास मूल ट्रस्ट का लोगो',
    'Allopathic': 'एलोपैथिक',
    'Ayurveda': 'आयुर्वेद',
    'Nidaan Kendra': 'निदान केंद्र',
    'Annadan': 'अन्नदान',
    'Ayurvedic Chikitsalaya': 'आयुर्वेदिक चिकित्सालय',
    'Allopathic Chikitsalaya': 'एलोपैथिक चिकित्सालय',
    'Video 4': 'वीडियो 4',
    'Hospital initiative': 'अस्पताल पहल',
    'Our journey': 'हमारी यात्रा',
    'Community moments': 'सामुदायिक झलकियाँ',
    'Hospital update': 'अस्पताल अपडेट',
    'Shilannyas': 'शिलान्यास',
    'Save Receipt': 'रसीद सहेजें',
    'Close donation form': 'दान फ़ॉर्म बंद करें',
    'Zoom in': 'ज़ूम इन',
    'Zoom out': 'ज़ूम आउट',
    'Seva': 'सेवा',
    'Swasthya': 'स्वास्थ्य',
    'Sanskar': 'संस्कार',
    'Compassion': 'करुणा',
    'Integrity': 'ईमानदारी',
    'Sustainability': 'स्थिरता',
    'Ayurveda Expert': 'आयुर्वेद विशेषज्ञ',
    'Panchakarma': 'पंचकर्म',
    'Wellness Expert': 'स्वास्थ्य विशेषज्ञ',
    'General Physician': 'सामान्य चिकित्सक',
    'Specialist': 'विशेषज्ञ',
    'Family Medicine': 'पारिवारिक चिकित्सा',
    'Pathology': 'पैथोलॉजी',
    'Radiology': 'रेडियोलॉजी',
    'Diagnostics': 'निदान',
  },
  MR: {
    'Saint Shiromani Param Pooja 108 Acharya Shri Vidyasagar Maharaj Ayurvedic Chikitsalaya': 'संत शिरोमणी परम पूज्य १०८ आचार्य श्री विद्यासागर महाराज आयुर्वेदिक चिकित्सालय',
    'Acharya Ratna Param Pooja 108 Bahubali Maharaj Allopathic Chikitsalaya': 'आचार्य रत्न परम पूज्य १०८ बाहुबली महाराज एलोपॅथिक चिकित्सालय',
    'Shant-Murti Param Pooja 108 Acharyashree Sanmati Sagarji Maharaj Nidaan Kendra': 'शांत-मूर्ती परम पूज्य १०८ आचार्यश्री सन्मती सागरजी महाराज निदान केंद्र',
    'Saint Shiromani Param Pooja 108 Acharya Shri Vidyasagar Maharaj': 'संत शिरोमणी परम पूज्य १०८ आचार्य श्री विद्यासागर महाराज',
    'Acharya Ratna Param Pooja 108 Bahubali Maharaj': 'आचार्य रत्न परम पूज्य १०८ बाहुबली महाराज',
    'Shant-Murti Param Pooja 108 Acharyashree Sanmati Sagarji Maharaj': 'शांत-मूर्ती परम पूज्य १०८ आचार्यश्री सन्मती सागरजी महाराज',
    'Vidyasagar Maharaj': 'विद्यासागर महाराज',
    'Acharyashree': 'आचार्यश्री',
    'Three complementary sections, one unified healthcare initiative': 'तीन पूरक विभाग, एकात्मिक आरोग्य उपक्रम',
    'Inspired by Timeless Values': 'शाश्वत मूल्यांपासून प्रेरित',
    'Building a healthier tomorrow through service, knowledge and care.': 'सेवा, ज्ञान आणि काळजीतून निरोगी उद्याची निर्मिती.',
    'Guided by experienced professionals and well-wishers, our advisory board supports our mission.': 'अनुभवी व्यावसायिक आणि हितचिंतकांच्या मार्गदर्शनाखाली आमचे सल्लागार मंडळ ध्येयाला पाठिंबा देते.',
    'Working together for a healthier and more compassionate society.': 'निरोगी आणि अधिक करुणामय समाजासाठी एकत्र काम करूया.',
    'Health Camps': 'आरोग्य शिबिरे',
    'Free medical checkups and awareness programs': 'मोफत वैद्यकीय तपासणी आणि जनजागृती कार्यक्रम',
    'Patient Support': 'रुग्ण सहाय्य',
    'Guidance and support for underprivileged patients': 'वंचित रुग्णांसाठी मार्गदर्शन आणि मदत',
    'Health Education': 'आरोग्य शिक्षण',
    'Awareness programs on preventive healthcare': 'प्रतिबंधात्मक आरोग्यसेवेबाबत जनजागृती कार्यक्रम',
    'Healthy Communities': 'निरोगी समुदाय',
    'Stronger Tomorrows': 'सशक्त उद्य',
    '(Construction / Development)': '(बांधकाम / विकास)',
    'Support the development of purposeful facilities for a better healthcare ecosystem.': 'उत्तम आरोग्यसेवा व्यवस्थेसाठी उपयुक्त सुविधांच्या विकासाला पाठिंबा द्या.',
    'View All Projects': 'सर्व प्रकल्प पहा',
    'Main Hospital Building': 'मुख्य रुग्णालय इमारत',
    'Patient Facility Block': 'रुग्ण सुविधा विभाग',
    'Research & Training Center': 'संशोधन आणि प्रशिक्षण केंद्र',
    'Contribution in Progress': 'योगदान सुरू आहे',
    'Contribute': 'योगदान द्या',
    'Chairman': 'अध्यक्ष',
    'Member': 'सदस्य',
    'Explore the services and care pathway planned for our community.': 'आमच्या समुदायासाठी नियोजित सेवा आणि उपचार पद्धती जाणून घ्या.',
    'Our integrated healthcare approach brings compassionate service, trusted guidance and accessible care together under one roof.': 'आमचा एकात्मिक आरोग्य दृष्टिकोन करुणामय सेवा, विश्वासार्ह मार्गदर्शन आणि सुलभ काळजी एकाच ठिकाणी उपलब्ध करून देतो.',
    'Maharashtra – India': 'महाराष्ट्र – भारत',
    'Donate': 'देणगी द्या',
    'CSR / Donations': 'CSR / देणग्या',
    'Become a Volunteer': 'स्वयंसेवक व्हा',
    'Community Initiatives': 'सामुदायिक उपक्रम',
    'All Rights Reserved.': 'सर्व हक्क राखीव.',
    'Designed by': 'रचना',
    'Social media links': 'सोशल मीडिया दुवे',
    'Choose language': 'भाषा निवडा',
    'Toggle navigation': 'नेव्हिगेशन उघडा/बंद करा',
    'More Photos': 'अधिक फोटो',
    'July 2026': 'जुलै २०२६',
    'Event': 'कार्यक्रम',
    'Video': 'व्हिडिओ',
    'Photo': 'फोटो',
    'Play Video': 'व्हिडिओ चालवा',
    'Open': 'उघडा',
    'Close preview': 'पूर्वावलोकन बंद करा',
    'What are the visiting hours?': 'भेटीची वेळ काय आहे?',
    'How can I book an appointment?': 'अपॉइंटमेंट कशी नोंदवू शकतो/शकते?',
    'Can I support the trust through donations?': 'देणगीद्वारे ट्रस्टला मदत करू शकतो/शकते का?',
    'Where is the hospital located?': 'रुग्णालय कुठे आहे?',
    '123, Trust Road, City, Maharashtra': '१२३, ट्रस्ट रोड, शहर, महाराष्ट्र',
    '123, Trust Road, City,': '१२३, ट्रस्ट रोड, शहर,',
    'City, Maharashtra – India': 'शहर, महाराष्ट्र – भारत',
    'Your donation of ': 'तुमची देणगी ',
    ' for ': ' यासाठी ',
    ' has been recorded. A confirmation has been prepared for ': ' नोंदवली आहे. पुष्टी संदेश तयार आहे: ',
    'Enter your mobile number': 'तुमचा मोबाइल क्रमांक लिहा',
    'Write your message here...': 'तुमचा संदेश येथे लिहा...',
    'Trust Road, City, Maharashtra – India': 'ट्रस्ट रोड, शहर, महाराष्ट्र – भारत',
    'Vidyasagar Ayurvedic Chikitsalaya Trust home': 'विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्ट मुख्यपृष्ठ',
    'Vidyasagar Ayurvedic Chikitsalaya Trust logo': 'विद्यासागर आयुर्वेदिक चिकित्सालय ट्रस्टचे चिन्ह',
    'Vidyasanmatidas Original Trust home': 'विद्यासन्मतिदास मूळ ट्रस्ट मुख्यपृष्ठ',
    'Vidyasanmatidas Original Trust logo': 'विद्यासन्मतिदास मूळ ट्रस्टचे चिन्ह',
    'Allopathic': 'एलोपॅथिक',
    'Ayurveda': 'आयुर्वेद',
    'Nidaan Kendra': 'निदान केंद्र',
    'Annadan': 'अन्नदान',
    'Allopathic Chikitsalaya': 'एलोपॅथिक चिकित्सालय',
    'Video 4': 'व्हिडिओ ४',
    'Hospital initiative': 'रुग्णालयीन उपक्रम',
    'Our journey': 'आमचा प्रवास',
    'Community moments': 'सामुदायिक क्षण',
    'Hospital update': 'रुग्णालय अपडेट',
    'Shilannyas': 'भूमिपूजन',
    'Close donation form': 'देणगी फॉर्म बंद करा',
    'Zoom in': 'मोठे करा',
    'Zoom out': 'लहान करा',
    'Seva': 'सेवा',
    'Swasthya': 'स्वास्थ्य',
    'Sanskar': 'संस्कार',
    'Compassion': 'करुणा',
    'Integrity': 'प्रामाणिकपणा',
    'Sustainability': 'शाश्वतता',
    'Ayurveda Expert': 'आयुर्वेद तज्ज्ञ',
    'Panchakarma': 'पंचकर्म',
    'Wellness Expert': 'आरोग्य तज्ज्ञ',
    'General Physician': 'सामान्य वैद्य',
    'Specialist': 'तज्ज्ञ',
    'Family Medicine': 'कौटुंबिक वैद्यक',
    'Pathology': 'पॅथॉलॉजी',
    'Radiology': 'रेडिओलॉजी',
    'Diagnostics': 'निदान',
  },
  KN: {
    'Saint Shiromani Param Pooja 108 Acharya Shri Vidyasagar Maharaj Ayurvedic Chikitsalaya': 'ಸಂತ ಶಿರೋಮಣಿ ಪರಮ ಪೂಜ್ಯ ೧೦೮ ಆಚಾರ್ಯ ಶ್ರೀ ವಿದ್ಯಾಸಾಗರ ಮಹಾರಾಜ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ',
    'Acharya Ratna Param Pooja 108 Bahubali Maharaj Allopathic Chikitsalaya': 'ಆಚಾರ್ಯ ರತ್ನ ಪರಮ ಪೂಜ್ಯ ೧೦೮ ಬಾಹುಬಲಿ ಮಹಾರಾಜ ಅಲೋಪಥಿ ಚಿಕಿತ್ಸಾಲಯ',
    'Shant-Murti Param Pooja 108 Acharyashree Sanmati Sagarji Maharaj Nidaan Kendra': 'ಶಾಂತ-ಮೂರ್ತಿ ಪರಮ ಪೂಜ್ಯ ೧೦೮ ಆಚಾರ್ಯಶ್ರೀ ಸನ್ಮತಿ ಸಾಗರಜಿ ಮಹಾರಾಜರ ನಿಧಾನ ಕೇಂದ್ರ',
    'Saint Shiromani Param Pooja 108 Acharya Shri Vidyasagar Maharaj': 'ಸಂತ ಶಿರೋಮಣಿ ಪರಮ ಪೂಜ್ಯ ೧೦೮ ಆಚಾರ್ಯ ಶ್ರೀ ವಿದ್ಯಾಸಾಗರ ಮಹಾರಾಜ',
    'Acharya Ratna Param Pooja 108 Bahubali Maharaj': 'ಆಚಾರ್ಯ ರತ್ನ ಪರಮ ಪೂಜ್ಯ ೧೦೮ ಬಾಹುಬಲಿ ಮಹಾರಾಜ',
    'Shant-Murti Param Pooja 108 Acharyashree Sanmati Sagarji Maharaj': 'ಶಾಂತ-ಮೂರ್ತಿ ಪರಮ ಪೂಜ್ಯ ೧೦೮ ಆಚಾರ್ಯಶ್ರೀ ಸನ್ಮತಿ ಸಾಗರಜಿ ಮಹಾರಾಜ',
    'Vidyasagar Maharaj': 'ವಿದ್ಯಾಸಾಗರ ಮಹಾರಾಜ',
    'Acharyashree': 'ಆಚಾರ್ಯಶ್ರೀ',
    'Three complementary sections, one unified healthcare initiative': 'ಮೂರು ಪೂರಕ ವಿಭಾಗಗಳು, ಒಂದೇ ಸಮಗ್ರ ಆರೋಗ್ಯ ಉಪಕ್ರಮ',
    'Inspired by Timeless Values': 'ಶಾಶ್ವತ ಮೌಲ್ಯಗಳಿಂದ ಪ್ರೇರಿತ',
    'Building a healthier tomorrow through service, knowledge and care.': 'ಸೇವೆ, ಜ್ಞಾನ ಮತ್ತು ಆರೈಕೆಯ ಮೂಲಕ ಆರೋಗ್ಯಕರ ನಾಳೆಯನ್ನು ನಿರ್ಮಿಸುವುದು.',
    'Guided by experienced professionals and well-wishers, our advisory board supports our mission.': 'ಅನುಭವಿ ವೃತ್ತಿಪರರು ಮತ್ತು ಹಿತೈಷಿಗಳ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ನಮ್ಮ ಸಲಹಾ ಮಂಡಳಿ ನಮ್ಮ ಧ್ಯೇಯಕ್ಕೆ ಬೆಂಬಲ ನೀಡುತ್ತದೆ.',
    'Working together for a healthier and more compassionate society.': 'ಆರೋಗ್ಯಕರ ಮತ್ತು ಹೆಚ್ಚು ಕರುಣೆಯ ಸಮಾಜಕ್ಕಾಗಿ ಒಟ್ಟಾಗಿ ಕೆಲಸ ಮಾಡೋಣ.',
    'Health Camps': 'ಆರೋಗ್ಯ ಶಿಬಿರಗಳು',
    'Free medical checkups and awareness programs': 'ಉಚಿತ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆ ಮತ್ತು ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು',
    'Patient Support': 'ರೋಗಿಗಳ ಬೆಂಬಲ',
    'Guidance and support for underprivileged patients': 'ಅನಾನುಕೂಲ ರೋಗಿಗಳಿಗೆ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಬೆಂಬಲ',
    'Health Education': 'ಆರೋಗ್ಯ ಶಿಕ್ಷಣ',
    'Awareness programs on preventive healthcare': 'ತಡೆಗಟ್ಟುವ ಆರೋಗ್ಯ ಸೇವೆಯ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು',
    'Healthy Communities': 'ಆರೋಗ್ಯಕರ ಸಮುದಾಯಗಳು',
    'Stronger Tomorrows': 'ಬಲಿಷ್ಠ ನಾಳೆಗಳು',
    '(Construction / Development)': '(ನಿರ್ಮಾಣ / ಅಭಿವೃದ್ಧಿ)',
    'Support the development of purposeful facilities for a better healthcare ecosystem.': 'ಉತ್ತಮ ಆರೋಗ್ಯ ವ್ಯವಸ್ಥೆಗಾಗಿ ಉಪಯುಕ್ತ ಸೌಲಭ್ಯಗಳ ಅಭಿವೃದ್ಧಿಗೆ ಬೆಂಬಲ ನೀಡಿ.',
    'View All Projects': 'ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    'Main Hospital Building': 'ಮುಖ್ಯ ಆಸ್ಪತ್ರೆ ಕಟ್ಟಡ',
    'Patient Facility Block': 'ರೋಗಿ ಸೌಲಭ್ಯ ವಿಭಾಗ',
    'Research & Training Center': 'ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಕೇಂದ್ರ',
    'Contribution in Progress': 'ಕೊಡುಗೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    'Contribute': 'ಕೊಡುಗೆ ನೀಡಿ',
    'Chairman': 'ಅಧ್ಯಕ್ಷರು',
    'Member': 'ಸದಸ್ಯರು',
    'Explore the services and care pathway planned for our community.': 'ನಮ್ಮ ಸಮುದಾಯಕ್ಕಾಗಿ ಯೋಜಿಸಲಾದ ಸೇವೆಗಳು ಮತ್ತು ಆರೈಕೆ ಮಾರ್ಗವನ್ನು ತಿಳಿಯಿರಿ.',
    'Our integrated healthcare approach brings compassionate service, trusted guidance and accessible care together under one roof.': 'ನಮ್ಮ ಸಮಗ್ರ ಆರೋಗ್ಯ ವಿಧಾನವು ಕರುಣೆಯ ಸೇವೆ, ವಿಶ್ವಾಸಾರ್ಹ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಸುಲಭ ಆರೈಕೆಯನ್ನು ಒಂದೇ ಸೂರಿನಡಿ ಒದಗಿಸುತ್ತದೆ.',
    'Maharashtra – India': 'ಮಹಾರಾಷ್ಟ್ರ – ಭಾರತ',
    'Donate': 'ದೇಣಿಗೆ ನೀಡಿ',
    'CSR / Donations': 'CSR / ದೇಣಿಗೆಗಳು',
    'Become a Volunteer': 'ಸ್ವಯಂಸೇವಕರಾಗಿ',
    'Community Initiatives': 'ಸಮುದಾಯ ಉಪಕ್ರಮಗಳು',
    'All Rights Reserved.': 'ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    'Designed by': 'ವಿನ್ಯಾಸ',
    'Social media links': 'ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ ಲಿಂಕ್‌ಗಳು',
    'Choose language': 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    'Toggle navigation': 'ನ್ಯಾವಿಗೇಶನ್ ತೋರಿಸಿ/ಮರೆಮಾಡಿ',
    'More Photos': 'ಇನ್ನಷ್ಟು ಫೋಟೋಗಳು',
    'July 2026': 'ಜುಲೈ 2026',
    'Event': 'ಕಾರ್ಯಕ್ರಮ',
    'Video': 'ವೀಡಿಯೊ',
    'Photo': 'ಫೋಟೋ',
    'Play Video': 'ವೀಡಿಯೊ ಚಲಾಯಿಸಿ',
    'Open': 'ತೆರೆಯಿರಿ',
    'Close preview': 'ಮುನ್ನೋಟ ಮುಚ್ಚಿ',
    'What are the visiting hours?': 'ಭೇಟಿ ಸಮಯ ಯಾವುದು?',
    'How can I book an appointment?': 'ನಾನು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಹೇಗೆ ಕಾಯ್ದಿರಿಸಬಹುದು?',
    'Can I support the trust through donations?': 'ದೇಣಿಗೆಗಳ ಮೂಲಕ ಟ್ರಸ್ಟ್‌ಗೆ ಬೆಂಬಲ ನೀಡಬಹುದೇ?',
    'Where is the hospital located?': 'ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?',
    '123, Trust Road, City, Maharashtra': '123, ಟ್ರಸ್ಟ್ ರಸ್ತೆ, ನಗರ, ಮಹಾರಾಷ್ಟ್ರ',
    '123, Trust Road, City,': '123, ಟ್ರಸ್ಟ್ ರಸ್ತೆ, ನಗರ,',
    'City, Maharashtra – India': 'ನಗರ, ಮಹಾರಾಷ್ಟ್ರ – ಭಾರತ',
    'Your donation of ': 'ನಿಮ್ಮ ದೇಣಿಗೆ ',
    ' for ': ' ಗಾಗಿ ',
    ' has been recorded. A confirmation has been prepared for ': ' ದಾಖಲಿಸಲಾಗಿದೆ. ದೃಢೀಕರಣ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ: ',
    'Enter your mobile number': 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    'Write your message here...': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
    'Trust Road, City, Maharashtra – India': 'ಟ್ರಸ್ಟ್ ರಸ್ತೆ, ನಗರ, ಮಹಾರಾಷ್ಟ್ರ – ಭಾರತ',
    'Vidyasagar Ayurvedic Chikitsalaya Trust home': 'ವಿದ್ಯಾಸಾಗರ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ ಟ್ರಸ್ಟ್ ಮುಖಪುಟ',
    'Vidyasagar Ayurvedic Chikitsalaya Trust logo': 'ವಿದ್ಯಾಸಾಗರ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ ಟ್ರಸ್ಟ್ ಲೋಗೋ',
    'Vidyasanmatidas Original Trust home': 'ವಿದ್ಯಾಸನ್ಮತಿದಾಸ ಮೂಲ ಟ್ರಸ್ಟ್ ಮುಖಪುಟ',
    'Vidyasanmatidas Original Trust logo': 'ವಿದ್ಯಾಸನ್ಮತಿದಾಸ ಮೂಲ ಟ್ರಸ್ಟ್ ಲೋಗೋ',
    'Allopathic': 'ಅಲೋಪಥಿ',
    'Ayurveda': 'ಆಯುರ್ವೇದ',
    'Nidaan Kendra': 'ನಿದಾನ ಕೇಂದ್ರ',
    'Annadan': 'ಅನ್ನದಾನ',
    'Allopathic Chikitsalaya': 'ಅಲೋಪಥಿ ಚಿಕಿತ್ಸಾಲಯ',
    'Video 4': 'ವೀಡಿಯೊ 4',
    'Hospital initiative': 'ಆಸ್ಪತ್ರೆ ಉಪಕ್ರಮ',
    'Our journey': 'ನಮ್ಮ ಪಯಣ',
    'Community moments': 'ಸಮುದಾಯ ಕ್ಷಣಗಳು',
    'Hospital update': 'ಆಸ್ಪತ್ರೆ ನವೀಕರಣ',
    'Shilannyas': 'ಶಿಲಾನ್ಯಾಸ',
    'Close donation form': 'ದೇಣಿಗೆ ಫಾರ್ಮ್ ಮುಚ್ಚಿ',
    'Zoom in': 'ಹತ್ತಿರಕ್ಕೆ ಜೂಮ್ ಮಾಡಿ',
    'Zoom out': 'ದೂರಕ್ಕೆ ಜೂಮ್ ಮಾಡಿ',
    'Seva': 'ಸೇವಾ',
    'Swasthya': 'ಸ್ವಾಸ್ಥ್ಯ',
    'Sanskar': 'ಸಂಸ್ಕಾರ',
    'Compassion': 'ಕರುಣೆ',
    'Integrity': 'ಪ್ರಾಮಾಣಿಕತೆ',
    'Sustainability': 'ಸುಸ್ಥಿರತೆ',
    'Ayurveda Expert': 'ಆಯುರ್ವೇದ ತಜ್ಞರು',
    'Panchakarma': 'ಪಂಚಕರ್ಮ',
    'Wellness Expert': 'ಆರೋಗ್ಯ ತಜ್ಞರು',
    'General Physician': 'ಸಾಮಾನ್ಯ ವೈದ್ಯರು',
    'Specialist': 'ತಜ್ಞರು',
    'Family Medicine': 'ಕುಟುಂಬ ವೈದ್ಯಕೀಯ',
    'Pathology': 'ರೋಗಶಾಸ್ತ್ರ',
    'Radiology': 'ವಿಕಿರಣಶಾಸ್ತ್ರ',
    'Diagnostics': 'ರೋಗನಿರ್ಣಯ',
  },
};

const finalTranslations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'Aditya Patil on LinkedIn': 'LinkedIn पर आदित्य पाटिल',
    'Aditya Patil': 'आदित्य पाटिल',
    'Beside My School, opposite Chaudeshwari Cotton Mill, Kolhapur-Jaysingpur Road, Chipri, Tal. Shirol, Dist. Kolhapur.': 'मेरे स्कूल के पास, चौंडेश्वरी सूत गिरणी के सामने, कोल्हापुर–जयसिंगपुर रोड, चिपरी, तालुका शिरोळ, जिला कोल्हापुर।',
    '9090641008, 8600882277, 9175254779': '९०९०६४१००८, ८६००८८२२७७, ९१७५२५४७७९',
    'Stay updated with our latest events, health camps, awareness programs and community initiatives.': 'हमारे नवीनतम कार्यक्रमों, स्वास्थ्य शिविरों, जागरूकता कार्यक्रमों और सामुदायिक पहलों की जानकारी पाएँ।',
    'Vidyasagar Ayurvedic Chikitsalaya': 'विद्यासागर आयुर्वेदिक चिकित्सालय',
    'सुवर्णप्राशन संस्कार विधी': 'सुवर्णप्राशन संस्कार विधि',
    'आधुनिक वैद्यकिय विभाग': 'आधुनिक चिकित्सा विभाग',
    'आयुर्वेदिक विभाग': 'आयुर्वेदिक विभाग',
    'Enter your mobile number': 'अपना मोबाइल नंबर दर्ज करें',
    'Write your message here...': 'अपना संदेश यहाँ लिखें...',
    'Your name': 'आपका नाम',
    'Email address': 'ईमेल पता',
    'Ayurvedic Chikitsalaya': 'आयुर्वेदिक चिकित्सालय',
    'Allopathic Chikitsalaya': 'एलोपैथिक चिकित्सालय',
    'Annadan': 'अन्नदान',
    'Trust Road, City, Maharashtra – India': 'ट्रस्ट रोड, शहर, महाराष्ट्र – भारत',
  },
  MR: {
    'Aditya Patil on LinkedIn': 'LinkedIn वरील आदित्य पाटील',
    'Aditya Patil': 'आदित्य पाटील',
    'Beside My School, opposite Chaudeshwari Cotton Mill, Kolhapur-Jaysingpur Road, Chipri, Tal. Shirol, Dist. Kolhapur.': 'माय स्कूलच्या शेजारी, चौंडेश्वरी सूत गिरणीसमोर, कोल्हापूर–जयसिंगपूर रोड, चिपरी, ता. शिरोळ, जि. कोल्हापूर.',
    '9090641008, 8600882277, 9175254779': '९०९०६४१००८, ८६००८८२२७७, ९१७५२५४७७९',
    'Stay updated with our latest events, health camps, awareness programs and community initiatives.': 'आमचे नवीन कार्यक्रम, आरोग्य शिबिरे, जनजागृती कार्यक्रम आणि सामुदायिक उपक्रम यांची माहिती मिळवा.',
    'Vidyasagar Ayurvedic Chikitsalaya': 'विद्यासागर आयुर्वेदिक चिकित्सालय',
    'सुवर्णप्राशन संस्कार विधी': 'सुवर्णप्राशन संस्कार विधी',
    'आधुनिक वैद्यकिय विभाग': 'आधुनिक वैद्यकीय विभाग',
    'आयुर्वेदिक विभाग': 'आयुर्वेदिक विभाग',
    'Enter your mobile number': 'तुमचा मोबाइल क्रमांक लिहा',
    'Write your message here...': 'तुमचा संदेश येथे लिहा...',
    'Your name': 'तुमचे नाव',
    'Email address': 'ईमेल पत्ता',
    'Ayurvedic Chikitsalaya': 'आयुर्वेदिक चिकित्सालय',
    'Allopathic Chikitsalaya': 'एलोपॅथिक चिकित्सालय',
    'Annadan': 'अन्नदान',
    'Trust Road, City, Maharashtra – India': 'ट्रस्ट रोड, शहर, महाराष्ट्र – भारत',
  },
  KN: {
    'Aditya Patil on LinkedIn': 'LinkedIn‌ನಲ್ಲಿರುವ ಆದಿತ್ಯ ಪಾಟೀಲ್',
    'Aditya Patil': 'ಆದಿತ್ಯ ಪಾಟೀಲ್',
    'Beside My School, opposite Chaudeshwari Cotton Mill, Kolhapur-Jaysingpur Road, Chipri, Tal. Shirol, Dist. Kolhapur.': 'ಮೈ ಸ್ಕೂಲ್ ಪಕ್ಕದಲ್ಲಿ, ಚೌಂಡೇಶ್ವರಿ ಹತ್ತಿ ಗಿರಣಿ ಎದುರು, ಕೊಲ್ಹಾಪುರ–ಜಯಸಿಂಗಪುರ ರಸ್ತೆ, ಚಿಪ್ರಿ, ತಾ. ಶಿರೋಳ, ಜಿ. ಕೊಲ್ಹಾಪುರ.',
    '9090641008, 8600882277, 9175254779': '೯೦೯೦೬೪೧೦೦೮, ೮೬೦೦೮೮೨೨೭೭, ೯೧೭೫೨೫೪೭೭೯',
    'Stay updated with our latest events, health camps, awareness programs and community initiatives.': 'ನಮ್ಮ ಇತ್ತೀಚಿನ ಕಾರ್ಯಕ್ರಮಗಳು, ಆರೋಗ್ಯ ಶಿಬಿರಗಳು, ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಮುದಾಯ ಉಪಕ್ರಮಗಳ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.',
    'Vidyasagar Ayurvedic Chikitsalaya': 'ವಿದ್ಯಾಸಾಗರ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ',
    'सुवर्णप्राशन संस्कार विधी': 'ಸುವರ್ಣಪ್ರಾಶನ ಸಂಸ್ಕಾರ ವಿಧಿ',
    'आधुनिक वैद्यकिय विभाग': 'ಆಧುನಿಕ ವೈದ್ಯಕೀಯ ವಿಭಾಗ',
    'आयुर्वेदिक विभाग': 'ಆಯುರ್ವೇದ ವಿಭಾಗ',
    'Enter your mobile number': 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    'Write your message here...': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
    'Your name': 'ನಿಮ್ಮ ಹೆಸರು',
    'Email address': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'Ayurvedic Chikitsalaya': 'ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸಾಲಯ',
    'Allopathic Chikitsalaya': 'ಅಲೋಪಥಿ ಚಿಕಿತ್ಸಾಲಯ',
    'Annadan': 'ಅನ್ನದಾನ',
    'Trust Road, City, Maharashtra – India': 'ಟ್ರಸ್ಟ್ ರಸ್ತೆ, ನಗರ, ಮಹಾರಾಷ್ಟ್ರ – ಭಾರತ',
  },
};

const inspirationDescriptionTranslations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'His teachings of compassion, humility and service to humanity are at the heart of our mission. Inspired by his example, we work to make authentic, holistic healthcare more accessible and to treat every person with dignity, understanding and care. His vision encourages us to serve not only individual patients, but the well-being of the wider community. We carry these values into every interaction, with a commitment to listen, support and care for people at every stage of life.': 'करुणा, विनम्रता और मानवता की सेवा की उनकी शिक्षाएँ हमारे मिशन का मूल आधार हैं। उनके उदाहरण से प्रेरित होकर, हम प्रामाणिक और समग्र स्वास्थ्य सेवा को अधिक सुलभ बनाने तथा प्रत्येक व्यक्ति के साथ सम्मान, समझ और संवेदनशीलता से पेश आने का प्रयास करते हैं। उनकी दृष्टि हमें केवल व्यक्तिगत रोगियों की ही नहीं, बल्कि पूरे समुदाय के कल्याण की सेवा करने के लिए प्रेरित करती है। हम जीवन के हर चरण में लोगों की बात सुनने, उनका साथ देने और उनकी देखभाल करने की प्रतिबद्धता के साथ इन मूल्यों को हर संवाद में अपनाते हैं।',
    'A symbol of strength, self-discipline and concern for the welfare of all. These values inspire us to offer thoughtful, compassionate care and encourage healthier lives. His example reminds us that a strong healthcare community is built through dedication, responsibility and respect for every individual. By bringing traditional wisdom together with attentive care, we aim to support lasting well-being for patients and families.': 'वे शक्ति, आत्म-अनुशासन और सभी के कल्याण के प्रति चिंता के प्रतीक हैं। ये मूल्य हमें विचारशील और करुणामय देखभाल देने तथा स्वस्थ जीवन को प्रोत्साहित करने की प्रेरणा देते हैं। उनका उदाहरण याद दिलाता है कि समर्पण, जिम्मेदारी और प्रत्येक व्यक्ति के सम्मान से एक सशक्त स्वास्थ्य सेवा समुदाय बनता है। पारंपरिक ज्ञान और संवेदनशील देखभाल को साथ लाकर, हम रोगियों और परिवारों के दीर्घकालिक कल्याण में सहयोग करना चाहते हैं।',
    'His vision of knowledge, diagnosis and awareness inspires the work of our Nidaan Kendra. We carry this forward by encouraging early detection, preventive healthcare and informed choices. Through accessible diagnostic services and health awareness, we aim to help individuals and families take confident steps towards their well-being. We believe that clear information and timely guidance can help build a healthier, more confident community.': 'ज्ञान, निदान और जागरूकता की उनकी दृष्टि हमारे निदान केंद्र के कार्य को प्रेरित करती है। शीघ्र पहचान, निवारक स्वास्थ्य सेवा और जानकारी पर आधारित विकल्पों को प्रोत्साहित करके हम इस दृष्टि को आगे बढ़ाते हैं। सुलभ जाँच सेवाओं और स्वास्थ्य जागरूकता के माध्यम से, हम व्यक्तियों और परिवारों को अपने कल्याण की दिशा में आत्मविश्वास से कदम बढ़ाने में मदद करना चाहते हैं। हमारा विश्वास है कि स्पष्ट जानकारी और समय पर मार्गदर्शन से अधिक स्वस्थ और आत्मविश्वासी समुदाय का निर्माण हो सकता है।',
  },
  MR: {
    'His teachings of compassion, humility and service to humanity are at the heart of our mission. Inspired by his example, we work to make authentic, holistic healthcare more accessible and to treat every person with dignity, understanding and care. His vision encourages us to serve not only individual patients, but the well-being of the wider community. We carry these values into every interaction, with a commitment to listen, support and care for people at every stage of life.': 'करुणा, नम्रता आणि मानवसेवेची त्यांची शिकवण आमच्या ध्येयाच्या केंद्रस्थानी आहे. त्यांच्या उदाहरणापासून प्रेरणा घेऊन, अस्सल आणि सर्वांगीण आरोग्यसेवा अधिक सुलभ करण्यासाठी तसेच प्रत्येक व्यक्तीशी सन्मानाने, समजुतीने आणि आपुलकीने वागण्यासाठी आम्ही प्रयत्नशील आहोत. त्यांची दृष्टी आम्हाला केवळ वैयक्तिक रुग्णांचीच नव्हे, तर संपूर्ण समुदायाच्या कल्याणाची सेवा करण्यास प्रेरित करते. आयुष्याच्या प्रत्येक टप्प्यावर लोकांचे ऐकणे, त्यांना आधार देणे आणि काळजी घेणे या बांधिलकीने आम्ही प्रत्येक संवादात ही मूल्ये जपतो.',
    'A symbol of strength, self-discipline and concern for the welfare of all. These values inspire us to offer thoughtful, compassionate care and encourage healthier lives. His example reminds us that a strong healthcare community is built through dedication, responsibility and respect for every individual. By bringing traditional wisdom together with attentive care, we aim to support lasting well-being for patients and families.': 'ते सामर्थ्य, आत्मसंयम आणि सर्वांच्या कल्याणाची काळजी यांचे प्रतीक आहेत. हे मूल्य आम्हाला विचारपूर्वक, करुणामय सेवा देण्यास आणि निरोगी जीवनाला प्रोत्साहन देण्यास प्रेरित करतात. समर्पण, जबाबदारी आणि प्रत्येक व्यक्तीचा आदर यातून सशक्त आरोग्यसेवा समुदाय घडतो, याची आठवण त्यांचे उदाहरण करून देते. पारंपरिक ज्ञान आणि लक्षपूर्वक सेवा यांची सांगड घालून, रुग्ण आणि कुटुंबांच्या दीर्घकालीन स्वास्थ्याला हातभार लावण्याचे आमचे ध्येय आहे.',
    'His vision of knowledge, diagnosis and awareness inspires the work of our Nidaan Kendra. We carry this forward by encouraging early detection, preventive healthcare and informed choices. Through accessible diagnostic services and health awareness, we aim to help individuals and families take confident steps towards their well-being. We believe that clear information and timely guidance can help build a healthier, more confident community.': 'ज्ञान, निदान आणि जागरूकतेची त्यांची दृष्टी आमच्या निदान केंद्राच्या कार्याला प्रेरणा देते. लवकर निदान, प्रतिबंधात्मक आरोग्यसेवा आणि माहितीपूर्ण निवडी यांना प्रोत्साहन देऊन आम्ही ही दृष्टी पुढे नेतो. सुलभ निदान सेवा आणि आरोग्यविषयक जागरूकतेद्वारे, व्यक्ती आणि कुटुंबांना त्यांच्या स्वास्थ्यासाठी आत्मविश्वासाने पावले उचलण्यास मदत करण्याचा आमचा प्रयत्न आहे. स्पष्ट माहिती आणि वेळेवर मार्गदर्शन यांमुळे अधिक निरोगी आणि आत्मविश्वासी समुदाय घडू शकतो, असा आमचा विश्वास आहे.',
  },
  KN: {
    'His teachings of compassion, humility and service to humanity are at the heart of our mission. Inspired by his example, we work to make authentic, holistic healthcare more accessible and to treat every person with dignity, understanding and care. His vision encourages us to serve not only individual patients, but the well-being of the wider community. We carry these values into every interaction, with a commitment to listen, support and care for people at every stage of life.': 'ಕರುಣೆ, ವಿನಯ ಮತ್ತು ಮಾನವ ಸೇವೆಯ ಅವರ ಬೋಧನೆಗಳು ನಮ್ಮ ಧ್ಯೇಯದ ಹೃದಯಭಾಗವಾಗಿವೆ. ಅವರ ಆದರ್ಶದಿಂದ ಪ್ರೇರಿತರಾಗಿ, ಅಧಿಕೃತ ಮತ್ತು ಸಮಗ್ರ ಆರೋಗ್ಯ ಸೇವೆಯನ್ನು ಹೆಚ್ಚು ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗಿಸುವುದಕ್ಕೂ, ಪ್ರತಿಯೊಬ್ಬರನ್ನೂ ಗೌರವ, ತಿಳುವಳಿಕೆ ಮತ್ತು ಕಾಳಜಿಯಿಂದ ಕಾಣುವುದಕ್ಕೂ ನಾವು ಶ್ರಮಿಸುತ್ತೇವೆ. ವೈಯಕ್ತಿಕ ರೋಗಿಗಳಷ್ಟೇ ಅಲ್ಲದೆ, ಇಡೀ ಸಮುದಾಯದ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಲು ಅವರ ದೃಷ್ಟಿಕೋನ ನಮಗೆ ಪ್ರೇರಣೆ ನೀಡುತ್ತದೆ. ಜೀವನದ ಪ್ರತಿಯೊಂದು ಹಂತದಲ್ಲಿರುವ ಜನರ ಮಾತು ಆಲಿಸಿ, ಬೆಂಬಲ ನೀಡಿ, ಆರೈಕೆ ಮಾಡುವ ಬದ್ಧತೆಯೊಂದಿಗೆ ಈ ಮೌಲ್ಯಗಳನ್ನು ಪ್ರತಿಯೊಂದು ಸಂವಾದದಲ್ಲೂ ಪಾಲಿಸುತ್ತೇವೆ.',
    'A symbol of strength, self-discipline and concern for the welfare of all. These values inspire us to offer thoughtful, compassionate care and encourage healthier lives. His example reminds us that a strong healthcare community is built through dedication, responsibility and respect for every individual. By bringing traditional wisdom together with attentive care, we aim to support lasting well-being for patients and families.': 'ಅವರು ಶಕ್ತಿ, ಸ್ವಯಂ ಶಿಸ್ತು ಮತ್ತು ಎಲ್ಲರ ಕಲ್ಯಾಣದ ಕಾಳಜಿಯ ಸಂಕೇತವಾಗಿದ್ದಾರೆ. ಈ ಮೌಲ್ಯಗಳು ವಿವೇಕಪೂರ್ಣ, ಕರುಣೆಯ ಆರೈಕೆ ನೀಡಲು ಮತ್ತು ಆರೋಗ್ಯಕರ ಜೀವನವನ್ನು ಉತ್ತೇಜಿಸಲು ನಮಗೆ ಪ್ರೇರಣೆ ನೀಡುತ್ತವೆ. ಸಮರ್ಪಣೆ, ಹೊಣೆಗಾರಿಕೆ ಮತ್ತು ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ಗೌರವ ನೀಡುವುದರಿಂದ ಬಲವಾದ ಆರೋಗ್ಯ ಸಮುದಾಯ ನಿರ್ಮಾಣವಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ಅವರ ಆದರ್ಶ ನೆನಪಿಸುತ್ತದೆ. ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನವನ್ನು ಗಮನಪೂರ್ಣ ಆರೈಕೆಯೊಂದಿಗೆ ಸೇರಿಸಿ, ರೋಗಿಗಳು ಮತ್ತು ಕುಟುಂಬಗಳ ದೀರ್ಘಕಾಲದ ಕ್ಷೇಮಕ್ಕೆ ನೆರವಾಗಲು ನಾವು ಬಯಸುತ್ತೇವೆ.',
    'His vision of knowledge, diagnosis and awareness inspires the work of our Nidaan Kendra. We carry this forward by encouraging early detection, preventive healthcare and informed choices. Through accessible diagnostic services and health awareness, we aim to help individuals and families take confident steps towards their well-being. We believe that clear information and timely guidance can help build a healthier, more confident community.': 'ಜ್ಞಾನ, ರೋಗನಿರ್ಣಯ ಮತ್ತು ಜಾಗೃತಿಯ ಅವರ ದೃಷ್ಟಿಕೋನ ನಮ್ಮ ನಿಧಾನ ಕೇಂದ್ರದ ಕಾರ್ಯಕ್ಕೆ ಪ್ರೇರಣೆಯಾಗಿದೆ. ಆರಂಭಿಕ ಪತ್ತೆ, ತಡೆಗಟ್ಟುವ ಆರೋಗ್ಯ ಸೇವೆ ಮತ್ತು ತಿಳುವಳಿಕೆಯ ಆಯ್ಕೆಗಳನ್ನು ಉತ್ತೇಜಿಸುವ ಮೂಲಕ ನಾವು ಈ ದೃಷ್ಟಿಯನ್ನು ಮುಂದುವರಿಸುತ್ತೇವೆ. ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವ ರೋಗನಿರ್ಣಯ ಸೇವೆಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಜಾಗೃತಿಯ ಮೂಲಕ, ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಕುಟುಂಬಗಳು ತಮ್ಮ ಕ್ಷೇಮದತ್ತ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಹೆಜ್ಜೆ ಇಡಲು ನೆರವಾಗಲು ನಾವು ಉದ್ದೇಶಿಸಿದ್ದೇವೆ. ಸ್ಪಷ್ಟ ಮಾಹಿತಿ ಮತ್ತು ಸಮಯೋಚಿತ ಮಾರ್ಗದರ್ಶನವು ಹೆಚ್ಚು ಆರೋಗ್ಯಕರ, ಆತ್ಮವಿಶ್ವಾಸದ ಸಮುದಾಯವನ್ನು ಕಟ್ಟಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ.',
  },
};

const properNameTranslations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'Dr. B. B. Vitragji Kailas Doshi (Bhaiya) Akaluj, B.A.M.S.': 'डॉ. बी. बी. वीतरागजी कैलास दोशी (भैया), अकलूज, बी.ए.एम.एस.',
    'Dr. Shri. Chandrakantji Dada Samaj, Mudhol M.D. (Aayurvedik)': 'डॉ. श्री चंद्रकांतजी दादा समाज, मुधोल, एम.डी. (आयुर्वेद)',
    'Dr. Shri. Amolji Ajit Patil, Sangli MD (Aayurvedik)': 'डॉ. श्री अमोलजी अजित पाटिल, सांगली, एम.डी. (आयुर्वेद)',
    'Dr. Shri Sujitji Subhash Patil, Sangli MD (Aayurvedik)': 'डॉ. श्री सुजीतजी सुभाष पाटिल, सांगली, एम.डी. (आयुर्वेद)',
    'Dr. Shri Amol Ashok Sakale, Nandre (B.A. M.S. , M.D. Pediatrics)': 'डॉ. श्री अमोल अशोक साकले, नांद्रे (बी.ए.एम.एस., एम.डी. बालरोग)',
    'Dr. Shri Shirishji Nemgonda Patil, Kolhapur B.A.M.S.': 'डॉ. श्री शिरीषजी नेमगोंडा पाटिल, कोल्हापुर, बी.ए.एम.एस.',
    'Dr. Shri Sujayji Prakash Wadkar, Ashta B.A.M.S.': 'डॉ. श्री सुजयजी प्रकाश वाडकर, आष्टा, बी.ए.एम.एस.',
    'Dr. Shri Dipakji Gajanan Kadage, Ichalkaranji. B.A.M.S.': 'डॉ. श्री दीपकजी गजानन कडगे, इचलकरंजी, बी.ए.एम.एस.',
    'Dr. Mrs. Savita Bharat Sidnale, Dattwad, B.A.M.S. PGDND': 'डॉ. श्रीमती सविता भारत सिदनाळे, दत्तवाड, बी.ए.एम.एस., पी.जी.डी.एन.डी.',
    'Dr. Mrs. Jyotsna Chandrakant Samaj, Mudhaol B.A.M.S.': 'डॉ. श्रीमती ज्योत्स्ना चंद्रकांत समाज, मुधोल, बी.ए.एम.एस.',
    'Dr. Shri. Baburavji Aadappa Shikhare, Jaysingpur B.A.M.S.': 'डॉ. श्री बाबुरावजी आदप्पा शिखरे, जयसिंगपुर, बी.ए.एम.एस.',
    'Dr. Mrs. Jaykantaji Parisa Badbade, Ichalkaranji. M.D. (Ped.)': 'डॉ. श्रीमती जयकांताजी परिशा बडबडे, इचलकरंजी, एम.डी. (बालरोग)',
    'Dr. Shri. Vijay N. Patil, Jaysingpur (M.D. Homeopathic)': 'डॉ. श्री विजय एन. पाटिल, जयसिंगपुर (एम.डी. होम्योपैथी)',
    'Dr. Shri. Padmeshji Shrikant Patil, (Motake) Jaysingpur. M.B.B.S., DDV.': 'डॉ. श्री पद्मेशजी श्रीकांत पाटिल (मोटके), जयसिंगपुर, एम.बी.बी.एस., डी.डी.वी.',
    'Dr. Vinayji Bhimrao Rajmane, Islampur B.A.M.S.': 'डॉ. विनयजी भीमराव राजमाने, इस्लामपुर, बी.ए.एम.एस.',
    'Dr. Shri. Pramodji Ashok Choudhari, Sangli B.H.M.S.': 'डॉ. श्री प्रमोदजी अशोक चौधरी, सांगली, बी.एच.एम.एस.',
    'Dr. Shri. Sureshji Nemgonda Patil, Jaysingpur M.B.B.S., B.A.M.S': 'डॉ. श्री सुरेशजी नेमगोंडा पाटिल, जयसिंगपुर, एम.बी.बी.एस., बी.ए.एम.एस.',
    'Dr. Shri. Digambarji Sukumar Nandre, Kothali, B.H.M.S.': 'डॉ. श्री दिगंबरजी सुकुमार नांद्रे, कोठली, बी.एच.एम.एस.',
    'Dr. Shri. Vinodji Neminath Aurwade, Alas, M.D.S.': 'डॉ. श्री विनोदजी नेमिनाथ औरवाडे, आलास, एम.डी.एस.',
    'Dr. Smt. Aasha Shital Chougule, Sangli D.Pharma.': 'डॉ. श्रीमती आशा शितल चौगुले, सांगली, डी.फार्मा.',
    'Dr. Sudhirji Purandar Choudhari, Nandre M.B.B.S': 'डॉ. सुधीरजी पुरंदर चौधरी, नांद्रे, एम.बी.बी.एस.',
    'Dr. Kavita Arun Lalwani, Ichalkaranji Alternate Therapist': 'डॉ. कविता अरुण लालवानी, इचलकरंजी, वैकल्पिक चिकित्सक',
    'Shri. Pradipji Rajaram Upadhye, Rui': 'श्री प्रदीपजी राजाराम उपाध्ये, रुई',
    'Shri. Santoshji Jangonda Patil, Ichalkaranji.': 'श्री संतोषजी जंगोंडा पाटिल, इचलकरंजी',
    'Shri. Vijaykumarji Jingonda Patil, Nimshirrgaon': 'श्री विजयकुमारजी जिंगोंडा पाटिल, निमशिरगांव',
    'Sri 1008 Bhagavana Candraprabha Digambara Jaina Mandira': 'श्री १००८ भगवान चंद्रप्रभ दिगंबर जैन मंदिर',
    'Munishree Akshayasaagarajee Mahaaraaj Tyaagee Bhavan': 'मुनिश्री अक्षयसागरजी महाराज त्यागी भवन',
    'Vineet - Chandraprabh Tyaagee Panchakarm Kaksh': 'विनीत - चंद्रप्रभ त्यागी पंचकर्म कक्ष',
    'Mallee - Samayamatee Aahaarabhavan': 'मल्ली - समयमती आहार भवन',
    'Swastishree Jinsenji Bhattaraka Mahaswamiji Bhojanalaya': 'स्वस्तिश्री जिनसेनजी भट्टारक के महास्वामीजी भोजनालय',
    'Jinwani Ambulance': 'जिनवाणी एम्बुलेंस',
    'Acharya Pushpadantsagarji Maharaj Vaidya Niwas (Opened 1BHK - Number 4)': 'आचार्य पुष्पदंतसागरजी महाराज वैद्य निवास (खोला गया १ बीएचके - नंबर ४)',
  },
  MR: {
    'Dr. B. B. Vitragji Kailas Doshi (Bhaiya) Akaluj, B.A.M.S.': 'डॉ. बी. बी. वीतरागजी कैलास दोशी (भैय्या), अकलूज, बी.ए.एम.एस.',
    'Dr. Shri. Chandrakantji Dada Samaj, Mudhol M.D. (Aayurvedik)': 'डॉ. श्री. चंद्रकांतजी दादा समाज, मुधोळ, एम.डी. (आयुर्वेद)',
    'Dr. Shri. Amolji Ajit Patil, Sangli MD (Aayurvedik)': 'डॉ. श्री. अमोलजी अजित पाटील, सांगली, एम.डी. (आयुर्वेद)',
    'Dr. Shri Sujitji Subhash Patil, Sangli MD (Aayurvedik)': 'डॉ. श्री सुजीतजी सुभाष पाटील, सांगली, एम.डी. (आयुर्वेद)',
    'Dr. Shri Amol Ashok Sakale, Nandre (B.A. M.S. , M.D. Pediatrics)': 'डॉ. श्री अमोल अशोक साकळे, नांद्रे (बी.ए.एम.एस., एम.डी. बालरोग)',
    'Dr. Shri Shirishji Nemgonda Patil, Kolhapur B.A.M.S.': 'डॉ. श्री शिरीषजी नेमगोंडा पाटील, कोल्हापूर, बी.ए.एम.एस.',
    'Dr. Shri Sujayji Prakash Wadkar, Ashta B.A.M.S.': 'डॉ. श्री सुजयजी प्रकाश वाडकर, आष्टा, बी.ए.एम.एस.',
    'Dr. Shri Dipakji Gajanan Kadage, Ichalkaranji. B.A.M.S.': 'डॉ. श्री दीपकजी गजानन कडगे, इचलकरंजी, बी.ए.एम.एस.',
    'Dr. Mrs. Savita Bharat Sidnale, Dattwad, B.A.M.S. PGDND': 'डॉ. सौ. सविता भारत सिदनाळे, दत्तवाड, बी.ए.एम.एस., पी.जी.डी.एन.डी.',
    'Dr. Mrs. Jyotsna Chandrakant Samaj, Mudhaol B.A.M.S.': 'डॉ. सौ. ज्योत्स्ना चंद्रकांत समाज, मुधोळ, बी.ए.एम.एस.',
    'Dr. Shri. Baburavji Aadappa Shikhare, Jaysingpur B.A.M.S.': 'डॉ. श्री. बाबुरावजी आदप्पा शिखरे, जयसिंगपूर, बी.ए.एम.एस.',
    'Dr. Mrs. Jaykantaji Parisa Badbade, Ichalkaranji. M.D. (Ped.)': 'डॉ. सौ. जयकांताजी परिशा बडबडे, इचलकरंजी, एम.डी. (बालरोग)',
    'Dr. Shri. Vijay N. Patil, Jaysingpur (M.D. Homeopathic)': 'डॉ. श्री. विजय एन. पाटील, जयसिंगपूर (एम.डी. होमिओपॅथी)',
    'Dr. Shri. Padmeshji Shrikant Patil, (Motake) Jaysingpur. M.B.B.S., DDV.': 'डॉ. श्री. पद्मेशजी श्रीकांत पाटील (मोटके), जयसिंगपूर, एम.बी.बी.एस., डी.डी.व्ही.',
    'Dr. Vinayji Bhimrao Rajmane, Islampur B.A.M.S.': 'डॉ. विनयजी भीमराव राजमाने, इस्लामपूर, बी.ए.एम.एस.',
    'Dr. Shri. Pramodji Ashok Choudhari, Sangli B.H.M.S.': 'डॉ. श्री. प्रमोदजी अशोक चौधरी, सांगली, बी.एच.एम.एस.',
    'Dr. Shri. Sureshji Nemgonda Patil, Jaysingpur M.B.B.S., B.A.M.S': 'डॉ. श्री. सुरेशजी नेमगोंडा पाटील, जयसिंगपूर, एम.बी.बी.एस., बी.ए.एम.एस.',
    'Dr. Shri. Digambarji Sukumar Nandre, Kothali, B.H.M.S.': 'डॉ. श्री. दिगंबरजी सुकुमार नांद्रे, कोठळी, बी.एच.एम.एस.',
    'Dr. Shri. Vinodji Neminath Aurwade, Alas, M.D.S.': 'डॉ. श्री. विनोदजी नेमिनाथ औरवाडे, आलास, एम.डी.एस.',
    'Dr. Smt. Aasha Shital Chougule, Sangli D.Pharma.': 'डॉ. सौ. आशा शितल चौगुले, सांगली, डी.फार्मा.',
    'Dr. Sudhirji Purandar Choudhari, Nandre M.B.B.S': 'डॉ. सुधीरजी पुरंदर चौधरी, नांद्रे, एम.बी.बी.एस.',
    'Dr. Kavita Arun Lalwani, Ichalkaranji Alternate Therapist': 'डॉ. कविता अरुण लालवानी, इचलकरंजी, पर्यायी चिकित्सक',
    'Shri. Pradipji Rajaram Upadhye, Rui': 'श्री. प्रदीपजी राजाराम उपाध्ये, रुई',
    'Shri. Santoshji Jangonda Patil, Ichalkaranji.': 'श्री. संतोषजी जंगोंडा पाटील, इचलकरंजी',
    'Shri. Vijaykumarji Jingonda Patil, Nimshirrgaon': 'श्री. विजयकुमारजी जिंगोंडा पाटील, निमशिरगाव',
    'Sri 1008 Bhagavana Candraprabha Digambara Jaina Mandira': 'श्री १००८ भगवान चंद्रप्रभ दिगंबर जैन मंदिर',
    'Munishree Akshayasaagarajee Mahaaraaj Tyaagee Bhavan': 'मुनीश्री अक्षयसागरजी महाराज त्यागी भवन',
    'Vineet - Chandraprabh Tyaagee Panchakarm Kaksh': 'विनीत - चंद्रप्रभ त्यागी पंचकर्म कक्ष',
    'Mallee - Samayamatee Aahaarabhavan': 'मल्ली - समयमती आहार भवन',
    'Swastishree Jinsenji Bhattaraka Mahaswamiji Bhojanalaya': 'स्वस्तिश्री जिनसेनजी भट्टारकांचे महास्वामीजी भोजनालय',
    'Jinwani Ambulance': 'जिनवाणी रुग्णवाहिका',
    'Acharya Pushpadantsagarji Maharaj Vaidya Niwas (Opened 1BHK - Number 4)': 'आचार्य पुष्पदंतसागरजी महाराज वैद्य निवास (उघडलेले १ बीएचके - क्रमांक ४)',
  },
  KN: {
    'Dr. B. B. Vitragji Kailas Doshi (Bhaiya) Akaluj, B.A.M.S.': 'ಡಾ. ಬಿ. ಬಿ. ವೀತರಾಗ್ಜಿ ಕೈಲಾಸ್ ದೋಶಿ (ಭಯ್ಯಾ), ಅಕಲೂಜ್, ಬಿ.ಎ.ಎಂ.ಎಸ್.',
    'Dr. Shri. Chandrakantji Dada Samaj, Mudhol M.D. (Aayurvedik)': 'ಡಾ. ಶ್ರೀ ಚಂದ್ರಕಾಂತ್ಜಿ ದಾದಾ ಸಮಾಜ್, ಮುಧೋಳ್, ಎಂ.ಡಿ. (ಆಯುರ್ವೇದ)',
    'Dr. Shri. Amolji Ajit Patil, Sangli MD (Aayurvedik)': 'ಡಾ. ಶ್ರೀ ಅಮೋಲ್ಜಿ ಅಜಿತ್ ಪಾಟೀಲ್, ಸಾಂಗ್ಲಿ, ಎಂ.ಡಿ. (ಆಯುರ್ವೇದ)',
    'Dr. Shri Sujitji Subhash Patil, Sangli MD (Aayurvedik)': 'ಡಾ. ಶ್ರೀ ಸುಜಿತ್ಜಿ ಸುಭಾಷ್ ಪಾಟೀಲ್, ಸಾಂಗ್ಲಿ, ಎಂ.ಡಿ. (ಆಯುರ್ವೇದ)',
    'Dr. Shri Amol Ashok Sakale, Nandre (B.A. M.S. , M.D. Pediatrics)': 'ಡಾ. ಶ್ರೀ ಅಮೋಲ್ ಅಶೋಕ್ ಸಕಾಳೆ, ನಾಂದ್ರೆ (ಬಿ.ಎ.ಎಂ.ಎಸ್., ಎಂ.ಡಿ. ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ)',
    'Dr. Shri Shirishji Nemgonda Patil, Kolhapur B.A.M.S.': 'ಡಾ. ಶ್ರೀ ಶಿರೀಶ್ಜಿ ನೆಮ್ಗೊಂಡ ಪಾಟೀಲ್, ಕೊಲ್ಹಾಪುರ, ಬಿ.ಎ.ಎಂ.ಎಸ್.',
    'Dr. Shri Sujayji Prakash Wadkar, Ashta B.A.M.S.': 'ಡಾ. ಶ್ರೀ ಸುಜಯ್ಜಿ ಪ್ರಕಾಶ್ ವಾಡ್ಕರ್, ಅಷ್ಟಾ, ಬಿ.ಎ.ಎಂ.ಎಸ್.',
    'Dr. Shri Dipakji Gajanan Kadage, Ichalkaranji. B.A.M.S.': 'ಡಾ. ಶ್ರೀ ದೀಪಕ್ಜಿ ಗಜಾನನ್ ಕಡಗೆ, ಇಚಲಕರಂಜಿ, ಬಿ.ಎ.ಎಂ.ಎಸ್.',
    'Dr. Mrs. Savita Bharat Sidnale, Dattwad, B.A.M.S. PGDND': 'ಡಾ. ಶ್ರೀಮತಿ ಸವಿತಾ ಭರತ್ ಸಿದ್ನಾಳೆ, ದತ್ತವಾಡ್, ಬಿ.ಎ.ಎಂ.ಎಸ್., ಪಿ.ಜಿ.ಡಿ.ಎನ್.ಡಿ.',
    'Dr. Mrs. Jyotsna Chandrakant Samaj, Mudhaol B.A.M.S.': 'ಡಾ. ಶ್ರೀಮತಿ ಜ್ಯೋತ್ಸ್ನಾ ಚಂದ್ರಕಾಂತ್ ಸಮಾಜ್, ಮುದ್ಹೋಳ್, ಬಿ.ಎ.ಎಂ.ಎಸ್.',
    'Dr. Shri. Baburavji Aadappa Shikhare, Jaysingpur B.A.M.S.': 'ಡಾ. ಶ್ರೀ ಬಾಬುರಾವ್ಜಿ ಆದಪ್ಪ ಶಿಖರೆ, ಜಯಸಿಂಗಪುರ, ಬಿ.ಎ.ಎಂ.ಎಸ್.',
    'Dr. Mrs. Jaykantaji Parisa Badbade, Ichalkaranji. M.D. (Ped.)': 'ಡಾ. ಶ್ರೀಮತಿ ಜಯಕಾಂತಾಜಿ ಪರೀಸಾ ಬಡಬಡೆ, ಇಚಲಕರಂಜಿ, ಎಂ.ಡಿ. (ಮಕ್ಕಳ ವೈದ್ಯಕೀಯ)',
    'Dr. Shri. Vijay N. Patil, Jaysingpur (M.D. Homeopathic)': 'ಡಾ. ಶ್ರೀ ವಿಜಯ್ ಎನ್. ಪಾಟೀಲ್, ಜಯಸಿಂಗಪುರ (ಎಂ.ಡಿ. ಹೋಮಿಯೋಪತಿ)',
    'Dr. Shri. Padmeshji Shrikant Patil, (Motake) Jaysingpur. M.B.B.S., DDV.': 'ಡಾ. ಶ್ರೀ ಪದ್ಮೇಶ್ಜಿ ಶ್ರೀಕಾಂತ್ ಪಾಟೀಲ್ (ಮೊಟಕೆ), ಜಯಸಿಂಗಪುರ, ಎಂ.ಬಿ.ಬಿ.ಎಸ್., ಡಿ.ಡಿ.ವಿ.',
    'Dr. Vinayji Bhimrao Rajmane, Islampur B.A.M.S.': 'ಡಾ. ವಿನಯ್ಜಿ ಭೀಮರಾವ್ ರಾಜ್ಮಾನೆ, ಇಸ್ಲಾಂಪುರ, ಬಿ.ಎ.ಎಂ.ಎಸ್.',
    'Dr. Shri. Pramodji Ashok Choudhari, Sangli B.H.M.S.': 'ಡಾ. ಶ್ರೀ ಪ್ರಮೋದ್ಜಿ ಅಶೋಕ್ ಚೌಧರಿ, ಸಾಂಗ್ಲಿ, ಬಿ.ಎಚ್.ಎಂ.ಎಸ್.',
    'Dr. Shri. Sureshji Nemgonda Patil, Jaysingpur M.B.B.S., B.A.M.S': 'ಡಾ. ಶ್ರೀ ಸುರೇಶ್ಜಿ ನೆಮ್ಗೊಂಡ ಪಾಟೀಲ್, ಜಯಸಿಂಗಪುರ, ಎಂ.ಬಿ.ಬಿ.ಎಸ್., ಬಿ.ಎ.ಎಂ.ಎಸ್.',
    'Dr. Shri. Digambarji Sukumar Nandre, Kothali, B.H.M.S.': 'ಡಾ. ಶ್ರೀ ದಿಗಂಬರ್ಜೀ ಸುಕುಮಾರ್ ನಾಂದ್ರೆ, ಕೊಥಳಿ, ಬಿ.ಎಚ್.ಎಂ.ಎಸ್.',
    'Dr. Shri. Vinodji Neminath Aurwade, Alas, M.D.S.': 'ಡಾ. ಶ್ರೀ ವಿನೋದ್ಜಿ ನೇಮಿನಾಥ್ ಔರವಾಡೆ, ಆಲಾಸ್, ಎಂ.ಡಿ.ಎಸ್.',
    'Dr. Smt. Aasha Shital Chougule, Sangli D.Pharma.': 'ಡಾ. ಶ್ರೀಮತಿ ಆಶಾ ಶೀತಲ್ ಚೌಗುಲೆ, ಸಾಂಗ್ಲಿ, ಡಿ.ಫಾರ್ಮಾ.',
    'Dr. Sudhirji Purandar Choudhari, Nandre M.B.B.S': 'ಡಾ. ಸುಧೀರ್ಜೀ ಪುರಂದರ್ ಚೌಧರಿ, ನಾಂದ್ರೆ, ಎಂ.ಬಿ.ಬಿ.ಎಸ್.',
    'Dr. Kavita Arun Lalwani, Ichalkaranji Alternate Therapist': 'ಡಾ. ಕವಿತಾ ಅರುಣ್ ಲಾಲ್ವಾನಿ, ಇಚಲಕರಂಜಿ, ಪರ್ಯಾಯ ಚಿಕಿತ್ಸಕರು',
    'Shri. Pradipji Rajaram Upadhye, Rui': 'ಶ್ರೀ ಪ್ರದೀಪ್ಜಿ ರಾಜಾರಾಮ್ ಉಪಾಧ್ಯೆ, ರುಯಿ',
    'Shri. Santoshji Jangonda Patil, Ichalkaranji.': 'ಶ್ರೀ ಸಂತೋಷ್ಜಿ ಜಂಗೊಂಡ ಪಾಟೀಲ್, ಇಚಲಕರಂಜಿ',
    'Shri. Vijaykumarji Jingonda Patil, Nimshirrgaon': 'ಶ್ರೀ ವಿಜಯಕುಮಾರ್ಜಿ ಜಿಂಗೊಂಡ ಪಾಟೀಲ್, ನಿಮ್ಶಿರ್ಗಾಂವ್',
    'Sri 1008 Bhagavana Candraprabha Digambara Jaina Mandira': 'ಶ್ರೀ ೧೦೦೮ ಭಗವಾನ ಚಂದ್ರಪ್ರಭ ದಿಗಂಬರ ಜೈನ ಮಂದಿರ',
    'Munishree Akshayasaagarajee Mahaaraaj Tyaagee Bhavan': 'ಮುನಿಶ್ರೀ ಅಕ್ಷಯಸಾಗರಜೀ ಮಹಾರಾಜ್ ತ್ಯಾಗಿ ಭವನ',
    'Vineet - Chandraprabh Tyaagee Panchakarm Kaksh': 'ವಿನೀತ್ - ಚಂದ್ರಪ್ರಭ ತ್ಯಾಗಿ ಪಂಚಕರ್ಮ ಕಕ್ಷ',
    'Mallee - Samayamatee Aahaarabhavan': 'ಮಲ್ಲೀ - ಸಮಯಮತೀ ಆಹಾರ ಭವನ',
    'Swastishree Jinsenji Bhattaraka Mahaswamiji Bhojanalaya': 'ಸ್ವಸ್ತಿಶ್ರೀ ಜಿನ್ಸೆಂಜಿ ಭಟ್ಟಾರಕರ ಮಹಾಸ್ವಾಮೀಜಿ ಭೋಜನಾಲಯ',
    'Jinwani Ambulance': 'ಜಿನವಾಣಿ ಆಂಬ್ಯುಲೆನ್ಸ್',
    'Acharya Pushpadantsagarji Maharaj Vaidya Niwas (Opened 1BHK - Number 4)': 'ಆಚಾರ್ಯ ಪುಷ್ಪದಂತಸಾಗರಜೀ ಮಹಾರಾಜ್ ವೈದ್ಯ ನಿವಾಸ (ತೆರೆದ ೧ ಬಿಎಚ್‌ಕೆ - ಸಂಖ್ಯೆ ೪)',
  },
};

const contactTranslations: Record<Exclude<Language, 'EN'>, Record<string, string>> = {
  HI: {
    'Beside My School, opposite Chaudeshwari Cotton Mill, Kolhapur-Jaysingpur Road, Chipri, Tal. Shirol, Dist. Kolhapur.': 'माय स्कूल के पास, चौदेश्वरी कॉटन मिल के सामने, कोल्हापुर-जयसिंगपुर रोड, चिपरी, तालुका शिरोल, जिला कोल्हापुर।',
    '+91 98765 43210': '+९१ ९८७६५ ४३२१०',
  },
  MR: {
    'Beside My School, opposite Chaudeshwari Cotton Mill, Kolhapur-Jaysingpur Road, Chipri, Tal. Shirol, Dist. Kolhapur.': 'माय स्कूलजवळ, चौडेश्वरी कॉटन मिलसमोर, कोल्हापूर-जयसिंगपूर रोड, चिपरी, ता. शिरोळ, जि. कोल्हापूर.',
    '+91 98765 43210': '+९१ ९८७६५ ४३२१०',
  },
  KN: {
    'Beside My School, opposite Chaudeshwari Cotton Mill, Kolhapur-Jaysingpur Road, Chipri, Tal. Shirol, Dist. Kolhapur.': 'ಮೈ ಸ್ಕೂಲ್ ಪಕ್ಕದಲ್ಲಿ, ಚೌದೇಶ್ವರಿ ಕಾಟನ್ ಮಿಲ್ ಎದುರು, ಕೊಲ್ಹಾಪುರ-ಜೈಸಿಂಗ್‌ಪುರ ರಸ್ತೆ, ಚಿಪ್ರಿ, ತಾ. ಶಿರೋಳ, ಜಿ. ಕೊಲ್ಹಾಪುರ.',
    '+91 98765 43210': '+೯೧ ೯೮೭೬೫ ೪೩೨೧೦',
  },
};

function tx(text: string, language: Language): string {
  return language === 'EN' ? text : patientFeedbackTranslations[language][text] ?? contactTranslations[language][text] ?? properNameTranslations[language][text] ?? inspirationDescriptionTranslations[language][text] ?? finalTranslations[language][text] ?? moreTranslations[language][text] ?? pageTranslations[language][text] ?? fullTranslations[language][text] ?? translations[language][text] ?? text;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return saved === 'HI' || saved === 'MR' || saved === 'KN' ? saved : 'EN';
  });
  const [activePage, setActivePage] = useState<'home' | 'about' | 'hospitals' | 'gallery' | 'contact' | 'hospital'>('home');
  const [selectedHospital, setSelectedHospital] = useState(0);
  const [donationOpen, setDonationOpen] = useState(false);
  const [donationProject, setDonationProject] = useState<{ name: string; amount: string; cost: string } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryMedia | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 550);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'HI' ? 'hi' : language === 'MR' ? 'mr' : language === 'KN' ? 'kn' : 'en';
  }, [language]);

  useEffect(() => {
    if (!menuOpen && !languageOpen) return;
    const closeMenus = () => {
      setMenuOpen(false);
      setLanguageOpen(false);
    };
    window.addEventListener('scroll', closeMenus, { passive: true });
    return () => window.removeEventListener('scroll', closeMenus);
  }, [menuOpen, languageOpen]);

  useEffect(() => {
    const syncPage = () => {
      const hash = window.location.hash;
      const hospitalMatch = hash.match(/^#hospital-(\\d+)$/);
      if (hospitalMatch) { setSelectedHospital(Number(hospitalMatch[1])); setActivePage('hospital'); return; }
      setActivePage(hash === '#about-page' ? 'about' : hash === '#hospitals-page' ? 'hospitals' : hash === '#gallery-page' || hash === '#gallery-videos' || hash === '#gallery-events' ? 'gallery' : hash === '#contact-page' || hash === '#volunteer-form' ? 'contact' : 'home');
    };
    syncPage();
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  const navigate = (destination: string) => {
    setMenuOpen(false);
    setLanguageOpen(false);
    window.location.hash = destination;
  };

  const openDonation = () => {
    setDonationProject(null);
    setDonationOpen(true);
  };
  const openProjectDonation = (project: { name: string; amount: string; cost: string }) => {
    setDonationProject(project);
    setDonationOpen(true);
  };

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    localStorage.setItem('preferred-language', nextLanguage);
    setLanguageOpen(false);
  };

  const copy = languageCopy[language] ?? languageCopy.EN;
  const navItems = [{ key: 'home', label: copy.home }, { key: 'about', label: copy.about }, { key: 'hospitals', label: copy.hospitals }, { key: 'gallery', label: copy.gallery }, { key: 'contact', label: copy.contact }];
  const activeNavKey = activePage === 'hospital' ? 'hospitals' : activePage;

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.section, .section-heading, .section-top, .section-heading h2, .section-heading p, .section-top h2, .section-top p, .about-section-heading h2, .about-section-heading p, .gallery-title-row h2, .gallery-title-row p, .about-content > div, .contact-content > div, .hospital-page-grid, .hospital-detail-layout, .hospital-card, .inspiration-card, .about-hospital-card, .value-card, .values-feature, .gallery-grid > *, .home-event-card, .event-detail, .gallery-event-card, .media-card, .stat, .purpose-list > div');
    targets.forEach((target) => target.classList.add('reveal-target'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [activePage, language]);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 700px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sliders = Array.from(document.querySelectorAll<HTMLElement>('.hospital-grid, .reference-hospital-grid, .about-hospital-grid, .inspiration-grid, .advisory-board-grid, .projects-grid'));
    const intervals: number[] = [];
    const exitTimeouts: number[] = [];
    const resizeObservers: ResizeObserver[] = [];

    const resetSliders = () => {
      intervals.forEach((timer) => window.clearInterval(timer));
      exitTimeouts.forEach((timer) => window.clearTimeout(timer));
      intervals.length = 0;
      exitTimeouts.length = 0;
      resizeObservers.forEach((observer) => observer.disconnect());
      resizeObservers.length = 0;
      sliders.forEach((slider) => {
        Array.from(slider.children).forEach((card) => {
          card.classList.remove('mobile-slide-active', 'mobile-slide-exit');
          card.removeAttribute('aria-hidden');
          if (card instanceof HTMLElement) {
            card.inert = false;
            card.style.removeProperty('min-height');
          }
        });
        slider.classList.remove('mobile-autoplay');
        slider.style.removeProperty('height');
        slider.removeAttribute('role');
        slider.removeAttribute('aria-roledescription');
        slider.removeAttribute('aria-label');
      });
    };

    const configureSliders = () => {
      resetSliders();
      if (!mobileQuery.matches || motionQuery.matches) return;

      sliders.forEach((slider) => {
        const cards = Array.from(slider.children).filter((card): card is HTMLElement => card instanceof HTMLElement);
        if (cards.length < 2) return;

        const label = slider.classList.contains('inspiration-grid')
          ? tx('Our Inspiration', language)
          : slider.classList.contains('projects-grid')
            ? tx('Specified Bhavan', language)
          : slider.classList.contains('advisory-board-grid')
            ? tx('Hospital Advisory Board', language)
            : tx('Our Hospitals', language);
        slider.classList.add('mobile-autoplay');
        slider.setAttribute('role', 'region');
        slider.setAttribute('aria-roledescription', 'carousel');
        slider.setAttribute('aria-label', label);

        let activeIndex = 0;
        cards.forEach((card, index) => {
          card.setAttribute('aria-hidden', String(index !== activeIndex));
          card.inert = index !== activeIndex;
        });
        cards[activeIndex].classList.add('mobile-slide-active');

        const setSliderHeight = () => {
          const height = Math.max(...cards.map((card) => card.getBoundingClientRect().height));
          if (height > 0) {
            const uniformHeight = `${Math.ceil(height)}px`;
            slider.style.height = uniformHeight;
            cards.forEach((card) => { card.style.minHeight = uniformHeight; });
          }
        };
        setSliderHeight();
        let lastWidth = slider.getBoundingClientRect().width;
        const resizeObserver = new ResizeObserver(() => {
          const width = slider.getBoundingClientRect().width;
          if (width !== lastWidth) {
            lastWidth = width;
            cards.forEach((card) => card.style.removeProperty('min-height'));
            window.requestAnimationFrame(setSliderHeight);
          }
        });
        resizeObserver.observe(slider);
        resizeObservers.push(resizeObserver);

        intervals.push(window.setInterval(() => {
          if (document.visibilityState !== 'visible' || slider.matches(':hover') || slider.contains(document.activeElement)) return;
          const previous = cards[activeIndex];
          activeIndex = (activeIndex + 1) % cards.length;
          const next = cards[activeIndex];
          previous.classList.remove('mobile-slide-active');
          previous.classList.add('mobile-slide-exit');
          next.classList.remove('mobile-slide-exit');
          next.classList.add('mobile-slide-active');
          cards.forEach((card, index) => {
            card.setAttribute('aria-hidden', String(index !== activeIndex));
            card.inert = index !== activeIndex;
          });
          exitTimeouts.push(window.setTimeout(() => previous.classList.remove('mobile-slide-exit'), 650));
        }, slider.classList.contains('inspiration-grid') ? 2000 : 3000));
      });
    };

    configureSliders();
    mobileQuery.addEventListener('change', configureSliders);
    motionQuery.addEventListener('change', configureSliders);
    return () => {
      mobileQuery.removeEventListener('change', configureSliders);
      motionQuery.removeEventListener('change', configureSliders);
      resetSliders();
    };
  }, [activePage, language]);

  return (
    <div className="site-shell">
      {isLoading && <div className="loader-screen" role="status" aria-label="Loading application">
        <div className="startup-spinner" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <span className="loader-label">{tx('Loading', language)}</span>
      </div>}
      <header className="topbar">
        <div className="container nav-wrap">
          <a className="brand nav-brand" href="#top" aria-label={tx('Acharya Shri Vidyasagar Ayurvedic Chikitsalaya', language)}>
            <img className="brand-logo" src="/Hospital Logo.jpeg" alt="" />
            <div><strong>{tx('Acharya Shri Vidyasagar Ayurvedic Chikitsalaya', language)}</strong><span className="nav-brand-meta"><small>{tx('Seva · Swasthya · Sanskar', language)}</small><span className="nav-registration">Reg. No. F-0036633 Kolhapur/2018</span></span></div>
          </a>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={tx('Toggle navigation', language)} aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map(({ key, label }) => <a href={key === 'home' ? '#top' : key === 'about' ? '#about-page' : key === 'hospitals' ? '#hospitals-page' : key === 'gallery' ? '#gallery-page' : '#contact-page'} className={activeNavKey === key ? 'active' : undefined} aria-current={activeNavKey === key ? 'page' : undefined} onClick={(event) => { if (key === 'about' || key === 'hospitals' || key === 'gallery' || key === 'contact') { event.preventDefault(); navigate(key === 'about' ? 'about-page' : key === 'hospitals' ? 'hospitals-page' : key === 'gallery' ? 'gallery-page' : 'contact-page'); } }} key={key}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <div className="language">
              <button onClick={() => setLanguageOpen(!languageOpen)} aria-label={tx('Choose language', language)}>{language} <ChevronDown size={13} /></button>
              {languageOpen && <div className="language-menu"><button onClick={() => changeLanguage('EN')}>English</button><button onClick={() => changeLanguage('HI')}>हिन्दी</button><button onClick={() => changeLanguage('MR')}>मराठी</button><button onClick={() => changeLanguage('KN')}>ಕನ್ನಡ</button></div>}
            </div>
            <button className="donate-button" onClick={openDonation} aria-label={copy.donate}><HeartHandshake size={16} /> <span>{copy.donate}</span></button>
          </div>
        </div>
      </header>

      <main id="top">
        {activePage === 'about' && <AboutPage onBack={() => navigate('top')} onHospital={(index) => navigate(`hospital-${index}`)} onDonate={openProjectDonation} language={language} />}
        {activePage === 'hospitals' && <HospitalsPage onHospital={(index) => navigate(`hospital-${index}`)} language={language} />}
        {activePage === 'gallery' && <GalleryPage language={language} />}
        {activePage === 'contact' && <ContactPage onDonate={openDonation} language={language} />}
        {activePage === 'hospital' && <HospitalPage hospital={hospitals[selectedHospital] ?? hospitals[0]} onBack={() => navigate('hospitals-page')} language={language} />}
        {activePage === 'home' && <>
        <section className="hero" aria-label="Vidyasagar Ayurvedic Chikitsalaya Trust">
          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow">{tx('Traditional wisdom', language)} <i /> {tx('Modern approach', language)}</span>
              <h1>{tx('Compassionate Healthcare for a Healthier Society', language)}</h1>
              <p>{tx('An initiative of Vidyasagar Ayurvedic Chikitsalaya Trust towards providing accessible, authentic and holistic healthcare inspired by the teachings of Acharyashree Vidyasagar Maharaj.', language)}</p>
              <div className="hero-buttons"><a className="button button-green" href="#hospitals">{tx('Explore Our Hospitals', language)} <ArrowRight size={14} /></a><button className="button button-outline" onClick={openDonation}><HeartHandshake size={14} /> <span>{tx('Support Our Mission', language)}</span></button></div>
            </div>
          </div>
        </section>

        <section className="section hospitals" id="hospitals"><div className="container"><div className="section-heading"><span className="eyebrow">{tx('Our Hospital Initiative', language)}</span><h2>{tx('Three Complementary Sections, One Vision', language)}</h2><p>{tx('Integrating Ayush, modern medicine and advanced diagnostics for complete and compassionate care.', language)}</p></div><div className="hospital-grid">{hospitals.map((hospital, index) => <article className={`hospital-card ${hospital.color}`} key={hospital.name}><Photo className="card-photo" position={`photo-card-${index + 1}`} /><div className="hospital-content"><div className="hospital-icon"><hospital.icon size={27} /></div><h3>{tx(hospital.name, language)}</h3><p>{tx(hospital.type, language)}</p><ul>{hospital.features.map((feature) => <li key={feature}><CheckCircle2 size={12} /> <span>{tx(feature, language)}</span></li>)}</ul><a href={`#hospital-${index}`} className="small-button">{tx('View Details', language)} <ArrowRight size={13} /></a></div></article>)}</div></div></section>

        <section className="purpose" id="about-us"><div className="container purpose-inner"><div className="purpose-copy"><span className="eyebrow">{tx('Our Purpose', language)}</span><h2>{tx('Inspired by a Greater Vision', language)}</h2><p>{tx('We strive to make quality healthcare accessible to every individual, promote holistic well-being, and serve the society with compassion, inspired by the teachings of Acharyashree Vidyasagar Maharaj.', language)}</p><button className="text-link" onClick={() => navigate('about-page')}>{tx('Know More About Us', language)} <ArrowRight size={14} /></button></div><div className="purpose-list"><div><HeartPulse size={18} /> {tx('Preventive & Curative Care', language)}</div><div><BookOpen size={18} /> {tx('Research & Education', language)}</div><div><UsersRound size={18} /> {tx('Community Health Programs', language)}</div></div></div></section>

        <section className="stats"><div className="container stats-grid"><div className="stat"><span><Hospital size={17} /></span><div><strong>3</strong><small>{tx('Hospital Sections', language)}</small></div></div><div className="stat"><span><Users size={17} /></span><div><strong>1000+</strong><small>{tx('Lives to Impact', language)}</small></div></div><div className="stat"><span><Activity size={17} /></span><div><strong>{tx('Integrated', language)}</strong><small>{tx('Approach', language)}</small></div></div><div className="stat"><span><UsersRound size={17} /></span><div><strong>{tx('Community', language)}</strong><small>{tx('Focused', language)}</small></div></div><div className="stat"><span><Sprout size={17} /></span><div><strong>{tx('Guided by', language)}</strong><small>{tx('Jain Values', language)}</small></div></div></div></section>

        <section className="section gallery" id="gallery"><div className="container"><div className="section-top"><div><span className="eyebrow">{tx('Gallery & Introduction', language)}</span><h2>{tx('A Glimpse of Our Initiative', language)}</h2><p>{tx('Take a look at our hospitals, facilities and community activities.', language)}</p></div><button className="text-link" onClick={() => navigate('gallery-videos')}>{tx('View Full Gallery', language)} <ArrowRight size={14} /></button></div><div className="gallery-grid"><div className="gallery-feature" onClick={() => navigate('gallery-page')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); navigate('gallery-page'); } }} role="link" tabIndex={0}><VideoPreview src={galleryVideos[2].videoSrc!} /><button className="home-video-play" onClick={(event) => { event.stopPropagation(); setSelectedVideo(galleryVideos[2]); }} aria-label={`${tx('Play', language)} ${tx(galleryVideos[2].title, language)}`}><Play size={23} fill="currentColor" /></button><div className="gallery-caption"><span>{tx(galleryVideos[2].title, language)}</span><small>{tx('4 Videos', language)}</small></div></div><div className="home-gallery-photo"><GalleryPhoto item={{ ...galleryPhotos[1], title: tx(galleryPhotos[1].title, language) }} onClick={() => navigate('gallery-page')} /><span>{tx(galleryPhotos[1].title, language)}</span></div><div className="home-gallery-photo"><GalleryPhoto item={{ ...galleryPhotos[2], title: tx(galleryPhotos[2].title, language) }} onClick={() => navigate('gallery-page')} /><span>{tx(galleryPhotos[2].title, language)}</span></div><div className="home-gallery-photo"><GalleryPhoto item={{ ...galleryPhotos[3], title: tx(galleryPhotos[3].title, language) }} onClick={() => navigate('gallery-page')} /><span>{tx(galleryPhotos[3].title, language)}</span></div><div className="gallery-more" onClick={() => navigate('gallery-videos')} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); navigate('gallery-videos'); } }} role="link" tabIndex={0}><GalleryPhoto item={{ ...galleryPhotos[4], title: tx(galleryPhotos[4].title, language) }} /><span className="home-gallery-more-count">+{galleryPhotos.length - 5}<br /><small>{tx('More Photos', language)}</small></span><span className="home-gallery-name">{tx(galleryPhotos[4].title, language)}</span></div></div></div></section>


        <section className="section home-events" id="events"><div className="container"><div className="section-top"><div><span className="eyebrow">{tx('Latest Events', language)}</span><h2>{tx('News & Events', language)}</h2><p>{tx('Stay updated with our latest activities, health camps and upcoming events.', language)}</p></div><button className="text-link" onClick={() => navigate('gallery-events')}>{tx('View All Events', language)} <ArrowRight size={14} /></button></div><HomeEventCarousel language={language} /></div></section>

        <section className="mission" id="donate"><div className="container mission-inner"><div className="mission-copy"><h2>{tx('Be a Part of Our Mission', language)}</h2><p>{tx('Your support helps us build a healthier society through accessible and authentic healthcare for all.', language)}</p></div><button className="donate-large" onClick={openDonation}><HeartHandshake size={16} /> {tx('Donate Now', language)} <ArrowRight size={15} /></button><strong className="motto">{tx('Seva · Swasthya · Sanskar', language)}</strong></div></section>
        </>}
      </main>
      {donationOpen && <DonationModal onClose={() => setDonationOpen(false)} language={language} project={donationProject} />}
      {selectedVideo && <MediaModal item={selectedVideo} onClose={() => setSelectedVideo(null)} language={language} />}

      <footer id="contact-page">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-logos">
              <a className="brand footer-brand-row" href="#top" aria-label={tx('Acharya Shri Vidyasagar Ayurvedic Chikitsalaya', language)}>
                <img className="footer-logo" src="/Hospital%20Logo.jpeg" alt={tx('Acharya Shri Vidyasagar Ayurvedic Chikitsalaya', language)} />
                <div>
                  <strong>{tx('Acharya Shri Vidyasagar Ayurvedic Chikitsalaya', language)}</strong>
                  <small className="footer-values">{tx('Seva · Swasthya · Sanskar', language)}</small>
                </div>
              </a>
              <a className="brand footer-brand-row" href="#top" aria-label={tx('Vidyasanmatidas', language)}>
                <img className="footer-logo" src="/Sanstha%20Logo.jpg" alt={tx('Vidyasanmatidas', language)} />
                <div>
                  <strong>{tx('Vidyasanmatidas', language)}</strong>
                  <small className="footer-values">{tx('Education · Character · Social Welfare', language)}</small>
                </div>
              </a>
            </div>
            <div className="socials" aria-label={tx('Social media links', language)}>
              <a href="https://www.facebook.com/profile.php?id=61592867458239" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={15} /></a>
              <a href="https://www.instagram.com/aacharyashreechikitsalay_1008/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={15} /></a>
              <Youtube size={15} /><Twitter size={15} />
            </div>
          </div>
          <div className="footer-quick-links"><h4>{tx('Quick Links', language)}</h4><a href="#top">{tx('Home', language)}</a><a href="#about-page">{tx('About Us', language)}</a><a href="#hospitals-page">{tx('Hospitals', language)}</a><a href="#gallery-page">{tx('Gallery', language)}</a><a href="#contact-page">{tx('Contact', language)}</a></div>
          <div className="footer-support-links"><h4>{tx('Support Us', language)}</h4><button className="footer-link" onClick={openDonation}>{tx('Donate', language)}</button><button className="footer-link" onClick={openDonation}>{tx('CSR / Donations', language)}</button><button className="footer-link" onClick={() => navigate('volunteer-form')}>{tx('Become a Volunteer', language)}</button><button className="footer-link" onClick={() => navigate('gallery-events')}>{tx('Community Initiatives', language)}</button></div>
          <div className="footer-contact"><h4>{tx('Contact Details', language)}</h4><p className="footer-address"><MapPin size={15} /><span>{tx('Beside My School, opposite Chaudeshwari Cotton Mill, Kolhapur-Jaysingpur Road, Chipri, Tal. Shirol, Dist. Kolhapur.', language)}</span></p><p><Phone size={15} /><span>{tx('9090641008, 8600882277, 9175254779', language)}</span></p><p><Mail size={15} /><span>info@vidyasagartrust.org</span></p></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 {tx('Vidyasagar Ayurvedic Chikitsalaya', language)}. {tx('All Rights Reserved.', language)}</span><span className="designer-credit">{tx('Designed by', language)} <a href="https://www.linkedin.com/in/aditya-patil-279807251" target="_blank" rel="noreferrer" aria-label={`${tx('Aditya Patil on LinkedIn', language)}`}><Linkedin size={17} /><b>{tx('Aditya Patil', language)}</b></a></span></div>
      </footer>
    </div>
  );
}

export default App;
