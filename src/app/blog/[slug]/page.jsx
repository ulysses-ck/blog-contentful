import clientContentful from "@/lib/client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

import Image from "next/image";
import { notFound } from "next/navigation";

import styles from "./page.module.css"

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

export default async function PageBlogPost({ params }) {
  const result = await clientContentful.getEntries({
    content_type: "post",
    "fields.slug": params.slug,
  });

  if (result.items.length === 0) {
    return notFound();
  }

  return (
    <article className="border border-white">
      <h3 className="text-xl underline">{result.items[0].fields.title}</h3>

      {documentToReactComponents(result.items[0].fields.body, options)}
    </article>
  );
}
