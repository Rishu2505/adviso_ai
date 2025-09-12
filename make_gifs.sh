#!/bin/bash

INPUT="adviso_AI.mp4"
OUTDIR="src/assets/screenshots"
mkdir -p "$OUTDIR"

make_gif () {
  START=$1
  END=$2
  NAME=$3
  ffmpeg -y -i "$INPUT" -ss $START -to $END \
    -vf "fps=12,scale=400:-1:flags=lanczos" \
    "$OUTDIR/$NAME.gif"
}

echo "🎬 Generating GIFs..."

# Example cuts
make_gif 00:00:03 00:00:22 home   # Custom: from 1:58 → 2:30

echo "✅ GIFs created in $OUTDIR"