import clientContentful from "@/lib/client";
import Posts from "@/components/Posts";

export default async function Home() {
  const result = await clientContentful.getEntries({
    content_type: "post",
  });

  return (
    <main className="flex flex-col min-h-screen items-center">
      <h1 className="text-3xl">Blog Contentful</h1>
      <h2 className="text-2xl">Posts</h2>
      <Posts posts={result.items} />
    </main>
  );
}
