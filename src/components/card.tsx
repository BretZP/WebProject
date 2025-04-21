import { useState, useEffect } from "react";

interface CardProps {
    title: string;
    notes: string;
    chords: string[];
    songs: string[];
    imageUrl?: string;
    imageAlt?: string;
    className?: string;
    children?: React.ReactNode;
}

const Card = ({
                  title,
                  notes,
                  chords,
                  songs,
                  imageUrl,
                  imageAlt,
                  className = "",
                  children
              }: CardProps) => {
    const [songArtworks, setSongArtworks] = useState<(string | null)[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                setLoading(true);
                setError(null);

                const results = await Promise.all(
                    songs.map(async (song) => {
                        try {
                            const response = await fetch(
                                `https://itunes.apple.com/search?term=${encodeURIComponent(song)}&media=music&entity=song&limit=1`
                            );
                            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                            const data = await response.json();
                            const artworkUrl = data.results?.[0]?.artworkUrl100;
                            return artworkUrl ? artworkUrl.replace('100x100bb', '300x300bb') : null;
                        } catch (err) {
                            console.error(`Error fetching artwork for ${song}:`, err);
                            return null;
                        }
                    })
                );

                setSongArtworks(results);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch artworks');
                setSongArtworks([]);
            } finally {
                setLoading(false);
            }
        };

        if (songs.length > 0) {
            fetchArtworks();
        } else {
            setSongArtworks([]);
        }
    }, [songs]);

    return (
        <div className={`border border-gray-300 shadow-sm rounded-lg p-4 bg-white space-y-4 ${className}`}>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={imageAlt || ""}
                    className="w-full h-auto rounded-lg"
                />
            )}
            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
            {notes && <p className="text-gray-600">{notes}</p>}
            {chords?.length > 0 && (
                <p className="text-gray-600">Chords: {chords.join(", ")}</p>
            )}
            {songs?.length > 0 && (
                <div className="space-y-2">
                    <p className="text-gray-600">Songs:</p>
                    {loading && <p className="text-gray-600">Loading artwork...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex flex-wrap gap-4">
                        {songs.map((song, index) => {
                            const artworkUrl = songArtworks[index];
                            return (
                                <div key={song} className="flex flex-col items-center">
                                    {artworkUrl ? (
                                        <img
                                            src={artworkUrl}
                                            alt={`Album artwork for ${song}`}
                                            className="w-24 h-24 rounded-lg"
                                        />
                                    ) : (
                                        !loading && !error && (
                                            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-500 text-xs">No artwork</span>
                                            </div>
                                        )
                                    )}
                                    <span className="text-sm text-gray-600 mt-1">{song}</span>
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