"use client";

import { useState, useEffect } from "react";
import MusicPlayer, { Track } from "./components/MusicPlayer";

// Sample data
const tourDates = [
  { id: 1, date: "DEC 15", city: "Los Angeles, CA", venue: "The Wiltern", status: "on-sale" },
  { id: 2, date: "DEC 18", city: "Phoenix, AZ", venue: "The Van Buren", status: "on-sale" },
  { id: 3, date: "DEC 21", city: "Dallas, TX", venue: "House of Blues", status: "low-tickets" },
  { id: 4, date: "DEC 28", city: "Chicago, IL", venue: "Concord Music Hall", status: "on-sale" },
  { id: 5, date: "JAN 03", city: "Detroit, MI", venue: "St. Andrew's Hall", status: "on-sale" },
  { id: 6, date: "JAN 07", city: "New York, NY", venue: "Irving Plaza", status: "sold-out" },
  { id: 7, date: "JAN 10", city: "Boston, MA", venue: "Paradise Rock Club", status: "on-sale" },
  { id: 8, date: "JAN 14", city: "Atlanta, GA", venue: "The Masquerade", status: "on-sale" },
];

const albumTracks: Track[] = [
  { id: 1, title: "CIRCLE OF DEATH", duration: "4:12", durationSeconds: 252 },
  { id: 2, title: "STRANGERS", duration: "3:48", durationSeconds: 228 },
  { id: 3, title: "TERRAFORM", duration: "5:06", durationSeconds: 306 },
  { id: 4, title: "SKIN OF GLASS", duration: "4:33", durationSeconds: 273 },
  { id: 5, title: "A WILTED WALTZ", duration: "4:21", durationSeconds: 261 },
  { id: 6, title: "IS THIS LIMBO..", duration: "6:45", durationSeconds: 405 },
];

const bandMembers = [
  { name: "MARCUS VANE", role: "Vocals", image: "🎤" },
  { name: "DEREK HOLLOW", role: "Lead Guitar", image: "🎸" },
  { name: "JAKE CRIMSON", role: "Rhythm Guitar", image: "🎸" },
  { name: "ASH BONES", role: "Bass", image: "🎸" },
  { name: "TYLER GRAVES", role: "Drums", image: "🥁" },
];

