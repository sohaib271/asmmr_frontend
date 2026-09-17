import { CalendarDays, Globe2, GraduationCap, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const conferences = [
  {
    id: 'national-research-2015',
    year: '2015',
    title: '1st National Research Conference',
    dates: '14–15 March 2015',
    days: '14–15',
    monthYear: 'March 2015',
    location: 'Islamabad, Pakistan',
    description: 'The Asian Society of Management and Marketing Research (ASMMR) organized this two-day conference in Islamabad, Pakistan.',
    stats: [
      { value: '30+', label: 'Scholars', icon: Users },
      { value: '22', label: 'Universities', icon: GraduationCap },
      { value: '4', label: 'Countries', icon: Globe2 },
    ],
    photos: [
      { src: '/conferences/Screenshot%202026-09-17%20171121.png', alt: 'Scholars and organizers together at the 2015 National Research Conference', caption: 'Conference participants and organizers' },
      { src: '/conferences/Screenshot%202026-09-17%20171035.png', alt: 'Speaker presenting at the ASMMR National Research Conference', caption: 'A presentation at the conference' },
    ],
  },
  {
    id: 'asian-business-2014',
    year: '2014',
    title: '3rd Asian Business Research Conference',
    dates: '15–16 September 2014',
    days: '15–16',
    monthYear: 'September 2014',
    location: 'INSEAD Abu Dhabi, UAE',
    description: 'ASMMR organized its third annual Asian Business Research Conference at INSEAD Abu Dhabi. Speakers included heads of departments, directors, and deans.',
    stats: [
      { value: '35+', label: 'Speakers', icon: Users },
      { value: '25+', label: 'Universities', icon: GraduationCap },
      { value: '17', label: 'Countries', icon: Globe2 },
    ],
    photos: [
      { src: '/conferences/Screenshot%202026-09-17%20172424.png', alt: 'Participants at the 2014 Asian Business Research Conference in Abu Dhabi', caption: 'Conference participants in Abu Dhabi' },
      { src: '/conferences/Screenshot%202026-09-17%20172550.png', alt: 'Speakers at the 2014 Asian Business Research Conference', caption: 'Speakers during a conference session' },
      { src: '/conferences/Screenshot%202026-09-17%20172630.png', alt: 'Attendee reading a conference document', caption: 'A moment from the conference' },
    ],
  },
];

function ConferenceEntry({ conference }) {
  return <section className="conference-entry" aria-labelledby={conference.id}>
    <p className="conference-section-label">{conference.year} · {conference.location}</p>
    <article className="conference-event"><div className="conference-event-header"><div><p className="conference-event-kicker">ASMMR conference archive</p><h2 id={conference.id}>{conference.title}</h2><p>{conference.description}</p></div><div className="conference-date"><strong>{conference.days}</strong><span>{conference.monthYear}</span></div></div><div className="conference-facts"><span><CalendarDays size={19}/>{conference.dates}</span><span><MapPin size={19}/>{conference.location}</span></div><div className="conference-stats">{conference.stats.map(({ value, label, icon: Icon }) => <div key={label}><Icon/><strong>{value}</strong><span>{label}</span></div>)}</div></article>
    <div className={`conference-gallery ${conference.photos.length === 3 ? 'conference-gallery--three' : ''}`}>{conference.photos.map(photo => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy"/><figcaption>{photo.caption}</figcaption></figure>)}</div>
  </section>;
}

export default function PreviousConferencesPage() {
  return <div className="conference-page"><Header/><main>
    <section className="conference-hero"><div className="container conference-hero-grid"><div><p className="conference-eyebrow">Conferences &amp; Events</p><h1>Previous <span>Conferences</span></h1><p>Looking back at the researchers and ideas that brought our community together.</p></div><img src={conferences[0].photos[0].src} alt={conferences[0].photos[0].alt}/></div></section>
    <div className="conference-tabs"><div className="container"><Link to="/conferences/upcoming">Upcoming Conferences</Link><Link className="is-active" to="/conferences/previous" aria-current="page">Previous Conferences</Link><Link to="/conferences/proceedings">Conference Proceedings</Link></div></div>
    <div className="container conference-content">{conferences.map(conference => <ConferenceEntry key={conference.id} conference={conference}/>)}</div>
  </main><Footer/></div>;
}
