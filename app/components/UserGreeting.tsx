"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link";
import Image from "next/image";
import Searcher from './Searcher'

export default function UserGreeting() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="text-center p-5">Lütfen bekleyin, Dedektif çalışıyor... 🕵️‍♂️</div>
  }

  if (status === "unauthenticated") {
    return (
      <div className="text-center p-5">
        <h2 className="text-xl mb-3">Hesabına Giriş Yapmadın!</h2>
        <Link href="/login" className="bg-red-600 text-white px-4 py-2 rounded font-bold">Giriş Ekranına Git</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl ml-4">
        {session?.user?.image && (
          // @ts-ignore
          <Link href={`/profile/${session.user.id}`} >
            <Image src={session.user.image} alt="Profile" width={50} height={50} className="rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
          </Link>
        )}
        <div>
          {/* @ts-ignore */}
          <Link href={`/profile/${session?.user.id}`} >
            <h2 className="text-lg font-bold text-white">{session?.user?.name}</h2>
          </Link>
          <p className="text-sm text-slate-400">{session?.user?.email}</p>
        </div>
        <button onClick={() => signOut()} className="ml-auto bg-slate-700 hover:bg-red-600 px-4 py-2 rounded text-sm text-white hover:text-white cursor-pointer">
          Çıkış
        </button>

      </div>
      <Searcher />
    </div>


  );
}
