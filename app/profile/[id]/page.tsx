import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
    const resolvedParams = await params;
    const userId = resolvedParams.id;

    const findUser = async () => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    watchList: { take: 9, orderBy: { id: 'desc' } },
                    watched: { take: 9, orderBy: { id: 'desc' } }
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
        <div className="min-h-screen bg-[#0f172a] text-white pb-20">
            <div className="w-full h-48 bg-linear-to-r from-purple-800 to-indigo-900 relative shadow-2xl">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <img
                        src={`${user.image}`}
                        alt="profile-photo"
                        className="w-32 h-32 rounded-full border-4 border-[#0f172a] shadow-[0_0_20px_rgba(168,85,247,0.5)] object-cover"
                    />
                    <h1 className="text-3xl font-extrabold mt-3 drop-shadow-md">{user.name}</h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-32 px-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 shadow-xl">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                            <h2 className="text-2xl font-bold flex items-center gap-2">🍿 İzleme Listesi</h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.watchList.map((i: any) => (
                                <Link href={`/movies/${i.movieId}`} key={i.id} className="relative group overflow-hidden rounded-xl shadow-lg border border-transparent hover:border-purple-500 transition-all duration-300">
                                    <img src={`https://image.tmdb.org/t/p/w500${i.poster}`} alt="poster" className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex items-end">
                                        <p className="text-sm font-bold text-center w-full truncate">{i.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            <Link href={`/profile/${userId}/watchlist`} className="inline-block bg-slate-700 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-xl transition duration-300 w-full md:w-auto shadow-md">
                                Tümünü Gör ➔
                            </Link>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 shadow-xl">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
                            <h2 className="text-2xl font-bold flex items-center gap-2">⭐ Puanlar</h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user.watched.map((i: any) => (
                                <Link href={`/movies/${i.movieId}`} key={i.id} className="relative group overflow-hidden rounded-xl shadow-lg border border-transparent hover:border-pink-500 transition-all duration-300">
                                    <img src={`https://image.tmdb.org/t/p/w500${i.poster}`} alt="poster" className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" />

                                    <span className="absolute top-2 right-2 bg-yellow-500 text-slate-900 border-2 border-slate-900 font-extrabold text-xs w-8 h-8 flex items-center justify-center rounded-full shadow-lg z-10">
                                        {i.rating}
                                    </span>

                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex items-end">
                                        <p className="text-sm font-bold text-center w-full truncate">{i.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            <Link href={`/profile/${userId}/watched`} className="inline-block bg-slate-700 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-xl transition duration-300 w-full md:w-auto shadow-md">
                                Tümünü Gör ➔
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="inline-block border border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white px-8 py-3 rounded-xl transition-all shadow-lg font-medium">
                        Ana Menüye Dön
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage;