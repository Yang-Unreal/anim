import type { WindowDimensions } from "@/app/lib/type";

export const generatePaths = ({ width, height }: WindowDimensions) => ({
  initial: `
    M0 300 
    Q${width / 2} 300 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `,
  leave: `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `,
  enter: `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 300} 0 ${height + 300}
    L0 0
  `,
});
