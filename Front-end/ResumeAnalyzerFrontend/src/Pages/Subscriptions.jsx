import React, { useEffect, useState } from 'react'
import SideBar from '../Components/SideBar'
import { data, redirect } from 'react-router-dom';
import { ListSubscriptonAPi, PaymentSucessAPi, SubScriptionApi, UpdateSubscriptonAPi } from '../services/api';
import axios from 'axios';

function Subscriptions() {

    useEffect(() => { getAllSub() }, [])

    let [cplan, setCurplan] = useState('free')
    let [planinfo, setPlanInfo] = useState()

    // let savedPlan = localStorage.getItem('cur_plan')

    async function getAllSub() {

        try {

            let response = await ListSubscriptonAPi()

            if (response.data.length > 0) {

                const currentPlan = response.data[0].plan;

                setCurplan(response.data[0].plan)
                setPlanInfo(response.data[0])

                console.log(response.data[0]);

                localStorage.setItem('plan', currentPlan)
            } 
            else {

                setCurplan("free")

                console.log(cplan);
            }


        }

        catch (error) {

            console.log("Error", error);

        }

    }


    async function handlePayment(price, plan) {

        let response = await SubScriptionApi(price, plan)

        const headers = {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }

        const options = {
            key: "rzp_test_StZBNznMkg26Hn",
            amount: response.data.amount,
            currency: "INR",
            order_id: response.data.id,

            handler: async function (response) {

                try {

                    await axios.post("http://127.0.0.1:8000/payment-success/",

                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            plan: plan
                        },

                        { headers },

                    )

                    localStorage.setItem('cur_plan', plan);

                    // .................payment sucess to create a plan for the user.........

                    let paymentsucessresponse = await PaymentSucessAPi(plan)

                    // ...................Updatesubscription.....................


                    let SubupdateResponse = await UpdateSubscriptonAPi();

                    // console.log(SubupdateResponse);

                    alert("Subscription Updated Successfully");


                }
                catch (error) {

                    console.log(error.response?.data);

                    alert("Verification failed")

                }

            }
        };

        const razor = new window.Razorpay(options);

        razor.open();
    }


    return (

        <div>


            <div className="app-layout">


                {/* ══════════════════════════════════════════════ */}
                SIDEBAR
                {/* ══════════════════════════════════════════════ --> */}
                <SideBar></SideBar>


                {/* ══════════════════════════════════════════════ */}
                MAIN CONTENT
                {/* ══════════════════════════════════════════════ --> */}
                <main className="main-content">


                    {/* Top Bar --> */}
                    <header className="bg-white border-b px-8 py-4 sticky top-0 z-30" style={{ borderColor: 'var(--color-border)' }}>
                        <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Subscription</h1>
                        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Manage your plan and billing</p>
                    </header>

                    <div className="flex-1 p-8 space-y-8">


                        {/* ── CURRENT STATUS ─────────────────────────── --> */}
                        <div className="card flex items-center gap-5" style={{ background: 'var(--color-slate)', borderColor: 'rgba(255,255,255,.06)' }}>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,158,11,.2)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'white' }}>{cplan} — Active</h2>
                                    <div className="badge badge-teal">{planinfo?.is_valid == true ? 'VALID' : 'EXPEIRED'}</div>
                                </div>
                                <p className="text-sm" style={{ color: '#94a3b8' }}>{planinfo?.length > 0 ? `Started ${planinfo?.start_date} Renews ${planinfo?.end_date} · Billed monthly at ${cplan == 'pro' ? 499 : cplan == 'enterprise' ? 1199 : 0}` : "No Subscription Activated"}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button className="btn-secondary text-sm" style={{ borderColor: 'rgba(255,255,255,.15)', color: '#e2e8f0', background: 'rgba(255,255,255,.08)' }}>
                                    Cancel Plan
                                </button>
                                <button className="btn-primary text-sm">Manage Billing</button>
                            </div>
                        </div>


                        {/* ── PLAN TOGGLE HINT ────────────────────────── --> */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Choose the right plan</h2>
                            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Upgrade, downgrade, or switch billing cycles anytime</p>

                            {/* Toggle --> */}
                            <div className="inline-flex items-center gap-3 mt-4 p-1 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                                <button className="px-4 py-2 rounded-md text-sm font-semibold" style={{ background: 'white', boxShadow: 'var(--shadow-card)' }}>Monthly</button>
                                <button className="px-4 py-2 rounded-md text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
                                    Annual
                                    <span className="ml-1 badge badge-teal" style={{ fontSize: '10px' }}>Save 20%</span>
                                </button>
                            </div>
                        </div>


                        {/* ── PLAN CARDS ─────────────────────────────── --> */}
                        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(3,1fr)', maxWidth: '900px', margin: '0 auto' }}>


                            {/* Free Plan --> */}
                            <div className={`plan-card ${cplan == 'free' ? 'current' : ""}`}>
                                <div>
                                    <div className="badge badge-slate mb-3">Free</div>
                                    <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>0<span className="text-base font-normal" style={{ color: 'var(--color-muted)' }}>/mo</span></p>
                                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>For individuals exploring ATS optimization</p>
                                </div>
                                <ul className="space-y-2.5 text-sm flex-1">
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        10 credits / month
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        2 resume uploads
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Basic ATS scoring
                                    </li>
                                    <li className="flex items-start gap-2.5 opacity-40">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        Keyword analysis
                                    </li>
                                    <li className="flex items-start gap-2.5 opacity-40">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        AI suggestions
                                    </li>
                                    <li className="flex items-start gap-2.5 opacity-40">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        Team workspace
                                    </li>
                                </ul>
                                <button className="btn-secondary w-full justify-center" onClick={() => {
                                    handlePayment(0, 'free')
                                }}
                                >Downgrade to Free</button>
                            </div>


                            {/* Pro Plan — FEATURED / CURRENT --> */}
                            <div className={`plan-card ${cplan == 'pro' ? 'current' : ""}`}>
                                <div>
                                    <div className="badge badge-amber mb-3">Pro</div>
                                    <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>599<span className="text-base font-normal" style={{ color: 'var(--color-muted)' }}>/mo</span></p>
                                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>For serious job seekers optimizing every application</p>
                                </div>
                                <ul className="space-y-2.5 text-sm flex-1">
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        <strong>100 credits / month</strong>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Unlimited resume uploads
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Full ATS scoring & breakdown
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Advanced keyword matching
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        AI-powered suggestions
                                    </li>
                                    <li className="flex items-start gap-2.5 opacity-40">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        Team workspace
                                    </li>
                                </ul>
                                <button className="btn-primary w-full justify-center" onClick={() => {
                                    handlePayment(599, 'pro')
                                }}
                                >Upgrade To Pro</button>
                                {/* style={{ opacity: '.6', cursor: 'default' }} */}
                            </div>


                            {/* Enterprise Plan --> */}
                            <div className={`plan-card ${cplan == 'enterprise' ? 'current' : ""}`}>
                                <div>
                                    <div className="badge badge-indigo mb-3">Enterprise</div>
                                    <p className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>1199<span className="text-base font-normal" style={{ color: 'var(--color-muted)' }}>/mo</span></p>
                                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>For organizations and recruiting teams at scale</p>
                                </div>
                                <ul className="space-y-2.5 text-sm flex-1">
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        <strong>500 credits / month</strong>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Everything in Pro
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Team workspace (up to 20 users)
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Admin dashboard & analytics
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        Priority support & SLA
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        API access
                                    </li>
                                </ul>
                                <button className="btn-primary w-full justify-center" onClick={() => {
                                    handlePayment(1199, 'enterprise')
                                }}
                                >Upgrade to Enterprise</button>
                            </div>

                        </div>
                        {/* /plan cards --> */}


                        {/* ── FAQ NOTE ───────────────────────────────── --> */}
                        <div className="text-center pb-4">
                            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                                Questions? <a href="#" style={{ color: 'var(--color-amber-dk)', fontWeight: 600 }}>Contact support</a> ·
                                <a href="#" style={{ color: 'var(--color-amber-dk)', fontWeight: 600 }}>View billing FAQ</a> ·
                                All plans include a <strong>14-day free trial</strong>
                            </p>
                        </div>

                    </div>
                    {/* /page body --> */}
                </main>

            </div>


        </div>
    )
}

export default Subscriptions