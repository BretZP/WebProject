'use client'
import { useState } from 'react';
import Card from '../../components/card';
import Navbar from "@/components/Navbar";
import { scaleCards, ScaleCard } from "@/components/scales";

interface SongListProps {
    isLoggedIn: boolean;
}


const SongList = ({ isLoggedIn = true }: SongListProps)  => {
    const [searchQuery, setSearchQuery] = useState('');



    const filteredScales = scaleCards.filter(card => {
        const trimmedQuery = searchQuery.trim().toLowerCase();
        if (!trimmedQuery) return true;

        const searchTerms = trimmedQuery.split(/\s+/);

        const normalizedNotes = searchTerms.map(term =>
            term.replace(/sharp/g, '#')
                .replace(/flat/g, 'b')
                .replace(/♭/g, 'b')
                .replace(/([a-g])[ #]*([#b])/gi, '$1$2')
                .replace(/\s/g, '')
                .toLowerCase()
        );

        const scaleNotes = card.notes.split('Notes: ')[1]
            .split(', ')
            .map(note => note.trim().toLowerCase()
                .replace(/♭/g, 'b'));

        if (searchTerms.length > 1) {
            return normalizedNotes.every(note => scaleNotes.includes(note));
        }

        const normalizedQuery = normalizedNotes[0];

        const hasNoteMatch = scaleNotes.includes(normalizedQuery);

        const hasChordMatch = card.chords.some(chord => {
            const normalizedChord = chord
                .toLowerCase()
                .replace(/sharp/g, '#')
                .replace(/flat/g, 'b')
                .replace(/♭/g, 'b')
                .replace(/([a-g])[ #]*([#b])/g, '$1$2')
                .replace(/\s/g, '');

            const rootMatch = normalizedChord.match(/^[a-g][#b]?/);
            const chordRoot = rootMatch ? rootMatch[0] : '';
            return chordRoot === normalizedQuery || normalizedChord === normalizedQuery;
        });

        return hasNoteMatch || hasChordMatch;
    });

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-black pt-16 p-4">
                <div className="container max-w-2xl mx-auto flex flex-col gap-6 text-white">
                    <div></div>
                    <input
                        type="text"
                        placeholder="Search for a scale"
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-400 bg-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {filteredScales.map((card: ScaleCard, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            notes={card.notes}
                            songs={card.songs}
                            chords={card.chords}
                            imageUrl={card.imageUrl}
                            imageAlt={card.imageAlt}
                            className={card.className}
                        >
                            {isLoggedIn && (
                                <a
                                    href={`../form-submit`}
                                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-green-700 transition-colors block text-center"
                                >
                                    Add songs in this key
                                </a>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SongList;