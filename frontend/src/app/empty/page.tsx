import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EmptyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add empty state components</h1>
        <p className="text-gray-600">Content coming soon.</p>
      </div>
      <Footer />
    </main>
  );
}
