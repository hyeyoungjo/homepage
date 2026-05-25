import path from 'node:path';

// Turn `![caption](./clip.mp4|.webm|.mov|.gif)` into a responsive <video>.
// Source files are emitted by `npm run assets` to /public/p/<slug>/<name>.mp4,
// so the user only ever writes the same `![]()` syntax used for images.
const VIDEO_RE = /\.(mp4|webm|mov|gif)$/i;

function makeVideo(node, slug) {
  const base = path.basename(node.url).replace(VIDEO_RE, '');
  const ext = /\.webm$/i.test(node.url) ? 'webm' : 'mp4';
  const src = `/p/${slug}/${base}.${ext}`;
  const isGif = /\.gif$/i.test(node.url); // looping silent clips
  const attrs = isGif
    ? 'autoplay muted loop playsinline'
    : 'controls muted playsinline preload="metadata"';
  const caption = node.alt ? `<figcaption>${node.alt}</figcaption>` : '';
  const value = `<figure class="md-video"><video ${attrs} src="${src}"></video>${caption}</figure>`;
  return { type: 'html', value };
}

const isVideoImage = (n) => n && n.type === 'image' && VIDEO_RE.test(n.url);

export default function remarkVideo() {
  return (tree, file) => {
    const filePath = file?.path || file?.history?.[0] || '';
    const slug = filePath ? path.basename(path.dirname(filePath)) : '';
    if (!slug) return;

    const visit = (node) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const c = node.children[i];
        // image alone in a paragraph -> replace the whole paragraph (avoids <p><figure>)
        if (c.type === 'paragraph' && c.children?.length === 1 && isVideoImage(c.children[0])) {
          node.children[i] = makeVideo(c.children[0], slug);
        } else if (isVideoImage(c)) {
          node.children[i] = makeVideo(c, slug);
        } else {
          visit(c);
        }
      }
    };
    visit(tree);
  };
}
