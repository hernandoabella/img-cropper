"use client";

import { useState, useCallback } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import { FaCloudUploadAlt, FaDownload, FaTrash, FaMagic, FaExpand, FaInstagram, FaYoutube, FaSquare } from "react-icons/fa";

// Ratio presets for the new UI
const RATIOS = [
  { label: "Free", value: undefined, icon: <FaExpand /> },
  { label: "1:1", value: 1, icon: <FaSquare /> },
  { label: "4:5", value: 4 / 5, icon: <FaInstagram /> },
  { label: "16:9", value: 16 / 9, icon: <FaYoutube /> },
];

export default function PerfectImageCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const downloadPerfectCrop = async () => {
    if (!croppedAreaPixels || !image) return;
    try {
      const img = new Image();
      img.src = image;
      await new Promise((resolve) => (img.onload = resolve));
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(img, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
      let foundContent = false;
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const alpha = data[(y * canvas.width + x) * 4 + 3];
          if (alpha > 0) {
            if (x < minX) minX = x; if (x > maxX) maxX = x;
            if (y < minY) minY = y; if (y > maxY) maxY = y;
            foundContent = true;
          }
        }
      }
      
      const finalCanvas = document.createElement("canvas");
      // Logic: If Freeform, trim. If fixed ratio, we usually keep the ratio frame.
      const fWidth = aspect ? canvas.width : (maxX - minX + 1);
      const fHeight = aspect ? canvas.height : (maxY - minY + 1);
      
      finalCanvas.width = fWidth;
      finalCanvas.height = fHeight;
      const finalCtx = finalCanvas.getContext("2d");
      if (!finalCtx) return;
      
      if (aspect) {
        finalCtx.drawImage(canvas, 0, 0);
      } else {
        finalCtx.drawImage(canvas, minX, minY, fWidth, fHeight, 0, 0, fWidth, fHeight);
      }

      const link = document.createElement("a");
      link.download = `multidim-crop-${Date.now()}.png`;
      link.href = finalCanvas.toDataURL("image/png");
      link.click();
    } catch (e) { console.error(e); }
  };

  return (
    <section className="bg-[#030303] min-h-screen py-12 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              Multi<span className="text-indigo-500">Dim</span> Crop.
            </h2>
            <p className="text-zinc-500 text-sm font-medium mt-1">Advanced Aspect-Ratio & Alpha Control</p>
          </div>
          {image && (
            <button onClick={() => setImage(null)} className="group flex items-center gap-2 px-4 py-2 bg-zinc-900/50 hover:bg-rose-500/10 border border-zinc-800 hover:border-rose-500/50 rounded-full text-zinc-400 hover:text-rose-400 text-xs font-bold transition-all">
              <FaTrash /> Reset Canvas
            </button>
          )}
        </header>

        {!image ? (
          <div className="relative h-[450px] bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-[3rem] flex flex-col items-center justify-center group hover:border-indigo-500/40 transition-all cursor-pointer overflow-hidden backdrop-blur-sm">
            <input type="file" accept="image/*" onChange={onFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
            <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaCloudUploadAlt size={32} className="text-indigo-400" />
            </div>
            <p className="text-xl font-semibold text-zinc-300">Upload Source Image</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="relative h-[550px] w-full rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl bg-black/40 backdrop-blur-md checkerboard-bg">
                <Cropper
                  image={image} crop={crop} zoom={zoom} aspect={aspect}
                  onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom}
                />
              </div>
              
              <div className="flex items-center gap-6 p-5 bg-zinc-900/40 backdrop-blur-md rounded-[2rem] border border-zinc-800/50">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-2">Zoom</span>
                <input type="range" value={zoom} min={1} max={3} step={0.01} onChange={(e) => setZoom(Number(e.target.value))} className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{Math.round(zoom * 100)}%</span>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-zinc-900/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-zinc-800/50 shadow-xl">
                <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-[0.3em] mb-4 flex items-center gap-2">
                  <FaMagic className="text-indigo-500" /> Dimensions
                </h4>
                
                {/* Aspect Ratio Selector */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {RATIOS.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setAspect(r.value)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                        aspect === r.value 
                        ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40" 
                        : "bg-black/20 border-zinc-800 text-zinc-500 hover:border-zinc-600"
                      }`}
                    >
                      {r.icon} {r.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-zinc-800/50">
                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-tighter">Export Format</span>
                    <span className="text-[10px] font-bold text-white uppercase">PNG Alpha</span>
                  </div>
                </div>

                <button
                  onClick={downloadPerfectCrop}
                  className="group w-full py-5 bg-gradient-to-br from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                >
                  <FaDownload /> <span className="uppercase tracking-widest text-xs">Download Result</span>
                </button>
              </div>

              <div className="p-5 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10">
                <p className="text-[9px] text-zinc-500 font-medium leading-relaxed uppercase text-center">
                  Smart aspect-ratio anchoring is active. Final export will be high-resolution.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>

      <style jsx>{`
        .checkerboard-bg {
          background-image: linear-gradient(45deg, #0a0a0a 25%, transparent 25%), 
                            linear-gradient(-45deg, #0a0a0a 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, #0a0a0a 75%), 
                            linear-gradient(-45deg, transparent 75%, #0a0a0a 75%);
          background-size: 24px 24px;
          background-position: 0 0, 0 12px, 12px -12px, -12px 0px;
        }
      `}</style>
    </section>
  );
}