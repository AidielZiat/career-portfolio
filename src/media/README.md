# Media repository

Drop photos and videos here. No code changes needed: the Journey and Hiking pages pick up
whatever is in each folder, in filename order.

```
src/media/
  journey/<stop>/    life journey photos (one folder per stop)
  hiking/<hike>/     hiking photos and videos (one folder per hike)
```

## Journey folders

`siputeh` (primary school), `mrsm` (secondary school), `kmb` (college), `manchester` (degree),
`pwc`, `um` (masters), `deloitte`.

Add as many photos as you like per stop. Each photo can have its own description: add a
`captions.json` file in the same folder, mapping filename to text:

```json
{
  "01-assembly.jpg": "Morning assembly, standing in the front row.",
  "02-canteen.jpg": "The canteen where we spent every recess."
}
```

A photo without an entry falls back to the stop's general description.

## Hiking folders

One folder per hike (see the list in `hiking/`). Put any number of photos and videos in it.
A hike has a single description, which lives in `src/pages/Hiking.tsx`, so no captions file.

## Rules of thumb

- **Order:** files are shown in filename order, so prefix them `01-`, `02-`, ...
- **Formats:** images `.jpg .jpeg .png .webp .avif .gif`, videos `.mp4 .webm .mov`.
- **Size:** keep photos under about 500 KB (resize to ~1600px wide) and videos short and
  compressed (mp4, under about 10 MB). Everything here is bundled into the site, so large
  files slow down the build and every visitor's download.
- **Until you add a photo:** Journey falls back to the placeholder photo, Hiking shows
  "Photo coming soon".
- **Adding a new hike or stop:** create a new folder with the same slug as its entry in the
  page's data.
