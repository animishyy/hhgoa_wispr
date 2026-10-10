# Earth, Elsewhere — Planet Lab

**What if Earth were different?** Earth, Elsewhere is a playful, browser-based planet laboratory. Pick one of 100 planetary “what if?” prompts, watch the globe transform, and read a short explanation of the Earth systems that might be affected.

> **Deployment:** [Open Earth, Elsewhere on Vercel](https://hhgoa-wispr.vercel.app/)
>
> The repository’s supplied `.env` did not contain a Vercel URL, so this is the conventional Vercel project URL based on the repository name. If your Vercel project uses a different custom domain, replace this link with the canonical production URL.

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

## Deploy to Vercel

The project is plain static HTML, CSS and JavaScript, so it can be deployed without a framework build step:

1. Import `animishyy/hhgoa_wispr` into Vercel, or connect the repository to the existing Vercel project.
2. Choose **Other** as the framework preset (or leave the project as a static site).
3. Leave the build command empty. Set the output directory to `.` if Vercel asks for one.
4. Deploy. Future pushes to the connected production branch will trigger a new deployment.

No values from `.env` are needed by the browser. Keep the GitHub token private; never add it to application code or commit `.env`.

## Project notes

- Search supports **⌘ K** on Mac and **Ctrl K** elsewhere; **Escape** closes the comparison panel.
- Arrow keys navigate scenarios when focus is outside a text input.
- The layout adapts to narrow screens; the scenario collection becomes a compact scrollable picker above the planet.
- The interface labels itself as a thought experiment because the visual effects simplify complex and coupled planetary systems.

## License

No license has been added yet. Add one before redistributing or reusing this project publicly.
