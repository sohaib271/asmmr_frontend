import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const conferences = [
  {
    id: 'national-research-2015',
    year: '2015',
    title: '1st National Research Conference',
    dates: '14–15 March 2015',
    location: 'Islamabad, Pakistan',
  },
  {
    id: 'asian-business-2014',
    year: '2014',
    title: '3rd Asian Business Research Conference',
    dates: '15–16 September 2014',
    location: 'INSEAD Abu Dhabi, UAE',
  },
];

export default function PreviousConferencesPage() {
  return (
    <div className="conference-page">
      <Header />

      <main>
        {/* Hero */}
        <section className="conference-hero conference-hero--simple">
          <div className="container py-16 md:py-20">
            <p className="conference-eyebrow">
              Conferences & Events
            </p>

            <h1>
              Previous{' '}
              <span className="text-[#81d9f9]">
                Conferences
              </span>
            </h1>

            <p>
              Explore ASMMR's previous academic conferences and events.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="conference-tabs">
          <div className="container flex gap-8 overflow-x-auto">
            <Link
              to="/conferences/upcoming"
              className=""
            >
              Upcoming Conferences
            </Link>

            <Link
              to="/conferences/previous"
              className="is-active"
            >
              Previous Conferences
            </Link>

            <Link
              to="/conferences/proceedings"
              className=""
            >
              Conference Proceedings
            </Link>
          </div>
        </section>

        {/* Conference List */}
        <section className="container conference-content">
          <div className="mb-10">
            <p className="conference-section-label">
              Conference Archive
            </p>

            <h2>
              Previous Conferences
            </h2>
          </div>

          <div className="space-y-5">
            {conferences.map((conference) => (
              <article
                key={conference.id}
                className="conference-event"
              >
                <div className="conference-event-header">
                  
                  {/* Left */}
                  <div>
                    <p className="conference-event-kicker">
                      {conference.year}
                    </p>

                    <h2>
                      {conference.title}
                    </h2>

                    <div className="conference-facts">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={18} />
                        <span>{conference.dates}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{conference.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/conferences/previous/${conference.id}`}
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-[#0b3f77] to-[#0c78b4] px-5 py-3 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    View Details
                    <ArrowRight size={17} />
                  </Link>

                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}