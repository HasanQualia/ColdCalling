"use client";

import { useEffect, useState } from "react";

interface ArticleRendererProps {
  content: string;
}

export function ArticleRenderer({ content }: ArticleRendererProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(markdownToHtml(content));
  }, [content]);

  return (
    <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function markdownToHtml(md: string): string {
  let html = md
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Headers
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    // Links (after unescaping > for links)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      if (cells.every((c) => /^-+$/.test(c))) return "<!-- separator -->";
      return `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
    })
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Horizontal rules
    .replace(/^---$/gm, "<hr>")
    // Blockquotes (after unescaping >)
    .replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>")
    // Paragraphs (blank lines)
    .replace(/\n\n/g, "</p><p>")
    // Line breaks
    .replace(/\n/g, "<br>");

  // Wrap in paragraph
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");
  html = html.replace(/<p><h([1-3])>/g, "<h$1>");
  html = html.replace(/<\/h([1-3])><\/p>/g, "</h$1>");
  html = html.replace(/<p><hr><\/p>/g, "<hr>");
  html = html.replace(/<p><!-- separator --><\/p>/g, "");
  html = html.replace(/<p><br>/g, "<p>");
  html = html.replace(/<br><\/p>/g, "</p>");

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li>[\s\S]*?<\/li>)(?!\s*<li>)/g, "$1</ul>");
  html = html.replace(/(?<!<\/li>\s*)(<li>)/g, "<ul>$1");

  // Wrap consecutive <tr> in <table>
  html = html.replace(/(<tr>[\s\S]*?<\/tr>)(?!\s*<tr>)/g, "$1</table>");
  html = html.replace(/(?<!<\/tr>\s*)(<tr>)/g, "<table>$1");

  return html;
}
