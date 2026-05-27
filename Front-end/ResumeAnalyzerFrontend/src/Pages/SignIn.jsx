import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginApi } from '../services/api'

function SignIn() {

    let navigate = useNavigate()

    let [user, setUser] = useState({
        "username": "",
        "password": ""
    })

    async function handleFormSubmit(e) {

        e.preventDefault()
        
        try{

            let response = await LoginApi(user)

            if (response.status >= 200 && response.status < 300) {
    
                console.log(response.data);
    
                let token = response.data.access
    
                localStorage.setItem('token', `Bearer ${token}`)
    
                localStorage.setItem("refresh", response.data.refresh)
    
                navigate('/dashboard')

                alert("Login successful !!🕷️!!")
    
            }

        }

        catch (error){

            alert("Incorrect Password or username !!🕷️!!")

            console.log(error);  
            
        }
    }

    return (
        <div>
            <div className="h-full font-body bg-ink-950 text-cream antialiased">
                <div className="min-h-screen flex">

                    {/* <!-- ── LEFT BRANDING PANEL ── --> */}
                    <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col justify-between p-12 xl:p-16 overflow-hidden bg-ink-900">

                        {/* <!-- Mesh gradient orbs --> */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-[-10%] left-[-5%] w-120 h-120 rounded-full bg-violet-600 opacity-[0.12] blur-[120px]"></div>
                            <div className="absolute bottom-[-10%] right-[-5%] w-100 h-100 rounded-full bg-sage-500 opacity-[0.10] blur-[120px]"></div>
                            <div className="absolute top-[40%] left-[40%] w-65 h-65 rounded-full bg-violet-500 opacity-[0.06] blur-[80px]"></div>
                        </div>

                        {/* <!-- Subtle grid texture --> */}
                        <div className="absolute inset-0 opacity-[0.025]"
                            style={{ backgroundImage: 'linearGradient(rgba(245,240,232,1) 1px, transparent 1px), linearGradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }}>
                        </div>

                        {/* <!-- Top: Logo mark --> */}
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="font-display font-semibold text-cream text-lg tracking-tight">ResumeAI</span>
                        </div>

                        {/* <!-- Center: Hero copy --> */}
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-medium tracking-wide uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
                                    AI-Powered · ATS-Optimized
                                </div>
                                <h1 className="font-display text-4xl xl:text-5xl leading-[1.1] text-cream">
                                    Land your<br />
                                    <em className="text-violet-400 not-italic">dream role</em><br />
                                    effortlessly.
                                </h1>
                                <p className="text-mist/60 text-base font-light leading-relaxed max-w-sm">
                                    Build, analyze, and optimize your resume with the power of AI. Tailored for each job. Ready in minutes.
                                </p>
                            </div>

                            {/* <!-- Feature pills --> */}
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-mist/70">
                                    <span className="w-7 h-7 rounded-lg bg-sage-500/15 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    ATS score analysis with keyword suggestions
                                </li>
                                <li className="flex items-center gap-3 text-sm text-mist/70">
                                    <span className="w-7 h-7 rounded-lg bg-sage-500/15 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    One-click resume tailoring per job description
                                </li>
                                <li className="flex items-center gap-3 text-sm text-mist/70">
                                    <span className="w-7 h-7 rounded-lg bg-sage-500/15 flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    Free plan · No credit card required
                                </li>
                            </ul>
                        </div>

                        {/* <!-- Bottom: Social proof --> */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-violet-500/40 border-2 border-ink-900 flex items-center justify-center text-xs font-semibold text-violet-300">A</div>
                                    <div className="w-8 h-8 rounded-full bg-sage-500/40 border-2 border-ink-900 flex items-center justify-center text-xs font-semibold text-sage-300">K</div>
                                    <div className="w-8 h-8 rounded-full bg-amber-500/40 border-2 border-ink-900 flex items-center justify-center text-xs font-semibold text-amber-300">R</div>
                                    <div className="w-8 h-8 rounded-full bg-pink-500/40 border-2 border-ink-900 flex items-center justify-center text-xs font-semibold text-pink-300">S</div>
                                </div>
                                <p className="text-mist/50 text-xs">
                                    Trusted by <span className="text-cream font-medium">12,400+</span> job seekers this month
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* <!-- ── RIGHT FORM PANEL ── --> */}
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 xl:px-20 bg-ink-950">

                        {/* <!-- Mobile logo --> */}
                        <div className="lg:hidden flex items-center gap-2.5 mb-10">
                            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="font-display font-semibold text-cream text-lg">ResumeAI</span>
                        </div>

                        <div className="w-full max-w-sm xl:max-w-md">

                            {/* <!-- Header --> */}
                            <div className="mb-8">
                                <h2 className="font-display text-3xl text-cream mb-2">Welcome back</h2>
                                <p className="text-mist/50 text-sm">Sign in to continue building your career.</p>
                            </div>

                            {/* <!-- Card --> */}
                            <div className="rounded-2xl bg-ink-800 p-8 shadow-card border border-white/5">

                                {/* <!-- Form --> */}
                                <form onSubmit={handleFormSubmit} className="space-y-5">

                                    {/* <!-- Email field --> */}
                                    <div className="space-y-1.5">
                                        <label for="email" className="block text-xs font-medium text-mist/80 tracking-wide uppercase">
                                            Email address
                                        </label>
                                        <input onChange={(e) => setUser({ ...user, username: e.target.value })}
                                            id="email"
                                            type="email"
                                            placeholder="you@company.com"
                                            autocomplete="email"
                                            className="w-full px-4 py-3 rounded-xl bg-ink-900 border border-white/10 text-cream placeholder-mist/30 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                        />
                                    </div>

                                    {/* <!-- Password field --> */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <label for="password" className="block text-xs font-medium text-mist/80 tracking-wide uppercase">
                                                Password
                                            </label>
                                            <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors duration-150 font-medium">
                                                Forgot password?
                                            </a>
                                        </div>
                                        <input onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            autocomplete="current-password"
                                            className="w-full px-4 py-3 rounded-xl bg-ink-900 border border-white/10 text-cream placeholder-mist/30 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                        />
                                        {/* <!-- Static error state (hidden by default, shown for demo) --> */}
                                        <p className="text-xs text-red-400/80 flex items-center gap-1.5 mt-1 hidden">
                                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                            </svg>
                                            Incorrect email or password. Please try again.
                                        </p>
                                    </div>

                                    {/* <!-- Remember me --> */}
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex items-center">
                                            <input
                                                id="remember"
                                                type="checkbox"
                                                className="w-4 h-4 rounded bg-ink-900 border border-white/20 text-violet-500 focus:ring-violet-500/30 focus:ring-2 focus:ring-offset-0 accent-violet-500 cursor-pointer"
                                            />
                                        </div>
                                        <label for="remember" className="text-sm text-mist/50 cursor-pointer select-none">
                                            Keep me signed in for 30 days
                                        </label>
                                    </div>

                                    {/* <!-- CTA Button --> */}
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold tracking-wide shadow-btn transition-all duration-200 hover:shadow-violet-500/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 active:scale-[0.98]"
                                    >
                                        Sign in to your account →
                                    </button>

                                </form>

                                {/* <!-- Divider --> */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/8"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-3 bg-ink-800 text-mist/30 text-xs">or continue with</span>
                                    </div>
                                </div>

                                {/* <!-- Social login (Google) --> */}
                                {/* <button
                                    type="button"
                                    className="w-full py-3 px-6 rounded-xl bg-ink-900 border border-white/10 text-mist/70 text-sm font-medium flex items-center justify-center gap-3 hover:border-white/20 hover:text-cream transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/10"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                </button> */}

                            </div>

                            {/* <!-- Footer link --> */}
                            <p className="text-center mt-6 text-sm text-mist/40">
                                Don't have an account?
                                <Link to={'/register'} className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-150 ml-1">
                                    Create one free →
                                </Link>
                            </p>

                            {/* <!-- Legal --> */}
                            <p className="text-center mt-4 text-xs text-mist/25 leading-relaxed">
                                By signing in, you agree to our
                                <a href="#" className="underline underline-offset-2 hover:text-mist/50 transition-colors">Terms</a>
                                and
                                <a href="#" className="underline underline-offset-2 hover:text-mist/50 transition-colors">Privacy Policy</a>.
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default SignIn