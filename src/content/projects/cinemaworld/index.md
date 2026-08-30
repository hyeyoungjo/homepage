---
title: "CinemaWorld: Generative Augmented Reality with LLMs and 3D Scene Generation for Movie Augmentation"
type: "research"
year: 2026
authors: ["Keiichi Ihara", "DaeHo Lee", "Manato Abe", "Hye-Young Jo", "Ryo Suzuki"]
venue: "ACM UIST"
acceptanceRate: "20.1%"
abstract: "CinemaWorld is a generative augmented reality system that augments the viewer's physical surroundings with mixed reality 3D content extracted from and synchronized with a movie. Multimodal LLMs analyze the film, generative AI produces dynamic 3D augmentations, and the Meta Quest 3 embeds them into the room. A technical evaluation over 100 clips, a usability study with 12 participants, and interviews with 8 film creators show gains in immersion and enjoyment."
teaser: ./teaser.png
teaserAlt: "A viewer in a Quest 3 watching a movie while the room is augmented with matching 3D content"
tags: ["AR", "generative AI", "film"]
links:
  pdf: "https://arxiv.org/pdf/2603.08060"
  doi: "https://doi.org/10.1145/3830398.3830520"
  website: "https://ryosuzuki.org/cinemaworld"
featured: false
draft: false
bibtex: |
  @inproceedings{10.1145/3830398.3830520,
  author = {Ihara, Keiichi and Lee, DaeHo and Abe, Manato and Jo, Hye-Young and Suzuki, Ryo},
  title = {CinemaWorld: Generative Augmented Reality with LLMs and 3D Scene Generation for Movie Augmentation},
  year = {2026},
  isbn = {9798400728563},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  url = {https://doi.org/10.1145/3830398.3830520},
  doi = {10.1145/3830398.3830520},
  booktitle = {The 39th Annual ACM Symposium on User Interface Software and Technology},
  location = {Detroit, MI, USA},
  series = {UIST '26}
  }
---

## Problem: augmented viewing has to be predesigned, and stays 2D

Systems like IllumiRoom and ExtVision extend a film beyond the screen, but the effects are prepared
by hand for a specific title, so they don't scale, and the augmentation stays a 2D projection around
the display rather than something embedded in the room.

## Solution: generate the augmentation from the film itself

CinemaWorld is a generative augmented reality (GenAR) system: the augmentation is produced
automatically from the movie instead of being authored in advance, and it is blended into the space
as 3D content on floors, walls, furniture, and even the viewer's own body. A formative elicitation
study with eight film students gave us the design space, seven augmentation methods: particle
effects, surrounding objects, room textures, character presence, body transformation, window
augmentation, and lighting effects.

The pipeline runs in three stages. A vision-language model analyzes the scene to extract timestamp,
context, effect types, objects, background textures, and lighting. The room is captured through
Quest 3 surface detection or higher-fidelity LiDAR scanning. Generative AI then produces the
textures, lighting, particles, and 3D objects, rendered on the Quest 3 aligned to the room geometry
and synchronized with the movie timeline.

![CinemaWorld system video](./cinemaworld.mp4)

## Evaluation

Across 100 video clips, we assessed visual, semantic, and temporal alignment for the seven
augmentation types. 18 of 21 evaluation conditions exceeded 80% accuracy. A usability study with 12
participants compared the system against a no-augmentation baseline and a 2D augmentation method,
and found higher immersion and enjoyment. Interviews with 8 film creators pointed to the potential
of stepping into the film's world, alongside concerns about control and authorship that motivate
authoring tools for creators.
