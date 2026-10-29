# SDPBWrapDisplay

S-matrix bootstrap results viewer page https://simonmetayer.github.io/SDPBWrapDisplay/

## Run locally

Opening `index.html` directly (`file://`) prevents the browser from fetching the saved amplitude and optimizer files. From this repository directory, run:

```sh
./serve-local.sh
```

Then open <http://127.0.0.1:8000/>. To use another port, set `SDPBWRAPDISPLAY_PORT`, for example `SDPBWRAPDISPLAY_PORT=8080 ./serve-local.sh`.
