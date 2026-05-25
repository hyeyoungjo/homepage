---
title: "Map2Video: Street View Imagery Driven AI Video Generation"
type: "research"
year: 2025
authors: ["Hye-Young Jo", "Mose Sakashita", "Aditi Mishra", "Ryo Suzuki", "Koichiro Niinuma", "Aakar Gupta"]
venue: "arXiv"
abstract: "Map2Video turns street-view imagery into spatially consistent AI-generated video. Integrating Unity, ComfyUI/VACE, OpenStreetMap, and Mapillary, filmmakers position actors and cameras in real streets and sketch paths to generate footage. An evaluation with 12 filmmakers showed superior spatial accuracy and controllability."
teaser: ./teaser.png
teaserAlt: "Map2Video street-view driven video generation"
tags: ["filmmaking", "AI video", "maps"]
links:
  pdf: "https://arxiv.org/pdf/2512.17883"
  doi: "https://arxiv.org/abs/2512.17883"
  youtube: "https://youtu.be/k9t95G8ZqxM"
featured: true
draft: false
---

## Problem — AI video generation isn't grounded in the real world

Text- and image-to-video tools have lowered the barrier to video creation, but they struggle with
consistency: clips fail to match characters and backgrounds, making coherent sequences hard to build.
Crucially, they aren't grounded in real locations — users must describe a scene in text or supply
reference images by shooting on-site or searching. A formative study with filmmakers surfaced
challenges in shot composition, character motion, and camera control.

## Solution — generating video from street-view imagery

Map2Video is a street-view-imagery-driven AI video generation tool grounded in real-world geography.
It integrates Unity and ComfyUI with the VACE video-generation model, plus OpenStreetMap and Mapillary
for street view. Following familiar filmmaking practices like location scouting and rehearsal, users
choose a map location, position actors and cameras in the street view, sketch movement paths, refine
camera motion, and generate spatially consistent video.

## Evaluation

In a study with 12 filmmakers, Map2Video beat an image-to-video baseline on spatial accuracy, required
less cognitive effort, and gave stronger control — for both replicating scenes and open-ended creative
exploration.

*Work done as an intern at Fujitsu Research of America.*
