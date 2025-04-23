export interface ScaleCard {
    title: string;
    notes: string;
    chords: string[];
    songs: string[];
    imageUrl?: string;
    imageAlt?: string;
    className: string;
}

export const scaleCards: ScaleCard[] = [
    {
        title: "C Major / C Minor",
        notes: "Notes: C, D, E, F, G, A, B",
        chords: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        // songs: ["Let it be, Beatles", "Californication, Red Hot Chili Peppers"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "G Major",
        notes: "Notes: G, A, B, C, D, E, F#",
        chords: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
        // songs: ["Enter Sandman, Metallica", "Ring of fire, Johny Cash"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "D Major",
        notes: "Notes: D, E, F#, G, A, B, C#",
        chords: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
        // songs: ["Hotel California, The Eagles"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "A Major",
        notes: "Notes: A, B, C#, D, E, F#, G#",
        chords: ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
        // songs: ["Wonderwall, Oasis", "Numb, Meteora, Linkin Park"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "E Major",
        notes: "Notes: E, F#, G#, A, B, C#, D#",
        chords: ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
        // songs: ["John Mayor - Slow Dancing In A Burning Room"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "B Major",
        notes: "Notes: B, C#, D#, E, F#, G#, A#",
        chords: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"],
        // songs: ["Heart Shaped Box"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "F# Major",
        notes: "Notes: F#, G#, A#, B, C#, D#, E#",
        chords: ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#dim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "C# Major",
        notes: "Notes: C#, D#, E#, F#, G#, A#, B#",
        chords: ["C#", "D#m", "E#m", "F#", "G#", "A#m", "B#dim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "F Major",
        notes: "Notes: F, G, A, B♭, C, D, E",
        chords: ["F", "Gm", "Am", "B♭", "C", "Dm", "Edim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "B♭ Major",
        notes: "Notes: B♭, C, D, E♭, F, G, A",
        chords: ["B♭", "Cm", "Dm", "E♭", "F", "Gm", "Adim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "E♭ Major",
        notes: "Notes: E♭, F, G, A♭, B♭, C, D",
        chords: ["E♭", "Fm", "Gm", "A♭", "B♭", "Cm", "Ddim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "A♭ Major",
        notes: "Notes: A♭, B♭, C, D♭, E♭, F, G",
        chords: ["A♭", "B♭m", "Cm", "D♭", "E♭", "Fm", "Gdim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "C♭ Major",
        notes: "Notes: C♭, D♭, E♭, F♭, G♭, A♭, C♭",
        chords: ["C♭", "D♭m", "E♭m", "F♭", "G♭", "A♭m", "B♭dim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "G♭ Major",
        notes: "Notes: G♭, A♭, B♭, C♭, D♭, E♭, F",
        chords: ["G♭", "A♭m", "B♭m", "C♭", "D♭", "E♭m", "Fdim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "D♭ Major",
        notes: "Notes: D♭, E♭, F, G♭, A♭, B♭, C",
        chords: ["D♭", "E♭m", "Fm", "G♭", "A♭", "B♭m", "Cdim"],
        songs: [],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "F Minor",
        notes: "Notes: F, G, A♭, B♭, C, D♭, E♭",
        chords: ["Fm", "Gdim", "A♭", "B♭m", "Cm", "D♭", "E♭"],
        // songs: ["Dream On, Aerosmith"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "E Minor",
        notes: "Notes: E, F#, G, A, B, C, D",
        chords: ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "B Minor",
        notes: "Notes: B, C#, D, E, F#, G, A",
        chords: ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "F# Minor",
        notes: "Notes: F#, G#, A, B, C#, D, E",
        chords: ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "C# Minor",
        notes: "Notes: C#, D#, E, F#, G#, A, B",
        chords: ["C#m", "D#dim", "E", "F#m", "G#m", "A", "B"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "G# Minor",
        notes: "Notes: G#, A#, B, C#, D#, E, F#",
        chords: ["G#m", "A#dim", "B", "C#m", "D#m", "E", "F#"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "D# Minor",
        notes: "Notes: D#, E#, F#, G#, A#, B, C#",
        chords: ["D#m", "E#dim", "F#", "G#m", "A#m", "B", "C#"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "A# Minor",
        notes: "Notes: A#, B#, C#, D#, E#, F, G#",
        chords: ["A#m", "B#dim", "C#", "D#m", "E#m", "F#", "G#"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "A♭ Minor",
        notes: "Notes: A♭, B♭, C♭, D♭, E♭, F♭, G♭",
        chords: ["A♭m", "B♭dim", "C♭", "D♭m", "E♭m", "F♭", "G♭"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "E♭ Minor",
        notes: "Notes: A♭, F, G♭, A♭, B♭, C♭, E♭",
        chords: ["E♭m", "Fdim", "G♭", "A♭m", "B♭m", "C♭", "D♭"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "B♭ Minor",
        notes: "Notes: B♭, C, D♭, E♭, F, G♭, A♭",
        chords: ["B♭m", "Cdim", "D♭", "E♭m", "Fm", "G♭", "A♭"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "C Minor",
        notes: "Notes: C, D, E♭, F, G, A♭, B♭",
        chords: ["Cm", "Ddim", "E♭", "Fm", "Gm", "A♭", "B♭"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "G Minor",
        notes: "Notes: G, A, B♭, C, D, E♭, F",
        chords: ["Gm", "Adim", "B♭", "Cm", "Dm", "E♭", "F"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
    {
        title: "D Minor",
        notes: "Notes: D, E, F, G, A, B♭, C",
        chords: ["Dm", "Edim", "F♭", "Gm", "Am", "B♭", "C"],
        songs: [],
        className: "hover:shadow-lg transition-shadow",
    },
];