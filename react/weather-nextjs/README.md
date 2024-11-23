# Weather

This is a sample NextJS 15 SPA application that grabs the weather from the [Norwegian MET Office API](https://api.met.no)
based on the visitors current location.  It utilizes React and Web APIs like Permissions and Geolocation


## Demo

There is a demonstration website setup at [https://weather.demo.kamiro.co](https://weather.demo.kamiro.co)

## Discussion

### Using localStorage for privacy of celcius/fahrenheit

### Using onPointerDown for better UX

### Detecting location prompt and only showing after a direct action /avoid permission bomb
#### Location Retreival on iOS with retry

### Optimized images with images/next

### SupportedLocale and Typescript type predicates ensure changing languages triggers errors to all changes



## Development
### Development server

First, run the development server:

```bash
bun --bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deploy to production

First, run the development server:

```bash
bun --bun run deploy
```

Cloudfront will need some time to invalidate its cached version of the website, but after a few minutes
it will be available at [https://weather.demo.kamiro.co](https://weather.demo.kamiro.co)
