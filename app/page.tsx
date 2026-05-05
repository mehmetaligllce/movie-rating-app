import TrendingMovies from "./components/TrendingMovies";
import UserGreeting from "./components/UserGreeting";
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-5 font-sans">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400 ">
            Binge-Watch 🍿
          </h1>
          
          
          
      </div>
      <UserGreeting />
      <TrendingMovies/>

      <br /><br /><br />
        <p className="text-center text-amber-400">“Al final, todo valdrá la pena.”</p>

      
    </div>
  );
}


