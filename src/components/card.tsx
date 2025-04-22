
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
    
    onDeleteTemporarySong?: (scaleTitle: string, songTitle: string) => void; 

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
    onDeleteTemporarySong
    
}: CardProps) => {
    
    const [songArtworks, setSongArtworks] = useState<(string | null)[]>([]);
    const [loadingArtwork, setLoadingArtwork] = useState(false);
    const [errorArtwork, setErrorArtwork] = useState<string | null>(null);

    
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [displayNoteText, setDisplayNoteText] = useState(''); 
    const [editText, setEditText] = useState(''); 

 
    useEffect(() => {
        const fetchArtworks = async () => {
            setLoadingArtwork(true); setErrorArtwork(null); setSongArtworks(new Array(songs.length).fill(null));
            try {
                const results = await Promise.all(
                    songs.map(async (song) => {
                        if (!song) return null;
                        try {
                            const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(song)}&media=music&entity=song&limit=1`);
                            if (!response.ok) return null;
                            const data = await response.json();
                            const artworkUrl = data.results?.[0]?.artworkUrl100;
                            return artworkUrl ? artworkUrl.replace('100x100bb', '300x300bb') : null;
                        } catch { return null; }
                    })
                );
                setSongArtworks(results);
            } catch (batchErr) { setErrorArtwork(batchErr instanceof Error ? batchErr.message : 'Failed to fetch artworks'); }
            finally { setLoadingArtwork(false); }
        };
        if (songs?.length) fetchArtworks(); else setSongArtworks([]);
    }, [songs]);



    const handleDeleteSongClick = (songTitleToDelete: string) => {
        if (onDeleteTemporarySong) { 
            if (!confirm(`Permanently delete "${songTitleToDelete}" from "${title}"?`)) {
                return; 
            }
            onDeleteTemporarySong(title, songTitleToDelete); 
        } else {
            console.error("onDeleteTemporarySong handler is missing from Card props");
        }
    };


   
    const handleEditNoteClick = () => {
        setEditText(displayNoteText);
        setIsEditingNote(true);
    };

    const handleCancelNoteClick = () => {
        setIsEditingNote(false);
    };

    const handleSaveNoteClick = () => {
        setDisplayNoteText(editText); 
        setIsEditingNote(false); 
        console.log(`Frontend Note "Saved" for ${title}:`, editText); 
    };


   
    return (
        <div className={`border border-gray-700 shadow-lg rounded-lg p-4 bg-gray-800 text-white space-y-4 ${className}`}>
       
            {imageUrl && <div className="w-full h-40 relative mb-4 rounded overflow-hidden"><Image src={imageUrl} alt={imageAlt || title || "Scale image"} layout="fill" objectFit="cover" unoptimized={!imageUrl.startsWith('/')}/></div>}
            {title && <h2 className="text-xl font-semibold text-white">{title}</h2>}
            {notes && <p className="text-gray-300 text-sm">{notes}</p>}
            {chords?.length > 0 && <p className="text-gray-300 text-sm">Chords: {chords.join(", ")}</p>}

             
            <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="text-md font-medium text-gray-300">My Notes:</h4>
                    {isLoggedIn && !isEditingNote && (
                        <button onClick={handleEditNoteClick} className="text-xs text-blue-400 hover:text-blue-300">Edit</button>
                    )}
                </div>
                {isEditingNote ? (
                    <div className="space-y-2">
                        <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={3} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Add your notes here (frontend only)..."/>
                        <div className="flex justify-end gap-2">
                            <Button onClick={handleCancelNoteClick} variant="secondary" size="sm">Cancel</Button>
                            <Button onClick={handleSaveNoteClick} size="sm">Save (Local)</Button>
                        </div>
                    </div>
                 ) : (
                    <p className={`text-sm min-h-[1.25em] ${displayNoteText ? 'text-gray-200 whitespace-pre-wrap' : 'text-gray-500 italic'}`}>
                        {displayNoteText || (isLoggedIn ? 'Click "Edit" to add notes' : 'Log in to add notes.')}
                    </p>
                 )}
            </div>
            
            {songs?.length > 0 && (
                <div className="space-y-2">
                    <p className="text-gray-300">Songs:</p>
                    {loadingArtwork && <p className="text-gray-400 text-sm">Loading artwork...</p>}
                    {errorArtwork && <p className="text-red-400 text-sm">Error loading artwork: {errorArtwork}</p>}
                    <div className="flex flex-wrap gap-4">
                        {songs.map((song, index) => {
                            const artworkUrl = songArtworks[index];
                            
                            const canDelete = isLoggedIn && onDeleteTemporarySong;

                            return (
                                <div key={`${song}-${index}`} className="relative flex flex-col items-center w-24">
                                    
                                    <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md mb-1 bg-gray-700 flex items-center justify-center text-gray-400">
                                        {artworkUrl ? <Image src={artworkUrl} alt={`...`} width={96} height={96} className="object-cover" unoptimized/> : !loadingArtwork && <span className="text-xs ...">No artwork</span>}
                                    </div>
                                    
                                    <span className="text-sm text-gray-300 mt-1 text-center block truncate w-full" title={song}>{song}</span>

                                   
                                    {canDelete && (
                                        <button
                                            
                                            onClick={() => handleDeleteSongClick(song)}
                                            className="absolute top-0 right-0 z-10 p-1 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-transform transform hover:scale-110 active:scale-95"
                                            aria-label={`Delete song: ${song}`}
                                            title="Delete this song"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    )}
                                  
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

          
            {children}
        </div>
    );
};

export default Card;