const merchItems = [
  { id: 1, name: "Malice Tour Tee", price: "$35", type: "Apparel" },
  { id: 2, name: "Blood Logo Hoodie", price: "$65", type: "Apparel" },
  { id: 3, name: "Aeternum Vale Vinyl LP", price: "$45", type: "Music" },
  { id: 4, name: "Pentagram Patch Set", price: "$15", type: "Accessories" },
];

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track);
  };

  const handleNextTrack = () => {
    if (currentTrack) {
      const currentIndex = albumTracks.findIndex((t) => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % albumTracks.length;
      setCurrentTrack(albumTracks[nextIndex]);
    }
  };

  const handlePreviousTrack = () => {
    if (currentTrack) {
      const currentIndex = albumTracks.findIndex((t) => t.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? albumTracks.length - 1 : currentIndex - 1;
      setCurrentTrack(albumTracks[prevIndex]);
    }
  };

  return (
    <main className={`min-h-screen ${currentTrack ? "pb-24" : ""}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-lg border-b border-blood/20" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="font-heading text-lg md:text-xl text-bone tracking-widest hover:text-blood-bright transition-colors">
              FMTM
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#tour" className="font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">Tour</a>
              <a href="#music" className="font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">Music</a>
              <a href="#band" className="font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">Band</a>
              <a href="#merch" className="font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">Merch</a>
              <a href="#contact" className="px-5 py-2 bg-blood hover:bg-blood-bright font-body text-sm uppercase tracking-wider text-white transition-all">
                Join The Cult
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-bone"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-charcoal/98 backdrop-blur-lg border-b border-blood/20">
            <div className="px-4 py-4 space-y-4">
              <a href="#tour" onClick={() => setMobileMenuOpen(false)} className="block font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">Tour</a>
              <a href="#music" onClick={() => setMobileMenuOpen(false)} className="block font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">Music</a>
              <a href="#band" onClick={() => setMobileMenuOpen(false)} className="block font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">Band</a>
              <a href="#merch" onClick={() => setMobileMenuOpen(false)} className="block font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">Merch</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-block px-5 py-2 bg-blood hover:bg-blood-bright font-body text-sm uppercase tracking-wider text-white transition-all">
                Join The Cult
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-blood-dark/20 via-background to-background" />
        <div className="absolute inset-0 shatter-bg opacity-30" />
        
        {/* Animated blood drips */}
        <div className="absolute top-0 left-[10%] w-px h-0 bg-gradient-to-b from-blood to-transparent opacity-60" style={{ animation: "drip 4s ease-in-out infinite", animationDelay: "0s" }} />
        <div className="absolute top-0 left-[30%] w-px h-0 bg-gradient-to-b from-blood to-transparent opacity-40" style={{ animation: "drip 4s ease-in-out infinite", animationDelay: "1s" }} />
        <div className="absolute top-0 left-[70%] w-px h-0 bg-gradient-to-b from-blood to-transparent opacity-50" style={{ animation: "drip 4s ease-in-out infinite", animationDelay: "2s" }} />
        <div className="absolute top-0 left-[90%] w-px h-0 bg-gradient-to-b from-blood to-transparent opacity-30" style={{ animation: "drip 4s ease-in-out infinite", animationDelay: "3s" }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="font-body text-blood-bright text-sm md:text-base uppercase tracking-[0.3em] mb-6">
              Deathcore From The Abyss
            </p>
            <div className="mb-8">
              <img 
                src="/FMTM.png" 
                alt="From Misery To Malice" 
                className="w-full max-w-3xl mx-auto h-auto drop-shadow-[0_0_30px_rgba(139,0,0,0.5)]"
              />
            </div>
            <p className="font-body text-mist text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              New album <span className="text-blood-bright font-semibold">&quot;AETERNUM VALE&quot;</span> out now. 
              Witness the chaos on our 2026 tour.
            </p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://www.facebook.com/leprosariumband" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blood hover:bg-blood-bright font-body text-sm uppercase tracking-widest text-white transition-all pulse-blood flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                </svg>
                See Upcoming Shows
              </a>
              <a 
                href="#music" 
                className="px-8 py-4 border-2 border-blood hover:border-blood-bright hover:bg-blood/10 font-body text-sm uppercase tracking-widest text-bone transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Listen Now
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-mist" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Tour Dates Section */}
      <section id="tour" className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-50" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-blood-bright text-sm uppercase tracking-[0.3em] mb-3">On The Road</p>
            <h2 className="font-heading text-4xl md:text-6xl text-bone tracking-wider">TOUR DATES</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blood to-transparent mx-auto mt-6" />
          </div>

          <div className="space-y-3 stagger-children">
            {tourDates.map((show) => (
              <div 
                key={show.id}
                className="tour-card border-l-4 border-blood bg-ash/50 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <div className="text-center min-w-[60px]">
                    <p className="font-display text-2xl md:text-3xl text-blood-bright leading-none">{show.date.split(" ")[0]}</p>
                    <p className="font-body text-xs text-mist uppercase">{show.date.split(" ")[1]}</p>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg md:text-xl text-bone">{show.city}</h3>
                    <p className="font-body text-sm text-mist">{show.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  {show.status === "sold-out" ? (
                    <span className="px-4 py-2 bg-steel/50 font-body text-xs uppercase tracking-wider text-mist">
                      Sold Out
                    </span>
                  ) : (
                    <>
                      {show.status === "low-tickets" && (
                        <span className="px-3 py-1 bg-blood-dark/50 font-body text-xs uppercase tracking-wider text-blood-bright">
                          Low Tickets
                        </span>
                      )}
                      <button className="px-6 py-2 bg-blood hover:bg-blood-bright font-body text-xs uppercase tracking-wider text-white transition-all">
                        Tickets
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#" className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-wider text-mist hover:text-blood-bright transition-colors">
              View All Dates
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Music/Album Section */}
      <section id="music" className="py-20 md:py-32 bg-background relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-blood-bright text-sm uppercase tracking-[0.3em] mb-3">Latest Release</p>
            <h2 className="font-heading text-4xl md:text-6xl text-bone tracking-wider">AETERNUM VALE</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blood to-transparent mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Album Art */}
            <div className="relative group">
              <div className="aspect-square border-2 border-blood/30 relative overflow-hidden">
                <img 
                  src="/FMTM Album.jpg" 
                  alt="Aeternum Vale Album Art" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blood/0 group-hover:bg-blood/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button 
                    onClick={() => handleTrackClick(albumTracks[0])}
                    className="w-16 h-16 bg-blood rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300"
                  >
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Streaming links */}
              <div className="flex justify-center gap-4 mt-6">
                <a href="#" className="p-3 bg-ash hover:bg-steel transition-colors rounded" title="Spotify">
                  <svg className="w-5 h-5 text-bone" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </a>
                <a href="#" className="p-3 bg-ash hover:bg-steel transition-colors rounded" title="Apple Music">
                  <svg className="w-5 h-5 text-bone" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.997 6.124a9.23 9.23 0 00-.24-2.19 4.68 4.68 0 00-1.08-1.91 4.61 4.61 0 00-1.91-1.08c-.79-.22-1.6-.3-2.19-.24-2.03.02-6.37.02-8.58 0-.59-.06-1.4.02-2.19.24a4.61 4.61 0 00-1.91 1.08c-.49.49-.83 1.13-1.08 1.91a9.23 9.23 0 00-.24 2.19c.02 2.03.02 6.37 0 8.58a9.23 9.23 0 00.24 2.19 4.68 4.68 0 001.08 1.91 4.61 4.61 0 001.91 1.08c.79.22 1.6.3 2.19.24 2.03-.02 6.37-.02 8.58 0 .59.06 1.4-.02 2.19-.24a4.61 4.61 0 001.91-1.08c.49-.49.83-1.13 1.08-1.91a9.23 9.23 0 00.24-2.19c-.02-2.03-.02-6.37 0-8.58zM17.5 16.5c0 .69-.56 1.25-1.25 1.25S15 17.19 15 16.5V10c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25v6.5zm-2.5-9c0 .69-.56 1.25-1.25 1.25S12.5 8.19 12.5 7.5V7c0-.69.56-1.25 1.25-1.25S15 6.31 15 7v.5z"/>
                  </svg>
                </a>
                <a href="#" className="p-3 bg-ash hover:bg-steel transition-colors rounded" title="YouTube Music">
                  <svg className="w-5 h-5 text-bone" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="p-3 bg-ash hover:bg-steel transition-colors rounded" title="Bandcamp">
                  <svg className="w-5 h-5 text-bone" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Track List */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-mist text-sm uppercase tracking-wider">6 Tracks • 28:45</p>
                <button 
                  onClick={() => handleTrackClick(albumTracks[0])}
                  className="flex items-center gap-2 font-body text-sm uppercase tracking-wider text-blood-bright hover:text-blood transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Play All
                </button>
              </div>
              
              <div className="space-y-1">
                {albumTracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => handleTrackClick(track)}
                    className={`track-item w-full text-left p-4 flex items-center gap-4 border-b border-steel/30 ${currentTrack?.id === track.id ? "bg-blood/20" : ""}`}
                  >
                    <span className="font-mono text-sm text-mist w-6">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-heading text-bone flex-1 tracking-wide">{track.title}</span>
                    <span className="font-mono text-sm text-mist">{track.duration}</span>
                    {currentTrack?.id === track.id ? (
                      <div className="flex items-center gap-0.5">
                        <div className="w-0.5 h-3 bg-blood-bright animate-pulse" />
                        <div className="w-0.5 h-4 bg-blood-bright animate-pulse" style={{ animationDelay: "0.1s" }} />
                        <div className="w-0.5 h-2 bg-blood-bright animate-pulse" style={{ animationDelay: "0.2s" }} />
                      </div>
                    ) : (
                      <svg className="w-4 h-4 text-mist opacity-0 group-hover:opacity-100" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band Members Section */}
      <section id="band" className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-30" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-blood-bright text-sm uppercase tracking-[0.3em] mb-3">The Collective</p>
            <h2 className="font-heading text-4xl md:text-6xl text-bone tracking-wider">THE BAND</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blood to-transparent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 stagger-children">
            {bandMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="aspect-square bg-ash border border-steel/30 group-hover:border-blood/50 transition-all duration-300 flex items-center justify-center text-5xl mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blood/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 grayscale group-hover:grayscale-0 transition-all duration-300">{member.image}</span>
                </div>
                <h3 className="font-heading text-bone text-sm md:text-base tracking-wider">{member.name}</h3>
                <p className="font-body text-mist text-xs uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Band bio */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="font-body text-mist leading-relaxed">
              Emerging from the depths of the underground metal scene in 2018, <span className="text-bone">From Misery To Malice</span> has 
              carved a brutal path through the deathcore landscape. With bone-crushing breakdowns, guttural vocals, and technically 
              proficient musicianship, the band delivers an unrelenting sonic assault that speaks to the darkness within us all.
            </p>
          </div>
        </div>
      </section>

      {/* Merch Section */}
      <section id="merch" className="py-20 md:py-32 bg-background relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-blood-bright text-sm uppercase tracking-[0.3em] mb-3">Official Gear</p>
            <h2 className="font-heading text-4xl md:text-6xl text-bone tracking-wider">MERCH</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blood to-transparent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 stagger-children">
            {merchItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="aspect-square bg-ash border border-steel/30 group-hover:border-blood/50 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blood-dark/30 to-transparent" />
                  <div className="text-center relative z-10">
                    <p className="font-heading text-bone text-lg tracking-wider">{item.type}</p>
                  </div>
                  <div className="absolute inset-0 bg-blood/0 group-hover:bg-blood/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-body text-sm uppercase tracking-wider text-white bg-blood px-4 py-2">
                      View
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-body text-bone text-sm tracking-wide">{item.name}</h3>
                  <p className="font-display text-blood-bright text-lg">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blood hover:border-blood-bright hover:bg-blood/10 font-body text-sm uppercase tracking-widest text-bone transition-all">
              Shop All Merch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter/Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-30" />
        <div className="absolute inset-0 shatter-bg opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center">
            <p className="font-body text-blood-bright text-sm uppercase tracking-[0.3em] mb-3">Stay Connected</p>
            <h2 className="font-heading text-4xl md:text-6xl text-bone tracking-wider mb-6">JOIN THE CULT</h2>
            <p className="font-body text-mist max-w-xl mx-auto mb-10">
              Subscribe for exclusive content, early access to tickets, and be the first to know about new releases.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-ash border border-steel/50 text-bone font-body placeholder:text-mist focus:outline-none focus:border-blood transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-blood hover:bg-blood-bright font-body text-sm uppercase tracking-wider text-white transition-all"
              >
                Subscribe
              </button>
            </form>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              <a href="#" className="p-3 text-mist hover:text-blood-bright transition-colors" title="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-3 text-mist hover:text-blood-bright transition-colors" title="Twitter/X">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/leprosariumband" target="_blank" rel="noopener noreferrer" className="p-3 text-mist hover:text-blood-bright transition-colors" title="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="p-3 text-mist hover:text-blood-bright transition-colors" title="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="p-3 text-mist hover:text-blood-bright transition-colors" title="TikTok">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-background border-t border-steel/20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-heading text-xl text-bone tracking-widest mb-1">FROM MISERY TO MALICE</p>
              <p className="font-body text-xs text-mist">© 2024 All Rights Reserved</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="font-body text-mist hover:text-blood-bright transition-colors">Press Kit</a>
              <a href="#" className="font-body text-mist hover:text-blood-bright transition-colors">Booking</a>
              <a href="#" className="font-body text-mist hover:text-blood-bright transition-colors">Privacy</a>
              <a href="#" className="font-body text-mist hover:text-blood-bright transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer
        track={currentTrack}
        onClose={() => setCurrentTrack(null)}
        onNext={handleNextTrack}
        onPrevious={handlePreviousTrack}
      />
      </main>
  );
}
