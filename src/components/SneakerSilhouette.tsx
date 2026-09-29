import React, { useState } from 'react';
import { SilhouetteKey } from '../types/sneaker';

interface SneakerSilhouetteProps {
  silhouette: SilhouetteKey;
  colorHex: string;
  accentColorHex?: string;
  imageUrl?: string;
  altText: string;
  className?: string;
}

export const SneakerSilhouette: React.FC<SneakerSilhouetteProps> = ({
  silhouette,
  colorHex,
  accentColorHex = '#ffffff',
  imageUrl,
  altText,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (imageUrl && !imgError) {
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#18191d] via-[#121316] to-[#0c0d0e] ${className}`}
      >
        {/* Subtle radial ambient glow based on sneaker colors */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none blur-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colorHex} 0%, transparent 70%)`,
          }}
        />

        {/* Loading skeleton shimmer */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Chargement Photo...
            </span>
          </div>
        )}

        <img
          src={imageUrl}
          alt={altText}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={`w-full h-full object-contain p-2.5 transition-all duration-300 group-hover:scale-105 drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Real photo indicator badge */}
        <div className="absolute bottom-2 left-2.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono uppercase tracking-wider text-slate-300 border border-white/10 pointer-events-none">
          Photo Réelle
        </div>
      </div>
    );
  }

  // Visual SVG silhouette renderers
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#181a1f] via-[#121316] to-[#0c0d0e] ${className}`}
      style={{
        boxShadow: `inset 0 0 40px ${colorHex}15`,
      }}
    >
      {/* Background glow of the sneaker accent */}
      <div
        className="absolute w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: colorHex }}
      />

      <svg
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[160px] p-2 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id={`grad-main-${colorHex.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorHex} />
            <stop offset="100%" stopColor={accentColorHex} />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Silhouette Rendering Based on Silhouette Key */}
        {silhouette === 'jordan1' && (
          <g filter="url(#shadow)">
            {/* Outsole */}
            <path
              d="M30 148 C 60 148, 250 148, 280 146 C 286 145, 290 142, 285 137 C 275 128, 260 128, 240 128 C 100 128, 50 128, 30 134 C 24 136, 22 148, 30 148 Z"
              fill="#262626"
            />
            {/* Midsole */}
            <path
              d="M34 135 C 70 135, 245 135, 275 133 C 280 131, 282 125, 276 120 C 265 116, 245 116, 230 116 C 90 116, 45 117, 33 123 C 27 126, 28 135, 34 135 Z"
              fill="#e5e5e5"
            />
            {/* High top Upper */}
            <path
              d="M50 122 C 45 115, 48 60, 52 46 C 54 40, 68 38, 86 44 C 98 48, 108 62, 114 74 C 135 84, 185 92, 220 95 C 248 98, 268 106, 274 116 C 260 118, 110 119, 50 122 Z"
              fill={colorHex}
            />
            {/* Toe box & overlays */}
            <path
              d="M190 94 C 215 97, 245 102, 265 112 C 260 116, 200 117, 185 117 C 180 106, 184 98, 190 94 Z"
              fill={accentColorHex}
              opacity="0.9"
            />
            {/* Ankle Collar & Wing area */}
            <path
              d="M58 45 C 72 43, 90 48, 102 58 C 96 70, 75 75, 62 70 C 56 65, 54 52, 58 45 Z"
              fill={accentColorHex}
              opacity="0.95"
            />
            {/* Wings badge circle */}
            <circle cx="82" cy="58" r="7" fill={colorHex} />
            {/* Nike Swoosh */}
            <path
              d="M110 88 C 145 88, 190 90, 236 94 C 248 95, 252 98, 242 101 C 210 107, 160 106, 130 99 C 118 96, 92 82, 75 70 C 85 74, 98 84, 110 88 Z"
              fill={accentColorHex === '#ffffff' ? '#171717' : '#ffffff'}
            />
            {/* Lacing and Eyelets */}
            <path
              d="M104 68 L 138 88 M 112 76 L 148 92 M 122 84 L 160 96 M 134 90 L 172 100"
              stroke="#0a0a0a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {silhouette === 'jordan4' && (
          <g filter="url(#shadow)">
            {/* Midsole with Air Window */}
            <path
              d="M34 140 C 70 140, 245 140, 275 137 C 282 134, 280 126, 272 121 C 255 116, 235 116, 220 116 C 90 116, 45 118, 32 124 C 26 128, 27 138, 34 140 Z"
              fill="#d4d4d4"
            />
            {/* Visible Air Chamber */}
            <rect x="55" y="126" width="34" height="9" rx="3" fill="#09090b" />
            <rect x="58" y="128" width="28" height="5" rx="2" fill="#38bdf8" opacity="0.8" />
            {/* Upper */}
            <path
              d="M48 122 C 46 100, 48 72, 56 60 C 62 52, 78 50, 96 58 C 108 64, 120 78, 130 84 C 158 87, 195 91, 230 96 C 255 101, 268 110, 271 118 C 240 120, 110 120, 48 122 Z"
              fill={colorHex}
            />
            {/* Triangular Wing Eyelet */}
            <polygon points="102,68 128,82 112,98 94,84" fill={accentColorHex} opacity="0.9" />
            {/* Netting / Mesh panel */}
            <rect x="125" y="86" width="32" height="18" rx="3" fill="#18181b" stroke={accentColorHex} strokeWidth="1" strokeDasharray="3,2" />
            {/* Extended Heel Tab */}
            <path d="M48 70 C 44 60, 42 46, 46 40 C 50 42, 54 52, 56 60 Z" fill="#18181b" />
            {/* Mudguard */}
            <path
              d="M180 97 C 210 100, 245 105, 267 114 C 262 119, 180 119, 165 118 C 160 107, 170 100, 180 97 Z"
              fill={accentColorHex}
              opacity="0.85"
            />
          </g>
        )}

        {silhouette === 'airmax1' && (
          <g filter="url(#shadow)">
            {/* Sole with Air Max Bubble */}
            <path
              d="M32 142 C 70 142, 245 142, 275 138 C 285 135, 282 125, 270 120 C 250 115, 230 115, 210 115 C 90 115, 45 116, 32 122 C 24 126, 24 140, 32 142 Z"
              fill="#f3f4f6"
            />
            {/* Big Air Bubble Chamber */}
            <rect x="52" y="125" width="40" height="12" rx="4" fill="#030712" />
            <rect x="55" y="127" width="34" height="8" rx="3" fill="#ef4444" opacity="0.85" />
            <line x1="68" y1="127" x2="68" y2="135" stroke="#f3f4f6" strokeWidth="2" />
            <line x1="78" y1="127" x2="78" y2="135" stroke="#f3f4f6" strokeWidth="2" />

            {/* Low top Upper */}
            <path
              d="M45 118 C 44 95, 52 75, 70 68 C 82 64, 102 72, 116 80 C 145 84, 195 89, 232 94 C 258 98, 270 106, 271 116 C 240 118, 100 118, 45 118 Z"
              fill="#e5e7eb"
            />
            {/* Iconic Wavy Mudguard */}
            <path
              d="M36 120 C 60 112, 110 114, 140 108 C 170 102, 220 104, 270 116 C 265 120, 50 122, 36 120 Z"
              fill={colorHex}
            />
            {/* Swoosh */}
            <path
              d="M120 86 C 150 86, 190 89, 230 94 C 238 95, 238 98, 228 100 C 195 105, 155 102, 130 97 C 115 94, 98 82, 85 74 C 98 77, 110 84, 120 86 Z"
              fill={colorHex}
            />
          </g>
        )}

        {silhouette === 'dunk' && (
          <g filter="url(#shadow)">
            {/* Flat Cupsole */}
            <path
              d="M30 142 C 60 142, 250 142, 278 140 C 286 138, 286 128, 276 123 C 260 118, 240 118, 220 118 C 90 118, 45 119, 30 126 C 24 130, 22 142, 30 142 Z"
              fill="#f8fafc"
            />
            {/* Upper Base */}
            <path
              d="M46 120 C 44 98, 55 76, 74 70 C 88 66, 108 74, 120 82 C 148 85, 195 90, 234 95 C 260 99, 272 108, 273 118 C 240 120, 100 120, 46 120 Z"
              fill={accentColorHex}
            />
            {/* Dunk Overlays (Heel, Eyelet & Toe Wrap) */}
            <path
              d="M46 120 C 44 98, 55 76, 74 70 C 78 82, 70 108, 58 120 Z"
              fill={colorHex}
            />
            <path
              d="M185 96 C 215 99, 245 104, 268 114 C 262 119, 185 119, 172 118 C 168 107, 175 100, 185 96 Z"
              fill={colorHex}
            />
            {/* Eyelet stay */}
            <path
              d="M98 72 C 114 78, 128 88, 142 98 C 132 102, 118 94, 106 84 Z"
              fill={colorHex}
            />
            {/* Nike Swoosh */}
            <path
              d="M115 88 C 150 88, 195 91, 236 96 C 246 97, 246 100, 234 102 C 198 108, 155 105, 130 99 C 116 95, 92 82, 78 72 C 90 76, 105 85, 115 88 Z"
              fill={colorHex === '#18181b' ? '#ffffff' : '#18181b'}
            />
          </g>
        )}

        {silhouette === 'airforce1' && (
          <g filter="url(#shadow)">
            {/* Chunky Sole with "AIR" text embossing */}
            <path
              d="M28 146 C 60 146, 252 146, 282 143 C 290 141, 288 126, 278 120 C 260 115, 240 115, 220 115 C 90 115, 42 116, 28 124 C 20 128, 20 146, 28 146 Z"
              fill="#e2e8f0"
            />
            <text x="68" y="137" fill="#64748b" fontSize="8" fontWeight="bold" letterSpacing="2">
              AIR
            </text>
            <line x1="56" y1="134" x2="64" y2="134" stroke="#94a3b8" strokeWidth="2" />
            <line x1="92" y1="134" x2="100" y2="134" stroke="#94a3b8" strokeWidth="2" />
            {/* AF1 Upper */}
            <path
              d="M44 116 C 42 96, 52 74, 72 68 C 86 64, 108 72, 122 80 C 150 84, 195 88, 234 94 C 260 98, 274 107, 275 116 C 240 118, 100 118, 44 116 Z"
              fill={colorHex}
            />
            {/* Perforated Toe box area */}
            <path
              d="M190 94 C 220 97, 248 102, 268 112 C 262 116, 190 116, 178 115 C 174 105, 180 98, 190 94 Z"
              fill={accentColorHex}
              opacity="0.8"
            />
            {/* Swoosh */}
            <path
              d="M112 85 C 150 85, 195 88, 240 94 C 248 95, 248 98, 235 101 C 196 108, 155 104, 128 98 C 112 94, 90 80, 75 70 C 88 74, 102 82, 112 85 Z"
              fill={accentColorHex}
            />
          </g>
        )}

        {silhouette === 'airmax95' && (
          <g filter="url(#shadow)">
            {/* Chunky Sole with Dual Air Bubbles */}
            <path
              d="M30 144 C 70 144, 250 144, 278 141 C 286 138, 284 127, 272 121 C 255 116, 235 116, 215 116 C 90 116, 45 117, 30 124 C 22 128, 22 144, 30 144 Z"
              fill="#18181b"
            />
            {/* Heel Bubble */}
            <rect x="52" y="127" width="34" height="11" rx="3" fill="#09090b" />
            <rect x="55" y="129" width="28" height="7" rx="2" fill="#a3e635" opacity="0.9" />
            {/* Forefoot Bubble */}
            <rect x="180" y="127" width="28" height="9" rx="3" fill="#09090b" />
            <rect x="183" y="129" width="22" height="5" rx="2" fill="#a3e635" opacity="0.9" />

            {/* Anatomical Wavy Ribs (Tiers) */}
            <path d="M40 120 C 80 118, 160 118, 270 118 C 265 112, 170 108, 42 110 Z" fill="#27272a" />
            <path d="M44 110 C 85 108, 165 106, 260 108 C 255 102, 168 98, 48 100 Z" fill="#3f3f46" />
            <path d="M48 100 C 90 98, 170 96, 248 98 C 242 92, 165 88, 54 90 Z" fill="#71717a" />
            <path d="M54 90 C 95 88, 175 86, 236 88 C 230 82, 160 78, 62 80 Z" fill="#e4e4e7" />

            {/* Mini Swoosh at rear ankle */}
            <path d="M68 76 C 78 76, 88 77, 94 79 C 96 80, 94 81, 90 82 C 82 83, 72 81, 68 76 Z" fill="#a3e635" />
          </g>
        )}

        {silhouette === 'kobe' && (
          <g filter="url(#shadow)">
            {/* Low Sleek Sole */}
            <path
              d="M32 138 C 70 138, 250 138, 276 135 C 284 133, 282 125, 270 120 C 250 115, 230 115, 210 115 C 90 115, 45 116, 32 121 C 24 124, 24 136, 32 138 Z"
              fill="#18181b"
            />
            {/* Sleek low cut Upper with scale texture hint */}
            <path
              d="M48 118 C 46 100, 56 80, 78 74 C 92 70, 114 78, 126 84 C 155 88, 200 92, 238 96 C 262 100, 274 108, 272 117 C 240 119, 100 119, 48 118 Z"
              fill={colorHex}
            />
            {/* Heel TPU counter */}
            <path d="M44 116 C 42 102, 50 88, 66 84 C 64 96, 58 110, 48 118 Z" fill="#09090b" opacity="0.9" />
            {/* Sheath logo / Swoosh */}
            <path
              d="M120 86 C 155 86, 200 89, 242 94 C 250 95, 248 98, 236 101 C 196 107, 155 104, 128 98 C 114 94, 94 82, 80 74 C 92 77, 108 85, 120 86 Z"
              fill={accentColorHex}
            />
          </g>
        )}

        {silhouette === 'running' && (
          <g filter="url(#shadow)">
            {/* Giant Rockered ZoomX Foam Sole */}
            <path
              d="M24 130 C 28 146, 70 148, 120 148 C 190 148, 260 145, 286 132 C 294 126, 288 114, 268 112 C 240 112, 140 115, 60 118 C 36 120, 22 122, 24 130 Z"
              fill="#f8fafc"
            />
            {/* Pointed Aerodynamic Heel */}
            <polygon points="22,122 14,129 28,136" fill="#f97316" />
            {/* Sleek Featherlight Upper */}
            <path
              d="M48 116 C 48 96, 62 76, 84 70 C 98 66, 120 74, 134 82 C 165 86, 215 90, 256 96 C 278 100, 282 107, 270 113 C 240 115, 100 116, 48 116 Z"
              fill={colorHex}
            />
            {/* Huge Dip Swoosh (dipping down into the midsole) */}
            <path
              d="M110 82 C 160 82, 220 86, 275 96 C 282 98, 275 106, 250 116 C 205 128, 150 124, 115 106 C 96 96, 75 80, 60 70 C 76 74, 95 82, 110 82 Z"
              fill={accentColorHex}
              opacity="0.95"
            />
          </g>
        )}

        {silhouette === 'generic' && (
          <g filter="url(#shadow)">
            {/* Universal Nike Cupsole */}
            <path
              d="M30 142 C 65 142, 248 142, 278 139 C 286 137, 284 127, 274 122 C 255 117, 235 117, 215 117 C 90 117, 45 118, 30 125 C 22 129, 22 142, 30 142 Z"
              fill="#f1f5f9"
            />
            {/* Universal Upper */}
            <path
              d="M45 118 C 43 96, 54 75, 74 69 C 88 65, 110 73, 124 81 C 152 85, 200 89, 238 94 C 262 98, 274 107, 274 116 C 240 118, 100 118, 45 118 Z"
              fill={colorHex}
            />
            {/* Clean Swoosh */}
            <path
              d="M115 86 C 152 86, 198 89, 242 94 C 250 95, 250 98, 238 101 C 198 107, 155 104, 128 98 C 114 94, 92 81, 78 71 C 90 75, 105 84, 115 86 Z"
              fill={accentColorHex}
            />
          </g>
        )}
      </svg>

      {/* Discrete condition indicator tag overlay */}
      <div className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-wider text-slate-400 opacity-60">
        NIKE ARCHIVE
      </div>
    </div>
  );
};
