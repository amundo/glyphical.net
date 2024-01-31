---
title: Museum Map web component
description: The Museum Map web component is a web component that displays an interactive map of a museum.
author: Patrick Hall
---

This component makes an `SVG` map of a museum interactive. It makes assumptions about the structure of the `SVG`.

## Background 

I created this component for the Egyptology collection at the [Museum of Fine Arts, Boston](https://www.mfa.org/). The museum has a large collection of Egyptian artifacts, and I wanted to create a map that would allow visitors to explore the collection in a more interactive way. Basically the component provides an event layer over the galleries in a museum, and allows you to attach events to the different galleries.

It makes no assumptions about how the events would be tied into other applications.

### SVG Structure

The SVG should be structured in a way that makes it easy to attach events to the different galleries. The structure I used was to identify each gallery with `id` attributes of the form `gallery-<identifier>`, where `identifier` can be a room number or other unique identifier. The component then attaches events to these galleries.

