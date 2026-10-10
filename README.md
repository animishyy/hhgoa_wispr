# Earth, Elsewhere — Planet Lab

**What if Earth were different?** Earth, Elsewhere is a playful, browser-based planet laboratory. Pick one of 100 planetary “what if?” prompts, watch the globe transform, and read a short explanation of the Earth systems that might be affected.

> **GitHub Pages:** [animishyy.github.io/hhgoa_wispr](https://animishyy.github.io/hhgoa_wispr/)

The site is published from the `main` branch.

## Try it

Choose a scenario from the left-hand library, or filter the list by topic or search by keyword. The animated planet changes with each experiment; its label, measurement, explanation and field note update at the same time. Use the arrow buttons or keyboard arrow keys to move through the experiments, **Surprise me** to jump to one at random, and **Replay the shift** to replay the visual change. **Compare with Earth** opens a side-by-side reference with today’s Earth. The motion button pauses decorative animation for a calmer view.

The five collections contain 20 experiments apiece:

| Collection | A few prompts |
| --- | --- |
| Water & climate | Remove all water, freeze the ocean, double the greenhouse blanket |
| Gravity & motion | Double gravity, borrow lunar gravity, stop Earth’s spin |
| Orbit & sunlight | Move toward Mars, dim the Sun, give Earth rings |
| Air & atmosphere | Change oxygen, lose the ozone layer, add a magnetic shield |
| Living Earth | Remove insects, grow giant plants, reassemble the continents |

## Run locally

This is a dependency-free static site. You need a browser; Node.js is optional if you want to serve it locally.

```bash
git clone https://github.com/animishyy/hhgoa_wispr.git
cd hhgoa_wispr
```

Open `index.html` directly, or start a small local server:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000). The app has no backend, account system, analytics, or runtime API calls. Google Fonts are loaded from Google Fonts when a network connection is available; system fallbacks are used otherwise.

## How it is built

- **`index.html`** contains the accessible page structure: experiment library, animated planet stage, scenario detail, comparison drawer, and explanatory note.
- **`styles.css`** defines the responsive dark observatory UI, the globe and starfield, and scenario-specific visual treatments. The globe is composed from CSS gradients and shapes rather than a downloaded image or 3D engine. Each scenario’s `mode` activates a corresponding visual treatment; shared animated layers such as clouds, rotation, rings, and the orbiting moon add motion.
- **`scenarios.js`** is the content library. It holds 100 individually written prompts, each with a visual mode, readout, short explanation, and science note. They are grouped into five themes of 20.
- **`app.js`** filters and renders the library, wires up search and keyboard controls, updates the planet and readouts, and manages replay, reduced motion, and the comparison panel.

There is no numerical climate or orbital solver behind the readouts. The numbers are illustrative scenario labels and the explanations describe broad mechanisms. For example, an orbital change can affect incoming sunlight, but a full climate outcome would also depend on the atmosphere, clouds, oceans, geology, and feedbacks. The app presents thought experiments, not forecasts or scientific predictions.

No values from `.env` are needed by the browser. Keep the GitHub token private; never add it to application code or commit `.env`.

## Deploy to GitHub Pages

The app is plain static HTML, CSS and JavaScript, so GitHub Pages can serve the repository root directly. The included [`.nojekyll`](./.nojekyll) file tells Pages to serve static files without a Jekyll build. Once enabled, pushes to `main` automatically update the site.

To enable it in GitHub:

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
4. Wait for the initial Pages build and open the GitHub Pages link at the top of this README.

GitHub can take a few minutes to publish the first build. Later pushes to `main` publish automatically.

## Project notes

- Search supports **⌘ K** on Mac and **Ctrl K** elsewhere; **Escape** closes the comparison panel.
- Arrow keys navigate scenarios when focus is outside a text input.
- The layout adapts to narrow screens; the scenario collection becomes a compact scrollable picker above the planet.
- The interface labels itself as a thought experiment because the visual effects simplify complex and coupled planetary systems.

## License

No license has been added yet. Add one before redistributing or reusing this project publicly.
