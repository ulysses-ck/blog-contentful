"use client";
import styles from "./Posts.module.css";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import Image from "next/image";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <span className="font-bold text-red-500">{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="text-left">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-2xl">{children}</h1>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className={styles.h3}>{children}</h3>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          alt={node.data.target.fields.title}
          width={node.data.target.fields.file.details.image.width}
          height={node.data.target.fields.file.details.image.height}
        />
      );
    },
  },
};

export default function Posts({ posts }) {
  return (
    <section className="flex flex-col gap-4">
      {posts.map((post) => (
        <article key={post.sys.id} className="border border-white">
          <a href={`/blog/${post.fields.slug}`}>
            <h3 className="text-xl underline">{post.fields.title}</h3>
          </a>
        </article>
      ))}
    </section>
  );
}
