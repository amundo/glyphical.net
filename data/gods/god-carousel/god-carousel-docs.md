---
lang: en
title:  \<god-carousel\> docs
css: god-carousel.css
---

<main>

I rather liked the display here:

<https://www.bbc.co.uk/bitesize/topics/zg87xnb/articles/z4m8pg8>

<img style=width:50%; src=god-carousel-screenshot.png alt=god-carousel-screenshot>

And I wanted to recreate something similar, but with more extensive data.

So I began by acquiring more data from:

<https://en.wikipedia.org/wiki/List_of_Egyptian_deities>

The resulting data are in [gods.json](../gods.json)

<section id=example>

## Example

Here’s the result:

```html
<god-carousel src=../gods.json></god-carousel>
```

```{=html}
<god-carousel src=../gods.json></god-carousel>
```

</section>

<section id=goals>

## Goals

I wanted to replicate the display, more or less, by creating a web component.
Obviously I have made it very domain-specific by calling it “god carousel”, but
it seems fine to me for now since I have an existing data file, and I can always
refactor it later. Plus it will be useful on glyphical.net, perhaps.

</section>

<section id=layouts>

## Layouts

This is an obvious case for a grid layout. I think the design below will
suffice:

<img style=width:50%; src=grid.png alt="god carousel grid layout">

Note that the blue lines are actually using the new `subgrid` extension to `CSS`
`grid`.

Here’s the outer grid:

```css
god-carousel {
  display: grid;
  grid-template:
     "header      header      header" auto
     "previous    figure      next" auto 
     "title       title       title" auto
     "description description description" auto
     "index       .     ." auto
   /  3rem 1fr 3rem;
}
```

And the `.god-info` div is a subgrid:

```css
.god-info {
  display: grid;
  grid-template-rows: subgrid;
}
```

As markup, this can look like:

```html
<god-carousel>
  <header>
  …citation…
  </header>
  <nav><button class=previous-button>&lt;</button></nav>
  <nav><button class=next-button>&gt;</button></nav>
  <figure class=god-image>
    <img src>
  </figure>
  <div class=god-info>
    <h2 class=god-name></h2>
    <p class=god-description></p>
    <div class=progress-meter></div>
  </div>
</god-carousel>
```

</section>

<section id=attributes>

## Attributes

</section>

<section id=methods>

## Methods

</section>

<section id=data>

## Data

</section>

<section id=events>

## Events

</section>

<section id=see-also>

## See also

</main>

<script type="module">
import {GodCarousel} from './GodCarousel.js'

window.godCarousel = document.querySelector('god-carousel')
</script>
