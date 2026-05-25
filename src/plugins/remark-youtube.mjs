// A bare YouTube URL on its own line becomes a lazy 16:9 embed.
const YT_RE = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/;

function embed(id) {
  return {
    type: 'html',
    value:
      `<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/${id}" ` +
      `title="Video" loading="lazy" ` +
      `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
      `allowfullscreen></iframe></div>`,
  };
}

export default function remarkYoutube() {
  return (tree) => {
    const visit = (node) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const c = node.children[i];
        if (c.type === 'paragraph' && c.children?.length === 1) {
          const only = c.children[0];
          const url = only.type === 'link' ? only.url : only.type === 'text' ? only.value?.trim() : null;
          const m = url && url.match(YT_RE);
          if (m) {
            node.children[i] = embed(m[1]);
            continue;
          }
        }
        visit(c);
      }
    };
    visit(tree);
  };
}
