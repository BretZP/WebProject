
'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Card from '../../components/card';
import { scaleCards, ScaleCard } from "@/components/scales"; 
import { IUserSong } from '@/models/userSongSchema';


type UserNotesState = Record<string, string>;

export default function ScaleListPage() {
    const { data: session, status } = useSession();
    const isLoggedIn = status === 'authenticated';

    const [searchQuery, setSearchQuery] = useState('');
    const [userSongs, setUserSongs] = useState<IUserSong[]>([]); 
    const [userNotes, setUserNotes] = useState<UserNotesState>({}); 
    const [isLoadingSongs, setIsLoadingSongs] = useState(true);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true); 
    const [error, setError] = useState<string | null>(null); 


    const fetchUserSongs = useCallback(async () => {
        
        if (status !== 'authenticated') {
            setUserSongs([]);
            setIsLoadingSongs(false);
            return;
        }
        setIsLoadingSongs(true);
        
        try {
            const response = await fetch('/api/scales'); 
            if (!response.ok) throw new Error(`API Error fetching songs: ${response.statusText}`);
            const data = await response.json();
            if (!data || !Array.isArray(data.songs)) throw new Error("Invalid data format for user songs.");
            setUserSongs(data.songs);
        } catch (err: any) {
            setError(prev => prev ? `${prev}\nSong Error: ${err.message}` : `Song Error: ${err.message}`);
            setUserSongs([]);
        } finally {
            setIsLoadingSongs(false);
        }
    }, [status]); 

    
    const fetchUserNotes = useCallback(async () => {
        if (status !== 'authenticated') {
            setUserNotes({});
            setIsLoadingNotes(false);
            return; 
        }
        setIsLoadingNotes(true);
        
        try {
            const response = await fetch('/api/user-notes'); 
            if (!response.ok) throw new Error(`API Error fetching notes: ${response.statusText}`);
            const data = await response.json();
            
            if (!data || typeof data.notes !== 'object' || data.notes === null) {
                 throw new Error("Invalid data format for notes.");
            }
            setUserNotes(data.notes);
        } catch (err: any) {
             setError(prev => prev ? `${prev}\nNotes Error: ${err.message}` : `Notes Error: ${err.message}`);
            setUserNotes({});
        } finally {
            setIsLoadingNotes(false);
        }
    }, [status]); 

    
    useEffect(() => {
        if (status !== 'loading') {
            fetchUserSongs();
            fetchUserNotes();
        } else {
            
            setIsLoadingSongs(true);
            setIsLoadingNotes(true);
        }
    }, [status, fetchUserSongs, fetchUserNotes]);

    
    const displayScales = useMemo(() => {
        return scaleCards.map(staticCard => {
            const defaultSongTitles = staticCard.songs || [];
            const currentUserSongTitlesForScale = userSongs
                .filter(us => us.scaleName === staticCard.title)
                .map(us => us.songTitle);
            const noteForThisScale = userNotes[staticCard.title] || ''; 

            return {
                ...staticCard,
                songs: [...defaultSongTitles, ...currentUserSongTitlesForScale],
                userNote: noteForThisScale,
            };
        });
    }, [userSongs, userNotes]); 

    
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
            const hasChordMatch = card.chords?.some(chord => { const normChord = chord.toLowerCase().replace(/sharp/g, '#').replace(/flat/g, 'b').replace(/♭/g, 'b').replace(/([a-g])[ #]*([#b])/g, '$1$2').replace(/\s/g, ''); const rootMatch = normChord.match(/^[a-g][#b]?/); const chordRoot = rootMatch ? rootMatch[0] : ''; return chordRoot === normalizedQuery || normChord === normalizedQuery; }) ?? false;
            const hasTitleMatch = card.title?.toLowerCase().includes(normalizedQuery) ?? false;
            const hasSongMatch = card.songs?.some(song => song.toLowerCase().includes(trimmedQuery)) ?? false;
            
            return hasNoteMatch || hasChordMatch || hasTitleMatch || hasSongMatch /* || hasUserNoteMatch */;
        });
    }, [displayScales, searchQuery]);

    
    const handleDeleteSong = useCallback(async (scaleName: string, songTitle: string) => {
        if (!isLoggedIn) { alert("You must be logged in."); return; }
        if (!confirm(`Delete "${songTitle}" from "${scaleName}"?`)) return;
        setError(null); 
        try {
            const response = await fetch('/api/scales/delete-song', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scaleName, songTitle }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || `Failed to delete song: ${response.statusText}`);
            fetchUserSongs(); 
        } catch (err: any) {
            setError(`Delete failed: ${err.message}`);
        }
    }, [isLoggedIn, fetchUserSongs]); 

    
    const handleSaveNote = useCallback(async (scaleName: string, notesText: string): Promise<void> => { 
        if (!isLoggedIn) { alert("You must be logged in."); return Promise.reject("Not logged in"); }
        setError(null);
        try {
            const response = await fetch('/api/user-notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scaleName, notesText }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || `Failed to save note.`);
            
            setUserNotes(prev => ({ ...prev, [scaleName]: notesText }));
           
            return Promise.resolve();
        } catch (err: any) {
            setError(`Save note failed: ${err.message}`);
            
            return Promise.reject(err);
        }
    }, [isLoggedIn]); 


    
    const isContentLoading = status === 'loading' || isLoadingSongs || isLoadingNotes;

   
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
                <input
                    type="text"
                    placeholder="Search scales, notes, chords, songs, or your notes..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-400 bg-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {isContentLoading && <p className="text-center text-gray-400">Loading data...</p>}
                {!isContentLoading && error && <p className="text-center text-red-400">Error: {error}</p>}

                {!isContentLoading && !error && filteredScales.map((card) => {
                    
                    const userTitlesForCard = userSongs
                        .filter(us => us.scaleName === card.title)
                        .map(us => us.songTitle);
                    
                    const noteForThisCard = card.userNote || '';

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
                            userNoteText={noteForThisCard} 
                            onSaveNote={handleSaveNote} 
                        >
                           {/* Link to Add Song Form Page */}
                           <a
                               href={`/form-submit?scale=${encodeURIComponent(card.title)}`}
                               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors block text-center w-full"
                           >
                                Add Song to "{card.title}"
                            </a>
                        </Card>
                    );
                 })}

                {/* No Results Message */}
                {!isContentLoading && !error && filteredScales.length === 0 && (
                    <p className="text-center text-gray-400">
                         {searchQuery ? "No scales found matching your search." : "No scales available."}
                     </p>
                )}
            </div>
        </div>
    );
}