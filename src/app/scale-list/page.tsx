'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Card from '../../components/card';
import { scaleCards, ScaleCard } from "@/components/scales";
import { IUserSong } from '@/models/userSongSchema';

export default function ScaleListPage() {
    const { data: session, status } = useSession();
    const isLoggedIn = status === 'authenticated';

    const [searchQuery, setSearchQuery] = useState('');
    const [userSongs, setUserSongs] = useState<IUserSong[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserSongs = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/scales');
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error fetching user songs: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const data = await response.json();
            if (!data || !Array.isArray(data.songs)) {
                throw new Error("Invalid data format received for user songs.");
            }
            setUserSongs(data.songs);
        } catch (err: any) {
            setError(err.message || "Could not load your saved songs.");
            setUserSongs([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (status !== 'loading') {
            fetchUserSongs();
        } else {
            setIsLoading(true);
        }
    }, [status, fetchUserSongs]);

    const displayScales = useMemo(() => {
        return scaleCards.map(staticCard => {
            const defaultSongTitles = staticCard.songs || [];
            const currentUserSongTitlesForScale = userSongs
                .filter(us => us.scaleName === staticCard.title)
                .map(us => us.songTitle);
            return {
                ...staticCard,
                songs: [...defaultSongTitles, ...currentUserSongTitlesForScale],
            };
        });
    }, [userSongs]);

    const filteredScales = useMemo(() => {
        return displayScales.filter(card => {
            const trimmedQuery = searchQuery.trim().toLowerCase();
            if (!trimmedQuery) return true;
            const searchTerms = trimmedQuery.split(/\s+/);
            const scaleNotesText = card.notes?.split('Notes: ')[1];
            const scaleNotes = scaleNotesText?.split(', ')?.map(note => note.trim().toLowerCase().replace(/♭/g, 'b')) ?? [];
            const normalizedNotesQuery = searchTerms.map(term => term.replace(/sharp/g, '#').replace(/flat/g, 'b').replace(/♭/g, 'b').replace(/([a-g])[ #]*([#b])/gi, '$1$2').replace(/\s/g, '').toLowerCase());
            if (searchTerms.length > 1) {
                if (scaleNotes.length === 0) return false;
                return normalizedNotesQuery.every(note => scaleNotes.includes(note));
            }
            const normalizedQuery = normalizedNotesQuery[0];
            if (!normalizedQuery) return false;
            const hasNoteMatch = scaleNotes.includes(normalizedQuery);
            const hasChordMatch = card.chords?.some(chord => {
                const normChord = chord.toLowerCase().replace(/sharp/g, '#').replace(/flat/g, 'b').replace(/♭/g, 'b').replace(/([a-g])[ #]*([#b])/g, '$1$2').replace(/\s/g, '');
                const rootMatch = normChord.match(/^[a-g][#b]?/);
                const chordRoot = rootMatch ? rootMatch[0] : '';
                return chordRoot === normalizedQuery || normChord === normalizedQuery;
            }) ?? false;
            const hasTitleMatch = card.title?.toLowerCase().includes(normalizedQuery) ?? false;
            const hasSongMatch = card.songs?.some(song => song.toLowerCase().includes(trimmedQuery)) ?? false;
            return hasNoteMatch || hasChordMatch || hasTitleMatch || hasSongMatch;
        });
    }, [displayScales, searchQuery]);

    const handleDeleteSong = useCallback(async (scaleName: string, songTitle: string) => {
        if (!isLoggedIn) { alert("You must be logged in."); return; }
        if (!confirm(`Delete "${songTitle}" from "${scaleName}"?`)) return;
        try {
            const response = await fetch('/api/scales/delete-song', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scaleName, songTitle }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || `Failed to delete: ${response.statusText}`);
            fetchUserSongs();
        } catch (err: any) {
            setError(`Delete failed: ${err.message}`);
        }
    }, [isLoggedIn, fetchUserSongs]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <p>Loading session...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-16 p-4">
            <div className="container max-w-2xl mx-auto flex flex-col gap-6 text-white">
                <div></div>
                <input
                    type="text"
                    placeholder="Search scales, notes, chords, or added songs..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-400 bg-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {isLoading && <p className="text-center text-gray-400">Loading songs...</p>}
                {!isLoading && error && <p className="text-center text-red-400">Error: {error}</p>}

                {!isLoading && !error && filteredScales.map((card) => {
                    const userTitlesForCard = userSongs
                        .filter(us => us.scaleName === card.title)
                        .map(us => us.songTitle);

                    return (
                        <Card
                            key={card.title}
                            title={card.title}
                            notes={card.notes}
                            songs={card.songs}
                            chords={card.chords}
                            className="bg-gray-800 border-gray-700"
                            isLoggedIn={isLoggedIn}
                            temporarySongTitles={userTitlesForCard}
                            onDeleteTemporarySong={handleDeleteSong}
                        >
                            <a
                                href={`/form-submit?scale=${encodeURIComponent(card.title)}`}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors block text-center w-full"
                            >
                                Add Song to "{card.title}"
                            </a>
                        </Card>
                    );
                })}

                {!isLoading && !error && filteredScales.length === 0 && (
                    <p className="text-center text-gray-400">
                        {searchQuery ? "No scales found matching your search." : "No scales available."}
                    </p>
                )}
            </div>
        </div>
    );
}
