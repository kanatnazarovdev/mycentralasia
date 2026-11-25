"use client";

import React, { useEffect, useRef, useState } from "react";

interface MapProps {
  className?: string;
  activeIndex?: number;
  onSelectRegion?: (index: number) => void;
  autoRotateInterval?: number;
}

export const KyrgyzstanMapSvg: React.FC<MapProps> = ({
  className = "w-36 sm:w-48 md:w-56 h-auto",
  activeIndex: externalActiveIndex,
  onSelectRegion,
  autoRotateInterval,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sortedPathsRef = useRef<SVGPathElement[]>([]);
  
  const [svgContent, setSvgContent] = useState<string>("");
  const [internalActiveIndex, setInternalActiveIndex] = useState<number>(0);
  const [totalPaths, setTotalPaths] = useState<number>(0);

  const activeIndex = externalActiveIndex ?? internalActiveIndex;

  // 1. Fetch & Clean SVG
  useEffect(() => {
    fetch("/kyrgyzstan.svg")
      .then((res) => res.text())
      .then((data) => {
        const cleanedSvg = data
          .replace(/\s(width|height)="[^"]*"/gi, "")
          .replace(
            /<svg/i,
            '<svg viewBox="0 0 792.382 389.395" style="width: 100%; height: auto; display: block; overflow: visible;"'
          )
          .replace(/fill="[^"]*"/g, 'fill="transparent"')
          .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
        setSvgContent(cleanedSvg);
      })
      .catch((err) => console.error("Error loading SVG map:", err));
  }, []);

  // 2. Sort paths geographically from Top-Right (East/North) -> Bottom-Left (West/South)
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;
    const svgElement = containerRef.current.querySelector("svg");
    if (!svgElement) return;

    const rawPaths = Array.from(svgElement.querySelectorAll("path"));

    // Sort by geometric center: High X (Right) and Low Y (Top)
    const sorted = rawPaths.sort((a, b) => {
      try {
        const bboxA = a.getBBox();
        const bboxB = b.getBBox();

        const centerA_X = bboxA.x + bboxA.width / 2;
        const centerA_Y = bboxA.y + bboxA.height / 2;

        const centerB_X = bboxB.x + bboxB.width / 2;
        const centerB_Y = bboxB.y + bboxB.height / 2;

        // Higher X and lower Y = Top Right
        const scoreA = centerA_X - centerA_Y;
        const scoreB = centerB_X - centerB_Y;

        return scoreB - scoreA; // Descending
      } catch {
        return 0;
      }
    });

    sortedPathsRef.current = sorted;
    setTotalPaths(sorted.length);
  }, [svgContent]);

  // 3. Auto-Rotation Loop using sorted geographic order
  useEffect(() => {
    if (totalPaths === 0) return;

    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % totalPaths;
      setInternalActiveIndex(nextIndex);
      onSelectRegion?.(nextIndex);
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [activeIndex, totalPaths, autoRotateInterval, onSelectRegion]);

  // 4. Apply highlight and click/hover handlers in sorted order
  useEffect(() => {
    if (sortedPathsRef.current.length === 0) return;

    const paths = sortedPathsRef.current;

    paths.forEach((path, idx) => {
      path.setAttribute("data-region-index", idx.toString());
      path.style.cursor = "pointer";
      path.style.transition = "all 0.4s ease-in-out";

      const isActive = idx === (activeIndex % paths.length);

      if (isActive) {
        path.style.fill = "rgba(251, 191, 36, 0.45)"; // Amber yellow fill
        path.style.stroke = "#f59e0b";
        path.style.strokeWidth = "2px";
      } else {
        path.style.fill = "transparent";
        path.style.stroke = "rgba(255, 255, 255, 0.7)";
        path.style.strokeWidth = "1.2px";
      }

      // Hover Effects
      path.onmouseenter = () => {
        path.style.fill = "rgba(251, 191, 36, 0.6)";
        path.style.stroke = "#fbbf24";
        path.style.strokeWidth = "2px";
      };

      path.onmouseleave = () => {
        if (idx === (activeIndex % paths.length)) {
          path.style.fill = "rgba(251, 191, 36, 0.45)";
          path.style.stroke = "#f59e0b";
          path.style.strokeWidth = "2px";
        } else {
          path.style.fill = "transparent";
          path.style.stroke = "rgba(255, 255, 255, 0.7)";
          path.style.strokeWidth = "1.2px";
        }
      };

      // Click event
      path.onclick = () => {
        setInternalActiveIndex(idx);
        onSelectRegion?.(idx);
      };
    });
  }, [svgContent, activeIndex, onSelectRegion]);

  if (!svgContent) {
    return <div className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative text-white overflow-visible ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default KyrgyzstanMapSvg;