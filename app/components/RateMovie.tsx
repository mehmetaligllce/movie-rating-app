"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { addRating } from './actions';

interface MovieActionProps {
    tmdbId: string | number;
    movieTitle: string;
    moviePoster: string;
    setRated: (rated: boolean) => void;
    setOuterMesaj: (m: string) => void;
    setIsSuccess: (s: boolean) => void;
}

const RateMovie = ({ tmdbId, movieTitle, moviePoster, setRated, setOuterMesaj, setIsSuccess }: MovieActionProps) => {
    const router = useRouter();
    const [rating, setRating] = useState("5");

    const handleRated = async () => {
        const response = await addRating(String(tmdbId), movieTitle, moviePoster, Number(rating));

        setIsSuccess(response.success);
        setOuterMesaj(response.message);
        setRated(false);

        setTimeout(() => { setOuterMesaj("") }, 3000);
    }

    return (

        <div className="flex flex-col items-center gap-5 p-6 bg-slate-900/60 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl w-full max-w-sm mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-medium text-slate-200">Bu filme puanın kaç?</h3>

            <div className="flex items-center gap-4 w-full px-2">
                <span className="text-slate-400 font-bold">1</span>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                />
                <span className="text-slate-400 font-bold">10</span>
            </div>

            <div className="flex items-baseline justify-center">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 drop-shadow-md">
                    {rating}
                </span>
                <span className="text-xl text-slate-500 ml-2 font-medium">/ 10</span>
            </div>

            <button
                onClick={handleRated}
                className="w-full py-3 mt-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
            >
                Puanı Gönder
            </button>
        </div>
    )

}

export default RateMovie;
