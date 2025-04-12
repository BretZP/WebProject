interface CardProps {
    title: string;
    notes: string;
    chords: string;
    songs: string;
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
    return (

        <div className={`border border-gray-300 shadow-sm rounded-lg p-4 bg-white space-y-4 ${className}`}>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={imageAlt || ""}
                    className="w-full h-auto rounded-lg"
                />
            )}
            {title && (
                <h2 className="text-lg font-semibold text-gray-900"> {/* Changed here */}
                    {title}
                </h2>
            )}
            {notes && (
                <p className="text-gray-600">{notes}</p>
            )}
            {chords && (
                <p className="text-gray-600">{chords}</p>
            )}
            {chords && (
                <p className="text-gray-600">{songs}</p>
            )}
            {children}
        </div>
    );
};

export default Card;