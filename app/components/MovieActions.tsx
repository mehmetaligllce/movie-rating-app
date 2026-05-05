"use client"
import { useState } from "react";
import { addWatchList } from './actions'
import RateMovie from "./RateMovie";

interface MovieActionProps {
    tmdbId: string | number;
    movieTitle: string;
    moviePoster: string;
}
const MovieActions = ({ tmdbId, movieTitle, moviePoster }: MovieActionProps) => {
    const [rated, setRated] = useState(false);
    const [mesaj, setMesaj] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    const handleWatchList = async () => {
        const response = await addWatchList(String(tmdbId), movieTitle, moviePoster, isAdded);
        setIsSuccess(response.success);
        setMesaj(response.message);
        setIsAdded(!isAdded);
        setTimeout(() => { setMesaj("") }, 3000);
    }

    return (
        <div className="flex flex-col items-center w-full">
            {mesaj && (
                <div className={`mb-4 px-4 py-2 rounded-lg font-bold shadow-lg text-center animate-in fade-in slide-in-from-top-4 ${isSuccess ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                    {mesaj}
                </div>
            )}
            <div className="flex flex-col items-center justify-center w-full mt-2">

                <div className="flex flex-row items-center justify-center gap-6">
                    <button
                        onClick={handleWatchList}
                        className="flex flex-col items-center justify-center bg-red-600 hover:bg-red-500 text-white font-bold w-32 h-32 rounded-2xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] cursor-pointer transform hover:scale-105"
                    >
                        <span className="text-4xl mb-2 drop-shadow-md">➕</span>
                        <span className="text-sm text-center px-1 leading-tight font-medium">{isAdded ? "Listeden Çıkar" : "Listeye Ekle"}</span>
                    </button>

                    <button
                        onClick={() => setRated(!rated)}
                        className="flex flex-col items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold w-32 h-32 rounded-2xl transition-all shadow-[0_0_15px_rgba(234,579,8,0.4)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] cursor-pointer transform hover:scale-105"
                    >
                        <span className="text-4xl mb-2 drop-shadow-md">⭐</span>
                        <span className="text-sm text-center px-1 leading-tight font-medium">Puan Ver</span>
                    </button>
                </div>

                {rated && (
                    <div className="w-full flex justify-center mt-6 animate-in slide-in-from-top-4 duration-300">
                        <RateMovie
                            tmdbId={tmdbId}
                            movieTitle={movieTitle}
                            moviePoster={moviePoster}
                            setRated={setRated}
                            setOuterMesaj={setMesaj}
                            setIsSuccess={setIsSuccess}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieActions;