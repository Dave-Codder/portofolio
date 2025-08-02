import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const musicDir = path.join(process.cwd(), "public/music");
  const files = fs
    .readdirSync(musicDir)
    .filter((file) => file.endsWith(".mp3"));

  const artistMap = {
    "Euphoria": "VØJ, Narvent, KoruSe",
    "Fainted": "Narvent",
    "Lost Memory": "VØJ, Narvent",
    "Memory Reboot - Ambient Remix": "VØJ, Narvent",
    "Memory Reboot - Arabic Version": "VØJ, Narvent",
    "Memory Reboot - Over Slowed": "VØJ, Narvent",
    "Memory Reboot - Slowed Arabic Version": "VØJ, Narvent",
    "Memory Reboot - Slowed": "VØJ, Narvent",
    "Memory Reboot - Sped Up": "VØJ, Narvent",
    "Memory Reboot": "VØJ, Narvent",
    "Moonlit": "VØJ, Narvent",
  };

  const playlist = files.map((file) => {
    const baseName = path.basename(file, ".mp3");
    return {
      title: baseName,
      artist: artistMap[baseName] || "Unknown",
      src: `/music/${file}`,
      art: `/images/${baseName}.png`,
    };
  });

  return NextResponse.json(playlist);
}