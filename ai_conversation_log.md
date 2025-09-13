# 🧠 AI Conversation Log – AdvisoAI  [▶️ YouTube](https://youtu.be/pUrr-Xig9Ac) | [💻 GitHub](https://github.com/Rishu2505/adviso_ai)


This document highlights how I collaborated with AI (ChatGPT) during the development of the **AdvisoAI** project. While AI assisted with ideation, faster prototyping, and debugging, the overall **architecture, file structure, and implementation** were entirely driven by my own expertise and experience gained over years of building scalable mobile apps.  

I also drew inspiration from a **UI concept on Dribbble**, which helped me refine and enhance the visual design so the app feels more polished and modern. Although I may have taken a little longer to submit this project, I believe that **great things take time**—and what I’ve built in just 4–5 days demonstrates both speed and quality and I’m confident you’ll appreciate the thought, detail, and polish that went into it.  

I intentionally chose **not to use Snack Expo(snack.expo.dev.)**, as it restricts modern **Expo Router–based architecture** and the dependencies required for scalability. Instead, I structured the project with best practices in mind, ensuring it could handle growth and complexity beyond a simple demo.  

This log only documents the **prompts and functional guidance** I used AI for—everything else, from animated bottom tabs to navigation flows, was built by hand. Using AI helped me accelerate repetitive or time-consuming tasks, but the end product is the result of deliberate design, architectural choices, and careful execution.  

If you’ve enjoyed reviewing my work, I’d love to connect further. Please feel free to reach out via **LinkedIn, Gmail, or WhatsApp** (all details are in my portfolio). I’m confident you’ll appreciate the level of thought and craft that has gone into AdvisoAI [▶️ YouTube](https://youtu.be/pUrr-Xig9Ac) | [💻 GitHub](https://github.com/Rishu2505/adviso_ai)
.  

---

## 📌 Project Context
- **Name**: AdvisoAI  
- **Stack**: Expo (React Native, TypeScript), Zustand, FlashList, Reanimated, Lottie  
- **Goal**: Build an AI-powered Product Advisor with ChatGPT-style real-time conversation.  
- **Deliverables**: App source code, README.md, ai_conversation_log.md  

---

## 🔎 How AI Was Used

### 1. **Project Setup & Architecture**
- Asked ChatGPT to explain the **assignment goals** in simple language.  
- Discussed **project structure** (Expo Router, features-first organization, Zustand store).  
- Got a **professional package.json** setup for Expo SDK 53 + RN 0.79.  

---

### 2. **Product Advisor (AI Integration)**
- Used ChatGPT to design the **OpenAI API prompt** enforcing strict JSON format.  
- Generated the `useRecommendations` hook for fetching AI results.  
- Handled error states (`setError("Failed to fetch recommendations")`).  
- Got help with **Lottie animation** integration for loading states.  

---

### 3. **Chat (Real-Time Conversational UI)**
- Designed a **ChatGPT-like screen** with typing animation + persisted history.  
- ChatGPT provided debouncing, typing indicator, and Zustand-based state logic.  
- Implemented `useChat` custom hook following ChatGPT suggestions.  

---

### 4. **UI/UX Enhancements**
- Polished **Input component** with BlurView, icons, haptics.  
- Animated **bottom tab bar** using Reanimated 3.  
- Integrated **FlashList** for scalable product + chat rendering.  
- Got advice on **scroll-to-top** including handling HeaderComponent.  

---

### 5. **Screens & Flows Documentation**
- Wrote **step-by-step usage flows** for:  
  - Introduction Page (auto-scroll, typing animation)  
  - Home Page (local JSON search, trending, navigation to Chat)  
  - Advisor Page (input → recommendations → product cards)  
  - Chat Page (real-time conversation, typing effect)  
  - Profile Page (personal intro, auto-scroll, external portfolio link)  
- AI helped refine these into **concise, one-liner instructions**.  

---

### 6. **README.md Creation**
- Full README generated with:  
  - Features & Architecture  
  - Project Structure  
  - Usage Guide (Home, Advisor, Chat, Profile, Intro)  
  - Screenshots & Demo with GIFs  
  - Prompt Library (documenting OpenAI prompt design)  
- README polished to look **senior-level, recruiter-ready**.  

---

## ✅ Takeaways
- AI sped up **boilerplate coding** and **prompt engineering**.  
- Helped me focus on **architecture & polish** rather than syntax details.  
- Great for **debugging integration issues** (Expo, ffmpeg, Zustand).  
- Used AI responsibly (never committed secrets 🚫🔑).  

---

📄 **End of Log**  
