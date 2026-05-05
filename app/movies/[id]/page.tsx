import Image from "next/image";
import Link from "next/link";
import MovieActions from "@/app/components/MovieActions";

const MoviePage = async ({ params }: { params: { id: string } }) => {
    const resolvedParams = await params;
    const movieId = resolvedParams.id;
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=tr-TR&api_key=${process.env.TMDB_API_KEY}`);
    const movie = await res.json();


    if (!movie.poster_path) {
        return <div className="text-center mt-20 text-white text-2xl">Aranan Film Bulunamadı veya Bu Bir Dizi! 🚫</div>
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white py-12 px-5">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl">

                <div className="shrink-0 mx-auto">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.7)] hover:scale-105 transition duration-500 max-w-[300px]"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-linear-to-r from-red-500 to-yellow-500">
                        {movie.title}
                    </h1>
                    <p className="text-slate-400 italic mb-6 text-lg">{movie.tagline}</p>

                    <div className="flex gap-4 mb-6">
                        <span className="bg-red-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg w-22 h-22 flex items-center justify-center">⭐ {movie.vote_average?.toFixed(1)} / 10</span>
                        <span className="bg-slate-700 px-4 py-1.5 rounded-full text-sm shadow-lg w-22 h-22 flex items-center justify-center">📅 {movie.release_date}</span>
                        <span className="bg-green-600 px-4 py-1.5 rounded-full text-sm shadow-lg w-22 h-22 flex items-center justify-center">⏱️ {movie.runtime} Dk</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 border-b border-slate-700 pb-2">Özet</h3>
                    <p className="text-lg leading-relaxed text-slate-300">
                        {movie.overview || "Bu film için Türkçe bir özet girilmemiş. Mükemmel bir gizem!"}
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-6">
                        <MovieActions tmdbId={movieId} movieTitle={movie.title} moviePoster={movie.poster_path} />

                        <Link href="/" className="mt-4 border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white px-6 py-2 rounded-xl transition font-bold shadow-lg">
                            ⬅️ Geri Dön
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MoviePage;