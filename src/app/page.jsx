import clientContentful from "@/lib/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function Home() {
  const result = await clientContentful.getEntries({
    content_type: "post",
  });

  return (
    <main className="flex flex-col min-h-screen items-center">
      <h1 className="text-3xl">Blog Contentful</h1>
      <h2 className="text-2xl">Posts</h2>
      <section className="flex flex-col gap-4">
        {result.items.map((post) => (
          <article key={post.sys.id} className="border border-white">
            <h3 className="text-xl underline">{post.fields.title}</h3>
            {documentToReactComponents(post.fields.body)}
          </article>
        ))}
      </section>
    </main>
  );
}
