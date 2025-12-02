# LocalCafe

LocalCafe is a website builder specifically designed for small, independent restaurants and cafes.
It creates a professional website that can cost nothing to host and are easy to update.

---

## Features

### Free / No Monthly Fees
- This project is open source and free
- This project can host for free on GitHub Pages, Netlify, or Cloudflare Pages

### Static Website
- Fast page loads - everything pre-generated
- No database or server required

### Online Menu
- Display your full menu with photos, descriptions, and prices
- Single prices or multiple options (small/large, hot/iced, etc.)
- Customers filter by tags (vegetarian, gluten-free, breakfast, lunch)
- Update by editing simple text files

### Location & Maps
- Show one location or multiple locations
- Automatic maps - just provide your address
- Each location has its own hours, phone, and email
- Maps adjust to any screen size

### Photo Slideshow
- Homepage displays rotating photos with smooth transitions
- Supports single image or multiple images
- Photos fade between each other automatically

### Mobile Responsive
- Works on all phones and tablets
- Menu and navigation adapt to screen size
- No pinching or zooming required

### Social Sharing
- Links shared on Facebook, Twitter, Instagram show rich previews
- Displays your photo and description automatically

---

## Configuration

### Site Settings
Edit `priv/home.md` to configure your site:

```elixir
%{
  site_name: "Your Cafe Name",
  title: "Home",
  description: "Your tagline",
  image: "/images/preview.jpg",           # Social sharing image
  logo: "/images/logo.png",               # Optional: Logo in navigation
  hero: ["Main headline", "Subheading"],   # Hero text lines
  hero_image: ["/images/hero_1.jpg"],      # Single image or list
  domain: "https://yourcafe.com"           # For social sharing
}
```

### Menu Items
Create markdown files in `priv/menu/`. File name becomes URL path.

**Single price:**
```elixir
%{
  title: "Espresso",
  prices: "$3.50",
  tags: ~w(coffee hot),
  description: "Rich, bold espresso",
  image: "/images/espresso.jpg"
}
---
Your detailed description here...
```

**Multiple prices:**
```elixir
%{
  title: "Latte",
  prices: [small: "$4.50", large: "$5.50"],
  tags: ~w(coffee hot dairy),
  description: "Smooth espresso with steamed milk",
  image: "/images/latte.jpg"
}
```

### Locations
Create markdown files in `priv/locations/`. Coordinates fetched automatically.

```elixir
%{
  name: "Downtown Location",
  street: "123 Main Street",
  city_state: "Portland, OR 97202",
  phone: "(555) 123-4567",
  email: "hello@yourcafe.com",
  hours: ["Mon-Fri: 7am-7pm", "Sat-Sun: 8am-8pm"]
}
---
Visit us in the heart of downtown!
```

To skip the map, add coordinates manually:
```elixir
%{
  # ... other fields ...
  latitude: "45.5050932",
  longitude: "-122.6445551"
}
```

### Tags
Tags enable filtering. Use any keywords:
- Dietary: `vegetarian`, `vegan`, `gluten-free`, `dairy-free`
- Categories: `breakfast`, `lunch`, `dinner`, `dessert`
- Types: `coffee`, `tea`, `sandwich`, `salad`, `soup`

### Hero Images
**Single image:**
```elixir
hero_image: "/images/hero.jpg"
```

**Slideshow (fades every 5 seconds):**
```elixir
hero_image: ["/images/hero_1.jpg", "/images/hero_2.jpg", "/images/hero_3.jpg"]
```

### Colors
Edit `assets/css/tokens/colors.css` to customize your color scheme:

```css
--color-primary: oklch(0.333 0.013 255);
--color-accent: oklch(0.45 0.08 30);
--color-background: oklch(1.0 0 0);
```

### Typography
Edit `assets/css/tokens/typography.css`:

```css
--font-display: "Georgia", serif;
--font-base: "Helvetica", sans-serif;
--text-base: 1rem;
--text-lg: 1.125rem;
```

### Build Commands
```bash
mix setup          # Initial setup
mix build          # Generate static site
mix test           # Run tests
mix precommit      # Run all checks before committing
```

### Deployment
Generated site is in `priv/output/`. Upload this folder to:
- **GitHub Pages:** Push to `gh-pages` branch
- **Netlify:** Set publish directory to `priv/output`
- **Cloudflare Pages:** Set build output to `priv/output`

## Quick Start

