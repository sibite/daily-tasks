export default function getTaskColor(index: number) {
  return `hsl(${(220 + index * 145) % 360}, 70%, 50%)`;
}
