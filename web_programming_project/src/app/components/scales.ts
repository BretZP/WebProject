import cmajorImage from '../assets/cmajor.PNG';
import gmajorImage from '../assets/gmajor.PNG';
import fminorImage from '../assets/fminor.PNG';

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
        title: "C Major",
        notes: "Notes: C, D, E, F, G, A, B",
        chords: ["Cmaj7", "Dm7", "Em7", "Fmaj7", "G7", "Am7", "Bdim7"],
        songs: ["Let it be, Beatles", "Californication, Red Hot Chili Peppers"],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "G Major",
        notes: "Notes: G, A, B, C, D, E, F#",
        chords: ["G", "Am", "Bm", "C", "D", "Em", "F#mb5"],
        songs: ["Enter Sandman, Metallica", "Ring of fire, Johny Cash"],
        className: "hover:shadow-lg transition-shadow"
    },
    {
        title: "F Minor",
        notes: "Notes: F, G, A♭, B♭, C, D♭, E♭",
        chords: ["Fm", "Gdim", "A♭", "B♭m", "Cm", "D♭", "E♭"],
        songs: ["Dream On, Aerosmith"],
        className: "hover:shadow-lg transition-shadow",
    }
];