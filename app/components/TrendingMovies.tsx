import Link from "next/link";

const TrendingMovies = async () => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?language=tr-TR&api_key=${process.env.TMDB_API_KEY}`);
        const data = await res.json();
        const filmler = data.results;
         return(
        <div className="mt-10 w-full max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-white pl-4 border-l-4 border-red-500">🔥 Haftanın Trendleri</h3>
            
            <div className="flex gap-4 overflow-x-auto pb-5 px-4 scrollbar-hide">
                {filmler.map((film:any)=>(
                    <Link href={`/movies/${film.id}`} key={film.id} className="min-w-[150px] md:min-w-[200px] flex-none group cursor-pointer transition-transform transform hover:scale-105">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} 
                            alt={film.title || film.name} 
                            className="rounded-xl shadow-lg w-full h-[225px] md:h-[300px] object-cover border border-slate-700"
                        />
                        <h3 className="text-center mt-3 font-semibold text-sm text-slate-300 truncate">
                            {film.title||film.name}
                        </h3>
                    </Link>
                ))}
            </div>
            
        </div>
    )
    }
    catch (err) {
        console.log(`Bir hata ile karşılaştık : ${err}`);
    }
}
export default TrendingMovies