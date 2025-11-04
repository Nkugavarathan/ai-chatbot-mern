# 🚀 AI Chatbot — MERN · Google Gemini · ImageKit

---

## 🔎 Recruiter / HR TL;DR
- **One-line:** An AI-powered SaaS chatbot built with the MERN stack that generates text using **Google Gemini** and creates images using **ImageKit**, with secure authentication, credit-based payments, and production deployment.  
- **Impact / Highlights:** Production-ready SaaS with user roles, payments, rate limits and usage accounting. Demonstrates full-stack skills: React/Next frontend, Express/Node API, MongoDB persistence, secure auth (JWT + refresh tokens), third-party AI integration, CDN image hosting, and CI/CD deployment.

---

## 🧭 Table of contents
1. Project overview  
2. Screenshots & demo  
3. Features  
4. Tech stack  

---

## 1. Project overview
A multi-tenant SaaS chatbot where users sign up, purchase credits, generate AI text via **Google Gemini**, and create/host images via **ImageKit**. Includes usage accounting, admin controls, and payment webhooks.

---

## 2. Screenshots & demo
 [Home Page light mode](./screenshots/home-light.JPG)
 [Home Page dark mode](./screenshots/dark-mode.JPG)


---

## 3. Key features
- ✅ **AI text generation** with Google Gemini (server-side calls)  
- ✅ **Image generation & CDN hosting** with ImageKit (uploads, transformations)  
- ✅ **Secure auth**: email/password, JWT access + refresh tokens, password reset  
- ✅ **Credit-based payments**: purchase credit packs (Stripe webhook integration)  
- ✅ **Usage tracking & billing**: per-request credit deduction & quotas  
- ✅ **Rate limiting & abuse protection**  
- ✅ **Audit logs & moderation tools**

---

## 4. Tech stack
- **Frontend:** React or Next.js, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas)  
- **Auth:** JWT + refresh tokens, secure cookies  
- **AI:** Google Gemini (server-side API)  
- **Images:** ImageKit (upload + CDN + transformations)  
- **Payments:** Stripe  
- **Hosting** Vercel