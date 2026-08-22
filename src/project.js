import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import cpp from 'highlight.js/lib/languages/cpp';
import javascript from 'highlight.js/lib/languages/javascript';

// Register core languages needed for portfolio code blocks
hljs.registerLanguage('python', python);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('javascript', javascript);

function initPagePlugins() {
  // Render LaTeX math formulas
  try {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  } catch (err) {
    console.error('KaTeX auto-render error:', err);
  }

  // Highlight all code snippets
  try {
    hljs.highlightAll();
  } catch (err) {
    console.error('Highlight.js error:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPagePlugins);
} else {
  initPagePlugins();
}
