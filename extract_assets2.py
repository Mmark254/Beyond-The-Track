from pathlib import Path
import re

root = Path(r"C:\Users\user\Downloads\local manman")
files = [
    "index.html",
    "sample.html",
    "racer.html",
    "spectators.html",
    "vendors.html",
    "admin.html",
]

for name in files:
    path = root / name
    if not path.exists():
        print(f"skip missing: {path}")
        continue

    text = path.read_text(encoding="utf-8")
    print(f"processing {name}")

    style_pattern = re.compile(r"(?is)<style\b[^>]*>(.*?)</style>")
    style_matches = style_pattern.findall(text)
    if style_matches:
        css_text = "\n\n".join(block.strip() for block in style_matches if block.strip())
        css_path = root / f"{path.stem}.css"
        css_path.write_text(css_text + "\n", encoding="utf-8")
        text = style_pattern.sub(f'<link rel="stylesheet" href="{path.stem}.css">', text, count=len(style_matches))

    script_pattern = re.compile(r"(?is)<script\b(?![^>]*src=)[^>]*>(.*?)</script>")
    script_matches = script_pattern.findall(text)
    js_blocks = []
    for block in script_matches:
        body = block.strip()
        if not body:
            continue
        if "tailwind.config" in body:
            continue
        js_blocks.append(body)

    if js_blocks:
        js_path = root / f"{path.stem}.js"
        js_path.write_text("\n\n".join(js_blocks) + "\n", encoding="utf-8")
        matches = list(script_pattern.finditer(text))
        if matches:
            text = text[:matches[0].start()] + f'<script src="{path.stem}.js"></script>' + text[matches[-1].end():]

    path.write_text(text, encoding="utf-8")
    print(f"done {name}")

print("complete")
