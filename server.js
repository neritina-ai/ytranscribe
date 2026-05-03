#!/usr/bin/env node
const express = require('express');
const path = require('path');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

function extractVideoId(input) {
  const patterns = [
    /(?:v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  return null;
}

app.get('/transcript', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: '請提供 url 參數' });

  const videoId = extractVideoId(url);
  if (!videoId) return res.status(400).json({ error: '找不到有效的影片 ID，網址可能不完整或格式不正確' });

  try {
    const data = await YoutubeTranscript.fetchTranscript(videoId);
    const text = data.map(d => {
      const totalSec = Math.floor(d.offset / 1000);
      const m = Math.floor(totalSec / 60);
      const s = String(totalSec % 60).padStart(2, '0');
      return `[${m}:${s}] ${d.text}`;
    }).join('\n');
    res.json({ text, segments: data.length });
  } catch (err) {
    if (/transcript is disabled/i.test(err.message)) {
      const oEmbed = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      ).catch(() => null);
      if (!oEmbed || oEmbed.status === 404) {
        return res.status(404).json({ error: 'VIDEO_NOT_FOUND' });
      }
    }
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`ytranscribe 已啟動 → http://localhost:${PORT}`);
});
