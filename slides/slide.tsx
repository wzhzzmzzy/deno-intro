/** @jsx h */

import { h, renderSSR } from "https://deno.land/x/nano_jsx/mod.ts";

const App = () => (
  <div class="reveal">
    <div class="slides">
      <section data-markdown="./slide.md"
        data-separator="\n-----\n"
        data-separator-vertical="\n---\n"
        data-separator-notes="^Note:"
        data-charset="utf-8">
      </section>
    </div>
  </div>
)

export const renderSlideApp = () => {
  return renderSSR(<App />)
}
