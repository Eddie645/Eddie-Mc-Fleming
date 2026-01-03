# Eddie Mc Fleming Portfolio

A high-performance, modern portfolio built with React, Vite, Tailwind CSS, and Google Gemini AI.

## 🚀 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set Environment Variable**:
   Create a `.env` file in the root directory or set it in your terminal:
   ```bash
   API_KEY=your_gemini_api_key_here
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 🌐 Free Hosting Instructions

### 1. Vercel (Recommended)
Vercel is the easiest way to host Vite projects.
* Push this code to a **GitHub** repository.
* Go to [Vercel](https://vercel.com), connect your GitHub, and import the repo.
* **Important**: In the project settings on Vercel, go to "Environment Variables" and add `API_KEY` with your actual Google Gemini API key.
* Vercel will handle the build (`npm run build`) and deployment automatically.

### 2. Netlify
* Connect your GitHub repo to [Netlify](https://www.netlify.com/).
* Set the Build Command to `npm run build` and the Publish directory to `dist`.
* Add the `API_KEY` in "Site configuration" > "Environment variables".

## 🛠 Tech Stack
* **Framework**: React 19
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **AI**: Google Gemini API (@google/genai)
* **Language**: TypeScript
