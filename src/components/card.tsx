
'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';
import Button from './Button';

interface CardProps {
    title: string;
    notes: string; 
    chords: string[];
    songs: string[]; 
    imageUrl?: string;
    imageAlt?: string;
    className?: string;
    children?: React.ReactNode;
    isLoggedIn?: boolean;
    temporarySongTitles?: string[]; 
    onDeleteTemporarySong?: (scaleTitle: string, songTitle: string) => void; 
    userNoteText?: string | null; 
    onSaveNote?: (scaleTitle: string, newNoteText: string) => Promise<void>; 
}

const Card = ({
    title,
    notes,
    chords,
    songs,
    imageUrl,
    imageAlt,
    className = "",
    children,
    isLoggedIn,
    temporarySongTitles = [],
    onDeleteTemporarySong,
    userNoteText,
    onSaveNote
}: CardProps) => {
    
    const [songArtworks, setSongArtworks] = useState<(string | null)[]>([]);
    const [loadingArtwork, setLoadingArtwork] = useState(false);
    const [errorArtwork, setErrorArtwork] = useState<string | null>(null);

   
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [editText, setEditText] = useState('');
    const [isSavingNote, setIsSavingNote] = useState(false);
    const [noteError, setNoteError] = useState<string | null>(null);

    
    useEffect(() => {
        setEditText(userNoteText || '');
    }, [userNoteText]);

    
    useEffect(() => {
        if (!Array.isArray(songs) || songs.length === 0) {
            setSongArtworks([]); setLoadingArtwork(false); return;
        }
        const fetchArtworks = async () => {
            console.log(`[Card Artwork Fetch] Starting for "${title}" with songs:`, songs);
            setLoadingArtwork(true); setErrorArtwork(null); setSongArtworks(new Array(songs.length).fill(null));
            try {
                const results = await Promise.all(
                    songs.map(async (song) => {
                        if (!song || typeof song !== 'string' || !song.trim()) return null;
                        try {
                            const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(song)}&media=music&entity=song&limit=1`);
                            if (!response.ok) { console.warn(`[Card Artwork Fetch] iTunes API failed for "${song}": ${response.status}`); return null; }
                            const data = await response.json();
                            const artworkUrl = data.results?.[0]?.artworkUrl100;
                            return artworkUrl ? artworkUrl.replace('100x100bb', '300x300bb') : null;
                        } catch (fetchErr) { console.error(`[Card Artwork Fetch] Error fetching for "${song}":`, fetchErr); return null; }
                    })
                );
                console.log(`[Card Artwork Fetch] Results for "${title}":`, results);
                setSongArtworks(results);
            } catch (batchErr) { console.error(`[Card Artwork Fetch] Batch error for "${title}":`, batchErr); setErrorArtwork(batchErr instanceof Error ? batchErr.message : 'Failed to fetch artworks'); setSongArtworks(new Array(songs.length).fill(null)); }
            finally { setLoadingArtwork(false); console.log(`[Card Artwork Fetch] Finished for "${title}".`); }
        };
        fetchArtworks();
    }, [songs, title]);

 
    const handleDeleteSongClick = (songTitleToDelete: string) => {
        if (!onDeleteTemporarySong) { console.error("onDeleteTemporarySong missing"); return; }
        if (!confirm(`Permanently delete "${songTitleToDelete}" from "${title}"?`)) return;
        onDeleteTemporarySong(title, songTitleToDelete);
    } 

  
    const handleEditNoteClick = () => { setEditText(userNoteText || ''); setIsEditingNote(true); setNoteError(null); } 
    const handleCancelNoteClick = () => { setIsEditingNote(false); setNoteError(null); setEditText(userNoteText || ''); } 
    const handleSaveNoteClick = async () => {
        if (!onSaveNote) return; setIsSavingNote(true); setNoteError(null);
        try { await onSaveNote(title, editText); setIsEditingNote(false); }
        catch (error) { setNoteError(error instanceof Error ? error.message : "Failed to save note."); }
        finally { setIsSavingNote(false); }
    } 


   
    return (
        <div className={`border border-gray-700 shadow-lg rounded-lg p-4 bg-gray-800 text-white space-y-4 ${className}`}>
            {/* Scale Image */}
            {imageUrl && (
                 <div className="w-full h-40 relative mb-4 rounded overflow-hidden">
                    <Image src={imageUrl} alt={imageAlt || title || "Scale image"} layout="fill" objectFit="cover" unoptimized={!imageUrl.startsWith('/')}/>
                 </div>
             )}

            {/* Title, Notes, Chords */}
             {title && <h2 className="text-xl font-semibold text-white">{title}</h2>}
             {notes && <p className="text-gray-300 text-sm">{notes}</p>}
             {chords?.length > 0 && <p className="text-gray-300 text-sm">Chords: {chords.join(", ")}</p>}

            {/* --- User Notes Section --- */}
            <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="text-md font-medium text-gray-300">My Notes:</h4>
                    {isLoggedIn && !isEditingNote && (
                        <button onClick={handleEditNoteClick} className="text-xs text-blue-400 hover:text-blue-300" disabled={isSavingNote}> Edit </button>
                    )}
                </div>
                {isEditingNote ? (
                    <div className="space-y-2">
                        <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={3} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Add your notes here..." disabled={isSavingNote}/>
                         {noteError && <p className="text-red-400 text-xs mt-1">{noteError}</p>}
                        <div className="flex justify-end gap-2">
                            <Button onClick={handleCancelNoteClick} variant="secondary" size="sm" disabled={isSavingNote}>Cancel</Button>
                            <Button onClick={handleSaveNoteClick} size="sm" disabled={isSavingNote}>{isSavingNote ? 'Saving...' : 'Save Note'}</Button>
                        </div>
                    </div>
                ) : (
                    <p className={`text-sm min-h-[1.25em] ${userNoteText ? 'text-gray-200 whitespace-pre-wrap' : 'text-gray-500 italic'}`}>
                        {userNoteText || (isLoggedIn ? 'Click "Edit" to add notes.' : 'Log in to add notes.')}
                    </p>
                )}
            </div>
            {/* --- End User Notes Section --- */}


            {/* Songs Section */}
            {Array.isArray(songs) && songs.length > 0 && (
                <div className="space-y-2">
                     <p className="text-gray-300">Songs:</p>
                     {loadingArtwork && <p className="text-gray-400 text-sm">Loading artwork...</p>}
                     {errorArtwork && <p className="text-red-400 text-sm">Error loading artwork: {errorArtwork}</p>}
                     {!loadingArtwork && (
                         <div className="flex flex-wrap gap-4">
                            {songs.map((song, index) => {
                                const artworkUrl = (songArtworks && index < songArtworks.length) ? songArtworks[index] : null;
                                const isUserSong = temporarySongTitles.includes(song);
                                const canDelete = isLoggedIn && isUserSong && onDeleteTemporarySong;

                                return (
                                    <div key={`${song}-${index}-${title}`} className="relative flex flex-col items-center w-24">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md mb-1 bg-gray-700 flex items-center justify-center text-gray-400">
                                            {artworkUrl ? (
                                                <Image src={artworkUrl} alt={`Artwork for ${song}`} width={96} height={96} className="object-cover" unoptimized onError={(e) => console.warn(`Error loading image ${artworkUrl}`)}/>
                                            ) : (
                                                <span className="text-xs text-center px-1">No artwork</span>
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-300 mt-1 text-center block truncate w-full" title={song}>{song}</span>
                                        {canDelete && (
                                            <button onClick={() => handleDeleteSongClick(song)} className="absolute top-0 right-0 z-10 p-1 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-transform transform hover:scale-110 active:scale-95" aria-label={`Delete song: ${song}`} title="Delete this song">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
             )}


            {/* Children (Add Song Page Link/Button) */}
            {children}
        </div>
    );
};

export default Card;