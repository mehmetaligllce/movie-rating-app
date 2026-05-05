"use client"
import { signIn } from "next-auth/react"

const loginPage = () => {
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

            <div className="bg-[#1e293b] p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-700/50 z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400 mb-2">Binge-Watch 🍿</h1>
                    <p className="text-slate-400">Favori dizi ve filmlerine geri dön.</p>
                </div>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => signIn("github", { callbackUrl: '/' })} className="block mx-auto w-full flex items-center justify-center gap-3 p-3.5 rounded-xl font-bold transition shadow-lg"
                    >
                        <img src="/images/githubLogo.png" alt="" width={100} height={100} className="rounded-full w-full h-full object-cover "  /> 
                    </button>

                     <button 
                        onClick={() => signIn("google", { callbackUrl: '/' })} className="block mx-auto w-full flex items-center justify-center gap-3 p-3.5 rounded-xl font-bold transition shadow-lg"
                    >
                        <img src="/images/googleLogo.png" alt="" width={100} height={100} className="rounded-full w-full h-full object-cover "  /> 
                    </button>
                    
                    <div className="relative flex items-center py-4">
                        <div className="grow border-t border-slate-700/80"></div>
                        <span className="shrink-0 mx-4 text-slate-500 text-sm font-medium">Klasik Yöntem</span>
                        <div className="grow border-t border-slate-700/80"></div>
                    </div>

                    <button 
                        onClick={() => { console.log('Mail servisi hazırlanıyor...'); }}
                        className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-slate-800/50 text-slate-300 p-3.5 rounded-xl font-semibold transition border border-slate-700"
                    >
                        📧 Email ile Devam Et (Yakında)
                    </button>
                </div>
            </div>
        </div>
    )
}
export default loginPage