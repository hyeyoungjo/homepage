---
title: "Map2Video: Guiding Real-World-Grounded AI Video Generation"
type: "research"
year: 2026
authors: ["Hye-Young Jo", "Mose Sakashita", "Aditi Mishra", "Ryo Suzuki", "Koichiro Niinuma", "Aakar Gupta"]
venue: "ACM UIST"
acceptanceRate: "20.1%"
abstract: "Map2Video guides AI video generation grounded in street view imagery through map-based character trajectory annotation and direct manipulation of cameras and character masks defined in geodetic coordinates. In an evaluation with 12 filmmakers, it provided stronger controllability, reduced cognitive effort, and improved spatial consistency across shots compared to an image-to-video baseline."
teaser: ./teaser.png
teaserAlt: "Map2Video street-view driven video generation"
tags: ["filmmaking", "AI video", "maps"]
links:
  pdf: "https://drive.google.com/file/d/1CxQPw1nv-FWDHfxyys1_W-JLa7uv9vNY/view?usp=sharing"
  doi: "https://doi.org/10.1145/3830398.3830538"
  youtube: "https://youtu.be/TSwM24UpXzs"
featured: true
draft: false
bibtex: |
  @inproceedings{10.1145/3830398.3830538,
  author = {Jo, Hye-Young and Sakashita, Mose and Mishra, Aditi and Suzuki, Ryo and Niinuma, Koichiro and Gupta, Aakar},
  title = {Map2Video: Guiding Real-World-Grounded AI Video Generation},
  year = {2026},
  isbn = {9798400728563},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  url = {https://doi.org/10.1145/3830398.3830538},
  doi = {10.1145/3830398.3830538},
  booktitle = {The 39th Annual ACM Symposium on User Interface Software and Technology},
  location = {Detroit, MI, USA},
  series = {UIST '26}
  }
---

## Problem: AI video generation isn't grounded in the real world

AI video generation lowers the barrier to video creation, but existing tools give little support for
grounding content in real-world locations, a requirement in applications like film previsualization
and scenario generation. In practice, users fall back on verbose textual descriptions or reference
images from on-site photos or street view imagery (SVI), which are cumbersome and unreliable across
shots. Our formative study with five filmmakers surfaced challenges in shot composition, character
motion, and camera control when using SVI with an image-to-video tool.

## Solution: guiding generation from the map

Map2Video guides SVI-grounded AI video generation through map-based character trajectory annotation
and direct manipulation of cameras and character masks. Both are defined in geodetic coordinates and
projected onto panoramic screen coordinates, so what the user lays out on the map stays consistent
with what the model generates. Following familiar filmmaking practices like location scouting and
rehearsal, users pick a location, place actors and cameras in the street view, sketch movement paths,
refine camera motion, and generate the shot.

## Evaluation

In a study with 12 filmmakers, Map2Video provided stronger controllability than an image-to-video
baseline (for both scene replication and open-ended creative exploration), while reducing cognitive
effort and improving spatial consistency across multiple shots.

*Work done as an intern at Fujitsu Research of America.*
