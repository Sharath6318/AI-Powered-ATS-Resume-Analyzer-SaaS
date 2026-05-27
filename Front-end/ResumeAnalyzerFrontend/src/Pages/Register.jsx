import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RegiserApi } from '../services/api';

function Register() {

    let navigate = useNavigate()

    let [isChecked, setIsChecked] = useState(false);

    let [userdetail, SetUserDetail] = useState({
        "username": "",
        "email": "",
        "password": "",
    })

    async function HandleFromSubmit(e) {

        e.preventDefault()

        if (!isChecked) {

            alert("Please accept terms and conditions");

            return;
        }

        // console.log(userdetail);

        let response = await RegiserApi(userdetail)

        if (response.status >= 200 && response.status < 300){

            console.log(response.data);

            navigate('/')
            
        }

    }


    return (
        <div>
            <div className="min-h-screen font-body bg-ink-950 text-cream antialiased">
                <div className="min-h-screen flex">

                    {/* <!-- ── LEFT BRANDING PANEL ── --> */}
                    <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col justify-between p-12 xl:p-16 overflow-hidden bg-ink-900">

                        {/* <!-- Mesh gradient orbs (different placement from login htmlFor variety) --> */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-[10%] right-[-8%] w-105 h-105 rounded-full bg-sage-500 opacity-[0.10] blur-[130px]"></div>
                            <div className="absolute bottom-[-5%] left-[-5%] w-95 h-95 rounded-full bg-violet-600 opacity-[0.12] blur-[120px]"></div>
                            <div className="absolute top-[55%] right-[30%] w-50 h-50 rounded-full bg-sage-400 opacity-[0.06] blur-[70px]"></div>
                        </div>

                        {/* <!-- Grid texture --> */}
                        <div className="absolute inset-0 opacity-[0.025]"
                            style={{ backgroundImage: 'linearGradient(rgba(245,240,232,1) 1px, transparent 1px), linearGradient(90deg, rgba(245,240,232,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }}>
                        </div>

                        {/* <!-- Top: Logo --> */}
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                    <path strokeLinecap="round" strokeLinecap="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="font-display font-semibold text-cream text-lg tracking-tight">ResumeAI</span>
                        </div>

                        {/* <!-- Center: Hero copy (register-specific) --> */}
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sage-500/30 bg-sage-500/10 text-sage-400 text-xs font-medium tracking-wide uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse"></span>
                                    Free htmlForever · No credit card
                                </div>
                                <h1 className="font-display text-4xl xl:text-5xl leading-[1.1] text-cream">
                                    Your next<br />
                                    opportunity<br />
                                    <em className="text-sage-400 not-italic">starts here.</em>
                                </h1>
                                <p className="text-mist/60 text-base font-light leading-relaxed max-w-sm">
                                    Create a free account and get instant access to AI-powered resume building and job-specific tailoring.
                                </p>
                            </div>

                            {/* <!-- Plan comparison snippet --> */}
                            <div className="space-y-3">
                                {/* <!-- Free plan --> */}
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-ink-800/60 border border-white/6">
                                    <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-mist/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-cream uppercase tracking-wide mb-0.5">Free Plan</p>
                                        <p className="text-xs text-mist/45">3 resumes · 10 AI credits/month · ATS score checker</p>
                                    </div>
                                </div>

                                {/* <!-- Pro plan teaser --> */}
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-violet-600/10 border border-violet-500/20">
                                    <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-0.5">Pro Plan — $9/mo</p>
                                        <p className="text-xs text-mist/45">Unlimited resumes · 200 AI credits · Priority tailoring</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Bottom: Testimonial --> */}
                        <div className="relative z-10">
                            <blockquote className="space-y-3">
                                <p className="text-mist/55 text-sm font-light leading-relaxed italic">
                                    "Got 3 interviews in the first week after switching to ResumeAI. The tailoring feature is genuinely magical."
                                </p>
                                <footer className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-full bg-sage-500/30 flex items-center justify-center text-xs font-semibold text-sage-300">M</div>
                                    <div>
                                        <p className="text-xs text-cream font-medium">Maya Chen</p>
                                        <p className="text-xs text-mist/35">Software Engineer · Hired at Stripe</p>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>

                    </div>

                    {/* <!-- ── RIGHT htmlForM PANEL ── --> */}
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 xl:px-20 bg-ink-950">

                        {/* <!-- Mobile logo --> */}
                        <div className="lg:hidden flex items-center gap-2.5 mb-10">
                            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="font-display font-semibold text-cream text-lg">ResumeAI</span>
                        </div>

                        <div className="w-full max-w-sm xl:max-w-md">

                            {/* <!-- Header --> */}
                            <div className="mb-8">
                                <h2 className="font-display text-3xl text-cream mb-2">Create your account</h2>
                                <p className="text-mist/50 text-sm">Free htmlForever. Upgrade anytime.</p>
                            </div>

                            {/* <!-- Card --> */}
                            <div className="rounded-2xl bg-ink-800 p-8 shadow-card border border-white/5">

                                <form onSubmit={HandleFromSubmit} className="space-y-5">

                                    {/* <!-- Username field --> */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="username" className="block text-xs font-medium text-mist/80 tracking-wide uppercase">
                                            Username
                                        </label>
                                        <div className="relative">
                                            <input onChange={(e) => SetUserDetail({ ...userdetail, username: e.target.value })}
                                                id="username"
                                                type="text"
                                                placeholder="e.g. mayachen"
                                                autoComplete="username"
                                                className="w-full px-4 py-3 rounded-xl bg-ink-900 border border-white/10 text-cream placeholder-mist/30 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                            />
                                        </div>
                                        <p className="text-xs text-mist/30 mt-1">Lowercase letters, numbers, and underscores only.</p>
                                    </div>

                                    {/* <!-- Email field --> */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="block text-xs font-medium text-mist/80 tracking-wide uppercase">
                                            Email address
                                        </label>
                                        <input onChange={(e) => SetUserDetail({ ...userdetail, email: e.target.value })}
                                            id="email"
                                            type="email"
                                            placeholder="you@company.com"
                                            autoComplete="email"
                                            className="w-full px-4 py-3 rounded-xl bg-ink-900 border border-white/10 text-cream placeholder-mist/30 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                        />
                                        {/* <!-- Error state (demo) --> */}
                                        <p className="text-xs text-red-400/80 flex items-center gap-1.5 mt-1 hidden">
                                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                            </svg>
                                            This email is already registered. Try signing in instead.
                                        </p>
                                    </div>

                                    {/* <!-- Password field --> */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="password" className="block text-xs font-medium text-mist/80 tracking-wide uppercase">
                                            Password
                                        </label>
                                        <input onChange={(e) => SetUserDetail({ ...userdetail, password: e.target.value })}
                                            id="password"
                                            type="password"
                                            placeholder="At least 8 characters"
                                            autoComplete="new-password"
                                            className="w-full px-4 py-3 rounded-xl bg-ink-900 border border-white/10 text-cream placeholder-mist/30 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                                        />

                                        {/* <!-- Password strength indicator --> */}
                                        <div className="mt-2 space-y-1.5">
                                            <div className="flex gap-1.5">
                                                <div className="h-1 flex-1 rounded-full bg-white/10"></div>
                                                <div className="h-1 flex-1 rounded-full bg-white/10"></div>
                                                <div className="h-1 flex-1 rounded-full bg-white/10"></div>
                                                <div className="h-1 flex-1 rounded-full bg-white/10"></div>
                                            </div>
                                            <p className="text-xs text-mist/30">Password strength: <span className="text-mist/40">Enter a password</span></p>
                                        </div>
                                    </div>

                                    {/* <!-- Terms checkbox --> */}
                                    <div className="flex items-start gap-3">
                                        <input onChange={(e) => setIsChecked(e.target.checked)}
                                            id="terms"
                                            type="checkbox"
                                            className="w-4 h-4 mt-0.5 rounded bg-ink-900 border border-white/20 accent-violet-500 cursor-pointer focus:ring-violet-500/30 focus:ring-2 focus:ring-offset-0"
                                        />
                                        <label htmlFor="terms" className="text-sm text-mist/50 cursor-pointer select-none leading-relaxed">
                                            I agree to the
                                            <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">Terms of Service</a>
                                            and
                                            <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">Privacy Policy</a>
                                        </label>
                                    </div>

                                    {/* <!-- CTA --> */}
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold tracking-wide shadow-btn transition-all duration-200 hover:shadow-violet-500/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 active:scale-[0.98]"
                                    >
                                        Create free account →
                                    </button>

                                </form>

                                {/* <!-- Divider --> */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/8"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-3 bg-ink-800 text-mist/30 text-xs">or sign up with</span>
                                    </div>
                                </div>

                                {/* <!-- Google --> */}
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
                                Already have an account?
                                <Link to={'/login'} href="login.html" className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-150 ml-1">
                                    Sign in →
                                </Link>
                            </p>

                            {/* <!-- Legal --> */}
                            <p className="text-center mt-4 text-xs text-mist/25 leading-relaxed">
                                By creating an account you agree to our
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

export default Register