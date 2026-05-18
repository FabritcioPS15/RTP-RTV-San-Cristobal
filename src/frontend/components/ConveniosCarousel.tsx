const partners = [
    { id: 1, name: 'Partner 1', logo: 'https://placehold.co/200x100?text=Partner+1' },
    { id: 2, name: 'Partner 2', logo: 'https://placehold.co/200x100?text=Partner+2' },
    { id: 3, name: 'Partner 3', logo: 'https://placehold.co/200x100?text=Partner+3' },
    { id: 4, name: 'Partner 4', logo: 'https://placehold.co/200x100?text=Partner+4' },
    { id: 5, name: 'Partner 5', logo: 'https://placehold.co/200x100?text=Partner+5' },
    { id: 6, name: 'Partner 6', logo: 'https://placehold.co/200x100?text=Partner+6' },
];

function ConveniosCarousel() {
    return (
        <div className="w-full bg-white py-12 relative overflow-hidden group">
            <h2 className="text-4xl font-bold text-center mb-12">Nuestros Convenios</h2>

            {/* Gradient overlays to fade out edges */}
            <div className="absolute top-0 left-0 w-32 h-full z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

            <div className="w-full flex overflow-hidden">
                <div className="flex animate-marquee group-hover:paused min-w-full flex-shrink-0 items-center">
                    {partners.map((partner) => (
                        <div key={partner.id} className="mx-8 w-[200px] flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                            <img src={partner.logo} alt={partner.name} className="h-20 object-contain" />
                        </div>
                    ))}
                    {/* Duplicate for seamless loop - ensuring enough items fill the gap if needed, but the main trick is duplicating the whole set */}
                    {partners.map((partner) => (
                        <div key={`dup-${partner.id}`} className="mx-8 w-[200px] flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                            <img src={partner.logo} alt={partner.name} className="h-20 object-contain" />
                        </div>
                    ))}
                    {/* Triple duplicate just to be safe on wide screens */}
                    {partners.map((partner) => (
                        <div key={`dup2-${partner.id}`} className="mx-8 w-[200px] flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                            <img src={partner.logo} alt={partner.name} className="h-20 object-contain" />
                        </div>
                    ))}
                </div>
                <div aria-hidden="true" className="flex animate-marquee group-hover:paused min-w-full flex-shrink-0 items-center">
                    {/* This second full container is usually not needed if the first one is wide enough and duplicates itself enough, but standard tailwind marquee often uses two identical containers translating. 
                 However, with the translation -100%, we want ONE container to contain ALL needed items to span 2x with enough items.
                 Let's stick to the single container with enough dupes method or the 'two copies' method.
                 Method 2 (Two copies moving together):
                 Actually, the best way for CSS animation is to have TWO identical children of the flex container.
             */}
                    {partners.map((partner) => (
                        <div key={`dup-set2-${partner.id}`} className="mx-8 w-[200px] flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                            <img src={partner.logo} alt={partner.name} className="h-20 object-contain" />
                        </div>
                    ))}
                    {partners.map((partner) => (
                        <div key={`dup-set2-b-${partner.id}`} className="mx-8 w-[200px] flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                            <img src={partner.logo} alt={partner.name} className="h-20 object-contain" />
                        </div>
                    ))}
                    {partners.map((partner) => (
                        <div key={`dup-set2-c-${partner.id}`} className="mx-8 w-[200px] flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                            <img src={partner.logo} alt={partner.name} className="h-20 object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ConveniosCarousel;
