import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import Header from '../Components/Header'
import { ResumeAnalysesApi } from '../services/api'

function AnalyzeResult() {

    let [analyze, setAnalyze] = useState()

    const [animatedScore, setAnimatedScore] = useState(0);
    const [keywordmatchingrate, setKeywordmatchingrate] = useState(0);
    const [formattingreadiability, setFormattingreadiability] = useState(0);
    const [sectioncompleteness, setSectioncompleteness] = useState(0);
    const [skillrelevance, setSkillrelevance] = useState(0);
    const [quantifiedachievements, setQuantifiedachievements] = useState(0);

    useEffect(() => { resumeAnalyzes() }, [])

    useEffect(() => {

        if (!analyze?.ats_score) return;

        let current = 0;

        const target = analyze.ats_score;

        const interval = setInterval(() => {

            current += 1;

            setAnimatedScore(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);
    
    useEffect(() => {
        
        analyze?.score_breakdown[0].score

        if (!analyze?.score_breakdown[0].score) return;

        let current = 0;

        const target = analyze.score_breakdown[0].score;

        const interval = setInterval(() => {

            current += 1;

            setKeywordmatchingrate(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);
    useEffect(() => {
        analyze?.score_breakdown[1].score

        if (!analyze?.score_breakdown[1].score) return;

        let current = 0;

        const target = analyze.score_breakdown[1].score;

        const interval = setInterval(() => {

            current += 1;

            setFormattingreadiability(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);
    useEffect(() => {
        analyze?.score_breakdown[2].score

        if (!analyze?.score_breakdown[2].score) return;

        let current = 0;

        const target = analyze.score_breakdown[2].score;

        const interval = setInterval(() => {

            current += 1;

            setSectioncompleteness(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);
    useEffect(() => {
        analyze?.score_breakdown[3].score

        if (!analyze?.score_breakdown[3].score) return;

        let current = 0;

        const target = analyze.score_breakdown[3].score;

        const interval = setInterval(() => {

            current += 1;

            setSkillrelevance(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);
    useEffect(() => {
        analyze?.score_breakdown[4].score

        if (!analyze?.score_breakdown[4].score) return;

        let current = 0;

        const target = analyze.score_breakdown[4].score;

        const interval = setInterval(() => {

            current += 1;

            setQuantifiedachievements(current);

            if (current >= target) {

                clearInterval(interval);

            }

        }, 15);

        return () => clearInterval(interval);

    }, [analyze]);

    async function resumeAnalyzes() {

        try {

            let response = await ResumeAnalysesApi()

            if (response.status >= 200 && response.status < 300) {

                console.log("success");

                // console.log(response.data);

                let last_analyze = response.data[0]

                // console.log(last_analyze);

                setAnalyze(last_analyze)

            }

        }

        catch (error) {

            console.log(error);

        }
    }

    const score = analyze?.ats_score || 0;

    let scoreColor = '';

    if (score >= 85) {
        scoreColor = '';
    }
    else if (score >= 70) {
        scoreColor = '#3b82f6'; // blue
    }
    else if (score >= 50) {
        scoreColor = '#f59e0b'; // amber
    }
    else {
        scoreColor = '#ef4444'; // red
    }

    return (
        <div>
            <div class="app-layout">


                {/* <!-- ══════════════════════════════════════════════ */}
                SIDEBAR
                {/* ══════════════════════════════════════════════ --> */}
                <SideBar></SideBar>

                {/* <!-- ══════════════════════════════════════════════ */}
                MAIN CONTENT
                {/* ══════════════════════════════════════════════ --> */}
                <main class="main-content">


                    {/* <!-- Top Bar --> */}
                    <Header></Header>

                    <div class="flex-1 p-8 space-y-8">


                        {/* <!-- ── TOP ROW: Score + Breakdown ────────────────── --> */}
                        <div class="grid gap-6" style={{ gridTemplateColumns: '280px 1fr' }}>


                            {/* <!-- ATS Score Ring --> */}
                            <div class="card flex flex-col items-center justify-center text-center" style={{ padding: '32px 24px' }}>
                                <p class="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)', letterSpacing: '.1em' }}>ATS Score</p>


                                {/* <!-- SVG Ring --> */}
                                <div class="relative" style={{ width: '160px ', height: '160px' }}>
                                    <svg viewBox="0 0 100 100" width="160" height="160">
                                        <circle class="score-ring-track" cx="50" cy="50" r="45" />
                                        <circle class="score-ring-fill" cx="50" cy="50" r="45" style={{ stroke: scoreColor, strokeDashoffset: 104 - animatedScore, transition: 'stroke-dashoffset 0.2s linear' }} />
                                    </svg>
                                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                                        <span class="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-amber-dk)' }}>{animatedScore}</span>
                                        <span class="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>/ 100</span>
                                    </div>
                                </div>

                                <div class="badge badge-teal mt-4 text-sm px-4 py-1">Excellent Match</div>
                                <p class="text-xs mt-3" style={{ color: 'var(--color-muted)' }}>Your resume is well-optimized<br />for ATS systems</p>
                            </div>


                            {/* <!-- Score Breakdown --> */}
                            <div class="card">
                                <h2 class="text-base font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>Score Breakdown</h2>
                                <div class="space-y-4">
                                    <div>
                                        <div class="flex items-center justify-between text-sm mb-1.5">
                                            <span class="font-medium">Keyword Match Rate</span>
                                            <span class="font-bold" style={{ color: 'var(--color-teal)' }}>{keywordmatchingrate}%</span>
                                        </div>
                                        <div class="progress-bar-track">
                                            <div class="progress-bar-fill" style={{ width: `${keywordmatchingrate}%`, background: 'var(--color-teal)', transition: 'stroke-dashoffset 0.1s linear' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-between text-sm mb-1.5">
                                            <span class="font-medium">Formatting & Readability</span>
                                            <span class="font-bold" style={{ color: 'var(--color-amber-dk)' }}>{formattingreadiability}%</span>
                                        </div>
                                        <div class="progress-bar-track">
                                            <div class="progress-bar-fill" style={{ width: `${formattingreadiability}%`, transition: 'stroke-dashoffset 0.2s linear' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-between text-sm mb-1.5">
                                            <span class="font-medium">Section Completeness</span>
                                            <span class="font-bold" style={{ color: 'var(--color-teal)' }}>{sectioncompleteness}%</span>
                                        </div>
                                        <div class="progress-bar-track">
                                            <div class="progress-bar-fill" style={{ width: `${sectioncompleteness}%`, background: 'var(--color-teal)', transition: 'stroke-dashoffset 0.3s linear' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-between text-sm mb-1.5">
                                            <span class="font-medium">Skills Relevance</span>
                                            <span class="font-bold" style={{ color: 'var(--color-amber-dk)', transition: 'stroke-dashoffset 0.4s linear'}}>{skillrelevance}%</span>
                                        </div>
                                        <div class="progress-bar-track">
                                            <div class="progress-bar-fill" style={{ width: `${skillrelevance}%`, transition: 'stroke-dashoffset 0.5s infinite'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-between text-sm mb-1.5">
                                            <span class="font-medium">Quantified Achievements</span>
                                            <span class="font-bold" style={{ color: 'var(--color-rose)' }}>{quantifiedachievements}%</span>
                                        </div>
                                        <div class="progress-bar-track">
                                            <div class="progress-bar-fill" style={{ width: `${quantifiedachievements}%`, background: 'var(--color-rose)' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <!-- /top row --> */}


                        {/* <!-- ── KEYWORDS ───────────────────────────────── --> */}
                        <div class="card">
                            <div class="section-header">
                                <div>
                                    <h2 class="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>Keyword Analysis</h2>
                                    <p class="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{analyze?.matching_keywords?.matched.length} matched · {analyze?.matching_keywords?.missing.length} missing · vs Senior Frontend Engineer JD</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-teal)' }}>
                                        <div class="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-teal)' }}></div> Matched
                                    </div>
                                    <div class="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-rose)' }}>
                                        <div class="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-rose)' }}></div> Missing
                                    </div>
                                </div>
                            </div>

                            <div class="mb-4">
                                <p class="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted);letter-spacing:.08em' }}>Matched Keywords</p>
                                <div class="flex flex-wrap gap-2">
                                    {analyze?.matching_keywords?.matched?.length > 0 ? (
                                        analyze.matching_keywords.matched.map((keyword, index) => (
                                            <span className="keyword-tag" key={index}>
                                                {keyword}
                                            </span>
                                        ))
                                    ) : (
                                        <p>No keywords available</p>
                                    )}

                                </div>
                            </div>

                            <div>
                                <p class="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-muted)', letterSpacing: '.08em' }}>Missing Keywords</p>
                                <div class="flex flex-wrap gap-2">
                                    {analyze?.matching_keywords?.missing?.length > 0 ? (
                                        analyze?.matching_keywords?.missing?.map((keyword, index) => (

                                            <span class="keyword-tag missing" key={index}>{keyword}</span>

                                        ))
                                    ) : (
                                        <p>No Missing Keyword</p>
                                    )

                                    }


                                    {/* <span class="keyword-tag missing">Micro-frontends</span>
                                    <span class="keyword-tag missing">Figma collaboration</span> */}
                                </div>
                            </div>
                        </div>


                        {/* <!-- ── SUGGESTIONS ────────────────────────────── --> */}
                        <div class="card">
                            <div class="section-header">
                                <div>
                                    <h2 class="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>AI Improvement Suggestions</h2>
                                    <p class="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{analyze?.suggestions?.improvements?.length}  actionable recommendations from our AI</p>
                                </div>
                                <div class="badge badge-amber">{analyze?.suggestions?.improvements?.length} suggestions</div>
                            </div>

                            <div class="space-y-3">

                                {analyze?.suggestions?.improvements?.length > 0 ? (

                                    analyze?.suggestions?.improvements?.map((contents, index) => (

                                        <div class="suggestion-item">
                                            <div class="s-icon">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-sm font-semibold mb-0.5">{contents}</p>
                                                <p class="text-sm" style={{ color: 'var(--color-muted)' }}>{contents}</p>
                                            </div>
                                            <div class="badge badge-rose ml-auto shrink-0">High Impact</div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No suggestion</p>
                                )

                                }

                            </div>
                        </div>
                        {/* <!-- /suggestions --> */}

                    </div>
                    {/* <!-- /page body --> */}
                </main>

            </div>
        </div>
    )
}

export default AnalyzeResult