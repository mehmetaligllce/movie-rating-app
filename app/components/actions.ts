"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/app/lib/prisma"


const getAuthUser = async () => {
    const session = await getServerSession(authOptions);
    
    if(!session || !session.user?.email){
        return { user: null, message: "Oturum açılmamış" }
    }
    
    const user = await prisma.user.findUnique({
        where:{ email: String(session.user.email) }
    });

    if(!user) {
        return { user: null, message: "Kullanıcı veritabanında bulunamadı!" }
    }

    return { user, message: null }
}

export const addWatchList = async (tmdbId: string, title: string, poster: string, isAdded: boolean ) => {
    const { user, message } = await getAuthUser();
    if (!user) return { success: false, message };


    

    if(isAdded) {
        try {
            await prisma.watchList.delete({
                where: {
                    userId_movieId: {
                        userId: user.id,
                        movieId: Number(tmdbId)
                    }
                }
            });
            return { success: true, message: "İzleme listesinden çıkarıldı!" }
        } catch(e) {
            return { success: false, message: "Bir hata oluştu!" }
        }
    }
    else {
        try {
            await prisma.watchList.create({
                data: {
                    userId: user.id,
                movieId: Number(tmdbId),
                title: title,
                poster: poster
            }
        });
        return { success: true, message: "İzleme listesine başarıyla eklendi! " }
    } catch(e) {
        return { success: false, message: "Bu film zaten listende var!" }
    }
    }
}

export const addRating = async (tmdbId: string, title: string, poster: string, rating: number) => {
    const { user, message } = await getAuthUser();
    if (!user) return { success: false, message };

    try {
        await prisma.watched.upsert({
            where: {
                userId_movieId: {
                    userId: user.id,
                    movieId: Number(tmdbId)
                }
            },
            update: {
                rating: rating
            },
            create: {
                userId: user.id,
                movieId: Number(tmdbId),
                title: title,
                poster: poster,
                rating: rating
            }
        });
        return { success: true, message: "Filme puan verildi! ⭐" }
    } catch(e) {
        return { success: false, message: "Bir hata oluştu!" }
    }
}
