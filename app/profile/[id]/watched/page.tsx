import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

const watchedPage = async ({ params }: { params: { id: string } }) => {
    const resolvedParams = await params;
    const userId = resolvedParams.id;

    const findUser = async () => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    watched: { orderBy: { rating: 'desc' } }
                }
            })
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    const user = await findUser();

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white text-3xl font-bold">Kullanıcı bulunamadı! 🚫</div>
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white py-12 px-5">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-700 pb-5 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-400">
                            ⭐ Tüm Puanlananlar
                        </h1>
                        
                    </div>
                    <Link href={`/profile/${userId}`} className="inline-block border border-pink-600 text-pink-400 hover:bg-pink-600 hover:text-white font-bold py-3 px-8 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(219,39,119,0.3)]">
                        ⬅️ Profile Dön
                    </Link>
                </div>

                {user.watched.length === 0 ? (
                    <div className="text-center mt-20 text-slate-400 text-2xl">Henüz hiçbir filme puan vermedin.</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {user.watched.map((item) => (
                            <Link href={`/movies/${item.movieId}`} key={item.id} className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-800 hover:border-pink-500 transition-all duration-300 transform hover:-translate-y-2">
                                <img src={`https://image.tmdb.org/t/p/w500${item.poster}`} alt={item.title} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" />
                                
                                <span className="absolute top-2 right-2 bg-yellow-500 text-slate-900 border-2 border-slate-900 font-extrabold text-sm w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 group-hover:scale-110 transition-transform">
                                    {item.rating}
                                </span>

                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/80 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white font-bold text-center w-full truncate">{item.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default watchedPage;