### Prerequisites
- Elixir 1.15+
- Node.js 18+ (for asset building)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/local_cafe_lite.git
   cd local_cafe_lite
   ```

2. **Install dependencies**
   ```bash
   mix setup
   ```

3. **Configure your site**
   Edit `priv/home.md` with your cafe details:
   ```elixir
   %{
     site_name: "Your Cafe Name",
     title: "Home",
     description: "Your cafe description",
     image: "/images/preview.jpg",
     hero: ["Welcome message here"],
     hero_image: ["/images/hero_1.jpg"],
     domain: "https://yourcafe.com"
   }
   ```

4. **Add your menu items**
   Create markdown files in `priv/menu/`:
   ```markdown
   # /menu/coffee.md
   %{
     title: "Espresso",
     prices: [single: "$3.50", double: "$4.50"],
     tags: ~w(coffee hot),
     description: "Rich, bold espresso",
     image: "/images/espresso.jpg"
   }
   ---

   Our signature espresso made from locally roasted beans...
   ```

5. **Add your locations**
   Create markdown files in `priv/locations/`:
   ```markdown
   # /locations/downtown.md
   %{
     name: "Downtown Location",
     street: "123 Main Street",
     city_state: "Portland, OR 97202",
     phone: "(555) 123-4567",
     email: "hello@yourcafe.com",
     hours: ["Mon-Fri: 7am - 7pm", "Sat-Sun: 8am - 8pm"]
   }
   ---

   Visit us in the heart of downtown!
   ```

6. **Add your images**
   Place images in `priv/output/images/`:
   - Hero images: `hero_1.jpg`, `hero_2.jpg`, etc.
   - Menu item images: `coffee.jpg`, `pastry.jpg`, etc.
   - Preview image for social sharing: `preview.jpg`

7. **Build your site**
   ```bash
   mix build
   ```

8. **Preview locally**
   ```bash
   cd priv/output
   python3 -m http.server 8000
   ```
   Open http://localhost:8000 in your browser

## Project Structure

```
local_cafe_lite/
├── assets/
│   ├── css/              # Stylesheets
│   │   ├── tokens/       # Design tokens (colors, spacing, typography)
│   │   ├── base/         # Reset and base styles
│   │   ├── utilities/    # Reusable patterns
│   │   └── components/   # Component styles
│   └── js/               # JavaScript (filtering, slideshow, maps)
├── lib/
│   ├── local_cafe.ex     # Main module with templates
│   └── local_cafe/
│       ├── menu.ex       # Menu module
│       ├── menu/
│       │   └── item.ex   # Menu item struct
│       ├── location.ex   # Location module
│       ├── location/
│       │   └── item.ex   # Location struct with geocoding
│       ├── site.ex       # Site settings module
│       └── home.ex       # Home page struct
├── priv/
│   ├── home.md           # Site configuration
│   ├── menu/             # Menu item markdown files
│   ├── locations/        # Location markdown files
│   └── output/           # Generated static site
└── mix.exs               # Project configuration
```

## Customization

### Colors
Edit `assets/css/tokens/colors.css` to customize your color scheme using design tokens.

### Typography
Edit `assets/css/tokens/typography.css` to change fonts and text sizes.

### Layout
Edit `assets/css/components/` files to customize component styles.

### JavaScript
Edit `assets/js/app.js` for slideshow timing, filter behavior, or map settings.

## Deployment

### GitHub Pages (Automatic with GitHub Actions)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Under "Build and deployment", set Source to "GitHub Actions"
4. Push to the `main` branch - the site will build and deploy automatically
5. Your site will be available at `https://yourusername.github.io/repository-name/`

**Note:** The `.github/workflows/deploy.yml` file is already configured to build and deploy on every push to `main`.

### Netlify
1. Connect your repository
2. Set build command: `mix build`
3. Set publish directory: `priv/output`

### Cloudflare Pages
1. Connect your repository
2. Set build command: `mix setup && mix build`
3. Set build output directory: `priv/output`

## Development

### Running Tests
```bash
mix test
```

### Pre-commit Checks
```bash
mix precommit
```
Runs compilation with warnings-as-errors, formatting, and tests.

### Asset Development
```bash
cd assets
npm run watch    # Watch mode with live rebuild
npm run build    # Production build
```

## Philosophy

LocalCafe emphasizes:
- **Semantic HTML** - Standard elements, accessible markup
- **Vanilla CSS** - No frameworks, just design tokens and composition
- **Minimal JavaScript** - Only when truly needed
- **Static generation** - Fast, secure, and free to host
- **Small business friendly** - Easy to use, easy to maintain

## Contributing

We welcome contributions! This project aims to support independent restaurants and cafes with limited budgets. Please keep the code simple, maintainable, and accessible.

## License

MIT

## Support

Built for the restaurant and cafe community. If you use LocalCafe for your business, consider contributing improvements back to help other small businesses!
