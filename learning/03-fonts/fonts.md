---
title: Font basics for Egyptologists
author: Patrick Hall
---


<main>

:::{.intro-blurb}
A solid understanding of the basics of what fonts are, how they work, and how to use them on the web can give you super powers as a digital Egyptologist.
:::



<section id=topics-section>

In this article, we will tackle the following terms: 

### Glyphs, Characters, and Unicode



<dl>

<div>
  <dt><strong>glyph</strong></dt>
  <dd>A visual representation of a character in a font.</dd>
</div>


<div>
  <dt><strong>unicode</strong></dt>
  <dd>A standard for which aims to encode every character in every language in the world.</dd>
</div>

<div>
  <dt><strong>codepoint</strong></dt>
  <dd>The numerical identifier used to represent a character in Unicode.</dd>
</div>


</dl>

### Fonts vs. Typefaces

<dl>
<div>
  <dt><strong>typeface</strong></dt>
  <dd>A set of one or more fonts that share a common design.</dd>
</div>


<div>
  <dt><strong>font</strong></dt>
  <dd>A collection of <code>glyphs</code> sufficient to represent an entire writing system.</dd>
</div>

<div>
  <dt><strong>web-font</strong></dt>
  <dd>A font that is loaded from the web, not your computer.</dd>
</div>

<div>
  <dt><strong><code>font-family</code></strong></dt>
  <dd>A <code>CSS</code> mechanism to specify typefaces.</dd>
</div>

<div>
  <dt><strong><code>@font-face</code></strong></dt>
  <dd>A <code>CSS</code> mechanism for loading web fonts.</dd>
</div>

<div>
  <dt><strong>truetype</strong></dt>
  <dd>A font format which is widely supported on the web.</dd>
</div>

<div>
  <dt><strong>opentype</strong></dt>
  <dd>A new font technology that is widely supported in browsers and which
supports many advanced typographical features.</dd>
</div>

</dl>

</section>  <!-- #topics-section -->

## Fonts vs. text

Behold, the Greek alphabet:

> αβγδεζηθικλμνξοπρσςτυφχψω

And here’s the Greek alphabet in the worst Greek typeface ever created (I know, because <a href=https://fontstruct.com/fontstructions/show/2431755/protoblorp-1 target=_blank>I created it</a> …forgive me, Greece):



> <p data-awfulgreek=true>αβγδεζηθικλμνξοπρσςτυφχψω</p>

I know, it barely resembles Greek. But we’re not 


 _text_ — even though the font is hideous, the text is still the text. To prove it, try selecting some text, and then click the button below to toggle the font on and off.

<button id=toggle-awfulgreek-button>Toggle crazy font</button>

You’ll see that the selection remains the same, even though the font has changed. That’s because “fonts” or “typefaces” on the one hand, and “text” on the other, are two distinct things. The text itself is different from the font.

## A wee bit of `CSS`

Now, you most definitely never installed the font above on your computer. And yet, there it is. How is this black magic possible?

Well, to understand a useful answer to that question, you will need to know a tiny bit about something called `CSS`. You’ll recall from the previous lesson that `HTML` was designed to maintain a careful separation between content and presentation. `HTML` is about the _structure_ of a document, not how it looks. And yet, because that separation is maintained, it is actually possible to have _more_ control over how the content looks than if the content and the presentation were all mixed together. 

The part of the web platform that is responsible for the presentation of content is called `CSS`, which stands for “Cascading Style Sheets”. It’s a big topic, and we will have much more to say about it later. For now, just understand that `CSS` can do things like <span style=color:fuchsia>make text fuchsia</span> and even <span style="display:inline-block;rotate:180deg;">flip text upside down</span> and <span style="background-color:lemonchiffon;">change background colors</span>, and a million other things. And yes, it can <span style=font-family:fantasy;text-transform:uppercase;>change the typeface</span> of text.

But how can it change the type face to render Greek text in a font that you don’t have installed on your computer? 

<details>
<summary>Well, you don’t have this picture on your computer either, but you can see it.</summary>
<img src=images/silly-bunny.png alt="A bunny doomscrolling.">
</details>


Like the image, the font is being loaded from the web. This feature of the web platform is called “web fonts”.





## What’s a web font?



<style>
[data-awfulgreek]{
  color: maroon;
}

[data-awfulgreek="true"] {
  font-family: 'awfulgreek';
}
</style>
<script>
document.querySelector("#toggle-awfulgreek-button").addEventListener('click', e => {
  document.querySelectorAll('[data-awfulgreek]')
    .forEach(el => {
      if(el.dataset.awfulgreek == 'true'){
        el.dataset.awfulgreek = 'false'
      } else {
        el.dataset.awfulgreek = 'true'
      }
    })
})
</script>

<!-- <p data-awfulgreek=true>δίας ήρα ποσειδώνας απόλλων αθηνά αφροδίτη άρης ερμής άρτεμις δήμητρα εστία ήφαιστος</p> -->

## Five numbers in six languages

* What is a font?
* What is a typeface?
* What is a font family?
* What is a font file?
* What is a font format?
* What is a font license?
* What is a web font?
* What is a system font?
* What is a web font stack?
* What is a fallback font?
* What is a font weight?
* What is a font style?
* What is a font variant?
* What is a font size?
* What is a font line height?
* What is a font color?
* What is a font decoration?
* What is a font alignment?
* What is a font kerning?
* What is a font tracking?


</main>