# Otakudesu API Structure Reference

## Home Endpoint (`/anime/home`)

```json
{
  "status": "success",
  "data": {
    "ongoing": {
      "animeList": [
        {
          "title": "Anime Title",
          "poster": "https://...",
          "episodes": 10,
          "releaseDay": "Jumat",
          "latestReleaseDate": "06 Mar",
          "animeId": "anime-slug",
          "href": "/anime/anime/anime-slug",
          "otakudesuUrl": "https://..."
        }
      ]
    },
    "completed": {
      "animeList": [
        {
          "title": "Anime Title",
          "poster": "https://...",
          "episodes": 12,
          "score": "7.54",
          "lastReleaseDate": "01 Mar",
          "animeId": "anime-slug",
          "href": "/anime/anime/anime-slug",
          "otakudesuUrl": "https://..."
        }
      ]
    }
  }
}
```

## Key Fields

- `animeId` - Use this as the slug for detail pages
- `poster` - Anime thumbnail image
- `title` - Anime title
- `episodes` - Number of episodes
- `releaseDay` - Day of the week (for ongoing)
- `score` - MAL score (for completed)
- `href` - Relative path to anime detail

## Frontend Mapping

```javascript
// Extract slug
const slug = anime.animeId || anime.slug;

// Extract image
const image = anime.poster || anime.thumb || anime.image;

// Extract title
const title = anime.title || anime.name;

// Extract episode info
const episodes = anime.episodes; // Number

// Extract status
const status = anime.releaseDay || anime.score;
```

## Navigation

- Home: Shows ongoing + completed anime
- Catalog: Shows all anime (ongoing + completed combined)
- Detail: `/detail/{animeId}`
- Episode: `/episode/{episodeSlug}`
