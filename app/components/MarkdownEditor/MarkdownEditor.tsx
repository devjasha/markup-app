"use client";

import styles from "./MarkdownEditor.module.scss";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import MarkdownEditorNavigation from "../MarkdownEditorNavigation/MarkdownEditorNavigation";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [markdownSettings] = useState({
    showLineNumbers: true,
  });

  const handleChange = (event: any) => {
    setMarkdown(event.target.value);
  };

  const handleClickForCode = () => {
    const newText = "```js\n\n```";
    setMarkdown(markdown + "\n" + newText);
  };

  const handleClickForList = () => {
    const newText = "- [ ] ";
    setMarkdown(markdown + "\n" + newText);
  };

  const handleClickForLink = () => {
    const newText = "[ ](https:// )";
    setMarkdown(markdown + "\n" + newText);
  };

  const renderers: any = {
    heading: (props: any) => {
      const level = props.level;
      const children = props.children;

      if (level === 1) {
        return <h1>{children}</h1>;
      } else if (level === 2) {
        return <h2>{children}</h2>;
      } else if (level === 3) {
        return <h3>{children}</h3>;
      } else if (level === 4) {
        return <h4>{children}</h4>;
      } else if (level === 5) {
        return <h5>{children}</h5>;
      } else if (level === 6) {
        return <h6>{children}</h6>;
      }

      return null;
    },
    list: (props: any) => {
      if (props.ordered) {
        return <ol>{props.children}</ol>;
      } else {
        return <ul>{props.children}</ul>;
      }
    },
    listItem: (props: string) => {
      return <li>{props.children}</li>;
    },
  };

  return (
    <>
      <MarkdownEditorNavigation
        clickFunctionCode={handleClickForCode}
        clickFunctionList={handleClickForList}
        clickFunctionLink={handleClickForLink}
      />
      <textarea
        rows={10}
        cols={50}
        value={markdown}
        onChange={handleChange}
        className={styles.textarea}
      />
      <ReactMarkdown
        className={styles.markdownBody}
        remarkPlugins={[remarkGfm]}
        components={{
          renderers,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={darcula}
                language={match[1]}
                showLineNumbers={markdownSettings.showLineNumbers}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </>
  );
}
