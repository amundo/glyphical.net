---
lang: en
title:  \<web-quadrat\> docs
css: web-quadrat.css
---

<main>

<section id=example>

## Example

There is no standard best practice for presenting hieroglyphs on the web yet. The problem has to do with the way that hieroglyphs were combined in texts: they were combined into _[quadrats](https://en.wikipedia.org/wiki/Quadrat_(hieroglyph_block))_, a square arrangement of one or more hieroglyphic signs. The combination of these signs is quite complicated, and thus few if font-rendering systems support their rendering completely. There are various attempts to work around this shortcoming on the web:


### **Just ignore the quadrats**

This is the pragmatic approach used, for instance, by [https://www.ancientegyptblog.com/](https://www.ancientegyptblog.com/). In this case, a word like 𓐍𓂋 ‘with, near, under’ `[ḫr]`, is  just written without stacking. This works, and it does make internet searches possible:

<https://www.google.com/search?hl=en&q=site%3Ahttps%3A%2F%2Fwww.ancientegyptblog.com%2F%20%F0%93%90%8D%F0%93%82%8B> Turns up pages containing 𓐍𓂋. However, the stacking is lost. 

### **Use a special font that recognizes the Egyptian Hieroglyph Format Controls**

This is supposed to be the path of the future: the format controls are special characters that specify how signs should be combined into quadrats. 


[Wikipedia.org: Egyptian Hieroglyph Format Controls](https://en.wikipedia.org/wiki/Egyptian_Hieroglyph_Format_Controls)

Here is the whole list of them on the Unicode.org site:

[Unicode.org: Egyptian Hieroglyph Format Controls](https://www.unicode.org/charts/nameslist/n_13430.html)

However, as far as I know no font engine currently supports these controls.

### **Use Manuel de Codage**

Another approach is to give up and just type a transliteration. The most commonly used system is called Manuel de Codage.

[Wikipedia.org: Manuel de Codage](https://en.wikipedia.org/wiki/Manuel de Codage)

MdC is still in active use. Here’s a recent Reddit comment that uses it:

> <https://www.reddit.com/r/AncientEgyptian/comments/17btsqj>


### **Use Javascript to convert Manuel de Codage into images**

This is the WikiHiero approach, where little `.png` images are inserted into web pages but the user types in a transliteration when editing. They don’t look great in my opinion, but the quadrats are correct. 

[Wikipedia.org: WikiHiero](https://en.wikipedia.org/wiki/WikiHiero)


### **Use Javascript to convert Manuel de Codage into SVG**

I think I saw this somewhere too.  Rendering can be very advanced and is also scalable. It looks good. A major drawback is that the text isn’t searchable or copy-paste-able.


### **Use Javascript to wrap the hieroglyphs in spans, and apply CSS to handle quadrat layout.**

This is the approach I’m exploring here. 

## Using `CSS` grid for layout

`CSS` grid is a powerful layout tool in `CSS` that uses a two-dimensional grid system that allows you to specify the number of rows and columns in a grid, and then place elements into the grid. There are several questions:

* How many rows do we need?
* How many columns do we need? 

I think we should start with 12, which should work for most cases, even complex ones. Later, we could use named grid lines to make the layout more flexible.

So here’s some `HTML` that uses `CSS` grid to lay out a 12-by-12 grid. I have added `.debug` class so that we can fill in empty spans with a background color to see how the grid is laid out. 


<script type=module>
import {StepOne} from './StepOne.js'
import {StepTwo} from './StepTwo.js'
</script>

### `<step-one></step-one>`

```{=html}
<step-one></step-one>
```

Okay cool, we have a grid to work with. Let’s put a single hieroglyph in the middle of the grid. 

```html
<step-two></step-two>
```

```{=html}
<step-two></step-two>
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

<section id=layouts>

## Layouts

</section>

<section id=see-also>

## See also

</main>


<script type="module">
import {WebQuadrat} from './WebQuadrat.js'

window.webQuadrat = document.querySelector('web-quadrat')
</script>

