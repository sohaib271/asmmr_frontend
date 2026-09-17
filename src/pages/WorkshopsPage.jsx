import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const workshop = {
  title: 'Quantitative Research & Data Analysis',
  dates: '22–23 March 2015',
  venue: 'Zayed University',
  location: 'Abu Dhabi, UAE',
};

const photos = [
  { src: '/workshops/Screenshot%202026-09-17%20160843.png', alt: 'Workshop participants and organizers together at Zayed University' },
  { src: '/workshops/Screenshot%202026-09-17%20161527.png', alt: 'Presenter explaining data analysis beside a projected spreadsheet' },
  { src: '/workshops/Screenshot%202026-09-17%20161625.png', alt: 'Participants following the workshop with laptops at their tables' },
];

export default function WorkshopsPage() {
  return <div className="training-page"><Header/><main>
    <section className="training-hero"><div className="container"><p className="training-eyebrow">Training &amp; Development / Workshops &amp; Trainings</p><h1>Workshops &amp; Trainings</h1><p>Explore hands-on learning experiences from the ASMMR community.</p></div></section>
    <section className="container training-content" aria-labelledby="featured-workshop-title"><p className="training-kicker">Past workshop · 2015</p><div className="workshop-feature"><div className="workshop-feature-copy"><h2 id="featured-workshop-title">{workshop.title}</h2><p className="workshop-intro">ASMMR organized a two-day workshop on quantitative research and data analysis at Zayed University in Abu Dhabi.</p><div className="workshop-details"><span><CalendarDays size={18}/>{workshop.dates}</span><span><MapPin size={18}/>{workshop.venue}, {workshop.location}</span></div><p className="workshop-credit">Organized by ASMMR</p></div><img className="workshop-feature-photo" src={photos[0].src} alt={photos[0].alt}/></div><div className="workshop-gallery" aria-label="Workshop photos">{photos.slice(1).map(photo => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy"/><figcaption>{photo.alt}</figcaption></figure>)}</div><div className="training-bottom-link"><Link to="/training/seminars">Explore Seminars &amp; Webinars <ArrowRight size={17}/></Link></div></section>
  </main><Footer/></div>;
}
