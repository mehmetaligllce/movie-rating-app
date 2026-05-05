import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

const watchListPage = async ({ params }: { params: { id: string } }) => {
    const resolvedParams = await params;
    const userId = resolvedParams.id;

    const findUser = async () => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    watchList: { orderBy: { id: 'desc' } }
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
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-400">
                            🍿 Tüm İzleme Listesi
                        </h1>
                        <p className="text-slate-400 mt-2 text-lg">Toplam {user.watchList.length} film bekliyor</p>
                    </div>
                    <Link href={`/profile/${userId}`} className="inline-block border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white font-bold py-3 px-8 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                        ⬅️ Profile Dön
                    </Link>
                </div>

                {user.watchList.length === 0 ? (
                    <div className="text-center mt-20 text-slate-400 text-2xl">Listeye henüz hiç film eklemedin.</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {user.watchList.map((item) => (
                            <Link href={`/movies/${item.movieId}`} key={item.id} className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-800 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
                                <img src={`https://image.tmdb.org/t/p/w500${item.poster}`} alt={item.title} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" />
                                
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
export default watchListPage;