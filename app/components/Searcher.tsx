"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation';

const Searcher = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (search.trim() !== "") {
      fetchPoster(search);
    }
  }

  const fetchPoster = async (search: string) => {
    try {
      setError("");
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=b2e8fbc61ae9728f9f897bf26f2aeb5a`);
      const data = await res.json();
      
      if (data.results.length === 0) {
        setError("Bu isimde bir film bulunamadı! 😥");
        return;
      }

      const movieId = data.results[0].id;
      router.push(`/movies/${movieId}`);

    } catch (err) {
      setError("Bağlantı hatası oluştu!");
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-10 px-4">
      <div className="bg-slate-800/60 p-6 sm:p-10 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-3 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 text-center">
          🍿 Ne İzlemek İstersin?
        </h2>
        <p className="text-slate-400 text-center mb-8">Efsanevi filmleri anında bul ve detaylarını keşfet.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Batman, Inception, Matrix..."
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="flex-1 px-6 py-4 rounded-full bg-slate-900 text-white placeholder-slate-500 border border-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition shadow-inner"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          >
            Ara
          </button>
        </div>

        {error && <p className="text-rose-500 text-center mt-6 font-medium bg-rose-500/10 py-2 rounded-xl border border-rose-500/20">{error}</p>}
      </div>
    </div>
  )
}

export default Searcher;
