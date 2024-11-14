export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white">Welcome to Crescentia</h1>
      <a 
        href="/countdown-timer" 
        className="mt-4 text-white hover:underline"
      >
        Go to Timer
      </a>
    </main>
  )
}