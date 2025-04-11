import Card from '../components/card';
// @ts-ignore
import gmajorImage from '../assets/gmajor.PNG';
// @ts-ignore
import cmajorImage from '../assets/cmajor.PNG';
// @ts-ignore
import fminorImage from '../assets/fminor.PNG';


const NonAuthenticatedUserPage = () => {
    return (

        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="container max-w-2xl flex flex-col gap-6">
                <Card
                    title="C Major"
                    notes="Notes: C, D, E, F, G, A, B"
                    chords="Chords: Cmaj7, Dm7, Em7, Fmaj7, G7, Am7, and Bdim7"
                    imageUrl={cmajorImage.src}
                    imageAlt="image of guitar tabs of G Major"
                    className="hover:shadow-lg transition-shadow"
                />

                <Card
                    title="G Major"
                    notes="Notes: G, A, B, C, D, E, F#"
                    chords="Chords: G, Am, Bm, C, D, Em, and F#mb5"
                    imageUrl={gmajorImage.src}
                    imageAlt="G major scale"
                    className="hover:shadow-lg transition-shadow"
                />

                <Card
                    title="F Minor"
                    notes="Notes: F, G, A♭, B♭, C, D♭, E♭"
                    chords="Chords: Fm, Gdim, A♭, B♭m, Cm, D♭, and E♭"
                    imageUrl={fminorImage.src}
                    imageAlt="F minor scale"
                    className="hover:shadow-lg transition-shadow"
                >

                </Card>
            </div>
        </div>
    );
};

export default NonAuthenticatedUserPage;