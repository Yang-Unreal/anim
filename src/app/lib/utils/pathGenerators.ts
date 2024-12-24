import type { WindowDimensions, PathsOutput } from "@/app/lib/type";

export const generatePaths = ({
  width,
  height,
}: WindowDimensions): PathsOutput => {
  const mid = width / 2;
  const sideHeight = height + 300;
  const totalHeight = height + 600;
  return {
    initial: `
    M0 300 
    Q${mid} 300 ${width} 300
    L${width} ${sideHeight}
    Q${mid} ${totalHeight} 0 ${sideHeight}
    L0 0
  `.trim(),
    leave: `
    M0 300
    Q${mid} 0 ${width} 300
    L${width} ${sideHeight}
    Q${mid} ${totalHeight} 0 ${sideHeight}
    L0 0
  `.trim(),
    enter: `
    M0 300
    Q${mid} 0 ${width} 300
    L${width} ${sideHeight}
    Q${mid} ${sideHeight} 0 ${sideHeight}
    L0 0
  `.trim(),
  };
};
