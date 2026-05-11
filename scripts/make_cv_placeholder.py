#!/usr/bin/env python3
"""
One-off generator for W1 placeholder CV PDFs.
Emits a minimal valid PDF using Helvetica (Type1 base font, no embedding needed).
ASCII content only. Not checked into the W1 deliverable's public path.

Usage: python3 scripts/make_cv_placeholder.py <out.pdf> "<line1>" "<line2>" ...
"""
import sys
from pathlib import Path


def build_pdf(lines):
    stream_lines = ["BT", "/F1 12 Tf", "16 TL", "72 720 Td"]
    for i, line in enumerate(lines):
        esc = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        if i == 0:
            stream_lines.append("({}) Tj".format(esc))
        else:
            stream_lines.append("T*")
            stream_lines.append("({}) Tj".format(esc))
    stream_lines.append("ET")
    stream = "\n".join(stream_lines).encode("ascii")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        (b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
         b"/Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>"),
        (b"<< /Length " + str(len(stream)).encode("ascii") + b" >>\nstream\n"
         + stream + b"\nendstream"),
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ]

    out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for i, body in enumerate(objects, start=1):
        offsets.append(len(out))
        out += "{} 0 obj\n".format(i).encode("ascii") + body + b"\nendobj\n"

    xref_offset = len(out)
    out += "xref\n0 {}\n".format(len(objects) + 1).encode("ascii")
    out += b"0000000000 65535 f \n"
    for off in offsets[1:]:
        out += "{:010d} 00000 n \n".format(off).encode("ascii")
    out += ("trailer\n<< /Size {} /Root 1 0 R >>\nstartxref\n{}\n%%EOF\n"
            .format(len(objects) + 1, xref_offset)).encode("ascii")
    return bytes(out)


if __name__ == "__main__":
    out_path = Path(sys.argv[1])
    lines = sys.argv[2:] or ["Placeholder"]
    out_path.write_bytes(build_pdf(lines))
    print("wrote {} ({} bytes)".format(out_path, out_path.stat().st_size))
