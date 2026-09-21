#!/usr/bin/env python3
"""
fetch_asset.py - Objective Real-World Image Fetcher for Mockups & Catalogs

Fetches authentic, ground-truth photos for real-world landmarks, local merchants,
and regional dishes without falling back to generic Western stock photography.

Hierarchy:
1. Google Places Photo API (if Google Place ID and API key are available)
2. Wikimedia Commons / Wikipedia PageImages API (for heritage, cultural, and geographic landmarks)
3. Localized Web Search Engine Scraping (for specific street food, cafes, and local merchants)
"""

import sys
import os
import argparse
import urllib.request
import urllib.parse
import json
import re

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
}

def is_valid_image(data: bytes) -> bool:
    """Verifies that bytes contain a valid image (JPEG, PNG, WebP) and is at least 15KB."""
    if len(data) < 15000:
        return False
    # Check magic bytes
    if data.startswith(b'\xff\xd8\xff'): # JPEG
        return True
    if data.startswith(b'\x89PNG\r\n\x1a\n'): # PNG
        return True
    if len(data) > 12 and data[:4] == b'RIFF' and data[8:12] == b'WEBP': # WebP
        return True
    return False

def try_wikipedia(query: str) -> str | None:
    """Tries fetching verified photo from Indonesian or English Wikipedia."""
    clean_q = re.sub(r'\(.*?\)', '', query).strip()
    variations = [
        clean_q.replace(' ', '_'),
        query.replace(' ', '_'),
    ]

    for lang in ['id', 'en']:
        for title in variations:
            api_url = f"https://{lang}.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=1200"
            req = urllib.request.Request(api_url, headers={'User-Agent': 'OsloCityscapeBot/1.0 (contact@oslo.voyage)'})
            try:
                with urllib.request.urlopen(req, timeout=8) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    pages = data.get('query', {}).get('pages', {})
                    for pid, p in pages.items():
                        thumb = p.get('thumbnail', {}).get('source')
                        if thumb and not thumb.endswith('.svg.png') and 'logo' not in thumb.lower():
                            return thumb
            except Exception:
                continue
    return None

def try_bing_images(query: str) -> list[str]:
    """Scrapes top genuine photo URLs from web image search."""
    search_url = f"https://www.bing.com/images/search?q={urllib.parse.quote(query)}&form=HDRSC2&first=1"
    req = urllib.request.Request(search_url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            murls = re.findall(r'murl&quot;:&quot;(https?://[^&"]+)', html)
            valid_urls = [
                u for u in murls
                if not any(bad in u.lower() for bad in ['.svg', 'logo', 'icon', 'clipart', 'vector'])
            ]
            return valid_urls[:5]
    except Exception as e:
        print(f"  [Warning] Web image search failed: {e}")
        return []

def download_and_save(url: str, dest_path: str) -> bool:
    """Downloads an image URL and saves to target destination path with validation."""
    os.makedirs(os.path.dirname(os.path.abspath(dest_path)), exist_ok=True)
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
            if not is_valid_image(data):
                print(f"  [Skip] Invalid image or size too small ({len(data)} bytes) from {url}")
                return False
            
            with open(dest_path, 'wb') as f:
                f.write(data)
            print(f"  [Success] Saved {dest_path} ({len(data)//1024} KB)")
            return True
    except Exception as e:
        print(f"  [Error] Failed downloading {url}: {e}")
        return False

def fetch_objective_image(query: str, dest_path: str, context: str = "") -> bool:
    """Orchestrates multi-tier objective image fetching."""
    full_query = f"{query} {context}".strip()
    print(f"[Search] Fetching objective image for: '{full_query}' -> {dest_path}")

    # Tier 1: Wikipedia / Wikimedia Commons
    wiki_url = try_wikipedia(query)
    if wiki_url:
        print(f"  Found Wikipedia/Wikimedia match: {wiki_url}")
        if download_and_save(wiki_url, dest_path):
            return True

    # Tier 2: Real-World Search Engine (Bing/Google scraped index)
    candidate_urls = try_bing_images(full_query)
    for cand in candidate_urls:
        if download_and_save(cand, dest_path):
            return True

    # Tier 3: Query with additional context
    if context:
        retry_urls = try_bing_images(query)
        for cand in retry_urls:
            if download_and_save(cand, dest_path):
                return True

    print(f"  [Failed] Could not find an objective photo for: {query}")
    return False

def main():
    parser = argparse.ArgumentParser(description="Fetch authentic real-world mockup image assets.")
    parser.add_argument("--query", "-q", help="Search query (e.g. 'Institut Teknologi Bandung Aula Barat')")
    parser.add_argument("--out", "-o", help="Target output file path (e.g. 'public/images/bandung/itb.jpg')")
    parser.add_argument("--context", "-c", default="", help="Additional search context (e.g. 'Bandung Indonesia')")
    parser.add_argument("--manifest", "-m", help="JSON manifest file with list of [{query, out, context}] items")

    args = parser.parse_args()

    if args.manifest:
        with open(args.manifest, 'r', encoding='utf-8') as f:
            items = json.load(f)
        success = 0
        for it in items:
            q = it.get('query')
            o = it.get('out')
            c = it.get('context', '')
            if q and o:
                if fetch_objective_image(q, o, c):
                    success += 1
        print(f"\nManifest processing complete: {success}/{len(items)} images saved successfully.")
    elif args.query and args.out:
        ok = fetch_objective_image(args.query, args.out, args.context)
        sys.exit(0 if ok else 1)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
